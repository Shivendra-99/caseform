# CASEFORM storefront

React (Vite) build of the "Caseform iPhone Protection Storefront" Stitch project.

```bash
npm install
npm run dev
```

| Route | Screen |
| --- | --- |
| `/` | Home |
| `/collection` | iPhone 17 Pro cases & glass collection |
| `/product` | AeroShield Clear MagSafe case |
| `/cart` | Shopping bag |
| `/account` | Customer account |
| `/signin` | Sign in (front-end only, no auth backend) |
| `/admin` | Operations dashboard |
| `/admin/inventory` | Catalog, SKU & inventory |

- Theme tokens (colours, type scale, spacing) live in `tailwind.config.js`, exported from the Stitch design system.
- Cart and selected iPhone model are shared app state in `src/store.jsx` (in memory, resets on reload).

## Motion

- `src/motion/gsap.js`: the only place GSAP is imported. It registers plugins and sets the house rhythm (0.618s, `house` ease; also available in Tailwind as `duration-house` / `ease-house`).
- `src/motion/smoothScroll.js`: Lenis smooth scrolling on the shop pages, driven by the GSAP ticker.
- `src/motion/PageMotion.jsx`: reveals for each route. Plain-text `h1`/`h2` (or ones marked `data-split`) reveal line by line, and `<article>` cards and children of `[data-reveal]` fade up. Wrap a section in `data-motion-skip` to opt it out.
- `src/components/ExplodedStack.jsx`: the Home signature section, a pinned scroll scene that pulls the glass, iPhone, MagSafe ring and case apart.
- With `prefers-reduced-motion`, Lenis, reveals and pinning are all off and the stack shows as a static diagram.
- Add `?debug` to the URL to show ScrollTrigger markers and the stack progress HUD.
