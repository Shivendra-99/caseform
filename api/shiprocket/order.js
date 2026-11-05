import { HttpError, readJson, send } from "../_lib/http.js";
import { config, shiprocket, stamped } from "../_lib/shiprocket.js";
import { parseVariantId, loadCatalog } from "../_lib/feed.js";
import { confirm } from "../_lib/stock.js";

// POST /api/shiprocket/order — Shiprocket's order webhook (register this URL with them).
// The webhook isn't signed, so its body is only a hint: the order is re-fetched from
// Shiprocket's authenticated Order Details API and that copy is what we act on.
// Shiprocket may send the same order more than once, so handling must be idempotent.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return send(res, 405, { error: "Method not allowed." });
  }
  try {
    const { order_id: orderId } = await readJson(req);
    if (typeof orderId !== "string" || !/^[\w-]{6,64}$/.test(orderId)) throw new HttpError(400, "Missing order_id.");
    const cfg = config();
    if (!cfg) return send(res, 503, { error: "Checkout isn't configured." });

    const { result: order } = await shiprocket(cfg, "/api/v1/custom-platform-order/details", stamped({ order_id: orderId }));
    if (order?.status !== "SUCCESS") return send(res, 200, { ok: true, ignored: order?.status ?? "unknown" });

    await loadCatalog();
    const items = order.cart_data.items.map((i) => ({ ...parseVariantId(i.variant_id), qty: i.quantity, variant_id: i.variant_id }));
    // Keep the stock this order took (confirms its checkout hold; safe if Shiprocket retries).
    await confirm(order.order_id, items.map((i) => ({ variant_id: Number(i.variant_id), qty: i.qty })));
    // TODO: persist the order (no database yet). Until then it's in the Vercel logs and the Shiprocket dashboard.
    console.log("order placed", JSON.stringify({
      orderId: order.order_id,
      fastrrOrderId: order.fastrr_order_id,
      paymentType: order.payment_type,
      paymentStatus: order.payment_status,
      total: order.total_amount_payable,
      pincode: order.shipping_address?.pincode,
      items,
    }));
    return send(res, 200, { ok: true });
  } catch (e) {
    if (e instanceof HttpError) return send(res, e.status, { error: e.message });
    console.error("order webhook failed", e);
    return send(res, 500, { error: "Webhook failed." });
  }
}
