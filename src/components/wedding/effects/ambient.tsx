"use client";

import { useMemo } from "react";

const HEART =
  "M12 21s-7.5-4.6-9.6-9.3C.9 8.2 3 4.5 6.6 4.5c2.1 0 3.6 1.2 4.4 2.6.8-1.4 2.3-2.6 4.4-2.6 3.6 0 5.7 3.7 4.2 7.2C19.5 16.4 12 21 12 21z";

/**
 * Falling rose petals + tiny hearts, and soft twinkles.
 * Pure CSS keyframes on transform/opacity, composited by the GPU.
 */
export function Ambient() {
  const { petals, sparks } = useMemo(() => {
    const mobile = innerWidth < 700;
    const r = Math.random;
    return {
      petals: Array.from({ length: mobile ? 10 : 18 }, (_, i) => ({
        heart: i % 3 === 0,
        left: r() * 100,
        size: 12 + r() * 10,
        t: 14 + r() * 10,
        dl: -r() * 20,
        sw: (r() - 0.5) * 160,
        rot: 180 + r() * 360,
        o: 0.45 + r() * 0.3,
      })),
      sparks: Array.from({ length: mobile ? 20 : 32 }, (_, i) => ({
        left: r() * 100,
        top: r() * 100,
        t: 3 + r() * 4,
        dl: -r() * 6,
        c: i % 3 === 0 ? "#C8923A" : i % 3 === 1 ? "#FFFFFF" : "#F3A3B5",
      })),
    };
  }, []);

  return (
    <>
      <div aria-hidden="true" className="fx-layer z-[55]">
        {petals.map((p, i) => (
          <i
            key={i}
            className="petal"
            style={
              {
                left: `${p.left}%`,
                opacity: p.o,
                "--t": `${p.t}s`,
                "--dl": `${p.dl}s`,
                "--sw": `${p.sw}px`,
                "--rot": `${p.rot}deg`,
              } as React.CSSProperties
            }
          >
            {p.heart ? (
              <svg
                width={p.size}
                height={p.size}
                viewBox="0 0 24 24"
                fill="#E8708B"
              >
                <path d={HEART} />
              </svg>
            ) : (
              <span
                className="block rounded-[70%_0_70%_0] bg-gradient-to-br from-[#F7B6C2] to-[#D94F70]"
                style={{ width: p.size * 0.8, height: p.size }}
              />
            )}
          </i>
        ))}
      </div>
      <div aria-hidden="true" className="fx-layer z-[56]">
        {sparks.map((s, i) => (
          <i
            key={i}
            className="spark"
            style={
              {
                left: `${s.left}%`,
                top: `${s.top}%`,
                background: s.c,
                "--t": `${s.t}s`,
                "--dl": `${s.dl}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </>
  );
}
