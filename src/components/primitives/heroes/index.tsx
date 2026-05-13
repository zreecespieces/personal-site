"use client";

import React from "react";
import { Box } from "@mui/material";
import HeroContouredMandala from "./HeroContouredMandala";
import HeroTopographicNodeGraph from "./HeroTopographicNodeGraph";
import HeroSacredHexLattice from "./HeroSacredHexLattice";
import HeroConcentricOrbital from "./HeroConcentricOrbital";
import HeroLayeredContourSigil from "./HeroLayeredContourSigil";
import {
  HERO_VARIANTS,
  HERO_VARIANT_LABELS,
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

/**
 * Map a `?hero=1..5` query param value to a variant key. The numbers
 * follow the order in the design doc / roadmap §1.4.
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

/**
 * Small dev-only switcher rendered when the URL carries `?heroNav=1`.
 * Lets us click through the five options without rebuilding.
 */
export function HeroVariantSwitcher({ current }: { current: HeroVariant }) {
  return (
    <Box
      sx={{
        position: "fixed",
        right: 16,
        bottom: 16,
        zIndex: 1300,
        display: "flex",
        gap: 0.5,
        p: 1,
        border: "1px solid rgba(238,229,210,0.18)",
        backgroundColor: "rgba(15,15,13,0.85)",
        backdropFilter: "blur(8px)",
        borderRadius: 1,
        fontFamily: "var(--font-plex-mono)",
        fontSize: "0.65rem",
      }}
    >
      {HERO_VARIANTS.map((v, i) => {
        const isActive = v === current;
        return (
          <Box
            key={v}
            component="a"
            href={`?hero=${i + 1}&heroNav=1`}
            sx={{
              px: 1,
              py: 0.5,
              color: isActive ? "#eee5d2" : "rgba(238,229,210,0.55)",
              textDecoration: "none",
              border: `1px solid ${isActive ? "#c9ad71" : "transparent"}`,
              borderRadius: 1,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {i + 1} · {HERO_VARIANT_LABELS[v].split(" ").slice(-1)[0]}
          </Box>
        );
      })}
    </Box>
  );
}
