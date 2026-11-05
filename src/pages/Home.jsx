import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store.jsx";
import { PRODUCTS, BEST_SELLERS, modelsText } from "../catalog.js";
import ModelPicker from "../components/ModelPicker.jsx";
import HeroCarousel from "../components/HeroCarousel.jsx";
import ProductCard from "../components/ProductCard.jsx";
import Promises from "../components/Promises.jsx";

const CATS = [
  { id: "all", label: "All" },
  { id: "covers", label: "Covers" },
  { id: "glass", label: "Glass" },
  { id: "combos", label: "Combos" },
];

// Curated picks for the Lineup showcase (rendered using identical ProductCards)
const COVER_PICKS = ["slim-shell-plus", "dualtek-2colour", "military", "holo-feather"];
const GLASS_PICKS = ["autoalign", "fullframe", "edge2edge", "lens-glass"];

// Filled/outlined pill colours shared by the category and finish pills.
const pill = (on, idle) => ({ pressed: on ? "true" : "false", bg: on ? "#000000" : idle.bg, fg: on ? "#FFFFFF" : "#222222", bd: on ? "#000000" : idle.bd });

export default function Home() {
  const { devices, setDevices } = useStore();
  const many = devices.length > 1;
  const allFits = modelsText(devices);
  const [cat, setCat] = useState("all");


  const cats = CATS.map((c) => ({ label: c.label, ...pill(c.id === cat, { bg: "#FFFFFF", bd: "#DDDDDD" }), pick: () => setCat(c.id) }));

  const ids = BEST_SELLERS.filter((id) => PRODUCTS[id] && (cat === "all" || PRODUCTS[id].cat === cat));

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

      {/* 8. THE LINEUP - PICK YOUR PROTECTION */}
      <section id="lineup" style={{ background: "#FFFFFF", borderTop: "1px solid #EEEEEE" }}>
        <div className="wrap" style={{ maxWidth: "1420px", margin: "0 auto", padding: "100px 40px", display: "flex", flexDirection: "column", gap: "48px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "720px" }}>
              <div style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#666666" }}>
                The Lineup
              </div>
              <h2 className="hx" style={{ margin: "0", fontSize: "56px", lineHeight: "1.05", fontWeight: "800", letterSpacing: "-0.03em", color: "#222222" }}>
                Pick your protection.
              </h2>
            </div>
            <p style={{ margin: "0", maxWidth: "460px", color: "#666666", fontSize: "15px", lineHeight: "1.6" }}>
              Four signature case lines and four types of 9H tempered glass. Designed to pair together with zero edge interference.
            </p>
          </div>

          {/* COVERS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "16px", borderBottom: "1px solid #EEEEEE", paddingBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "14px" }}>
                <h3 style={{ margin: "0", fontSize: "28px", fontWeight: "700", letterSpacing: "-0.015em", color: "#222222" }}>
                  Covers
                </h3>
                <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666666" }}>
                  4 lines · 15 cases
                </span>
              </div>
              <Link to="/collection?cat=covers" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: "700", color: "#222222" }}>
                Shop all covers
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
            <div className="g4" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "20px" }}>
              {COVER_PICKS.map((id) => (
                <ProductCard key={id} id={id} />
              ))}
            </div>
          </div>

          {/* GLASS */}
          <div id="glass" style={{ display: "flex", flexDirection: "column", gap: "20px", paddingTop: "16px" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "16px", borderBottom: "1px solid #EEEEEE", paddingBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "14px" }}>
                <h3 style={{ margin: "0", fontSize: "28px", fontWeight: "700", letterSpacing: "-0.015em", color: "#222222" }}>
                  Tempered Glass & Lens
                </h3>
                <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666666" }}>
                  Every glass is a 2-pack · 50% off with any cover
                </span>
              </div>
              <Link to="/collection?cat=glass" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: "700", color: "#222222" }}>
                Shop all glass
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
            <div className="g4" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "20px" }}>
              {GLASS_PICKS.map((id) => (
                <ProductCard key={id} id={id} />
              ))}
            </div>
          </div>

          <Promises />
        </div>
      </section>
      </main>
  );
}
