"use client";

import { Heart, MessageCircle, Sparkles } from "lucide-react";
import { useState } from "react";
import { heartBurst } from "@/lib/confetti";
import { haptics } from "@/lib/haptics";
import { BLESS_EVENT, LANTERN_EVENT } from "@/lib/opened";
import { coupleTitle, photoSrc, wedding, whatsappUrl } from "@/lib/wedding";

export function Footer() {
  const [blessings, setBlessings] = useState(0);

  return (
    <footer className="relative z-[2] bg-gradient-to-b from-ivory via-[#EDF4EF] to-mint px-5 pb-[calc(60px+env(safe-area-inset-bottom))] pt-10 text-center">
      {/* hand-off caricature: cream background blends into the footer via a radial mask */}
      <div data-reveal="zoom" className="relative mx-auto w-[min(78vw,340px)]">
        <img
          {...photoSrc("couple-caricature", 960)}
          srcSet={`${photoSrc("couple-caricature", 480).src} 480w, ${photoSrc("couple-caricature", 960).src} 960w`}
          sizes="(min-width: 768px) 340px, 78vw"
          alt={`Caricature of ${coupleTitle} in their engagement outfits`}
          width={960}
          height={960}
          loading="lazy"
          decoding="async"
          className="caricature float-soft block h-auto w-full"
        />
      </div>
      <div data-reveal="">
        <p className="font-script text-3xl text-sage">with love,</p>
        <h2 className="text-[clamp(36px,10vw,56px)]">{coupleTitle}</h2>
        <p className="font-serif text-[22px]">
          {wedding.dateLabel} · {wedding.venueName}
        </p>
        {wedding.footerMessage && (
          <p className="mt-3.5">{wedding.footerMessage}</p>
        )}
        {wedding.families && (
          <p className="my-3.5 text-moss">{wedding.families}</p>
        )}
      </div>

      {/* send-a-blessing heart: tap → heart confetti + a toast */}
      <div data-reveal="" className="my-6">
        <button
          type="button"
          aria-label="Send your blessings to the couple"
          onClick={(e) => {
            haptics.tap();
            const r = e.currentTarget.getBoundingClientRect();
            void heartBurst(
              {
                x: (r.left + r.width / 2) / innerWidth,
                y: (r.top + r.height / 2) / innerHeight,
              },
              24
            );
            setBlessings((b) => b + 1);
            dispatchEvent(
              new CustomEvent(BLESS_EVENT, { detail: blessings + 1 })
            );
          }}
          className="group mx-auto grid h-20 w-20 cursor-pointer place-items-center rounded-full bg-paper shadow-card transition-transform active:scale-90"
        >
          <Heart
            className="beat h-9 w-9 text-sage"
            fill="currentColor"
            strokeWidth={0}
          />
        </button>
        <p className="mt-2 text-sm text-moss">
          {blessings
            ? `${blessings} blessing${blessings > 1 ? "s" : ""} sent 💕`
            : "Tap to send your blessings"}
        </p>
      </div>

      <div data-reveal="" className="flex flex-wrap justify-center gap-3">
        {wedding.rsvp.phone && (
          <a
            className="btn"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={18} aria-hidden /> RSVP on WhatsApp ·{" "}
            {wedding.rsvp.label}
          </a>
        )}
        <button
          type="button"
          className="btn btn-alt"
          onClick={() => {
            haptics.celebrate();
            dispatchEvent(new Event(LANTERN_EVENT));
          }}
        >
          <Sparkles size={18} aria-hidden /> Release a Wish Lantern
        </button>
      </div>
    </footer>
  );
}
