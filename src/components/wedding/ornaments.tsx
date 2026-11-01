import { wedding } from "@/lib/wedding";

export function Divider() {
  return (
    <svg
      className="mx-auto mb-7 mt-2.5 block h-3.5 w-[120px]"
      viewBox="0 0 120 14"
      aria-hidden="true"
    >
      <path d="M0 7H46M74 7H120" stroke="#D94F70" strokeOpacity=".5" />
      <path
        d="M60 13C55 9 51 6.5 51 4a3 3 0 0 1 6-1q1.5 1.6 3 3 1.5-1.4 3-3a3 3 0 0 1 6 1c0 2.5-4 5-9 9z"
        fill="#D94F70"
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

/** Palace silhouette used behind the hero (parallax layer). */
export function Palace(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 400 200"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
      {...props}
    >
      <g fill="#E7B3BC">
        <rect x="120" y="70" width="160" height="130" />
        <path d="M150 70 Q200 0 250 70Z" />
        <rect x="60" y="100" width="46" height="100" />
        <path d="M60 100 Q83 60 106 100Z" />
        <rect x="294" y="100" width="46" height="100" />
        <path d="M294 100 Q317 60 340 100Z" />
        <rect x="20" y="140" width="30" height="60" />
        <path d="M20 140 Q35 115 50 140Z" />
        <rect x="350" y="140" width="30" height="60" />
        <path d="M350 140 Q365 115 380 140Z" />
      </g>
      <g fill="#FBE3E4">
        <path d="M180 200 V150 Q200 120 220 150 V200Z" />
        <path d="M135 200 V140 Q148 120 160 140 V200Z" />
        <path d="M240 200 V140 Q252 120 265 140 V200Z" />
        <path d="M73 200 V160 Q83 145 93 160 V200Z" />
        <path d="M307 200 V160 Q317 145 327 160 V200Z" />
      </g>
    </svg>
  );
}

/** Hand-drawn style map card art. */
export function MapArt() {
  return (
    <svg
      viewBox="0 0 400 220"
      className="block h-auto w-full"
      aria-hidden="true"
    >
      <rect width="400" height="220" fill="#FCE9EA" />
      <path
        d="M-10 150 Q120 110 200 140 T410 90"
        stroke="#fff"
        strokeWidth="16"
        fill="none"
      />
      <path
        d="M90 -10 Q130 100 110 230"
        stroke="#fff"
        strokeWidth="12"
        fill="none"
      />
      <path
        d="M300 -10 Q260 90 330 230"
        stroke="#F1D3D6"
        strokeWidth="9"
        fill="none"
      />
      <path
        d="M240 20 Q300 40 380 20V60Q300 80 240 60Z"
        fill="#CFE0D0"
        opacity=".7"
      />
      <circle cx="40" cy="40" r="18" fill="#CFE0D0" opacity=".6" />
      <path
        d="M200 70a16 16 0 0 1 16 16c0 14-16 32-16 32s-16-18-16-32a16 16 0 0 1 16-16z"
        fill="#D94F70"
      />
      <circle cx="200" cy="86" r="6" fill="#FFF3E6" />
      <text
        x="200"
        y="150"
        textAnchor="middle"
        fontFamily="Cormorant Garamond,serif"
        fontSize="22"
        fill="#4B1D2B"
      >
        {wedding.venueName}
      </text>
    </svg>
  );
}
