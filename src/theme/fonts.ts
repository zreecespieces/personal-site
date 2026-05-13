/**
 * Font loading for the redesign.
 *
 * Uses Next.js's `next/font/google` so fonts are self-hosted, preloaded, and
 * versioned alongside the build — no external `<link>` requests to Google's
 * CDN at runtime. Each font is exposed as a CSS variable so the MUI theme
 * (and any non-MUI surface) can reference it through `var(--font-*)`.
 *
 * Font selection per design doc §3 — Typography as Primary Identity:
 *   • Space Grotesk → headings (geometric, architectural sans-serif)
 *   • IBM Plex Sans → body (humanist, editorial readability)
 *   • IBM Plex Mono → metadata, labels, overlines, code, chips
 */

import { IBM_Plex_Mono, IBM_Plex_Sans, Space_Grotesk } from "next/font/google";

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

/**
 * Combined className string for the three font CSS variables. Apply to the
 * `<html>` or `<body>` element so the variables cascade everywhere.
 */
export const fontVariables = [spaceGrotesk.variable, plexSans.variable, plexMono.variable].join(
  " "
);
