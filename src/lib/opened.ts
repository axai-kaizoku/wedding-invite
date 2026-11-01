"use client";

import { useEffect, useState } from "react";

export const OPEN_EVENT = "invite:open";
export const LANTERN_EVENT = "invite:lantern";
export const BLESS_EVENT = "invite:bless";

export const isOpened = () =>
  typeof document !== "undefined" &&
  document.documentElement.classList.contains("opened");

/** true once the guest has opened the envelope */
export function useOpened() {
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    if (isOpened()) return setOpened(true);
    const on = () => setOpened(true);
    addEventListener(OPEN_EVENT, on, { once: true });
    return () => removeEventListener(OPEN_EVENT, on);
  }, []);
  return opened;
}

/** run after the browser is idle (falls back to a timeout) */
export function whenIdle(cb: () => void, timeout = 1200) {
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
  };
  if (w.requestIdleCallback) w.requestIdleCallback(cb, { timeout });
  else setTimeout(cb, 300);
}
