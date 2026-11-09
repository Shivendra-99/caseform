// Run with: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { MODELS, MODEL_CODES, MODEL_SERIES, PRODUCTS, loadProducts, stockLeft } from "../../src/catalog.js";
import { quote } from "./quote.js";

const productRows = Object.entries(PRODUCTS).map(([id, p], i) => ({ id, num: p.num, code: p.code, kind: p.kind, name: p.name, feat: p.feat, badge: p.badge ?? "", price: p.price, mrp: p.mrp, grams: p.grams, def: p.def ?? 0, imgs: p.imgs ?? (p.img ? [p.img] : []), colors: p.colors, details: p.details, active: true, sort: i }));
const original = MODELS.map((name, idx) => ({ idx, name, code: MODEL_CODES[idx], series: name.match(/^iPhone \d+/)[0], sells_untracked: true }));
const serve = (devices) => {
  globalThis.fetch = async (url) => new Response(JSON.stringify(url.includes("/devices") ? devices : url.includes("/stock") ? [] : productRows));
  return loadProducts("https://db.test", "key", { maxAge: 0 });
};
const matte = (device) => [{ id: "matte", qty: 1, device, variant: "Black" }];

test("only the iPhone 17 / 18 Pro models are sold out of the box", () => {
  assert.deepEqual(MODEL_SERIES.flatMap((g) => g.models), ["iPhone 18 Pro", "iPhone 18 Pro Max", "iPhone 17 Pro", "iPhone 17 Pro Max"]);
  assert.equal(stockLeft(PRODUCTS.matte, 0), 0); // iPhone 16 Pro Max: retired
  assert.equal(stockLeft(PRODUCTS.matte, 6), Infinity); // iPhone 17 Pro
});

test("a model added in admin joins the end of the list and lists first in the picker", async () => {
  await serve([...original, { idx: 10, name: "iPhone 19 Pro", code: "19P", series: "iPhone 19", sells_untracked: false }]);
  assert.equal(MODELS.length, 11);
  assert.equal(MODELS[10], "iPhone 19 Pro"); // the end: existing variant ids don't move
  assert.equal(MODEL_CODES[10], "19P");
  assert.deepEqual(MODEL_SERIES[0], { name: "iPhone 19", gen: 19, models: ["iPhone 19 Pro"] });
});

test("untracked covers aren't sold for a new model, and checkout refuses them", () => {
  assert.equal(stockLeft(PRODUCTS.matte, 6), Infinity);
  assert.equal(stockLeft(PRODUCTS.matte, 10), 0);
  assert.throws(() => quote(matte("iPhone 19 Pro")), { status: 409 });
  assert.equal(quote(matte("iPhone 17 Pro")).lines.length, 1);
});

test("a removed model leaves the picker and can't be bought, but keeps its place", async () => {
  await serve(original.map((d) => (d.idx === 5 ? { ...d, active: false } : d)));
  assert.equal(MODELS[5], "iPhone 13 Series"); // still there: variant ids and old orders depend on it
  assert.ok(!MODEL_SERIES.some((g) => g.models.includes("iPhone 13 Series")));
  assert.equal(stockLeft(PRODUCTS.matte, 5), 0);
  PRODUCTS.matte.stock = { 123050: 4 }; // even with stock left for it
  assert.equal(stockLeft(PRODUCTS.matte, 5), 0);
  delete PRODUCTS.matte.stock;
  assert.throws(() => quote(matte("iPhone 13 Series")), { status: 409 });
});

test("a gap in the model numbers is ignored rather than shifting every variant id", async () => {
  const before = [...MODELS];
  await serve([...original, { idx: 12, name: "iPhone 20", code: "20", series: "iPhone 20", sells_untracked: false }]);
  assert.deepEqual(MODELS, before);
});
