import {
  generateSplashConfig,
  mergeSplashConfig,
  themeSplashColors,
  type WatercolorSplashConfig,
} from "./watercolorSplash";

/** Recommended max splash slots for live app shells (Tauri / mobile webviews). */
export const MAX_ATMOSPHERE_SPLASHES = 8;

export type AtmosphereSplashSlot = {
  slotIndex: number;
  config: WatercolorSplashConfig;
  /** Viewport position, percent 0-100 */
  topPct: number;
  leftPct: number;
  /** Render size in CSS pixels */
  sizePx: number;
  rotation: number;
  zIndex: number;
  /** Stagger CSS animation delay (seconds) */
  driftPhase: number;
};

export type AtmospherePlan = {
  baseSeed: number;
  slots: AtmosphereSplashSlot[];
};

export type PlanAtmosphereSplashesOptions = {
  baseSeed: number;
  /** Default 8; clamped to 1–MAX_ATMOSPHERE_SPLASHES */
  count?: number;
  /** Bias splashes toward edges vs uniform scatter */
  viewportBias?: "corners" | "even";
};

function mulberry32(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function slotSeed(baseSeed: number, slotIndex: number, tick = 0) {
  return (baseSeed + slotIndex * 7919 + tick * 104729) >>> 0;
}

function placeSplash(
  rng: () => number,
  bias: "corners" | "even",
): { topPct: number; leftPct: number } {
  if (bias === "corners") {
    const corner = Math.floor(rng() * 4);
    const inset = lerp(4, 18, rng());
    switch (corner) {
      case 0:
        return { topPct: inset, leftPct: inset + rng() * 12 };
      case 1:
        return { topPct: inset, leftPct: 100 - inset - rng() * 12 };
      case 2:
        return {
          topPct: 100 - inset - rng() * 12,
          leftPct: inset + rng() * 10,
        };
      default:
        return {
          topPct: 100 - inset - rng() * 12,
          leftPct: 100 - inset - rng() * 10,
        };
    }
  }
  return {
    topPct: lerp(8, 78, rng()),
    leftPct: lerp(6, 82, rng()),
  };
}

function buildSlot(
  baseSeed: number,
  slotIndex: number,
  tick: number,
  bias: "corners" | "even",
): AtmosphereSplashSlot {
  const seed = slotSeed(baseSeed, slotIndex, tick);
  const rng = mulberry32(seed);
  const base = generateSplashConfig(seed);
  const colors = themeSplashColors(3);
  const config = mergeSplashConfig(base, {
    colors,
    opacity: lerp(0.32, 0.58, rng()),
    blur: lerp(12, 32, rng()),
    spread: lerp(0.85, 1.25, rng()),
    size: lerp(160, 360, rng()),
  });
  const { topPct, leftPct } = placeSplash(rng, bias);
  const sizePx = clamp(Math.round(lerp(140, 380, rng())), 100, 420);

  return {
    slotIndex,
    config,
    topPct,
    leftPct,
    sizePx,
    rotation: config.rotation,
    zIndex: slotIndex + 1,
    driftPhase: lerp(0, 18, rng()),
  };
}

/**
 * Stable integer seed from a bundle id or app name (FNV-1a 32-bit).
 */
export function hashAtmosphereSeed(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function planAtmosphereSplashes(
  options: PlanAtmosphereSplashesOptions,
): AtmospherePlan {
  const count = clamp(
    Math.floor(options.count ?? MAX_ATMOSPHERE_SPLASHES),
    1,
    MAX_ATMOSPHERE_SPLASHES,
  );
  const bias = options.viewportBias ?? "corners";
  const slots: AtmosphereSplashSlot[] = [];
  for (let i = 0; i < count; i += 1) {
    slots.push(buildSlot(options.baseSeed, i, 0, bias));
  }
  return { baseSeed: options.baseSeed, slots };
}

/**
 * Regenerate one slot for animation ticks (crossfade to new shape/position).
 */
export function nextSplashTick(
  plan: AtmospherePlan,
  slotIndex: number,
  tickSeed: number,
  viewportBias: "corners" | "even" = "corners",
): AtmospherePlan {
  const index = clamp(slotIndex, 0, plan.slots.length - 1);
  const next = buildSlot(plan.baseSeed, index, tickSeed, viewportBias);
  const slots = plan.slots.map((slot, i) => (i === index ? next : slot));
  return { baseSeed: plan.baseSeed, slots };
}

/**
 * Refresh pigment-linked colors on every slot without changing layout seeds.
 */
export function refreshAtmosphereThemeColors(
  plan: AtmospherePlan,
): AtmospherePlan {
  const colors = themeSplashColors(3);
  const slots = plan.slots.map((slot) => ({
    ...slot,
    config: mergeSplashConfig(slot.config, { colors }),
  }));
  return { ...plan, slots };
}
