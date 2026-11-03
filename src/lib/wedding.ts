/**
 * Single source of truth for every name, date, venue and link on the site.
 * Edit here only — components read from this file.
 */

export type Photo = {
  name: string;
  alt: string;
  pos: string;
  w?: number;
  h?: number;
};

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

  /**
   * Engagement photos (public/photos), each exported as WebP at 480/960/1600px.
   * `pos` is the CSS object-position that keeps faces in frame when cropped.
   */
  heroPhoto: {
    name: "couple-embrace",
    alt: "Nagaraj and Poojitha in garlands at their engagement",
    pos: "50% 22%",
  },
  portraits: {
    groom: {
      name: "groom-seated",
      alt: "Nagaraj in his ivory-silver engagement sherwani",
      pos: "48% 22%",
    },
    bride: {
      name: "bride-portrait",
      alt: "Poojitha in a sage silk saree with a rose garland",
      pos: "50% 18%",
    },
  },
  photos: [
    {
      name: "couple-rings-moment",
      alt: "Nagaraj slipping the ring on Poojitha's finger",
      pos: "40% 35%",
      w: 3,
      h: 2,
    },
    {
      name: "couple-garlands",
      alt: "Nagaraj and Poojitha smiling in rose garlands",
      pos: "50% 20%",
      w: 2,
      h: 3,
    },
    {
      name: "rings-in-hand",
      alt: "Engagement rings resting on a hennaed palm",
      pos: "50% 60%",
      w: 2,
      h: 3,
    },
    {
      name: "bride-seated",
      alt: "Poojitha seated in her engagement saree",
      pos: "40% 45%",
      w: 2,
      h: 3,
    },
    {
      name: "groom-portrait",
      alt: "Nagaraj in an ivory embroidered sherwani",
      pos: "50% 30%",
      w: 2,
      h: 3,
    },
    {
      name: "couple-portrait",
      alt: "Nagaraj and Poojitha posing together",
      pos: "50% 25%",
      w: 2,
      h: 3,
    },
    {
      name: "groom-kurta",
      alt: "Nagaraj in an ivory kurta with a peach stole",
      pos: "55% 30%",
      w: 3,
      h: 2,
    },
    {
      name: "couple-embrace",
      alt: "Nagaraj and Poojitha in a warm embrace",
      pos: "50% 22%",
      w: 2,
      h: 3,
    },
  ] as Photo[],
};

export const coupleTitle = `${wedding.names[0]} & ${wedding.names[1]}`;

export const whatsappUrl = `https://wa.me/${wedding.rsvp.phone}?text=${encodeURIComponent(
  `Hi, I will attend the wedding of ${wedding.bride.name} and ${wedding.groom.name}.`
)}`;

/** Prefix public assets with the deploy base path (GitHub Pages sub-path). */
export const asset = (p: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${p}`;

const SIZES = [480, 960, 1600] as const;
/** Responsive WebP sources for a photo exported as name-480/960/1600.webp */
export const photoSrc = (
  name: string,
  fallback: (typeof SIZES)[number] = 960
) => ({
  src: asset(`/photos/${name}-${fallback}.webp`),
  srcSet: SIZES.map((w) => `${asset(`/photos/${name}-${w}.webp`)} ${w}w`).join(
    ", "
  ),
});
