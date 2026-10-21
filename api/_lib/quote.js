import { PRODUCTS, MODELS, optionsFor, priceLines, shippingFor } from "../../src/catalog.js";
import { HttpError } from "./http.js";

const MAX_LINES = 20;
const MAX_QTY = 10;

// Prices a bag on the server from the catalog. The client only says what it wants
// (id, qty, model, colour/finish); prices, the glass offer and shipping are computed here.
export function quote(items) {
  if (!Array.isArray(items) || items.length === 0) throw new HttpError(400, "Your bag is empty.");
  if (items.length > MAX_LINES) throw new HttpError(400, "Your bag has too many items.");

  const cart = items.map((it) => {
    const p = PRODUCTS[it?.id];
    // Unknown or retired product ids (e.g. an old bag in localStorage) are rejected.
    if (!p) throw new HttpError(400, "An item in your bag is no longer available. Remove it and try again.");
    if (!Number.isInteger(it.qty) || it.qty < 1 || it.qty > MAX_QTY) throw new HttpError(400, `Quantity for ${p.name} must be between 1 and ${MAX_QTY}.`);
    if (!MODELS.includes(it.device)) throw new HttpError(400, `Choose an iPhone model for ${p.name}.`);
    const options = optionsFor(p);
    if (options ? !options.some((o) => o.name === it.variant) : it.variant != null) throw new HttpError(400, `Choose a valid option for ${p.name}.`);
    return { id: it.id, qty: it.qty, device: it.device, variant: options ? it.variant : undefined };
  });

  const lines = priceLines(cart).map((l) => ({
    id: l.id,
    name: l.name,
    device: l.device,
    variant: l.variant,
    qty: l.qty,
    unitPrice: l.price,
    mrp: l.mrp,
    lineTotal: l.price * l.qty,
  }));
  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
  const mrpTotal = lines.reduce((s, l) => s + l.mrp * l.qty, 0);
  const shipping = shippingFor(subtotal);
  return { lines, subtotal, shipping, total: subtotal + shipping, savings: mrpTotal - subtotal, currency: "INR" };
}
