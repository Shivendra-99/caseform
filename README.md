# SnapEdge storefront

React (Vite) storefront for SnapEdge iPhone covers and 9H glass. The homepage and product page follow the "SnapEdge Homepage" design canvas; the other shop and admin screens come from the earlier Stitch project.

```bash
npm install
npm run dev
```

| Route | Screen |
| --- | --- |
| `/` | Home (SnapEdge design) |
| `/product?id=<cover id>` | Cover product page (SnapEdge design); ids are the keys in `src/catalog.js` |
| `/collection` | Cases & glass collection (Stitch) |
| `/cart` | Shopping bag (Stitch) |
| `/account` | Customer account (Stitch) |
| `/signin` | Sign in (front-end only, no auth backend) |
| `/admin` | Operations dashboard |
| `/admin/inventory` | Catalog, SKU & inventory |

- `src/catalog.js`: models, glass finishes and products. Covers (names + photos) come from `SnapEdge_FinalList.xlsx`; their prices, MRPs and weights are placeholders (TODO). The "50% off 9H glass with any cover" offer is applied there (`priceLines`), so every page and the cart agree on prices.
- `src/store.jsx`: cart and selected iPhone model as shared app state, saved in localStorage.
- SnapEdge pages use inline styles from the design plus the `.se-root` rules in `src/index.css` (hover states, phone menu, breakpoints). `src/components/ProductArt.jsx` shows a product's photo (`img`) or, for covers without a clean photo yet, an SVG drawing.
- The Stitch screens' theme tokens live in `tailwind.config.js`.
- Policy pages (`/policies/shipping`, `returns`, `warranty`, `privacy`, `terms`, `contact`) come from `src/policies.js`; business details are in `src/business.js`. Fill every `[bracketed]` value before launch.

## Checkout (Shiprocket)

Built to Shiprocket's "Checkout Integration Guide for Custom Websites" and its API docs. `api/` holds Vercel Functions; `npm run dev` serves them locally through a Vite middleware (`vite.config.js`).

| Endpoint | Purpose |
| --- | --- |
| `GET /api/catalog/products` | Shiprocket "Fetch Products" (paginated, `?page=1&limit=100`) |
| `GET /api/catalog/collections` | Shiprocket "Fetch Collections" |
| `GET /api/catalog/collection-products?collection_id=1` | Shiprocket "Fetch Products by Collection" |
| `POST /api/checkout` | Re-prices the bag on the server and returns a Shiprocket checkout token |
| `POST /api/shiprocket/order` | Order webhook; re-fetches the order from Shiprocket before trusting it |

- Each product × iPhone model (× finish, for glass) is one Shiprocket variant with a stable numeric id (`api/_lib/feed.js`). Keep `num`/`code` in `src/catalog.js` unchanged once synced.
- The browser sends only ids, quantities, model and option; prices (including glass 50% off with a cover) are computed by `api/_lib/quote.js` and passed to Shiprocket per item. `npm test` covers pricing, variant ids, feed completeness and HMAC signing.
- Requests to Shiprocket are signed: `X-Api-HMAC-SHA256` = base64 HMAC-SHA256 of the body with the secret (`api/_lib/shiprocket.js`).
- Shiprocket returns buyers to `/order/confirmed?oid=…&ost=SUCCESS`.
- After changing products or prices: deploy, then `SITE_URL=https://your-domain node --env-file=.env.local scripts/sync-catalog.js`.
- Product images: cover photos are `public/products/*.jpg`; glass, lens and covers without a clean photo use the drawings in `public/products/*.png`. Weights (`grams`) and stock in the catalog are estimates.
- Orders aren't stored yet (no database): they appear in the Vercel logs and the Shiprocket dashboard.
- `vercel.json` rewrites every non-API path to `index.html`, so reloading `/product` and other routes works on Vercel.

## Motion

- `src/motion/gsap.js`: the only place GSAP is imported. It registers plugins and sets the house rhythm (0.618s, `house` ease; also available in Tailwind as `duration-house` / `ease-house`).
- `src/motion/smoothScroll.js`: Lenis smooth scrolling on the shop pages, driven by the GSAP ticker, with anchor links landing below the sticky header.
- `src/motion/PageMotion.jsx`: reveals for each route. Plain-text `h1`/`h2` (or ones marked `data-split`) reveal line by line, and `<article>` cards and children of `[data-reveal]` fade up. Wrap a section in `data-motion-skip` to opt it out.
- The homepage hero's exploded view animates apart on load (case and glass separate from the phone).
- With `prefers-reduced-motion`, Lenis and all of the above are off.
- Add `?debug` to the URL to show ScrollTrigger markers.
