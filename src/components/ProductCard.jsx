import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStore, stockFor } from "../store.jsx";
import { PRODUCTS, COLORS, FINISHES, inr, modelsText, optionsFor } from "../catalog.js";
import { reducedMotion } from "../motion/gsap.js";
import ProductArt from "./ProductArt.jsx";
import QuickView from "./QuickView.jsx";

const CYCLE_MS = 1100;

export const BADGES = { best: { label: "Best seller", bg: "#111111" }, new: { label: "New", bg: "#1F7A4D" }, sale: { label: "Sale", bg: "#C4281C" } };

// The one product card used across the shop: photo on soft grey, details on a white panel.
// Hovering cycles through all the product's photos; a swipe does the same on touch screens.
// Clicking the photo opens Quick view. Adding puts one in the bag per selected iPhone model;
// with no model chosen yet, + opens Quick view so the shopper picks one.
export default function ProductCard({ id }) {
  const p = PRODUCTS[id];
  const { cart, devices, addForModels } = useStore();
  const imgs = p.imgs ?? (p.img ? [p.img] : []);
  const isGlass = p.kind === "glass";
  const opts = optionsFor(p);
  const colors = isGlass ? null : opts; // covers: the card adds the first colour, Quick view / the product page pick others
  const variant = opts?.[isGlass ? p.def : 0].name;
  // Selected iPhone models this product has run out for (only stock-tracked products ever do).
  const soldOutFor = devices.filter((d) => stockFor(id, d, variant, cart) < 1);
  const soldOut = devices.length > 0 && soldOutFor.length === devices.length;
  const url = p.kind === "case" ? `/product?id=${id}` : null;
  const badge = BADGES[p.badge];
  const [shown, setShown] = useState(0);
  const [hover, setHover] = useState(false);
  const finish = p.def;
  const [added, setAdded] = useState(false);
  const [quick, setQuick] = useState(false);
  const swipeX = useRef(null);
  const swiped = useRef(false); // a swipe changes the photo; it must not also open Quick view
  const photoBtn = useRef(null);

  useEffect(() => {
    if (!hover || imgs.length < 2 || reducedMotion()) return;
    const t = setInterval(() => setShown((s) => (s + 1) % imgs.length), CYCLE_MS);
    return () => clearInterval(t);
  }, [hover, imgs.length]);

  const enter = () => {
    setHover(true);
    if (imgs.length > 1 && !reducedMotion()) setShown(1); // react right away, then keep cycling
  };
  const leave = () => {
    setHover(false);
    setShown(0);
  };
  const add = () => {
    if (!devices.length) return setQuick(true); // "All iPhone models": pick one in Quick view first
    addForModels(id, 1, variant);
    navigator.vibrate?.(10); // a light tick on the commit, same frame as the visual change
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };
  const canAdd = devices.filter((d) => !soldOutFor.includes(d));
  const forModels = canAdd.length > 1 ? `, one for each of ${modelsText(canAdd)}` : canAdd.length === 1 && devices.length > 1 ? `, for ${canAdd[0]}` : "";

  return (
    <article className="pcard se-font" style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "8px", background: "#F6F6F6", borderRadius: "22px", minWidth: "0" }}>
      <button
        ref={photoBtn}
        type="button"
        className="pcard-img"
        aria-label={`Quick view: ${p.name}`}
        onClick={() => (swiped.current ? (swiped.current = false) : setQuick(true))}
        onMouseEnter={enter}
        onMouseLeave={leave}
        onPointerDown={(e) => (swipeX.current = e.pointerType === "mouse" ? null : e.clientX)}
        onPointerUp={(e) => {
          const dx = swipeX.current == null ? 0 : e.clientX - swipeX.current;
          swipeX.current = null;
          if (imgs.length > 1 && Math.abs(dx) > 40) {
            swiped.current = true;
            setShown((s) => (s + (dx < 0 ? 1 : -1) + imgs.length) % imgs.length);
          }
        }}
        style={{ position: "relative", display: "block", width: "100%", aspectRatio: "4 / 5", padding: "0", border: "0", borderRadius: "16px", background: "transparent", overflow: "hidden", cursor: "pointer", touchAction: "pan-y" }}
      >
        {imgs.length ? (
          imgs.map((src, i) => (
            <img key={src} src={src} alt={i === 0 ? p.name : ""} loading="lazy" style={{ position: "absolute", inset: "0", margin: "auto", width: "86%", height: "86%", objectFit: "contain", mixBlendMode: "multiply", opacity: i === shown ? 1 : 0, transition: "opacity 300ms ease" }} />
          ))
        ) : (
          <span style={{ position: "absolute", inset: "0", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ProductArt kind={p.kind} color={COLORS[p.def]} finish={FINISHES[finish]} style={{ width: "78%", height: "78%" }} />
          </span>
        )}
        {badge && (
          <span className="pbadge" style={{ position: "absolute", top: "12px", right: "12px", background: badge.bg }}>
            {badge.label}
          </span>
        )}
        {imgs.length > 1 && (
          <span className="pcard-dots" aria-hidden="true" style={{ position: "absolute", left: "0", right: "0", bottom: "14px", display: "flex", justifyContent: "center", gap: "4px" }}>
            {imgs.map((src, i) => (
              <span key={src} style={{ width: i === shown ? "18px" : "6px", height: "4px", borderRadius: "4px", background: i === shown ? "#111111" : "rgba(0,0,0,0.2)", transition: "width 200ms ease" }} />
            ))}
          </span>
        )}
        <span className="pcard-qv" aria-hidden="true">
          Quick view
        </span>
      </button>

      <div style={{ flex: "1 1 auto", background: "#FFFFFF", borderRadius: "16px", padding: "16px 12px 16px 18px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px" }}>
          <h3 className="pcard-name" style={{ margin: "0", paddingTop: "10px", fontSize: "16px", lineHeight: "1.35", fontWeight: "500", color: "#222222" }}>
            {url ? (
              <Link to={url} style={{ color: "inherit" }}>
                {p.name}
              </Link>
            ) : (
              p.name
            )}
          </h3>
          <button type="button" className="pcard-add" data-added={added || undefined} disabled={soldOut} aria-label={!devices.length ? `Choose your iPhone model for ${p.name}` : soldOut ? `${p.name} isn't available for ${modelsText(devices)}` : `Add ${p.name}${variant ? `, ${variant}` : ""} to bag${forModels}`} onClick={add} style={{ width: "44px", height: "44px", flexShrink: "0", border: "0", borderRadius: "50px", background: added ? "#111111" : "transparent", color: added ? "#FFFFFF" : soldOut ? "#BBBBBB" : "#111111", display: "flex", alignItems: "center", justifyContent: "center", cursor: soldOut ? "default" : "pointer", transition: "background-color 150ms ease, color 150ms ease, scale 200ms cubic-bezier(0.2, 0.8, 0.2, 1)" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {added ? (
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              ) : (
                <>
                  <path d="M5 8h14l-1 12H6L5 8z" />
                  <path d="M9 8V6a3 3 0 0 1 6 0v2M12 11.5v5M9.5 14h5" />
                </>
              )}
            </svg>
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "8px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "17px", fontWeight: "500", color: "#111111" }}>{inr(p.price)}</span>
          {p.mrp > p.price && <s style={{ fontSize: "14px", color: "#8A8A8A" }}>{inr(p.mrp)}</s>}
        </div>
        {colors && colors.length > 1 && (
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            {colors.map((c) => (
              <span key={c.name} title={c.name} aria-hidden="true" style={{ width: "12px", height: "12px", borderRadius: "50%", background: c.swatch, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18)" }} />
            ))}
            <span style={{ marginLeft: "3px", fontSize: "12px", color: "#666666" }}>{`${colors.length} colours`}</span>
          </div>
        )}
        {soldOutFor.length > 0 && <span style={{ fontSize: "13px", fontWeight: "500", color: "#C4281C" }}>{`Not available for ${modelsText(soldOutFor)}`}</span>}
        <span role="status" className="sr-only">
          {added ? `Added ${p.name} to bag${soldOutFor.length ? `, except ${modelsText(soldOutFor)}, which isn't available` : ""}` : ""}
        </span>
      </div>

      {quick && (
        <QuickView
          id={id}
          finish={finish}
          origin={photoBtn}
          onClose={() => {
            setQuick(false);
            photoBtn.current?.focus(); // back to the card that opened it
          }}
        />
      )}
    </article>
  );
}
