"use client";

import React, { useMemo } from "react";
import { Box } from "@mui/material";

export interface SuminagashiProps {
  /** Number of flowing strokes. */
  strokes?: number;
  /** Width in user units. */
  width?: number;
  /** Height in user units. */
  height?: number;
  /** Stroke color (uses currentColor by default). */
  color?: string;
  /** Stroke opacity for the topmost line. */
  opacity?: number;
  /** Base stroke width. */
  strokeWidth?: number;
  /** Vertical spacing between strokes as a fraction of height. */
  spacing?: number;
  /** Seed value to vary the procedural curves. */
  seed?: number;
  sx?: React.ComponentProps<typeof Box>["sx"];
}

/**
 * Suminagashi-inspired flowing line texture. A stack of long horizontal
 * curves with small per-stroke variation in amplitude, period, and phase —
 * evokes the marbled-water motif from Zachary's tattoo while staying
 * within the editorial line-work vocabulary of the redesign.
 *
 * Useful as a section divider, a background layer behind the portrait,
 * or an alternative to the construction grid on dedicated pages.
 */
export function Suminagashi({
  strokes = 14,
  width = 800,
  height = 200,
  color = "currentColor",
  opacity = 0.35,
  strokeWidth = 0.85,
  spacing = 0.07,
  seed = 1,
  sx,
}: SuminagashiProps) {
  const paths = useMemo(
    () => buildSuminagashiPaths({ strokes, width, height, spacing, seed }),
    [strokes, width, height, spacing, seed]
  );

  return (
    <Box
      component="svg"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      sx={{
        display: "block",
        color,
        ...sx,
      }}
    >
      {paths.map((d, i) => {
        const fade = 1 - i / Math.max(strokes - 1, 1);
        return (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            opacity={opacity * (0.3 + 0.7 * fade)}
            strokeLinecap="round"
          />
        );
      })}
    </Box>
  );
}

function buildSuminagashiPaths({
  strokes,
  width,
  height,
  spacing,
  seed,
}: {
  strokes: number;
  width: number;
  height: number;
  spacing: number;
  seed: number;
}): string[] {
  const samples = 80;
  const dx = width / (samples - 1);
  const paths: string[] = [];

  for (let s = 0; s < strokes; s++) {
    const t = s / Math.max(strokes - 1, 1);
    const baseY = height * (0.5 + (t - 0.5) * spacing * strokes);
    // Deterministic per-stroke parameters seeded by `seed`
    const amp = 4 + ((s * 7 + seed * 13) % 9);
    const freq = 1.3 + ((s * 0.21 + seed * 0.13) % 1.4);
    const phase = (s * 1.1 + seed * 0.77) % (Math.PI * 2);
    const noiseAmp = 1.4 + (s % 3);

    let d = "";
    for (let i = 0; i < samples; i++) {
      const x = i * dx;
      const u = i / (samples - 1);
      // Compound sine: low-frequency wave + smaller noise oscillation
      const y =
        baseY +
        Math.sin(u * Math.PI * freq * 2 + phase) * amp +
        Math.sin(u * Math.PI * freq * 5.7 + phase * 1.4) * noiseAmp * 0.4;
      d += i === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
    }
    paths.push(d);
  }
  return paths;
}

export default Suminagashi;
