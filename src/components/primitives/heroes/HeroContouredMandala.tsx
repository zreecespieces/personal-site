"use client";

import React from "react";
import { Box } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { SacredGeometry } from "../patterns/SacredGeometry";
import { ContourField } from "../patterns/ContourField";
import type { HeroDiagramProps } from "./types";

/**
 * Hero option 1 — Contoured Mandala.
 *
 * A flower-of-life mandala sitting inside a topographic contour field.
 * Reads as a structured mind on shifting terrain. Most meditative and
 * spiritual of the five options.
 */
export function HeroContouredMandala({
  size = 480,
  accent,
  animate = false,
  sx,
}: HeroDiagramProps) {
  const theme = useTheme();
  const accentColor = accent ?? theme.zr.accent.brass;
  const boneColor = theme.zr.bone[200];

  return (
    <Box
      sx={{
        position: "relative",
        width: size,
        height: size,
        maxWidth: "100%",
        aspectRatio: "1 / 1",
        ...sx,
      }}
    >
      {/* Background contour field — bone, faded */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          color: alpha(boneColor, 0.65),
        }}
      >
        <ContourField
          bands={9}
          width={size}
          height={size}
          opacity={0.35}
          animate={animate}
          peaks={[
            { x: size * 0.5, y: size * 0.5 },
            { x: size * 0.32, y: size * 0.36 },
            { x: size * 0.7, y: size * 0.64 },
          ]}
        />
      </Box>

      {/* Foreground mandala — brass */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: accentColor,
        }}
      >
        <SacredGeometry
          shape="flower-of-life"
          size={size * 0.62}
          strokeWidth={0.9}
          opacity={0.78}
          animate={animate}
        />
      </Box>

      {/* Slow rotation ring — restrained, decorative */}
      <Box
        component="svg"
        viewBox="0 0 100 100"
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          color: accentColor,
          animation: animate ? "zr-mandala-rotate 60s linear infinite" : undefined,
          "@keyframes zr-mandala-rotate": {
            from: { transform: "rotate(0deg)" },
            to: { transform: "rotate(360deg)" },
          },
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.15"
          opacity="0.4"
        />
        {/* Tick marks every 30° */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI) / 6;
          const x1 = 50 + Math.cos(a) * 48;
          const y1 = 50 + Math.sin(a) * 48;
          const x2 = 50 + Math.cos(a) * 46;
          const y2 = 50 + Math.sin(a) * 46;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="0.3"
              opacity={0.5}
            />
          );
        })}
      </Box>
    </Box>
  );
}

export default HeroContouredMandala;
