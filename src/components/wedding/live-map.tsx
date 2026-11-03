"use client";

import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { wedding } from "@/lib/wedding";

/**
 * Live Google Map of the venue. The iframe is heavy (~1 MB of Google JS), so it
 * mounts only when the card is about to scroll into view; until then a light
 * sage placeholder holds the space (no layout shift).
 */
export function LiveMap() {
  const box = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      data-reveal="zoom"
      className="overflow-hidden rounded-3xl border border-line bg-paper shadow-card"
    >
      <div
        ref={box}
        className="relative aspect-[4/3] w-full bg-mint/50 sm:aspect-[16/10]"
      >
        {!loaded && (
          <div
            className="absolute inset-0 grid place-items-center text-moss"
            aria-hidden="true"
          >
            <MapPin className="h-8 w-8 animate-pulse text-sage" />
          </div>
        )}
        {show && (
          <iframe
            src={wedding.mapsEmbedUrl}
            title={`Map to ${wedding.venueName}, ${wedding.venueAddress}`}
            className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => setLoaded(true)}
          />
        )}
      </div>
      <a
        href={wedding.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-12 items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-mint/40"
      >
        <span>
          <span className="block font-serif text-lg font-medium leading-tight">
            {wedding.venueName}
          </span>
          <span className="text-[15px] text-moss">{wedding.venueAddress}</span>
        </span>
        <span className="shrink-0 text-[15px] font-medium text-sage">
          Open in Maps →
        </span>
      </a>
    </div>
  );
}
