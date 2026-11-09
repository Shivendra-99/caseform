import { Link, useSearchParams } from "react-router-dom";
import { useStore } from "../store.jsx";
import { PRODUCTS, fitsText } from "../catalog.js";
import ProductCard from "../components/ProductCard.jsx";
import ModelPicker from "../components/ModelPicker.jsx";
import Promises from "../components/Promises.jsx";
import PriceFilter from "../components/PriceFilter.jsx";

const ITEMS = Object.entries(PRODUCTS).map(([id, p]) => ({ id, ...p }));
const CATS = [
  { id: "all", label: "All", title: "Shop all" },
  { id: "covers", label: "Covers", title: "iPhone covers" },
];
// Feature filters match words in a product's name or feature line; several narrow the list (AND).
const FEATURES = [
  { id: "magsafe", label: "MagSafe", test: (p) => /magsafe/i.test(p.name + p.feat) },
  { id: "kickstand", label: "Kickstand", test: (p) => /kickstand/i.test(p.name + p.feat) },
  { id: "clear", label: "Clear", test: (p) => /clear/i.test(p.name + p.feat) },
];
// Price slider spans the catalogue, rounded out to ₹100 steps.
const PRICES = ITEMS.map((p) => p.price);
const PRICE_LO = Math.floor(Math.min(...PRICES) / 100) * 100;
const PRICE_HI = Math.ceil(Math.max(...PRICES) / 100) * 100;
const PRICE_PRESETS = [
  { label: "Under ₹700", max: 700 },
  { label: "₹700 – ₹1,000", min: 700, max: 1000 },
  { label: "₹1,000 & up", min: 1000 },
];
const rupees = (v) => (v != null && v !== "" && Number.isFinite(Number(v)) ? Math.round(Number(v)) : null);

const SORTS = [
  { id: "featured", label: "Featured", by: null },
  { id: "price-asc", label: "Price: low to high", by: (a, b) => a.price - b.price },
  { id: "price-desc", label: "Price: high to low", by: (a, b) => b.price - a.price },
  { id: "discount", label: "Biggest discount", by: (a, b) => b.mrp - b.price - (a.mrp - a.price) },
];

const pillStyle = (on) => ({ height: "40px", padding: "0 16px", borderRadius: "50px", border: `1px solid ${on ? "#111111" : "#DDDDDD"}`, background: on ? "#111111" : "#FFFFFF", color: on ? "#FFFFFF" : "#222222", fontFamily: "inherit", fontSize: "14px", fontWeight: "600", cursor: "pointer", whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: "6px", flexShrink: "0" });

// Collection: every product, with real category, feature and sort controls. The choices live in the
// URL (?cat=covers&f=magsafe&sort=price-asc), so links can open it pre-filtered and the back button works.
export default function Collection() {
  const { devices, setDevices } = useStore();
  const [params, setParams] = useSearchParams();
  const cat = CATS.find((c) => c.id === params.get("cat")) ?? CATS[0];
  const feats = (params.get("f") ?? "").split(",").filter((id) => FEATURES.some((f) => f.id === id));
  const sort = SORTS.find((s) => s.id === params.get("sort")) ?? SORTS[0];
  const minPrice = rupees(params.get("min"));
  const maxPrice = rupees(params.get("max"));

  // REPLACE: tweaking filters shouldn't stack history entries or scroll the page.
  const update = (patch) => {
    const next = new URLSearchParams(params);
    for (const [k, v] of Object.entries(patch)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    setParams(next, { replace: true });
  };
  const toggleFeat = (id) => update({ f: (feats.includes(id) ? feats.filter((x) => x !== id) : [...feats, id]).join(",") });
  const clearAll = () => update({ cat: null, f: null, min: null, max: null });

  const inCat = ITEMS.filter((p) => cat.id === "all" || p.cat === cat.id);
  const inPrice = (p) => (minPrice == null || p.price >= minPrice) && (maxPrice == null || p.price <= maxPrice);
  const shown = inCat.filter((p) => inPrice(p) && FEATURES.every((f) => !feats.includes(f.id) || f.test(p)));
  if (sort.by) shown.sort(sort.by);
  const catCount = (c) => ITEMS.filter((p) => c.id === "all" || p.cat === c.id).length;
  const featCount = (f) => inCat.filter((p) => f.test(p)).length;

  return (
    <main className="se-root se-font" style={{ background: "#FFFFFF" }}>
      <section className="wrap" style={{ maxWidth: "1420px", margin: "0 auto", padding: "32px 40px 28px" }}>
        <nav aria-label="Breadcrumb" style={{ fontSize: "13px", color: "#666666", marginBottom: "18px" }}>
          <Link to="/" style={{ color: "#666666" }}>
            Home
          </Link>
          {" / "}
          <span aria-current="page" style={{ color: "#111111" }}>
            {cat.title}
          </span>
        </nav>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "20px 40px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", minWidth: "0" }}>
            <h1 className="hx" style={{ margin: "0", fontSize: "48px", lineHeight: "1.05", fontWeight: "800", letterSpacing: "-0.03em", color: "#111111" }}>
              {cat.title}
            </h1>
            <p id="col-help" style={{ margin: "0", maxWidth: "560px", fontSize: "15px", lineHeight: "1.6", color: "#555555" }}>
              {"Cut for "}
              <strong style={{ color: "#111111", fontWeight: "600" }}>{fitsText(devices)}</strong>
              {"."}
            </p>
          </div>
          <div style={{ width: "100%", maxWidth: "360px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <span id="col-model-label" style={{ fontSize: "13px", fontWeight: "600", color: "#111111" }}>
              Shopping for
            </span>
            <ModelPicker value={devices} onChange={setDevices} labelledBy="col-model-label" describedBy="col-help" />
          </div>
        </div>
      </section>

      {/* Toolbar: stays under the sticky header while the grid scrolls. */}
      <div className="col-bar" style={{ position: "sticky", top: "76px", zIndex: "20", background: "rgba(255,255,255,0.96)", borderBottom: "1px solid #EEEEEE" }}>
        <div className="wrap" style={{ maxWidth: "1420px", margin: "0 auto", padding: "14px 40px", display: "flex", alignItems: "center", gap: "12px 16px", flexWrap: "wrap" }}>
          <div className="chip-row" role="group" aria-label="Category">
            {CATS.map((c) => (
              <button key={c.id} type="button" aria-pressed={c.id === cat.id} onClick={() => update({ cat: c.id === "all" ? null : c.id })} style={pillStyle(c.id === cat.id)}>
                {c.label}
                <span style={{ fontWeight: "500", opacity: 0.6 }}>{catCount(c)}</span>
              </button>
            ))}
          </div>
          <span aria-hidden="true" className="col-bar-rule" style={{ width: "1px", height: "24px", background: "#E2E2E2" }} />
          <div className="chip-row" role="group" aria-label="Features">
            {FEATURES.map((f) => {
              const on = feats.includes(f.id);
              return (
                <button key={f.id} type="button" aria-pressed={on} onClick={() => toggleFeat(f.id)} style={{ ...pillStyle(false), border: `1px solid ${on ? "#111111" : "#DDDDDD"}`, background: on ? "#F2F2F2" : "#FFFFFF" }}>
                  {on && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  )}
                  {f.label}
                  <span style={{ fontWeight: "500", opacity: 0.6 }}>{featCount(f)}</span>
                </button>
              );
            })}
          </div>
          <div className="col-tools" style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <PriceFilter lo={PRICE_LO} hi={PRICE_HI} min={minPrice} max={maxPrice} presets={PRICE_PRESETS} count={shown.length} onChange={({ min, max }) => update({ min: min == null ? null : String(min), max: max == null ? null : String(max) })} />
            <label style={{ position: "relative", display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#666666" }}>
              Sort
              <select value={sort.id} onChange={(e) => update({ sort: e.target.value === "featured" ? null : e.target.value })} style={{ height: "40px", padding: "0 38px 0 16px", borderRadius: "50px", border: "1px solid #DDDDDD", background: "#FFFFFF", color: "#111111", fontFamily: "inherit", fontSize: "14px", fontWeight: "600", appearance: "none", WebkitAppearance: "none", cursor: "pointer" }}>
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ position: "absolute", right: "14px", pointerEvents: "none" }}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </label>
          </div>
        </div>
      </div>

      <section className="wrap" style={{ maxWidth: "1420px", margin: "0 auto", padding: "24px 40px 72px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
          <p aria-live="polite" style={{ margin: "0", fontSize: "14px", color: "#666666" }}>
            <strong style={{ color: "#111111", fontWeight: "600" }}>{shown.length}</strong>
            {shown.length === 1 ? " product" : " products"}
            {" · Prices incl. of all taxes"}
          </p>
          {(feats.length > 0 || cat.id !== "all" || minPrice != null || maxPrice != null) && (
            <button type="button" onClick={clearAll} style={{ height: "40px", padding: "0 4px", border: "0", background: "transparent", color: "#111111", fontFamily: "inherit", fontSize: "14px", fontWeight: "600", textDecoration: "underline", textUnderlineOffset: "3px", cursor: "pointer" }}>
              Clear filters
            </button>
          )}
        </div>

        {shown.length ? (
          <div className="g4" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "20px" }}>
            {shown.map((p) => (
              <ProductCard key={p.id} id={p.id} />
            ))}
          </div>
        ) : (
          <div style={{ padding: "64px 24px", borderRadius: "22px", background: "#F6F6F6", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", textAlign: "center" }}>
            <p style={{ margin: "0", fontSize: "18px", fontWeight: "600", color: "#111111" }}>Nothing matches all of those filters.</p>
            <p style={{ margin: "0", fontSize: "14px", color: "#666666" }}>Try removing one, or start again.</p>
            <button type="button" className="btn-solid" onClick={clearAll} style={{ height: "48px", padding: "0 24px", border: "0", borderRadius: "50px", background: "#111111", color: "#FFFFFF", fontFamily: "inherit", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>
              Clear filters
            </button>
          </div>
        )}

        <div style={{ marginTop: "40px" }}>
          <Promises />
        </div>
      </section>
    </main>
  );
}
