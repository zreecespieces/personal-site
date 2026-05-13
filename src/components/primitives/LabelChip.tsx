"use client";

import React from "react";
import { Box } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

export interface LabelChipProps {
  children: React.ReactNode;
  /** Optional accent color for the border (defaults to muted bone line). */
  accent?: string;
  /** Visual size — default is the editorial tag size. */
  size?: "sm" | "md";
  /** Optional left-side icon/glyph. */
  startGlyph?: React.ReactNode;
  /** Optional right-side icon/glyph. */
  endGlyph?: React.ReactNode;
  /** If provided, renders as an anchor. */
  href?: string;
  /** If provided, makes the chip interactive (button role + handler). */
  onClick?: () => void;
  /** Whether this chip is in a selected / pressed state. */
  selected?: boolean;
  /** Forwarded sx. */
  sx?: React.ComponentProps<typeof Box>["sx"];
  /** Forwarded title attribute for accessibility hints. */
  title?: string;
}

/**
 * Mono uppercase chip with a thin border — the editorial replacement for
 * MUI `Chip`. Reads as a printed label, catalog tag, or specimen marker.
 *
 * Why not just override `MuiChip`? Because Chip drags along a `MuiButtonBase`,
 * cancel buttons, avatar slots, and a `label` span we never want to render.
 * A bespoke component keeps the DOM minimal and the API focused on this
 * site's vocabulary.
 */
export function LabelChip({
  children,
  accent,
  size = "md",
  startGlyph,
  endGlyph,
  href,
  onClick,
  selected = false,
  sx,
  title,
}: LabelChipProps) {
  const theme = useTheme();
  const borderColor = accent ?? theme.zr.lines.muted;
  const interactive = Boolean(href || onClick);

  // Size table — kept tight so chips read as labels, not buttons.
  const dims =
    size === "sm"
      ? { px: "8px", py: "2px", fontSize: "0.6rem", minHeight: 22 }
      : { px: "10px", py: "3px", fontSize: "0.66rem", minHeight: 26 };

  const Component = href ? "a" : onClick ? "button" : "span";

  return (
    <Box
      component={Component as React.ElementType}
      href={href}
      onClick={onClick}
      title={title}
      role={onClick && !href ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.75,
        px: dims.px,
        py: dims.py,
        minHeight: dims.minHeight,
        fontFamily: `var(${theme.zr.cssVars.fontMono})`,
        fontSize: dims.fontSize,
        fontWeight: 600,
        letterSpacing: "0.085em",
        textTransform: "uppercase",
        color: selected ? theme.zr.bone[100] : alpha(theme.zr.bone[100], 0.86),
        backgroundColor: selected
          ? alpha(theme.zr.accent.brass, 0.12)
          : alpha(theme.zr.bone[100], 0.035),
        border: `1px solid ${borderColor}`,
        borderRadius: 2,
        textDecoration: "none",
        cursor: interactive ? "pointer" : "default",
        whiteSpace: "nowrap",
        transition: `background-color ${theme.zr.duration.micro}ms ${theme.zr.easing}, border-color ${theme.zr.duration.micro}ms ${theme.zr.easing}, color ${theme.zr.duration.micro}ms ${theme.zr.easing}, transform ${theme.zr.duration.micro}ms ${theme.zr.easing}`,
        ...(interactive
          ? {
              "&:hover": {
                color: theme.zr.bone[100],
                backgroundColor: alpha(theme.zr.bone[100], 0.07),
                borderColor: accent ?? theme.zr.accent.brassLight,
                transform: "translateY(-1px)",
              },
            }
          : {}),
        ...sx,
      }}
    >
      {startGlyph && (
        <Box component="span" sx={{ display: "inline-flex", color: borderColor }}>
          {startGlyph}
        </Box>
      )}
      <Box component="span" sx={{ lineHeight: 1 }}>
        {children}
      </Box>
      {endGlyph && (
        <Box component="span" sx={{ display: "inline-flex", color: borderColor }}>
          {endGlyph}
        </Box>
      )}
    </Box>
  );
}

export default LabelChip;
