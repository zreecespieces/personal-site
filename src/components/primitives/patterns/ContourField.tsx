"use client";

import React, { useMemo } from "react";
import { Box } from "@mui/material";

export interface ContourFieldProps {
  /** Number of contour bands to draw. */
  bands?: number;
  /** Stroke color. */
  color?: string;
  /** Stroke width. */
  strokeWidth?: number;
  /** Stroke opacity for the outermost line — interior bands fade. */
  opacity?: number;
  /** Width in user units. */
  width?: number;
  /** Height in user units. */
  height?: number;
  /** Seed nodes that act as topographic "peaks" — contours form around them. */
  peaks?: Array<{ x: number; y: number }>;
  /** If true, animate the outermost band's draw-in. */
  animate?: boolean;
  /** Optional rotation in degrees. */
  rotate?: number;
  sx?: React.ComponentProps<typeof Box>["sx"];
}

/**
 * Topographic-contour SVG primitive. Generates a procedural field of
 * smooth nested curves that wrap around the given peak nodes — the
 * `suminagashi / topographical` motif from Zachary's tattoo, recreated
 * parametrically.
 *
 * Default peaks render an organic blob suitable for backgrounds and
 * section anchors. Pass `peaks` to compose contour fields around the
 * nodes of a `HeroTopographicNodeGraph`.
 */
export function ContourField({
  bands = 7,
  color = "currentColor",
  strokeWidth = 0.9,
  opacity = 0.4,
  width = 480,
  height = 320,
  peaks,
  animate = false,
  rotate,
  sx,
}: ContourFieldProps) {
  const paths = useMemo(
    () => buildContourPaths({ bands, width, height, peaks }),
    [bands, width, height, peaks]
  );

  return (
    <Box
      component="svg"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      sx={{
        display: "block",
        color,
        ...sx,
      }}
    >
      <g transform={rotate ? `rotate(${rotate}, ${width / 2}, ${height / 2})` : undefined}>
        {paths.map((d, i) => {
          // Interior bands fade toward center; outermost is full opacity.
          const fade = 1 - i / Math.max(bands, 1);
          return (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              opacity={opacity * (0.35 + 0.65 * fade)}
              style={
                animate && i === 0
                  ? {
                      strokeDasharray: 2000,
                      strokeDashoffset: 0,
                      animation: "zr-contour-draw 4s cubic-bezier(0.2, 0, 0, 1) both",
                    }
                  : undefined
              }
            />
          );
        })}
      </g>
      {animate && (
        <style>
          {`@keyframes zr-contour-draw {
            from { stroke-dashoffset: 2000; opacity: 0; }
            to { stroke-dashoffset: 0; opacity: ${opacity}; }
          }`}
        </style>
      )}
    </Box>
  );
}

/**
 * Build smooth blob-like contour paths around the given peak nodes. Each
 * band shrinks toward the centroid of the peaks; small per-band sinusoidal
 * jitter gives the field a hand-drawn topographic feel.
 */
function buildContourPaths({
  bands,
  width,
  height,
  peaks,
}: {
  bands: number;
  width: number;
  height: number;
  peaks?: Array<{ x: number; y: number }>;
}): string[] {
  const seeds = peaks?.length
    ? peaks
    : [
        { x: width * 0.5, y: height * 0.5 },
        { x: width * 0.32, y: height * 0.42 },
        { x: width * 0.68, y: height * 0.58 },
      ];

  const cx = seeds.reduce((sum, p) => sum + p.x, 0) / seeds.length;
  const cy = seeds.reduce((sum, p) => sum + p.y, 0) / seeds.length;
  const baseRadius = Math.min(width, height) * 0.46;

  const samplesPerBand = 64;
  const paths: string[] = [];

  for (let b = 0; b < bands; b++) {
    const t = b / Math.max(bands - 1, 1); // 0 → 1, outer → inner
    const r = baseRadius * (1 - t * 0.78);
    const pts: Array<[number, number]> = [];

    for (let i = 0; i < samplesPerBand; i++) {
      const theta = (i / samplesPerBand) * Math.PI * 2;
      // Direction vector influenced by all peaks (weighted by distance)
      let dx = 0;
      let dy = 0;
      seeds.forEach((p) => {
        const ang = Math.atan2(p.y - cy, p.x - cx);
        const weight = 1 / (1 + Math.hypot(p.x - cx, p.y - cy) * 0.005);
        dx += Math.cos(ang) * weight;
        dy += Math.sin(ang) * weight;
      });
      const pull = 0.18 * (1 - t);
      // Per-band jitter — uses theta and band index as a stable hash
      const jitter = Math.sin(theta * 3 + b * 1.7) * 0.06 + Math.cos(theta * 5 - b * 0.9) * 0.04;
      const radius = r * (1 + jitter);
      const x = cx + Math.cos(theta) * radius + dx * pull * baseRadius;
      const y = cy + Math.sin(theta) * radius + dy * pull * baseRadius;
      pts.push([x, y]);
    }

    paths.push(pointsToSmoothPath(pts, true));
  }

  return paths;
}

/**
 * Convert a list of points into a smooth closed Catmull-Rom-ish path
 * using cubic Bezier curves. Closed=true wraps the final segment back
 * to the start so the contour is a continuous loop.
 */
function pointsToSmoothPath(points: Array<[number, number]>, closed: boolean): string {
  if (points.length < 2) return "";
  const n = points.length;
  const get = (i: number) => points[(i + n) % n];
  const tension = 0.5;

  let d = `M ${points[0][0].toFixed(2)} ${points[0][1].toFixed(2)}`;
  const limit = closed ? n : n - 1;
  for (let i = 0; i < limit; i++) {
    const p0 = get(i - 1);
    const p1 = get(i);
    const p2 = get(i + 1);
    const p3 = get(i + 2);

    const c1x = p1[0] + ((p2[0] - p0[0]) / 6) * tension;
    const c1y = p1[1] + ((p2[1] - p0[1]) / 6) * tension;
    const c2x = p2[0] - ((p3[0] - p1[0]) / 6) * tension;
    const c2y = p2[1] - ((p3[1] - p1[1]) / 6) * tension;
    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }
  if (closed) d += " Z";
  return d;
}

export default ContourField;
