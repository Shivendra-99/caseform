// Gesture physics after Apple's "Designing Fluid Interfaces" (WWDC 2018). Springs are tuned with a
// damping ratio (1 = no overshoot, < 1 = bounce) and a response in seconds, not mass/stiffness.
// A spring starts from the live on-screen value and takes the finger's velocity, so motion can
// be grabbed mid-flight and redirected without a jump.

// Animate a number from `from` to `to`. `velocity` is in units per second (px/s for drags).
// Returns { stop() } which halts it and hands back the live value and velocity.
export function spring({ from, to, velocity = 0, damping = 1, response = 0.35, onUpdate, onComplete }) {
  const stiffness = ((2 * Math.PI) / response) ** 2;
  const friction = (4 * Math.PI * damping) / response;
  let x = from;
  let v = velocity;
  let last = performance.now();
  let raf = requestAnimationFrame(step);
  let running = true;

  function step(now) {
    const dt = Math.min((now - last) / 1000, 1 / 30); // a dropped frame must not fling the value
    last = now;
    const n = Math.ceil(dt / (1 / 240)); // fixed sub-steps keep stiff springs stable
    const h = dt / n;
    for (let i = 0; i < n; i++) {
      v += (-stiffness * (x - to) - friction * v) * h;
      x += v * h;
    }
    if (Math.abs(v) < 1 && Math.abs(x - to) < 0.5) {
      running = false;
      onUpdate(to, 0);
      onComplete?.();
      return;
    }
    onUpdate(x, v);
    raf = requestAnimationFrame(step);
  }

  return {
    stop() {
      if (running) cancelAnimationFrame(raf);
      running = false;
      return { value: x, velocity: v };
    },
  };
}

// Where a flick would come to rest, using the same exponential decay as scroll deceleration.
// 0.998 feels like a normal scroll; 0.99 is snappier.
export const project = (velocity, rate = 0.998) => ((velocity / 1000) * rate) / (1 - rate);

// Past a boundary, follow less and less the further the drag goes (real things slow before they stop).
export const rubberband = (overshoot, dimension, constant = 0.55) =>
  (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));

// Release velocity from the last ~100ms of pointer samples. Holding still before letting go reads as 0.
export function velocityTracker() {
  let samples = [];
  return {
    reset() {
      samples = [];
    },
    add(pos) {
      const t = performance.now();
      samples.push({ pos, t });
      samples = samples.filter((s) => t - s.t < 100);
    },
    velocity() {
      const now = performance.now();
      const recent = samples.filter((s) => now - s.t < 100);
      if (recent.length < 2) return 0;
      const a = recent[0];
      const b = recent[recent.length - 1];
      return b.t > a.t ? ((b.pos - a.pos) / (b.t - a.t)) * 1000 : 0;
    },
  };
}
