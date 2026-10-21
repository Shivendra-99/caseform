// Product data for the store. Covers (names + photos) come from SnapEdge_FinalList.xlsx;
// glass, lens glass and the combo come from the SnapEdge homepage/product designs.

export const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

export const FREE_SHIPPING = 499;
export const SHIPPING_FEE = 99;
export const shippingFor = (subtotal) => (subtotal === 0 || subtotal >= FREE_SHIPPING ? 0 : SHIPPING_FEE);

export const MODELS = ["iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16 / 16 Plus", "iPhone 15 Series", "iPhone 14 Series", "iPhone 13 Series"];
export const MODEL_CODES = ["16PM", "16P", "16", "15", "14", "13"];

// Models grouped by series, newest first, for the model picker: [{ name: "iPhone 16", models: [...] }].
// Add new models at the END of MODELS (its order sets Shiprocket variant ids); they still list on top.
export const MODEL_SERIES = [];
for (const m of MODELS) {
  const [name, gen] = m.match(/^iPhone (\d+)/);
  const group = MODEL_SERIES.find((g) => g.name === name);
  if (group) group.models.push(m);
  else MODEL_SERIES.push({ name, gen: Number(gen), models: [m] });
}
MODEL_SERIES.sort((a, b) => b.gen - a.gen);

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

// kind: "case" | "combo" (covers), "glass" (screen glass, 50% off with any cover), "lens".
// def: drawing colour (covers) or default finish (glass) shown on the card.
// num/code: Shiprocket catalog id and SKU prefix (keep stable once synced; 101, 103, 105, 107 are retired).
// grams: packed weight used for shipping. TODO: replace these estimates with real weights.
export const PRODUCTS = {
  "slim-shell-kickstand": cover(110, "SK", "Slim Shell Plus + Kickstand + MagSafe", "Slim clear shell · Ring kickstand · MagSafe", 899, 1499, { def: 3 }, "new"),
  "slim-shell-plus": cover(111, "SP", "Slim Shell Plus + MagSafe", "Slim clear shell · Camera ring guard · MagSafe", 699, 1199, img("slim-shell-plus")),
  "ss-ultra-clear": cover(112, "UC", "Slim Shell Ultra Clear + MagSafe", "Ultra-clear back · Slim profile · MagSafe", 699, 1199, img("ss-ultra-clear")),
  "anti-yellowing": cover(113, "AY", "Anti-Yellowing Case", "Stays clear · Shockproof · MagSafe magnets", 599, 999, { def: 3 }),
  "clear-card-shape": cover(114, "CS", "Clear Case – Apple Original Card Shape", "Apple-style clear shell · Metal camera frame · MagSafe", 799, 1299, img("clear-card-shape")),
  glitter: cover(115, "GL", "Electroplating Glitter Case", "Electroplated frame · Glitter gradient back · MagSafe", 799, 1299, img("glitter")),
  "dualtek-2colour": cover(116, "D2", "DualTek + MagSafe + 2-Colour (Black/White)", "Dual-layer protection · MagSafe · Black or White", 1199, 1799, { def: 0 }),
  "dualtek-kickstand": cover(117, "DK", "DualTek + Kickstand + MagSafe", "Dual-layer protection · Ring kickstand · MagSafe", 1299, 1999, { def: 0 }),
  "dualtek-clear": cover(118, "DC", "DualTek Clear + MagSafe + Colour-Matched to iPhone", "Clear back · Frame matched to your iPhone · MagSafe", 1199, 1799, { def: 3 }),
  "dualtek-studio": cover(119, "DS", "DualTek Studio + 360° Kickstand + Colour-Matched to iPhone", "360° rotating kickstand · Colour-matched · MagSafe", 1499, 2299, { def: 1 }, "new"),
  "dualtek-air": cover(120, "DA", "DualTek Air with MagSafe – Single Colour", "Lightweight dual-layer · MagSafe", 999, 1499, { def: 3 }),
  "dualtek-aura": cover(121, "DU", "DualTek Aura + Kickstand – Single Colour", "Gradient frosted back · Ring kickstand", 1199, 1799, { def: 2 }),
  military: cover(122, "MA", "Military Anti-Fall Case", "Rugged armour corners · Raised camera guard", 1299, 1999, { ...img("military"), imgs: ["military", "military-1", "military-2", "military-3", "military-4", "military-5"].map((f) => img(f).img) }, "best"),
  matte: cover(123, "MC", "Matte Case", "Soft-touch matte back · MagSafe", 599, 999, img("matte")),
  silicone: cover(124, "LS", "Liquid Silicone Case", "Soft-touch liquid silicone · MagSafe", 699, 1199, img("silicone"), "best"),
  "holo-feather": cover(125, "HF", "SnapEdge Holo Feather MagSafe Case", "Iridescent feather finish · MagSafe", 899, 1499, img("holo-feather"), "new"),
  "berry-fade": cover(126, "BF", "SnapEdge Berry Fade MagSafe Case", "Berry-to-frost gradient · MagSafe", 899, 1499, img("berry-fade"), "new"),
  "frost-blue": cover(127, "FB", "SnapEdge Frost Blue MagSafe Case", "Frosted clear back · Blue frame · MagSafe", 899, 1499, img("frost-blue")),
  "carbon-plum": cover(128, "CP", "SnapEdge Carbon-Weave Case – Plum", "Carbon-weave texture · Slim profile", 999, 1599, img("carbon-plum")),
  "lavender-matte": cover(129, "LM", "SnapEdge Soft Matte Case – Lavender", "Soft matte back · Slim profile", 799, 1299, img("lavender-matte")),

  autoalign: { num: 102, code: "AA", grams: 80, kind: "glass", cat: "glass", name: "Auto-Align 9H Glass · 2-Pack", tag: "Glass", feat: "9H hardness · Oleophobic · Alignment tray", badge: "best", price: 599, mrp: 999, def: 0 },
  fullframe: { num: 104, code: "FF", grams: 80, kind: "glass", cat: "glass", name: "Full-Frame 9H Glass · 2-Pack", tag: "Glass", feat: "Full cover · 9H hardness · Alignment tray", badge: "sale", price: 699, mrp: 1199, def: 1 },
  edge2edge: { num: 106, code: "EE", grams: 80, kind: "glass", cat: "glass", name: "Edge-to-Edge 9H Glass · 2-Pack", tag: "Glass", feat: "Edge to edge · 9H hardness · Case-friendly", badge: "new", price: 649, mrp: 1099, def: 2 },
  "armor-combo": { num: 108, code: "AC", grams: 125, kind: "combo", cat: "combos", name: "Military Case + 9H Glass Combo", tag: "Combos", feat: "Military Anti-Fall Case + Auto-Align glass 2-pack, glass at 50% off", badge: "best", price: 1599, mrp: 2998, def: 0 },
  "lens-glass": { num: 109, code: "LG", grams: 25, kind: "lens", cat: "glass", name: "Camera Lens Glass · 2-Pack", tag: "Glass", feat: "Lens cover · Case-friendly", badge: "", price: 399, mrp: 399, def: 0 },
};

// Options a product is sold in. Only screen glass has them (finishes); covers come as listed.
export const optionsFor = (p) => (p.kind === "glass" ? FINISHES : null);

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
