"use client";

import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import type { HeroDiagramProps } from "./types";

/**
 * Hero option 3 — Sacred Hex Lattice with Contour Bleed.
 *
 * A honeycomb lattice of varying density. Some cells are empty, some
 * carry small nested hexes, and some contain fragments of topographic
 * contour lines — like a geological core sample seen through a
 * honeycomb lens. Densest and most brutalist of the five.
 */
export function HeroSacredHexLattice({
  size = 520,
  accent,
  animate = false,
  sx,
}: HeroDiagramProps) {
  const theme = useTheme();
  const accentColor = accent ?? theme.zr.accent.brass;
  const boneColor = theme.zr.bone[200];

  const cells = useMemo(() => buildLattice(size), [size]);

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
        <defs>
          <radialGradient id="zr-hex-mask" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="zr-hex-mask-applied">
            <rect width="100%" height="100%" fill="url(#zr-hex-mask)" />
          </mask>
        </defs>
        <g mask="url(#zr-hex-mask-applied)">
          {cells.map((cell, i) => (
            <g
              key={i}
              opacity={cell.opacity}
              style={
                animate
                  ? {
                      animation: `zr-hex-in ${600 + (i % 30) * 35}ms cubic-bezier(0.2, 0, 0, 1) both`,
                      animationDelay: `${(i % 20) * 30}ms`,
                    }
                  : undefined
              }
            >
              {/* Hexagon outline */}
              <polygon
                points={hexPoints(cell.cx, cell.cy, cell.r)}
                fill="none"
                stroke={cell.contour ? alpha(boneColor, 0.45) : "currentColor"}
                strokeWidth={0.7}
              />
              {/* Nested inner hex (some cells) */}
              {cell.nested && (
                <polygon
                  points={hexPoints(cell.cx, cell.cy, cell.r * 0.55)}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={0.5}
                  opacity={0.7}
                />
              )}
              {/* Contour fragment (some cells) */}
              {cell.contour && (
                <path
                  d={contourFragment(cell.cx, cell.cy, cell.r)}
                  fill="none"
                  stroke={alpha(boneColor, 0.85)}
                  strokeWidth={0.55}
                />
              )}
              {/* Filled core (some cells) */}
              {cell.filled && (
                <circle cx={cell.cx} cy={cell.cy} r={cell.r * 0.18} fill="currentColor" />
              )}
            </g>
          ))}
        </g>
        {animate && (
          <style>{`@keyframes zr-hex-in {
            from { opacity: 0; transform: scale(0.85); transform-origin: center; }
            to { opacity: var(--zr-target-opacity, 1); transform: scale(1); }
          }`}</style>
        )}
      </Box>
    </Box>
  );
}

interface Cell {
  cx: number;
  cy: number;
  r: number;
  nested: boolean;
  contour: boolean;
  filled: boolean;
  opacity: number;
}

function buildLattice(size: number): Cell[] {
  const r = size / 14; // hex circumradius
  const w = r * Math.sqrt(3);
  const h = r * 1.5;
  const cells: Cell[] = [];
  // Stable pseudo-random based on grid coords
  const rand = (x: number, y: number) => {
    const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
    return s - Math.floor(s);
  };

  const rows = Math.ceil(size / h) + 1;
  const cols = Math.ceil(size / w) + 1;
  for (let row = -1; row < rows; row++) {
    for (let col = -1; col < cols; col++) {
      const cx = col * w + (row % 2 === 0 ? 0 : w / 2);
      const cy = row * h;
      if (cx < -r || cx > size + r || cy < -r || cy > size + r) continue;
      const k = rand(col, row);
      const k2 = rand(col + 3, row + 7);
      const opacity = 0.35 + k * 0.6;
      cells.push({
        cx,
        cy,
        r,
        nested: k > 0.78,
        contour: k2 > 0.62 && k2 < 0.82,
        filled: k < 0.08,
        opacity,
      });
    }
  }
  return cells;
}

function hexPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i + Math.PI / 6;
    return `${(cx + Math.cos(a) * r).toFixed(2)},${(cy + Math.sin(a) * r).toFixed(2)}`;
  }).join(" ");
}

function contourFragment(cx: number, cy: number, r: number): string {
  const start = `${(cx - r * 0.6).toFixed(2)} ${(cy + r * 0.1).toFixed(2)}`;
  const c1 = `${(cx - r * 0.2).toFixed(2)} ${(cy - r * 0.45).toFixed(2)}`;
  const c2 = `${(cx + r * 0.2).toFixed(2)} ${(cy + r * 0.45).toFixed(2)}`;
  const end = `${(cx + r * 0.6).toFixed(2)} ${(cy - r * 0.1).toFixed(2)}`;
  return `M ${start} C ${c1}, ${c2}, ${end}`;
}

export default HeroSacredHexLattice;
