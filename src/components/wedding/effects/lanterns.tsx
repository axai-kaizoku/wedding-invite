"use client";

import { useEffect } from "react";
import { LANTERN_EVENT } from "@/lib/opened";

/** Listens for the lantern button and floats three CSS lanterns up the screen. */
export function Lanterns() {
  useEffect(() => {
    const release = () => {
      for (let i = 0; i < 3; i++) {
        const l = document.createElement("i");
        l.className = "lantern";
        l.setAttribute("aria-hidden", "true");
        l.style.left = `${18 + i * 30 + Math.random() * 10}%`;
        l.style.setProperty("--dl", `${i * 0.6}s`);
        l.style.setProperty("--sw", `${(Math.random() - 0.5) * 90}px`);
        document.body.appendChild(l);
        l.addEventListener("animationend", () => l.remove(), { once: true });
      }
    };
    addEventListener(LANTERN_EVENT, release);
    return () => removeEventListener(LANTERN_EVENT, release);
  }, []);
  return null;
}
