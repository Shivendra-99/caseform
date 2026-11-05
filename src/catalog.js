// Product data for the store. Covers (names + photos) come from SnapEdge_FinalList.xlsx;
// glass, lens glass and the combo come from the SnapEdge homepage/product designs.

export const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

export const FREE_SHIPPING = 499;
export const SHIPPING_FEE = 99;
export const shippingFor = (subtotal) => (subtotal === 0 || subtotal >= FREE_SHIPPING ? 0 : SHIPPING_FEE);

export const MODELS = ["iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16 / 16 Plus", "iPhone 15 Series", "iPhone 14 Series", "iPhone 13 Series"];
export const MODEL_CODES = ["16PM", "16P", "16", "15", "14", "13"];

// Models grouped by series, newest first, for the model picker: [{ name: "iPhone 16", models: [...] }].
// MODELS' order sets Shiprocket variant ids, so new models (added in /admin › iPhone models) go at
// the END; they still list on top. SERIES holds each model's group from Supabase.
const SERIES = {};
// Models removed in /admin stay in MODELS (variant ids and old orders depend on their position)
// but aren't offered: left out of the picker and never in stock.
const RETIRED = new Set();
export const isRetired = (model) => RETIRED.has(model);
export const MODEL_SERIES = [];
function groupModels() {
  MODEL_SERIES.length = 0;
  for (const m of MODELS.filter((x) => !RETIRED.has(x))) {
    const name = SERIES[m] ?? m.match(/^iPhone \d+/)?.[0] ?? m;
    const group = MODEL_SERIES.find((g) => g.name === name);
    if (group) group.models.push(m);
    else MODEL_SERIES.push({ name, gen: Number(name.match(/\d+/)?.[0] ?? 0), models: [m] });
  }
  MODEL_SERIES.sort((a, b) => b.gen - a.gen);
}
groupModels();

// ["iPhone 16 Pro", "iPhone 15 Series"] -> "iPhone 16 Pro and iPhone 15 Series"
export const modelsText = (list) => new Intl.ListFormat("en", { type: "conjunction" }).format(list);

// Fills used to draw a cover that has no photo yet; a product's `def` picks one.
export const COLORS = [
  { name: "Black", code: "BLK", body: "#1C1C1C", edge: "#000000", hl: "#383838", ring: "#4A4A4A" },
  { name: "Natural Titanium", code: "NTI", body: "#BDB7AC", edge: "#9F998E", hl: "#D3CEC6", ring: "#8F887C" },
  { name: "Desert Titanium", code: "DTI", body: "#C8AC8E", edge: "#A98D70", hl: "#DCC6AE", ring: "#9C8064" },
  { name: "Clear", code: "CLR", body: "rgba(246,249,250,0.5)", edge: "#AEB7BC", hl: "#FFFFFF", ring: "#8C959B" },
];

// Screen-glass finishes and how each is drawn.
export const FINISHES = [
  { name: "HD Clear", code: "HD", fill: "rgba(214,226,232,0.5)", edge: "#B9C0C4", glare: "0.95", text: "#666666" },
  { name: "28° Privacy", code: "PV", fill: "rgba(18,18,18,0.86)", edge: "#0A0A0A", glare: "0.14", text: "#9A9A9A" },
  { name: "Matte Gaming", code: "MT", fill: "rgba(236,237,238,0.96)", edge: "#BFC4C7", glare: "0", text: "#666666" },
];

// Covers from SnapEdge_FinalList.xlsx. `img` is the product photo. Covers whose only photo showed
// another brand's logo are drawn in COLORS[def] until clean photos arrive.
// TODO: prices, MRPs and weights are placeholders; replace with real figures.
const cover = (num, code, name, feat, price, mrp, look, badge = "") => ({ num, code, grams: 40, kind: "case", cat: "covers", tag: "Covers", name, feat, badge, price, mrp, ...look });
// `imgs` (optional): every photo of the product, main one first; cards show them on hover.
const img = (file) => ({ img: `/products/${file}.jpg` });

// Colours and full feature lists from "Information For Website.xlsx" (products.colors / products.details).
const info = {
  dualtek: { colors: ["White", "Black"], details: ["Ultra protective, 20 ft drop test certified", "Patented design with built-in bumpers for extreme corner impact protection", "Designed with shock-absorbing materials", "Ergonomic grip support"] },
  antiYellowing: { colors: ["Clear", "Black", "Blue"], details: ["Ultra-clear case, crafted using anti-yellowing materials", "Lightweight and slim design", "Easy to snap on and off", "Functional metal buttons"] },
  studio: { colors: ["Orange", "Black", "Blue", "Burgundy"], details: ["Ultra protective, 20 ft drop test certified", "Stylish design with shock-absorbing materials", "Translucent, frosted anti-fingerprint material", "Built-in bumpers for extreme corner impact protection", "Raised lip protects screen and camera lens from drops and bumps", "Scratch-resistant and anti-slip grip"] },
  matte: { colors: ["Black"], details: ["Minimal, sleek design", "Effortlessly slides into pockets", "Precision fit – simple to put on and remove", "Raised edges protect screen from scratches and scuffs", "Tactile buttons for seamless control"] },
  silicone: { colors: ["Beige", "Black", "Blue"], details: ["Premium silicone exterior – soft, smooth and comfortable to hold", "Soft microfiber lining helps protect your phone from scratches, dust and daily wear", "Slim and lightweight – adds protection without making your phone bulky"] },
  misttint: { colors: ["Orange", "Black", "Blue", "Burgundy"], details: ["Made entirely of PC material – lightweight and slim", "Metal camera ring and metal buttons for a premium, high-end feel", "Gradient-coloured backplate with a matte, skin-friendly soft-touch finish"] },
  lensGrip: { colors: ["Blue", "Clear"], details: ["Made of PC and TPU; the clear version has an anti-fingerprint coating on the back to resist smudges", "Built-in lens stand works as a phone kickstand or a handheld selfie grip", "Comes with a lens film to protect the camera lens", "HD tempered glass", "Drop and scratch protection", "Fingerprint and smudge resistant"] },
};

// kind: "case" | "combo" (covers), "glass" (screen glass, 50% off with any cover), "lens".
// def: drawing colour (covers) or default finish (glass) shown on the card.
// num/code: Shiprocket catalog id and SKU prefix (keep stable once synced; 101, 103, 105, 107 are retired).
// grams: packed weight used for shipping. TODO: replace these estimates with real weights.
export const PRODUCTS = {
  "slim-shell-kickstand": cover(110, "SK", "Slim Shell Plus + Kickstand + MagSafe", "Slim clear shell · Ring kickstand · MagSafe", 899, 1499, { img: "/products/case-clr.png", imgs: ["/products/case-clr.png", "/products/clear-card-shape.jpg"] }, "new"),
  "slim-shell-plus": cover(111, "SP", "Slim Shell Plus + MagSafe", "Slim clear shell · Camera ring guard · MagSafe", 699, 1199, { img: "/products/case-clr.png", imgs: ["/products/case-clr.png", "/products/clear-card-shape.jpg"] }, "best"),
  "ss-ultra-clear": cover(112, "UC", "Slim Shell Ultra Clear + MagSafe", "Ultra-clear back · Slim profile · MagSafe", 699, 1199, { img: "/products/clear-card-shape.jpg", imgs: ["/products/clear-card-shape.jpg", "/products/case-clr.png"] }, "new"),
  "anti-yellowing": cover(113, "AY", "Anti-Yellowing Case", "Anti-yellowing clear · Slim & lightweight · Metal buttons", 599, 999, { img: "/products/case-clr.png", imgs: ["/products/case-clr.png", "/products/clear-card-shape.jpg"], ...info.antiYellowing }, "best"),
  "clear-card-shape": cover(114, "CS", "Clear Case – Apple Original Card Shape", "Apple-style clear shell · Metal camera frame · MagSafe", 799, 1299, { img: "/products/clear-card-shape.jpg", imgs: ["/products/clear-card-shape.jpg", "/products/case-clr.png"] }, "best"),
  glitter: cover(115, "GL", "Electroplating Glitter Case", "Electroplated frame · Glitter gradient back · MagSafe", 799, 1299, img("glitter"), "new"),
  "dualtek-2colour": cover(116, "D2", "DualTek + MagSafe", "20 ft drop tested · Built-in corner bumpers · MagSafe", 1199, 1799, { img: "/products/case-blk.png", imgs: ["/products/case-blk.png", "/products/case-clr.png"], ...info.dualtek }, "best"),
  "dualtek-kickstand": cover(117, "DK", "DualTek + Kickstand + MagSafe", "Dual-layer protection · Ring kickstand · MagSafe", 1299, 1999, { img: "/products/military-5.jpg", imgs: ["/products/military-5.jpg", "/products/case-blk.png"] }, "best"),
  "dualtek-clear": cover(118, "DC", "DualTek Clear + MagSafe + Colour-Matched to iPhone", "Clear back · Frame matched to your iPhone · MagSafe", 1199, 1799, { img: "/products/case-nti.png", imgs: ["/products/case-nti.png", "/products/case-clr.png"] }, "new"),
  "dualtek-studio": cover(119, "DS", "DualTek Studio + 360° Kickstand", "20 ft drop tested · 360° kickstand · Frosted anti-fingerprint back", 1499, 2299, { img: "/products/case-dti.png", imgs: ["/products/case-dti.png", "/products/case-nti.png"], ...info.studio }, "new"),
  "dualtek-air": cover(120, "DA", "DualTek Air with MagSafe – Single Colour", "Lightweight dual-layer · MagSafe", 999, 1499, { img: "/products/case-blk.png", imgs: ["/products/case-blk.png", "/products/case-dti.png"] }, "sale"),
  "dualtek-aura": cover(121, "DU", "DualTek Aura + Kickstand – Single Colour", "Gradient frosted back · Ring kickstand", 1199, 1799, { img: "/products/frost-blue.jpg", imgs: ["/products/frost-blue.jpg", "/products/berry-fade.jpg"] }, "new"),
  military: cover(122, "MA", "Military Anti-Fall Case", "Rugged armour corners · Raised camera guard", 1299, 1999, { ...img("military"), imgs: ["military", "military-1", "military-2", "military-3", "military-4", "military-5"].map((f) => img(f).img) }, "best"),
  matte: cover(123, "MC", "Matte Case", "Minimal, sleek design · Slides into pockets · Tactile buttons", 599, 999, { ...img("matte"), ...info.matte }, "sale"),
  silicone: cover(124, "LS", "Liquid Silicone Case", "Premium liquid silicone · Microfiber lining · Slim & light", 699, 1199, { ...img("silicone"), ...info.silicone }, "best"),
  // TODO: placeholder prices and no photos yet (drawn in COLORS[def]); set both in /admin.
  misttint: cover(131, "MS", "MistTint MagSafe Case", "Gradient matte back · Metal camera ring · MagSafe", 899, 1499, { def: 0, ...info.misttint }, "new"),
  "lens-grip": cover(132, "LP", "Lens Grip MagSafe Case", "Built-in lens stand & grip · Lens film included · MagSafe", 999, 1599, { def: 3, ...info.lensGrip }, "new"),
  "holo-feather": cover(125, "HF", "SnapEdge Holo Feather MagSafe Case", "Iridescent feather finish · MagSafe", 899, 1499, img("holo-feather"), "new"),
  "berry-fade": cover(126, "BF", "SnapEdge Berry Fade MagSafe Case", "Berry-to-frost gradient · MagSafe", 899, 1499, img("berry-fade"), "new"),
  "frost-blue": cover(127, "FB", "SnapEdge Frost Blue MagSafe Case", "Frosted clear back · Blue frame · MagSafe", 899, 1499, img("frost-blue"), "new"),
  "carbon-plum": cover(128, "CP", "SnapEdge Carbon-Weave Case – Plum", "Carbon-weave texture · Slim profile", 999, 1599, img("carbon-plum"), "sale"),
  "lavender-matte": cover(129, "LM", "SnapEdge Soft Matte Case – Lavender", "Soft matte back · Slim profile", 799, 1299, img("lavender-matte"), "new"),

  autoalign: { num: 102, code: "AA", grams: 80, kind: "glass", cat: "glass", name: "Auto-Align 9H Glass · 2-Pack", tag: "Glass", feat: "9H hardness · Oleophobic · Alignment tray", badge: "best", price: 599, mrp: 999, def: 0, img: "/products/glass-hd.png", imgs: ["/products/glass-hd.png", "/products/glass-pv.png", "/products/glass-mt.png"] },
  fullframe: { num: 104, code: "FF", grams: 80, kind: "glass", cat: "glass", name: "Full-Frame 9H Glass · 2-Pack", tag: "Glass", feat: "Full cover · 9H hardness · Alignment tray", badge: "sale", price: 699, mrp: 1199, def: 1, img: "/products/glass-pv.png", imgs: ["/products/glass-pv.png", "/products/glass-hd.png"] },
  edge2edge: { num: 106, code: "EE", grams: 80, kind: "glass", cat: "glass", name: "Edge-to-Edge 9H Glass · 2-Pack", tag: "Glass", feat: "Edge to edge · 9H hardness · Case-friendly", badge: "new", price: 649, mrp: 1099, def: 2, img: "/products/glass-mt.png", imgs: ["/products/glass-mt.png", "/products/glass-hd.png"] },
  "armor-combo": { num: 108, code: "AC", grams: 125, kind: "combo", cat: "combos", name: "Military Case + 9H Glass Combo", tag: "Combos", feat: "Military Anti-Fall Case + Auto-Align glass 2-pack, glass at 50% off", badge: "best", price: 1599, mrp: 2998, def: 0, img: "/images/armormatrix.jpg", imgs: ["/images/armormatrix.jpg", "/products/military.jpg", "/products/glass-hd.png"] },
  "lens-glass": { num: 109, code: "LG", grams: 25, kind: "lens", cat: "glass", name: "Camera Lens Glass · 2-Pack", tag: "Glass", feat: "Lens cover · Case-friendly", badge: "new", price: 399, mrp: 399, def: 0, img: "/products/lens.png" },
};

// Cover colours (products.colors) as [SKU code, swatch]. A colour's position is the last digit of its
// variant id, so colours are only ever added at the end: never reordered or removed. Unknown names
// still sell, with a grey swatch and a code from their first letters.
const COLOR_INFO = { Black: ["BLK", "#1C1C1C"], White: ["WHT", "#F2F2EF"], Clear: ["CLR", "#E4EAEE"], Blue: ["BLU", "#2F5A96"], Orange: ["ORG", "#E2702A"], Burgundy: ["BRG", "#6B1F2C"], Beige: ["BGE", "#D8C6AC"] };
const colorOption = (name) => {
  const [code, swatch] = COLOR_INFO[name] ?? [name.replace(/[^A-Za-z0-9]/g, "").slice(0, 3).toUpperCase(), "#BBBBBB"];
  return { name, code, swatch };
};

// Options a product is sold in: finishes for screen glass, colours for covers that list them.
export const optionsFor = (p) => (p.kind === "glass" ? FINISHES : p.kind === "case" && p.colors?.length ? p.colors.map(colorOption) : null);

// Shiprocket variant id: product × iPhone model × finish, e.g. 122 / model 3 / finish 0 -> 122030.
export const variantId = (p, modelIdx, optIdx = 0) => p.num * 1000 + modelIdx * 10 + optIdx;
// Pieces left of one variant. A tracked product (has stock rows) sells only what its rows say; an
// untracked one has no limit, but only for models that sell untracked products (OPEN_MODELS): models
// added later start closed, so old covers aren't offered for a new iPhone.
const OPEN_MODELS = MODELS.map(() => true);
export const stockLeft = (p, modelIdx, optIdx = 0) => (RETIRED.has(MODELS[modelIdx]) ? 0 : p.stock ? (p.stock[variantId(p, modelIdx, optIdx)] ?? 0) : OPEN_MODELS[modelIdx] ? Infinity : 0);

// Live catalog: rows of the Supabase `products` table (edited in /admin) replace the list above,
// which stays as the fallback when Supabase can't be reached. Hidden products aren't returned.
const CAT = { case: "covers", combo: "combos", glass: "glass", lens: "glass" };
const TAG = { case: "Covers", combo: "Combos", glass: "Glass", lens: "Glass" };
export const fromRow = (r) => ({ num: r.num, code: r.code, grams: r.grams, kind: r.kind, cat: CAT[r.kind], tag: TAG[r.kind], name: r.name, feat: r.feat, badge: r.badge, price: r.price, mrp: r.mrp, def: r.def, img: r.imgs[0] ?? null, imgs: r.imgs, colors: r.colors ?? [], details: r.details ?? [] });
// The glass add-on offer and the "Complete the set" row are built on these, so they can't be hidden.
export const CORE_PRODUCTS = ["autoalign", "lens-glass"];

let loadedAt = 0;
// Calls within `maxAge` ms reuse the last load, so a server function doesn't query on every request.
export async function loadProducts(url, key, { maxAge = 60_000, timeout = 4000 } = {}) {
  if (!url || !key || Date.now() - loadedAt < maxAge) return;
  const get = async (path) => {
    const res = await fetch(`${url}/rest/v1/${path}`, { headers: { apikey: key }, signal: AbortSignal.timeout(timeout) });
    if (!res.ok) throw new Error(`${path} request failed (${res.status})`);
    return res.json();
  };
  const [rows, stock, devices] = await Promise.all([get("products?select=*&order=sort,num"), get("stock?select=variant_id,product_id,qty"), get("devices?select=idx,name,code,series,sells_untracked,active&order=idx")]);
  if (!rows.length) throw new Error("no products returned"); // keep the fallback rather than show an empty shop
  // Models are filled in place (every module holds the same arrays). A gap in idx would shift every
  // variant id after it, so the list is only taken when it runs 0, 1, 2, ... without holes.
  if (devices.length && devices.every((d, i) => d.idx === i)) {
    MODELS.splice(0, MODELS.length, ...devices.map((d) => d.name));
    MODEL_CODES.splice(0, MODEL_CODES.length, ...devices.map((d) => d.code));
    OPEN_MODELS.splice(0, OPEN_MODELS.length, ...devices.map((d) => d.sells_untracked));
    for (const d of devices) SERIES[d.name] = d.series;
    RETIRED.clear();
    for (const d of devices) if (d.active === false) RETIRED.add(d.name);
    groupModels();
  }
  for (const id of Object.keys(PRODUCTS)) delete PRODUCTS[id];
  for (const r of rows) PRODUCTS[r.id] = fromRow(r);
  for (const s of stock) if (PRODUCTS[s.product_id]) (PRODUCTS[s.product_id].stock ??= {})[s.variant_id] = s.qty;
  loadedAt = Date.now();
}

// Order of the homepage Best Sellers grid.
export const BEST_SELLERS = ["military", "autoalign", "holo-feather", "silicone", "clear-card-shape", "fullframe", "berry-fade", "armor-combo"];

const isCover = (p) => p.kind === "case" || p.kind === "combo";

// "Buy any iPhone cover + get 50% off 9H tempered glass": every screen-glass line
// is half price while the bag holds a cover. Returns the effective unit price per line.
export function priceLines(cart) {
  const hasCover = cart.some((i) => isCover(PRODUCTS[i.id]));
  return cart.map((i) => {
    const p = PRODUCTS[i.id];
    const price = hasCover && p.kind === "glass" ? Math.floor(p.price / 2) : p.price;
    return { ...p, ...i, price, listPrice: p.price, item: i };
  });
}
