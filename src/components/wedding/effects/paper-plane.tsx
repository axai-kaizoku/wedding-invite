"use client";

import { useEffect, useRef } from "react";

/**
 * Paper plane that rides a smooth S-curve as you scroll.
 * Lightweight version: the curve is computed analytically (no SVG path
 * sampling, no full-page SVG) and only one fixed element is transformed.
 */
export function PaperPlane() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let start = 0;
    let span = 1;
    let W = innerWidth;
    let ticking = false;

    const measure = () => {
      W = document.documentElement.clientWidth;
      start = document.getElementById("hero")?.offsetHeight ?? innerHeight;
      span = Math.max(
        1,
        document.documentElement.scrollHeight - innerHeight - start
      );
    };

    // x oscillates between 10% and 90% of the width
    const xAt = (p: number) => W * (0.5 - 0.4 * Math.cos(p * Math.PI * 7));

    const update = () => {
      ticking = false;
      const p = (scrollY - start * 0.6) / span;
      if (p <= 0 || p >= 1) {
        el.classList.remove("on");
        return;
      }
      el.classList.add("on");
      const x = xAt(p);
      const dx = xAt(p + 0.002) - x;
      const ang = (Math.atan2(span * 0.002 * 0.15, dx) * 180) / Math.PI;
      el.style.transform = `translate3d(${x - 34}px,0,0) rotate(${ang}deg)`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onResize, { passive: true });
    return () => {
      ro.disconnect();
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="plane">
      <svg width="68" height="34" viewBox="-48 -17 82 34">
        <path
          d="M34 0L-30 -14L-8 0L-30 14Z"
          fill="#FFF"
          stroke="#D94F70"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M-8 0L8 -3L8 3Z" fill="#D94F70" />
        <path d="M-46 4c-3-4 3-7 5-3c2-4 8 0 5 4l-5 5z" fill="#E8708B" />
      </svg>
    </div>
  );
}
