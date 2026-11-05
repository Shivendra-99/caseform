import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { inr } from "../catalog.js";
import { BADGES } from "../components/ProductCard.jsx";
import { Icon, Thumb, isDrawn, kindLabel, storeUrl, variantsOf } from "./ui.jsx";
import { useProducts } from "./db.js";

const CATS = [
  ["all", "All"],
  ["covers", "Covers"],
  ["glass", "Glass & lens"],
  ["combos", "Combos"],
  ["hidden", "Hidden"],
];
const SORTS = [
  ["catalog", "Shop order"],
  ["price-asc", "Price: low to high"],
  ["price-desc", "Price: high to low"],
  ["off", "Biggest discount"],
];
const offOf = (p) => Math.round((1 - p.price / p.mrp) * 100);
const BY = { "price-asc": (a, b) => a.p.price - b.p.price, "price-desc": (a, b) => b.p.price - a.p.price, off: (a, b) => offOf(b.p) - offOf(a.p) };
// Stock summary for the list: not tracked, total pieces left, or sold out.
function StockCell({ stock }) {
  const vals = Object.values(stock);
  if (!vals.length) return <span className="adm-muted">Not tracked</span>;
  const total = vals.reduce((a, b) => a + b, 0);
  return total ? (
    `${total} left`
  ) : (
    <span className="adm-pill" data-tone="todo">
      Sold out
    </span>
  );
}
const inCat = (r, cat) => (cat === "all" ? true : cat === "hidden" ? !r.active : r.p.cat === cat);

// Matches name, handle, SKU prefix (SE-MA), Shiprocket product id (122) or a full variant id (122030).
const matches = ({ id, p }, q) => [p.name, id, `se-${p.code}`, String(p.num)].some((s) => s.toLowerCase().includes(q)) || (/^\d{6}$/.test(q) && Math.floor(Number(q) / 1000) === p.num);

// Every product, hidden ones included. Filters live in the URL (?q, ?cat, ?sort) so a view can be bookmarked.
export default function Products() {
  const { rows: all, error, reload } = useProducts();
  const { state } = useLocation();
  const [params, setParams] = useSearchParams();
  const [open, setOpen] = useState(null);
  const dialog = useRef(null);
  const q = params.get("q") ?? "";
  const cat = params.get("cat") ?? "all";
  const sort = params.get("sort") ?? "catalog";

  const set = (key, value, fallback) => {
    const next = new URLSearchParams(params);
    if (value && value !== fallback) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  useEffect(() => {
    if (open) dialog.current.showModal();
  }, [open]);

  const head = (
    <header className="adm-head adm-head-row">
      <div>
        <h1>Products</h1>
        <p>{all ? `${all.length} products · ${all.filter((r) => !r.active).length} hidden · prices in ₹ incl. GST` : "Loading from Supabase…"}</p>
      </div>
      <Link to="/admin/products/new" className="adm-btn primary">
        <Icon name="plus" size={16} />
        Add product
      </Link>
    </header>
  );

  if (error)
    return (
      <div className="adm-page">
        {head}
        <div className="adm-card adm-empty" role="alert">
          <p className="adm-empty-title">Couldn't load products</p>
          <p>{error}</p>
          <button type="button" className="adm-btn" onClick={reload}>
            Try again
          </button>
        </div>
      </div>
    );
  if (!all)
    return (
      <div className="adm-page" aria-busy="true">
        {head}
        <div className="adm-card adm-skeleton" />
      </div>
    );

  const needle = q.trim().toLowerCase();
  const rows = all.filter((r) => inCat(r, cat) && (!needle || matches(r, needle)));
  if (BY[sort]) rows.sort(BY[sort]);
  const openRow = open && all.find((r) => r.id === open);

  return (
    <div className="adm-page">
      {head}
      {state?.saved && (
        <p className="adm-notice" role="status">
          <Icon name="check" size={16} />
          {`Saved "${state.saved}". The shop shows it on the next page load.`}
        </p>
      )}

      <div className="adm-toolbar">
        <label className="adm-search">
          <Icon name="search" size={16} />
          <span className="sr-only">Search products</span>
          <input type="search" className="adm-input" placeholder="Name, SKU or variant ID" value={q} onChange={(e) => set("q", e.target.value)} />
        </label>
        <div role="group" aria-label="Category" className="adm-seg">
          {CATS.map(([id, label]) => (
            <button key={id} type="button" aria-pressed={cat === id} onClick={() => set("cat", id, "all")}>
              {label}
              <span className="adm-seg-count">{all.filter((r) => inCat(r, id)).length}</span>
            </button>
          ))}
        </div>
        <label className="adm-sort">
          <span className="sr-only">Sort</span>
          <select className="adm-input" value={sort} onChange={(e) => set("sort", e.target.value, "catalog")}>
            {SORTS.map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="adm-count" aria-live="polite">{`Showing ${rows.length} of ${all.length}`}</p>

      {rows.length ? (
        <div className="adm-card adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col" className="col-opt">
                  Type
                </th>
                <th scope="col" className="num">
                  Price
                </th>
                <th scope="col" className="num col-opt col-wide">
                  MRP
                </th>
                <th scope="col" className="num col-opt">
                  Off
                </th>
                <th scope="col" className="col-opt">
                  Photos
                </th>
                <th scope="col" className="col-opt">
                  Stock
                </th>
                <th scope="col">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ id, active, stock, p }) => (
                <tr key={id} className={active ? undefined : "is-hidden"}>
                  <td>
                    <div className="adm-prod">
                      <Thumb p={p} />
                      <div>
                        <Link to={`/admin/products/${id}`} className="adm-prod-name adm-prod-link">
                          {p.name}
                        </Link>
                        <span className="adm-prod-meta">
                          <span className="adm-mono">{`SE-${p.code} · #${p.num}`}</span>
                          {!active && (
                            <span className="adm-pill" data-tone="todo">
                              Hidden
                            </span>
                          )}
                          {p.badge && <span className="adm-tag">{BADGES[p.badge].label}</span>}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="col-opt">{kindLabel(p)}</td>
                  <td className="num">{inr(p.price)}</td>
                  <td className="num col-opt col-wide adm-muted">{inr(p.mrp)}</td>
                  <td className="num col-opt">{offOf(p) ? `${offOf(p)}%` : "–"}</td>
                  <td className="col-opt">
                    {isDrawn(p) ? (
                      <span className="adm-pill" data-tone="todo">
                        {p.img ? "Drawing" : "No photo"}
                      </span>
                    ) : (
                      `${p.imgs.length} ${p.imgs.length === 1 ? "photo" : "photos"}`
                    )}
                  </td>
                  <td className="col-opt">
                    <StockCell stock={stock} />
                  </td>
                  <td>
                    <div className="adm-row-actions">
                      <Link to={`/admin/products/${id}`} className="adm-btn sm" aria-label={`Edit ${p.name}`}>
                        Edit
                      </Link>
                      <button type="button" className="adm-btn sm col-opt-inline" onClick={() => setOpen(id)} aria-label={`Variants of ${p.name}`}>
                        Variants
                      </button>
                      {active && (
                        <Link to={storeUrl(id, p)} className="adm-icon-btn" aria-label={`${p.name} in the store`} title="View in store">
                          <Icon name="external" size={16} />
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="adm-card adm-empty">
          <p className="adm-empty-title">{q ? `No products match "${q}".` : "Nothing here yet."}</p>
          <p>Try a product name, a SKU like SE-MA, or a 6-digit variant ID.</p>
          <button type="button" className="adm-btn" onClick={() => setParams({}, { replace: true })}>
            Clear search and filters
          </button>
        </div>
      )}

      <dialog ref={dialog} className="adm-dialog" aria-labelledby="variants-title" onClose={() => setOpen(null)}>
        {openRow && <Variants id={openRow.id} p={openRow.p} onClose={() => dialog.current.close()} />}
      </dialog>
    </div>
  );
}

// Every Shiprocket variant of one product, to match an order line to a product.
function Variants({ id, p, onClose }) {
  const list = variantsOf(id, p);
  return (
    <>
      <div className="adm-dialog-head">
        <Thumb p={p} size={40} />
        <div>
          <h2 id="variants-title">{p.name}</h2>
          <p>{`${list.length} variants · ${inr(p.price)} each`}</p>
        </div>
        <button type="button" className="adm-icon-btn" onClick={onClose} aria-label="Close">
          <Icon name="close" />
        </button>
      </div>
      <div className="adm-dialog-body">
        <table className="adm-table">
          <thead>
            <tr>
              <th scope="col">Variant</th>
              <th scope="col">SKU</th>
              <th scope="col" className="num">
                Shiprocket ID
              </th>
            </tr>
          </thead>
          <tbody>
            {list.map((v) => (
              <tr key={v.id}>
                <td>{v.title}</td>
                <td className="adm-mono">{v.sku}</td>
                <td className="num adm-mono">{v.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
