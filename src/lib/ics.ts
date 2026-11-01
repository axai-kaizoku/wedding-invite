import { coupleTitle, wedding } from "./wedding";

const stamp = (d: Date) => d.toISOString().replace(/[-:]|\.\d+/g, "");
const esc = (s: string) => s.replace(/([,;\\])/g, "\\$1");

/** Builds an .ics with every function and triggers a download. */
export function downloadCalendar() {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invite//EN",
    "CALSCALE:GREGORIAN",
  ];
  for (const e of wedding.events) {
    const start = new Date(e.iso);
    lines.push(
      "BEGIN:VEVENT",
      `UID:${e.name.toLowerCase()}-${start.getTime()}@wedding-invite`,
      `DTSTAMP:${stamp(new Date())}`,
      `DTSTART:${stamp(start)}`,
      `DTEND:${stamp(new Date(start.getTime() + 3 * 3600_000))}`,
      `SUMMARY:${esc(`${e.name} - ${coupleTitle}`)}`,
      `LOCATION:${esc(e.venue)}`,
      `URL:${wedding.mapsUrl}`,
      "END:VEVENT"
    );
  }
  lines.push("END:VCALENDAR");
  const url = URL.createObjectURL(
    new Blob([lines.join("\r\n")], { type: "text/calendar" })
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = `${wedding.names.join("-").toLowerCase()}-wedding.ics`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
