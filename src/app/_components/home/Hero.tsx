"use client";

import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  HeroDiagram,
  HeroVariantSwitcher,
  LabelChip,
  Overline,
  PortraitFrame,
  type HeroVariant,
} from "@/components/primitives";

export interface HeroProps {
  /** Active hero diagram variant. */
  heroVariant: HeroVariant;
  /** When true, render the dev variant switcher in the corner. */
  showVariantSwitcher?: boolean;
}

const TAGS = ["Software Engineer", "Product Builder", "Martial Artist", "Philosopher"];

/**
 * Home hero — editorial composition replacing the old centered avatar /
 * gradient name / neon-pill stack.
 *
 * Layout (desktop):
 *   ┌──────────────────────────────────────────────────────────┐
 *   │ overline · ZACHARY REECE / DENVER, CO                   │
 *   │                                                          │
 *   │ Systems for learning, intelligence, and                  │
 *   │ human capability.                                        │
 *   │                                                          │
 *   │   [portrait]    [hero diagram]                           │
 *   │                                                          │
 *   │   short manifesto paragraph                              │
 *   │   [SE] [PB] [MA] [PH]                                    │
 *   └──────────────────────────────────────────────────────────┘
 */
export function Hero({ heroVariant, showVariantSwitcher = false }: HeroProps) {
  const theme = useTheme();

  return (
    <Box sx={{ position: "relative", pt: { xs: 6, md: 10 }, pb: { xs: 6, md: 8 } }}>
      <Stack gap={4}>
        <Overline accent={theme.zr.accent.brass}>Zachary Reece · Denver, Colorado</Overline>

        <Typography
          variant="h1"
          component="h1"
          sx={{
            color: theme.zr.bone[100],
            maxWidth: "16ch",
            // Slight optical adjustment so the editorial scale doesn't
            // bleed past the construction frame on narrow screens.
            fontSize: {
              xs: "clamp(2.6rem, 11vw, 4.4rem)",
              md: "clamp(4rem, 7.4vw, 6.6rem)",
            },
          }}
        >
          Systems for learning, intelligence, and human capability.
        </Typography>

        <Box
          aria-hidden
          sx={{
            height: 1,
            width: { xs: 96, md: 160 },
            background: `linear-gradient(90deg, ${theme.zr.accent.brass}, transparent)`,
          }}
        />

        <Box
          sx={{
            display: "grid",
            gap: { xs: 5, md: 8 },
            gridTemplateColumns: { xs: "1fr", md: "auto 1fr" },
            alignItems: "center",
            mt: { xs: 2, md: 4 },
          }}
        >
          {/* Portrait + tags column */}
          <Stack gap={3} alignItems={{ xs: "flex-start", md: "center" }}>
            <PortraitFrame src="/profile-picture.jpg" alt="Zachary Reece" size={220} />
          </Stack>

          {/* Hero diagram + manifesto column */}
          <Stack gap={4} sx={{ minWidth: 0 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
                color: theme.zr.accent.brass,
              }}
            >
              <HeroDiagram variant={heroVariant} animate />
            </Box>

            <Typography
              variant="subtitle1"
              component="p"
              sx={{
                color: theme.zr.bone[200],
                maxWidth: theme.zr.layout.proseMaxWidth,
                lineHeight: 1.65,
              }}
            >
              I build software systems at the intersection of learning, intelligence, and human
              capability. My work spans product engineering, AI tools, educational platforms,
              technical writing, and long-running philosophical research into computation,
              cognition, and reality.
            </Typography>

            <Stack direction="row" gap={1} flexWrap="wrap">
              {TAGS.map((t) => (
                <LabelChip key={t}>{t}</LabelChip>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Stack>

      {showVariantSwitcher && <HeroVariantSwitcher current={heroVariant} />}
    </Box>
  );
}

export default Hero;
