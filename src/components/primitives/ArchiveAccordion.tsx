"use client";

import React, { useState } from "react";
import { Box, Collapse, Stack, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

export interface ArchiveAccordionProps {
  /** The header label — usually short and uppercase. */
  label: React.ReactNode;
  /** Optional small index number. */
  index?: string | number;
  /** Optional glyph rendered to the left of the label. */
  glyph?: React.ReactNode;
  /** Body content (revealed on expand). */
  children: React.ReactNode;
  /** Accent color override. */
  accent?: string;
  /** Whether the accordion is initially open. */
  defaultOpen?: boolean;
  /** Controlled open state. */
  open?: boolean;
  onOpenChange?: (next: boolean) => void;
  /** Section count rendered in the right meta slot (e.g. "06"). */
  count?: string | number;
}

/**
 * Mechanical accordion styled as an expandable archive drawer:
 *
 *   • thin top + bottom rules,
 *   • mono index + glyph + label,
 *   • count + chevron on the right,
 *   • slow mechanical reveal (~280ms),
 *   • no filled block, no rounded SaaS pill.
 */
export function ArchiveAccordion({
  label,
  index,
  glyph,
  children,
  accent,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  count,
}: ArchiveAccordionProps) {
  const theme = useTheme();
  const accentVar = accent ?? `var(--zr-section-accent, ${theme.zr.accent.brass})`;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const toggle = () => {
    const next = !open;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  const paddedIndex = typeof index === "number" ? String(index).padStart(2, "0") : index;
  const paddedCount = typeof count === "number" ? String(count).padStart(2, "0") : count;

  return (
    <Box
      sx={{
        borderTop: `1px solid ${theme.zr.lines.muted}`,
        "&:last-of-type": {
          borderBottom: `1px solid ${theme.zr.lines.muted}`,
        },
      }}
    >
      <Box
        component="button"
        onClick={toggle}
        aria-expanded={open}
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          minHeight: 64,
          px: { xs: 1, md: 1.5 },
          py: 2,
          gap: 2,
          background: "transparent",
          border: "none",
          color: "inherit",
          font: "inherit",
          cursor: "pointer",
          textAlign: "left",
          transition: `background-color ${theme.zr.duration.fast}ms ${theme.zr.easing}`,
          "&:hover": {
            backgroundColor: alpha(theme.zr.bone[100], 0.035),
          },
        }}
      >
        {paddedIndex !== undefined && (
          <Typography
            variant="overline"
            sx={{
              color: theme.zr.stone[400],
              fontSize: "0.7rem",
              minWidth: 28,
            }}
          >
            {paddedIndex}
          </Typography>
        )}
        {glyph && (
          <Box
            sx={{
              color: accentVar,
              display: "inline-flex",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            {glyph}
          </Box>
        )}
        <Stack direction="row" alignItems="baseline" gap={1.5} sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="h5"
            component="span"
            sx={{
              fontFamily: `var(${theme.zr.cssVars.fontHeading})`,
              fontWeight: 500,
              color: theme.zr.bone[100],
              letterSpacing: "-0.018em",
              textTransform: "uppercase",
              fontSize: { xs: "1.05rem", md: "1.2rem" },
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {label}
          </Typography>
        </Stack>
        {paddedCount !== undefined && (
          <Typography
            variant="overline"
            sx={{
              color: theme.zr.stone[400],
              fontSize: "0.68rem",
              fontFamily: `var(${theme.zr.cssVars.fontMono})`,
            }}
          >
            {paddedCount}
          </Typography>
        )}
        <Box
          aria-hidden
          sx={{
            color: accentVar,
            display: "inline-flex",
            ml: 1,
            transition: `transform ${theme.zr.duration.medium}ms ${theme.zr.easing}`,
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          {/* Plus / cross glyph */}
          <Box
            component="svg"
            viewBox="0 0 16 16"
            sx={{ width: 14, height: 14 }}
            aria-hidden="true"
          >
            <line x1="8" y1="2" x2="8" y2="14" stroke="currentColor" strokeWidth={1.25} />
            <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth={1.25} />
          </Box>
        </Box>
      </Box>
      <Collapse in={open} timeout={theme.zr.duration.medium}>
        <Box
          sx={{
            px: { xs: 1, md: 1.5 },
            pb: 3,
            pt: 0.5,
          }}
        >
          {children}
        </Box>
      </Collapse>
    </Box>
  );
}

export default ArchiveAccordion;
