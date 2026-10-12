"use client";

import React from "react";
import HeroContouredMandala from "./HeroContouredMandala";
import HeroTopographicNodeGraph from "./HeroTopographicNodeGraph";
import HeroSacredHexLattice from "./HeroSacredHexLattice";
import HeroConcentricOrbital from "./HeroConcentricOrbital";
import HeroLayeredContourSigil from "./HeroLayeredContourSigil";
import {
  HERO_VARIANTS,
  HERO_VARIANT_LABELS,
  resolveHeroVariant,
  type HeroDiagramProps,
  type HeroVariant,
} from "./types";

export {
  HeroContouredMandala,
  HeroTopographicNodeGraph,
  HeroSacredHexLattice,
  HeroConcentricOrbital,
  HeroLayeredContourSigil,
  HERO_VARIANTS,
  HERO_VARIANT_LABELS,
  resolveHeroVariant,
};
export type { HeroDiagramProps, HeroVariant };

export interface HeroDiagramProps2 extends HeroDiagramProps {
  variant: HeroVariant;
}

/**
 * Renders one of the five hero diagram options. Used by the home page
 * with a `?hero=N` query param (and/or a dev toggle) so options can be
 * compared on the live site without rebuilds.
 */
export function HeroDiagram({ variant, ...rest }: HeroDiagramProps2) {
  switch (variant) {
    case "mandala":
      return <HeroContouredMandala {...rest} />;
    case "node-graph":
      return <HeroTopographicNodeGraph {...rest} />;
    case "hex-lattice":
      return <HeroSacredHexLattice {...rest} />;
    case "orbital":
      return <HeroConcentricOrbital {...rest} />;
    case "sigil":
      return <HeroLayeredContourSigil {...rest} />;
  }
}
