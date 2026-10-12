import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP, DEBUG } from "../motion/gsap.js";
import { useStore, PRODUCTS, inr } from "../store.jsx";

// Signature section: the four layers of protection, pinned and pulled apart on scroll.
// Layers are CSS planes (no WebGL): each one tilts into an isometric view and the
// stack spreads along screen Y, so it stays cheap on mid-range phones.

// Front (top of the stack) to back. Spread/tight are screen-Y offsets in stage px.
const LAYERS = [
  { id: "glass", label: "OptiGlass 9H", spec: "0.33mm · Asahi AGC", spread: -180, tight: -15 },
  { id: "phone", label: null, spec: "CAD-matched ±0.05mm", spread: -60, tight: -5 },
  { id: "ring", label: "N52 MagSafe array", spec: "1,200g hold · Qi2 15W", spread: 60, tight: 5 },
  { id: "case", label: "AeroShield shell", spec: "Non-yellowing TPU", spread: 180, tight: 15 },
];

const STEPS = [
  { kicker: "The stack", title: () => "Four layers between your iPhone and the floor.", body: "Scroll to take it apart." },
  { kicker: "Layer 01 · Glass", title: () => "OptiGlass 9H", body: "Japanese Asahi AGC glass, ion-exchanged to 9H and cut 0.4mm inside the case lip so its edges never lift." },
  { kicker: "Layer 02 · Device", title: (device) => `Your ${device}`, body: "Every cutout is milled from Apple's CAD files. Camera Control and the Action Button stay exposed and crisp." },
  { kicker: "Layer 03 · Magnets", title: () => "N52 MagSafe array", body: "A neodymium ring aligned to the charging coil. Up to 1,200g of hold and full 15W Qi2 charging through the case." },
  { kicker: "Layer 04 · Shell", title: () => "AeroShield TPU", body: "Non-yellowing Bayer polymer with a 1.2mm lip over the screen and 1.5mm around the lenses." },
  { kicker: "Assembled", title: () => "Engineered to disappear.", body: null },
];

const ISO = { rotationX: 58, rotation: -42 };

function Plate({ id }) {
  if (id === "glass")
    return (
      <div className="w-[236px] h-[492px] rounded-[40px] border border-primary/20 shadow-[inset_0_0_0_2px_rgba(255,255,255,0.7)] bg-[linear-gradient(125deg,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0.2)_38%,rgba(255,255,255,0.05)_62%,rgba(255,255,255,0.6)_100%)] relative">
        <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-label-sm text-label-sm tracking-[0.3em] text-primary/30">9H</span>
      </div>
    );
  if (id === "phone")
    return (
      <div className="w-[236px] h-[492px] rounded-[40px] bg-[#2b2b2b] p-[7px] shadow-[0_24px_48px_rgba(0,0,0,0.18)]">
        <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-[radial-gradient(120%_70%_at_30%_100%,#2563EB_0%,#13203d_45%,#0b0d12_80%)]">
          <span className="absolute top-3.5 left-1/2 -translate-x-1/2 w-[72px] h-[20px] rounded-full bg-black" />
          <span className="absolute top-14 left-0 right-0 text-center font-display text-[44px] font-semibold text-white/90">9:41</span>
        </div>
      </div>
    );
  if (id === "ring")
    return (
      <div className="w-[236px] h-[492px] rounded-[40px] border border-dashed border-primary/25 relative">
        <span className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] rounded-full bg-[repeating-conic-gradient(#747878_0deg_7deg,#c8c6c5_7deg_14deg)] [mask:radial-gradient(circle,transparent_60px,#000_61px)]" />
        <span className="absolute left-1/2 top-[46%] -translate-x-1/2 translate-y-[96px] w-[10px] h-[34px] rounded-sm bg-[#747878]" />
      </div>
    );
  return (
    <div className="w-[252px] h-[508px] rounded-[46px] bg-[#e9e8e4] border border-[#d4d3cf] p-2 relative">
      <div className="w-full h-full rounded-[40px] bg-[#f4f3f0] shadow-[inset_0_2px_8px_rgba(0,0,0,0.08)]" />
      <span className="absolute top-4 right-4 w-[108px] h-[108px] rounded-[28px] bg-surface-card shadow-[inset_0_2px_6px_rgba(0,0,0,0.12)] border border-[#d4d3cf]" />
      <span className="absolute -right-[3px] top-[120px] w-[3px] h-[44px] rounded-full bg-[#c9c8c3]" />
      <span className="absolute -left-[3px] top-[110px] w-[3px] h-[28px] rounded-full bg-[#c9c8c3]" />
      <span className="absolute -left-[3px] top-[150px] w-[3px] h-[44px] rounded-full bg-[#c9c8c3]" />
    </div>
  );
}

export default function ExplodedStack() {
  const { device, addToCart } = useStore();
  const root = useRef(null);
  const hud = useRef(null);
  const [added, setAdded] = useState(false);
  const bundle = PRODUCTS.aeroshield.price + PRODUCTS.optiglass.price;

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const wraps = q("[data-layer]");
      const tilts = q("[data-tilt]");
      const spins = q("[data-spin]");
      const labels = q("[data-label]");
      const steps = q("[data-step]");
      const ticks = q("[data-tick]");
      gsap.set(tilts, { transformPerspective: 1600 });

      const mm = gsap.matchMedia();
      mm.add(
        { motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" },
        ({ conditions }) => {
          if (conditions.reduce) {
            // Static fallback: show the exploded diagram with every label, no pinning.
            gsap.set(tilts, { rotationX: ISO.rotationX });
            gsap.set(spins, { rotation: ISO.rotation });
            gsap.set(wraps, { y: (i) => LAYERS[i].spread });
            gsap.set(steps, { autoAlpha: (i) => (i === steps.length - 1 ? 1 : 0) });
            gsap.set(ticks, { scaleX: 1 });
            return;
          }

          gsap.set(steps, { autoAlpha: (i) => (i === 0 ? 1 : 0), y: (i) => (i === 0 ? 0 : 16) });
          gsap.set(labels, { autoAlpha: 0, x: -12 });
          gsap.set(ticks, { scaleX: 0 });

          const swap = (from, to, at) =>
            tl.to(steps[from], { autoAlpha: 0, y: -16, duration: 0.35 }, at).to(steps[to], { autoAlpha: 1, y: 0, duration: 0.35 }, at + 0.25);

          const tl = gsap.timeline({
            defaults: { ease: "power2.inOut", duration: 1 },
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: () => "+=" + window.innerHeight * 4,
              pin: true,
              pinSpacing: true, // parent is flex, where GSAP would default this to false
              scrub: 0.6,
              snap: { snapTo: "labelsDirectional", inertia: false, duration: { min: 0.2, max: 0.6 }, ease: "power1.inOut" },
              invalidateOnRefresh: true,
              markers: DEBUG,
              onUpdate: DEBUG ? (self) => (hud.current.textContent = `stack ${self.progress.toFixed(3)} · ${tl.currentLabel()}`) : undefined,
            },
          });

          tl.addLabel("assembled")
            .to(tilts, { rotationX: ISO.rotationX }, 0)
            .to(spins, { rotation: ISO.rotation }, 0)
            .to(wraps, { y: (i) => LAYERS[i].spread, stagger: 0.04 }, 0.15)
            .to(labels, { autoAlpha: 1, x: 0, stagger: 0.08, duration: 0.4 }, 0.8);
          swap(0, 1, 1.2);

          LAYERS.forEach((layer, i) => {
            const at = 1.4 + i * 1.2;
            const others = wraps.filter((_, j) => j !== i);
            tl.to(others, { autoAlpha: 0.22, x: 0, duration: 0.5 }, at)
              .to(wraps[i], { autoAlpha: 1, x: 16, duration: 0.5 }, at)
              .to(labels[i], { color: "#2563EB", duration: 0.3 }, at)
              .to(ticks[i], { scaleX: 1, duration: 0.5, ease: "none" }, at);
            if (i > 0) {
              tl.to(labels[i - 1], { color: "#000000", duration: 0.3 }, at);
              swap(i, i + 1, at - 0.2);
            }
            tl.addLabel(`layer-${layer.id}`, at + 0.5);
          });

          const end = 1.4 + LAYERS.length * 1.2;
          tl.to(wraps, { autoAlpha: 1, x: 0, y: (i) => LAYERS[i].tight, duration: 1, ease: "back.out(1.4)" }, end)
            .to(labels, { autoAlpha: 0, duration: 0.3 }, end)
            .addLabel("fitted", end + 1);
          swap(LAYERS.length, LAYERS.length + 1, end + 0.2);
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} data-motion-skip aria-label="What's inside the stack" className="relative w-full bg-surface-card overflow-hidden">
      <div className="relative h-screen min-h-[600px] max-w-[1360px] mx-auto px-margin md:px-margin-desktop grid grid-cols-[minmax(0,1fr)] grid-rows-[1fr_auto] lg:grid-rows-1 lg:grid-cols-12 items-center gap-space-md lg:gap-space-xl pt-[106px] pb-space-lg">
        <div className="relative h-full min-h-0 lg:order-2 lg:col-span-7 flex items-center justify-center">
          <div className="relative w-[520px] h-[640px] shrink-0 scale-[0.48] sm:scale-[0.62] lg:scale-[0.8] xl:scale-90 2xl:scale-100" aria-hidden="true">
            {LAYERS.map((layer, i) => (
              <div key={layer.id} data-layer className="absolute inset-x-0 top-1/2 h-0" style={{ zIndex: LAYERS.length - i }}>
                <div data-tilt className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                  <div data-spin>
                    <Plate id={layer.id} />
                  </div>
                </div>
                <div data-label className="absolute left-[calc(50%+170px)] -top-3 hidden sm:flex items-center gap-2 whitespace-nowrap text-primary">
                  <span className="w-12 h-px bg-current" />
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  <span className="pl-1">
                    <span className="block font-label-md text-label-md font-semibold">{layer.label ?? device}</span>
                    <span className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">{layer.spec}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative lg:order-1 lg:col-span-5 max-w-md">
          <div className="flex gap-1.5 mb-space-md" aria-hidden="true">
            {LAYERS.map((layer) => (
              <span key={layer.id} className="h-0.5 w-10 bg-primary/15 overflow-hidden">
                <span data-tick className="block h-full w-full bg-primary origin-left" />
              </span>
            ))}
          </div>
          <div className="grid">
            {STEPS.map((step, i) => (
              <div key={step.kicker} data-step className="[grid-area:1/1] self-start">
                <p className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold mb-space-xs">
                  {step.kicker}
                </p>
                {i === 0 ? (
                  <h2 className="font-display-mobile text-display-mobile md:font-display md:text-display text-primary">{step.title(device)}</h2>
                ) : (
                  <p className="font-display-mobile text-display-mobile md:font-display md:text-display text-primary">{step.title(device)}</p>
                )}
                {step.body && <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-sm">{step.body}</p>}
                {i === STEPS.length - 1 && (
                  <div className="mt-space-md flex flex-wrap items-center gap-space-sm">
                    <button
                      className="h-12 px-space-lg bg-primary text-on-primary hover:bg-neutral-800 font-label-lg text-label-lg rounded-xl font-medium inline-flex items-center gap-2 shadow-sm transition-all active:scale-[0.99]"
                      onClick={() => {
                        addToCart("aeroshield");
                        addToCart("optiglass");
                        setAdded(true);
                        setTimeout(() => setAdded(false), 2000);
                      }}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">{added ? "check" : "shopping_bag"}</span>
                      {added ? "Added to bag" : `Add the stack · ${inr(bundle)}`}
                    </button>
                    <Link to="/product" className="h-12 px-space-md inline-flex items-center gap-1 font-label-lg text-label-lg text-primary hover:text-secondary transition-colors">
                      See the AeroShield
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </Link>
                    <p className="w-full font-label-md text-label-md text-on-surface-variant">
                      Case + 9H glass for {device}. Prepaid UPI takes another 10% off at checkout.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {DEBUG && <div ref={hud} className="fixed bottom-3 left-3 z-[70] px-2 py-1 rounded bg-primary text-on-primary font-label-sm text-label-sm" />}
    </section>
  );
}
