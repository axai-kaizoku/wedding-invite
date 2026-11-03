import { wedding } from "./wedding";

const G = wedding.groom.name;
const B = wedding.bride.name;
const ev = (name: string) => wedding.events.find((e) => e.name === name);
const sangeeth = ev("Sangeeth");
const haldi = ev("Haldi");
const reception = ev("Reception");

type Toast = { icon: string; text: string };

/**
 * Random wedding-themed toast messages, shuffled at runtime and never repeated
 * in a session. Warm and playful, no invented facts about the couple.
 */
export const LOVE_TOASTS: Toast[] = [
  // the couple
  {
    icon: "💌",
    text: `${G} has been practising his vows in the mirror. Again.`,
  },
  { icon: "✨", text: `Somewhere, ${G} just smiled thinking about ${B}.` },
  { icon: "💞", text: `${B} + ${G} = the best kind of forever.` },
  { icon: "💍", text: `Two hearts, one date: ${wedding.dateLabel}.` },
  {
    icon: "❤️",
    text: `Countdown check: ${G} & ${B} are one day closer to forever.`,
  },
  {
    icon: "🫶",
    text: `Every love story is beautiful, but ${G} & ${B}'s is our favourite.`,
  },
  {
    icon: "💗",
    text: `Some things are meant to be. ${G} & ${B} are one of them.`,
  },
  {
    icon: "🌙",
    text: `${B} and ${G}: written in the stars, sealed with a wedding.`,
  },
  { icon: "💫", text: `From "hello" to "I do". ${G} & ${B}, what a journey.` },
  { icon: "🤍", text: `${G} found his forever, and her name is ${B}.` },
  { icon: "🌹", text: `${B} found her forever, and his name is ${G}.` },

  // the functions
  {
    icon: "🌸",
    text: `Tradition says ${G}'s name hides somewhere in ${B}'s mehndi. Good luck finding it, ${G}.`,
  },
  ...(sangeeth
    ? [
        {
          icon: "🌿",
          text: `Sangeeth night: ${sangeeth.date}, ${sangeeth.time}. Bring your best dance moves.`,
        },
      ]
    : []),
  ...(haldi
    ? [
        {
          icon: "💛",
          text: `Haldi on ${haldi.day}, ${haldi.time}. Wear something you don't mind turning yellow!`,
        },
      ]
    : []),
  ...(reception
    ? [
        {
          icon: "💃",
          text: `Reception: ${reception.date}, ${reception.time}. The dance floor is waiting for you.`,
        },
      ]
    : []),
  {
    icon: "🪔",
    text: "The diyas are ready, the lights are up. All that's missing is you.",
  },
  {
    icon: "🥁",
    text: "The baraat dhol player has been warming up since last week.",
  },
  {
    icon: "🌼",
    text: "Marigolds ordered. Then ordered more. Then a few more.",
  },
  {
    icon: "🎶",
    text: "Sangeet playlist status: 90% Bollywood, 10% uncles requesting old classics.",
  },
  {
    icon: "👟",
    text: "Reminder: the groom's shoes will be guarded at all costs.",
  },
  { icon: "🔥", text: "Seven pheras, seven promises, one lifetime." },
  { icon: "🌺", text: "Varmala moment loading… get your cameras ready." },

  // for the guest
  {
    icon: "🙌",
    text: "Your presence is the best gift. (But we won't stop you from dancing.)",
  },
  {
    icon: "📅",
    text: "Pro tip: tap 'Add to Calendar' so you don't miss a single function.",
  },
  {
    icon: "📍",
    text: `Psst, the venue is ${wedding.venueAddress}. Directions are just a tap away.`,
  },
  {
    icon: "👗",
    text: `Dress code is ${wedding.dressCode}. Time to plan that outfit!`,
  },
  {
    icon: "💬",
    text: "Haven't RSVP'd yet? A quick WhatsApp at the bottom does the trick.",
  },
  {
    icon: "🏮",
    text: "Try the wish lantern at the bottom. Your blessing floats right up.",
  },
  { icon: "🍬", text: "Saving room for the sweets yet? You should." },
  {
    icon: "📸",
    text: "The photographer has been warned about the cousins' group photos.",
  },
  {
    icon: "🥹",
    text: "Fair warning: happy tears are very likely at this wedding.",
  },
  { icon: "🕺", text: "Stretch now. The baraat dance waits for no one." },

  // blessings
  { icon: "🙏", text: `${wedding.blessing}. May their journey be blessed.` },
  {
    icon: "🌷",
    text: "May their home always be full of laughter, love and good food.",
  },
  {
    icon: "☀️",
    text: `Wishing ${G} & ${B} a lifetime of sunny mornings together.`,
  },
  { icon: "💐", text: `${wedding.families}.` },
];

/** Shown the moment the envelope is opened. */
export const WELCOME_TOAST: Toast = {
  icon: "💖",
  text: `You're invited! ${wedding.names[0]} & ${wedding.names[1]} can't wait to celebrate with you.`,
};
