"use client";

import { Box, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import { Overline, PageLayout, PortraitFrame } from "@/components/primitives";
import { teachingImpact, udemyProjectUrl } from "@/app/_data/teaching";

export default function AboutPage() {
  return (
    <PageLayout
      section="about"
      title="About"
      subtitle="Product engineer and educator in Denver, Colorado."
      size="lg"
    >
      <Box
        sx={{
          display: "grid",
          gap: { xs: 5, md: 8 },
          gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "minmax(0, 1fr) 260px" },
          alignItems: "start",
          pt: 4,
          borderTop: "1px solid var(--zr-line-muted)",
          "& a": {
            color: "text.primary",
            textDecorationColor: "var(--zr-section-accent)",
            textUnderlineOffset: "0.25em",
          },
          "& a:hover": { textDecorationColor: "currentColor" },
        }}
      >
        <Stack gap={5} sx={{ maxWidth: "65ch" }}>
          <Box component="section" aria-labelledby="about-work-heading">
            <Typography id="about-work-heading" variant="h4" component="h2" sx={{ mb: 2.5 }}>
              Building software for learning.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2.5, lineHeight: 1.85 }}>
              In January 2026 I joined <a href="https://flintk12.com">Flint</a> as a Product
              Engineer. I'm building an AI-powered learning and school information platform
              partnered with hundreds of schools around the world, automating tasks for teachers and
              delivering personalized learning to students.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.85 }}>
              Before Flint, I worked with companies ranging from cybersecurity defense contractors
              and commercial real estate brokers to federal government agencies and software
              consultancies.
            </Typography>
          </Box>

          <Box component="section" aria-labelledby="about-teaching-heading">
            <Typography id="about-teaching-heading" variant="h4" component="h2" sx={{ mb: 2.5 }}>
              From learning to code to teaching it.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2.5, lineHeight: 1.85 }}>
              Since January 2020 I've created{" "}
              <NextLink href={udemyProjectUrl}>three courses on Udemy</NextLink>, covering React,
              Material UI, and full-stack e-commerce. Together, they've reached{" "}
              {teachingImpact.students} students across {teachingImpact.countries} countries and
              received {teachingImpact.reviews.toLowerCase()} reviews.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.85 }}>
              Learning has been the thread through all of this: teaching myself to code as a kid,
              teaching people around the world, and now building tools for teachers and students.
            </Typography>
          </Box>
        </Stack>

        <Stack
          component="aside"
          aria-label="A little more about me"
          gap={4}
          sx={{ position: { md: "sticky" }, top: { md: 104 } }}
        >
          <PortraitFrame
            src="/profile-picture.jpg"
            alt="Zachary Reece"
            size={220}
            withMark={false}
          />
          <Box>
            <Overline>Away from work</Overline>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5, lineHeight: 1.8 }}>
              <a href="https://smoothcomp.com/en/profile/979762">Brazilian jiu-jitsu and judo</a>,
              time on the <NextLink href="/hikes">trail</NextLink>,{" "}
              <NextLink href="/reading">books</NextLink>, and{" "}
              <NextLink href="/music-festivals">music festivals</NextLink>.
            </Typography>
          </Box>
        </Stack>
      </Box>
    </PageLayout>
  );
}
