"use client";

import { useEffect, useRef } from "react";

/**
 * Desktop: a soft rose glow follows the pointer (one transformed div, eased in rAF,
 * sleeps when settled). Touch: a ripple + a little floating heart where you tap.
 */
export function LoveCursor() {
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const touch = matchMedia("(hover: none)").matches;

    if (touch) {
      const onDown = (e: PointerEvent) => {
        if ((e.target as HTMLElement).closest("button,a")) return;
        const r = document.createElement("i");
        r.className = "ripple";
        r.style.left = `${e.clientX}px`;
        r.style.top = `${e.clientY}px`;
        const h = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        h.setAttribute("viewBox", "0 0 24 24");
        h.setAttribute("class", "tap-heart");
        h.style.left = `${e.clientX}px`;
        h.style.top = `${e.clientY}px`;
        h.style.setProperty("--sw", `${(Math.random() - 0.5) * 40}px`);
        h.innerHTML =
          '<path fill="currentColor" d="M12 21s-7.5-4.6-9.6-9.3C.9 8.2 3 4.5 6.6 4.5c2.1 0 3.6 1.2 4.4 2.6.8-1.4 2.3-2.6 4.4-2.6 3.6 0 5.7 3.7 4.2 7.2C19.5 16.4 12 21 12 21z"/>';
        document.body.append(r, h);
        setTimeout(() => {
          r.remove();
          h.remove();
        }, 1150);
      };
      addEventListener("pointerdown", onDown, { passive: true });
      return () => removeEventListener("pointerdown", onDown);
    }

    const el = glow.current;
    if (!el) return;
    let tx = innerWidth / 2;
    let ty = innerHeight / 2;
    let x = tx;
    let y = ty;
    let raf = 0;
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x}px,${y}px,0)`;
      raf =
        Math.abs(tx - x) + Math.abs(ty - y) > 0.5
          ? requestAnimationFrame(loop)
          : 0;
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.classList.add("on");
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onLeave = () => el.classList.remove("on");
    addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <div ref={glow} aria-hidden="true" className="glow max-md:hidden" />;
}
