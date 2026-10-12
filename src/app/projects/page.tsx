import { Box, Button, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import { Overline, PageHeader, SectionFrame } from "@/components/primitives";
import { formatDate, projects } from "./projects";

export default function Projects() {
  const project = projects[0];

  return (
    <Box component="main" id="main-content">
      <SectionFrame section="professional" spacing="loose" signature={false}>
        <Stack gap={{ xs: 5, md: 7 }}>
          <Box component="header">
            <PageHeader
              overline="Projects / A tool for making things"
              title={project.title}
              subtitle={project.subtitle}
              size="lg"
              withRule={false}
              withMark={false}
            />
            <Stack direction="row" gap={1.5} flexWrap="wrap" sx={{ mt: 3 }}>
              {project.deployedUrl && (
                <Button component="a" href={project.deployedUrl} variant="contained">
                  Open the pattern maker
                </Button>
              )}
              {project.githubUrl && (
                <Button component="a" href={project.githubUrl} variant="outlined">
                  View code on GitHub
                </Button>
              )}
            </Stack>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "minmax(0, 2fr) minmax(0, 1fr)" },
              gap: { xs: 4, md: 8 },
              pt: 4,
              borderTop: "1px solid var(--zr-line-muted)",
            }}
          >
            <Stack gap={2.5} sx={{ maxWidth: "65ch" }}>
              <Typography variant="h4" component="h2">
                From pixels to something you can hold.
              </Typography>
              {project.description
                .trim()
                .split(/\n\s*\n/)
                .map((paragraph) => (
                  <Typography key={paragraph} variant="body1" sx={{ lineHeight: 1.8 }}>
                    {paragraph.trim()}
                  </Typography>
                ))}
            </Stack>

            <Box component="aside" aria-label="Project details">
              <Box
                component="dl"
                sx={{
                  m: 0,
                  "& dt": { mb: 1 },
                  "& dd": { m: 0, mb: 3, color: "text.secondary" },
                }}
              >
                <Box component="dt">
                  <Overline>Built</Overline>
                </Box>
                <Typography component="dd" variant="body2">
                  <time dateTime={project.startDate}>{formatDate(project.startDate)}</time>
                  {project.endDate && (
                    <>
                      {" "}
                      to <time dateTime={project.endDate}>{formatDate(project.endDate)}</time>
                    </>
                  )}
                </Typography>
                <Box component="dt">
                  <Overline>Stack</Overline>
                </Box>
                <Typography component="dd" variant="body2" sx={{ lineHeight: 1.8 }}>
                  {project.technologies.map((technology) => technology.name).join(" / ")}
                </Typography>
                <Box component="dt">
                  <Overline>Made for</Overline>
                </Box>
                <Typography component="dd" variant="body2">
                  Custom bead patterns, pixel art, and festival accessories.
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            component="figure"
            aria-labelledby="pattern-process-caption"
            sx={{
              m: 0,
              px: { xs: 2.5, md: 5 },
              py: { xs: 3, md: 4 },
              border: "1px solid var(--zr-line-muted)",
              backgroundColor: "background.paper",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" },
                gap: { xs: 4, sm: 3 },
              }}
            >
              {["Source image", "Editable pixel grid", "Bead pattern"].map((label, stage) => (
                <Stack key={label} gap={2} alignItems="center">
                  <Box
                    component="svg"
                    viewBox="0 0 160 120"
                    aria-hidden="true"
                    focusable="false"
                    sx={{ width: "100%", maxWidth: 200, color: "var(--zr-section-accent)" }}
                  >
                    {stage === 0 ? (
                      <>
                        <rect
                          x="10"
                          y="10"
                          width="140"
                          height="100"
                          fill="none"
                          stroke="currentColor"
                          opacity="0.5"
                        />
                        <circle cx="117" cy="34" r="13" fill="currentColor" />
                        <path
                          d="M10 110 L60 42 L100 90 L123 62 L150 110 Z"
                          fill="currentColor"
                          opacity="0.6"
                        />
                      </>
                    ) : (
                      Array.from({ length: 80 }, (_, cell) => {
                        const column = cell % 10;
                        const row = Math.floor(cell / 10);
                        const sun = row < 3 && column > 6 && column < 9;
                        const mountain = row >= 2 && Math.abs(column - 3) <= row - 2;
                        const foothill = row >= 4 && Math.abs(column - 8) <= row - 4;
                        const filled = sun || mountain || foothill;
                        return stage === 1 ? (
                          <rect
                            key={cell}
                            x={11 + column * 14}
                            y={5 + row * 14}
                            width="12"
                            height="12"
                            fill={filled ? "currentColor" : "none"}
                            stroke="currentColor"
                            strokeWidth="0.5"
                            opacity={sun ? 1 : filled ? 0.6 : 0.2}
                          />
                        ) : (
                          <circle
                            key={cell}
                            cx={17 + column * 14}
                            cy={11 + row * 14}
                            r={filled ? 4.5 : 1}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={filled ? 3 : 1}
                            opacity={sun ? 1 : filled ? 0.6 : 0.25}
                          />
                        );
                      })
                    )}
                  </Box>
                  <Typography variant="body2" sx={{ color: "text.primary" }}>
                    {label}
                  </Typography>
                </Stack>
              ))}
            </Box>
            <Typography
              component="figcaption"
              id="pattern-process-caption"
              variant="caption"
              sx={{
                display: "block",
                mt: 4,
                maxWidth: "75ch",
                color: "text.secondary",
                lineHeight: 1.7,
              }}
            >
              Process diagram, not a product screenshot. An image becomes an editable grid; colors
              and dimensions can be adjusted before using the pattern to arrange beads.
            </Typography>
          </Box>

          <Box
            component="section"
            aria-labelledby="pattern-controls-heading"
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "minmax(0, 1fr) minmax(0, 2fr)" },
              gap: { xs: 3, md: 8 },
            }}
          >
            <Box>
              <Typography id="pattern-controls-heading" variant="h4" component="h2" sx={{ mb: 2 }}>
                Working with the pattern
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ maxWidth: "35ch", lineHeight: 1.8 }}
              >
                Start with an image or draw directly on the grid. Adjust the design, then save it
                for later.
              </Typography>
            </Box>
            <Box component="dl" sx={{ m: 0 }}>
              {project.features.map((feature) => (
                <Box
                  key={feature.title}
                  sx={{ py: 2.5, borderTop: "1px solid var(--zr-line-muted)" }}
                >
                  <Typography component="dt" variant="h6" sx={{ mb: 0.75 }}>
                    {feature.title}
                  </Typography>
                  <Typography
                    component="dd"
                    variant="body2"
                    color="text.secondary"
                    sx={{ m: 0, lineHeight: 1.8 }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box
            component="nav"
            aria-label="More from Zachary"
            sx={{ pt: 3, borderTop: "1px solid var(--zr-line-muted)" }}
          >
            <Typography
              component={NextLink}
              href="/blog"
              variant="body2"
              sx={{ color: "text.primary", textUnderlineOffset: "0.25em" }}
            >
              Read my notes on software
            </Typography>
          </Box>
        </Stack>
      </SectionFrame>
    </Box>
  );
}
