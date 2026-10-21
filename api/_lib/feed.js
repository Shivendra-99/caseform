import { PRODUCTS, MODELS, MODEL_CODES, COLORS, FINISHES, optionsFor } from "../../src/catalog.js";

// Shiprocket Checkout catalog format (see their "Catalog APIs"): every field is required,
// ids are numeric and must stay stable once synced.

const UPDATED = "2026-10-21T00:00:00+05:30"; // bump when catalog data changes
const STOCK = 100; // TODO: no inventory system yet; Shiprocket only needs a positive quantity

export const COLLECTIONS = [
  { id: 1, handle: "covers", title: "iPhone Covers", body: "MagSafe and shockproof iPhone covers." },
  { id: 2, handle: "glass", title: "Tempered Glass", body: "9H tempered screen glass and camera lens glass." },
  { id: 3, handle: "combos", title: "Case + Glass Combos", body: "Cover and glass bundles." },
];

// Variant = product × iPhone model × colour/finish, e.g. 101 / model 2 / colour 3 -> 101023.
export const variantId = (p, modelIdx, optIdx = 0) => p.num * 1000 + modelIdx * 10 + optIdx;

export function parseVariantId(vid) {
  const n = Number(vid);
  const num = Math.floor(n / 1000), modelIdx = Math.floor((n % 1000) / 10), optIdx = n % 10;
  const id = Object.keys(PRODUCTS).find((k) => PRODUCTS[k].num === num);
  const opts = id && optionsFor(PRODUCTS[id]);
  if (!id || !MODELS[modelIdx] || (opts ? !opts[optIdx] : optIdx !== 0)) return null;
  return { id, device: MODELS[modelIdx], variant: opts ? opts[optIdx].name : undefined };
}

// Product photo if there is one, else the drawing exported as a PNG in /public/products.
export function imagePath(p, optIdx = p.def) {
  if (p.img) return p.img;
  if (p.kind === "lens") return "/products/lens.png";
  if (p.kind === "glass") return `/products/glass-${FINISHES[optIdx].code.toLowerCase()}.png`;
  return `/products/case-${COLORS[p.def].code.toLowerCase()}.png`;
}

export const sellable = () => Object.entries(PRODUCTS).filter(([, p]) => p.kind);

export function toShiprocketProduct(id, p, origin) {
  const opts = optionsFor(p);
  const optName = p.kind === "glass" ? "Finish" : "Color";
  const variants = [];
  MODELS.forEach((model, mi) => {
    (opts ?? [null]).forEach((o, oi) => {
      variants.push({
        id: variantId(p, mi, oi),
        title: o ? `${model} / ${o.name}` : model,
        price: p.price.toFixed(2),
        compare_at_price: p.mrp.toFixed(2),
        sku: ["SE", p.code, MODEL_CODES[mi], o?.code].filter(Boolean).join("-"),
        quantity: STOCK,
        created_at: UPDATED,
        updated_at: UPDATED,
        taxable: true,
        option_values: o ? { Model: model, [optName]: o.name } : { Model: model },
        grams: p.grams,
        image: { src: origin + imagePath(p, o ? oi : 0) },
        weight: p.grams / 1000,
        weight_unit: "kg",
      });
    });
  });
  return {
    id: p.num,
    title: p.name,
    body_html: `<p>${p.feat}</p>`,
    vendor: "SnapEdge",
    product_type: p.tag,
    created_at: UPDATED,
    handle: id,
    updated_at: UPDATED,
    tags: p.cat,
    status: "active",
    variants,
    image: { src: origin + imagePath(p) },
    options: [{ name: "Model", values: MODELS }, ...(opts ? [{ name: optName, values: opts.map((o) => o.name) }] : [])],
  };
}

export function toShiprocketCollection(c, origin) {
  const first = sellable().find(([, p]) => p.cat === c.handle)?.[1];
  return {
    id: c.id,
    updated_at: UPDATED,
    body_html: `<p>${c.body}</p>`,
    handle: c.handle,
    image: { src: first ? origin + imagePath(first) : "" },
    title: c.title,
    created_at: UPDATED,
  };
}

// ?page=1&limit=100 (page is 1-based; 0 is treated as the first page).
export function paginate(list, query) {
  const limit = Math.min(Math.max(parseInt(query.get("limit"), 10) || 100, 1), 250);
  const page = Math.max(parseInt(query.get("page"), 10) || 1, 1);
  return { total: list.length, items: list.slice((page - 1) * limit, page * limit) };
}

// Absolute site origin for image URLs: SITE_URL if set, else the request's host.
export const originOf = (req) => process.env.SITE_URL?.replace(/\/$/, "") || `https://${req.headers["x-forwarded-host"] || req.headers.host}`;
