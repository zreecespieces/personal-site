/**
 * Common props for all hero diagram options. Each option is a self-contained
 * SVG composition; the home page swaps between them via the `?hero=N` query
 * param (or a small dev toggle).
 */

export interface HeroDiagramProps {
  /** Outer width in px (also drives intrinsic SVG size). */
  size?: number;
  /** Optional accent color (defaults to brass). */
  accent?: string;
  /** If true, run on-mount draw / rotation animations. */
  animate?: boolean;
  /** Optional label nodes to annotate the diagram (where supported). */
  labels?: string[];
  /** Optional sx forwarded to the wrapping element. */
  sx?: import("@mui/material").BoxProps["sx"];
}

export type HeroVariant = "mandala" | "node-graph" | "hex-lattice" | "orbital" | "sigil";

export const HERO_VARIANTS: readonly HeroVariant[] = [
  "mandala",
  "node-graph",
  "hex-lattice",
  "orbital",
  "sigil",
] as const;

export const HERO_VARIANT_LABELS: Record<HeroVariant, string> = {
  mandala: "Contoured Mandala",
  "node-graph": "Topographic Node Graph",
  "hex-lattice": "Sacred Hex Lattice",
  orbital: "Concentric Orbital",
  sigil: "Layered Contour Sigil",
};

/**
 * Map a `?hero=1..5` query param value to a variant key. The numbers
 * follow the order in the design doc / roadmap §1.4.
 *
 * Lives in `types.ts` (no `"use client"` directive) so server components
 * — including the home page that reads `searchParams` — can call it.
 */
export function resolveHeroVariant(input?: string | string[] | null): HeroVariant {
  const raw = Array.isArray(input) ? input[0] : input;
  if (!raw) return "node-graph"; // Default — the strongest resume handshake
  const n = Number(raw);
  if (!Number.isNaN(n)) {
    const byNum = ["mandala", "node-graph", "hex-lattice", "orbital", "sigil"] as const;
    if (n >= 1 && n <= byNum.length) return byNum[n - 1];
  }
  if ((HERO_VARIANTS as readonly string[]).includes(raw)) return raw as HeroVariant;
  return "node-graph";
}
