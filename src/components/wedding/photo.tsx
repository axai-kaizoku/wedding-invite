import { photoSrc, type Photo as P } from "@/lib/wedding";

type Props = Omit<P, "w" | "h"> & {
  sizes: string;
  className?: string;
  priority?: boolean;
};

/** Responsive, lazy WebP photo that keeps faces in frame via object-position. */
export function Photo({
  name,
  alt,
  pos,
  sizes,
  className = "",
  priority,
}: Props) {
  return (
    <img
      {...photoSrc(name)}
      sizes={sizes}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      {...({ fetchpriority: priority ? "high" : "auto" } as Record<
        string,
        string
      >)}
      decoding="async"
      style={{ objectPosition: pos }}
      className={`block h-full w-full object-cover ${className}`}
    />
  );
}
