"use client";

import { CalendarPlus, MapPin } from "lucide-react";
import { haptics } from "@/lib/haptics";
import { wedding } from "@/lib/wedding";
import { MapArt, SectionHeading } from "./ornaments";

export function Venue() {
  const cards: { label: string; value: React.ReactNode }[] = [
    { label: "Date", value: wedding.dateLabel },
    { label: "Time", value: wedding.timeLabel },
    {
      label: "Venue",
      value: (
        <>
          {wedding.venueName}
          <br />
          <span className="text-[17px]">{wedding.venueAddress}</span>
        </>
      ),
    },
    ...(wedding.dressCode
      ? [{ label: "Dress code", value: wedding.dressCode }]
      : []),
  ];

  return (
    <section className="section">
      <SectionHeading eyebrow="Where we say I do" title="Venue Details" />
      <div className="mb-6 grid grid-cols-2 gap-3 text-left">
        {cards.map((c, i) => (
          <div
            key={c.label}
            data-reveal=""
            style={{ "--d": `${i * 0.08}s` } as React.CSSProperties}
            className="card !p-4"
          >
            <small className="block text-sm uppercase tracking-[0.18em] text-moss">
              {c.label}
            </small>
            <p className="font-serif text-[21px] font-medium capitalize leading-snug">
              {c.value}
            </p>
          </div>
        ))}
      </div>
      <div data-reveal="" className="mb-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          className="btn"
          onClick={() => {
            haptics.tap();
            // .ics builder is loaded only when needed
            void import("@/lib/ics").then((m) => m.downloadCalendar());
          }}
        >
          <CalendarPlus size={18} aria-hidden /> Add to Calendar
        </button>
        <a
          className="btn btn-alt"
          href={wedding.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MapPin size={18} aria-hidden /> Get Directions
        </a>
      </div>
      <a
        data-reveal="zoom"
        href={wedding.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open map to ${wedding.venueAddress}`}
        className="block overflow-hidden rounded-3xl border border-line shadow-card"
      >
        <span className="block transition-transform duration-500 ease-out hover:scale-[1.03]">
          <MapArt />
        </span>
      </a>
    </section>
  );
}
