import { send } from "../_lib/http.js";
import { sellable, toShiprocketProduct, paginate, originOf } from "../_lib/feed.js";

// GET /api/catalog/products?page=1&limit=100  (Shiprocket "Fetch Products")
export default function handler(req, res) {
  const origin = originOf(req);
  const { total, items } = paginate(sellable(), new URL(req.url, "http://x").searchParams);
  send(res, 200, { data: { total, products: items.map(([id, p]) => toShiprocketProduct(id, p, origin)) } });
}
