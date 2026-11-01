"use client";

import { useEffect } from "react";
import { haptics } from "@/lib/haptics";
import { isOpened } from "@/lib/opened";

/**
 * One IntersectionObserver for the whole page. Any element with `data-reveal`
 * gets `.in` once it scrolls into view (CSS does the motion). A MutationObserver
 * picks up lazily-mounted sections (e.g. the album). Elements with
 * `data-haptic` also give a light vibration tick on supported phones.
 */
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            // gentle tick as each new section heading scrolls in
            if (e.target.hasAttribute("data-haptic") && isOpened())
              haptics.tick();
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    const scan = () =>
      document
        .querySelectorAll("[data-reveal]:not(.in)")
        .forEach((el) => io.observe(el));
    scan();
    let queued = false;
    const mo = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        scan();
      });
    });
    mo.observe(document.querySelector("main") ?? document.body, {
      childList: true,
      subtree: true,
    });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
