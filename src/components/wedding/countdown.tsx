"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/lib/wedding";
import { SectionHeading } from "./ornaments";

const TARGET = new Date(wedding.dateISO).getTime(); // fixed +05:30 offset
const KEYS = ["Days", "Hours", "Mins", "Secs"] as const;

function remaining() {
  const r = TARGET - Date.now();
  if (r <= 0) return null;
  return [
    Math.floor(r / 864e5),
    Math.floor((r % 864e5) / 36e5),
    Math.floor((r % 36e5) / 6e4),
    Math.floor((r % 6e4) / 1e3),
  ];
}

export function Countdown() {
  const [left, setLeft] = useState<number[] | null | undefined>(undefined);

  useEffect(() => {
    setLeft(remaining());
    const id = setInterval(() => {
      // skip work while the tab is hidden
      if (!document.hidden) setLeft(remaining());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="countdown" className="section scroll-mt-4">
      <SectionHeading
        eyebrow="Until forever begins"
        title="Counting the heartbeats"
      />
      <div data-reveal="zoom">
        {left === null ? (
          <p className="font-script text-6xl text-sage">Just Married</p>
        ) : (
          <div className="card grid grid-cols-4 gap-2.5 bg-gradient-to-br from-paper to-[#F1F7F2]">
            {KEYS.map((k, i) => (
              <div key={k}>
                <span className="block h-[1.15em] overflow-hidden font-serif text-[clamp(30px,9vw,48px)] font-medium leading-[1.15] tabular-nums">
                  {/* key change remounts → CSS roll-in */}
                  <b
                    key={left?.[i] ?? "-"}
                    className="digit-in block font-medium"
                  >
                    {left ? left[i] : "–"}
                  </b>
                </span>
                <span className="text-sm uppercase tracking-[0.15em] text-moss">
                  {k}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
