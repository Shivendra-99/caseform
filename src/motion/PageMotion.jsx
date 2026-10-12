import { gsap, ScrollTrigger, SplitText, useGSAP, DURATION, reducedMotion } from "./gsap.js";

let firstLoad = true;

// Site-wide reveals for the current route. Rendered after <Outlet /> and keyed by
// pathname, so it runs once the page has committed and reverts when the page leaves.
//  - h1/h2 with plain text (or opted in with data-split) reveal line by line.
//  - <article> cards and children of [data-reveal] fade up in batches.
//  - Anything inside [data-motion-skip] owns its own motion.
export default function PageMotion() {
  useGSAP((context, contextSafe) => {
    if (reducedMotion()) return;
    const main = document.querySelector("main");
    if (!main) return;

    const free = (el) => !el.closest("[data-motion-skip], [role=dialog], dialog");
    // SplitText rewrites the heading's DOM, so only split text React will never update.
    const headings = gsap.utils
      .toArray("h1, h2", main)
      .filter((el) => free(el) && (el.hasAttribute("data-split") || el.children.length === 0));
    const cards = gsap.utils.toArray("article, [data-reveal] > *", main).filter(free);

    // Hide synchronously (before paint) so nothing flashes, then build the heavier stuff later.
    gsap.set(headings, { autoAlpha: 0 });
    gsap.set(cards, { autoAlpha: 0, y: 24 });

    const reveal = contextSafe(() => {
      firstLoad = false;
      headings.forEach((el) => {
        gsap.set(el, { autoAlpha: 1 });
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 105,
              stagger: 0.08,
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            }),
        });
      });
      ScrollTrigger.batch(cards, {
        start: "top 92%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, stagger: 0.06, overwrite: true }),
      });
    });

    if (firstLoad) {
      // First paint stays instant: no page fade, reveals start next frame.
      const id = requestAnimationFrame(reveal);
      return () => cancelAnimationFrame(id);
    }
    // Route change: the page-enter tween is the priority animation; instantiate
    // SplitText/ScrollTriggers only after it so their setup doesn't spike the same frames.
    gsap.from(main, { autoAlpha: 0, y: 12, duration: DURATION * 0.6, clearProps: "opacity,visibility,transform", onComplete: reveal });
  });
  return null;
}
