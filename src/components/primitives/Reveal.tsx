"use client";

import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";

export interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "none";
  distance?: number;
  threshold?: number;
  rootMargin?: string;
  repeat?: boolean;
  sx?: React.ComponentProps<typeof Box>["sx"];
}

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  distance = 8,
  threshold = 0,
  rootMargin = "0px",
  repeat = false,
  sx,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !node.animate || typeof IntersectionObserver === "undefined") return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animation: Animation | undefined;
    const cancel = () => {
      if (preference.matches) animation?.cancel();
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        if (!preference.matches) {
          animation?.cancel();
          // Content is visible in HTML; motion is a progressive enhancement, never a gate.
          animation = node.animate(
            [
              {
                opacity: 0.65,
                transform: direction === "up" ? `translateY(${distance}px)` : "none",
              },
              { opacity: 1, transform: "none" },
            ],
            { duration: 380, delay, easing: "cubic-bezier(0.2, 0, 0, 1)" }
          );
        }
        if (!repeat) observer.unobserve(node);
      },
      { threshold, rootMargin }
    );
    observer.observe(node);
    preference.addEventListener("change", cancel);
    return () => {
      observer.disconnect();
      animation?.cancel();
      preference.removeEventListener("change", cancel);
    };
  }, [delay, direction, distance, threshold, rootMargin, repeat]);

  return (
    <Box ref={ref} sx={sx}>
      {children}
    </Box>
  );
}

export default Reveal;
