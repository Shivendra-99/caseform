import { useEffect, useRef } from "react";
import { spring, project, rubberband, velocityTracker } from "./physics.js";

// Close a modal <dialog> along the path it came in on: set [data-closing], let its CSS exit
// animation play, then really close it. Reopening mid-exit (cancelExit) wins, so nothing is
// ever locked out. Without an exit animation (reduced motion) it closes at once.
export function closeWithExit(d) {
  if (!d?.open || d.hasAttribute("data-closing")) return;
  d.setAttribute("data-closing", "");
  const finish = () => {
    if (!d.hasAttribute("data-closing")) return; // reopened while leaving
    d.removeAttribute("data-closing");
    d.close();
  };
  const running = d.getAnimations();
  if (!running.length) return finish();
  Promise.all(running.map((a) => a.finished)).then(finish, () => {});
}

export const cancelExit = (d) => d?.removeAttribute("data-closing");

// Drag a sheet or drawer off screen, Apple style: it tracks the finger 1:1 after a 10px
// hysteresis, resists (rubber-bands) when pulled the wrong way, and on release projects the
// flick's momentum to decide dismiss vs. snap back, handing the finger's velocity to a spring.
// Grabbing it mid-animation picks it up where it is.
//   axis: "x" | "y"   dir: 1 (dismiss toward +axis) | -1   handleRef: where the drag starts
//   touchOnly: ignore mouse drags (so text selection and clicks stay normal on desktop)
export function useDragDismiss(panelRef, { axis = "y", dir = 1, handleRef, touchOnly = false, onDismiss }) {
  const dismissRef = useRef(onDismiss);
  useEffect(() => {
    dismissRef.current = onDismiss;
  });

  useEffect(() => {
    const panel = panelRef.current;
    const handle = handleRef?.current ?? panel;
    if (!panel || !handle) return;
    const vt = velocityTracker();
    let start = null; // { x, y, offset } while a pointer is down
    let dragging = false;
    let justDragged = false;
    let offset = 0;
    let anim = null;
    let pointer = null;

    const pos = (e) => (axis === "x" ? e.clientX : e.clientY);
    const size = () => (axis === "x" ? panel.offsetWidth : panel.offsetHeight);
    // `translate` (not `transform`) so it composes with the CSS enter/exit animations.
    const set = (v) => {
      offset = v;
      panel.style.translate = axis === "x" ? `${v}px 0` : `0 ${v}px`;
    };

    const down = (e) => {
      if ((touchOnly && e.pointerType === "mouse") || e.button !== 0) return;
      if (anim) {
        offset = anim.stop().value; // interrupt: continue from the on-screen position
        anim = null;
      }
      start = { x: e.clientX, y: e.clientY, offset };
      pointer = e.pointerId;
      dragging = false;
      vt.reset();
    };

    const move = (e) => {
      if (!start || e.pointerId !== pointer) return;
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      if (!dragging) {
        if (Math.hypot(dx, dy) < 10) return;
        const along = axis === "x" ? dx : dy;
        const across = axis === "x" ? dy : dx;
        if (Math.abs(across) > Math.abs(along)) {
          start = null; // it's a scroll, not a dismiss
          return;
        }
        dragging = true;
        handle.setPointerCapture(pointer);
        start.x = e.clientX; // start tracking from here so the panel doesn't jump by the threshold
        start.y = e.clientY;
      }
      let v = start.offset + (pos(e) - (axis === "x" ? start.x : start.y));
      if (v * dir < 0) v = rubberband(v, size());
      set(v);
      vt.add(pos(e));
    };

    const settle = (dismiss, velocity) => {
      if (dismiss) panel.setAttribute("data-dismissing", "");
      anim = spring({
        from: offset,
        to: dismiss ? dir * size() : 0,
        velocity,
        damping: dismiss ? 1 : 0.8, // a little bounce only on the way back, since a throw preceded it
        response: 0.3,
        onUpdate: set,
        onComplete: () => {
          anim = null;
          if (dismiss) dismissRef.current?.();
          panel.style.translate = "";
          panel.removeAttribute("data-dismissing");
          offset = 0;
        },
      });
    };

    const up = (e) => {
      if (!start || e.pointerId !== pointer) return;
      start = null;
      if (!dragging) return;
      dragging = false;
      justDragged = true;
      setTimeout(() => (justDragged = false));
      const v = e.type === "pointercancel" ? 0 : vt.velocity();
      const rest = offset + project(v);
      // Commit only if the throw lands past halfway and isn't heading back.
      settle(rest * dir > size() / 2 && v * dir >= 0, v);
    };

    // A drag must not also count as a click (on a link, or on the dialog's backdrop area).
    const click = (e) => {
      if (!justDragged) return;
      e.preventDefault();
      e.stopPropagation();
    };

    handle.addEventListener("pointerdown", down);
    handle.addEventListener("pointermove", move);
    handle.addEventListener("pointerup", up);
    handle.addEventListener("pointercancel", up);
    handle.addEventListener("click", click, true);
    return () => {
      anim?.stop();
      handle.removeEventListener("pointerdown", down);
      handle.removeEventListener("pointermove", move);
      handle.removeEventListener("pointerup", up);
      handle.removeEventListener("pointercancel", up);
      handle.removeEventListener("click", click, true);
    };
  }, [panelRef, handleRef, axis, dir, touchOnly]);
}
