"use client";

import React from "react";
import { Box } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import type { HeroDiagramProps } from "./types";

const DEFAULT_LABELS = ["LEARNING", "SYSTEMS", "DISCIPLINE", "INTELLIGENCE"];

/**
 * Hero option 4 — Concentric Orbital with Topographic Shadow.
 *
 * A central node with concentric orbital rings. Some rings are perfect
 * circles; others are warped into topographic-style curves. Four
 * satellite nodes ride the orbits with mono labels. Slow rotation
 * (≥60s loop) makes the whole thing breathe gently. Doubles as a
 * thesis diagram and a potential navigational anchor.
 */
export function HeroConcentricOrbital({
  size = 520,
  accent,
  animate = false,
  labels = DEFAULT_LABELS,
  sx,
}: HeroDiagramProps) {
  const theme = useTheme();
  const accentColor = accent ?? theme.zr.accent.brass;
  const boneColor = theme.zr.bone[100];

  const cx = size / 2;
  const cy = size / 2;
  const orbitRadii = [size * 0.18, size * 0.28, size * 0.4, size * 0.48];
  // Each satellite uses a different orbit
  const satellites = labels.slice(0, 4).map((label, i) => {
    const r = orbitRadii[i] ?? orbitRadii[orbitRadii.length - 1];
    const angle = (i * (Math.PI * 2)) / labels.length - Math.PI / 2 + 0.4 * i;
    return {
      label,
      r,
      angle,
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
    };
  });

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
        {/* Rotation group — only the orbital lines + satellites rotate */}
        <g
          style={
            animate
              ? {
                  transformOrigin: "center",
                  transformBox: "fill-box",
                  animation: "zr-orbital-rotate 120s linear infinite",
                }
              : undefined
          }
        >
          {orbitRadii.map((r, i) => {
            // Alternate: even = smooth circle, odd = warped topographic loop
            const warped = i % 2 === 1;
            if (!warped) {
              return (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  stroke={i === 0 ? "currentColor" : alpha(boneColor, 0.55)}
                  strokeWidth={i === 0 ? 1 : 0.7}
                  opacity={0.75 - i * 0.1}
                />
              );
            }
            return (
              <path
                key={i}
                d={warpedOrbit(cx, cy, r, i)}
                fill="none"
                stroke={alpha(boneColor, 0.5)}
                strokeWidth={0.7}
                opacity={0.55}
              />
            );
          })}

          {/* Satellite nodes */}
          {satellites.map((s, i) => (
            <g key={`sat-${i}`}>
              <circle cx={s.x} cy={s.y} r={6} fill="currentColor" opacity={0.85} />
              <circle
                cx={s.x}
                cy={s.y}
                r={12}
                fill="none"
                stroke="currentColor"
                strokeWidth={0.6}
                opacity={0.4}
              />
            </g>
          ))}
        </g>

        {/* Center node — does NOT rotate, sits still as the anchor */}
        <circle cx={cx} cy={cy} r={8} fill="currentColor" />
        <circle
          cx={cx}
          cy={cy}
          r={16}
          fill="none"
          stroke="currentColor"
          strokeWidth={0.9}
          opacity={0.6}
        />

        {/* Crosshair through center */}
        <line
          x1={cx - size * 0.05}
          y1={cy}
          x2={cx + size * 0.05}
          y2={cy}
          stroke="currentColor"
          strokeWidth={0.5}
          opacity={0.4}
        />
        <line
          x1={cx}
          y1={cy - size * 0.05}
          x2={cx}
          y2={cy + size * 0.05}
          stroke="currentColor"
          strokeWidth={0.5}
          opacity={0.4}
        />

        {animate && (
          <style>{`@keyframes zr-orbital-rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }`}</style>
        )}
      </Box>

      {/* Static label overlay — rendered as HTML so font selection works */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        {satellites.map((s, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              left: `${(s.x / size) * 100}%`,
              top: `${(s.y / size) * 100}%`,
              transform: "translate(12px, -50%)",
              fontFamily: `var(${theme.zr.cssVars.fontMono})`,
              fontSize: "0.6rem",
              letterSpacing: "0.14em",
              color: alpha(boneColor, 0.85),
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {s.label}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/**
 * Generate a warped orbital path — a circle that has been displaced by a
 * low-frequency sinusoid so it reads as a topographic contour but still
 * encloses the center.
 */
function warpedOrbit(cx: number, cy: number, r: number, seed: number): string {
  const samples = 80;
  const pts: Array<[number, number]> = [];
  for (let i = 0; i < samples; i++) {
    const t = (i / samples) * Math.PI * 2;
    const noise = Math.sin(t * 3 + seed * 1.7) * 0.06 + Math.cos(t * 5.3 - seed * 0.9) * 0.035;
    const radius = r * (1 + noise);
    pts.push([cx + Math.cos(t) * radius, cy + Math.sin(t) * radius]);
  }
  let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  for (let i = 1; i < samples; i++) {
    d += ` L ${pts[i][0].toFixed(2)} ${pts[i][1].toFixed(2)}`;
  }
  return d + " Z";
}

export default HeroConcentricOrbital;
