# SnapEdge Storefront

React (Vite) storefront for SnapEdge iPhone covers and 9H tempered glass. Features an Apple-inspired design language with fluid spring physics, streamlined product-first e-commerce UX, and a Shiprocket checkout integration.

```bash
npm install
npm run dev
```

## Routes & Screens

| Route | Screen | Description |
| --- | --- | --- |
| `/` | Home | Streamlined storefront: Hero carousel, Quick Model Selector, Best Sellers, Pick Your Protection lineup, and Trust Guarantee strip |
| `/product?id=<cover id>` | Product Details | Full cover details, multi-angle gallery, model picker, and 50% off glass bundle offer; ids are keys in `src/catalog.js` |
| `/collection` | Collection | Complete catalog filterable by category (Covers, Glass, Combos) and iPhone model |
| `/cart` | Shopping Bag | Interactive bag with automatic glass 50% bundle discounts and free shipping calculator |
| `/account` | Customer Account | Order history, saved addresses, and profile details |
| `/signin` | Sign In | Authentication interface (branded for SnapEdge) |
| `/admin` | Operations Dashboard | Orders, fulfillment metrics, and quick actions |
| `/admin/inventory` | Inventory & Catalog | Real-time stock levels, SKU tracking, and Shiprocket catalog sync |

---

## Architecture & Components

- **`src/components/ProductCard.jsx`**: The unified product card used across Best Sellers and The Lineup (`#lineup`).
  - **Pillowed Card Structure**: Light grey outer frame (`#F6F6F6`, 22px radius) with an embedded white info container.
  - **Hover-Triggered Quick View**: Hovering anywhere on the card (`.pcard:hover`) floats the tactile **"Quick view"** button with physical spring transitions.
  - **Multi-Photo Cycling**: Auto-cycles through product angles on hover (1100ms interval) or swipe gestures on touchscreens.
  - **Minimalist Clean Face**: Multi-variant finish pills removed from the card face to guarantee equal heights and zero visual clutter (finish selection deferred to Quick View or product page).
  - **Direct Add**: Instant pointer-down haptic/visual confirmation on the circular bag button.
- **`src/components/QuickView.jsx`**: Responsive quick-shop interface.
  - **Desktop**: Dialog materializes directly from the clicked product card's bounding box using dynamic `transform-origin` and symmetric exit animations.
  - **Mobile**: Becomes an iOS-style bottom sheet with drag-to-dismiss gesture physics, rubber-banding, and background scrim transitions.
- **`src/components/StoreHeader.jsx`**: Sticky navigation header with Apple-inspired frosted glass material (`backdrop-filter: blur(20px)`), dynamic scroll-edge border, and a touch-gesture swipeable mobile drawer.
- **`src/pages/Home.jsx`**: Streamlined homepage experience inspired by high-conversion, product-first e-commerce standards:
  - **Removed Text Clutter**: Removed technical CAD wireframes and bloated multi-paragraph copy ("Engineered front and back" and "Help & guides").
  - **Unified Showcase**: "Best Sellers" and "Pick your protection" both utilize the identical `<ProductCard>` design on clean `#FFFFFF` canvases.
  - **Trust Guarantee Bar**: High-contrast, single-row trust strip (Free Express Delivery, 100% Fit Guarantee, 7-Day Replacements, Cash On Delivery).
- **`src/catalog.js`**: Master catalog for products, iPhone models, and finishes:
  - Studio photography and 3D renders mapped across all 25 catalog items (transparent MagSafe shells, black cases, titanium shades, and 9H tempered glass 2-packs).
  - Uniform top-right badge assignments (`BEST SELLER`, `NEW`, `SALE`).
  - Bundle pricing engine (`priceLines`): Automatically applies 50% discount on 9H tempered glass whenever a cover is added.
- **`src/store.jsx`**: Global application state (selected iPhone models, shopping cart, persisted via `localStorage`).
- **Policy Pages**: `/policies/shipping`, `returns`, `warranty`, `privacy`, `terms`, `contact` configured in `src/policies.js` and `src/business.js`.

---

## Motion & Physics Engine

The site combines GSAP reveals with direct-manipulation Apple design spring physics:

- **`src/motion/physics.js`**:
  - `spring(t, { response, damping })`: Analytical spring evaluation for fluid, organic animations without abrupt stops.
  - `project(pos, vel, decay)`: Momentum projection for flicks and releases.
  - `rubberband(offset, dim, coeff)`: Logarithmic Apple-style resistance for boundary overdrag.
  - `VelocityTracker`: Sampled pointer velocity tracker using exponential smoothing for natural swipe-to-dismiss gestures.
- **`src/motion/sheet.js`**:
  - `useDragDismiss`: Custom hook providing drag gesture tracking, rubberband resistance, velocity-threshold exit checks, and keyboard escape handling for modal dialogs and sheets.
  - `closeWithExit(el, onDone)`: Orchestrates symmetric exit animations before unmounting.
- **`src/motion/gsap.js`**: Central GSAP configuration defining the house rhythm (0.618s `house` ease) and `reducedMotion()` checks.
- **`src/motion/smoothScroll.js`**: Lenis smooth scrolling integrated with the GSAP ticker.
- **`src/motion/PageMotion.jsx`**: Route reveal choreography for headers and grid cards.

---

## Checkout & Backend (Shiprocket)

Built according to Shiprocket's "Checkout Integration Guide for Custom Websites" using Vercel serverless functions in `api/`:

| Endpoint | Purpose |
| --- | --- |
| `GET /api/catalog/products` | Paginated product feed for Shiprocket catalog sync (`?page=1&limit=100`) |
| `GET /api/catalog/collections` | Fetch collections hierarchy |
| `GET /api/catalog/collection-products?collection_id=1` | Products by collection |
| `POST /api/checkout` | Re-verifies bag pricing on the server and returns a signed Shiprocket checkout token |
| `POST /api/shiprocket/order` | Order status webhook (verifies payload with Shiprocket before processing) |

- **Security & Integrity**: Requests signed with `X-Api-HMAC-SHA256` HMAC-SHA256 digests. Client-side prices are never trusted; the server calculates prices via `api/_lib/quote.js`.
- **Variant Mapping**: Every product × iPhone model combination generates a deterministic, stable Shiprocket variant ID (`api/_lib/feed.js`).
- **Catalog Sync**: Run `SITE_URL=https://your-domain node --env-file=.env.local scripts/sync-catalog.js` after catalog modifications.
