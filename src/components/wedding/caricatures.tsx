/**
 * Caricature heads drawn once as SVG symbols and reused for the couple cards
 * and the footer illustration.
 * TODO: tune skin tone / hair / jewellery to match the couple's photos.
 */
export function CaricatureDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        {/* Groom: turban (safa), side parting, warm smile */}
        <symbol id="head-groom" viewBox="0 0 100 110">
          <path
            d="M20 38 Q50 -6 80 38 L80 46 H20Z"
            fill="#F1E4CF"
            stroke="#D9C3A0"
          />
          <path
            d="M60 8 Q82 0 84 20 Q70 14 60 8Z"
            fill="#F1E4CF"
            stroke="#D9C3A0"
          />
          <circle cx="50" cy="36" r="4" fill="#C8923A" />
          <ellipse cx="50" cy="66" rx="30" ry="34" fill="#C48A5E" />
          <path
            d="M33 52 Q38 49 43 52M57 52 Q62 49 67 52"
            stroke="#2B1B14"
            strokeWidth="2.5"
            fill="none"
          />
          <ellipse cx="38" cy="62" rx="3.5" ry="4.5" fill="#2B1B14" />
          <ellipse cx="62" cy="62" rx="3.5" ry="4.5" fill="#2B1B14" />
          <path
            d="M40 76 Q50 72 60 76"
            stroke="#2B1B14"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M42 81 Q50 88 58 81"
            stroke="#8A4A3A"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <ellipse cx="32" cy="74" rx="5" ry="3" fill="#D98C8C" opacity=".35" />
          <ellipse cx="68" cy="74" rx="5" ry="3" fill="#D98C8C" opacity=".35" />
        </symbol>
        {/* Bride: red dupatta with gold border, bindi, nose pin, jhumkas */}
        <symbol id="head-bride" viewBox="0 0 100 110">
          <path d="M12 96 Q4 40 50 12 Q96 40 88 96Z" fill="#C2264A" />
          <path
            d="M12 96 Q4 40 50 12 Q96 40 88 96"
            fill="none"
            stroke="#C8923A"
            strokeWidth="3"
          />
          <ellipse cx="50" cy="64" rx="29" ry="32" fill="#D2976B" />
          <path
            d="M21 56 Q50 10 79 56 Q60 34 50 34 Q40 34 21 56Z"
            fill="#2B1B14"
          />
          <path d="M50 34 V44" stroke="#C8923A" strokeWidth="2" />
          <circle cx="50" cy="46" r="3" fill="#C8283A" />
          <path
            d="M33 53 Q38 50 43 53M57 53 Q62 50 67 53"
            stroke="#2B1B14"
            strokeWidth="2.2"
            fill="none"
          />
          <ellipse cx="38" cy="62" rx="3.5" ry="4.5" fill="#2B1B14" />
          <ellipse cx="62" cy="62" rx="3.5" ry="4.5" fill="#2B1B14" />
          <path
            d="M41 78 Q50 87 59 78"
            stroke="#C2264A"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="44" cy="71" r="1.8" fill="#C8923A" />
          <circle cx="21" cy="72" r="4" fill="#C8923A" />
          <circle cx="79" cy="72" r="4" fill="#C8923A" />
          <ellipse cx="32" cy="74" rx="5" ry="3" fill="#D98C8C" opacity=".4" />
          <ellipse cx="68" cy="74" rx="5" ry="3" fill="#D98C8C" opacity=".4" />
        </symbol>
      </defs>
    </svg>
  );
}

export function Head({
  who,
  label,
}: {
  who: "groom" | "bride";
  label: string;
}) {
  return (
    <svg
      viewBox="0 0 100 110"
      role="img"
      aria-label={label}
      className="mx-auto h-auto w-full max-w-[150px]"
    >
      <use href={`#head-${who}`} />
    </svg>
  );
}

export function CoupleIllustration({ label }: { label: string }) {
  return (
    <svg
      viewBox="0 0 260 300"
      role="img"
      aria-label={label}
      className="mx-auto h-auto w-[min(260px,70%)]"
    >
      <path d="M40 150 H110 L120 290 H30Z" fill="#F1E4CF" stroke="#D9C3A0" />
      <path
        d="M75 150 V290"
        stroke="#C8923A"
        strokeWidth="2"
        strokeDasharray="2 8"
      />
      <path d="M150 150 H210 L250 290 H120Z" fill="#C2264A" />
      <path d="M150 290 L200 160" stroke="#C8923A" strokeWidth="3" />
      <path
        d="M110 200 Q130 215 150 200"
        stroke="#C8923A"
        strokeWidth="3"
        fill="none"
      />
      <use href="#head-groom" x="20" y="45" width="110" height="121" />
      <use href="#head-bride" x="130" y="45" width="110" height="121" />
    </svg>
  );
}
