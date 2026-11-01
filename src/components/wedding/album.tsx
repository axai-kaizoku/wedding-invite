"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { haptics } from "@/lib/haptics";
import { asset, coupleTitle, wedding } from "@/lib/wedding";
import { SectionHeading } from "./ornaments";

const PH = wedding.photos;

export function Album() {
  const [idx, setIdx] = useState<number | null>(null);
  const [dir, setDir] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const touchX = useRef(0);

  const go = useCallback((d: number) => {
    haptics.tick();
    setDir(d);
    setIdx((i) => (i === null ? i : (i + d + PH.length) % PH.length));
  }, []);
  const close = useCallback(() => {
    setIdx(null);
    lastFocus.current?.focus();
  }, []);

  useEffect(() => {
    if (idx === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    document.body.style.overflow = "hidden";
    addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      removeEventListener("keydown", onKey);
    };
  }, [idx, go, close]);

  return (
    <section className="section">
      <SectionHeading eyebrow="Moments together" title="Photo Album" />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {PH.map((p, i) => (
          <div
            key={p.src}
            data-reveal="zoom"
            style={{ "--d": `${(i % 3) * 0.08}s` } as React.CSSProperties}
            className={
              i === 0
                ? "col-span-2 aspect-[4/3] md:row-span-2 md:aspect-auto"
                : "aspect-[3/4]"
            }
          >
            <button
              type="button"
              aria-label={`Open photo ${i + 1}`}
              onClick={(e) => {
                lastFocus.current = e.currentTarget;
                setDir(0);
                setIdx(i);
              }}
              className="group h-full w-full cursor-pointer overflow-hidden rounded-2xl border-[6px] border-paper bg-petal/40 p-0 shadow-photo"
            >
              <img
                src={asset(p.src)}
                alt={`${coupleTitle}, photo ${i + 1}`}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: p.pos }}
                className="block h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </button>
          </div>
        ))}
      </div>

      {idx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="lb fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(45,12,22,.92)]"
          onClick={(e) => e.target === e.currentTarget && close()}
          onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? 0)}
          onTouchEnd={(e) => {
            const d = (e.changedTouches[0]?.clientX ?? 0) - touchX.current;
            if (Math.abs(d) > 50) go(d < 0 ? 1 : -1);
          }}
        >
          <img
            key={idx}
            src={asset(PH[idx].src)}
            alt={`${coupleTitle}, photo ${idx + 1}`}
            style={{ "--from": `${dir * 80}px` } as React.CSSProperties}
            className="lb-img max-h-[80vh] max-w-[92vw] rounded-lg object-contain"
          />
          {[
            {
              cls: "left-2.5",
              label: "Previous",
              icon: <ChevronLeft />,
              on: () => go(-1),
            },
            {
              cls: "right-2.5",
              label: "Next",
              icon: <ChevronRight />,
              on: () => go(1),
            },
          ].map((b) => (
            <button
              key={b.label}
              type="button"
              aria-label={b.label}
              onClick={b.on}
              className={`absolute ${b.cls} grid h-12 w-12 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25`}
            >
              {b.icon}
            </button>
          ))}
          <button
            ref={closeRef}
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute right-2.5 top-[calc(10px+env(safe-area-inset-top))] grid h-12 w-12 place-items-center rounded-full bg-white/15 text-white"
          >
            <X />
          </button>
          <p className="absolute bottom-[calc(16px+env(safe-area-inset-bottom))] text-[15px] tracking-[0.15em] text-white">
            {idx + 1} / {PH.length}
          </p>
        </div>
      )}
    </section>
  );
}
