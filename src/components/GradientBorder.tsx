"use client";

import React, { ReactNode } from "react";
import { Box, SxProps, Theme } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

interface GradientBorderProps {
  children: ReactNode;
  /**
   * Retained for backward compatibility — the redesign ignores the
   * gradient colors and renders the new artifact border instead. The
   * prop is still accepted so the existing 11 call sites compile.
   */
  gradientColors?: string[];
  borderWidth?: number;
  borderRadius?: number;
  sx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
}

/**
 * @deprecated Use `ArtifactCard` from `@/components/primitives` instead.
 *
 * This is a transition shim. The previous neon gradient-border component
 * has been replaced in-place with the warm editorial card surface so the
 * site doesn't visually regress while the per-page migrations land in
 * Phase 4. The `gradientColors` prop is accepted but ignored.
 *
 * Will be removed in Phase 7.
 */
export default function GradientBorder({
  children,
  borderWidth: _borderWidth,
  borderRadius = 1,
  sx = {},
  contentSx = {},
}: GradientBorderProps) {
  const theme = useTheme();
  // Touch the unused prop so TS doesn't warn and so we can deprecate cleanly
  void _borderWidth;

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: alpha(theme.zr.bone[100], 0.045),
        border: `1px solid ${theme.zr.lines.muted}`,
        borderRadius,
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: 2,
          height: "100%",
          backgroundColor: `var(--zr-section-accent, ${theme.zr.accent.brass})`,
          opacity: 0.65,
          pointerEvents: "none",
        },
        ...sx,
      }}
    >
      <Box sx={{ position: "relative", height: "100%", ...contentSx }}>{children}</Box>
    </Box>
  );
}
