import { send } from "../_lib/http.js";
import { COLLECTIONS, toShiprocketCollection, paginate, originOf, loadCatalog } from "../_lib/feed.js";

// GET /api/catalog/collections?page=1&limit=100  (Shiprocket "Fetch Collections")
export default async function handler(req, res) {
  await loadCatalog();
  const origin = originOf(req);
  const { total, items } = paginate(COLLECTIONS, new URL(req.url, "http://x").searchParams);
  send(res, 200, { data: { total, collections: items.map((c) => toShiprocketCollection(c, origin)) } });
}
