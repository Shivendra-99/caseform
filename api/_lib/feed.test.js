// Run with: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { existsSync } from "node:fs";
import { sellable, toShiprocketProduct, variantId, parseVariantId } from "./feed.js";
import { sign } from "./shiprocket.js";

test("every variant id is unique and maps back to product, model and option", () => {
  const seen = new Set();
  for (const [id, p] of sellable()) {
    for (const v of toShiprocketProduct(id, p, "https://x").variants) {
      assert.ok(!seen.has(v.id), `duplicate variant ${v.id}`);
      seen.add(v.id);
      const back = parseVariantId(v.id);
      assert.equal(back.id, id);
      assert.equal(v.title, [back.device, back.variant].filter(Boolean).join(" / "));
    }
  }
  assert.equal(parseVariantId(999999), null);
  assert.equal(parseVariantId(102001), null); // product 102 is no longer sold
});

test("feed has no missing values (Shiprocket requires every field)", () => {
  const walk = (v, path) => {
    assert.ok(v !== undefined && v !== null, `empty field ${path}`);
    if (typeof v === "object") for (const [k, x] of Object.entries(v)) walk(x, `${path}.${k}`);
  };
  for (const [id, p] of sellable()) walk(toShiprocketProduct(id, p, "https://x"), id);
});

test("every product and variant image exists in public/", () => {
  for (const [id, p] of sellable()) {
    for (const src of [toShiprocketProduct(id, p, ""), ...toShiprocketProduct(id, p, "").variants].map((x) => x.image.src)) {
      assert.ok(existsSync(new URL(`../../public${src}`, import.meta.url)), `${id}: missing ${src}`);
    }
  }
});

test("variant id layout", () => {
  assert.equal(variantId({ num: 101 }, 2, 3), 101023);
});

test("HMAC is base64 SHA-256 of the exact body", () => {
  const body = JSON.stringify({ a: 1 });
  assert.equal(sign("secret", body), createHmac("sha256", "secret").update(body).digest("base64"));
});
