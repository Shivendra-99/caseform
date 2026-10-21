// Run with: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { quote } from "./quote.js";

const M = "iPhone 16 Pro Max";

test("glass is half price when the bag has a cover", () => {
  const q = quote([
    { id: "military", qty: 1, device: M },
    { id: "autoalign", qty: 1, device: M, variant: "HD Clear" },
  ]);
  assert.equal(q.lines[1].unitPrice, 299);
  assert.equal(q.subtotal, 1299 + 299);
  assert.equal(q.shipping, 0);
  assert.equal(q.total, 1598);
});

test("glass alone is full price; small orders pay shipping", () => {
  assert.equal(quote([{ id: "autoalign", qty: 1, device: M, variant: "HD Clear" }]).lines[0].unitPrice, 599);
  const lens = quote([{ id: "lens-glass", qty: 1, device: M }]);
  assert.equal(lens.shipping, 99);
  assert.equal(lens.total, 399 + 99);
});

test("rejects anything the client could tamper with", () => {
  const bad = [
    [],
    [{ id: "edge-armor", qty: 1, device: M }], // retired product
    [{ id: "nope", qty: 1, device: M }],
    [{ id: "military", qty: 0, device: M }],
    [{ id: "military", qty: 1.5, device: M }],
    [{ id: "military", qty: 11, device: M }],
    [{ id: "military", qty: 1, device: "Pixel 9" }],
    [{ id: "military", qty: 1, device: M, variant: "Black" }], // covers have no colour options
    [{ id: "autoalign", qty: 1, device: M, variant: "Gold" }],
    [{ id: "lens-glass", qty: 1, device: M, variant: "Black" }],
  ];
  for (const items of bad) assert.throws(() => quote(items), { status: 400 }, JSON.stringify(items));
});

test("client-sent prices are ignored", () => {
  const q = quote([{ id: "military", qty: 2, device: M, price: 1, unitPrice: 1 }]);
  assert.equal(q.total, 2598);
});
