import { Flower2, Heart, PartyPopper, Sun } from "lucide-react";
import { wedding } from "@/lib/wedding";
import { SectionHeading } from "./ornaments";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Mehndi: Flower2,
  Haldi: Sun,
  Wedding: Heart,
  Reception: PartyPopper,
};

export function Events() {
  return (
    <section className="section">
      <SectionHeading eyebrow="How it unfolds" title="The Celebrations" />
      <div className="relative pl-[56px] text-left">
        <div className="absolute bottom-2 left-[21px] top-2 border-l-2 border-dotted border-sage/40" />
        <div className="tl-fill absolute bottom-2 left-[20px] top-2 w-1 rounded bg-gradient-to-b from-sage to-gold/70" />
        {wedding.events.map((e, i) => {
          const Icon = ICONS[e.name] ?? Heart;
          return (
            <div
              key={e.name}
              data-reveal="right"
              className="card relative mb-[18px]"
            >
              <span className="absolute -left-[56px] top-3.5 grid h-11 w-11 place-items-center rounded-full bg-sage text-white ring-4 ring-ivory">
                <Icon className="h-5 w-5" />
                <span className="sr-only">{i + 1}</span>
              </span>
              <p className="text-sm font-medium tracking-[0.2em] text-sage">
                0{i + 1}
              </p>
              <h3 className="text-[28px] leading-tight">{e.name}</h3>
              <p className="mt-1">
                {e.date} · {e.day}
                <br />
                {e.time}
                <br />
                {e.venue}
                <br />
                <span className="text-moss">
                  Dress code: {e.dressCode ?? wedding.dressCode}
                </span>
              </p>
              <a
                href={wedding.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center font-medium text-sage underline-offset-4 hover:underline"
              >
                Get Directions →
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
