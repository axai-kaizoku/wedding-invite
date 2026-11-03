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
  eventLocation: string;
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
  dateLabel: "15th November 2026",
  timeLabel: "10:06 AM IST",
  dateISO: "2026-11-15T10:06:00+05:30",

  venueName: "Shubham Convention",
  venueAddress: "Siddipet Convention Hall, Manchiryal",
  mapsUrl: "https://maps.app.goo.gl/KGgj1yhXdfeEB4qX7",
  /** Google Maps "Share → Embed a map" URL for the live map on the venue card */
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3775.313286678433!2d79.4368779!3d18.873177899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a32cb00ac1ff0d1%3A0x5e1f970d94b59982!2sShubam%20Convention%20%26%20Residency!5e0!3m2!1sen!2sin!4v1793733698798!5m2!1sen!2sin",
  dressCode: "traditional",

  footerMessage: "",
  families: "With love, the Vemula and Vaddepalli families",
  rsvp: { phone: "918185085069", label: "+91 8185085069 (Natraj)" },

  events: [
    {
      name: "Haldi",
      date: "11 Nov 2026",
      day: "Wednesday",
      time: "9:00 AM",
      venue: "Dwaraka Resort, Karimnagar",
      iso: "2026-11-11T09:00:00+05:30",
      eventLocation: "https://maps.app.goo.gl/zNb41ppNoQYXLRmcA",
    },
    {
      name: "Sangeeth",
      date: "11 Nov 2026",
      day: "Wednesday",
      time: "5:00 PM",
      venue: "Dwaraka Resort, Karimnagar",
      iso: "2026-11-11T17:00:00+05:30",
      eventLocation: "https://maps.app.goo.gl/zNb41ppNoQYXLRmcA",
    },
    {
      name: "Wedding",
      date: "15 Nov 2026",
      day: "Sunday",
      time: "10:06 AM",
      venue: "Shubham Convention, Manchiryal",
      iso: "2026-11-15T10:06:00+05:30",
      eventLocation: "https://maps.app.goo.gl/KGgj1yhXdfeEB4qX7",
    },
    {
      name: "Reception",
      date: "18 Nov 2026",
      day: "Wednesday",
      time: "8:00 PM",
      venue: "Saimanikanta Gardens, Sircilla",
      iso: "2026-11-18T20:00:00+05:30",
      eventLocation: "https://maps.app.goo.gl/61uw1B1rWvxmQZhu8",
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
