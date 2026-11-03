import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes, Jost } from "next/font/google";
import { coupleTitle, wedding } from "@/lib/wedding";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const sans = Jost({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sans",
  display: "swap",
});
const script = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: `${coupleTitle} · ${wedding.subtitle}`,
  description: `${wedding.subtitle} — ${wedding.dateLabel}, ${wedding.venueName}`,
  // relative paths so they resolve under the GitHub Pages base path too
  icons: {
    icon: [
      { url: "favicon.ico", sizes: "16x16 32x32 48x48" },
      { url: "icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: { url: "apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "manifest.webmanifest",
  openGraph: {
    title: `${coupleTitle} · ${wedding.subtitle}`,
    description: `${wedding.dateLabel} · ${wedding.venueName}`,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#E3EFE8",
};

/**
 * Runs before first paint: always start at the top of the page.
 * - stop the browser restoring the previous scroll position on reload
 * - drop a leftover #hash (e.g. #countdown from "Save the Date") so it doesn't jump
 */
const startAtTop = `try{history.scrollRestoration='manual';if(location.hash)history.replaceState(null,'',location.pathname+location.search);window.scrollTo({top:0,left:0,behavior:'instant'})}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${script.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: startAtTop }} />
      </head>
      <body>
        {/* without JS, skip the envelope so the invite is still readable */}
        <noscript>
          <style>{`#envelope{display:none}html body{overflow:auto}.hero-line,[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
