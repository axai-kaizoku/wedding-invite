"use client";

import { createPortal } from "react-dom";
import { CalendarPlus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { googleCalendarUrl, openIcs } from "@/lib/calendar";
import { haptics } from "@/lib/haptics";
import { wedding } from "@/lib/wedding";

type Platform = "ios" | "android" | "other";

function detect(): Platform {
  const ua = navigator.userAgent;
  if (
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  )
    return "ios";
  if (/Android/i.test(ua)) return "android";
  return "other";
}

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z"
    />
    <path
      fill="#34A853"
      d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z"
    />
    <path
      fill="#FBBC05"
      d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1a10 10 0 0 0 0 9.2L6.4 14z"
    />
    <path
      fill="#EA4335"
      d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.4L6.4 10c.8-2.4 3-4.1 5.6-4.1z"
    />
  </svg>
);
const AppleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.2-1.7-3-1.9-3.6-2-1.5-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.8-1-2.9-4.2zM13.9 5.3c.7-.9 1.2-2 1-3.2-1 0-2.3.7-3 1.5-.7.8-1.2 2-1.1 3.1 1.2.1 2.3-.6 3.1-1.4z" />
  </svg>
);

/**
 * "Add to Calendar" → a small sheet with Google Calendar and Apple Calendar.
 * The guest's own platform is listed first. Google gets one tap per function
 * (Google's link only takes one event); Apple/.ics adds all functions at once.
 */
export function CalendarMenu() {
  const [open, setOpen] = useState(false);
  const [platform, setPlatform] = useState<Platform>("other");
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => setPlatform(detect()), []);

  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => {
    setOpen(false);
    trigger.current?.focus();
  };

  const apple = (
    <button
      key="apple"
      type="button"
      className="cal-opt"
      onClick={() => {
        haptics.tap();
        openIcs();
        close();
      }}
    >
      <AppleIcon />
      <span className="flex-1 text-left">
        Apple Calendar
        <small className="block text-[13px] font-normal text-moss">
          Adds all {wedding.events.length} functions at once
        </small>
      </span>
    </button>
  );

  const google = (
    <div
      key="google"
      className="rounded-2xl border border-line bg-paper p-3 text-left"
    >
      <p className="mb-2 flex items-center gap-2 font-medium">
        <GoogleIcon /> Google Calendar
      </p>
      <div className="grid grid-cols-2 gap-2">
        {wedding.events.map((e) => (
          <a
            key={e.name}
            href={googleCalendarUrl(e)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => haptics.tap()}
            className="flex min-h-11 flex-col justify-center rounded-xl bg-mint/60 px-3 py-1.5 text-[15px] leading-tight text-ink transition-colors hover:bg-mint"
          >
            <span className="font-medium">+ {e.name}</span>
            <span className="text-[13px] text-moss">{e.date}</span>
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="btn"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          haptics.tap();
          setOpen(true);
        }}
      >
        <CalendarPlus size={18} aria-hidden /> Add to Calendar
      </button>

      {open &&
        createPortal(
          <div
            className="lb fixed inset-0 z-[110] flex items-end justify-center bg-[rgba(18,32,27,.45)] sm:items-center"
            onClick={(e) => e.target === e.currentTarget && close()}
          >
            <div
              ref={panel}
              role="dialog"
              aria-modal="true"
              aria-label="Add the wedding to your calendar"
              className="sheet-up w-full max-w-md rounded-t-3xl bg-ivory p-5 pb-[calc(20px+env(safe-area-inset-bottom))] shadow-card sm:rounded-3xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-2xl">Save the dates</h3>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={close}
                  className="grid h-11 w-11 place-items-center rounded-full hover:bg-mint"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="grid gap-3">
                {platform === "ios" ? [apple, google] : [google, apple]}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
