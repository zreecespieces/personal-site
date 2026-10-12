"use client";

import { forwardRef, useMemo, type ReactNode } from "react";
import { Tabs, TabScrollButton, useMediaQuery, type TabScrollButtonProps } from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";

/** Shared scroll, keyboard, and reduced-motion behavior for visual archive tabs. */
export function ArchiveCarousel({
  label,
  scrollLabel,
  value,
  onChange,
  children,
}: {
  label: string;
  scrollLabel: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  const theme = useTheme();
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  // MUI's carousel scroll is JavaScript-driven, so CSS alone cannot reduce it.
  const carouselTheme = useMemo(
    () => ({
      ...theme,
      transitions: {
        ...theme.transitions,
        duration: {
          ...theme.transitions.duration,
          standard: reducedMotion ? 1 : theme.transitions.duration.standard,
        },
      },
    }),
    [theme, reducedMotion]
  );
  const ScrollButton = useMemo(
    () =>
      forwardRef<HTMLButtonElement, TabScrollButtonProps>(function CarouselScrollButton(
        { direction, ...props },
        ref
      ) {
        return (
          <TabScrollButton
            {...props}
            ref={ref}
            component="button"
            role="button"
            tabIndex={props.disabled ? -1 : 0}
            direction={direction}
            aria-label={`Scroll ${scrollLabel} ${direction}`}
          />
        );
      }),
    [scrollLabel]
  );

  return (
    <ThemeProvider theme={carouselTheme}>
      <Tabs
        value={value}
        onChange={(_, next: string) => onChange(next)}
        aria-label={label}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        slots={{ scrollButtons: ScrollButton }}
        sx={{
          mb: { xs: 3, md: 4 },
          borderBottom: "1px solid var(--zr-line-muted)",
          "& .MuiTabs-indicator": { bgcolor: "var(--zr-section-accent)", height: 2 },
          "& .MuiTabs-scrollButtons": {
            width: 40,
            color: "text.primary",
            "&:focus-visible": { outlineOffset: -3 },
          },
        }}
      >
        {children}
      </Tabs>
    </ThemeProvider>
  );
}
