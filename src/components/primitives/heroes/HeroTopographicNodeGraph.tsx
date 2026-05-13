"use client";

import React from "react";
import { Box } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { ContourField } from "../patterns/ContourField";
import type { HeroDiagramProps } from "./types";

/**
 * Hero option 2 — Topographic Node Graph (closest to the resume graphic).
 *
 * Four nodes connected by a horizontal edge, each surrounded by its own
 * topographic peak contours. Mirrors the resume's central node strip
 * while embedding it in a cartographic field — a graph of ideas on the
 * terrain of experience.
 */
export function HeroTopographicNodeGraph({
  size = 560,
  accent,
  animate = false,
  sx,
}: HeroDiagramProps) {
  const theme = useTheme();
  const accentColor = accent ?? theme.zr.accent.brass;
  const boneColor = theme.zr.bone[200];

  const height = Math.round(size * 0.62);
  // Four node positions along a horizontal axis with slight vertical drift
  const nodes = [
    { x: size * 0.12, y: height * 0.5, r: 18 },
    { x: size * 0.38, y: height * 0.42, r: 28 },
    { x: size * 0.62, y: height * 0.58, r: 22 },
    { x: size * 0.88, y: height * 0.48, r: 16 },
  ];

  return (
    <Box
      sx={{
        position: "relative",
        width: size,
        height,
        maxWidth: "100%",
        ...sx,
      }}
    >
      {/* Contour field around the nodes */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          color: alpha(boneColor, 0.5),
        }}
      >
        <ContourField
          bands={8}
          width={size}
          height={height}
          opacity={0.4}
          animate={animate}
          peaks={nodes.map(({ x, y }) => ({ x, y }))}
        />
      </Box>

      {/* Foreground node-graph */}
      <Box
        component="svg"
        viewBox={`0 0 ${size} ${height}`}
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          color: accentColor,
        }}
      >
        {/* Connecting axis line */}
        <line
          x1={nodes[0].x}
          y1={(nodes[0].y + nodes[3].y) / 2}
          x2={nodes[3].x}
          y2={(nodes[0].y + nodes[3].y) / 2}
          stroke="currentColor"
          strokeWidth={0.9}
          opacity={0.55}
          style={
            animate
              ? {
                  strokeDasharray: size,
                  strokeDashoffset: 0,
                  animation: "zr-node-axis 2.4s cubic-bezier(0.2, 0, 0, 1) both",
                }
              : undefined
          }
        />
        {/* Per-node edge segments */}
        {nodes.slice(0, -1).map((n, i) => {
          const next = nodes[i + 1];
          return (
            <line
              key={`edge-${i}`}
              x1={n.x}
              y1={n.y}
              x2={next.x}
              y2={next.y}
              stroke="currentColor"
              strokeWidth={0.6}
              opacity={0.35}
            />
          );
        })}
        {/* Nodes */}
        {nodes.map((n, i) => (
          <g key={`node-${i}`}>
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.1}
              opacity={0.9}
            />
            <circle cx={n.x} cy={n.y} r={2.2} fill="currentColor" />
          </g>
        ))}
        {/* Outer node — filled, registers as the "anchor" */}
        <circle
          cx={nodes[1].x}
          cy={nodes[1].y}
          r={nodes[1].r * 0.55}
          fill="currentColor"
          opacity={0.18}
        />
        {animate && (
          <style>{`@keyframes zr-node-axis { from { stroke-dashoffset: ${size}; opacity: 0; } to { stroke-dashoffset: 0; opacity: 0.55; } }`}</style>
        )}
      </Box>
    </Box>
  );
}

export default HeroTopographicNodeGraph;
