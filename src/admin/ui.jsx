import { PRODUCTS } from "../catalog.js";
import { imagePath, toShiprocketProduct } from "../../api/_lib/feed.js";

// Shared bits for the admin pages: icons, product thumbnails and catalog helpers.

const PATHS = {
  overview: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </>
  ),
  products: (
    <>
      <path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5z" />
      <path d="M3.5 7.5 12 12l8.5-4.5M12 12v9" />
    </>
  ),
  orders: (
    <>
      <path d="M6 3.5h12v17l-3-2-3 2-3-2-3 2z" />
      <path d="M9 8.5h6M9 12.5h6" />
    </>
  ),
  store: (
    <>
      <path d="M4.5 10.5V20h15v-9.5" />
      <path d="M3.5 9 5.5 4h13l2 5c0 1.6-1.3 2.5-2.6 2.5S15.4 10.6 15.4 9c0 1.6-1.4 2.5-2.7 2.5h-1.4C10 11.5 8.6 10.6 8.6 9c0 1.6-1.2 2.5-2.5 2.5S3.5 10.6 3.5 9z" />
    </>
  ),
  external: <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.4-4.4" />
    </>
  ),
  copy: (
    <>
      <rect x="8.5" y="8.5" width="12" height="12" rx="2" />
      <path d="M15.5 8.5v-3a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  phone: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  left: <path d="M15 6l-6 6 6 6" />,
  right: <path d="M9 6l6 6-6 6" />,
  upload: <path d="M12 16V4M7 9l5-5 5 5M5 20h14" />,
  signout: <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 8l-4 4 4 4M6 12h10" />,
};

export const Icon = ({ name, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {PATHS[name]}
  </svg>
);

export const Thumb = ({ p, size = 44 }) => (
  <span className="adm-thumb" style={{ width: `${size}px`, height: `${Math.round(size * 1.18)}px` }}>
    <img src={imagePath(p)} alt="" />
  </span>
);

export const SHIPROCKET_URL = "https://app.shiprocket.in/";
export const kindLabel = (p) => ({ case: "Cover", combo: "Combo", glass: "Screen glass", lens: "Lens glass" })[p.kind];
// Covers have their own page; everything else opens its collection.
export const storeUrl = (id, p = PRODUCTS[id]) => (p.kind === "case" ? `/product?id=${id}` : `/collection?cat=${p.cat}`);
// Every Shiprocket variant (model × finish) with its SKU and numeric id, exactly as the catalog feed sends them.
export const variantsOf = (id, p = PRODUCTS[id]) => toShiprocketProduct(id, p, "").variants;
// Covers whose main picture is still a drawing, not a photo.
export const isDrawn = (p) => p.kind === "case" && (!p.img || p.img.startsWith("/products/case-"));
