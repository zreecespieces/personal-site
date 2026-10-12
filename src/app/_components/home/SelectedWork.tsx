"use client";

import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { Overline } from "@/components/primitives";
import type { BlogPostMeta } from "@/lib/blog";
import { formatCalendarDate } from "@/lib/dates";

export default function SelectedWork({ post }: { post?: BlogPostMeta }) {
  return (
    <Box id="selected-work" tabIndex={-1} sx={{ scrollMarginTop: 32, py: { xs: 3, md: 5 } }}>
      <Overline>Selected work</Overline>
      <Typography component="h2" variant="h3" sx={{ mt: 1.5, mb: { xs: 4, md: 5 } }}>
        Made to be useful.
      </Typography>
      <Box
        component={Link}
        href="/projects"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "minmax(0, 1.2fr) minmax(0, 1fr)" },
          textDecoration: "none",
          color: "text.primary",
          border: "1px solid var(--zr-line-muted)",
          "&:hover .project-art": { bgcolor: "#e2d8bf" },
          "&:hover .project-arrow": { transform: "translate(3px, -3px)" },
        }}
      >
        <Box
          className="project-art"
          sx={{
            bgcolor: "#d6ccb5",
            color: "#34332e",
            p: { xs: 3, md: 5 },
            display: "grid",
            placeItems: "center",
            transition: "background-color 180ms ease",
          }}
        >
          <Box
            component="svg"
            viewBox="0 0 420 260"
            role="img"
            aria-label="Illustrated bead pattern: a mountain landscape built from individual colored beads"
            sx={{ display: "block", width: "100%", maxWidth: 440 }}
          >
            {Array.from({ length: 375 }, (_, i) => {
              const x = i % 25;
              const y = Math.floor(i / 25);
              const sun = (x - 18) ** 2 + (y - 3) ** 2 < 7;
              const mountain = y > 3 && Math.abs(x - 9) <= (y - 3) * 0.9;
              const ridge = y > 7 && Math.abs(x - 20) <= y - 7;
              const snow = mountain && y < 7;
              const color = sun
                ? "#a56645"
                : snow
                  ? "#f2ead7"
                  : ridge
                    ? "#777f60"
                    : mountain
                      ? "#343d38"
                      : "#b9ae96";
              return (
                <circle
                  key={i}
                  cx={18 + x * 16}
                  cy={16 + y * 16}
                  r={mountain || ridge || sun ? 5.2 : 1.5}
                  fill="none"
                  stroke={color}
                  strokeWidth={mountain || ridge || sun ? 4 : 1.2}
                />
              );
            })}
          </Box>
        </Box>
        <Stack justifyContent="space-between" gap={4} sx={{ p: { xs: 3, md: 5 } }}>
          <Box>
            <Overline>Software meets craft</Overline>
            <Typography component="h3" variant="h3" sx={{ mt: 2, mb: 2, maxWidth: "15ch" }}>
              Instant Perler Pattern
            </Typography>
            <Typography sx={{ color: "text.secondary", maxWidth: "37ch" }}>
              From an image on a screen to a pattern you can make by hand. A tool for pixel art,
              beadwork, and festival gifts.
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}
          >
            <Typography variant="body2" sx={{ color: "text.primary" }}>
              Explore the project
            </Typography>
            <Typography
              className="project-arrow"
              aria-hidden="true"
              sx={{ fontSize: "1.8rem", color: "primary.main", transition: "transform 180ms ease" }}
            >
              ↗
            </Typography>
          </Box>
        </Stack>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "minmax(0, 1fr)", sm: "repeat(2, minmax(0, 1fr))" },
          gap: { xs: 3, sm: 6 },
          py: 4,
        }}
      >
        {[
          {
            label: "Product engineering",
            title: "Building at Flint",
            text: "AI-powered tools that give teachers time back and help students learn.",
            href: "https://flintk12.com",
          },
          {
            label: "Teaching",
            title: "20,000+ students. 145 countries.",
            text: "Sharing what I know about building interfaces with React and Material UI.",
            href: "https://www.udemy.com/user/zacharyreece/",
          },
        ].map((item) => (
          <Box
            key={item.href}
            component="a"
            href={item.href}
            target="_blank"
            rel="noreferrer"
            sx={{
              textDecoration: "none",
              borderBottom: "1px solid var(--zr-line-muted)",
              pb: 3,
              "&:hover h3": { color: "primary.light" },
            }}
          >
            <Overline>{item.label}</Overline>
            <Typography component="h3" variant="h5" sx={{ my: 1.5 }}>
              {item.title} <span aria-hidden="true">↗</span>
            </Typography>
            <Typography variant="body2" sx={{ maxWidth: "48ch", color: "text.secondary" }}>
              {item.text}
            </Typography>
          </Box>
        ))}
      </Box>

      {post && (
        <Box
          component="section"
          aria-labelledby="home-writing-title"
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "minmax(0, 0.7fr) minmax(0, 1.5fr)" },
            gap: { xs: 3, md: 8 },
            py: { xs: 4, md: 6 },
          }}
        >
          <Box>
            <Overline>Writing</Overline>
            <Typography id="home-writing-title" component="h2" variant="h4" sx={{ mt: 1.5 }}>
              Aberrant Quiddity
            </Typography>
            <Typography variant="body2" sx={{ mt: 2, maxWidth: "30ch", color: "text.secondary" }}>
              Notes on software, tools, and the way I work.
            </Typography>
          </Box>
          <Box
            component={Link}
            href={`/blog/${post.slug}`}
            sx={{
              textDecoration: "none",
              color: "text.primary",
              borderTop: "1px solid var(--zr-line-strong)",
              pt: 2.5,
              "&:hover h3": { color: "primary.light" },
            }}
          >
            <Typography variant="caption" color="text.secondary">
              <time dateTime={post.date}>{formatCalendarDate(post.date)}</time>
            </Typography>
            <Typography component="h3" variant="h3" sx={{ mt: 2, mb: 2 }}>
              {post.title}
            </Typography>
            <Typography sx={{ color: "text.secondary", maxWidth: "55ch" }}>
              {post.description}
            </Typography>
            <Typography variant="body2" sx={{ mt: 3, color: "text.primary" }}>
              Read the essay <span aria-hidden="true">↗</span>
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
