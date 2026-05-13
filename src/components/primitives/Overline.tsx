"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export interface OverlineProps {
  /**
   * Optional small index number rendered before the label. Used to evoke a
   * field-notebook / catalog index.
   *   <Overline index="01">Systems Built</Overline>
   */
  index?: string | number;
  /** Body label content (usually a short noun phrase, will be uppercased). */
  children: React.ReactNode;
  /** Accent color override; defaults to the theme's brass overline color. */
  accent?: string;
  /** Optional sx override forwarded to the wrapping Box. */
  sx?: React.ComponentProps<typeof Box>["sx"];
}

/**
 * Small mono small-caps label. The basic identity unit of the redesign —
 * appears above section headings, in coordinate markers, and on artifact
 * rows. Renders as a Typography `overline` so the theme's typographic
 * scale takes care of color, letter-spacing, and font selection.
 */
export function Overline({ index, children, accent, sx }: OverlineProps) {
  const theme = useTheme();
  const color = accent ?? theme.zr.accent.brass;

  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "baseline",
        gap: 1,
        color,
        ...sx,
      }}
    >
      {index !== undefined && (
        <Typography
          component="span"
          variant="overline"
          sx={{ color, opacity: 0.62, lineHeight: 1 }}
        >
          {typeof index === "number" ? String(index).padStart(2, "0") : index}
        </Typography>
      )}
      <Typography component="span" variant="overline" sx={{ color, lineHeight: 1 }}>
        {children}
      </Typography>
    </Box>
  );
}

export default Overline;
