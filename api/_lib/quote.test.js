// Run with: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { quote } from "./quote.js";

const M = "iPhone 17 Pro";

test("prices come from the catalog and covers ship free", () => {
  const q = quote([
    { id: "matte", qty: 1, device: M, variant: "Black" },
    { id: "silicone", qty: 1, device: M, variant: "Blue" },
  ]);
  assert.equal(q.subtotal, 599 + 699);
  assert.equal(q.shipping, 0);
  assert.equal(q.total, 1298);
});

test("rejects anything the client could tamper with", () => {
  const ok = { id: "matte", qty: 1, device: M, variant: "Black" };
  const bad = [
    [],
    [{ ...ok, id: "military" }], // product no longer sold
    [{ ...ok, id: "nope" }],
    [{ ...ok, qty: 0 }],
    [{ ...ok, qty: 1.5 }],
    [{ ...ok, qty: 11 }],
    [{ ...ok, device: "Pixel 9" }],
    [{ ...ok, variant: "Pink" }], // not one of its colours
    [{ ...ok, variant: undefined }], // colour must be picked
  ];
  for (const items of bad) assert.throws(() => quote(items), { status: 400 }, JSON.stringify(items));
});

test("client-sent prices are ignored", () => {
  const q = quote([{ id: "matte", qty: 2, device: M, variant: "Black", price: 1, unitPrice: 1 }]);
  assert.equal(q.total, 1198);
});

test("covers with colours: must pick one, and the first keeps the old variant id", async () => {
  const { PRODUCTS, variantId } = await import("../../src/catalog.js");
  const { parseVariantId } = await import("./feed.js");
  assert.equal(quote([{ id: "silicone", qty: 1, device: M, variant: "Blue" }]).lines[0].variant, "Blue");
  assert.throws(() => quote([{ id: "silicone", qty: 1, device: M }]), /valid option/);
  assert.throws(() => quote([{ id: "silicone", qty: 1, device: M, variant: "Pink" }]), /valid option/);
  assert.equal(variantId(PRODUCTS.silicone, 0, 0), 124000); // same id the colourless cover had
  assert.deepEqual(parseVariantId(124062), { id: "silicone", device: M, variant: "Blue" });
});
