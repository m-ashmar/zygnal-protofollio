/**
 * Shared timeline for the scroll-driven tower lifecycle.
 * A single normalized progress value p (0..1) maps to 8 ordered phases.
 * Both the 3D scene and the DOM captions read from here so they stay in sync.
 */

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

export const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a || 1e-6));
  return t * t * (3 - 2 * t);
};

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const invLerp = (a: number, b: number, x: number) =>
  clamp01((x - a) / (b - a || 1e-6));

export type PhaseId =
  | "survey"
  | "civil"
  | "tower"
  | "bts"
  | "power"
  | "fiber"
  | "live"
  | "modernize";

export interface PhaseRange {
  id: PhaseId;
  start: number;
  end: number;
}

/** Progress windows for each phase (must stay ordered + contiguous). */
export const PHASES: PhaseRange[] = [
  { id: "survey", start: 0.0, end: 0.1 },
  { id: "civil", start: 0.1, end: 0.24 },
  { id: "tower", start: 0.24, end: 0.46 },
  { id: "bts", start: 0.46, end: 0.6 },
  { id: "power", start: 0.6, end: 0.7 },
  { id: "fiber", start: 0.7, end: 0.8 },
  { id: "live", start: 0.8, end: 0.92 },
  { id: "modernize", start: 0.92, end: 1.0 },
];

export const phaseByIndex = (i: number) => PHASES[i];

/** Index of the phase whose window contains p (clamped to ends). */
export const activePhaseIndex = (p: number) => {
  for (let i = 0; i < PHASES.length; i++) {
    if (p < PHASES[i].end) return i;
  }
  return PHASES.length - 1;
};
