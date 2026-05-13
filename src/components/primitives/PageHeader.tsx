"use client";

import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Overline } from "./Overline";
import { Crosshair } from "./Crosshair";

export interface PageHeaderProps {
  /** Small overline label rendered above the heading. */
  overline?: React.ReactNode;
  /** Optional numeric index rendered inside the overline. */
  index?: string | number;
  /** The large editorial title — usually one or two words. */
  title: React.ReactNode;
  /** Optional manifesto / kicker paragraph below the title. */
  subtitle?: React.ReactNode;
  /** Accent color override (defaults to the active --zr-section-accent / brass). */
  accent?: string;
  /** Visual scale of the title. */
  size?: "sm" | "md" | "lg";
  /** Whether to render the construction-line rule under the header. */
  withRule?: boolean;
  /** Whether to render the crosshair registration mark. */
  withMark?: boolean;
  /** Optional right-side meta content (tags, date, glyph). */
  meta?: React.ReactNode;
  sx?: React.ComponentProps<typeof Box>["sx"];
}

const TITLE_VARIANT: Record<NonNullable<PageHeaderProps["size"]>, "h2" | "h3" | "h4"> = {
  lg: "h2",
  md: "h3",
  sm: "h4",
};

/**
 * The editorial heading slug used at the top of every section / page in
 * the redesign. Composes:
 *
 *   • a mono overline (with optional index number),
 *   • a large geometric heading,
 *   • an optional manifesto subtitle,
 *   • a thin construction-line rule beneath the title,
 *   • an optional crosshair registration mark to the right of the overline.
 *
 * Reads the active section accent from the `--zr-section-accent` CSS
 * variable (set by `SectionFrame`) so consumers don't usually need to pass
 * `accent` explicitly.
 */
export function PageHeader({
  overline,
  index,
  title,
  subtitle,
  accent,
  size = "lg",
  withRule = true,
  withMark = true,
  meta,
  sx,
}: PageHeaderProps) {
  const theme = useTheme();
  // The fallback resolves at runtime via CSS var so descendants inside a
  // SectionFrame inherit its accent automatically.
  const accentValue = accent ?? `var(--zr-section-accent, ${theme.zr.accent.brass})`;

  return (
    <Box sx={{ width: "100%", ...sx }}>
      {(overline || index !== undefined || withMark) && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
          sx={{ mb: 1.5 }}
        >
          <Stack direction="row" alignItems="center" gap={1.5}>
            {withMark && <Crosshair size={14} color={accentValue} />}
            {(overline || index !== undefined) && (
              <Overline index={index} accent={accentValue}>
                {overline}
              </Overline>
            )}
          </Stack>
          {meta && (
            <Box sx={{ color: theme.zr.bone[300], display: "inline-flex", gap: 1 }}>{meta}</Box>
          )}
        </Stack>
      )}

      <Typography
        variant={TITLE_VARIANT[size]}
        component="h1"
        sx={{
          color: theme.zr.bone[100],
          maxWidth: "20ch",
        }}
      >
        {title}
      </Typography>

      {withRule && (
        <Box
          aria-hidden
          sx={{
            mt: 3,
            height: 1,
            width: { xs: 96, md: 160 },
            background: `linear-gradient(90deg, ${accentValue}, transparent)`,
          }}
        />
      )}

      {subtitle && (
        <Typography
          variant="subtitle1"
          component="p"
          sx={{
            mt: 3,
            maxWidth: theme.zr.layout.proseMaxWidth,
            color: theme.zr.bone[200],
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}

export default PageHeader;
