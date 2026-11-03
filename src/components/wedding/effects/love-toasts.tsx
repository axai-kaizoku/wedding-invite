"use client";

import { useEffect } from "react";
import { toast, Toaster } from "sonner";
import { haptics } from "@/lib/haptics";
import { LOVE_TOASTS, WELCOME_TOAST } from "@/lib/love-notes";
import { BLESS_EVENT, LANTERN_EVENT } from "@/lib/opened";

const show = (t: { icon: string; text: string }, duration = 4200) =>
  toast(t.text, { icon: <span className="text-lg">{t.icon}</span>, duration });

/**
 * Pops a random wedding-themed toast every ~18–35s while the guest reads,
 * never repeating until the deck is exhausted, paused when the tab is hidden,
 * and capped so it never feels spammy.
 */
export function LoveToasts() {
  useEffect(() => {
    const deck = [...LOVE_TOASTS].sort(() => Math.random() - 0.5);
    let shown = 0;
    let timer: ReturnType<typeof setTimeout>;

    const schedule = (ms: number) => {
      timer = setTimeout(() => {
        if (shown >= 15) return;
        if (!document.hidden) {
          haptics.tick();
          show(deck[shown % deck.length]);
          shown++;
        }
        schedule(18_000 + Math.random() * 17_000);
      }, ms);
    };

    const welcome = setTimeout(() => show(WELCOME_TOAST, 5000), 900);
    schedule(10_000);

    const onLantern = () =>
      toast("Your wish is floating up to the stars ✨", { icon: "🏮" });
    const onBless = (e: Event) => {
      const n = (e as CustomEvent<number>).detail;
      if (n === 1)
        toast("Blessing sent! The couple can feel the love.", { icon: "💕" });
      else if (n === 5)
        toast("Five blessings! You're officially their favourite guest.", {
          icon: "🥹",
        });
      else if (n === 15)
        toast("Okay okay, they're blushing now 🙈", { icon: "💗" });
    };
    addEventListener(LANTERN_EVENT, onLantern);
    addEventListener(BLESS_EVENT, onBless);
    return () => {
      clearTimeout(timer);
      clearTimeout(welcome);
      removeEventListener(LANTERN_EVENT, onLantern);
      removeEventListener(BLESS_EVENT, onBless);
    };
  }, []);

  return (
    <Toaster
      position="top-center"
      offset={16}
      gap={8}
      visibleToasts={2}
      toastOptions={{
        unstyled: false,
        className:
          "!rounded-2xl !border-[#DCE6DF] !bg-[#FFFDF8]/95 !text-[#263B33] !font-sans !text-[15px] !shadow-[0_10px_30px_-12px_rgba(47,85,71,.35)]",
      }}
    />
  );
}
