import { send } from "../_lib/http.js";
import { COLLECTIONS, sellable, toShiprocketProduct, paginate, originOf } from "../_lib/feed.js";

// GET /api/catalog/collection-products?collection_id=1&page=1&limit=100  (Shiprocket "Fetch Products by Collection")
export default function handler(req, res) {
  const query = new URL(req.url, "http://x").searchParams;
  const collection = COLLECTIONS.find((c) => String(c.id) === query.get("collection_id"));
  const list = collection ? sellable().filter(([, p]) => p.cat === collection.handle) : [];
  const origin = originOf(req);
  const { total, items } = paginate(list, query);
  send(res, 200, { data: { total, products: items.map(([id, p]) => toShiprocketProduct(id, p, origin)) } });
}
