"use client";

import { useEffect, useRef, useState } from "react";
import { heartBurst } from "@/lib/confetti";
import { haptics } from "@/lib/haptics";
import { OPEN_EVENT } from "@/lib/opened";
import { wedding } from "@/lib/wedding";

/**
 * Sealed envelope, server-rendered so it is the first paint.
 * Tap / click / Enter / Space on the seal → glow, light ring, flap opens,
 * card slides up, heart confetti, soft flash, fade into the hero (~1.7s).
 * All motion is CSS (transform/opacity); JS only toggles classes.
 */
export function Envelope() {
  const [opening, setOpening] = useState(false);
  const seal = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    seal.current?.focus({ preventScroll: true });
    // iOS Safari ignores overflow:hidden for touch scrolling — block swipes on the overlay
    const el = document.getElementById("envelope");
    const block = (e: TouchEvent) => e.preventDefault();
    el?.addEventListener("touchmove", block, { passive: false });
    return () => el?.removeEventListener("touchmove", block);
  }, []);

  const finish = () => {
    // land exactly on the hero, whatever happened behind the envelope
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.classList.add("opened");
    dispatchEvent(new Event(OPEN_EVENT));
  };

  const open = () => {
    if (opening) return;
    haptics.open();
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return finish();
    setOpening(true);
    const r = seal.current?.getBoundingClientRect();
    setTimeout(() => {
      if (r)
        void heartBurst(
          {
            x: (r.left + r.width / 2) / innerWidth,
            y: (r.top + r.height / 2) / innerHeight,
          },
          70
        );
    }, 450);
    setTimeout(finish, 1700);
  };

  return (
    <div
      id="envelope"
      className={`fixed inset-0 z-[100] grid touch-none place-items-center overscroll-none bg-[radial-gradient(ellipse_at_top,#FBE3E4,#FFF5F3_70%)] ${opening ? "opening" : ""}`}
    >
      <p className="absolute top-[calc(48px+env(safe-area-inset-top))] font-serif text-xl italic text-mauve">
        {wedding.blessing}
      </p>

      <div className="env env-in relative aspect-[3/2] w-[min(86vw,380px)]">
        {/* back */}
        <div className="absolute inset-0 rounded-xl bg-[#E9A9B4] shadow-[0_24px_50px_-18px_rgba(163,33,61,.45)]" />
        {/* card peeking out */}
        <div className="env-card absolute inset-x-[6%] top-[6%] z-[2] h-[86%] rounded-lg bg-paper px-3 pt-4 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-mauve">
            {wedding.subtitle}
          </p>
          <p className="mt-1 font-serif text-xl">
            {wedding.names[0]}{" "}
            <span className="font-script text-2xl text-rose">&amp;</span>{" "}
            {wedding.names[1]}
          </p>
        </div>
        {/* front pocket */}
        <div className="absolute inset-0 z-[3] rounded-xl bg-[#F2BFC7] [clip-path:polygon(0_0,50%_56%,100%_0,100%_100%,0_100%)]" />
        {/* flap */}
        <div className="env-flap absolute inset-x-0 top-0 h-[60%] rounded-t-xl bg-[#E49AA8] [backface-visibility:hidden] [clip-path:polygon(0_0,100%_0,50%_100%)]" />
        {/* light ring */}
        <span className="env-ring pointer-events-none absolute left-1/2 top-[52%] z-[5] -ml-[42px] -mt-[42px] h-[84px] w-[84px] rounded-full border-2 border-rose" />
        {/* wax seal */}
        <button
          ref={seal}
          type="button"
          onClick={open}
          aria-label="Open the invitation"
          className="env-seal absolute left-1/2 top-[52%] z-[6] -ml-[42px] -mt-[42px] grid h-[84px] w-[84px] cursor-pointer place-items-center rounded-full border-0 bg-[radial-gradient(circle_at_35%_30%,#E66A86,#A3213D)] font-serif text-2xl font-semibold text-white shadow-[0_6px_16px_rgba(120,20,40,.35)]"
        >
          {wedding.initials}
        </button>
        <p className="absolute -bottom-12 w-full text-center text-sm tracking-[0.25em] text-mauve">
          TAP THE SEAL
        </p>
      </div>

      <div className="env-flash pointer-events-none fixed inset-0 bg-white" />
    </div>
  );
}
