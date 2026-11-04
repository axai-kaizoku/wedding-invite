/** canvas-confetti is imported on demand — never part of first load. */
const COLORS = ["#4A7A68", "#DCEBE3", "#C8923A", "#FFFFFF", "#2F5547"];

export async function heartBurst(
  origin: { x: number; y: number },
  count = 60,
  colors: string[] = COLORS
) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const { default: confetti } = await import("canvas-confetti");
  const heart = confetti.shapeFromPath({
    path: "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z",
  });
  void confetti({
    particleCount: count,
    spread: 360,
    startVelocity: 22,
    gravity: 0.55,
    ticks: 150,
    scalar: 1.1,
    shapes: [heart, "circle"],
    colors,
    origin,
    zIndex: 120,
    disableForReducedMotion: true,
  });
}
