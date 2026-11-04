"use client";

import { useEffect, useRef, useState } from "react";
import { heartBurst } from "@/lib/confetti";
import { haptics } from "@/lib/haptics";
import { OPEN_EVENT } from "@/lib/opened";
import { wedding } from "@/lib/wedding";

/** gold + blush + ivory burst so it pops against the emerald backdrop */
const BURST = ["#E9C46A", "#F6DCC6", "#FFFFFF", "#C8923A", "#F2B8A2"];

/**
 * Sealed envelope, server-rendered so it is the first paint.
 *
 * Look: deep emerald velvet backdrop, ivory envelope with gold foil edges and a
 * mandala-pressed flap, glowing gold wax seal, drifting gold motes.
 * Interaction:
 *  - the envelope tilts toward the pointer / finger (one rAF, transform only)
 *  - press & hold the seal: a gold ring fills (~0.65s) then it opens.
 *    A quick tap, Enter or Space also opens, so it never blocks anyone.
 *  - open: seal pops, flap folds back, card rises with the names,
 *    gold heart burst, soft flash, fade into the hero (~1.8s).
 * All motion is CSS (transform/opacity); JS only toggles classes / two CSS vars.
 */
export function Envelope() {
  const [opening, setOpening] = useState(false);
  const [holding, setHolding] = useState(false);
  const seal = useRef<HTMLButtonElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const holdTimer = useRef<ReturnType<typeof setTimeout>>();
  const openedRef = useRef(false);

  useEffect(() => {
    seal.current?.focus({ preventScroll: true });
    const root = document.getElementById("envelope");
    // iOS Safari ignores overflow:hidden for touch scrolling — block swipes on the overlay
    const block = (e: TouchEvent) => e.preventDefault();
    root?.addEventListener("touchmove", block, { passive: false });

    // gentle 3D tilt toward the pointer, eased in rAF, sleeps when settled
    const el = tilt.current;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let tx = 0,
      ty = 0,
      x = 0,
      y = 0,
      raf = 0;
    const loop = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el?.style.setProperty("--rx", `${(-y * 8).toFixed(2)}deg`);
      el?.style.setProperty("--ry", `${(x * 10).toFixed(2)}deg`);
      raf =
        Math.abs(tx - x) + Math.abs(ty - y) > 0.002
          ? requestAnimationFrame(loop)
          : 0;
    };
    const onMove = (e: PointerEvent) => {
      if (openedRef.current) return;
      tx = (e.clientX / innerWidth - 0.5) * 2;
      ty = (e.clientY / innerHeight - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    if (!reduce && root)
      root.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      root?.removeEventListener("touchmove", block);
      root?.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      clearTimeout(holdTimer.current);
    };
  }, []);

  const finish = () => {
    // land exactly on the hero, whatever happened behind the envelope
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.classList.add("opened");
    dispatchEvent(new Event(OPEN_EVENT));
  };

  const open = () => {
    if (openedRef.current) return;
    openedRef.current = true;
    clearTimeout(holdTimer.current);
    setHolding(false);
    haptics.open();
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return finish();
    tilt.current?.style.setProperty("--rx", "0deg");
    tilt.current?.style.setProperty("--ry", "0deg");
    setOpening(true);
    const r = seal.current?.getBoundingClientRect();
    setTimeout(() => {
      if (r)
        void heartBurst(
          {
            x: (r.left + r.width / 2) / innerWidth,
            y: (r.top + r.height / 2) / innerHeight,
          },
          90,
          BURST
        );
    }, 450);
    setTimeout(finish, 1800);
  };

  // press & hold → ring fills, then opens; releasing early still counts as a tap
  const startHold = () => {
    if (openedRef.current) return;
    haptics.tick();
    setHolding(true);
    holdTimer.current = setTimeout(open, 650);
  };
  const endHold = () => {
    if (!holding || openedRef.current) return;
    clearTimeout(holdTimer.current);
    open();
  };

  return (
    <div
      id="envelope"
      className={`env-stage fixed inset-0 z-[100] grid touch-none place-items-center overflow-hidden overscroll-none ${opening ? "opening" : ""}`}
    >
      {/* soft light pool + drifting gold motes */}
      <div
        className="env-glow pointer-events-none absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {MOTES.map((m, i) => (
          <i
            key={i}
            className="env-mote"
            style={
              {
                left: `${m[0]}%`,
                top: `${m[1]}%`,
                "--d": `${m[2]}s`,
                "--s": m[3],
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <p className="env-text absolute top-[calc(44px+env(safe-area-inset-top))] font-serif text-xl italic text-[#F3E3BF]">
        {wedding.blessing}
      </p>
      <p className="env-text absolute top-[calc(82px+env(safe-area-inset-top))] text-[13px] uppercase tracking-[0.35em] text-[#E9C46A]">
        You&apos;re invited
      </p>

      <div ref={tilt} className="env-tilt">
        <div className="env env-in relative aspect-[3/2] w-[min(86vw,380px)]">
          {/* back */}
          <div className="absolute inset-0 rounded-xl bg-[#E9DDC2] shadow-[0_30px_60px_-20px_rgba(0,0,0,.55)]" />
          {/* card rising out */}
          <div className="env-card absolute inset-x-[6%] top-[6%] z-[2] h-[86%] rounded-lg bg-[#FFFDF8] px-3 pt-4 text-center shadow-[inset_0_0_0_1px_#E9C46A55]">
            <p className="text-[11px] uppercase tracking-[0.3em] text-moss">
              {wedding.subtitle}
            </p>
            <p className="mt-1 font-serif text-xl text-ink">
              {wedding.names[0]}{" "}
              <span className="font-script text-2xl text-gold">&amp;</span>{" "}
              {wedding.names[1]}
            </p>
            <p className="mt-0.5 text-[12px] tracking-[0.2em] text-moss">
              {wedding.dateLabel}
            </p>
          </div>
          {/* front pocket with gold foil edges */}
          <div className="env-pocket absolute inset-0 z-[3] rounded-xl [clip-path:polygon(0_0,50%_56%,100%_0,100%_100%,0_100%)]" />
          <svg
            className="pointer-events-none absolute inset-0 z-[3] h-full w-full"
            viewBox="0 0 300 200"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="foil" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#B8862F" />
                <stop offset=".5" stopColor="#F3D88A" />
                <stop offset="1" stopColor="#B8862F" />
              </linearGradient>
            </defs>
            <path
              d="M2 2 L150 112 L298 2"
              fill="none"
              stroke="url(#foil)"
              strokeWidth="1.6"
            />
            <rect
              x="6"
              y="6"
              width="288"
              height="188"
              rx="8"
              fill="none"
              stroke="url(#foil)"
              strokeWidth="1"
              strokeDasharray="2 4"
              opacity=".7"
            />
          </svg>
          {/* flap: pressed mandala + moving foil shine */}
          <div className="env-flap absolute inset-x-0 top-0 h-[60%] overflow-hidden rounded-t-xl [backface-visibility:hidden] [clip-path:polygon(0_0,100%_0,50%_100%)]">
            <div className="env-flap-paper absolute inset-0" />
            <svg
              className="absolute left-1/2 top-[6%] h-[72%] -translate-x-1/2 opacity-45"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <g fill="none" stroke="#B8862F" strokeWidth="1">
                {Array.from({ length: 12 }, (_, i) => (
                  <ellipse
                    key={i}
                    cx="50"
                    cy="50"
                    rx="10"
                    ry="34"
                    transform={`rotate(${i * 15} 50 50)`}
                  />
                ))}
                <circle cx="50" cy="50" r="40" strokeDasharray="1 3" />
                <circle cx="50" cy="50" r="6" />
              </g>
            </svg>
            <div className="env-shine absolute inset-0" />
          </div>
          {/* light ring */}
          <span className="env-ring pointer-events-none absolute left-1/2 top-[52%] z-[5] -ml-[44px] -mt-[44px] h-[88px] w-[88px] rounded-full border-2 border-[#E9C46A]" />
          {/* wax seal with hold-to-open progress ring */}
          <button
            ref={seal}
            type="button"
            aria-label="Open the invitation"
            onPointerDown={startHold}
            onPointerUp={endHold}
            onPointerLeave={() => holding && endHold()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                open();
              }
            }}
            className={`env-seal absolute left-1/2 top-[52%] z-[6] -ml-[44px] -mt-[44px] grid h-[88px] w-[88px] cursor-pointer select-none place-items-center rounded-full border-0 font-serif text-2xl font-semibold text-[#FFF6DF] ${holding ? "holding" : ""}`}
          >
            <svg
              className="env-hold pointer-events-none absolute -inset-[7px] h-[102px] w-[102px] -rotate-90"
              viewBox="0 0 102 102"
              aria-hidden="true"
            >
              <circle
                cx="51"
                cy="51"
                r="48"
                fill="none"
                stroke="#F3D88A"
                strokeWidth="3"
                strokeLinecap="round"
                pathLength={1}
              />
            </svg>
            <span className="relative drop-shadow-[0_1px_1px_rgba(0,0,0,.35)]">
              {wedding.initials}
            </span>
          </button>
        </div>
      </div>

      <p className="env-hint absolute bottom-[calc(56px+env(safe-area-inset-bottom))] flex items-center gap-2.5 text-sm tracking-[0.25em] text-[#F3E3BF]">
        <span className="env-tap-dot" aria-hidden="true" />
        TAP OR HOLD THE SEAL
      </p>

      <div className="env-flash pointer-events-none fixed inset-0 bg-[#FFF6DF]" />
    </div>
  );
}

/** [left%, top%, delay s, scale] — fixed so server and client render the same */
const MOTES: [number, number, number, number][] = [
  [8, 22, 0, 1],
  [18, 70, 1.6, 0.7],
  [27, 12, 3.1, 0.8],
  [35, 84, 0.8, 1.1],
  [46, 28, 2.4, 0.6],
  [58, 76, 4.2, 0.9],
  [66, 16, 1.1, 1.2],
  [74, 60, 3.6, 0.7],
  [83, 30, 0.4, 1],
  [91, 78, 2.8, 0.8],
  [12, 48, 4.8, 0.6],
  [52, 92, 1.9, 0.9],
  [88, 8, 3.3, 0.7],
  [40, 52, 5.2, 0.5],
];
