"use client";

import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import NextLink from "next/link";

export interface IndexRowProps {
  density?: "compact" | "regular";
  /** Numeric position (will be padded to two digits) or string label. Optional. */
  index?: number | string;
  /** Short mono category label (e.g. SYSTEMS BUILT). Optional. */
  category?: string;
  /** Primary title. */
  title: React.ReactNode;
  /** One-sentence description. Optional. */
  description?: React.ReactNode;
  /** Optional glyph rendered on the right edge. */
  endGlyph?: React.ReactNode;
  /** Accent color override. */
  accent?: string;
  /** If provided, renders the row as an anchor. */
  href?: string;
  /** If provided, renders the row as a button. */
  onClick?: () => void;
  /** Optional target for href. */
  target?: string;
  rel?: string;
}

/**
 * The editorial replacement for the old "linkItem" glow card. Reads as a
 * numbered field-notebook entry:
 *
 *   01    CATEGORY              Title                            ▸
 *         description sentence sits below in muted body text.
 *
 * The full row is the click target. Hovering warms the index number,
 * lifts slightly, and shifts the end-glyph 2px right.
 */
export function IndexRow({
  density = "regular",
  index,
  category,
  title,
  description,
  endGlyph,
  accent,
  href,
  onClick,
  target,
  rel,
}: IndexRowProps) {
  const theme = useTheme();
  const interactive = Boolean(href || onClick);
  const accentVar = accent ?? `var(--zr-section-accent, ${theme.zr.accent.brass})`;

  const Component: React.ElementType = href
    ? href.startsWith("/")
      ? NextLink
      : "a"
    : onClick
      ? "button"
      : "div";

  const hasIndex = index !== undefined && index !== "";
  const paddedIndex = typeof index === "number" ? String(index).padStart(2, "0") : (index ?? "");

  return (
    <Box
      component={Component}
      href={href}
      onClick={onClick}
      type={onClick && !href ? "button" : undefined}
      target={target}
      rel={rel}
      sx={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: hasIndex ? "auto minmax(0, 1fr) auto" : "minmax(0, 1fr) auto",
        gap: { xs: 2, md: 3 },
        alignItems: "start",
        py: density === "compact" ? 1.5 : 2,
        minHeight: 48,
        px: density === "compact" ? 2 : 0,
        width: "100%",
        textAlign: "left",
        textDecoration: "none",
        color: "inherit",
        cursor: interactive ? "pointer" : "default",
        borderTop: `1px solid ${theme.zr.lines.muted}`,
        background: "transparent",
        font: "inherit",
        transition: `background-color ${theme.zr.duration.fast}ms ${theme.zr.easing}`,
        ...(interactive
          ? {
              "&:hover, &:focus-visible": {
                backgroundColor: alpha(theme.zr.bone[100], 0.035),
              },
              "&:hover .zr-index": {
                color: accentVar,
              },
              "&:hover .zr-end-glyph, &:focus-visible .zr-end-glyph": {
                transform: "translateX(3px)",
                color: accentVar,
              },
              "&:hover .zr-title": {
                color: theme.zr.bone[100],
              },
            }
          : {}),
        "&:last-of-type": {
          borderBottom: `1px solid ${theme.zr.lines.muted}`,
        },
      }}
    >
      {hasIndex && (
        <Typography
          className="zr-index"
          variant="overline"
          sx={{
            color: theme.zr.stone[400],
            fontSize: "0.72rem",
            lineHeight: 1,
            mt: 0.6,
            transition: `color ${theme.zr.duration.fast}ms ${theme.zr.easing}`,
          }}
        >
          {paddedIndex}
        </Typography>
      )}

      <Stack component="span" gap={0.75} sx={{ minWidth: 0 }}>
        {category && (
          <Typography
            component="span"
            variant="overline"
            sx={{
              color: accentVar,
              fontSize: "0.7rem",
              letterSpacing: "0.14em",
            }}
          >
            {category}
          </Typography>
        )}
        <Typography
          className="zr-title"
          variant={density === "compact" ? "body1" : "h5"}
          component="span"
          sx={{
            color: theme.zr.bone[200],
            fontWeight: 500,
            transition: `color ${theme.zr.duration.fast}ms ${theme.zr.easing}`,
          }}
        >
          {title}
        </Typography>
        {description && (
          <Typography
            component="span"
            variant="body2"
            sx={{
              color: "text.secondary",
              maxWidth: "60ch",
            }}
          >
            {description}
          </Typography>
        )}
      </Stack>

      {endGlyph && (
        <Box
          className="zr-end-glyph"
          sx={{
            color: theme.zr.stone[400],
            display: "inline-flex",
            alignSelf: "center",
            transition: `color ${theme.zr.duration.fast}ms ${theme.zr.easing}, transform ${theme.zr.duration.fast}ms ${theme.zr.easing}`,
          }}
        >
          {endGlyph}
        </Box>
      )}
    </Box>
  );
}

export default IndexRow;
