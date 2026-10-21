// Pushes every product and collection to Shiprocket Checkout's catalog webhooks.
// Run after changing prices or products and deploying:
//   SITE_URL=https://your-domain node --env-file=.env.local scripts/sync-catalog.js
import { config, shiprocket } from "../api/_lib/shiprocket.js";
import { COLLECTIONS, sellable, toShiprocketProduct, toShiprocketCollection } from "../api/_lib/feed.js";

const cfg = config();
const origin = process.env.SITE_URL?.replace(/\/$/, "");
if (!cfg || !origin) {
  console.error("Set SHIPROCKET_CHECKOUT_API_KEY, SHIPROCKET_CHECKOUT_SECRET and SITE_URL first.");
  process.exit(1);
}

for (const c of COLLECTIONS) {
  await shiprocket(cfg, "/wh/v1/custom/collection", toShiprocketCollection(c, origin));
  console.log("collection", c.handle);
}
for (const [id, p] of sellable()) {
  await shiprocket(cfg, "/wh/v1/custom/product", toShiprocketProduct(id, p, origin));
  console.log("product", id);
}
console.log("Catalog synced to", cfg.api);
