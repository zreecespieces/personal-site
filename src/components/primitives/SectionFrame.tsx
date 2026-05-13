"use client";

import React from "react";
import { Box, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { SectionKey } from "@/theme/tokens";

export interface SectionFrameProps {
  /** Section identity — drives the accent color used by descendants. */
  section?: SectionKey;
  /** Override the accent without specifying a section key. */
  accent?: string;
  /** Render the asymmetric editorial grid: main + side rail. */
  variant?: "single" | "split";
  /** Width of the side rail in `split` variant (fraction of total). */
  railWidth?: number;
  /** Vertical padding between sections — modest, generous, or none. */
  spacing?: "compact" | "regular" | "loose" | "none";
  /** Optional id for in-page anchor links. */
  id?: string;
  /** Optional aria-label / aria-labelledby. */
  ariaLabel?: string;
  /** Children — typically a PageHeader plus content. */
  children: React.ReactNode;
  /** Side rail content when variant="split". */
  rail?: React.ReactNode;
  /** Forwarded sx applied to the outer Box. */
  sx?: React.ComponentProps<typeof Box>["sx"];
}

const VERTICAL_PADDING: Record<NonNullable<SectionFrameProps["spacing"]>, number[]> = {
  none: [0, 0],
  compact: [4, 5],
  regular: [7, 9],
  loose: [10, 14],
};

/**
 * The max-width content frame for the redesign. Substitutes for the
 * site's previous habit of wrapping everything in `GradientBorder` or
 * a vanilla `Container`. Two responsibilities:
 *
 *   1. Establish a generous editorial frame (1120–1240px) with consistent
 *      vertical rhythm.
 *   2. Optionally split into an asymmetric grid (main + side rail) for
 *      essay-with-annotations layouts.
 *
 * Section identity flows down via the `data-section` attribute and the
 * `--zr-section-accent` CSS variable so descendants can read the active
 * accent without prop drilling.
 */
export function SectionFrame({
  section,
  accent,
  variant = "single",
  railWidth = 0.32,
  spacing = "regular",
  id,
  ariaLabel,
  children,
  rail,
  sx,
}: SectionFrameProps) {
  const theme = useTheme();
  const sectionAccent = section ? theme.zr.sectionAccent[section] : undefined;
  const accentColor = accent ?? sectionAccent ?? theme.zr.accent.brass;
  const [py, pyMd] = VERTICAL_PADDING[spacing];

  return (
    <Box
      component="section"
      id={id}
      aria-label={ariaLabel}
      data-section={section}
      sx={{
        position: "relative",
        py: { xs: py, md: pyMd },
        "--zr-section-accent": accentColor,
        ...sx,
      }}
    >
      <Container maxWidth="lg">
        {variant === "split" && rail ? (
          <Box
            sx={{
              display: "grid",
              gap: { xs: 4, md: 6 },
              gridTemplateColumns: {
                xs: "1fr",
                md: `${(1 - railWidth) * 100}% ${railWidth * 100}%`,
              },
            }}
          >
            <Box>{children}</Box>
            <Box
              component="aside"
              sx={{
                position: { md: "sticky" },
                top: { md: 96 },
                alignSelf: "start",
                borderLeft: {
                  md: `1px solid ${theme.zr.lines.muted}`,
                },
                pl: { md: 4 },
                pt: { xs: 4, md: 0 },
                borderTop: {
                  xs: `1px solid ${theme.zr.lines.muted}`,
                  md: "none",
                },
              }}
            >
              {rail}
            </Box>
          </Box>
        ) : (
          children
        )}
      </Container>
    </Box>
  );
}

export default SectionFrame;
