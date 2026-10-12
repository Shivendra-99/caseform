import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger, reducedMotion } from "./gsap.js";

let lenis = null;

// Lenis driven by the GSAP ticker so ScrollTrigger and smooth scroll share one clock.
export function startSmoothScroll() {
  if (lenis || reducedMotion()) return () => {};
  lenis = new Lenis({ anchors: true });
  lenis.on("scroll", ScrollTrigger.update);
  const tick = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    gsap.ticker.lagSmoothing(500, 33);
    lenis.destroy();
    lenis = null;
  };
}

export const scrollToTop = () =>
  lenis ? lenis.scrollTo(0, { immediate: true, force: true }) : window.scrollTo(0, 0);
