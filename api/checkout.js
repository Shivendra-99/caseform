import { PRODUCTS, MODELS, optionsFor } from "../src/catalog.js";
import { quote } from "./_lib/quote.js";
import { HttpError, readJson, send } from "./_lib/http.js";
import { config, shiprocket, stamped } from "./_lib/shiprocket.js";
import { variantId, imagePath, originOf, absolute, loadCatalog } from "./_lib/feed.js";
import { reserve, release, attach } from "./_lib/stock.js";

// POST /api/checkout  { items: [{ id, qty, device, variant }] }
// Prices the bag on the server, then creates a Shiprocket Checkout access token. Prices are
// sent per item (catalog_data), so the "glass 50% off with a cover" offer carries into checkout.
// Stock-tracked items are reserved first (all or nothing), so two shoppers can't both pay for the
// last piece; the hold is linked to the Shiprocket order and confirmed by the order webhook.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return send(res, 405, { error: "Method not allowed." });
  }
  try {
    const { items } = await readJson(req);
    await loadCatalog();
    const order = quote(items);

    const cfg = config();
    if (!cfg) return send(res, 503, { error: "Online checkout isn't switched on yet. Please try again soon.", quote: order });

    const origin = originOf(req);
    const cartItems = order.lines.map((l) => {
      const p = PRODUCTS[l.id];
      const opts = optionsFor(p);
      const oi = opts ? opts.findIndex((o) => o.name === l.variant) : 0;
      return {
        variant_id: String(variantId(p, MODELS.indexOf(l.device), oi)),
        quantity: l.qty,
        catalog_data: { price: l.unitPrice, name: [l.name, l.device, l.variant].filter(Boolean).join(" · "), image_url: absolute(origin, imagePath(p, oi)) },
      };
    });

    const hold = await reserve(cartItems.map((i) => ({ variant_id: Number(i.variant_id), qty: i.quantity })));
    let data;
    try {
      data = await shiprocket(cfg, "/api/v1/access-token/checkout", stamped({
        cart_data: { items: cartItems, mobile_app: false },
        redirect_url: `${origin}/order/confirmed`, // Shiprocket appends ?oid=<order id>&ost=<status>
      }));
    } catch (e) {
      await release(hold); // checkout never started: put the pieces back
      throw e;
    }
    const orderId = data.result.data?.order_id;
    // Without the order id the hold just expires; the webhook then takes the stock directly.
    await attach(hold, orderId);
    return send(res, 200, {
      token: data.result.token,
      orderId,
      ui: cfg.ui,
      fallbackUrl: `${origin}/cart`,
    });
  } catch (e) {
    if (e instanceof HttpError) return send(res, e.status, { error: e.message });
    console.error("checkout failed", e);
    return send(res, 500, { error: "Something went wrong. Please try again." });
  }
}
