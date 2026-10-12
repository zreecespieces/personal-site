"use client";

import React, { useEffect, useId, useMemo, useRef } from "react";
import { Box, useMediaQuery } from "@mui/material";
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
  animate: requestedAnimation = false,
  sx,
}: HeroDiagramProps) {
  const theme = useTheme();
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)", { defaultMatches: true });
  const animate = requestedAnimation && !reducedMotion;
  const rawId = useId().replace(/:/g, "");
  const accentColor = accent ?? theme.zr.accent.brass;
  const boneColor = theme.zr.bone[200];

  const lattice = useMemo(() => buildLattice(size), [size]);
  const { cells, tileWidth } = lattice;
  const maskGradientId = `zr-hex-mask-${rawId}`;
  const maskId = `zr-hex-mask-applied-${rawId}`;
  const grainId = `zr-hex-grain-${rawId}`;
  const driftKeyframes = `zr-hex-drift-${rawId}`;
  const frameRef = useRef<number | null>(null);
  const pendingPointerRef = useRef<{
    target: HTMLDivElement;
    x: number;
    y: number;
    rotate: number;
  } | null>(null);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;

    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    const dx = x - 0.5;
    const dy = y - 0.5;

    pendingPointerRef.current = {
      target,
      x: dx * 24,
      y: dy * 24,
      rotate: dx * 2.4,
    };

    if (frameRef.current !== null) return;

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      const pending = pendingPointerRef.current;
      if (!pending?.target.isConnected) return;

      pending.target.style.setProperty("--zr-hex-detail-x", `${pending.x.toFixed(2)}px`);
      pending.target.style.setProperty("--zr-hex-detail-y", `${pending.y.toFixed(2)}px`);
      pending.target.style.setProperty("--zr-hex-detail-rotate", `${pending.rotate.toFixed(2)}deg`);
    });
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    pendingPointerRef.current = null;
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    target.style.setProperty("--zr-hex-detail-x", "0px");
    target.style.setProperty("--zr-hex-detail-y", "0px");
    target.style.setProperty("--zr-hex-detail-rotate", "0deg");
  };

  return (
    <Box
      onPointerMove={animate ? handlePointerMove : undefined}
      onPointerLeave={handlePointerLeave}
      sx={{
        position: "relative",
        width: size,
        maxWidth: "100%",
        aspectRatio: "1 / 1",
        flexShrink: 0,
        isolation: "isolate",
        touchAction: "pan-y",
        "--zr-hex-detail-x": "0px",
        "--zr-hex-detail-y": "0px",
        "--zr-hex-detail-rotate": "0deg",
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
          zIndex: 1,
          overflow: "visible",
          color: accentColor,
        }}
      >
        <defs>
          <radialGradient id={maskGradientId} cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="64%" stopColor="white" stopOpacity="0.86" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id={maskId}>
            <rect width="100%" height="100%" fill={`url(#${maskGradientId})`} />
          </mask>
          <filter id={grainId} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="2" seed="7" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.86 0 0 0 0 0.8 0 0 0 0 0.68 0 0 0 0.16 0"
            />
          </filter>
        </defs>

        <g mask={`url(#${maskId})`}>
          <rect
            width={size}
            height={size}
            fill={boneColor}
            opacity={0.035}
            filter={`url(#${grainId})`}
            style={{ mixBlendMode: "overlay" }}
          />

          <g
            style={
              animate
                ? {
                    animation: `${driftKeyframes} 76s linear infinite`,
                    willChange: "transform",
                  }
                : undefined
            }
          >
            {[0, 1].map((tile) => (
              <g key={`tile-${tile}`} transform={`translate(${formatNumber(tile * tileWidth)} 0)`}>
                {cells.map((cell) => (
                  <g key={`outline-${tile}-${cell.key}`} opacity={formatNumber(cell.opacity)}>
                    <polygon
                      points={hexPoints(cell.cx, cell.cy, cell.r)}
                      fill="none"
                      stroke={cell.contour ? alpha(boneColor, 0.45) : "currentColor"}
                      strokeWidth={0.7}
                    />
                  </g>
                ))}

                <g style={detailParallax(0.65)}>
                  {cells.map((cell) =>
                    cell.nested ? (
                      <polygon
                        key={`nested-${tile}-${cell.key}`}
                        points={hexPoints(cell.cx, cell.cy, cell.r * 0.55)}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={0.5}
                        opacity={formatNumber(cell.opacity * 0.7)}
                      />
                    ) : null
                  )}
                </g>

                <g style={detailParallax(1)}>
                  {cells.map((cell, i) => {
                    if (!cell.contour) return null;

                    const contourA = contourFragment(cell.cx, cell.cy, cell.r, 0);
                    const contourB = contourFragment(cell.cx, cell.cy, cell.r, 2.1);
                    const contourC = contourFragment(cell.cx, cell.cy, cell.r, 4.2);

                    return (
                      <g key={`contour-${tile}-${cell.key}`} opacity={formatNumber(cell.opacity)}>
                        <path
                          d={contourA}
                          fill="none"
                          stroke={alpha(boneColor, 0.85)}
                          strokeWidth={0.55}
                          strokeLinecap="round"
                        >
                          {animate && (
                            <animate
                              attributeName="d"
                              values={`${contourA}; ${contourB}; ${contourC}; ${contourA}`}
                              dur={`${formatNumber(8.5 + (i % 6) * 0.65)}s`}
                              begin={`${formatNumber((i % 10) * 0.18)}s`}
                              repeatCount="indefinite"
                            />
                          )}
                        </path>
                      </g>
                    );
                  })}
                </g>

                <g style={detailParallax(1.3)}>
                  {cells.map((cell, i) =>
                    cell.filled ? (
                      <circle
                        key={`core-${tile}-${cell.key}`}
                        cx={cell.cx}
                        cy={cell.cy}
                        r={formatNumber(cell.r * 0.18)}
                        fill="currentColor"
                        opacity={formatNumber(cell.opacity)}
                      >
                        {animate && (
                          <>
                            <animate
                              attributeName="r"
                              values={`${formatNumber(cell.r * 0.18)}; ${formatNumber(
                                cell.r * 0.26
                              )}; ${formatNumber(cell.r * 0.18)}`}
                              dur={`${formatNumber(4.8 + (i % 5) * 0.36)}s`}
                              begin={`${formatNumber(i * 0.09)}s`}
                              repeatCount="indefinite"
                            />
                            <animate
                              attributeName="opacity"
                              values={`${formatNumber(cell.opacity)}; ${formatNumber(
                                cell.opacity * 0.48
                              )}; ${formatNumber(cell.opacity)}`}
                              dur={`${formatNumber(4.8 + (i % 5) * 0.36)}s`}
                              begin={`${formatNumber(i * 0.09)}s`}
                              repeatCount="indefinite"
                            />
                          </>
                        )}
                      </circle>
                    ) : null
                  )}
                </g>
              </g>
            ))}
          </g>
        </g>

        {animate && (
          <style>{`@keyframes ${driftKeyframes} {
            from { transform: translate3d(0, 0, 0); }
            to { transform: translate3d(-${formatNumber(tileWidth)}px, 0, 0); }
          }`}</style>
        )}
      </Box>
    </Box>
  );
}

interface Cell {
  key: string;
  cx: number;
  cy: number;
  r: number;
  nested: boolean;
  contour: boolean;
  filled: boolean;
  opacity: number;
}

interface LatticeData {
  cells: Cell[];
  tileWidth: number;
}

function buildLattice(size: number): LatticeData {
  const r = round(size / 14, 3); // hex circumradius
  const w = round(r * Math.sqrt(3), 3);
  const h = round(r * 1.5, 3);
  const tileCols = Math.ceil(size / w) + 4;
  const tileWidth = round(tileCols * w, 3);
  const cells: Cell[] = [];

  const rows = Math.ceil(size / h) + 1;
  for (let row = -1; row < rows; row++) {
    for (let col = -1; col < tileCols + 1; col++) {
      const cx = round(col * w + (row % 2 === 0 ? 0 : w / 2), 3);
      const cy = round(row * h, 3);
      if (cx < -r || cx > tileWidth + r || cy < -r || cy > size + r) continue;
      const k = stableRand(col, row, 0);
      const k2 = stableRand(col, row, 1);
      const opacity = round(0.35 + k * 0.6, 3);
      cells.push({
        key: `${row}-${col}`,
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
  return { cells, tileWidth };
}

function hexPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i + Math.PI / 6;
    return `${(cx + Math.cos(a) * r).toFixed(2)},${(cy + Math.sin(a) * r).toFixed(2)}`;
  }).join(" ");
}

function detailParallax(depth: number): React.CSSProperties {
  return {
    transform: `translate3d(calc(var(--zr-hex-detail-x) * ${depth}), calc(var(--zr-hex-detail-y) * ${depth}), 0) rotate(calc(var(--zr-hex-detail-rotate) * ${depth}))`,
    transformBox: "fill-box",
    transformOrigin: "center",
    transition: "transform 180ms cubic-bezier(0.2, 0, 0, 1)",
    willChange: "transform",
  };
}

function stableRand(x: number, y: number, salt: number): number {
  let h = Math.imul(x + 0x9e3779b9, 0x85ebca6b) ^ Math.imul(y + 0xc2b2ae35, 0x27d4eb2d);
  h ^= Math.imul(salt + 0x165667b1, 0x9e3779b1);
  h ^= h >>> 16;
  h = Math.imul(h, 0x7feb352d);
  h ^= h >>> 15;
  h = Math.imul(h, 0x846ca68b);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}

function round(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function formatNumber(value: number): string {
  return String(round(value, 3));
}

function contourFragment(cx: number, cy: number, r: number, phase = 0): string {
  const start = `${(cx - r * 0.62).toFixed(2)} ${(cy + r * (0.1 + Math.sin(phase) * 0.11)).toFixed(
    2
  )}`;
  const c1 = `${(cx - r * (0.22 + Math.cos(phase) * 0.08)).toFixed(2)} ${(
    cy -
    r * (0.45 + Math.sin(phase + 0.8) * 0.13)
  ).toFixed(2)}`;
  const c2 = `${(cx + r * (0.2 + Math.sin(phase + 0.4) * 0.08)).toFixed(2)} ${(
    cy +
    r * (0.45 + Math.cos(phase + 0.6) * 0.13)
  ).toFixed(2)}`;
  const end = `${(cx + r * 0.62).toFixed(2)} ${(cy - r * (0.1 + Math.cos(phase) * 0.11)).toFixed(
    2
  )}`;
  return `M ${start} C ${c1}, ${c2}, ${end}`;
}

export default HeroSacredHexLattice;
