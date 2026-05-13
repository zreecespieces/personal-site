"use client";

import React, { useId } from "react";
import { Box } from "@mui/material";

export interface HoneycombProps {
  /** Hex side length in user units. */
  cellSize?: number;
  /** Stroke color. */
  color?: string;
  /** Stroke width. */
  strokeWidth?: number;
  /** Stroke opacity. */
  opacity?: number;
  /** Total width / height in px when rendered standalone. */
  width?: number | string;
  height?: number | string;
  /** Optional radial mask fade — useful when used as a background tile. */
  fade?: boolean;
  sx?: React.ComponentProps<typeof Box>["sx"];
}

/**
 * Honeycomb / hexagonal lattice. Used both as a decorative background
 * tile and as a glyph anchor for the home hero. Built as an SVG
 * `<pattern>` so it tiles efficiently at any size; the optional `fade`
 * prop applies a radial mask so it dissolves into the page.
 *
 * Sourced from Zachary's geometric arm-sleeve honeycomb motif —
 * recreated in code per the roadmap §1.4 v1 policy.
 */
export function Honeycomb({
  cellSize = 14,
  color = "currentColor",
  strokeWidth = 0.9,
  opacity = 0.35,
  width = "100%",
  height = "100%",
  fade = false,
  sx,
}: HoneycombProps) {
  const id = useId().replace(/:/g, "");
  const patternId = `zr-hex-${id}`;
  const maskId = `zr-hex-mask-${id}`;

  // Hex geometry — flat-top orientation.
  const s = cellSize;
  const w = s * Math.sqrt(3);
  const h = s * 2;
  const patternWidth = w;
  const patternHeight = h * 0.75;

  // Single hexagon path centered in the tile
  const hexPath = `M ${w / 2},0 L ${w},${s / 2} L ${w},${s * 1.5} L ${w / 2},${s * 2} L 0,${s * 1.5} L 0,${s / 2} Z`;

  return (
    <Box
      component="svg"
      width={width}
      height={height}
      aria-hidden="true"
      sx={{
        display: "block",
        color,
        ...sx,
      }}
    >
      <defs>
        <pattern
          id={patternId}
          width={patternWidth}
          height={patternHeight}
          patternUnits="userSpaceOnUse"
        >
          <path d={hexPath} fill="none" stroke={color} strokeWidth={strokeWidth} />
          {/* Offset row so cells interlock */}
          <path
            d={hexPath}
            transform={`translate(${w / 2}, ${patternHeight})`}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
          />
        </pattern>
        {fade && (
          <radialGradient id={maskId} cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        )}
        {fade && (
          <mask id={`${maskId}-applied`}>
            <rect width="100%" height="100%" fill={`url(#${maskId})`} />
          </mask>
        )}
      </defs>
      <rect
        width="100%"
        height="100%"
        fill={`url(#${patternId})`}
        opacity={opacity}
        mask={fade ? `url(#${maskId}-applied)` : undefined}
      />
    </Box>
  );
}

export default Honeycomb;
