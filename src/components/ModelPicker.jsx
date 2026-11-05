import { useEffect, useId, useRef, useState } from "react";
import { MODEL_SERIES, modelsText } from "../catalog.js";

const mono = { fontFamily: "'IBM Plex Mono', ui-monospace, monospace" };
const icon = { position: "absolute", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" };

// The one iPhone model picker used on every page: search plus multi-select, grouped by series.
// value: selected models; onChange gets the new list. The last ticked model can't be unticked.
// labelledBy / describedBy: ids of the visible label and helper text placed next to it.
// inline: show the search + list in place (no trigger button), e.g. as a menu drawer sub-view;
// its Done button calls onDone. compact: a 44px form-field trigger for dense layouts (Product buy box).
export default function ModelPicker({ value, onChange, labelledBy, describedBy, inline = false, onDone, compact = false }) {
  const [opened, setOpen] = useState(false);
  const open = inline || opened;
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0); // index into `shown`, highlighted for the keyboard
  const id = useId();
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const panelRef = useRef(null);
  const searchRef = useRef(null);

  // "15 pro" matches "iPhone 15 Pro"; every word must appear.
  const terms = query.toLowerCase().replace(/iphone/g, " ").split(/\s+/).filter(Boolean);
  const groups = MODEL_SERIES.map((g) => ({ ...g, models: g.models.filter((m) => terms.every((t) => m.toLowerCase().includes(t))) })).filter((g) => g.models.length);
  const shown = groups.flatMap((g) => g.models);
  const optId = (i) => `${id}-o${i}`;

  const close = (refocus) => {
    setOpen(false);
    setQuery("");
    setActive(0);
    if (inline) onDone?.();
    else if (refocus) buttonRef.current.focus();
  };
  const toggle = (m) => {
    if (!value.includes(m)) onChange([...value, m]);
    else if (value.length > 1) onChange(value.filter((x) => x !== m));
  };

  // Open: focus the search box, or on touch screens the panel, so the keyboard doesn't cover the list.
  // A press outside closes it.
  useEffect(() => {
    if (!open) return;
    (matchMedia("(pointer: fine)").matches ? searchRef : panelRef).current.focus();
    if (inline) return;
    const away = (e) => {
      if (rootRef.current.contains(e.target)) return;
      setOpen(false);
      setQuery("");
      setActive(0);
    };
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [open, inline]);

  useEffect(() => {
    if (open) document.getElementById(`${id}-o${active}`)?.scrollIntoView({ block: "nearest" });
  }, [open, active, id]);

  const onSearchKey = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.min(Math.max(a + (e.key === "ArrowDown" ? 1 : -1), 0), shown.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (shown[active]) toggle(shown[active]);
    }
  };

  return (
    <div ref={rootRef} className="se-root se-font" style={{ position: "relative", width: "100%" }} onBlur={(e) => !inline && open && e.relatedTarget && !rootRef.current.contains(e.relatedTarget) && close(false)}>
      {!inline && (
      <>
      <span id={`${id}-all`} hidden>
        {modelsText(value)}
      </span>
      <button ref={buttonRef} type="button" className={compact ? "model-select is-compact" : "model-select"} aria-haspopup="listbox" aria-expanded={open} aria-controls={open ? `${id}-panel` : undefined} aria-labelledby={`${labelledBy} ${id}-all`} aria-describedby={describedBy} onClick={() => (open ? close(true) : setOpen(true))} style={{ position: "relative", display: "block", width: "100%", textAlign: "left", cursor: "pointer", background: "#FFFFFF", color: "#222222", fontFamily: "inherit", ...(compact ? { height: "44px", padding: "0 40px 0 42px", borderRadius: "12px", border: "1px solid #CFCFCF", fontSize: "15px", fontWeight: "500" } : { height: "56px", padding: "0 52px 0 54px", borderRadius: "50px", border: "1.5px solid #222222", fontSize: "16px", fontWeight: "700" }) }}>
        <svg width={compact ? 18 : 20} height={compact ? 18 : 20} viewBox="0 0 24 24" fill="none" stroke="#222222" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ ...icon, left: compact ? "14px" : "22px" }}>
          <rect x="6" y="2.5" width="12" height="19" rx="3" />
          <path d="M10.5 5.5h3" />
        </svg>
        <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {value[0]}
          {value.length > 1 && <span style={{ color: "#666666", fontWeight: compact ? "400" : "600" }}>{` +${value.length - 1} more`}</span>}
        </span>
        <svg width={compact ? 16 : 18} height={compact ? 16 : 18} viewBox="0 0 24 24" fill="none" stroke="#222222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ ...icon, right: compact ? "14px" : "22px", transform: `translateY(-50%) rotate(${open ? 180 : 0}deg)`, transition: "transform 150ms ease-out" }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      </>
      )}

      {open && (
        <div ref={panelRef} id={`${id}-panel`} tabIndex={-1} onKeyDown={(e) => !inline && e.key === "Escape" && (e.preventDefault(), close(true))} style={inline ? { outline: "none" } : { position: "absolute", zIndex: 40, top: "calc(100% + 8px)", left: "0", width: "100%", minWidth: "288px", background: "#FFFFFF", border: "1.5px solid #222222", borderRadius: "20px", boxShadow: "0 16px 40px rgba(0,0,0,0.12)", overflow: "hidden", outline: "none" }}>
          <div style={{ position: "relative", padding: "12px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" aria-hidden="true" style={{ ...icon, left: "28px" }}>
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input ref={searchRef} type="search" className="model-search" role="combobox" aria-label="Search iPhone models" aria-expanded="true" aria-controls={`${id}-list`} aria-autocomplete="list" aria-activedescendant={shown[active] ? optId(active) : undefined} placeholder="Search, e.g. 15 Pro" autoComplete="off" value={query} onChange={(e) => (setQuery(e.target.value), setActive(0))} onKeyDown={onSearchKey} style={{ width: "100%", height: "44px", padding: "0 16px 0 42px", borderRadius: "50px", border: "1px solid #DDDDDD", background: "#F4F4F4", fontFamily: "inherit", fontSize: "16px", color: "#222222" }} />
          </div>
          {/* mousedown is cancelled so clicking an option keeps focus in the search box */}
          <div id={`${id}-list`} role="listbox" aria-multiselectable="true" aria-label="iPhone models" data-lenis-prevent onMouseDown={(e) => e.preventDefault()} style={{ maxHeight: inline ? "none" : "300px", overflowY: "auto", padding: "0 6px 8px" }}>
            {groups.map((g) => (
              <div key={g.name} role="group" aria-labelledby={`${id}-g${g.gen}`}>
                <div id={`${id}-g${g.gen}`} style={{ ...mono, padding: "10px 12px 4px", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#666666" }}>
                  {g.name}
                </div>
                {g.models.map((m) => {
                  const i = shown.indexOf(m);
                  const on = value.includes(m);
                  return (
                    <div key={m} id={optId(i)} role="option" aria-selected={on} onClick={() => toggle(m)} onMouseMove={() => setActive(i)} style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "44px", padding: "0 12px", borderRadius: "12px", background: i === active ? "#F4F4F4" : "transparent", fontSize: "15px", fontWeight: on ? "700" : "500", color: "#222222", cursor: "pointer" }}>
                      <span aria-hidden="true" style={{ width: "20px", height: "20px", flexShrink: "0", borderRadius: "6px", border: "1.5px solid #222222", background: on ? "#000000" : "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {on && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12.5l4.5 4.5L19 7.5" />
                          </svg>
                        )}
                      </span>
                      {m}
                    </div>
                  );
                })}
              </div>
            ))}
            {!shown.length && (
              <p role="status" style={{ margin: "0", padding: "16px 12px", fontSize: "14px", color: "#666666" }}>
                {`No model matches "${query}". Try a number like 15.`}
              </p>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "12px 12px 12px 18px", borderTop: "1px solid #EEEEEE" }}>
            <span aria-live="polite" style={{ fontSize: "13px", color: "#666666" }}>
              {value.length === 1 ? "Tick more to shop for several iPhones" : `${value.length} models selected`}
            </span>
            <button type="button" className="btn-solid" onClick={() => close(true)} style={{ height: "40px", padding: "0 20px", border: "0", borderRadius: "50px", background: "#000000", color: "#FFFFFF", fontFamily: "inherit", fontSize: "14px", fontWeight: "700", cursor: "pointer", flexShrink: "0" }}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
