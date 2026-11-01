"use client";

import { Heart, MessageCircle, Sparkles } from "lucide-react";
import { useState } from "react";
import { heartBurst } from "@/lib/confetti";
import { haptics } from "@/lib/haptics";
import { BLESS_EVENT, LANTERN_EVENT } from "@/lib/opened";
import { coupleTitle, wedding, whatsappUrl } from "@/lib/wedding";
import { CoupleIllustration } from "./caricatures";

export function Footer() {
  const [blessings, setBlessings] = useState(0);

  return (
    <footer className="relative z-[2] bg-gradient-to-b from-blush via-[#FCE4E6] to-petal px-5 pb-[calc(60px+env(safe-area-inset-bottom))] pt-10 text-center">
      <div data-reveal="zoom">
        <CoupleIllustration label={`Illustration of ${coupleTitle}`} />
      </div>
      <div data-reveal="">
        <p className="font-script text-3xl text-rose">with love,</p>
        <h2 className="text-[clamp(36px,10vw,56px)]">{coupleTitle}</h2>
        <p className="font-serif text-[22px]">
          {wedding.dateLabel} · {wedding.venueName}
        </p>
        {wedding.footerMessage && (
          <p className="mt-3.5">{wedding.footerMessage}</p>
        )}
        {wedding.families && (
          <p className="my-3.5 text-mauve">{wedding.families}</p>
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
            className="beat h-9 w-9 text-rose"
            fill="currentColor"
            strokeWidth={0}
          />
        </button>
        <p className="mt-2 text-sm text-mauve">
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
