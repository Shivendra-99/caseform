import { useEffect, useId, useRef, useState } from "react";
import { inr } from "../catalog.js";

// Price range filter (Collection toolbar): a button that opens a panel with a two-handle slider,
// Min / Max boxes and presets. min / max are rupees or null (no bound); results update live.
// lo..hi is the slider's span; a bound pushed to either end means "no bound".
export default function PriceFilter({ lo, hi, step = 100, min, max, presets, count, onChange }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({}); // what's being typed in Min / Max, until Enter or leaving the box
  const id = useId();
  const root = useRef(null);
  const btn = useRef(null);
  const a = min ?? lo;
  const b = max ?? hi;
  const active = min != null || max != null;
  const label = !active ? "Price" : min == null ? `Under ${inr(b)}` : max == null ? `${inr(a)}+` : `${inr(a)} – ${inr(b)}`;

  const set = (nextMin, nextMax) => onChange({ min: nextMin <= lo ? null : nextMin, max: nextMax >= hi ? null : nextMax });
  const close = () => {
    setOpen(false);
    btn.current.focus();
  };
  // Typed values apply on Enter / leaving the box, clamped to the span and kept in order.
  const commit = (which) => {
    const raw = draft[which];
    if (raw === undefined) return;
    setDraft((d) => ({ ...d, [which]: undefined }));
    const v = Math.round(Number(raw));
    if (raw === "" || !Number.isFinite(v)) return which === "min" ? set(lo, b) : set(a, hi);
    const c = Math.min(Math.max(v, lo), hi);
    return which === "min" ? set(Math.min(c, b), b) : set(a, Math.max(c, a));
  };

  useEffect(() => {
    if (!open) return;
    const away = (e) => !root.current.contains(e.target) && setOpen(false);
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [open]);

  const pct = (v) => ((v - lo) / (hi - lo)) * 100;
  const field = { width: "100%", height: "44px", padding: "0 12px 0 28px", borderRadius: "12px", border: "1px solid #DDDDDD", background: "#FFFFFF", fontFamily: "inherit", fontSize: "16px", color: "#111111" };

  return (
    <div ref={root} style={{ position: "relative" }} onKeyDown={(e) => e.key === "Escape" && open && (e.stopPropagation(), close())}>
      <button ref={btn} type="button" aria-expanded={open} aria-controls={`${id}-panel`} onClick={() => setOpen((o) => !o)} style={{ height: "40px", padding: "0 14px 0 16px", borderRadius: "50px", border: `1px solid ${active ? "#111111" : "#DDDDDD"}`, background: active ? "#F2F2F2" : "#FFFFFF", color: "#111111", fontFamily: "inherit", fontSize: "14px", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "8px", cursor: "pointer", whiteSpace: "nowrap" }}>
        {label}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 150ms ease-out" }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div id={`${id}-panel`} role="group" aria-label="Price range" className="price-panel" style={{ position: "absolute", zIndex: "30", top: "calc(100% + 8px)", width: "min(320px, calc(100vw - 32px))", padding: "18px", background: "#FFFFFF", border: "1px solid #E2E2E2", borderRadius: "20px", boxShadow: "0 16px 40px rgba(0,0,0,0.12)", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="range2">
            <span aria-hidden="true" style={{ position: "absolute", left: "0", right: "0", top: "12px", height: "4px", borderRadius: "4px", background: "#E6E6E6" }} />
            <span aria-hidden="true" style={{ position: "absolute", top: "12px", height: "4px", borderRadius: "4px", background: "#111111", left: `${pct(a)}%`, width: `${pct(b) - pct(a)}%` }} />
            <input type="range" aria-label="Minimum price" min={lo} max={hi} step={step} value={a} aria-valuetext={inr(a)} onChange={(e) => set(Math.min(Number(e.target.value), b), b)} />
            <input type="range" aria-label="Maximum price" min={lo} max={hi} step={step} value={b} aria-valuetext={inr(b)} onChange={(e) => set(a, Math.max(Number(e.target.value), a))} />
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", gap: "10px" }}>
            {[
              ["min", "Min", a],
              ["max", "Max", b],
            ].map(([which, text, v]) => (
              <label key={which} style={{ flex: "1 1 0", display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px", fontWeight: "600", color: "#666666" }}>
                {text}
                <span style={{ position: "relative", display: "block" }}>
                  <span aria-hidden="true" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "15px", color: "#666666" }}>
                    ₹
                  </span>
                  <input type="number" inputMode="numeric" min={lo} max={hi} value={draft[which] ?? v} onChange={(e) => setDraft((d) => ({ ...d, [which]: e.target.value }))} onBlur={() => commit(which)} onKeyDown={(e) => e.key === "Enter" && commit(which)} style={field} />
                </span>
              </label>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {presets.map((pr) => {
              const on = (pr.min ?? null) === min && (pr.max ?? null) === max;
              return (
                <button key={pr.label} type="button" aria-pressed={on} onClick={() => onChange({ min: pr.min ?? null, max: pr.max ?? null })} style={{ height: "34px", padding: "0 12px", borderRadius: "40px", border: `1px solid ${on ? "#111111" : "#DDDDDD"}`, background: on ? "#111111" : "#FFFFFF", color: on ? "#FFFFFF" : "#222222", fontFamily: "inherit", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>
                  {pr.label}
                </button>
              );
            })}
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", borderTop: "1px solid #EEEEEE", paddingTop: "14px" }}>
            <button type="button" onClick={() => onChange({ min: null, max: null })} disabled={!active} style={{ height: "40px", padding: "0 4px", border: "0", background: "transparent", color: active ? "#111111" : "#AAAAAA", fontFamily: "inherit", fontSize: "14px", fontWeight: "600", textDecoration: "underline", textUnderlineOffset: "3px", cursor: active ? "pointer" : "default" }}>
              Clear
            </button>
            <button type="button" className="btn-solid" onClick={close} style={{ height: "40px", padding: "0 18px", border: "0", borderRadius: "50px", background: "#111111", color: "#FFFFFF", fontFamily: "inherit", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
              {`Show ${count} ${count === 1 ? "product" : "products"}`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
