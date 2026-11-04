import { Heart } from "lucide-react";
import { wedding } from "@/lib/wedding";
import { Photo } from "./photo";

/**
 * Server component — painted instantly; entrance is CSS gated on html.opened.
 * Arched engagement photo framed like a temple doorway, names below.
 */
export function Hero() {
  const line = (d: number) => ({
    className: "hero-line",
    style: { "--d": `${d}s` } as React.CSSProperties,
  });
  const p = wedding.heroPhoto;
  return (
    <section
      id="hero"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_15%,#E3EFE8_0%,#F3F7F1_45%,#FBF8F1_80%)] px-5 pb-10 pt-[calc(36px+env(safe-area-inset-top))] text-center"
    >
      <p {...line(0.05)}>
        <span className="font-serif text-xl italic text-moss">
          {wedding.blessing}
        </span>
      </p>

      {/* arched photo with a thin gold double frame */}
      <div {...line(0.15)}>
        <div className="hero-parallax relative mx-auto mt-5 w-[min(64vw,300px)] md:w-[320px]">
          <div
            className="absolute -inset-2.5 rounded-t-full border border-gold/60"
            aria-hidden="true"
          />
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-full border-4 border-paper shadow-photo">
            <Photo
              {...p}
              priority
              sizes="(min-width: 768px) 320px, 64vw"
              className="hero-zoom"
            />
          </div>
          <Heart
            className="beat absolute -bottom-4 left-[45%] h-8 w-8 -translate-x-1/2 text-sage drop-shadow"
            fill="currentColor"
            strokeWidth={0}
            aria-hidden
          />
        </div>
      </div>

      <h1 {...line(0.35)}>
        <span className="mb-2 mt-7 block text-[clamp(44px,13vw,96px)] leading-none">
          {wedding.names[0]}
          <span className="mx-2 inline-block align-middle font-script text-[0.8em] font-normal text-gold">
            &amp;
          </span>
          {wedding.names[1]}
        </span>
      </h1>
      <p {...line(0.5)}>
        <span className="eyebrow">{wedding.subtitle}</span>
      </p>
      <p {...line(0.6)}>
        <span className="mb-6 mt-2 block font-serif text-lg font-medium tracking-[0.2em]">
          {wedding.dateLabel}
        </span>
      </p>
      <div {...line(0.75)}>
        <a href="#countdown" className="btn">
          Save the Date
        </a>
      </div>
      <div {...line(0.95)}>
        <p className="mt-7 text-sm tracking-[0.25em] text-moss">SCROLL</p>
        <span className="scroll-cue mx-auto mt-2 block h-[30px] w-px bg-moss" />
      </div>
    </section>
  );
}
