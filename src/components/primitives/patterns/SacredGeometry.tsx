"use client";

import React from "react";
import { Box } from "@mui/material";

export type SacredGeometryShape = "flower-of-life" | "metatron" | "vesica" | "seed" | "hexagram";

export interface SacredGeometryProps {
  shape?: SacredGeometryShape;
  size?: number;
  color?: string;
  strokeWidth?: number;
  opacity?: number;
  /** If true, animate a slow draw-in on mount. */
  animate?: boolean;
  sx?: React.ComponentProps<typeof Box>["sx"];
}

/**
 * Sacred-geometry SVG primitive. Recreates a small set of canonical
 * symbolic figures (flower of life, metatron's cube, vesica piscis,
 * seed of life, hexagram) for use as hero anchors and section glyphs.
 *
 * Each shape is normalized to a 240×240 viewBox so they compose cleanly
 * at any rendered size.
 */
export function SacredGeometry({
  shape = "flower-of-life",
  size = 240,
  color = "currentColor",
  strokeWidth = 1,
  opacity = 0.85,
  animate = false,
  sx,
}: SacredGeometryProps) {
  const cx = 120;
  const cy = 120;

  return (
    <Box
      component="svg"
      viewBox="0 0 240 240"
      width={size}
      height={size}
      aria-hidden="true"
      sx={{
        display: "block",
        color,
        ...sx,
      }}
    >
      <g
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        opacity={opacity}
        style={
          animate
            ? {
                strokeDasharray: 4000,
                strokeDashoffset: 0,
                animation: "zr-sg-draw 3s cubic-bezier(0.2, 0, 0, 1) both",
              }
            : undefined
        }
      >
        {renderShape(shape, cx, cy)}
      </g>
      {animate && (
        <style>
          {`@keyframes zr-sg-draw {
            from { stroke-dashoffset: 4000; opacity: 0; }
            to { stroke-dashoffset: 0; opacity: ${opacity}; }
          }`}
        </style>
      )}
    </Box>
  );
}

function renderShape(shape: SacredGeometryShape, cx: number, cy: number) {
  switch (shape) {
    case "flower-of-life":
      return flowerOfLife(cx, cy, 28);
    case "seed":
      return seedOfLife(cx, cy, 36);
    case "metatron":
      return metatron(cx, cy, 80);
    case "vesica":
      return vesica(cx, cy, 60);
    case "hexagram":
      return hexagram(cx, cy, 90);
  }
}

function seedOfLife(cx: number, cy: number, r: number): React.ReactNode {
  const circles: Array<[number, number]> = [[cx, cy]];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i;
    circles.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  return circles.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={r} />);
}

function flowerOfLife(cx: number, cy: number, r: number): React.ReactNode {
  const points = new Set<string>();
  const circles: Array<[number, number]> = [];
  const add = (x: number, y: number) => {
    const key = `${Math.round(x * 10)},${Math.round(y * 10)}`;
    if (!points.has(key)) {
      points.add(key);
      circles.push([x, y]);
    }
  };
  // Center + 1 ring (seed) + 2 ring (flower)
  add(cx, cy);
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i;
    add(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
  }
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i;
    add(cx + Math.cos(a) * r * 2, cy + Math.sin(a) * r * 2);
    const a2 = (Math.PI / 3) * i + Math.PI / 6;
    add(cx + Math.cos(a2) * r * Math.sqrt(3), cy + Math.sin(a2) * r * Math.sqrt(3));
  }
  return (
    <>
      {/* Outer boundary circle */}
      <circle cx={cx} cy={cy} r={r * 3} opacity={0.5} />
      {circles.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={r} />
      ))}
    </>
  );
}

function metatron(cx: number, cy: number, r: number): React.ReactNode {
  // 13 circles arranged in two hex rings + center
  const nodes: Array<[number, number]> = [[cx, cy]];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i;
    nodes.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i + Math.PI / 6;
    nodes.push([cx + Math.cos(a) * r * Math.sqrt(3), cy + Math.sin(a) * r * Math.sqrt(3)]);
  }
  // Edges connect every pair (the cube of metatron); cap at sane distance
  const edges: Array<[number, number]> = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const [x1, y1] = nodes[i];
      const [x2, y2] = nodes[j];
      const d = Math.hypot(x1 - x2, y1 - y2);
      if (d < r * 3.5) edges.push([i, j]);
    }
  }
  return (
    <>
      {edges.map(([a, b], i) => (
        <line
          key={`e${i}`}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          opacity={0.55}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={`n${i}`} cx={x} cy={y} r={6} />
      ))}
    </>
  );
}

function vesica(cx: number, cy: number, r: number): React.ReactNode {
  return (
    <>
      <circle cx={cx - r / 2} cy={cy} r={r} />
      <circle cx={cx + r / 2} cy={cy} r={r} />
    </>
  );
}

function hexagram(cx: number, cy: number, r: number): React.ReactNode {
  const pts = (rot: number) =>
    Array.from({ length: 3 }, (_, i) => {
      const a = ((Math.PI * 2) / 3) * i + rot;
      return `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`;
    }).join(" ");
  return (
    <>
      <polygon points={pts(-Math.PI / 2)} />
      <polygon points={pts(Math.PI / 2)} />
      <circle cx={cx} cy={cy} r={r * 1.04} opacity={0.4} />
    </>
  );
}

export default SacredGeometry;
