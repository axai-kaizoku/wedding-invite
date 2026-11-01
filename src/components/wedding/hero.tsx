import { Heart } from "lucide-react";
import { wedding } from "@/lib/wedding";
import { Palace } from "./ornaments";

/** Server component — painted instantly; entrance is CSS gated on html.opened. */
export function Hero() {
  const line = (d: number) => ({
    className: "hero-line",
    style: { "--d": `${d}s` } as React.CSSProperties,
  });
  return (
    <section
      id="hero"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_20%,#FBDCE0_0%,#FFF0EE_45%,#FFF5F3_80%)] px-5 pb-10 pt-[calc(60px+env(safe-area-inset-top))] text-center"
    >
      <div className="hero-parallax absolute inset-x-0 bottom-0 h-[34%] opacity-60 md:h-[45%]">
        <Palace className="h-full w-full" />
      </div>

      <div className="relative">
        <p {...line(0.1)}>
          <span className="font-serif text-[22px] italic text-mauve">
            {wedding.blessing}
          </span>
        </p>
        <h1 {...line(0.3)}>
          <span className="my-3.5 block text-[clamp(46px,15vw,104px)] leading-none">
            {wedding.names[0]}
            <span className="mx-2 inline-block align-middle font-script text-[0.8em] font-normal text-rose">
              &amp;
            </span>
            {wedding.names[1]}
          </span>
        </h1>
        <div {...line(0.5)}>
          <Heart
            className="beat mx-auto mb-3 h-7 w-7 text-rose"
            fill="currentColor"
            strokeWidth={0}
            aria-hidden
          />
          <p className="eyebrow">{wedding.subtitle}</p>
        </div>
        <p {...line(0.65)}>
          <span className="mb-7 mt-2.5 block font-serif text-lg font-medium tracking-[0.2em]">
            {wedding.dateLabel}
          </span>
        </p>
        <div {...line(0.8)}>
          <a href="#countdown" className="btn">
            Save the Date
          </a>
        </div>
        <div {...line(1)}>
          <p className="mt-9 text-sm tracking-[0.25em] text-mauve">SCROLL</p>
          <span className="scroll-cue mx-auto mt-2 block h-[34px] w-px bg-mauve" />
        </div>
      </div>
    </section>
  );
}
