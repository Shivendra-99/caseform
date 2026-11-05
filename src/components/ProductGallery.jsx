import { COLORS, FINISHES } from "../catalog.js";
import ProductArt from "./ProductArt.jsx";

const round = { width: "44px", height: "44px", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "50px", background: "#FFFFFF", color: "#111111", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" };

export const photosOf = (p) => p.imgs ?? (p.img ? [p.img] : []);

// Product photos: the big picture with prev/next and a counter, plus a thumbnail strip when there's
// more than one. Products without a photo show their drawing. Controlled: the parent owns `i`, so it
// can also step with the arrow keys (Quick view, Product page).
export default function ProductGallery({ p, finish = p.def, i, setI }) {
  const imgs = photosOf(p);
  const step = (d) => setI((x) => (x + d + imgs.length) % imgs.length);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", minWidth: "0" }}>
      <div style={{ position: "relative", aspectRatio: "4 / 5", background: "#F6F6F6", borderRadius: "20px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {imgs.length ? (
          imgs.map((src, k) => (
            <img key={src} src={src} alt={k === i ? `${p.name}, photo ${k + 1} of ${imgs.length}` : ""} aria-hidden={k !== i} style={{ position: "absolute", inset: "0", margin: "auto", width: "86%", height: "86%", objectFit: "contain", mixBlendMode: "multiply", opacity: k === i ? 1 : 0, transition: "opacity 250ms ease" }} />
          ))
        ) : (
          <ProductArt kind={p.kind} color={COLORS[p.def]} finish={FINISHES[finish]} style={{ width: "78%", height: "78%" }} />
        )}
        {imgs.length > 1 && (
          <>
            <button type="button" aria-label="Previous photo" onClick={() => step(-1)} style={{ ...round, position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button type="button" aria-label="Next photo" onClick={() => step(1)} style={{ ...round, position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
            <span aria-live="polite" style={{ position: "absolute", bottom: "14px", left: "50%", transform: "translateX(-50%)", padding: "4px 10px", borderRadius: "40px", background: "rgba(255,255,255,0.9)", fontSize: "12px", fontWeight: "600", color: "#111111" }}>
              {`${i + 1} / ${imgs.length}`}
            </span>
          </>
        )}
      </div>
      {imgs.length > 1 && (
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "2px" }}>
          {imgs.map((src, k) => (
            <button key={src} type="button" aria-label={`Show photo ${k + 1}`} aria-current={k === i ? "true" : undefined} onClick={() => setI(k)} style={{ width: "64px", height: "76px", flexShrink: "0", padding: "0", border: `2px solid ${k === i ? "#111111" : "transparent"}`, borderRadius: "12px", background: "#F6F6F6", overflow: "hidden", cursor: "pointer" }}>
              <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "multiply" }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
