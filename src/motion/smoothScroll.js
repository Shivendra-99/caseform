import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger, reducedMotion } from "./gsap.js";

let lenis = null;

// Lenis driven by the GSAP ticker so ScrollTrigger and smooth scroll share one clock.
export function startSmoothScroll() {
  if (lenis || reducedMotion()) return () => {};
  // Anchor targets land below the sticky header via CSS scroll-margin-top, which Lenis honours.
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

export const hasSmoothScroll = () => lenis !== null;

// Scroll to the element named by a location hash ("#lineup").
export function scrollToHash(hash, immediate = true) {
  const el = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { immediate, force: true });
  else el.scrollIntoView({ behavior: immediate ? "auto" : "smooth" });
}

// Freeze page scrolling while a modal (the menu drawer) is open.
export function lockScroll(locked) {
  document.documentElement.style.overflow = locked ? "hidden" : "";
  if (lenis && locked) lenis.stop();
  else if (lenis) lenis.start();
}
