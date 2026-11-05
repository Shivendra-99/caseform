import { PRODUCTS, MODELS, MODEL_CODES, COLORS, FINISHES, optionsFor, loadProducts, variantId, stockLeft } from "../../src/catalog.js";

export { variantId };

// Every API route calls this first, so prices and products match what /admin saved (cached for a
// minute). If Supabase is unreachable the bundled catalog is used and the error is logged.
export const loadCatalog = () =>
  loadProducts(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_PUBLISHABLE_KEY).catch((e) => console.error("catalog: using bundled products,", e.message));

// Shiprocket Checkout catalog format (see their "Catalog APIs"): every field is required,
// ids are numeric and must stay stable once synced.

const UPDATED = "2026-10-21T00:00:00+05:30"; // bump when catalog data changes
const UNTRACKED = 100; // products without stock rows sell without a limit; Shiprocket needs some positive number

export const COLLECTIONS = [
  { id: 1, handle: "covers", title: "iPhone Covers", body: "MagSafe and shockproof iPhone covers." },
  { id: 2, handle: "glass", title: "Tempered Glass", body: "9H tempered screen glass and camera lens glass." },
  { id: 3, handle: "combos", title: "Case + Glass Combos", body: "Cover and glass bundles." },
];

export function parseVariantId(vid) {
  const n = Number(vid);
  const num = Math.floor(n / 1000), modelIdx = Math.floor((n % 1000) / 10), optIdx = n % 10;
  const id = Object.keys(PRODUCTS).find((k) => PRODUCTS[k].num === num);
  const opts = id && optionsFor(PRODUCTS[id]);
  if (!id || !MODELS[modelIdx] || (opts ? !opts[optIdx] : optIdx !== 0)) return null;
  return { id, device: MODELS[modelIdx], variant: opts ? opts[optIdx].name : undefined };
}

// Product photo if there is one, else the drawing exported as a PNG in /public/products.
// Photos uploaded in /admin are full Supabase URLs; bundled ones are paths on this site.
export const absolute = (origin, path) => (/^https?:/.test(path) ? path : origin + path);
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
        quantity: Math.min(stockLeft(p, mi, oi), UNTRACKED), // untracked = Infinity -> UNTRACKED
        created_at: UPDATED,
        updated_at: UPDATED,
        taxable: true,
        option_values: o ? { Model: model, [optName]: o.name } : { Model: model },
        grams: p.grams,
        image: { src: absolute(origin, imagePath(p, o ? oi : 0)) },
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
    image: { src: absolute(origin, imagePath(p)) },
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
    image: { src: first ? absolute(origin, imagePath(first)) : "" },
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
