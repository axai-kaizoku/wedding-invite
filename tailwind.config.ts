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
        // palette sampled from the engagement photos:
        // sage/mint silk saree, ivory-silver sherwani, cream roses, gold jewellery
        ivory: "#FBF8F1",
        mint: "#DCEBE3",
        peach: "#F6DCC6",
        paper: "#FFFDF8",
        sage: "#4A7A68",
        forest: "#2F5547",
        ink: "#263B33",
        moss: "#5F7469",
        gold: "#B8862F",
        line: "#DCE6DF",
        blush: "#F3D9CF",
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(47,85,71,.18)",
        photo: "0 12px 28px -14px rgba(47,85,71,.35)",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
