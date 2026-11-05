// Run with: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { MODELS, MODEL_CODES, MODEL_SERIES, PRODUCTS, loadProducts, stockLeft } from "../../src/catalog.js";
import { quote } from "./quote.js";

const productRows = Object.entries(PRODUCTS).map(([id, p], i) => ({ id, num: p.num, code: p.code, kind: p.kind, name: p.name, feat: p.feat, badge: p.badge ?? "", price: p.price, mrp: p.mrp, grams: p.grams, def: p.def ?? 0, imgs: p.imgs ?? (p.img ? [p.img] : []), active: true, sort: i }));
const original = MODELS.map((name, idx) => ({ idx, name, code: MODEL_CODES[idx], series: name.match(/^iPhone \d+/)[0], sells_untracked: true }));
const serve = (devices) => {
  globalThis.fetch = async (url) => new Response(JSON.stringify(url.includes("/devices") ? devices : url.includes("/stock") ? [] : productRows));
  return loadProducts("https://db.test", "key", { maxAge: 0 });
};

test("a model added in admin joins the end of the list and lists first in the picker", async () => {
  await serve([...original, { idx: 6, name: "iPhone 17 Pro Max", code: "17PM", series: "iPhone 17", sells_untracked: false }]);
  assert.equal(MODELS.length, 7);
  assert.equal(MODELS[6], "iPhone 17 Pro Max"); // the end: existing variant ids don't move
  assert.equal(MODEL_CODES[6], "17PM");
  assert.deepEqual(MODEL_SERIES[0], { name: "iPhone 17", gen: 17, models: ["iPhone 17 Pro Max"] });
});

test("old untracked covers aren't sold for a new model, and checkout refuses them", () => {
  assert.equal(stockLeft(PRODUCTS.military, 0), Infinity); // original models: no limit, as before
  assert.equal(stockLeft(PRODUCTS.military, 6), 0);
  assert.throws(() => quote([{ id: "military", qty: 1, device: "iPhone 17 Pro Max" }]), { status: 409 });
  assert.equal(quote([{ id: "military", qty: 1, device: "iPhone 16 Pro Max" }]).lines.length, 1);
});

test("a removed model leaves the picker and can't be bought, but keeps its place", async () => {
  await serve(original.map((d) => (d.idx === 5 ? { ...d, active: false } : d)));
  assert.equal(MODELS[5], "iPhone 13 Series"); // still there: variant ids and old orders depend on it
  assert.ok(!MODEL_SERIES.some((g) => g.models.includes("iPhone 13 Series")));
  assert.equal(stockLeft(PRODUCTS.military, 5), 0);
  PRODUCTS.military.stock = { 122050: 4 }; // even with stock left for it
  assert.equal(stockLeft(PRODUCTS.military, 5), 0);
  delete PRODUCTS.military.stock;
  assert.throws(() => quote([{ id: "military", qty: 1, device: "iPhone 13 Series" }]), { status: 409 });
});

test("a gap in the model numbers is ignored rather than shifting every variant id", async () => {
  const before = [...MODELS];
  await serve([...original, { idx: 8, name: "iPhone 18", code: "18", series: "iPhone 18", sells_untracked: false }]);
  assert.deepEqual(MODELS, before);
});
