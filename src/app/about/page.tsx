"use client";

import { Box, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import { Overline, PageHeader, PortraitFrame, SectionFrame } from "@/components/primitives";

export default function AboutPage() {
  return (
    <Box component="main" id="main-content">
      <SectionFrame spacing="loose" section="about" signature={false}>
        <Stack gap={{ xs: 5, md: 7 }}>
          <PageHeader
            overline="About"
            title="Zachary Reece"
            subtitle="Product engineer and educator in Denver, Colorado."
            size="lg"
            withRule={false}
            withMark={false}
          />

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
                  partnered with hundreds of schools around the world, automating tasks for teachers
                  and delivering personalized learning to students.
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.85 }}>
                  Before Flint, I worked with companies ranging from cybersecurity defense
                  contractors and commercial real estate brokers to federal government agencies and
                  software consultancies.
                </Typography>
              </Box>

              <Box component="section" aria-labelledby="about-teaching-heading">
                <Typography
                  id="about-teaching-heading"
                  variant="h4"
                  component="h2"
                  sx={{ mb: 2.5 }}
                >
                  From learning to code to teaching it.
                </Typography>
                <Typography variant="body1" sx={{ mb: 2.5, lineHeight: 1.85 }}>
                  In 2020 I created a best-selling{" "}
                  <a href="https://www.udemy.com/user/zacharyreece/">
                    Udemy course on React and Material UI
                  </a>
                  . It has since taught over 20,000 students in 145 countries.
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.85 }}>
                  Learning has been the thread through all of this: teaching myself to code as a
                  kid, teaching people around the world, and now building tools for teachers and
                  students.
                </Typography>
              </Box>

              <Box sx={{ pt: 3, borderTop: "1px solid var(--zr-line-muted)" }}>
                <Overline>Get in touch</Overline>
                <Typography variant="body1" sx={{ mt: 1.5, overflowWrap: "anywhere" }}>
                  <a href="mailto:zachdreece@gmail.com">zachdreece@gmail.com</a>
                </Typography>
                <Stack
                  component="nav"
                  aria-label="Work and writing"
                  direction="row"
                  gap={3}
                  flexWrap="wrap"
                  sx={{ mt: 3 }}
                >
                  <Typography component={NextLink} href="/projects" variant="body2">
                    Projects
                  </Typography>
                  <Typography component={NextLink} href="/blog" variant="body2">
                    Writing
                  </Typography>
                </Stack>
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
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1.5, lineHeight: 1.8 }}
                >
                  Brazilian jiu-jitsu and judo, time on the trail, books, and music festivals.
                </Typography>
                <Stack component="nav" aria-label="Personal interests" gap={1.5} sx={{ mt: 2 }}>
                  <Typography
                    component="a"
                    href="https://smoothcomp.com/en/profile/979762"
                    variant="body2"
                  >
                    Grappling competition record
                  </Typography>
                  <Typography component={NextLink} href="/hikes" variant="body2">
                    Trail log
                  </Typography>
                  <Typography component={NextLink} href="/reading" variant="body2">
                    Reading shelf
                  </Typography>
                  <Typography component={NextLink} href="/music-festivals" variant="body2">
                    Music festivals
                  </Typography>
                </Stack>
              </Box>
              <Typography
                component="a"
                href="/resume.pdf"
                variant="body2"
                sx={{ width: "fit-content" }}
              >
                Résumé (PDF)
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </SectionFrame>
    </Box>
  );
}
