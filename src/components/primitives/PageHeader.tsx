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
  /** Optional introduction; omit copy that only restates the title. */
  subtitle?: React.ReactNode;
  /** Accent color override (defaults to the active --zr-section-accent / brass). */
  accent?: string;
  /** Visual scale of the title. */
  size?: "sm" | "md" | "lg";
  /** Semantic level, independent of visual scale. */
  component?: "h1" | "h2" | "h3";
  /** Whether to render the construction-line rule under the header. */
  withRule?: boolean;
  /** Whether to render the crosshair registration mark. */
  withMark?: boolean;
  /** Optional metadata below the introduction (dates, quantities, context). */
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
  component = "h1",
  withRule = false,
  withMark = false,
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
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          gap={2}
          sx={{ mb: 2.5, flexWrap: "wrap" }}
        >
          <Stack direction="row" alignItems="center" gap={1.5}>
            {withMark && <Crosshair size={14} color={accentValue} />}
            {(overline || index !== undefined) && (
              <Overline index={index} accent={accentValue}>
                {overline}
              </Overline>
            )}
          </Stack>
        </Stack>
      )}

      <Typography
        variant={TITLE_VARIANT[size]}
        component={component}
        sx={{
          color: theme.zr.bone[100],
          maxWidth: "24ch",
          overflowWrap: "break-word",
        }}
      >
        {title}
      </Typography>

      {withRule && (
        <Box aria-hidden sx={{ mt: 3, height: "1px", width: 56, backgroundColor: accentValue }} />
      )}

      {subtitle && (
        <Typography
          variant="subtitle1"
          component="p"
          sx={{
            mt: 2,
            maxWidth: theme.zr.layout.proseMaxWidth,
            color: "text.secondary",
          }}
        >
          {subtitle}
        </Typography>
      )}
      {meta && <Box sx={{ mt: 2.5 }}>{meta}</Box>}
    </Box>
  );
}

export default PageHeader;
