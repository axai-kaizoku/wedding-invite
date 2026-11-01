import { coupleTitle, wedding } from "@/lib/wedding";
import { Head } from "./caricatures";
import { SectionHeading } from "./ornaments";

export function Couple() {
  const people = [
    { role: "The Groom", who: "groom" as const, ...wedding.groom },
    { role: "The Bride", who: "bride" as const, ...wedding.bride },
  ];
  return (
    <section className="section">
      <SectionHeading eyebrow="The Two of Them" title={coupleTitle} />
      <div className="grid grid-cols-2 gap-3.5">
        {people.map((p, i) => (
          <div
            key={p.who}
            data-reveal={i ? "right" : "left"}
            className="card transition-transform duration-300 hover:-translate-y-1.5"
          >
            <p className="eyebrow !tracking-[0.2em]">{p.role}</p>
            <Head who={p.who} label={`Caricature of ${p.name}`} />
            <h3 className="text-3xl">{p.name}</h3>
            {p.bio && <p className="text-mauve">{p.bio}</p>}
          </div>
        ))}
      </div>
      <Heartbeat />
    </section>
  );
}

/** ECG-style line that draws itself into a heart when it scrolls in. */
function Heartbeat() {
  return (
    <div data-reveal="" className="mx-auto mt-10 max-w-md">
      <svg viewBox="0 0 320 60" className="ecg h-14 w-full" aria-hidden="true">
        <path
          pathLength={1}
          d="M0 34H110l10-18 12 34 10-26 8 10h10c-6-6-12-10-12-16a7 7 0 0 1 14-2q2 3 4 5 2-2 4-5a7 7 0 0 1 14 2c0 6-6 10-12 16h10l8-10 10 26 12-34 10 18H320"
          fill="none"
          stroke="#D94F70"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="font-script text-3xl text-rose">Two hearts, one beat</p>
    </div>
  );
}
