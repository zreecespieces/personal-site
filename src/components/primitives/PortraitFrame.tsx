"use client";

import React from "react";
import Image from "next/image";
import { Box } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { Crosshair } from "./Crosshair";

export interface PortraitFrameProps {
  src: string;
  alt: string;
  /** Diameter of the portrait in px (the rendered image, not the outer ring). */
  size?: number;
  /** Whether to render the outer registration crosshair mark. */
  withMark?: boolean;
  /** Override accent (defaults to brass). */
  accent?: string;
  /** Forwarded sx. */
  sx?: React.ComponentProps<typeof Box>["sx"];
}

/**
 * Circular portrait with a double thin-line ring (bone inner + brass
 * outer) and an optional offset crosshair registration mark.
 *
 * Replaces the previous Avatar's neon gradient ring. The structure is:
 *
 *     ┌─────────────────┐
 *     │   ◯ portrait    │
 *     │   ───inner────  │
 *     │   ────outer───  │
 *     │     ✛ mark      │
 *     └─────────────────┘
 *
 * Both rings are non-clipping (they hug the image), so the photograph
 * itself remains sharp.
 */
export function PortraitFrame({
  src,
  alt,
  size = 220,
  withMark = true,
  accent,
  sx,
}: PortraitFrameProps) {
  const theme = useTheme();
  const accentColor = accent ?? theme.zr.accent.brass;
  // Each ring is a separate non-overlapping concentric border.
  const innerInset = 6;
  const outerInset = 0;

  const outerSize = size + 24; // breathing room for the outer ring + mark

  return (
    <Box
      sx={{
        position: "relative",
        width: outerSize,
        height: outerSize,
        flexShrink: 0,
        ...sx,
      }}
    >
      {/* Outer brass ring */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: outerInset,
          borderRadius: "50%",
          border: `1px solid ${alpha(accentColor, 0.7)}`,
        }}
      />
      {/* Inner bone ring */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: innerInset,
          borderRadius: "50%",
          border: `1px solid ${alpha(theme.zr.bone[100], 0.45)}`,
        }}
      />
      {/* Portrait image */}
      <Box
        sx={{
          position: "absolute",
          inset: innerInset + 4,
          borderRadius: "50%",
          overflow: "hidden",
          backgroundColor: alpha(theme.zr.ink[800], 0.6),
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${size}px`}
          priority
          style={{
            objectFit: "cover",
          }}
        />
      </Box>
      {/* Coordinate / registration mark, offset to the lower-right */}
      {withMark && (
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            right: -2,
            bottom: 8,
            color: accentColor,
          }}
        >
          <Crosshair size={18} color={accentColor} filled />
        </Box>
      )}
    </Box>
  );
}

export default PortraitFrame;
