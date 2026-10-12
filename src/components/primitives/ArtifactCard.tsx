"use client";

import React from "react";
import { Box } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import NextLink from "next/link";

export interface ArtifactCardProps {
  /** Card body. */
  children: React.ReactNode;
  /** Accent color for the left rule and hover border. Falls back to the section accent. */
  accent?: string;
  /** If true, the left rule is rendered (default). Set false for plain bordered card. */
  withRule?: boolean;
  /** If true, the card animates on hover. Default true unless `as` is set without `href/onClick`. */
  hoverable?: boolean;
  /** Render padding scale. */
  padding?: "none" | "compact" | "regular" | "loose";
  /** Optional href — renders as anchor. */
  href?: string;
  /** Optional click handler — renders as button. */
  onClick?: () => void;
  /** Optional target for href. */
  target?: string;
  rel?: string;
  /** Forwarded sx. */
  sx?: React.ComponentProps<typeof Box>["sx"];
  /** Optional aria-label. */
  ariaLabel?: string;
}

type PaddingValue = number | { xs: number; md: number };
const PADDING: Record<NonNullable<ArtifactCardProps["padding"]>, PaddingValue> = {
  none: 0,
  compact: 2,
  regular: 2.5,
  loose: { xs: 3, md: 4 },
};

/**
 * The editorial card primitive. Replaces both `GradientBorder` wrappers
 * and per-page MUI `Card` instances with a single artifact-feeling
 * surface:
 *
 *   • optional 2px accent rule on the left edge,
 *   • bone surface wash at low opacity,
 *   • thin muted line border,
 *   • subtle hover lift (-2px) + border warming to the active accent,
 *   • no shadow, no backdrop blur, no gradient.
 *
 * Reads `--zr-section-accent` for the rule color when no `accent` prop is
 * passed, so cards nested in a `SectionFrame` pick up the right family.
 */
export function ArtifactCard({
  children,
  accent,
  withRule = false,
  hoverable,
  padding = "regular",
  href,
  onClick,
  target,
  rel,
  sx,
  ariaLabel,
}: ArtifactCardProps) {
  const theme = useTheme();
  const interactive = Boolean(href || onClick);
  const shouldHover = hoverable ?? interactive;
  const accentVar = accent ?? `var(--zr-section-accent, ${theme.zr.accent.brass})`;

  const Component: React.ElementType = href
    ? href.startsWith("/")
      ? NextLink
      : "a"
    : onClick
      ? "button"
      : "div";

  return (
    <Box
      component={Component}
      href={href}
      onClick={onClick}
      type={onClick && !href ? "button" : undefined}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      sx={{
        position: "relative",
        display: "block",
        width: "100%",
        textAlign: "left",
        textDecoration: "none",
        color: "inherit",
        font: "inherit",
        cursor: interactive ? "pointer" : "default",
        backgroundColor: alpha(theme.zr.bone[100], 0.045),
        border: `1px solid ${theme.zr.lines.muted}`,
        borderRadius: 0,
        p: PADDING[padding],
        overflow: "hidden",
        transition: `transform ${theme.zr.duration.fast}ms ${theme.zr.easing}, border-color ${theme.zr.duration.fast}ms ${theme.zr.easing}, background-color ${theme.zr.duration.fast}ms ${theme.zr.easing}`,
        // Left rule
        ...(withRule
          ? {
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: 2,
                height: "100%",
                backgroundColor: accentVar,
                opacity: 0.65,
                pointerEvents: "none",
              },
            }
          : {}),
        ...(shouldHover
          ? {
              "&:hover, &:focus-visible": {
                backgroundColor: alpha(theme.zr.bone[100], 0.07),
                borderColor: accentVar,
              },
              "&:hover::before, &:focus-visible::before": {
                opacity: 1,
              },
            }
          : {}),
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export default ArtifactCard;
