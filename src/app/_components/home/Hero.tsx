"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Overline } from "@/components/primitives";

export default function Hero() {
  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "minmax(0, 1fr) minmax(0, 0.7fr)",
            md: "minmax(0, 1.35fr) minmax(0, 1fr)",
          },
          gridTemplateAreas: {
            xs: '"label label" "name portrait" "intro intro" "actions actions"',
            md: '"label portrait" "name portrait" "intro portrait" "actions portrait"',
          },
          columnGap: { xs: 2, sm: 4, md: 6, lg: 10 },
          rowGap: { xs: 2.5, md: 3 },
          alignItems: "center",
        }}
      >
        <Overline sx={{ gridArea: "label" }}>Product engineer / Educator</Overline>
        <Typography
          component="h1"
          variant="h1"
          sx={{
            gridArea: "name",
            fontSize: { xs: "clamp(2.45rem, 12.5vw, 4.5rem)", md: "clamp(6rem, 8.3vw, 8rem)" },
            letterSpacing: "-0.065em",
            lineHeight: 0.93,
          }}
        >
          Zachary
          <br />
          Reece
          <Box component="span" sx={{ color: "primary.main" }}>
            .
          </Box>
        </Typography>
        <Box sx={{ gridArea: "intro" }}>
          <Typography
            component="p"
            sx={{
              fontFamily: "var(--font-space-grotesk)",
              fontSize: { xs: "1.4rem", md: "1.7rem" },
              lineHeight: 1.35,
              letterSpacing: "-0.03em",
              maxWidth: "26ch",
            }}
          >
            I build software for how people learn.
          </Typography>
          <Typography sx={{ mt: 2, maxWidth: "45ch", color: "text.secondary", lineHeight: 1.75 }}>
            Currently at{" "}
            <Box component="a" href="https://flintk12.com" sx={{ color: "text.primary" }}>
              Flint
            </Box>
            , building tools for teachers and students. This is a home for my work, my thinking, and
            the things I do away from a screen.
          </Typography>
        </Box>
        <Stack direction="row" gap={2} flexWrap="wrap" sx={{ gridArea: "actions" }}>
          <Button component={Link} href="#selected-work" variant="contained">
            Explore my work{" "}
            <Box component="span" aria-hidden="true" sx={{ ml: 2 }}>
              &#8599;
            </Box>
          </Button>
          <Button component={Link} href="/about" variant="text">
            More about me
          </Button>
        </Stack>

        <Box
          component="figure"
          sx={{ gridArea: "portrait", m: 0, width: "100%", maxWidth: 460, justifySelf: "end" }}
        >
          <Box sx={{ position: "relative", p: { xs: 1, sm: 3, md: 4 } }}>
            <Box
              component="svg"
              viewBox="0 0 420 420"
              aria-hidden="true"
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                color: "primary.main",
                pointerEvents: "none",
              }}
            >
              <path
                d="M0 38H382V420 M38 0V382H420"
                fill="none"
                stroke="currentColor"
                opacity="0.4"
              />
              <path d="M300 0h82l38 38v84 M0 298v84l38 38h84" fill="none" stroke="currentColor" />
              <circle cx="382" cy="38" r="7" fill="#151512" stroke="currentColor" />
              <circle cx="38" cy="382" r="7" fill="currentColor" />
            </Box>
            <Box
              sx={{
                position: "relative",
                aspectRatio: "1",
                borderRadius: "50%",
                overflow: "hidden",
                bgcolor: "background.paper",
              }}
            >
              <Image
                src="/profile-picture.jpg"
                alt="Zachary Reece, with his geometric tattoo sleeve visible"
                fill
                priority
                sizes="(max-width: 600px) 38vw, (max-width: 900px) 300px, 400px"
                style={{ objectFit: "cover", filter: "saturate(0.7)", transform: "scale(1.01)" }}
              />
            </Box>
          </Box>
          <Box
            component="figcaption"
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 1,
              mt: 2,
              px: 4,
            }}
          >
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Denver, Colorado
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Always learning.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          mt: { xs: 4, md: 7 },
          pt: 2.5,
          borderTop: "1px solid var(--zr-line-muted)",
        }}
      >
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Engineering, education, and a life in practice.
        </Typography>
        <Typography
          component={Link}
          href="/blog"
          variant="caption"
          sx={{ textDecoration: "none", color: "text.primary" }}
        >
          Notes from the work <span aria-hidden="true">&#8599;</span>
        </Typography>
      </Box>
    </Box>
  );
}
