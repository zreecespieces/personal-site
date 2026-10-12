"use client";

import React from "react";
import { Box, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { SectionKey } from "@/theme/tokens";
import { Honeycomb } from "./patterns/Honeycomb";
import { ContourField } from "./patterns/ContourField";
import { Suminagashi } from "./patterns/Suminagashi";

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
  /**
   * Render the per-family signature pattern in the corner of the section:
   *   • professional / about → Honeycomb (top-right)
   *   • education            → ContourField (bottom-right)
   *   • hobbies              → Suminagashi (bottom band)
   * Opt-in for the development specimen; content pages stay quiet.
   */
  signature?: boolean;
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
  regular: [5, 7],
  loose: [5, 8],
};

/**
 * The max-width content frame for the redesign. Three responsibilities:
 *
 *   1. Establish a generous editorial frame (1120–1240px) with consistent
 *      vertical rhythm.
 *   2. Optionally split into an asymmetric grid (main + side rail) for
 *      essay-with-annotations layouts.
 *   3. Layer in the site-wide "designed artifact" texture: a per-family
 *      signature pattern in the frame's corner.
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
  signature = false,
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
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          isolation: "isolate",
        }}
      >
        {signature && section && (
          <Box
            aria-hidden
            sx={{ position: "absolute", inset: 0, overflow: "clip", pointerEvents: "none" }}
          >
            <SignaturePattern section={section} accent={accentColor} />
          </Box>
        )}

        <Box sx={{ position: "relative", zIndex: 1 }}>
          {variant === "split" && rail ? (
            <Box
              sx={{
                display: "grid",
                gap: { xs: 4, md: 6 },
                gridTemplateColumns: {
                  xs: "1fr",
                  md: `minmax(0, ${1 - railWidth}fr) minmax(0, ${railWidth}fr)`,
                },
              }}
            >
              <Box sx={{ minWidth: 0 }}>{children}</Box>
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
        </Box>
      </Container>
    </Box>
  );
}

/**
 * Per-family signature pattern. Reads as a faded artifact watermark in
 * the corner of the section. Each family has a different motif so the
 * texture itself communicates which part of the site you're in.
 */
function SignaturePattern({ section, accent }: { section: SectionKey; accent: string }) {
  if (section === "professional" || section === "about") {
    return (
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          zIndex: 0,
          top: { xs: 8, md: 16 },
          right: { xs: -28, md: -36 },
          width: { xs: 220, md: 360 },
          height: { xs: 160, md: 260 },
          color: accent,
          opacity: 0.22,
          pointerEvents: "none",
        }}
      >
        <Honeycomb cellSize={11} strokeWidth={0.7} opacity={0.7} fade />
      </Box>
    );
  }

  if (section === "education") {
    return (
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          zIndex: 0,
          bottom: { xs: 8, md: 20 },
          right: { xs: -56, md: -84 },
          width: { xs: 280, md: 460 },
          height: { xs: 180, md: 260 },
          color: accent,
          opacity: 0.26,
          pointerEvents: "none",
        }}
      >
        <ContourField bands={6} strokeWidth={0.7} opacity={0.55} />
      </Box>
    );
  }

  if (section === "hobbies") {
    return (
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          zIndex: 0,
          left: { xs: -16, md: -36 },
          right: { xs: -16, md: -36 },
          bottom: { xs: -8, md: 4 },
          height: { xs: 84, md: 120 },
          color: accent,
          opacity: 0.22,
          pointerEvents: "none",
        }}
      >
        <Suminagashi
          strokes={11}
          strokeWidth={0.7}
          opacity={0.6}
          spacing={0.08}
          width={1200}
          height={140}
          sx={{ width: "100%", height: "100%" }}
        />
      </Box>
    );
  }

  return null;
}

export default SectionFrame;
