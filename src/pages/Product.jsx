import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useStore, stockFor } from "../store.jsx";
import { MODELS, MODEL_CODES, PRODUCTS, inr, fitsText, modelsText, optionsFor } from "../catalog.js";
import ProductGallery, { photosOf } from "../components/ProductGallery.jsx";
import ModelPicker from "../components/ModelPicker.jsx";
import ProductCard, { BADGES } from "../components/ProductCard.jsx";
import Promises from "../components/Promises.jsx";

const COVERS = Object.keys(PRODUCTS).filter((id) => PRODUCTS[id].kind === "case");
const off = (p) => Math.round(((p.mrp - p.price) / p.mrp) * 100);
const check = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: "0", marginTop: "2px" }}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

// /product?id=<cover id>; an unknown id shows the first cover. Keyed by id, so moving to another
// product (e.g. from "You may also like") starts fresh: first photo, quantity 1.
export default function ProductPage() {
  const [params] = useSearchParams();
  const id = COVERS.includes(params.get("id")) ? params.get("id") : COVERS[0];
  return <Product key={id} id={id} />;
}

function Product({ id }) {
  const { cart, devices, setDevices, addForModels } = useStore();
  const navigate = useNavigate();
  const cover = PRODUCTS[id];
  const imgs = photosOf(cover);
  const badge = BADGES[cover.badge];
  const magsafe = /MagSafe/.test(cover.name + cover.feat);
  const feats = cover.feat.split(" · ");
  // Other covers with photos, for "You may also like".
  const related = COVERS.filter((x) => x !== id && PRODUCTS[x].img).slice(0, 4);
  // Several models selected = one of each item per model.
  const n = devices.length;
  const allFits = fitsText(devices);
  const [photo, setPhoto] = useState(0);
  const colors = optionsFor(cover); // null for covers sold in one unnamed colour
  const [ci, setCi] = useState(0);
  const color = colors?.[ci];
  const sku = devices.map((d) => ["SE", cover.code, MODEL_CODES[MODELS.indexOf(d)], color?.code].filter(Boolean).join("-")).join(", ");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false); // showing the tick
  // Stock for each selected model, minus what's already in the bag (Infinity if this cover isn't tracked).
  const left = devices.map((d) => stockFor(id, d, color?.name, cart));
  const soldOutFor = devices.filter((_, k) => left[k] < 1);
  const lowFor = devices.filter((_, k) => left[k] > 0 && left[k] <= 3);
  const inStock = n - soldOutFor.length;
  const maxQty = Math.min(10, ...left.filter((x) => x > 0));
  const qn = Math.max(1, Math.min(qty, maxQty)); // the quantity shown and added

  const total = cover.price * qn * inStock;
  // "All iPhone models" is selected: the buy buttons open the model picker instead.
  const chooseModel = () => {
    const b = document.querySelector('[aria-labelledby^="pp-model-label"]');
    b?.scrollIntoView({ block: "center" });
    b?.click();
  };
  const flash = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };
  const addToBag = () => addForModels(id, qn, color?.name);

  return (
    <main className="se-root se-font" style={{ background: "#FFFFFF" }}>
      <div className="wrap" style={{ maxWidth: "1420px", margin: "0 auto", padding: "24px 40px 80px" }}>
        <nav aria-label="Breadcrumb" style={{ fontSize: "13px", color: "#666666", marginBottom: "20px" }}>
          <Link to="/" style={{ color: "#666666" }}>
            Home
          </Link>
          {" / "}
          <Link to="/collection?cat=covers" style={{ color: "#666666" }}>
            Covers
          </Link>
          {" / "}
          <span aria-current="page" style={{ color: "#111111" }}>
            {cover.name}
          </span>
        </nav>

        <div className="pp-grid">
          <div className="stick" style={{ position: "sticky", top: "100px", minWidth: "0" }} onKeyDown={(e) => imgs.length > 1 && (e.key === "ArrowRight" || e.key === "ArrowLeft") && setPhoto((x) => (x + (e.key === "ArrowRight" ? 1 : -1) + imgs.length) % imgs.length)}>
            <ProductGallery p={cover} i={photo} setI={setPhoto} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px", minWidth: "0" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {badge && (
                <span className="pbadge" style={{ alignSelf: "flex-start", background: badge.bg }}>
                  {badge.label}
                </span>
              )}
              <h1 style={{ margin: "0", fontSize: "30px", lineHeight: "1.2", fontWeight: "600", letterSpacing: "-0.02em", color: "#111111" }}>{cover.name}</h1>
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "24px", fontWeight: "600", color: "#111111" }}>{inr(cover.price)}</span>
                <s style={{ fontSize: "15px", color: "#8A8A8A" }}>{inr(cover.mrp)}</s>
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#C4281C" }}>{off(cover)}% off</span>
              </div>
              <span style={{ marginTop: "-6px", fontSize: "13px", color: "#666666" }}>Inclusive of all taxes</span>
              <ul style={{ listStyle: "none", margin: "4px 0 0", padding: "0", display: "flex", flexDirection: "column", gap: "8px", fontSize: "15px", color: "#333333" }}>
                {feats.map((f) => (
                  <li key={f} style={{ display: "flex", gap: "10px" }}>
                    {check}
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {colors && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", borderTop: "1px solid #EEEEEE", paddingTop: "20px" }}>
                <span id="pp-color-label" style={{ fontSize: "14px", fontWeight: "600", color: "#111111" }}>
                  {"Colour: "}
                  <span style={{ fontWeight: "400", color: "#444444" }}>{color.name}</span>
                </span>
                <div role="group" aria-labelledby="pp-color-label" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {colors.map((c, k) => (
                    <button key={c.name} type="button" className="pp-swatch" aria-label={c.name} aria-pressed={k === ci} title={c.name} onClick={() => setCi(k)} style={{ width: "36px", height: "36px", padding: "3px", borderRadius: "50%", border: `2px solid ${k === ci ? "#111111" : "transparent"}`, background: "transparent", cursor: "pointer" }}>
                      <span aria-hidden="true" style={{ display: "block", width: "100%", height: "100%", borderRadius: "50%", background: c.swatch, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.15)" }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px solid #EEEEEE", paddingTop: "20px" }}>
              <span id="pp-model-label" style={{ fontSize: "14px", fontWeight: "600", color: "#111111" }}>
                iPhone model
              </span>
              <ModelPicker compact value={devices} onChange={setDevices} labelledBy="pp-model-label" describedBy="pp-model-help" />
              <span id="pp-model-help" style={{ fontSize: "13px", lineHeight: "1.5", color: "#666666" }}>
                {n > 1 ? `You'll get one for each: ${allFits}.` : !n ? "Choose your model to add to bag. Not sure which? Settings › General › About › Model Name." : "Not sure which? Settings › General › About › Model Name. Buying for more than one? Tick several."}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", gap: "8px" }}>
                <div role="group" aria-label="Quantity" style={{ display: "flex", alignItems: "center", height: "48px", border: "1px solid #DDDDDD", borderRadius: "50px", padding: "0 4px", flexShrink: "0" }}>
                  <button type="button" aria-label="Decrease quantity" disabled={qn === 1} onClick={() => setQty(Math.max(1, qn - 1))} className="pp-step">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                      <path d="M5 12h14" />
                    </svg>
                  </button>
                  <span aria-live="polite" style={{ minWidth: "24px", textAlign: "center", fontWeight: "600", fontSize: "15px" }}>
                    {qn}
                  </span>
                  <button type="button" aria-label="Increase quantity" disabled={qn >= maxQty} onClick={() => setQty(Math.min(maxQty, qn + 1))} className="pp-step">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
                <button type="button" className="btn-solid" disabled={n > 0 && !inStock} onClick={() => (n ? (addToBag(), flash()) : chooseModel())} style={{ flex: "1 1 auto", height: "48px", padding: "0 18px", border: "0", borderRadius: "50px", background: inStock || !n ? "#111111" : "#BBBBBB", color: "#FFFFFF", fontFamily: "inherit", fontSize: "15px", fontWeight: "600", cursor: inStock || !n ? "pointer" : "default" }}>
                  {added ? "Added to bag ✓" : !n ? "Choose your iPhone model" : inStock ? `Add to bag · ${inr(total)}` : "Sold out"}
                </button>
              </div>
              <button type="button" className="btn-ghost" disabled={n > 0 && !inStock} onClick={() => (n ? (addToBag(), navigate("/cart")) : chooseModel())} style={{ height: "48px", border: "1px solid #111111", borderRadius: "50px", background: "#FFFFFF", color: "#111111", fontFamily: "inherit", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>
                Buy now
              </button>
              <span role="status" className="sr-only">
                {added ? `Added ${cover.name}${color ? `, ${color.name},` : ""} to bag` : ""}
              </span>
              {soldOutFor.length > 0 && <span style={{ fontSize: "13px", fontWeight: "500", color: "#C4281C" }}>{`Not available for ${modelsText(soldOutFor)}.${inStock ? " Your other models will still be added." : ""}`}</span>}
              {lowFor.length > 0 && <span style={{ fontSize: "13px", fontWeight: "500", color: "#7A5200" }}>{lowFor.map((d) => `Only ${left[devices.indexOf(d)]} left for ${d}`).join(" · ")}</span>}
              {inStock > 1 && <span style={{ fontSize: "13px", color: "#666666" }}>{`Price covers one for each of your ${inStock} models.`}</span>}
            </div>

            <p style={{ margin: "0", display: "flex", gap: "10px", fontSize: "13px", lineHeight: "1.55", color: "#555555" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: "0" }}>
                <path d="M3 6.5h11v9H3z" />
                <path d="M14 9.5h3.5l3 3v3H14z" />
                <circle cx="7" cy="17.5" r="1.8" />
                <circle cx="17" cy="17.5" r="1.8" />
              </svg>
              <span>
                Dispatched in 1–2 business days and usually delivered 2–5 days later. You get a tracking link by SMS and email.{" "}
                <Link to="/policies/shipping" style={{ color: "#111111", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                  Shipping details
                </Link>
              </span>
            </p>

            <div className="pp-acc">
              <details open>
                <summary>Description</summary>
                <div>
                  {cover.details?.length > 0 && (
                    <ul style={{ margin: "0 0 12px", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                      {cover.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  )}
                  <p style={{ margin: "0" }}>{`${cover.name}, cut for ${allFits}.`}</p>
                </div>
              </details>
              <details>
                <summary>Specifications</summary>
                <dl className="pp-specs">
                  <div>
                    <dt>Fits</dt>
                    <dd>{allFits}</dd>
                  </div>
                  {magsafe && (
                    <div>
                      <dt>Charging</dt>
                      <dd>MagSafe compatible</dd>
                    </div>
                  )}
                  {colors && (
                    <div>
                      <dt>Colours</dt>
                      <dd>{colors.map((c) => c.name).join(", ")}</dd>
                    </div>
                  )}
                  <div>
                    <dt>Features</dt>
                    <dd>{feats.join(", ")}</dd>
                  </div>
                  <div>
                    <dt>SKU</dt>
                    <dd style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "13px" }}>{sku}</dd>
                  </div>
                </dl>
              </details>
              <details>
                <summary>{"In the box & fitting"}</summary>
                <div>
                  <p style={{ margin: "0 0 12px" }}>
                    <strong style={{ color: "#111111", fontWeight: "600" }}>In the box:</strong>
                    {` 1 × ${cover.name}${color ? ` (${color.name})` : ""}${n > 1 || qty > 1 ? " per unit ordered" : ""}.`}
                  </p>
                  <ol style={{ margin: "0", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <li>Slide the top of your iPhone in first, with the camera lined up to the cutout.</li>
                    <li>Push the bottom corners in until the edge sits flush all the way around.</li>
                    <li>To clean, wipe with a soft, damp cloth. Skip harsh solvents.</li>
                  </ol>
                </div>
              </details>
              <details>
                <summary>{"Returns & warranty"}</summary>
                <div>
                  <p style={{ margin: "0 0 12px" }}>Wrong model? Exchange an unused cover in its original packaging within 7 days of delivery. Manufacturing defects are covered by our warranty.</p>
                  <p style={{ margin: "0", display: "flex", gap: "16px", flexWrap: "wrap" }}>
                    <Link to="/policies/returns" style={{ color: "#111111", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                      {"Returns & exchanges"}
                    </Link>
                    <Link to="/policies/warranty" style={{ color: "#111111", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                      {"Warranty & replacement"}
                    </Link>
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>

      <section style={{ borderTop: "1px solid #EEEEEE" }}>
        <div className="wrap" style={{ maxWidth: "1420px", margin: "0 auto", padding: "72px 40px 96px", display: "flex", flexDirection: "column", gap: "28px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
            <h2 className="hx" style={{ margin: "0", fontSize: "36px", lineHeight: "1.1", fontWeight: "800", letterSpacing: "-0.03em", color: "#111111" }}>
              You may also like
            </h2>
            <Link to="/collection?cat=covers" style={{ display: "inline-flex", alignItems: "center", gap: "6px", height: "44px", fontSize: "14px", fontWeight: "600", color: "#111111" }}>
              Shop all covers
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
          <Promises />
        </div>
      </section>
    </main>
  );
}
