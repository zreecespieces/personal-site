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
              <Chapter overline="Origin · 01" title="A childhood spent making things">
                <p>
                  I have been building software since early childhood — figuring out HTML in
                  borrowed browsers and chasing whatever scripting language put a working artifact
                  in front of me. The throughline from then to now is unchanged: I like systems that
                  turn into things you can use.
                </p>
              </Chapter>

              <Chapter overline="Teaching · 02" title="20,000 students in 145 countries">
                <p>
                  In 2020 I created a best-selling Udemy course on React and Material UI
                  development. It has since reached more than 20,000 students across 145 countries.
                  I keep coming back to teaching as a discipline — both because it forces me to know
                  my craft and because clarity itself is a deliverable.
                </p>
              </Chapter>

              <Chapter overline="Work · 03" title="From defense to commercial to federal to edtech">
                <p>
                  Through the early 2020s I worked across an unusual range of stacks and domains —
                  cyber security defense, commercial real estate, federal agencies, and software
                  consultancies. Each context taught a different lesson about what production really
                  means.
                </p>
                <p>
                  In January 2026 I joined Flint, an edtech startup, as a Product Engineer. We are
                  building a next-generation AI-powered LMS/SIS partnered with hundreds of schools
                  to automate work for teachers and deliver personalized learning to individual
                  students.
                </p>
              </Chapter>

              <Chapter overline="Practice · 04" title="Judo, Brazilian Jiu-Jitsu, and the body">
                <p>
                  The physical practice runs in parallel and is not decoration. Judo and BJJ are how
                  I check that my thinking still lives in a body — a counterweight to a job that
                  otherwise rewards living in your head.
                </p>
              </Chapter>

              <Chapter overline="Philosophy · 05" title="Computation, cognition, and reality">
                <p>
                  I write and read about computation, cognition, and reality — long-running threads
                  that show up in the blog (Aberrant Quiddity), in side experiments, and in how I
                  think about the work at Flint. Learning, intelligence, and human capability are
                  the same question approached from different angles.
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
