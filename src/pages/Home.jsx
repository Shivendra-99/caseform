import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store.jsx";
import { COLORS, PRODUCTS, BEST_SELLERS, inr, modelsText } from "../catalog.js";
import ProductArt from "../components/ProductArt.jsx";
import ModelPicker from "../components/ModelPicker.jsx";
import HeroCarousel from "../components/HeroCarousel.jsx";
import ProductCard from "../components/ProductCard.jsx";

const CATS = [
  { id: "all", label: "All" },
  { id: "covers", label: "Covers" },
  { id: "glass", label: "Glass" },
  { id: "combos", label: "Combos" },
];

// Cover lines shown in "The lineup". The first id is the line's picture and "Shop" target.
const LINES = [
  { name: "Slim Shell", best: "slim, clear carry", desc: "Thin clear shells with a MagSafe ring: plain, ultra clear, or with a kickstand.", chips: ["Slim", "Clear", "MagSafe"], ids: ["slim-shell-plus", "ss-ultra-clear", "slim-shell-kickstand"] },
  { name: "DualTek", best: "two-layer protection", desc: "Dual-layer cases in six styles, from clear and colour-matched to 360° kickstand.", chips: ["Dual-layer", "MagSafe", "Kickstand options"], ids: ["dualtek-2colour", "dualtek-kickstand", "dualtek-clear", "dualtek-studio", "dualtek-air", "dualtek-aura"] },
  { name: "Military Anti-Fall", best: "maximum protection", desc: "Rugged armour corners and a raised guard around the camera.", chips: ["Rugged", "Anti-fall", "Camera guard"], ids: ["military"] },
  { name: "SnapEdge Originals", best: "standing out", desc: "Our own designs: holo, gradient, frosted, carbon-weave and soft matte.", chips: ["SnapEdge design", "5 styles"], ids: ["holo-feather", "berry-fade", "frost-blue", "carbon-plum", "lavender-matte"] },
].map((l) => ({ ...l, pic: PRODUCTS[l.ids[0]], from: Math.min(...l.ids.map((id) => PRODUCTS[id].price)) }));

// Filled/outlined pill colours shared by the category and finish pills.
const pill = (on, idle) => ({ pressed: on ? "true" : "false", bg: on ? "#000000" : idle.bg, fg: on ? "#FFFFFF" : "#222222", bd: on ? "#000000" : idle.bd });

export default function Home() {
  const { devices, setDevices } = useStore();
  const many = devices.length > 1;
  const allFits = modelsText(devices);
  const [cat, setCat] = useState("all");


  const cats = CATS.map((c) => ({ label: c.label, ...pill(c.id === cat, { bg: "#FFFFFF", bd: "#DDDDDD" }), pick: () => setCat(c.id) }));
  const showGlass = () => setCat("glass");

  const ids = BEST_SELLERS.filter((id) => cat === "all" || PRODUCTS[id].cat === cat);

  return (
    <main className="se-root se-font" style={{ background: "#FFFFFF" }}>
      {/* 3. HERO */}
      <HeroCarousel />

      {/* 4. QUICK MODEL SELECTOR */}
      <section id="models" aria-label="Shop by iPhone model" style={{ background: "#FFFFFF", borderBottom: "1px solid #EEEEEE" }}>
        <div className="wrap" style={{ maxWidth: "1420px", margin: "0 auto", padding: "28px 40px", display: "flex", alignItems: "center", gap: "16px 32px", flexWrap: "wrap" }}>
          <span id="model-label" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#666666", flexShrink: "0" }}>
            Shop by model
          </span>
          <div className="model-pick" style={{ flex: "0 1 360px", minWidth: "260px" }}>
            <ModelPicker value={devices} onChange={setDevices} labelledBy="model-label" describedBy="model-help" />
          </div>
          <p id="model-help" style={{ margin: "0", flex: "1 1 300px", maxWidth: "520px", fontSize: "13px", lineHeight: "1.5", color: "#666666" }}>
            Everything below is cut for the models you pick. Buying for the family? Tick several. Not sure which iPhone you have? Settings › General › About › Model Name.
          </p>
          <Link to="/collection" className="model-all" style={{ display: "inline-flex", alignItems: "center", gap: "8px", height: "44px", marginLeft: "auto", fontSize: "14px", fontWeight: "600", color: "#222222", whiteSpace: "nowrap" }}>
            Shop all that fit
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* 7. BEST SELLERS GRID */}
      <section id="bestsellers" style={{ background: "#FFFFFF" }}>
        <div className="wrap" style={{ maxWidth: "1420px", margin: "0 auto", padding: "112px 40px 120px", display: "flex", flexDirection: "column", gap: "40px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <h2 className="hx" style={{ margin: "0", fontSize: "56px", lineHeight: "1.05", fontWeight: "800", letterSpacing: "-0.03em", color: "#222222" }}>
                Best Sellers
              </h2>
              <p style={{ margin: "0", color: "#666666" }}>
                {"Showing fits for "}
                <strong style={{ color: "#222222", fontWeight: "600" }}>
                  {allFits}
                </strong>
                {". Add any cover and the glass is 50% off."}
                {many && " Adding an item puts one in your bag for each model."}
              </p>
            </div>
            <Link className="btn-ghost" to="/collection" style={{ height: "48px", padding: "0 24px", borderRadius: "50px", border: "1.5px solid #222222", color: "#222222", display: "inline-flex", alignItems: "center", gap: "10px", fontWeight: "700", fontSize: "14px" }}>
              View All Products
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap", borderBottom: "1px solid #EEEEEE", paddingBottom: "20px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {cats.map((c, i) => (
                <button key={i} type="button" aria-pressed={c.pressed} onClick={c.pick} style={{ height: "40px", padding: "0 18px", borderRadius: "50px", border: `1px solid ${c.bd}`, background: c.bg, color: c.fg, fontFamily: "inherit", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>
                  {c.label}
                </button>
              ))}
            </div>
            <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666666" }}>
              {ids.length}{" products · Prices incl. of all taxes"}
            </span>
          </div>
          <div className="g4" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "20px" }}>
            {ids.map((id) => (
              <ProductCard key={id} id={id} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. THE LINEUP */}
      <section id="lineup" style={{ background: "#F4F4F4", borderRadius: "0px" }}>
        <div className="wrap" style={{ maxWidth: "1420px", margin: "0 auto", padding: "112px 40px", display: "flex", flexDirection: "column", gap: "48px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "720px" }}>
              <div style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#666666" }}>
                The lineup
              </div>
              <h2 className="hx" style={{ margin: "0", fontSize: "56px", lineHeight: "1.05", fontWeight: "800", letterSpacing: "-0.03em", color: "#222222" }}>
                Pick your protection.
              </h2>
            </div>
            <p style={{ margin: "0", maxWidth: "460px", color: "#666666" }}>
              Four case lines and four kinds of glass. Each one is built for a different way of using your iPhone.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "16px", borderBottom: "1px solid #DDDDDD", paddingBottom: "14px" }}>
              <h3 style={{ margin: "0", fontSize: "29px", fontWeight: "700", letterSpacing: "-0.015em", color: "#222222" }}>
                Covers
              </h3>
              <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666666" }}>
                {LINES.length}{" lines · "}{LINES.reduce((n, l) => n + l.ids.length, 0)}{" cases"}
              </span>
            </div>
            <div className="g4" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "24px" }}>
              {LINES.map((l) => (
                <article key={l.name} className="line" style={{ background: "#FFFFFF", border: "1.5px solid #FFFFFF", padding: "28px", display: "flex", flexDirection: "column", gap: "14px", minWidth: "0" }}>
                  <div style={{ height: "150px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ProductArt kind="case" img={l.pic.img} color={COLORS[l.pic.def]} style={{ width: "100%", height: "100%" }} />
                  </div>
                  <div style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666666" }}>
                    {"Best for: "}{l.best}
                  </div>
                  <h4 style={{ margin: "0", fontSize: "20px", fontWeight: "800", color: "#222222" }}>
                    {l.name}
                  </h4>
                  <p style={{ margin: "0", fontSize: "14px", color: "#666666" }}>
                    {l.desc}
                  </p>
                  <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {l.chips.map((c) => (
                      <li key={c} style={{ height: "28px", padding: "0 10px", borderRadius: "40px", border: "1px solid #DDDDDD", fontSize: "12px", fontWeight: "600", display: "inline-flex", alignItems: "center" }}>
                        {c}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginTop: "auto", paddingTop: "8px" }}>
                    <span style={{ fontSize: "15px", color: "#666666" }}>
                      {"From "}
                      <strong style={{ color: "#222222" }}>
                        {inr(l.from)}
                      </strong>
                    </span>
                    <Link to={`/product?id=${l.ids[0]}`} aria-label={`Shop ${l.name}`} style={{ display: "inline-flex", alignItems: "center", gap: "6px", height: "44px", fontSize: "14px", fontWeight: "700", color: "#222222" }}>
                      Shop
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div id="glass" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "16px", borderBottom: "1px solid #DDDDDD", paddingBottom: "14px" }}>
              <h3 style={{ margin: "0", fontSize: "29px", fontWeight: "700", letterSpacing: "-0.015em", color: "#222222" }}>
                Glass
              </h3>
              <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666666" }}>
                Every pack is a 2-pack
              </span>
            </div>
            <div className="g4" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "24px" }}>
              <article className="line" style={{ background: "#FFFFFF", border: "1.5px solid #FFFFFF", padding: "28px", display: "flex", flexDirection: "column", gap: "14px", minWidth: "0" }}>
                <div style={{ height: "150px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg viewBox="0 0 100 100" aria-hidden="true" style={{ height: "100%", display: "block" }}>
                    <rect x="26" y="8" width="38" height="78" rx="8" fill="#E4EBEF" stroke="#B9C0C4" strokeWidth="1" />
                    <rect x="36" y="14" width="38" height="78" rx="8" fill="#E4EBEF" stroke="#B9C0C4" strokeWidth="1" />
                    <rect x="38" y="16" width="34" height="74" rx="6.5" fill="none" stroke="#1A1A1A" strokeWidth="1.5" />
                    <polygon points="40,60 66,22 70,22 44,60" fill="#FFFFFF" />
                  </svg>
                </div>
                <div style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666666" }}>
                  Best for: everyday clarity
                </div>
                <h4 style={{ margin: "0", fontSize: "20px", fontWeight: "800", color: "#222222" }}>
                  Auto-Align HD Clear
                </h4>
                <p style={{ margin: "0", fontSize: "14px", color: "#666666" }}>
                  Clear 9H glass with an oleophobic coat. The alignment tray centers it on your screen in one press.
                </p>
                <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  <li style={{ height: "28px", padding: "0 10px", borderRadius: "40px", border: "1px solid #DDDDDD", fontSize: "12px", fontWeight: "600", display: "inline-flex", alignItems: "center" }}>
                    9H
                  </li>
                  <li style={{ height: "28px", padding: "0 10px", borderRadius: "40px", border: "1px solid #DDDDDD", fontSize: "12px", fontWeight: "600", display: "inline-flex", alignItems: "center" }}>
                    Oleophobic
                  </li>
                  <li style={{ height: "28px", padding: "0 10px", borderRadius: "40px", border: "1px solid #DDDDDD", fontSize: "12px", fontWeight: "600", display: "inline-flex", alignItems: "center" }}>
                    Alignment tray
                  </li>
                </ul>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginTop: "auto", paddingTop: "8px" }}>
                  <span style={{ fontSize: "15px", color: "#666666" }}>
                    {"From "}
                    <strong style={{ color: "#222222" }}>
                      ₹599
                    </strong>
                  </span>
                  <a href="#bestsellers" onClick={showGlass} style={{ display: "inline-flex", alignItems: "center", gap: "6px", height: "44px", fontSize: "14px", fontWeight: "700", color: "#222222" }}>
                    Shop
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                </div>
              </article>
              <article className="line" style={{ background: "#FFFFFF", border: "1.5px solid #FFFFFF", padding: "28px", display: "flex", flexDirection: "column", gap: "14px", minWidth: "0" }}>
                <div style={{ height: "150px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg viewBox="0 0 100 100" aria-hidden="true" style={{ height: "100%", display: "block" }}>
                    <rect x="26" y="8" width="38" height="78" rx="8" fill="#2A2A2A" stroke="#111111" strokeWidth="1" />
                    <rect x="36" y="14" width="38" height="78" rx="8" fill="#1A1A1A" stroke="#000000" strokeWidth="1" />
                    <polygon points="40,60 66,22 70,22 44,60" fill="#FFFFFF" fillOpacity="0.15" />
                  </svg>
                </div>
                <div style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666666" }}>
                  Best for: keeping your screen private
                </div>
                <h4 style={{ margin: "0", fontSize: "20px", fontWeight: "800", color: "#222222" }}>
                  28° Privacy
                </h4>
                <p style={{ margin: "0", fontSize: "14px", color: "#666666" }}>
                  Looks clear straight on and dark from the side, so people next to you can't read your screen.
                </p>
                <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  <li style={{ height: "28px", padding: "0 10px", borderRadius: "40px", border: "1px solid #DDDDDD", fontSize: "12px", fontWeight: "600", display: "inline-flex", alignItems: "center" }}>
                    28° privacy
                  </li>
                  <li style={{ height: "28px", padding: "0 10px", borderRadius: "40px", border: "1px solid #DDDDDD", fontSize: "12px", fontWeight: "600", display: "inline-flex", alignItems: "center" }}>
                    9H
                  </li>
                  <li style={{ height: "28px", padding: "0 10px", borderRadius: "40px", border: "1px solid #DDDDDD", fontSize: "12px", fontWeight: "600", display: "inline-flex", alignItems: "center" }}>
                    Alignment tray
                  </li>
                </ul>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginTop: "auto", paddingTop: "8px" }}>
                  <span style={{ fontSize: "15px", color: "#666666" }}>
                    {"From "}
                    <strong style={{ color: "#222222" }}>
                      ₹699
                    </strong>
                  </span>
                  <a href="#bestsellers" onClick={showGlass} style={{ display: "inline-flex", alignItems: "center", gap: "6px", height: "44px", fontSize: "14px", fontWeight: "700", color: "#222222" }}>
                    Shop
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                </div>
              </article>
              <article className="line" style={{ background: "#FFFFFF", border: "1.5px solid #FFFFFF", padding: "28px", display: "flex", flexDirection: "column", gap: "14px", minWidth: "0" }}>
                <div style={{ height: "150px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg viewBox="0 0 100 100" aria-hidden="true" style={{ height: "100%", display: "block" }}>
                    <rect x="26" y="8" width="38" height="78" rx="8" fill="#ECEDEE" stroke="#BFC4C7" strokeWidth="1" />
                    <rect x="36" y="14" width="38" height="78" rx="8" fill="#ECEDEE" stroke="#BFC4C7" strokeWidth="1" />
                    <rect x="38" y="16" width="34" height="74" rx="6.5" fill="none" stroke="#1A1A1A" strokeWidth="1.5" />
                    <g fill="#BFC4C7">
                      <circle cx="48" cy="34" r="0.8" />
                      <circle cx="58" cy="44" r="0.8" />
                      <circle cx="52" cy="58" r="0.8" />
                      <circle cx="62" cy="70" r="0.8" />
                      <circle cx="46" cy="78" r="0.8" />
                    </g>
                  </svg>
                </div>
                <div style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666666" }}>
                  {"Best for: gaming & glare"}
                </div>
                <h4 style={{ margin: "0", fontSize: "20px", fontWeight: "800", color: "#222222" }}>
                  Matte Gaming
                </h4>
                <p style={{ margin: "0", fontSize: "14px", color: "#666666" }}>
                  A matte finish that cuts glare and gives a smooth, dry swipe for long gaming sessions.
                </p>
                <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  <li style={{ height: "28px", padding: "0 10px", borderRadius: "40px", border: "1px solid #DDDDDD", fontSize: "12px", fontWeight: "600", display: "inline-flex", alignItems: "center" }}>
                    Anti-glare
                  </li>
                  <li style={{ height: "28px", padding: "0 10px", borderRadius: "40px", border: "1px solid #DDDDDD", fontSize: "12px", fontWeight: "600", display: "inline-flex", alignItems: "center" }}>
                    9H
                  </li>
                  <li style={{ height: "28px", padding: "0 10px", borderRadius: "40px", border: "1px solid #DDDDDD", fontSize: "12px", fontWeight: "600", display: "inline-flex", alignItems: "center" }}>
                    Smooth swipe
                  </li>
                </ul>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginTop: "auto", paddingTop: "8px" }}>
                  <span style={{ fontSize: "15px", color: "#666666" }}>
                    {"From "}
                    <strong style={{ color: "#222222" }}>
                      ₹649
                    </strong>
                  </span>
                  <a href="#bestsellers" onClick={showGlass} style={{ display: "inline-flex", alignItems: "center", gap: "6px", height: "44px", fontSize: "14px", fontWeight: "700", color: "#222222" }}>
                    Shop
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                </div>
              </article>
              <article className="line" style={{ background: "#FFFFFF", border: "1.5px solid #FFFFFF", padding: "28px", display: "flex", flexDirection: "column", gap: "14px", minWidth: "0" }}>
                <div style={{ height: "150px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg viewBox="0 0 100 100" aria-hidden="true" style={{ height: "100%", display: "block" }}>
                    <rect x="22" y="22" width="56" height="56" rx="16" fill="#E4EBEF" stroke="#222222" strokeWidth="1.2" />
                    <g fill="#111111" stroke="#222222" strokeWidth="1">
                      <circle cx="38" cy="38" r="9" />
                      <circle cx="38" cy="62" r="9" />
                      <circle cx="62" cy="50" r="9" />
                    </g>
                    <g fill="none" stroke="#FFFFFF" strokeOpacity="0.7" strokeWidth="1">
                      <circle cx="38" cy="38" r="5" />
                      <circle cx="38" cy="62" r="5" />
                      <circle cx="62" cy="50" r="5" />
                    </g>
                  </svg>
                </div>
                <div style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666666" }}>
                  Best for: protecting the camera
                </div>
                <h4 style={{ margin: "0", fontSize: "20px", fontWeight: "800", color: "#222222" }}>
                  Camera Lens Glass
                </h4>
                <p style={{ margin: "0", fontSize: "14px", color: "#666666" }}>
                  A clear glass plate over the camera bump that takes scratches so the lenses don't.
                </p>
                <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  <li style={{ height: "28px", padding: "0 10px", borderRadius: "40px", border: "1px solid #DDDDDD", fontSize: "12px", fontWeight: "600", display: "inline-flex", alignItems: "center" }}>
                    Lens cover
                  </li>
                  <li style={{ height: "28px", padding: "0 10px", borderRadius: "40px", border: "1px solid #DDDDDD", fontSize: "12px", fontWeight: "600", display: "inline-flex", alignItems: "center" }}>
                    Case-friendly
                  </li>
                  <li style={{ height: "28px", padding: "0 10px", borderRadius: "40px", border: "1px solid #DDDDDD", fontSize: "12px", fontWeight: "600", display: "inline-flex", alignItems: "center" }}>
                    2-pack
                  </li>
                </ul>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginTop: "auto", paddingTop: "8px" }}>
                  <span style={{ fontSize: "15px", color: "#666666" }}>
                    {"From "}
                    <strong style={{ color: "#222222" }}>
                      ₹399
                    </strong>
                  </span>
                  <a href="#bestsellers" onClick={showGlass} style={{ display: "inline-flex", alignItems: "center", gap: "6px", height: "44px", fontSize: "14px", fontWeight: "700", color: "#222222" }}>
                    Shop
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* 9. DARK ENGINEERING BANNER */}
      <section id="engineering" style={{ background: "#000000", color: "#FFFFFF" }}>
        <div className="wrap" style={{ maxWidth: "1420px", margin: "0 auto", padding: "112px 40px", display: "flex", flexDirection: "column", gap: "56px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "760px" }}>
            <div style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8C8C8C" }}>
              Engineering · 360° protection
            </div>
            <h2 className="hx" style={{ margin: "0", fontSize: "56px", lineHeight: "1.05", fontWeight: "800", letterSpacing: "-0.03em", color: "#FFFFFF" }}>
              Engineered front and back.
            </h2>
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.6", color: "#A3A3A3", maxWidth: "620px" }}>
              Covers and glass are designed as a pair, so the case edge and the glass edge meet cleanly instead of fighting each other.
            </p>
          </div>
          <div className="g2" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "24px" }}>
            <article className="pad-card" style={{ border: "1px solid #262626", padding: "40px", display: "flex", flexDirection: "column", gap: "32px", minWidth: "0" }}>
              <div style={{ background: "#0A0A0A", border: "1px solid #1C1C1C", padding: "24px" }}>
                <svg viewBox="0 0 600 340" role="img" aria-label="Cross-section of a cover corner: air-cushion pockets absorb the impact" style={{ width: "100%", height: "auto", display: "block" }}>
                  <g fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M56 24 V316" />
                    <path d="M44 24 H68" />
                    <path d="M44 316 H68" />
                    <path d="M50 36 L56 26 L62 36" />
                    <path d="M50 304 L56 314 L62 304" />
                  </g>
                  <path d="M210 340 V150 A120 120 0 0 1 330 30 H600 V58 H330 A92 92 0 0 0 238 150 V340 Z" fill="#1A1A1A" stroke="#6A6A6A" strokeWidth="1.2" />
                  <path d="M238 340 V150 A92 92 0 0 1 330 58 H600 V66 H330 A84 84 0 0 0 246 150 V340 Z" fill="#8F8A82" />
                  <path d="M246 340 V150 A84 84 0 0 1 330 66 H600 V340 Z" fill="#0C0C0E" />
                  <path d="M254 340 V150 A76 76 0 0 1 330 74 H600" fill="none" stroke="#262626" strokeWidth="1" />
                  <g fill="#000000" stroke="#FFFFFF" strokeWidth="1.4">
                    <circle cx="227.6" cy="122.6" r="8" />
                    <circle cx="243.2" cy="89.2" r="8" />
                    <circle cx="269.2" cy="63.2" r="8" />
                    <circle cx="302.6" cy="47.6" r="8" />
                  </g>
                  <g fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M223.2 65.2 A22 22 0 0 1 245.2 43.2" strokeOpacity="0.9" />
                    <path d="M207.2 65.2 A38 38 0 0 1 245.2 27.2" strokeOpacity="0.55" />
                    <path d="M191.2 65.2 A54 54 0 0 1 245.2 11.2" strokeOpacity="0.3" />
                  </g>
                  <text x="182" y="30" textAnchor="end" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="1.5" fill="#8C8C8C">
                    IMPACT
                  </text>
                  <text x="592" y="20" textAnchor="end" fontFamily="IBM Plex Mono, monospace" fontSize="11" fontWeight="600" letterSpacing="1" fill="#FFFFFF">
                    SHOCK-ABSORBING BUMPER
                  </text>
                  <path d="M276 68 L350 112 H362" fill="none" stroke="#FFFFFF" strokeWidth="1" />
                  <text x="370" y="116" fontFamily="IBM Plex Mono, monospace" fontSize="11" fontWeight="600" letterSpacing="1" fill="#FFFFFF">
                    AIR-CUSHION POCKETS
                  </text>
                  <text x="370" y="133" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#8C8C8C">
                    Absorb the hit at each corner
                  </text>
                </svg>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8C8C8C" }}>
                  Covers / Drop protection
                </div>
                <h3 style={{ margin: "0", fontSize: "29px", lineHeight: "1.2", fontWeight: "700", letterSpacing: "-0.015em", color: "#FFFFFF" }}>
                  Air Cushion Corner Drop Protection
                </h3>
                <p style={{ margin: "0", color: "#A3A3A3" }}>
                  Air pockets molded into every corner take the hit before it reaches the frame, while a raised edge keeps the screen and camera off the ground.
                </p>
              </div>
              <dl style={{ margin: "0", display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", borderTop: "1px solid #262626" }}>
                <div style={{ padding: "16px 16px 16px 0", borderBottom: "1px solid #262626", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8C8C8C" }}>
                    Built for
                  </dt>
                  <dd style={{ margin: "0", fontSize: "15px", fontWeight: "600", color: "#FFFFFF" }}>
                    Everyday drops
                  </dd>
                </div>
                <div style={{ padding: "16px 0", borderBottom: "1px solid #262626", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8C8C8C" }}>
                    Corners
                  </dt>
                  <dd style={{ margin: "0", fontSize: "15px", fontWeight: "600", color: "#FFFFFF" }}>
                    Air-cushion pockets
                  </dd>
                </div>
                <div style={{ padding: "16px 16px 16px 0", borderBottom: "1px solid #262626", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8C8C8C" }}>
                    Charging
                  </dt>
                  <dd style={{ margin: "0", fontSize: "15px", fontWeight: "600", color: "#FFFFFF" }}>
                    MagSafe magnet ring
                  </dd>
                </div>
                <div style={{ padding: "16px 0", borderBottom: "1px solid #262626", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8C8C8C" }}>
                    Edges
                  </dt>
                  <dd style={{ margin: "0", fontSize: "15px", fontWeight: "600", color: "#FFFFFF" }}>
                    {"Raised screen & camera lip"}
                  </dd>
                </div>
              </dl>
            </article>
            <article className="pad-card" style={{ border: "1px solid #262626", padding: "40px", display: "flex", flexDirection: "column", gap: "32px", minWidth: "0" }}>
              <div style={{ background: "#0A0A0A", border: "1px solid #1C1C1C", padding: "24px" }}>
                <svg viewBox="0 0 600 340" role="img" aria-label="Exploded layer stack: oleophobic coat, 9H alumina-silicate tempered glass, adhesive layer, iPhone display" style={{ width: "100%", height: "auto", display: "block" }}>
                  <g fill="none" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 5">
                    <path d="M24 85 V272" />
                    <path d="M404 41 V228" />
                  </g>
                  <polygon points="24,272 314,272 404,228 114,228" fill="#161616" stroke="#5A5A5A" strokeWidth="1" />
                  <rect x="24" y="272" width="290" height="12" fill="#2A2A2A" stroke="#5A5A5A" strokeWidth="1" />
                  <polygon points="314,272 404,228 404,240 314,284" fill="#202020" stroke="#5A5A5A" strokeWidth="1" />
                  <polygon points="24,212 314,212 404,168 114,168" fill="#FFFFFF" fillOpacity="0.04" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1" strokeDasharray="4 4" />
                  <rect x="24" y="212" width="290" height="3" fill="#FFFFFF" fillOpacity="0.25" />
                  <polygon points="314,212 404,168 404,171 314,215" fill="#FFFFFF" fillOpacity="0.25" />
                  <polygon points="24,146 314,146 404,102 114,102" fill="#FFFFFF" fillOpacity="0.12" stroke="#FFFFFF" strokeOpacity="0.9" strokeWidth="1" />
                  <polygon points="150,146 180,146 270,102 240,102" fill="#FFFFFF" fillOpacity="0.18" />
                  <rect x="24" y="146" width="290" height="16" fill="#FFFFFF" fillOpacity="0.3" stroke="#FFFFFF" strokeOpacity="0.9" strokeWidth="1" />
                  <polygon points="314,146 404,102 404,118 314,162" fill="#FFFFFF" fillOpacity="0.2" stroke="#FFFFFF" strokeOpacity="0.9" strokeWidth="1" />
                  <polygon points="24,82 314,82 404,38 114,38" fill="#FFFFFF" fillOpacity="0.06" stroke="#FFFFFF" strokeOpacity="0.7" strokeWidth="1" />
                  <rect x="24" y="82" width="290" height="3" fill="#FFFFFF" fillOpacity="0.5" />
                  <polygon points="314,82 404,38 404,41 314,85" fill="#FFFFFF" fillOpacity="0.4" />
                  <g fill="none" stroke="#FFFFFF" strokeOpacity="0.75" strokeWidth="1">
                    <ellipse cx="110" cy="70" rx="7" ry="3" />
                    <ellipse cx="190" cy="52" rx="7" ry="3" />
                    <ellipse cx="262" cy="66" rx="7" ry="3" />
                    <ellipse cx="330" cy="48" rx="7" ry="3" />
                  </g>
                  <g fill="none" stroke="#FFFFFF" strokeWidth="1">
                    <path d="M359 60 H448" />
                    <path d="M359 124 H448" />
                    <path d="M359 190 H448" />
                    <path d="M359 250 H448" />
                  </g>
                  <g fontFamily="IBM Plex Mono, monospace">
                    <text x="456" y="56" fontSize="11" fontWeight="600" letterSpacing="1" fill="#FFFFFF">
                      OLEOPHOBIC COAT
                    </text>
                    <text x="456" y="72" fontSize="10" fill="#8C8C8C">
                      {"Resists oil & smudges"}
                    </text>
                    <text x="456" y="120" fontSize="11" fontWeight="600" letterSpacing="1" fill="#FFFFFF">
                      9H TEMPERED GLASS
                    </text>
                    <text x="456" y="136" fontSize="10" fill="#8C8C8C">
                      Alumina-silicate core
                    </text>
                    <text x="456" y="186" fontSize="11" fontWeight="600" letterSpacing="1" fill="#FFFFFF">
                      ADHESIVE LAYER
                    </text>
                    <text x="456" y="202" fontSize="10" fill="#8C8C8C">
                      Bubble-free bond
                    </text>
                    <text x="456" y="246" fontSize="11" fontWeight="600" letterSpacing="1" fill="#FFFFFF">
                      IPHONE DISPLAY
                    </text>
                    <text x="456" y="262" fontSize="10" fill="#8C8C8C">
                      Covered edge to edge
                    </text>
                  </g>
                </svg>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8C8C8C" }}>
                  Glass / Screen protection
                </div>
                <h3 style={{ margin: "0", fontSize: "29px", lineHeight: "1.2", fontWeight: "700", letterSpacing: "-0.015em", color: "#FFFFFF" }}>
                  9H Alumina-Silicate Oleophobic Tempered Glass + Dust-Free Auto Alignment Tray
                </h3>
                <p style={{ margin: "0", color: "#A3A3A3" }}>
                  Hardened alumina-silicate glass with an oleophobic top coat. The tray clips onto your iPhone and guides the glass straight down into place.
                </p>
              </div>
              <dl style={{ margin: "0", display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", borderTop: "1px solid #262626" }}>
                <div style={{ padding: "16px 16px 16px 0", borderBottom: "1px solid #262626", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8C8C8C" }}>
                    Hardness
                  </dt>
                  <dd style={{ margin: "0", fontSize: "15px", fontWeight: "600", color: "#FFFFFF" }}>
                    9H
                  </dd>
                </div>
                <div style={{ padding: "16px 0", borderBottom: "1px solid #262626", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8C8C8C" }}>
                    Material
                  </dt>
                  <dd style={{ margin: "0", fontSize: "15px", fontWeight: "600", color: "#FFFFFF" }}>
                    Alumina-silicate glass
                  </dd>
                </div>
                <div style={{ padding: "16px 16px 16px 0", borderBottom: "1px solid #262626", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8C8C8C" }}>
                    Coating
                  </dt>
                  <dd style={{ margin: "0", fontSize: "15px", fontWeight: "600", color: "#FFFFFF" }}>
                    Oleophobic
                  </dd>
                </div>
                <div style={{ padding: "16px 0", borderBottom: "1px solid #262626", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8C8C8C" }}>
                    Install
                  </dt>
                  <dd style={{ margin: "0", fontSize: "15px", fontWeight: "600", color: "#FFFFFF" }}>
                    Dust-free alignment tray
                  </dd>
                </div>
              </dl>
            </article>
          </div>
        </div>
      </section>

      {/* 10. HELP & GUIDES */}
      <section id="help" aria-labelledby="help-h" style={{ background: "#FFFFFF" }}>
        <div className="wrap" style={{ maxWidth: "1420px", margin: "0 auto", padding: "96px 40px", display: "flex", flexDirection: "column", gap: "28px" }}>
          <h2 id="help-h" style={{ margin: "0", fontSize: "29px", lineHeight: "1.15", fontWeight: "800", letterSpacing: "-0.02em", color: "#222222" }}>
            {"Help & guides"}
          </h2>
          <div className="g4" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "16px" }}>
            <a className="help" href="#find-model" style={{ background: "#F4F4F4", padding: "28px", display: "flex", flexDirection: "column", gap: "12px", color: "#222222", minHeight: "200px" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#222222" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
                <path d="M10.5 5.5h3" />
                <circle cx="12" cy="13" r="2.5" />
              </svg>
              <span style={{ fontSize: "17px", fontWeight: "700" }}>
                Find your iPhone model
              </span>
              <span style={{ fontSize: "14px", color: "#666666" }}>
                Check Settings › General › About before you order, so the cover fits first time.
              </span>
            </a>
            <a className="help" href="#install" style={{ background: "#F4F4F4", padding: "28px", display: "flex", flexDirection: "column", gap: "12px", color: "#222222", minHeight: "200px" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#222222" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M10 8.5v7l6-3.5-6-3.5z" />
              </svg>
              <span style={{ fontSize: "17px", fontWeight: "700" }}>
                Installation videos
              </span>
              <span style={{ fontSize: "14px", color: "#666666" }}>
                See how the alignment tray puts your glass on straight and dust-free.
              </span>
            </a>
            <a className="help" href="#warranty" style={{ background: "#F4F4F4", padding: "28px", display: "flex", flexDirection: "column", gap: "12px", color: "#222222", minHeight: "200px" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#222222" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <span style={{ fontSize: "17px", fontWeight: "700" }}>
                {"Warranty & replacement"}
              </span>
              <span style={{ fontSize: "14px", color: "#666666" }}>
                What's covered and how to raise a claim if something goes wrong.
              </span>
            </a>
            <a className="help" href="#bulk" style={{ background: "#F4F4F4", padding: "28px", display: "flex", flexDirection: "column", gap: "12px", color: "#222222", minHeight: "200px" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#222222" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 8l9-4 9 4-9 4-9-4z" />
                <path d="M3 8v8l9 4 9-4V8" />
                <path d="M12 12v8" />
              </svg>
              <span style={{ fontSize: "17px", fontWeight: "700" }}>
                {"Bulk & corporate orders"}
              </span>
              <span style={{ fontSize: "14px", color: "#666666" }}>
                Covers and glass for teams, events and retail stores.
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
