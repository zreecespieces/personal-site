"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

export interface RevealProps {
  /** Children to reveal. */
  children: React.ReactNode;
  /** Milliseconds to wait before revealing (after intersection). */
  delay?: number;
  /** Reveal direction — `up` translates from below, `none` is pure fade. */
  direction?: "up" | "none";
  /** Distance (px) the element travels when `direction="up"`. */
  distance?: number;
  /** Threshold for IntersectionObserver. */
  threshold?: number;
  /** When true, the element animates every time it enters the viewport instead of just once. */
  repeat?: boolean;
  /** Forwarded sx. */
  sx?: React.ComponentProps<typeof Box>["sx"];
}

/**
 * Fade + slight upward reveal on enter — the redesign's single sanctioned
 * section motion. Built on `IntersectionObserver` with CSS-only easing so
 * we don't add a runtime animation dep. Respects `prefers-reduced-motion`
 * via the global theme overrides (transition-duration collapses to
 * ~0ms).
 */
export function Reveal({
  children,
  delay = 0,
  direction = "up",
  distance = 14,
  threshold = 0.12,
  repeat = false,
  sx,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Server-rendered fallback — when IntersectionObserver is absent
    // we show content immediately rather than leaving it hidden.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (!repeat) observer.unobserve(entry.target);
          } else if (repeat) {
            setVisible(false);
          }
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [repeat, threshold]);

  const offset = direction === "up" ? `translate3d(0, ${distance}px, 0)` : "none";

  return (
    <Box
      ref={ref}
      sx={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0, 0, 0)" : offset,
        transition: `opacity 420ms cubic-bezier(0.2, 0, 0, 1) ${delay}ms, transform 480ms cubic-bezier(0.2, 0, 0, 1) ${delay}ms`,
        willChange: "opacity, transform",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export default Reveal;
