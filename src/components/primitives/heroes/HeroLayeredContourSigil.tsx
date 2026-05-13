"use client";

import React from "react";
import { Box } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { Crosshair } from "../Crosshair";
import type { HeroDiagramProps } from "./types";

/**
 * Hero option 5 — Layered Contour Sigil.
 *
 * Three stacked, offset topographic ovals composing a personal sigil /
 * maker's seal. Includes a small crosshair registration mark and mono
 * initials. Smallest footprint and most "artifact" of the five — also
 * doubles as a footer mark, favicon source, and OG image element.
 */
export function HeroLayeredContourSigil({
  size = 320,
  accent,
  animate = false,
  sx,
}: HeroDiagramProps) {
  const theme = useTheme();
  const accentColor = accent ?? theme.zr.accent.brass;
  const boneColor = theme.zr.bone[100];

  // Three offset ovals — each a rotated rounded shape
  const cx = size / 2;
  const cy = size / 2;
  const ovals = [
    { rx: size * 0.4, ry: size * 0.32, rotate: -8, opacity: 0.8 },
    { rx: size * 0.34, ry: size * 0.26, rotate: 6, opacity: 0.6 },
    { rx: size * 0.27, ry: size * 0.2, rotate: -4, opacity: 0.5 },
  ];

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
      <Box
        component="svg"
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          color: accentColor,
        }}
      >
        {/* Outer construction circle */}
        <circle
          cx={cx}
          cy={cy}
          r={size * 0.46}
          fill="none"
          stroke={alpha(boneColor, 0.25)}
          strokeWidth={0.6}
        />
        {ovals.map((o, i) => (
          <g key={i} transform={`rotate(${o.rotate} ${cx} ${cy})`}>
            <ellipse
              cx={cx}
              cy={cy}
              rx={o.rx}
              ry={o.ry}
              fill="none"
              stroke="currentColor"
              strokeWidth={0.95}
              opacity={o.opacity}
              style={
                animate
                  ? {
                      strokeDasharray: 2000,
                      strokeDashoffset: 0,
                      animation: `zr-sigil-draw 2.4s cubic-bezier(0.2, 0, 0, 1) both`,
                      animationDelay: `${i * 180}ms`,
                    }
                  : undefined
              }
            />
          </g>
        ))}

        {/* Inner construction lines — vertical + horizontal axis */}
        <line
          x1={cx}
          y1={cy - size * 0.4}
          x2={cx}
          y2={cy + size * 0.4}
          stroke={alpha(boneColor, 0.25)}
          strokeWidth={0.5}
        />
        <line
          x1={cx - size * 0.4}
          y1={cy}
          x2={cx + size * 0.4}
          y2={cy}
          stroke={alpha(boneColor, 0.25)}
          strokeWidth={0.5}
        />

        {animate && (
          <style>{`@keyframes zr-sigil-draw {
            from { stroke-dashoffset: 2000; opacity: 0; }
            to { stroke-dashoffset: 0; opacity: 1; }
          }`}</style>
        )}
      </Box>

      {/* Center mono initials over the sigil */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <Box
          sx={{
            fontFamily: `var(${theme.zr.cssVars.fontMono})`,
            fontSize: size * 0.075,
            letterSpacing: "0.22em",
            fontWeight: 600,
            color: alpha(boneColor, 0.92),
          }}
        >
          ZR
        </Box>
      </Box>

      {/* Crosshair registration mark — bottom-right */}
      <Box
        sx={{
          position: "absolute",
          right: size * 0.06,
          bottom: size * 0.06,
          color: accentColor,
        }}
      >
        <Crosshair size={size * 0.06} color={accentColor} filled />
      </Box>
    </Box>
  );
}

export default HeroLayeredContourSigil;
