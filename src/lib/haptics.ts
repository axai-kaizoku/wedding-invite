/**
 * Lazy haptics: the web-haptics module is only imported on the first tap,
 * so it never sits in the initial bundle.
 */
type Pattern = { duration: number; delay?: number; intensity?: number }[];

let inst: Promise<{
  trigger: (p: Pattern, o?: { intensity?: number }) => Promise<void>;
} | null> | null = null;

function get() {
  inst ??= import("web-haptics")
    .then(({ WebHaptics }) =>
      WebHaptics.isSupported ? new WebHaptics() : null
    )
    .catch(() => null);
  return inst;
}

function fire(p: Pattern, intensity?: number) {
  void get().then((h) =>
    h?.trigger(p, intensity ? { intensity } : undefined).catch(() => undefined)
  );
}

let lastTick = 0;

export const haptics = {
  /** very light tick, throttled so fast scrolling never buzzes continuously */
  tick: () => {
    const now = Date.now();
    if (now - lastTick < 700) return;
    lastTick = now;
    fire([{ duration: 12 }], 0.35);
  },
  tap: () => fire([{ duration: 20 }]),
  open: () =>
    fire([{ duration: 40 }, { delay: 80, duration: 120, intensity: 1 }]),
  celebrate: () => fire([{ duration: 500 }], 0.6),
};
