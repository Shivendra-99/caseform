import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS, inr } from "../catalog.js";
import { reducedMotion } from "../motion/gsap.js";
import { spring, project, rubberband, velocityTracker } from "../motion/physics.js";

const ROTATE_MS = 6000;
const mono = { fontFamily: "'IBM Plex Mono', ui-monospace, monospace" };

// One slide per collection, built from the real product photos. `ids` drive the price line;
// `pics` are drawn as "cards" (lifestyle shots on a surface) or "cutout" (studio shots on white,
// multiplied into the slide colour).
const SLIDES = [
  { kicker: "New · SnapEdge Originals", title: ["Our own designs,", "five finishes."], text: "Holo, berry fade, frosted blue, carbon-weave and soft matte cases, designed by SnapEdge.", cta: "Shop Originals", ids: ["holo-feather", "berry-fade", "frost-blue", "carbon-plum", "lavender-matte"], bg: "#ECE7F3", look: "cards" },
  { kicker: "Military Anti-Fall Case", title: ["Built for", "the drop."], text: "Rugged armour corners and a raised guard around the camera.", cta: "Shop Military Case", ids: ["military"], bg: "#ECEAE5", look: "cutout" },
  { kicker: "Liquid Silicone Case", title: ["Soft to hold,", "easy to grip."], text: "Soft-touch liquid silicone with MagSafe built in.", cta: "Shop Silicone Case", ids: ["silicone"], bg: "#E5EDF4", look: "cutout" },
  { kicker: "Clear Case – Apple Original Card Shape", title: ["Show off", "your iPhone."], text: "An Apple-style clear shell with a metal camera frame and MagSafe.", cta: "Shop Clear Case", ids: ["clear-card-shape"], bg: "#EDF0F1", look: "cutout" },
].map((s) => {
  const items = s.ids.map((id) => PRODUCTS[id]);
  const price = Math.min(...items.map((p) => p.price));
  return { ...s, to: `/product?id=${s.ids[0]}`, price: (items.length > 1 ? "From " : "") + inr(price), mrp: items.length > 1 ? null : inr(items[0].mrp) };
});

// Five photo cards in a gentle arc; the outer two hide on phones (.fan-outer).
const FAN = [
  { x: -96, y: 34, r: -9, z: 1 },
  { x: -48, y: 12, r: -4.5, z: 2 },
  { x: 0, y: 0, r: 0, z: 5 },
  { x: 48, y: 12, r: 4.5, z: 2 },
  { x: 96, y: 34, r: 9, z: 1 },
];
const fanOrder = [1, 3, 0, 4, 2]; // ids index for each fan slot, centre = first product

function Media({ slide, on }) {
  const move = { transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)", transform: on ? "none" : "translateY(16px)" };
  if (slide.look === "cutout")
    return <img src={PRODUCTS[slide.ids[0]].img} alt={PRODUCTS[slide.ids[0]].name} style={{ ...move, maxWidth: "100%", maxHeight: "100%", objectFit: "contain", mixBlendMode: "multiply" }} />;
  return (
    <div style={{ ...move, position: "relative", width: "100%", height: "100%" }}>
      {FAN.map((f, slot) => {
        const p = PRODUCTS[slide.ids[fanOrder[slot]]];
        return (
          <img key={slot} src={p.img} alt={slot === 2 ? p.name : ""} className={slot === 0 || slot === 4 ? "fan-card fan-outer" : "fan-card"} style={{ position: "absolute", left: "50%", top: "50%", zIndex: f.z, width: "var(--fan-w)", aspectRatio: "1 / 1.92", objectFit: "cover", borderRadius: "18px", boxShadow: "0 24px 48px -16px rgba(30, 20, 50, 0.35)", transform: `translate(-50%, -50%) translate(calc(${f.x} * var(--fan-step)), ${f.y}px) rotate(${f.r}deg)` }} />
        );
      })}
    </div>
  );
}

// Homepage hero: a photo-led carousel of collections. Auto-advances every 6s unless the
// shopper hovers, focuses inside, presses pause, or prefers reduced motion (WCAG 2.2.2).
// On touch, the slide follows the finger (with resistance) so a swipe hints where it's going;
// on release the flick's momentum decides next/previous and a spring settles it.
export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(reducedMotion);
  const [held, setHeld] = useState(false); // hover or keyboard focus inside
  const track = useRef(null);
  const drag = useRef(null); // { x, y, dx, active } while a finger is down
  const settle = useRef(null);
  const swiped = useRef(false); // a swipe must not also click the CTA under the finger
  const vt = useRef(velocityTracker());
  const count = SLIDES.length;
  const go = (i) => setIndex((i + count) % count);
  const playing = !userPaused && !held;

  // Offset the slide by `x` px; it fades a little as it's pulled away.
  const place = (x) => {
    const el = track.current;
    const w = el.offsetWidth || 1;
    el.style.translate = x ? `${x}px 0` : "";
    el.style.opacity = x ? String(1 - Math.min(Math.abs(x) / w, 0.5)) : "";
  };

  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" || reducedMotion()) return;
    const from = settle.current ? settle.current.stop().value : 0; // grab it mid-settle
    settle.current = null;
    drag.current = { x: e.clientX, y: e.clientY, from, offset: from, active: false };
    vt.current.reset();
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.active) {
      if (Math.hypot(dx, e.clientY - d.y) < 10) return;
      if (Math.abs(e.clientY - d.y) > Math.abs(dx)) return void (drag.current = null); // vertical: page scroll
      d.active = true;
      d.x = e.clientX;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    d.raw = d.from + e.clientX - d.x;
    d.offset = rubberband(d.raw, track.current.offsetWidth);
    place(d.offset);
    vt.current.add(e.clientX);
  };
  const onPointerUp = (e) => {
    const d = drag.current;
    drag.current = null;
    if (!d?.active) return;
    swiped.current = true;
    setTimeout(() => (swiped.current = false));
    const v = e.type === "pointercancel" ? 0 : vt.current.velocity();
    const rest = d.raw + project(v, 0.99);
    const commit = Math.abs(rest) > 60 && Math.sign(rest) === Math.sign(v || rest);
    if (commit) go(index + (rest < 0 ? 1 : -1));
    settle.current = spring({
      from: d.offset,
      to: 0,
      velocity: v * 0.3, // the slide moved at roughly a third of the finger's speed under resistance
      damping: commit ? 1 : 0.8,
      response: 0.35,
      onUpdate: place,
      onComplete: () => (settle.current = null),
    });
  };
  useEffect(() => () => settle.current?.stop(), []);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % count), ROTATE_MS);
    return () => clearTimeout(t);
  }, [playing, index, count]);

  const ctrl = { width: "44px", height: "44px", border: "1px solid rgba(0,0,0,0.12)", borderRadius: "50px", background: "#FFFFFF", color: "#111111", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: "0" };

  return (
    <section id="top" data-motion-skip aria-roledescription="carousel" aria-label="Featured collections" style={{ background: "#FFFFFF" }}>
      <h1 className="sr">SnapEdge iPhone covers and 9H tempered glass</h1>
      <div className="wrap" style={{ maxWidth: "1420px", margin: "0 auto", padding: "24px 40px 8px" }}>
        <div
          className="hero-card"
          onMouseEnter={() => setHeld(true)}
          onMouseLeave={() => setHeld(false)}
          onFocus={() => setHeld(true)}
          onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHeld(false)}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onClickCapture={(e) => swiped.current && (e.preventDefault(), e.stopPropagation())}
          style={{ position: "relative", display: "grid", borderRadius: "28px", overflow: "hidden", background: SLIDES[index].bg, transition: "background-color 600ms ease", touchAction: "pan-y" }}
        >
          <div ref={track} aria-live={playing ? "off" : "polite"} style={{ display: "grid" }}>
            {SLIDES.map((s, i) => {
              const on = i === index;
              return (
                <div key={s.kicker} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${count}: ${s.kicker}`} aria-hidden={!on} inert={!on} className="hero-slide" style={{ gridArea: "1 / 1", background: s.bg, display: "grid", gridTemplateColumns: "minmax(0, 5fr) minmax(0, 7fr)", alignItems: "center", gap: "40px", minHeight: "560px", padding: "56px 64px 112px", opacity: on ? 1 : 0, visibility: on ? "visible" : "hidden", transition: on ? "opacity 450ms ease 180ms, visibility 0s" : "opacity 180ms ease, visibility 0s 180ms" }}>
                  <div className="hero-copy" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px", minWidth: "0" }}>
                    <div style={{ ...mono, fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#4A4A4A" }}>{s.kicker}</div>
                    <h2 className="hero-title" style={{ margin: "0", fontSize: "64px", lineHeight: "1", fontWeight: "800", letterSpacing: "-0.035em", color: "#111111" }}>
                      {s.title[0]}
                      <br />
                      {s.title[1]}
                    </h2>
                    <p className="hero-text" style={{ margin: "0", maxWidth: "420px", fontSize: "18px", lineHeight: "1.55", color: "#3A3A3A" }}>{s.text}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap", marginTop: "4px" }}>
                      <Link to={s.to} className="btn-solid" style={{ height: "52px", padding: "0 28px", borderRadius: "50px", background: "#000000", color: "#FFFFFF", display: "inline-flex", alignItems: "center", gap: "10px", fontWeight: "700", fontSize: "15px" }}>
                        {s.cta}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </Link>
                      <span style={{ fontSize: "15px", color: "#3A3A3A" }}>
                        <strong style={{ color: "#111111", fontSize: "17px" }}>{s.price}</strong>
                        {s.mrp && <s style={{ marginLeft: "8px" }}>{s.mrp}</s>}
                      </span>
                    </div>
                  </div>
                  <div className="hero-media" style={{ height: "420px", display: "flex", alignItems: "center", justifyContent: "center", minWidth: "0" }}>
                    <Media slide={s} on={on} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hero-ctrl" style={{ position: "absolute", left: "64px", right: "64px", bottom: "28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {SLIDES.map((s, i) => (
                <button key={s.kicker} type="button" aria-label={`Show slide ${i + 1}: ${s.kicker}`} aria-current={i === index ? "true" : undefined} onClick={() => go(i)} style={{ width: i === index ? "44px" : "24px", height: "44px", padding: "0", border: "0", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "width 300ms ease, scale 200ms cubic-bezier(0.2, 0.8, 0.2, 1)" }}>
                  <span style={{ width: i === index ? "28px" : "8px", height: "8px", borderRadius: "8px", background: i === index ? "#111111" : "rgba(0,0,0,0.25)", transition: "width 300ms ease, background-color 300ms ease" }} />
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button type="button" aria-label={userPaused ? "Play slideshow" : "Pause slideshow"} onClick={() => setUserPaused((p) => !p)} style={ctrl}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  {userPaused ? <path d="M8 5.5v13l11-6.5z" /> : <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />}
                </svg>
              </button>
              <button type="button" aria-label="Previous slide" onClick={() => go(index - 1)} style={ctrl}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M19 12H5M11 6l-6 6 6 6" />
                </svg>
              </button>
              <button type="button" aria-label="Next slide" onClick={() => go(index + 1)} style={ctrl}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
