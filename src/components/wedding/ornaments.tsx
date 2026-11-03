import { wedding } from "@/lib/wedding";

export function Divider() {
  return (
    <svg
      className="mx-auto mb-7 mt-2.5 block h-3.5 w-[120px]"
      viewBox="0 0 120 14"
      aria-hidden="true"
    >
      <path d="M0 7H46M74 7H120" stroke="#4A7A68" strokeOpacity=".5" />
      <path
        d="M60 13C55 9 51 6.5 51 4a3 3 0 0 1 6-1q1.5 1.6 3 3 1.5-1.4 3-3a3 3 0 0 1 6 1c0 2.5-4 5-9 9z"
        fill="#4A7A68"
      />
    </svg>
  );
}

export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div data-reveal="" data-haptic="">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mb-1 mt-1.5 text-[clamp(32px,8vw,46px)] leading-tight">
        {title}
      </h2>
      <Divider />
    </div>
  );
}
