"use client";

import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import NextLink from "next/link";
import {
  ArtifactCard,
  LabelChip,
  MakersMarkFooter,
  Overline,
  PageHeader,
  PortraitFrame,
  SectionFrame,
} from "@/components/primitives";

/**
 * `/about` — the long narrative.
 *
 * Built as an essay with a sticky side rail for annotations: dates,
 * roles, references. The body unfolds in editorial chapters (origin,
 * teaching, work, practice, philosophy). Resume link is exposed here
 * per the resolved decision in `docs/redesign_roadmap.md` §1.2.
 */
export default function AboutPage() {
  const theme = useTheme();

  return (
    <Box component="main">
      <SectionFrame spacing="loose" section="about">
        <Stack gap={6}>
          <PageHeader
            overline="About"
            index="00"
            title="A long-form view of what I do, where I came from, and what I'm working on."
            subtitle="The site is an index. This page is the essay behind it."
            size="md"
            withRule
          />

          <Box
            sx={{
              display: "grid",
              gap: { xs: 4, md: 8 },
              gridTemplateColumns: { xs: "1fr", md: "260px 1fr" },
              alignItems: "start",
            }}
          >
            {/* Portrait + meta column */}
            <Stack gap={4} sx={{ position: { md: "sticky" }, top: { md: 96 } }}>
              <PortraitFrame src="/profile-picture.jpg" alt="Zachary Reece" size={220} />
              <Stack gap={1.5}>
                <Overline>Where</Overline>
                <Typography variant="body2" color="text.secondary">
                  Denver, Colorado
                </Typography>
              </Stack>
              <Stack gap={1.5}>
                <Overline>Current</Overline>
                <Typography variant="body2" color="text.secondary">
                  Product Engineer at Flint — AI-powered LMS/SIS for K–12.
                </Typography>
              </Stack>
              <Stack gap={1.5}>
                <Overline>Roles</Overline>
                <Stack direction="row" gap={0.75} flexWrap="wrap">
                  <LabelChip size="sm">Engineer</LabelChip>
                  <LabelChip size="sm">Educator</LabelChip>
                  <LabelChip size="sm">Martial Artist</LabelChip>
                  <LabelChip size="sm">Builder</LabelChip>
                </Stack>
              </Stack>
              <Stack gap={1.5}>
                <Overline>Artifact</Overline>
                <Typography variant="body2" color="text.secondary">
                  <Box
                    component="a"
                    href="/resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    sx={{
                      color: theme.zr.bone[100],
                      textDecorationColor: theme.zr.accent.brass,
                      "&:hover": { color: theme.zr.accent.brassLight },
                    }}
                  >
                    Résumé (PDF)
                  </Box>
                </Typography>
              </Stack>
            </Stack>

            {/* Body essay column */}
            <Stack gap={5} sx={{ maxWidth: theme.zr.layout.proseMaxWidth }}>
              <Chapter overline="Bio · 01" title="Engineer, educator, and builder">
                <p>
                  In 2020 I created a best-selling Udemy course on React and MUI development which
                  has now taught over 20,000 students in 145 countries. Since then I have worked
                  with companies ranging from cyber security defense contractors and multi-billion
                  dollar commercial real estate brokers to federal government agencies and software
                  consultancies.
                </p>
                <p>
                  In January 2026 I joined Flint, an edtech startup, as a Product Engineer building
                  a next generation AI-powered LMS/SIS platform partnered with hundreds of schools
                  across the world to automate tasks for teachers and deliver personalized learning
                  to individual students. Learning will always be at the heart of what I do - from
                  teaching myself to code as a kid, to teaching people all over the world about
                  coding, and now building tools that will redefine education for students
                  everywhere.
                </p>
              </Chapter>

              <ArtifactCard sx={{ mt: 4 }}>
                <Stack gap={1}>
                  <Overline>Reach out</Overline>
                  <Typography variant="body1" color="text.primary">
                    The fastest way to reach me is{" "}
                    <Box
                      component="a"
                      href="mailto:zachdreece@gmail.com"
                      sx={{
                        color: theme.zr.bone[100],
                        textDecorationColor: theme.zr.accent.brass,
                      }}
                    >
                      email
                    </Box>
                    . If you'd rather see the catalog,{" "}
                    <Box
                      component={NextLink}
                      href="/"
                      sx={{
                        color: theme.zr.bone[100],
                        textDecorationColor: theme.zr.accent.brass,
                      }}
                    >
                      head back to the index
                    </Box>
                    .
                  </Typography>
                </Stack>
              </ArtifactCard>
            </Stack>
          </Box>
        </Stack>
      </SectionFrame>

      <MakersMarkFooter />
    </Box>
  );
}

function Chapter({
  overline,
  title,
  children,
}: {
  overline: string;
  title: string;
  children: React.ReactNode;
}) {
  const theme = useTheme();
  return (
    <Box component="section">
      <Overline>{overline}</Overline>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          mt: 1,
          mb: 2,
          color: theme.zr.bone[100],
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          "& p": {
            margin: 0,
            marginBottom: 2,
            fontFamily: `var(${theme.zr.cssVars.fontBody})`,
            fontSize: "1.02rem",
            lineHeight: 1.72,
            color: theme.zr.bone[200],
          },
          "& p:last-child": { marginBottom: 0 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
