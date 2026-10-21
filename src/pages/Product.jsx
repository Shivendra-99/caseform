import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useStore } from "../store.jsx";
import { MODELS, MODEL_CODES, COLORS, FINISHES, PRODUCTS, inr, modelsText } from "../catalog.js";
import ProductArt from "../components/ProductArt.jsx";
import ModelPicker from "../components/ModelPicker.jsx";
import ProductCard from "../components/ProductCard.jsx";

const TABS = ["Overview", "Size & Measurement", "Materials & Specs", "Compatibility", "In the Box & Install"];
const GLASS = PRODUCTS.autoalign;
const GLASS_WITH_CASE = Math.floor(GLASS.price / 2);
const LENS = PRODUCTS["lens-glass"];
const COVERS = Object.keys(PRODUCTS).filter((id) => PRODUCTS[id].kind === "case");
const BADGES = { best: { label: "Best Seller", bg: "#9A84C8", fg: "#000000" }, new: { label: "New", bg: "#49A594", fg: "#000000" }, sale: { label: "Sale", bg: "#EB0000", fg: "#FFFFFF" } };
const off = (p) => Math.round(((p.mrp - p.price) / p.mrp) * 100);

const pill = (on, idle) => ({ pressed: on ? "true" : "false", bg: on ? "#000000" : idle.bg, fg: on ? "#FFFFFF" : "#222222", bd: on ? "#000000" : idle.bd });

// Cover product page (SnapEdge design): /product?id=<cover id>; an unknown id shows the first cover.
export default function Product() {
  const { devices, setDevices, addForModels } = useStore();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const id = COVERS.includes(params.get("id")) ? params.get("id") : COVERS[0];
  const cover = PRODUCTS[id];
  const badge = BADGES[cover.badge];
  const magsafe = /MagSafe/.test(cover.name + cover.feat);
  // Other covers with photos, for "You may also like".
  const related = COVERS.filter((x) => x !== id && PRODUCTS[x].img).slice(0, 4);
  // Several models selected = one of each item per model.
  const n = devices.length;
  const fits = n > 1 ? `${n} models` : devices[0];
  const allFits = modelsText(devices);
  const [qty, setQty] = useState(1);
  const [gi, setGtype] = useState(0);
  const [tab, setTab] = useState(0);
  const [glassOn, setGlassOn] = useState(false);
  const [pin, setPin] = useState("");
  const [pinChecked, setPinChecked] = useState(false);
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(null); // "bag" | "set" while showing the tick

  const sku = devices.map((d) => `SE-${cover.code}-${MODEL_CODES[MODELS.indexOf(d)]}`).join(", ");

  const gtypes = FINISHES.map((o, i) => ({ name: o.name, ...pill(i === gi, { bg: "#FFFFFF", bd: "#DDDDDD" }), pick: () => setGtype(i) }));
  const tabs = TABS.map((label, i) => ({ label, pressed: i === tab ? "true" : "false", fg: i === tab ? "#000000" : "#666666", bd: i === tab ? "#000000" : "transparent", pick: () => setTab(i) }));
  const [tab0, tab1, tab2, tab3, tab4] = [0, 1, 2, 3, 4].map((i) => tab === i);

  const dec = () => setQty((q) => Math.max(1, q - 1));
  const inc = () => setQty((q) => Math.min(10, q + 1));
  const toggleGlass = () => setGlassOn((g) => !g);
  const bundleBd = glassOn ? "#000000" : "#EEEEEE";
  const total = inr((cover.price + (glassOn ? GLASS_WITH_CASE : 0)) * qty * n);
  const setPrice = cover.price + GLASS_WITH_CASE + LENS.price;

  const onPin = (e) => {
    setPin(e.target.value.replace(/[^0-9]/g, "").slice(0, 6));
    setPinChecked(false);
  };
  const checkPin = () => setPinChecked(true);
  const pinValid = /^[1-9][0-9]{5}$/.test(pin);
  const pinOk = pinChecked && pinValid;
  const pinBad = pinChecked && !pinValid;
  // Delivery estimate: four days out, fixed when the page opens.
  const [eta] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
  });

  const flash = (what) => {
    setAdded(what);
    setTimeout(() => setAdded((x) => (x === what ? null : x)), 1800);
  };
  // The cart applies "glass 50% off with any cover", so glass is added at list price here.
  const addCaseAndGlass = () => {
    addForModels(id, qty);
    if (glassOn) addForModels("autoalign", qty, FINISHES[gi].name);
  };
  const addToBag = () => {
    addCaseAndGlass();
    flash("bag");
  };
  const buyNow = () => {
    addCaseAndGlass();
    navigate("/cart");
  };
  const addSet = () => {
    addForModels(id, 1);
    addForModels("autoalign", 1, FINISHES[0].name);
    addForModels("lens-glass", 1);
    flash("set");
  };
  const findModel = () => setTab(3);

  return (
    <main className="se-root se-font" style={{ background: "#FFFFFF" }}>
      {/* BREADCRUMB + BUY BOX */}
      <div>
        <div className="wrap" style={{ maxWidth: "1420px", margin: "0 auto", padding: "0 40px" }}>
          <nav aria-label="Breadcrumb" style={{ padding: "22px 0" }}>
            <ol style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#666666" }}>
              <li>
                <Link to="/" style={{ color: "#666666" }}>
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                /
              </li>
              <li>
                <Link to="/collection" style={{ color: "#666666" }}>
                  Covers
                </Link>
              </li>
              <li aria-hidden="true">
                /
              </li>
              <li>
                {fits}
              </li>
              <li aria-hidden="true">
                /
              </li>
              <li aria-current="page" style={{ color: "#222222" }}>
                {cover.name}
              </li>
            </ol>
          </nav>
          <div className="g12" style={{ display: "grid", gridTemplateColumns: "repeat(12, minmax(0, 1fr))", columnGap: "24px", rowGap: "40px", alignItems: "start", paddingBottom: "96px" }}>
            {/* Gallery */}
            <div className="stick" style={{ gridColumn: "span 7", position: "sticky", top: "100px", minWidth: "0" }}>
              <div style={{ position: "relative", aspectRatio: "1 / 1", background: "#F3F3F3", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                {badge && (
                  <span style={{ position: "absolute", top: "20px", left: "20px", height: "28px", padding: "0 12px", borderRadius: "40px", background: badge.bg, color: badge.fg, fontSize: "12px", fontWeight: "700", display: "inline-flex", alignItems: "center" }}>
                    {badge.label}
                  </span>
                )}
                <ProductArt kind="case" img={cover.img} alt={cover.name} color={COLORS[cover.def]} />
              </div>
            </div>
            {/* Buy box */}
            <div style={{ gridColumn: "span 5", display: "flex", flexDirection: "column", gap: "26px", minWidth: "0" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {badge && (
                    <span style={{ height: "28px", padding: "0 12px", borderRadius: "40px", background: badge.bg, color: badge.fg, fontSize: "12px", fontWeight: "700", display: "inline-flex", alignItems: "center" }}>
                      {badge.label}
                    </span>
                  )}
                  {magsafe && (
                    <span style={{ height: "28px", padding: "0 12px", borderRadius: "40px", border: "1px solid #DDDDDD", color: "#222222", fontSize: "12px", fontWeight: "600", display: "inline-flex", alignItems: "center" }}>
                      MagSafe Compatible
                    </span>
                  )}
                </div>
                <div style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666666" }}>
                  {fits}{" · Back cover"}
                </div>
                <h1 style={{ margin: "0", fontSize: "29px", lineHeight: "1.15", fontWeight: "800", letterSpacing: "-0.02em", color: "#222222" }}>
                  {cover.name}
                </h1>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginTop: "4px" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "12px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "29px", fontWeight: "800", color: "#222222" }}>
                      {inr(cover.price)}
                    </span>
                    <span style={{ fontSize: "15px", color: "#666666" }}>
                      {"MRP "}
                      <s>
                        {inr(cover.mrp)}
                      </s>
                    </span>
                    <span style={{ fontSize: "15px", fontWeight: "700", color: "#EB0000" }}>
                      {off(cover)}% off
                    </span>
                  </div>
                  <span style={{ fontSize: "13px", color: "#666666" }}>
                    Inclusive of all taxes
                  </span>
                </div>
                <p style={{ margin: "0", color: "#444444" }}>
                  {cover.feat}
                </p>
                <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.08em", color: "#666666" }}>
                  {"SKU "}{sku}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", borderTop: "1px solid #EEEEEE", paddingTop: "22px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px" }}>
                  <span id="pp-model-label" style={{ fontSize: "14px", fontWeight: "700", color: "#222222" }}>
                    iPhone model
                  </span>
                  <a href="#details" onClick={findModel} style={{ fontSize: "13px", color: "#666666", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                    Find my model
                  </a>
                </div>
                <ModelPicker value={devices} onChange={setDevices} labelledBy="pp-model-label" describedBy="pp-model-help" />
                <span id="pp-model-help" style={{ fontSize: "13px", color: "#666666" }}>
                  {n > 1 ? `You'll get one for each: ${allFits}.` : "Buying for more than one iPhone? Tick several and get one for each."}
                </span>
              </div>
              <div style={{ background: "#F4F4F4", border: `1.5px solid ${bundleBd}`, padding: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
                <label style={{ display: "flex", alignItems: "flex-start", gap: "14px", cursor: "pointer" }}>
                  <input type="checkbox" checked={glassOn} onChange={toggleGlass} style={{ width: "22px", height: "22px", margin: "2px 0 0", accentColor: "#000000", flexShrink: "0", cursor: "pointer" }} />
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 auto", minWidth: "0" }}>
                    <span style={{ fontWeight: "700", color: "#222222" }}>
                      {"Add "}{GLASS.name}
                    </span>
                    <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666666" }}>
                      50% off with any cover
                    </span>
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px", flexShrink: "0" }}>
                    <span style={{ fontWeight: "700", color: "#EB0000" }}>
                      {inr(GLASS_WITH_CASE)}
                    </span>
                    <s style={{ fontSize: "13px", color: "#666666" }}>
                      {inr(GLASS.price)}
                    </s>
                  </span>
                </label>
                {glassOn && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", paddingLeft: "36px" }}>
                      {gtypes.map((g, i) => (
                        <button key={i} type="button" aria-pressed={g.pressed} onClick={g.pick} style={{ height: "36px", padding: "0 14px", borderRadius: "40px", border: `1px solid ${g.bd}`, background: g.bg, color: g.fg, fontFamily: "inherit", fontSize: "12px", fontWeight: "600", cursor: "pointer", whiteSpace: "nowrap" }}>
                          {g.name}
                        </button>
                      ))}
                    </div>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <label htmlFor="pp-pin" style={{ fontSize: "14px", fontWeight: "700", color: "#222222" }}>
                  Check delivery
                </label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <input id="pp-pin" type="text" inputMode="numeric" maxLength="6" autoComplete="postal-code" placeholder="Enter 6-digit pincode" value={pin} onChange={onPin} style={{ flex: "1 1 180px", minWidth: "0", height: "48px", padding: "0 20px", borderRadius: "50px", border: "1px solid #DDDDDD", background: "#FFFFFF", fontFamily: "inherit", fontSize: "14px", color: "#222222" }} />
                  <button type="button" className="btn-ghost" onClick={checkPin} style={{ height: "48px", padding: "0 22px", borderRadius: "50px", border: "1.5px solid #222222", background: "#FFFFFF", color: "#222222", fontFamily: "inherit", fontSize: "14px", fontWeight: "700", cursor: "pointer" }}>
                    Check
                  </button>
                </div>
                {pinOk && (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: "0", marginTop: "1px" }}>
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                      <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        <span style={{ color: "#222222" }}>
                          <strong>
                            {"Delivers by "}{eta}
                          </strong>
                          {" to "}{pin}
                        </span>
                        <span style={{ color: "#666666" }}>
                          Cash on delivery available · Free shipping on this order
                        </span>
                      </span>
                    </div>
                )}
                {pinBad && (
                  <span style={{ fontSize: "13px", fontWeight: "600", color: "#EB0000" }}>
                      Enter a valid 6-digit pincode.
                    </span>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", height: "56px", border: "1.5px solid #222222", borderRadius: "50px", padding: "0 6px", flexShrink: "0" }}>
                    <button type="button" aria-label="Decrease quantity" onClick={dec} style={{ width: "44px", height: "44px", border: "0", borderRadius: "50px", background: "transparent", color: "#222222", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <path d="M5 12h14" />
                      </svg>
                    </button>
                    <span aria-live="polite" style={{ minWidth: "28px", textAlign: "center", fontWeight: "700", fontSize: "16px" }}>
                      {qty}
                    </span>
                    <button type="button" aria-label="Increase quantity" onClick={inc} style={{ width: "44px", height: "44px", border: "0", borderRadius: "50px", background: "transparent", color: "#222222", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
                  </div>
                  <button type="button" className="btn-ghost" onClick={addToBag} style={{ flex: "1 1 180px", height: "56px", padding: "0 24px", border: "1.5px solid #222222", borderRadius: "50px", background: "#FFFFFF", color: "#222222", fontFamily: "inherit", fontSize: "15px", fontWeight: "700", cursor: "pointer" }}>
                    {added === "bag" ? "Added ✓" : n > 1 ? `Add to Cart · ${n} models` : "Add to Cart"}
                  </button>
                  <button type="button" aria-label="Add to wishlist" aria-pressed={wished} onClick={() => setWished((w) => !w)} style={{ width: "56px", height: "56px", border: "1.5px solid #222222", borderRadius: "50px", background: "#FFFFFF", color: "#222222", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: "0" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill={wished ? "#EB0000" : "none"} stroke={wished ? "#EB0000" : "currentColor"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 20s-7-4.4-9-9.2C1.8 7.6 4 4.5 7.2 4.5c2 0 3.6 1.1 4.8 2.8 1.2-1.7 2.8-2.8 4.8-2.8 3.2 0 5.4 3.1 4.2 6.3C19 15.6 12 20 12 20z" />
                    </svg>
                  </button>
                </div>
                <button type="button" className="btn-solid" onClick={buyNow} style={{ height: "56px", padding: "0 28px", border: "0", borderRadius: "50px", background: "#000000", color: "#FFFFFF", fontFamily: "inherit", fontSize: "15px", fontWeight: "700", cursor: "pointer" }}>
                  {"Buy Now · "}{total}
                </button>
              </div>
              <ul className="trust" style={{ listStyle: "none", margin: "0", padding: "0", display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "10px" }}>
                <li style={{ background: "#F4F4F4", padding: "14px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", fontWeight: "600", color: "#222222" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222222" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 7h11v9H3z" />
                    <path d="M14 10h4l3 3v3h-7z" />
                    <circle cx="7" cy="18" r="1.8" />
                    <circle cx="17" cy="18" r="1.8" />
                  </svg>
                  Free shipping on ₹499+
                </li>
                <li style={{ background: "#F4F4F4", padding: "14px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", fontWeight: "600", color: "#222222" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222222" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2.5" y="6" width="19" height="12" rx="2" />
                    <circle cx="12" cy="12" r="2.8" />
                    <path d="M6 9.5v5M18 9.5v5" />
                  </svg>
                  Cash on delivery
                </li>
                <li style={{ background: "#F4F4F4", padding: "14px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", fontWeight: "600", color: "#222222" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222222" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                  </svg>
                  {"Secure UPI & card payments"}
                </li>
              </ul>
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", fontSize: "13px" }}>
                <Link to="/policies/warranty" style={{ color: "#222222", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                  {"Warranty & replacement"}
                </Link>
                <Link to="/policies/returns" style={{ color: "#222222", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                  {"Returns & exchanges"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DETAILS TABS */}
      <section id="details" style={{ background: "#FFFFFF" }}>
        <div className="wrap" style={{ maxWidth: "1420px", margin: "0 auto", padding: "96px 40px", display: "flex", flexDirection: "column", gap: "32px" }}>
          <h2 className="hx" style={{ margin: "0", fontSize: "56px", lineHeight: "1.05", fontWeight: "800", letterSpacing: "-0.03em", color: "#222222" }}>
            Product details
          </h2>
          <div style={{ display: "flex", gap: "4px 32px", flexWrap: "wrap", borderBottom: "1px solid #EEEEEE" }}>
            {tabs.map((t, i) => (
              <button key={i} type="button" aria-pressed={t.pressed} onClick={t.pick} style={{ height: "52px", padding: "0", marginBottom: "-1px", border: "0", borderBottom: `2px solid ${t.bd}`, background: "transparent", color: t.fg, fontFamily: "inherit", fontSize: "15px", fontWeight: "700", cursor: "pointer", whiteSpace: "nowrap" }}>
                {t.label}
              </button>
            ))}
          </div>
          <div style={{ minHeight: "340px" }}>
            {tab0 && (
              <div className="g12" style={{ display: "grid", gridTemplateColumns: "repeat(12, minmax(0, 1fr))", columnGap: "24px", rowGap: "32px" }}>
                  <div style={{ gridColumn: "span 7", display: "flex", flexDirection: "column", gap: "18px", fontSize: "16px", color: "#444444", maxWidth: "720px" }}>
                    <p style={{ margin: "0" }}>
                      {cover.name}{" for "}{allFits}{"."}
                    </p>
                    <ul style={{ margin: "0", paddingLeft: "20px", listStyle: "disc", display: "flex", flexDirection: "column", gap: "8px" }}>
                      {cover.feat.split(" · ").map((f) => (
                        <li key={f}>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ gridColumn: "span 5", background: "#F4F4F4", padding: "28px", display: "flex", flexDirection: "column", gap: "14px", alignSelf: "start" }}>
                    <div style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#666666" }}>
                      Pairs best with
                    </div>
                    <div style={{ fontSize: "18px", fontWeight: "700", color: "#222222" }}>
                      {GLASS.name}
                    </div>
                    <p style={{ margin: "0", fontSize: "14px", color: "#666666" }}>
                      Half price when you add it with this case. HD Clear, 28° Privacy or Matte Gaming.
                    </p>
                    <Link to="/#glass" className="btn-ghost" style={{ alignSelf: "flex-start", height: "44px", padding: "0 20px", borderRadius: "50px", border: "1.5px solid #222222", color: "#222222", display: "inline-flex", alignItems: "center", gap: "8px", fontWeight: "700", fontSize: "14px" }}>
                      View Glass
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                  </div>
                </div>
            )}
            {tab1 && (
              <div className="g12" style={{ display: "grid", gridTemplateColumns: "repeat(12, minmax(0, 1fr))", columnGap: "24px", rowGap: "32px", alignItems: "start" }}>
                  <div style={{ gridColumn: "span 6", background: "#F4F4F4", padding: "24px" }}>
                    <svg viewBox="0 0 560 360" role="img" aria-label="Dimension drawing of the case: height, width, depth, camera ring and lip height" style={{ width: "100%", height: "auto", display: "block" }}>
                      <rect x="80" y="30" width="130" height="268" rx="26" fill="#FFFFFF" stroke="#222222" strokeWidth="1.5" />
                      <rect x="90" y="40" width="56" height="56" rx="14" fill="none" stroke="#222222" strokeWidth="1.2" />
                      <circle cx="145" cy="170" r="32" fill="none" stroke="#999999" strokeWidth="1.2" />
                      <g fill="none" stroke="#222222" strokeWidth="1">
                        <path d="M50 30 V298" />
                        <path d="M42 30 H58" />
                        <path d="M42 298 H58" />
                        <path d="M80 322 H210" />
                        <path d="M80 314 V330" />
                        <path d="M210 314 V330" />
                      </g>
                      <text x="36" y="164" textAnchor="middle" transform="rotate(-90 36 164)" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#222222">
                        H [Add] mm
                      </text>
                      <text x="145" y="350" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#222222">
                        W [Add] mm
                      </text>
                      <rect x="330" y="30" width="40" height="268" rx="18" fill="#FFFFFF" stroke="#222222" strokeWidth="1.5" />
                      <rect x="370" y="44" width="10" height="72" rx="4" fill="#FFFFFF" stroke="#222222" strokeWidth="1.2" />
                      <g fill="none" stroke="#222222" strokeWidth="1">
                        <path d="M330 322 H370" />
                        <path d="M330 314 V330" />
                        <path d="M370 314 V330" />
                        <path d="M382 60 H404" />
                        <path d="M332 200 H404" strokeDasharray="3 3" />
                      </g>
                      <text x="350" y="350" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#222222">
                        D [Add] mm
                      </text>
                      <text x="410" y="58" fontFamily="IBM Plex Mono, monospace" fontSize="10" fontWeight="600" fill="#222222">
                        CAMERA RING
                      </text>
                      <text x="410" y="72" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#666666">
                        [Add] mm
                      </text>
                      <text x="410" y="198" fontFamily="IBM Plex Mono, monospace" fontSize="10" fontWeight="600" fill="#222222">
                        LIP HEIGHT
                      </text>
                      <text x="410" y="212" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#666666">
                        [Add] mm
                      </text>
                    </svg>
                  </div>
                  <dl style={{ gridColumn: "span 6", margin: "0", borderTop: "1px solid #EEEEEE" }}>
                    <div className="spec-row" style={{ display: "grid", gridTemplateColumns: "200px minmax(0, 1fr)", gap: "4px 24px", padding: "16px 0", borderBottom: "1px solid #EEEEEE" }}>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#666666" }}>
                        Fits
                      </dt>
                      <dd style={{ margin: "0", fontWeight: "600", color: "#222222" }}>
                        {allFits}
                      </dd>
                    </div>
                    <div className="spec-row" style={{ display: "grid", gridTemplateColumns: "200px minmax(0, 1fr)", gap: "4px 24px", padding: "16px 0", borderBottom: "1px solid #EEEEEE" }}>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#666666" }}>
                        Height × width
                      </dt>
                      <dd style={{ margin: "0", fontWeight: "600", color: "#666666" }}>
                        [Add] × [Add] mm
                      </dd>
                    </div>
                    <div className="spec-row" style={{ display: "grid", gridTemplateColumns: "200px minmax(0, 1fr)", gap: "4px 24px", padding: "16px 0", borderBottom: "1px solid #EEEEEE" }}>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#666666" }}>
                        Depth
                      </dt>
                      <dd style={{ margin: "0", fontWeight: "600", color: "#666666" }}>
                        [Add] mm
                      </dd>
                    </div>
                    <div className="spec-row" style={{ display: "grid", gridTemplateColumns: "200px minmax(0, 1fr)", gap: "4px 24px", padding: "16px 0", borderBottom: "1px solid #EEEEEE" }}>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#666666" }}>
                        Lip above screen
                      </dt>
                      <dd style={{ margin: "0", fontWeight: "600", color: "#666666" }}>
                        [Add] mm
                      </dd>
                    </div>
                    <div className="spec-row" style={{ display: "grid", gridTemplateColumns: "200px minmax(0, 1fr)", gap: "4px 24px", padding: "16px 0", borderBottom: "1px solid #EEEEEE" }}>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#666666" }}>
                        Camera ring height
                      </dt>
                      <dd style={{ margin: "0", fontWeight: "600", color: "#666666" }}>
                        [Add] mm
                      </dd>
                    </div>
                    <div className="spec-row" style={{ display: "grid", gridTemplateColumns: "200px minmax(0, 1fr)", gap: "4px 24px", padding: "16px 0", borderBottom: "1px solid #EEEEEE" }}>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#666666" }}>
                        Weight
                      </dt>
                      <dd style={{ margin: "0", fontWeight: "600", color: "#666666" }}>
                        [Add] g
                      </dd>
                    </div>
                  </dl>
                </div>
            )}
            {tab2 && (
              <dl style={{ margin: "0", maxWidth: "860px", borderTop: "1px solid #EEEEEE" }}>
                  <div className="spec-row" style={{ display: "grid", gridTemplateColumns: "220px minmax(0, 1fr)", gap: "4px 24px", padding: "16px 0", borderBottom: "1px solid #EEEEEE" }}>
                    <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#666666" }}>
                      Material
                    </dt>
                    <dd style={{ margin: "0", fontWeight: "600", color: "#666666" }}>
                      [Add material]
                    </dd>
                  </div>
                  <div className="spec-row" style={{ display: "grid", gridTemplateColumns: "220px minmax(0, 1fr)", gap: "4px 24px", padding: "16px 0", borderBottom: "1px solid #EEEEEE" }}>
                    <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#666666" }}>
                      Finish
                    </dt>
                    <dd style={{ margin: "0", fontWeight: "600", color: "#666666" }}>
                      [Add finish]
                    </dd>
                  </div>
                  <div className="spec-row" style={{ display: "grid", gridTemplateColumns: "220px minmax(0, 1fr)", gap: "4px 24px", padding: "16px 0", borderBottom: "1px solid #EEEEEE" }}>
                    <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#666666" }}>
                      Drop rating
                    </dt>
                    <dd style={{ margin: "0", fontWeight: "600", color: "#666666" }}>
                      [Add rating]
                    </dd>
                  </div>
                  <div className="spec-row" style={{ display: "grid", gridTemplateColumns: "220px minmax(0, 1fr)", gap: "4px 24px", padding: "16px 0", borderBottom: "1px solid #EEEEEE" }}>
                    <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#666666" }}>
                      Charging
                    </dt>
                    <dd style={{ margin: "0", fontWeight: "600", color: magsafe ? "#222222" : "#666666" }}>
                      {magsafe ? "MagSafe compatible" : "[Add charging]"}
                    </dd>
                  </div>
                  <div className="spec-row" style={{ display: "grid", gridTemplateColumns: "220px minmax(0, 1fr)", gap: "4px 24px", padding: "16px 0", borderBottom: "1px solid #EEEEEE" }}>
                    <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#666666" }}>
                      Colors
                    </dt>
                    <dd style={{ margin: "0", fontWeight: "600", color: "#666666" }}>
                      [Add colours]
                    </dd>
                  </div>
                  <div className="spec-row" style={{ display: "grid", gridTemplateColumns: "220px minmax(0, 1fr)", gap: "4px 24px", padding: "16px 0", borderBottom: "1px solid #EEEEEE" }}>
                    <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#666666" }}>
                      SKU
                    </dt>
                    <dd style={{ margin: "0", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontWeight: "600", color: "#222222" }}>
                      {sku}
                    </dd>
                  </div>
                </dl>
            )}
            {tab3 && (
              <div style={{ display: "flex", flexDirection: "column", maxWidth: "860px" }}>
                  <p id="pp-compat-help" style={{ margin: "0 0 16px", color: "#666666" }}>
                    Each case is cut for one model. Pick yours before adding to cart, or tick several to get one for each iPhone.
                  </p>
                  <span id="pp-compat-label" className="sr">
                    iPhone models
                  </span>
                  <div style={{ maxWidth: "420px" }}>
                    <ModelPicker value={devices} onChange={setDevices} labelledBy="pp-compat-label" describedBy="pp-compat-help" />
                  </div>
                </div>
            )}
            {tab4 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px", border: "1px solid #EEEEEE", maxWidth: "520px" }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#222222" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 8l9-4 9 4-9 4-9-4z" />
                      <path d="M3 8v8l9 4 9-4V8" />
                      <path d="M12 12v8" />
                    </svg>
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#666666" }}>
                        In the box
                      </span>
                      <span style={{ fontWeight: "700", color: "#222222" }}>
                        {"1 × "}{cover.name}
                      </span>
                    </div>
                  </div>
                  <ol className="g3" style={{ listStyle: "none", margin: "0", padding: "0", display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "24px" }}>
                    <li style={{ background: "#F4F4F4", padding: "28px", display: "flex", flexDirection: "column", gap: "10px" }}>
                      <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", color: "#666666" }}>
                        01
                      </span>
                      <span style={{ fontSize: "18px", fontWeight: "700", color: "#222222" }}>
                        Seat the top
                      </span>
                      <span style={{ fontSize: "15px", color: "#666666" }}>
                        Slide the top of your iPhone in first, with the camera lined up to the cutout.
                      </span>
                    </li>
                    <li style={{ background: "#F4F4F4", padding: "28px", display: "flex", flexDirection: "column", gap: "10px" }}>
                      <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", color: "#666666" }}>
                        02
                      </span>
                      <span style={{ fontSize: "18px", fontWeight: "700", color: "#222222" }}>
                        Press the corners
                      </span>
                      <span style={{ fontSize: "15px", color: "#666666" }}>
                        Push the bottom corners in until the lip sits flush all the way around the screen.
                      </span>
                    </li>
                    <li style={{ background: "#F4F4F4", padding: "28px", display: "flex", flexDirection: "column", gap: "10px" }}>
                      <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", color: "#666666" }}>
                        03
                      </span>
                      <span style={{ fontSize: "18px", fontWeight: "700", color: "#222222" }}>
                        Keep it clean
                      </span>
                      <span style={{ fontSize: "15px", color: "#666666" }}>
                        Wipe with a soft, damp cloth. Skip harsh solvents, especially on Clear.
                      </span>
                    </li>
                  </ol>
                </div>
            )}
          </div>
        </div>
      </section>

      {/* COMPLETE THE SET */}
      <section style={{ background: "#F4F4F4" }}>
        <div className="wrap" style={{ maxWidth: "1420px", margin: "0 auto", padding: "96px 40px", display: "flex", flexDirection: "column", gap: "40px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#666666" }}>
              Complete the set
            </div>
            <h2 className="hx" style={{ margin: "0", fontSize: "56px", lineHeight: "1.05", fontWeight: "800", letterSpacing: "-0.03em", color: "#222222" }}>
              Case. Glass. Lens.
            </h2>
          </div>
          <div className="g12" style={{ display: "grid", gridTemplateColumns: "repeat(12, minmax(0, 1fr))", columnGap: "24px", rowGap: "32px", alignItems: "center" }}>
            <div style={{ gridColumn: "span 8", display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap", minWidth: "0" }}>
              <div style={{ flex: "1 1 180px", minWidth: "0", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ aspectRatio: "1 / 1", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ProductArt kind="case" img={cover.img} color={COLORS[cover.def]} style={{ width: "70%", height: "70%" }} />
                </div>
                <div style={{ fontSize: "15px", fontWeight: "700", color: "#222222" }}>
                  {cover.name}
                </div>
                <div style={{ fontSize: "14px", color: "#666666" }}>
                  {inr(cover.price)}
                </div>
              </div>
              <span aria-hidden="true" style={{ width: "40px", height: "40px", borderRadius: "50px", background: "#000000", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
              <div style={{ flex: "1 1 180px", minWidth: "0", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ aspectRatio: "1 / 1", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg viewBox="0 0 100 100" aria-hidden="true" style={{ width: "70%", height: "70%", display: "block" }}>
                    <rect x="26" y="8" width="38" height="78" rx="8" fill="#E4EBEF" stroke="#B9C0C4" strokeWidth="1" />
                    <rect x="36" y="14" width="38" height="78" rx="8" fill="#E4EBEF" stroke="#B9C0C4" strokeWidth="1" />
                    <rect x="38" y="16" width="34" height="74" rx="6.5" fill="none" stroke="#1A1A1A" strokeWidth="1.5" />
                    <polygon points="40,60 66,22 70,22 44,60" fill="#FFFFFF" />
                  </svg>
                </div>
                <div style={{ fontSize: "15px", fontWeight: "700", color: "#222222" }}>
                  {GLASS.name}
                </div>
                <div style={{ fontSize: "14px", color: "#666666" }}>
                  <span style={{ color: "#EB0000", fontWeight: "700" }}>
                    {inr(GLASS_WITH_CASE)}
                  </span>
                  {" "}
                  <s>
                    {inr(GLASS.price)}
                  </s>
                  {" with case"}
                </div>
              </div>
              <span aria-hidden="true" style={{ width: "40px", height: "40px", borderRadius: "50px", background: "#000000", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
              <div style={{ flex: "1 1 180px", minWidth: "0", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ aspectRatio: "1 / 1", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg viewBox="0 0 100 100" aria-hidden="true" style={{ width: "70%", height: "70%", display: "block" }}>
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
                <div style={{ fontSize: "15px", fontWeight: "700", color: "#222222" }}>
                  {LENS.name}
                </div>
                <div style={{ fontSize: "14px", color: "#666666" }}>
                  {inr(LENS.price)}
                </div>
              </div>
            </div>
            <div className="pad-card" style={{ gridColumn: "span 4", background: "#FFFFFF", padding: "32px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#666666" }}>
                {n > 1 ? `Total for ${3 * n} items (one set per model)` : "Total for 3 items"}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
                <span style={{ fontSize: "29px", fontWeight: "800", color: "#222222" }}>
                  {inr(setPrice * n)}
                </span>
                <s style={{ fontSize: "15px", color: "#666666" }}>
                  {inr((cover.price + GLASS.price + LENS.price) * n)}
                </s>
              </div>
              <p style={{ margin: "0", fontSize: "14px", color: "#666666" }}>
                {"You save "}{inr((GLASS.price - GLASS_WITH_CASE) * n)}{". Glass is 50% off when bought with any cover."}
              </p>
              <button type="button" className="btn-solid" onClick={addSet} style={{ height: "56px", border: "0", borderRadius: "50px", background: "#000000", color: "#FFFFFF", fontFamily: "inherit", fontSize: "15px", fontWeight: "700", cursor: "pointer" }}>
                {added === "set" ? "Added ✓" : n > 1 ? `Add ${3 * n} to Cart` : "Add All 3 to Cart"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS (empty state) */}
      <section style={{ background: "#FFFFFF", borderBottom: "1px solid #EEEEEE" }}>
        <div className="wrap g12" style={{ maxWidth: "1420px", margin: "0 auto", padding: "96px 40px", display: "grid", gridTemplateColumns: "repeat(12, minmax(0, 1fr))", columnGap: "24px", rowGap: "32px", alignItems: "center" }}>
          <div style={{ gridColumn: "span 5", display: "flex", flexDirection: "column", gap: "14px" }}>
            <h2 style={{ margin: "0", fontSize: "29px", lineHeight: "1.15", fontWeight: "800", letterSpacing: "-0.02em", color: "#222222" }}>
              Customer Reviews
            </h2>
            <svg width="136" height="24" viewBox="0 0 136 24" role="img" aria-label="No ratings yet">
              <g fill="none" stroke="#222222" strokeWidth="1.5" strokeLinejoin="round">
                <path d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.9l-5.3 2.7 1-5.8-4.2-4.1 5.9-.9z" />
                <path transform="translate(28 0)" d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.9l-5.3 2.7 1-5.8-4.2-4.1 5.9-.9z" />
                <path transform="translate(56 0)" d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.9l-5.3 2.7 1-5.8-4.2-4.1 5.9-.9z" />
                <path transform="translate(84 0)" d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.9l-5.3 2.7 1-5.8-4.2-4.1 5.9-.9z" />
                <path transform="translate(112 0)" d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.9l-5.3 2.7 1-5.8-4.2-4.1 5.9-.9z" />
              </g>
            </svg>
            <p style={{ margin: "0", color: "#666666" }}>
              No reviews yet for this case.
            </p>
          </div>
          <div style={{ gridColumn: "span 7", border: "1.5px dashed #DDDDDD", padding: "40px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "14px" }}>
            <h3 style={{ margin: "0", fontSize: "20px", fontWeight: "700", color: "#222222" }}>
              {"Own the "}{cover.name}{"?"}
            </h3>
            <p style={{ margin: "0", color: "#666666" }}>
              Reviews from verified buyers will show up here, newest first.
            </p>
            <a className="btn-ghost" href="#write-review" style={{ height: "48px", padding: "0 24px", borderRadius: "50px", border: "1.5px solid #222222", color: "#222222", display: "inline-flex", alignItems: "center", fontWeight: "700", fontSize: "14px" }}>
              Write a Review
            </a>
          </div>
        </div>
      </section>

      {/* YOU MAY ALSO LIKE */}
      <section style={{ background: "#FFFFFF" }}>
        <div className="wrap" style={{ maxWidth: "1420px", margin: "0 auto", padding: "96px 40px 120px", display: "flex", flexDirection: "column", gap: "40px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
            <h2 className="hx" style={{ margin: "0", fontSize: "56px", lineHeight: "1.05", fontWeight: "800", letterSpacing: "-0.03em", color: "#222222" }}>
              You may also like
            </h2>
            <Link to="/collection" className="btn-ghost" style={{ height: "48px", padding: "0 24px", borderRadius: "50px", border: "1.5px solid #222222", color: "#222222", display: "inline-flex", alignItems: "center", gap: "10px", fontWeight: "700", fontSize: "14px" }}>
              View All Products
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
          <div className="g4" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "20px" }}>
            {related.map((r) => (
              <ProductCard key={r} id={r} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
