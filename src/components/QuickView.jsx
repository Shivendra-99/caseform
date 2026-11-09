import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStore, stockFor } from "../store.jsx";
import { PRODUCTS, inr, modelsText, optionsFor } from "../catalog.js";
import ModelPicker from "./ModelPicker.jsx";
import { lockScroll } from "../motion/smoothScroll.js";
import { closeWithExit, useDragDismiss } from "../motion/sheet.js";
import ProductGallery, { photosOf } from "./ProductGallery.jsx";
import { BADGES, Offer } from "./ProductCard.jsx";

const round = { width: "44px", height: "44px", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "50px", background: "#FFFFFF", color: "#111111", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" };

// Quick view popup for a product card: the whole photo gallery plus price and add to bag, in a
// native modal <dialog> (focus stays inside, Esc and a backdrop click close it). Arrow keys
// step through the photos. On desktop it grows out of the card that opened it (`origin`) and
// shrinks back into it; on phones it's a bottom sheet you can drag down to dismiss.
export default function QuickView({ id, finish: startFinish, origin, onClose }) {
  const p = PRODUCTS[id];
  const { cart, devices, setDevices, addForModels } = useStore();
  const ref = useRef(null);
  const grab = useRef(null);
  const titleId = useId();
  const imgs = photosOf(p);
  const isGlass = p.kind === "glass";
  const url = p.kind === "case" ? `/product?id=${id}` : null;
  const badge = BADGES[p.badge];
  const n = devices.length;
  const [i, setI] = useState(0);
  const opts = optionsFor(p); // glass finishes or cover colours
  const [finish, setFinish] = useState(isGlass ? startFinish : 0);
  const [added, setAdded] = useState(false);
  const variant = opts?.[finish].name;
  const soldOutFor = devices.filter((d) => stockFor(id, d, variant, cart) < 1);
  const inStock = n - soldOutFor.length;

  useEffect(() => {
    const d = ref.current;
    d.showModal();
    // Anchor the scale to the card that was tapped, so the popup visibly comes from (and returns to) it.
    const o = origin?.current?.getBoundingClientRect();
    if (o) {
      const r = d.getBoundingClientRect();
      d.style.transformOrigin = `${o.left + o.width / 2 - r.left}px ${o.top + o.height / 2 - r.top}px`;
    }
    lockScroll(true);
    return () => lockScroll(false);
  }, [origin]);

  // Phones: pull the sheet down by its grabber. Already off screen, so it closes without the exit animation.
  useDragDismiss(ref, { axis: "y", dir: 1, handleRef: grab, onDismiss: () => ref.current?.close() });

  const close = () => closeWithExit(ref.current); // fires onClose once the exit animation ends
  const step = (d) => setI((x) => (x + d + imgs.length) % imgs.length);
  const add = () => {
    addForModels(id, 1, variant);
    navigator.vibrate?.(10); // a light tick on the commit, same frame as the visual change
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <dialog
      ref={ref}
      className="se-root se-font qv"
      aria-labelledby={titleId}
      data-lenis-prevent
      onClose={onClose}
      onCancel={(e) => e.cancelable && (e.preventDefault(), close())}
      onClick={(e) => e.target === e.currentTarget && close()}
      onKeyDown={(e) => imgs.length > 1 && (e.key === "ArrowRight" || e.key === "ArrowLeft") && step(e.key === "ArrowRight" ? 1 : -1)}
    >
      <div ref={grab} className="qv-grab" aria-hidden="true">
        <span />
      </div>
      <button type="button" aria-label="Close quick view" onClick={close} style={{ ...round, position: "absolute", top: "16px", right: "16px", zIndex: 2 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <div className="qv-grid">
        <ProductGallery p={p} finish={isGlass ? finish : startFinish} i={i} setI={setI} />

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", minWidth: "0", paddingTop: "8px" }}>
          {badge && <span className="pbadge" style={{ alignSelf: "flex-start", background: badge.bg }}>{badge.label}</span>}
          <h2 id={titleId} style={{ margin: "0", fontSize: "28px", lineHeight: "1.2", fontWeight: "600", letterSpacing: "-0.02em", color: "#111111", paddingRight: "40px" }}>
            {p.name}
          </h2>
          <div style={{ display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "24px", fontWeight: "600", color: "#111111" }}>{inr(p.price)}</span>
            {p.mrp > p.price && <s style={{ fontSize: "16px", color: "#8A8A8A" }}>{inr(p.mrp)}</s>}
            <span style={{ fontSize: "13px", color: "#666666" }}>Inclusive of all taxes</span>
          </div>
          <Offer p={p} style={{ fontSize: "15px" }} />
          <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#444444" }}>{p.feat}.</p>

          {opts && (
            <div role="group" aria-label={isGlass ? "Finish" : "Colour"} style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {opts.map((f, k) => (
                <button key={f.name} type="button" aria-pressed={k === finish} onClick={() => setFinish(k)} style={{ height: "40px", padding: f.swatch ? "0 16px 0 10px" : "0 16px", display: "inline-flex", alignItems: "center", gap: "8px", borderRadius: "40px", border: `1px solid ${k === finish ? "#111111" : "#DDDDDD"}`, background: k === finish ? "#111111" : "#FFFFFF", color: k === finish ? "#FFFFFF" : "#222222", fontFamily: "inherit", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>
                  {f.swatch && <span aria-hidden="true" style={{ width: "18px", height: "18px", borderRadius: "50%", background: f.swatch, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.6)" }} />}
                  {f.name}
                </button>
              ))}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", lineHeight: "1.5", color: "#444444" }}>
            <span id={`${titleId}-model`} style={{ fontWeight: "600", color: "#111111" }}>
              iPhone model
            </span>
            <ModelPicker compact value={devices} onChange={setDevices} labelledBy={`${titleId}-model`} describedBy={`${titleId}-fit`} />
            <span id={`${titleId}-fit`}>
              {!n ? "Choose your model to add to bag." : n > 1 ? "You'll get one for each model." : ""}
              {soldOutFor.length > 0 && <span style={{ display: "block", color: "#C4281C", fontWeight: "500" }}>{`Not available for ${modelsText(soldOutFor)}.`}</span>}
            </span>
          </div>

          <button type="button" className="btn-solid" onClick={n ? add : () => ref.current.querySelector(".model-select").click()} disabled={n > 0 && !inStock} style={{ height: "56px", border: "0", borderRadius: "50px", background: inStock || !n ? "#111111" : "#BBBBBB", color: "#FFFFFF", fontFamily: "inherit", fontSize: "16px", fontWeight: "600", cursor: inStock || !n ? "pointer" : "default" }}>
            {added ? "Added to bag ✓" : !n ? "Choose your iPhone model" : inStock ? `Add to bag · ${inr(p.price * inStock)}` : "Sold out"}
          </button>
          <span role="status" className="sr-only">
            {added ? `Added ${p.name} to bag` : ""}
          </span>
          {url && (
            <Link to={url} onClick={close} style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "8px", height: "44px", fontSize: "15px", fontWeight: "600", color: "#111111", textDecoration: "underline", textUnderlineOffset: "4px" }}>
              View full details
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </dialog>
  );
}
