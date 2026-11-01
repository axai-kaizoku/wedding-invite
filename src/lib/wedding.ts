/**
 * Single source of truth for every name, date, venue and link on the site.
 * Edit here only — components read from this file.
 */

export type WeddingEvent = {
  name: string;
  date: string; // display, exactly as given
  day: string;
  time: string;
  venue: string;
  dressCode?: string; // falls back to wedding.dressCode
  iso: string; // start time with fixed IST offset (for .ics)
};

export const wedding = {
  groom: { name: "Nagaraj", bio: "Our handsome Nagaraj" },
  bride: { name: "Poojitha", bio: "Our beautiful Poojitha" },
  /** Order the names appear on the site */
  names: ["Nagaraj", "Poojitha"] as const,
  initials: "N&P",
  blessing: "Shree Ganeshaya Namah",
  subtitle: "Wedding Invitation",

  /** Main date — countdown target, fixed +05:30 */
  dateLabel: "4 December 2026",
  timeLabel: "8:00 PM IST",
  dateISO: "2026-12-04T20:00:00+05:30",

  venueName: "Siddipet",
  venueAddress: "Siddipet Function Hall",
  mapsUrl: "https://share.google/9BDlYI1vcDyXjPe5f",
  dressCode: "traditional",

  footerMessage: "",
  families: "With love, the Vemula and Gupta families",
  rsvp: { phone: "919887654321", label: "+91 9887654321 (Rohan)" },

  events: [
    {
      name: "Mehndi",
      date: "25 Nov 2026",
      day: "Wednesday",
      time: "8:00 PM",
      venue: "Karimnagar",
      iso: "2026-11-25T20:00:00+05:30",
    },
    {
      name: "Haldi",
      date: "26 Nov 2026",
      day: "Thursday",
      time: "11:00 AM",
      venue: "Karimnagar",
      iso: "2026-11-26T11:00:00+05:30",
    },
    {
      name: "Wedding",
      date: "4 Dec 2026",
      day: "Friday",
      time: "8:00 PM",
      venue: "Karimnagar",
      iso: "2026-12-04T20:00:00+05:30",
    },
    {
      name: "Reception",
      date: "6 Dec 2026",
      day: "Sunday",
      time: "7:30 PM",
      venue: "Karimnagar",
      iso: "2026-12-06T19:30:00+05:30",
    },
  ] as WeddingEvent[],

  /** Drop photo1.jpg … photo5.jpg into public/photos. `pos` keeps faces in frame. */
  photos: [
    { src: "/photos/photo1.jpg", pos: "center 22%" },
    { src: "/photos/photo2.jpg", pos: "center 22%" },
    { src: "/photos/photo3.jpg", pos: "center 22%" },
    { src: "/photos/photo4.jpg", pos: "center 22%" },
    { src: "/photos/photo5.jpg", pos: "center 22%" },
  ],
};

export const coupleTitle = `${wedding.names[0]} & ${wedding.names[1]}`;

export const whatsappUrl = `https://wa.me/${wedding.rsvp.phone}?text=${encodeURIComponent(
  `Hi, I will attend the wedding of ${wedding.bride.name} and ${wedding.groom.name}.`
)}`;

/** Prefix public assets with the deploy base path (GitHub Pages sub-path). */
export const asset = (p: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${p}`;
