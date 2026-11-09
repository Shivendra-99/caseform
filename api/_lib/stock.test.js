// Run with: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { PRODUCTS, stockLeft } from "../../src/catalog.js";
import { reserve } from "./stock.js";

// matte = product 123; variant 123060 = iPhone 17 Pro, Black. Track it with 1 piece for these tests.
const VID = 123060;
const track = () => (PRODUCTS.matte.stock = { [VID]: 1 });
const untrack = () => delete PRODUCTS.matte.stock;

test("untracked products have no limit and need no reservation", async () => {
  untrack();
  assert.equal(stockLeft(PRODUCTS.matte, 6), Infinity);
  assert.equal(await reserve([{ variant_id: VID, qty: 5 }]), null);
});

test("tracked: pieces left, and models without a count aren't sold", () => {
  track();
  assert.equal(stockLeft(PRODUCTS.matte, 6), 1);
  assert.equal(stockLeft(PRODUCTS.matte, 7), 0);
  untrack();
});

test("without the secret key, checkout refuses tracked items instead of overselling", async () => {
  track();
  delete process.env.SUPABASE_SECRET_KEY;
  await assert.rejects(reserve([{ variant_id: VID, qty: 1 }]), { status: 503 });
  untrack();
});

test("a sold-out answer from the database becomes a clear 409 naming the item", async () => {
  track();
  process.env.SUPABASE_SECRET_KEY = "test";
  process.env.VITE_SUPABASE_URL = "https://db.test";
  const realFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response(JSON.stringify({ message: `out_of_stock:${VID}` }), { status: 400 });
  try {
    await assert.rejects(reserve([{ variant_id: VID, qty: 1 }]), (e) => e.status === 409 && /Matte Case for iPhone 17 Pro \(Black\) just sold out/.test(e.message));
  } finally {
    globalThis.fetch = realFetch;
    delete process.env.SUPABASE_SECRET_KEY;
    untrack();
  }
});
