import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", ...fontFamily.serif],
        sans: ["var(--font-sans)", ...fontFamily.sans],
        script: ["var(--font-script)", "cursive"],
      },
      colors: {
        blush: "#FFF5F3",
        petal: "#F8D7DA",
        peach: "#F9E1C8",
        paper: "#FFFBFA",
        rose: "#D94F70",
        maroon: "#A3213D",
        ink: "#4B1D2B",
        mauve: "#A0616F",
        gold: "#C8923A",
        line: "#F1D3D6",
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(163,33,61,.18)",
        photo: "0 12px 28px -14px rgba(163,33,61,.35)",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
