import { PRODUCTS } from "../../src/catalog.js";
import { HttpError } from "./http.js";
import { parseVariantId } from "./feed.js";

// Stock reservations (supabase/stock.sql). These database functions only run with the server's
// secret key, so a shopper's browser can never reserve, release or confirm stock itself.
const HOLD_MINUTES = 20; // how long a started checkout keeps its pieces while the shopper pays

async function rpc(fn, args) {
  const res = await fetch(`${process.env.VITE_SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: { apikey: process.env.SUPABASE_SECRET_KEY, "Content-Type": "application/json" },
    body: JSON.stringify(args),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw Object.assign(new Error(data?.message ?? `${fn} failed (${res.status})`), { status: res.status });
  return data;
}

const tracked = (vid) => Boolean(Object.values(PRODUCTS).find((p) => p.num === Math.floor(vid / 1000))?.stock);
const describe = (ids) =>
  ids
    .map(parseVariantId)
    .filter(Boolean)
    .map((v) => `${PRODUCTS[v.id].name} for ${v.device}${v.variant ? ` (${v.variant})` : ""}`);

// Reserves every tracked line, or throws 409 naming what just sold out. Returns the hold id, or null
// when nothing in the bag is stock-tracked. lines: [{ variant_id, qty }].
export async function reserve(lines) {
  if (!lines.some((l) => tracked(l.variant_id))) return null;
  if (!process.env.SUPABASE_SECRET_KEY) {
    console.error("stock: SUPABASE_SECRET_KEY is not set, so stock can't be reserved");
    throw new HttpError(503, "Checkout isn't switched on yet. Please try again soon.");
  }
  try {
    return await rpc("reserve_stock", { p_items: lines, p_minutes: HOLD_MINUTES });
  } catch (e) {
    const sold = /^out_of_stock:([\d,]+)/.exec(e.message);
    if (!sold) throw e;
    const names = describe(sold[1].split(",").map(Number));
    throw new HttpError(409, `Sorry, ${names.join(" and ") || "an item in your bag"} just sold out. Remove it or pick another model, then try again.`);
  }
}

export async function release(hold) {
  if (hold) await rpc("release_hold", { p_hold: hold }).catch((e) => console.error("stock: release failed", hold, e.message));
}
export async function attach(hold, orderRef) {
  if (hold && orderRef) await rpc("attach_hold", { p_hold: hold, p_ref: String(orderRef) }).catch((e) => console.error("stock: attach failed", hold, e.message));
}

// From the order webhook: keeps the stock taken for a paid / COD order. Never throws: the order is
// real either way, so problems are logged for a person to sort out.
export async function confirm(orderRef, lines) {
  if (!process.env.SUPABASE_SECRET_KEY) return console.error("stock: SUPABASE_SECRET_KEY is not set; order", orderRef, "not deducted from stock");
  try {
    const result = await rpc("confirm_order", { p_ref: String(orderRef), p_items: lines });
    if (result !== "ok") console.error(`stock: OVERSOLD on order ${orderRef}: ${describe(result.split(":")[1].split(",").map(Number)).join(", ")}. Restock or refund.`);
  } catch (e) {
    console.error("stock: confirm failed for order", orderRef, e.message);
  }
}
