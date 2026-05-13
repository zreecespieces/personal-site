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

/**
 * Floating hero variant switcher.
 *
 * Renders on the home page during the iteration phase so each option
 * can be clicked through without rebuilding. Once a hero variant is
 * canonized, this component (and its mount in `src/app/page.tsx`)
 * should be removed.
 */
export function HeroVariantSwitcher({ current }: { current: HeroVariant }) {
  const activeIndex = HERO_VARIANTS.indexOf(current);
  const activeLabel = HERO_VARIANT_LABELS[current];

  return (
    <Box
      sx={{
        position: "fixed",
        right: { xs: 12, md: 20 },
        bottom: { xs: 12, md: 20 },
        zIndex: 1300,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        p: 1.5,
        border: "1px solid rgba(238,229,210,0.22)",
        backgroundColor: "rgba(15,15,13,0.92)",
        backdropFilter: "blur(10px)",
        borderRadius: 1,
        fontFamily: "var(--font-plex-mono)",
        fontSize: "0.65rem",
        minWidth: 200,
        boxShadow: "0 18px 58px rgba(0, 0, 0, 0.36)",
      }}
    >
      {/* Header — what's currently rendered */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          pb: 1,
          borderBottom: "1px solid rgba(238,229,210,0.14)",
        }}
      >
        <Box
          sx={{
            color: "rgba(238,229,210,0.55)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontSize: "0.6rem",
          }}
        >
          Hero
        </Box>
        <Box
          sx={{
            color: "#c9ad71",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontSize: "0.62rem",
          }}
        >
          {String(activeIndex + 1).padStart(2, "0")} · {activeLabel}
        </Box>
      </Box>

      {/* Variant rows */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
        {HERO_VARIANTS.map((v, i) => {
          const isActive = v === current;
          return (
            <Box
              key={v}
              component="a"
              href={`?hero=${i + 1}`}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 1,
                py: 0.6,
                color: isActive ? "#eee5d2" : "rgba(238,229,210,0.65)",
                textDecoration: "none",
                border: `1px solid ${isActive ? "#c9ad71" : "transparent"}`,
                borderRadius: 0.5,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontSize: "0.62rem",
                transition:
                  "background-color 140ms cubic-bezier(0.2, 0, 0, 1), color 140ms cubic-bezier(0.2, 0, 0, 1), border-color 140ms cubic-bezier(0.2, 0, 0, 1)",
                "&:hover": {
                  color: "#eee5d2",
                  backgroundColor: "rgba(238,229,210,0.06)",
                  borderColor: isActive ? "#c9ad71" : "rgba(238,229,210,0.22)",
                },
              }}
            >
              <Box
                aria-hidden
                sx={{
                  width: 10,
                  height: 10,
                  flexShrink: 0,
                  border: `1px solid ${isActive ? "#c9ad71" : "rgba(238,229,210,0.4)"}`,
                  backgroundColor: isActive ? "#c9ad71" : "transparent",
                }}
              />
              <Box component="span" sx={{ color: "rgba(238,229,210,0.45)", fontSize: "0.58rem" }}>
                {String(i + 1).padStart(2, "0")}
              </Box>
              <Box component="span" sx={{ flex: 1 }}>
                {HERO_VARIANT_LABELS[v]}
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Footer hint — replay animation */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          pt: 1,
          borderTop: "1px solid rgba(238,229,210,0.14)",
        }}
      >
        <Box
          sx={{
            color: "rgba(238,229,210,0.4)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontSize: "0.55rem",
          }}
        >
          Tap to switch
        </Box>
        <Box
          component="a"
          href={`?hero=${activeIndex + 1}&replay=${Date.now()}`}
          sx={{
            color: "rgba(238,229,210,0.7)",
            textDecoration: "none",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontSize: "0.55rem",
            border: "1px solid rgba(238,229,210,0.22)",
            borderRadius: 0.5,
            px: 0.75,
            py: 0.25,
            "&:hover": {
              color: "#eee5d2",
              borderColor: "#c9ad71",
            },
          }}
        >
          Replay ↻
        </Box>
      </Box>
    </Box>
  );
}
