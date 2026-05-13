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
