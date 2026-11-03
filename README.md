# Wedding Invite — Nagaraj & Poojitha

Next.js 14 (static export) + Tailwind + Framer Motion wedding invitation, built from the
portfolio repo's tooling.

## Edit details

Everything (names, dates, events, venue, links, photos) lives in `src/lib/wedding.ts`.

## Photos

Engagement photos live in `public/photos/` as WebP at 480 / 960 / 1600px widths
(`name-480.webp` etc.). Browsers pick the right size via `srcset`. Choose which photo goes
where (hero, couple cards, album) and its face-safe crop (`pos`) in `src/lib/wedding.ts`.

To add one more (needs `cwebp`, e.g. `brew install webp`):

```bash
for w in 480 960 1600; do cwebp -q 78 -m 6 -metadata none -resize $w 0 in.jpg -o public/photos/NAME-$w.webp; done
```

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
```

Hosting under a sub-path (e.g. GitHub Pages project site):
`NEXT_PUBLIC_BASE_PATH=/wedding-invite npm run build`

## Performance design

- Envelope, hero and every text section are **pre-rendered static HTML**, so they paint without waiting for JS.
- All motion is **CSS keyframes/transitions on `transform` + `opacity`**. One shared
  `IntersectionObserver` adds `.in` to `[data-reveal]` elements. The hero parallax and timeline fill use
  CSS scroll-driven animations where supported (no scroll JS at all).
- Decorative layers (petals, glitter, paper plane, love cursor, lanterns, toasts) and the photo album are
  loaded with `next/dynamic({ ssr: false })` and mount **after the envelope opens, when the browser is idle**.
- `canvas-confetti`, `web-haptics` and the `.ics` builder are `import()`ed on first use.
- `prefers-reduced-motion` skips the motion layers and shows everything instantly.

## Love touches

- Random wedding-themed toasts (`src/lib/love-notes.ts`) every ~25–45s. They don't repeat, pause when the tab is
  hidden, and stop after 8.
- Heart-confetti envelope burst, heartbeat ECG line that draws into a heart, beating heart in the hero.
- "Send your blessings" heart in the footer (heart burst + milestone toasts at 1, 5 and 15 taps).
- Tap hearts on touch screens, a rose glow cursor on desktop, wish lanterns.
