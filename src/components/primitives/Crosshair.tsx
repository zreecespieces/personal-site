"use client";

import React from "react";
import { Box } from "@mui/material";

export interface CrosshairProps {
  /** Outer diameter in px. */
  size?: number;
  /** Stroke color. Defaults to the bone line color via currentColor. */
  color?: string;
  /** Line thickness. */
  strokeWidth?: number;
  /** If true, the inner dot is filled instead of an empty crosshair. */
  filled?: boolean;
  sx?: React.ComponentProps<typeof Box>["sx"];
  className?: string;
  /** Optional aria-label for screen readers. */
  label?: string;
}

/**
 * Small registration / coordinate mark. Reads as a printer's crop mark or
 * a target reticle — pairs with `PortraitFrame`, sits in corners of
 * `ArtifactCard`s, and anchors the hero composition.
 */
export function Crosshair({
  size = 16,
  color,
  strokeWidth = 1,
  filled = false,
  sx,
  className,
  label,
}: CrosshairProps) {
  const stroke = color ?? "currentColor";
  return (
    <Box
      component="svg"
      viewBox="0 0 16 16"
      role={label ? "img" : "presentation"}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={className}
      sx={{
        width: size,
        height: size,
        display: "block",
        color: stroke,
        flexShrink: 0,
        ...sx,
      }}
    >
      {/* Outer ring */}
      <circle
        cx="8"
        cy="8"
        r="6.4"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        opacity={0.55}
      />
      {/* Inner dot */}
      <circle
        cx="8"
        cy="8"
        r={filled ? 1.6 : 0.8}
        fill={filled ? stroke : "none"}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      {/* Four tick lines */}
      <line x1="8" y1="0" x2="8" y2="2.2" stroke={stroke} strokeWidth={strokeWidth} />
      <line x1="8" y1="13.8" x2="8" y2="16" stroke={stroke} strokeWidth={strokeWidth} />
      <line x1="0" y1="8" x2="2.2" y2="8" stroke={stroke} strokeWidth={strokeWidth} />
      <line x1="13.8" y1="8" x2="16" y2="8" stroke={stroke} strokeWidth={strokeWidth} />
    </Box>
  );
}

export default Crosshair;
