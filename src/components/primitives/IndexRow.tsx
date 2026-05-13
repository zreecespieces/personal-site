"use client";

import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

export interface IndexRowProps {
  /** Numeric position (will be padded to two digits) or string label. */
  index: number | string;
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

  const Component: React.ElementType = href ? "a" : onClick ? "button" : "div";

  const paddedIndex = typeof index === "number" ? String(index).padStart(2, "0") : index;

  return (
    <Box
      component={Component}
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      sx={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: { xs: "auto 1fr auto", md: "56px 1fr auto" },
        gap: { xs: 2, md: 3 },
        alignItems: "start",
        py: 2.5,
        px: { xs: 0.5, md: 1.5 },
        width: "100%",
        textAlign: "left",
        textDecoration: "none",
        color: "inherit",
        cursor: interactive ? "pointer" : "default",
        borderTop: `1px solid ${theme.zr.lines.muted}`,
        background: "transparent",
        font: "inherit",
        transition: `background-color ${theme.zr.duration.fast}ms ${theme.zr.easing}, padding-left ${theme.zr.duration.fast}ms ${theme.zr.easing}`,
        ...(interactive
          ? {
              "&:hover": {
                backgroundColor: alpha(theme.zr.bone[100], 0.035),
              },
              "&:hover .zr-index": {
                color: accentVar,
              },
              "&:hover .zr-end-glyph": {
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

      <Stack gap={0.75}>
        {category && (
          <Typography
            variant="overline"
            sx={{
              color: accentVar,
              fontSize: "0.66rem",
              letterSpacing: "0.14em",
            }}
          >
            {category}
          </Typography>
        )}
        <Typography
          className="zr-title"
          variant="h5"
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
            variant="body2"
            sx={{
              color: alpha(theme.zr.bone[200], 0.65),
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
