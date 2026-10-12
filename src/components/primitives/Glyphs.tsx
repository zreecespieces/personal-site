"use client";

import React from "react";
import { Box } from "@mui/material";

export type GlyphName =
  | "node"
  | "compass"
  | "mountain"
  | "page"
  | "drawer"
  | "bracket"
  | "knot"
  | "hex"
  | "spiral"
  | "cap";

export interface GlyphProps {
  name: GlyphName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  sx?: React.ComponentProps<typeof Box>["sx"];
  label?: string;
}

/**
 * Hand-authored line glyphs used as section markers, list bullets, and
 * iconography accents throughout the site. Every glyph is normalized to a
 * 24×24 viewBox with a 1px nominal stroke so they can be sized freely
 * without losing crispness. Color defaults to `currentColor`.
 */
export function Glyph({ name, size = 18, color, strokeWidth = 1.25, sx, label }: GlyphProps) {
  const stroke = color ?? "currentColor";
  const common = {
    fill: "none",
    stroke,
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <Box
      component="svg"
      viewBox="0 0 24 24"
      role={label ? "img" : "presentation"}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      sx={{
        width: size,
        height: size,
        display: "block",
        color: stroke,
        flexShrink: 0,
        ...sx,
      }}
    >
      {renderGlyph(name, common)}
    </Box>
  );
}

// `common` is forwarded onto whatever SVG element each glyph uses, so a
// permissive type avoids forcing every renderer into the same element.
type CommonSvgProps = React.SVGAttributes<SVGElement>;
function renderGlyph(name: GlyphName, common: CommonSvgProps) {
  switch (name) {
    case "node":
      // Node-and-edge mark — two satellites orbiting a center
      return (
        <>
          <circle cx="12" cy="12" r="3" {...common} />
          <circle cx="4" cy="12" r="1.4" {...common} />
          <circle cx="20" cy="12" r="1.4" {...common} />
          <line x1="6.5" y1="12" x2="9" y2="12" {...common} />
          <line x1="15" y1="12" x2="17.5" y2="12" {...common} />
        </>
      );
    case "compass":
      // Compass / coordinate marker
      return (
        <>
          <circle cx="12" cy="12" r="9" {...common} />
          <polygon points="12,5 14.5,12 12,19 9.5,12" {...common} />
          <circle cx="12" cy="12" r="0.8" fill={common.stroke as string} />
        </>
      );
    case "mountain":
      // Layered mountain polygon — Disciplines / Hobbies family
      return (
        <>
          <polyline points="2,19 8,9 12,15 16,7 22,19" {...common} />
          <polyline points="2,19 22,19" {...common} opacity={0.45} />
        </>
      );
    case "page":
      // Folded page / sheet — Field Notes / Learning family
      return (
        <>
          <path d="M5 3.5 H14.5 L19 8 V20.5 H5 Z" {...common} />
          <path d="M14.5 3.5 V8 H19" {...common} />
          <line x1="8" y1="12" x2="16" y2="12" {...common} opacity={0.6} />
          <line x1="8" y1="15.5" x2="14" y2="15.5" {...common} opacity={0.6} />
        </>
      );
    case "drawer":
      // Archive drawer / index card
      return (
        <>
          <rect x="3.5" y="6" width="17" height="12" rx="0.5" {...common} />
          <line x1="3.5" y1="11" x2="20.5" y2="11" {...common} opacity={0.6} />
          <line x1="10.5" y1="14.5" x2="13.5" y2="14.5" {...common} />
        </>
      );
    case "bracket":
      // Terminal prompt — Systems Built family
      return (
        <>
          <polyline points="6,7 3,12 6,17" {...common} />
          <polyline points="18,7 21,12 18,17" {...common} />
          <line x1="10" y1="18" x2="14" y2="6" {...common} opacity={0.6} />
        </>
      );
    case "knot":
      // Grappling loop — judo / BJJ accent
      return (
        <>
          <path d="M7 8 C 7 4, 17 4, 17 8 C 17 12, 7 12, 7 16 C 7 20, 17 20, 17 16" {...common} />
        </>
      );
    case "hex":
      // Honeycomb / hexagon — tattoo motif tie-in
      return (
        <>
          <polygon points="12,3 20,7.5 20,16.5 12,21 4,16.5 4,7.5" {...common} />
        </>
      );
    case "spiral":
      // Sacred-geometry inspired spiral — research / philosophy accent
      return (
        <path
          d="M12 12 m -0.5 0 a 0.5 0.5 0 1 1 1 0 a 1.5 1.5 0 1 1 -3 0 a 3 3 0 1 1 6 0 a 5 5 0 1 1 -10 0"
          {...common}
        />
      );
    case "cap":
      // Graduation mortarboard — Education family
      return (
        <>
          {/* Mortarboard rhombus (top of cap in 3/4 perspective) */}
          <path d="M 12 5 L 21.5 9.5 L 12 14 L 2.5 9.5 Z" {...common} />
          {/* Center button on top of the board */}
          <circle cx="12" cy="9.5" r="0.8" fill={common.stroke as string} />
          {/* Tassel hanging from the right corner */}
          <path d="M 21.5 9.5 L 21.5 17" {...common} opacity={0.9} />
          <circle cx="21.5" cy="17.6" r="0.9" fill={common.stroke as string} />
        </>
      );
  }
}

export default Glyph;
