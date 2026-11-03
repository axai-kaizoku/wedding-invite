import { coupleTitle, wedding, type WeddingEvent } from "./wedding";

/**
 * Calendar helpers. Websites can't silently insert events into a phone's
 * calendar, so we hand off to each calendar's own "add event" flow:
 *  - Google: a prefilled calendar.google.com/render link. Opens the Google
 *    Calendar app on Android (and the web on iOS/desktop) with the event ready to save.
 *  - Apple / Outlook / others: an .ics file. On iPhone, Safari shows the native
 *    "Add to Calendar" sheet for it.
 */

const HOURS = 3;
const stamp = (d: Date) => d.toISOString().replace(/[-:]|\.\d+/g, "");
const esc = (s: string) => s.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");

const range = (e: WeddingEvent) => {
  const start = new Date(e.iso);
  return { start, end: new Date(start.getTime() + HOURS * 3600_000) };
};

const details = (e: WeddingEvent) =>
  `${e.name} of ${coupleTitle}\n${e.date} · ${e.day} · ${e.time}\n${e.venue}\nDress code: ${
    e.dressCode ?? wedding.dressCode
  }\nDirections: ${wedding.mapsUrl}`;

/** Prefilled Google Calendar link for one function. */
export function googleCalendarUrl(e: WeddingEvent) {
  const { start, end } = range(e);
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: `${e.name} · ${coupleTitle}`,
    dates: `${stamp(start)}/${stamp(end)}`,
    details: details(e),
    location: e.venue,
    ctz: "Asia/Kolkata",
  });
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
}

/** .ics text containing the given functions (defaults to all). */
export function buildIcs(events: WeddingEvent[] = wedding.events) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invite//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];
  for (const e of events) {
    const { start, end } = range(e);
    lines.push(
      "BEGIN:VEVENT",
      `UID:${e.name.toLowerCase()}-${start.getTime()}@wedding-invite`,
      `DTSTAMP:${stamp(new Date())}`,
      `DTSTART:${stamp(start)}`,
      `DTEND:${stamp(end)}`,
      `SUMMARY:${esc(`${e.name} · ${coupleTitle}`)}`,
      `DESCRIPTION:${esc(details(e))}`,
      `LOCATION:${esc(e.venue)}`,
      `URL:${wedding.mapsUrl}`,
      // reminder the evening before
      "BEGIN:VALARM",
      "TRIGGER:-PT12H",
      "ACTION:DISPLAY",
      `DESCRIPTION:${esc(`${e.name} tomorrow · ${coupleTitle}`)}`,
      "END:VALARM",
      "END:VEVENT"
    );
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

/**
 * Apple Calendar / generic: open the .ics.
 * iOS Safari opens a data: text/calendar URL straight into the "Add to Calendar" sheet;
 * elsewhere we download the file so the OS hands it to the default calendar app.
 */
export function openIcs(events: WeddingEvent[] = wedding.events) {
  const ics = buildIcs(events);
  const name = `${wedding.names.join("-").toLowerCase()}-wedding.ics`;
  if (isIOS()) {
    window.location.href = `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
    return;
  }
  const url = URL.createObjectURL(
    new Blob([ics], { type: "text/calendar;charset=utf-8" })
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
