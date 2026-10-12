import { useRef } from "react";
import { gsap, useGSAP, reducedMotion } from "../motion/gsap.js";

// Section divider that echoes the exploded stack: four hairlines that start as one
// and fan out into layers as the section scrolls in.
export default function StackRule() {
  const ref = useRef(null);
  useGSAP(
    () => {
      const lines = ref.current.children;
      if (reducedMotion()) return gsap.set(lines, { x: (i) => i * 8, y: (i) => i * 4 });
      gsap.fromTo(
        lines,
        { x: 0, y: 0 },
        { x: (i) => i * 8, y: (i) => i * 4, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "top 65%", scrub: true } },
      );
    },
    { scope: ref },
  );
  return (
    <div ref={ref} aria-hidden="true" className="relative w-20 h-4 mx-auto mb-space-lg -translate-x-3">
      {[1, 0.6, 0.35, 0.18].map((o) => (
        <span key={o} className="absolute left-0 top-0 w-14 h-px bg-primary" style={{ opacity: o }} />
      ))}
    </div>
  );
}
