import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { Overline, PageLayout } from "@/components/primitives";
import { formatDate, type Project } from "../projects";
import { layout } from "@/theme/tokens";
import { ContentImage } from "@/components/ContentImage";
import ProjectWorkflow from "./ProjectWorkflow";
import ProjectCourses from "./ProjectCourses";

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <PageLayout
      section="professional"
      overline={
        <Box
          component={Link}
          href="/projects"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            minHeight: 44,
            textDecoration: "none",
            "&:hover, &:focus-visible": { textDecoration: "underline" },
          }}
        >
          <span aria-hidden="true">←&nbsp;</span> All projects
        </Box>
      }
      title={project.title}
      subtitle={project.subtitle}
      size="lg"
      actions={
        project.deployedUrl || project.githubUrl ? (
          <>
            {project.deployedUrl && (
              <Button component="a" href={project.deployedUrl} variant="contained">
                {project.deployedLabel ?? "Open project"}
              </Button>
            )}
            {project.githubUrl && (
              <Button component="a" href={project.githubUrl} variant="outlined">
                View code on GitHub
              </Button>
            )}
          </>
        ) : undefined
      }
    >
      <Stack
        sx={{
          gap: {
            xs: `${layout.sectionGap.mobile}px`,
            md: `${layout.sectionGap.desktop}px`,
          },
        }}
      >
        {project.banner && (
          <Box component="figure" sx={{ m: 0 }}>
            <ContentImage
              src={project.banner.url}
              alt={project.banner.alt}
              width={project.banner.width}
              height={project.banner.height}
              sizes="(max-width: 900px) calc(100vw - 40px), (max-width: 1200px) calc(100vw - 64px), 1136px"
              priority
              sx={{ objectFit: "contain", border: "1px solid var(--zr-line-muted)" }}
            />
            {project.banner.caption && (
              <Typography
                component="figcaption"
                variant="caption"
                color="text.secondary"
                sx={{ mt: 1.5, lineHeight: 1.7 }}
              >
                {project.banner.caption}
              </Typography>
            )}
          </Box>
        )}
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
              {project.overviewTitle ?? "About the project"}
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
                <Overline>{project.dateLabel ?? "Built"}</Overline>
              </Box>
              <Typography component="dd" variant="body2">
                <time
                  dateTime={
                    project.datePrecision === "month"
                      ? project.startDate.slice(0, 7)
                      : project.startDate
                  }
                >
                  {formatDate(project.startDate)}
                </time>
                {project.endDate && (
                  <>
                    {" "}
                    to{" "}
                    <time
                      dateTime={
                        project.datePrecision === "month"
                          ? project.endDate.slice(0, 7)
                          : project.endDate
                      }
                    >
                      {formatDate(project.endDate)}
                    </time>
                  </>
                )}
              </Typography>
              <Box component="dt">
                <Overline>{project.technologyLabel ?? "Stack"}</Overline>
              </Box>
              <Typography component="dd" variant="body2" sx={{ lineHeight: 1.8 }}>
                {project.technologies.map((technology) => technology.name).join(" / ")}
              </Typography>
            </Box>
          </Box>
        </Box>

        {project.workflow && <ProjectWorkflow kind={project.workflow} />}

        {project.courses && <ProjectCourses courses={project.courses} />}

        {project.features.length > 0 && (
          <Box
            component="section"
            aria-labelledby="project-capabilities-heading"
            sx={{
              display: "block",
            }}
          >
            <Box>
              <Typography
                id="project-capabilities-heading"
                variant="h4"
                component="h2"
                sx={{ mb: 2 }}
              >
                Capabilities
              </Typography>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
                gap: { xs: 4, md: 5 },
                mt: 3,
              }}
            >
              {project.featureGroups.map(({ id: group, title: label }) => (
                <Box
                  key={group}
                  component="section"
                  aria-labelledby={`capability-${group}`}
                  sx={{ borderTop: "1px solid var(--zr-line-muted)", pt: 2.5 }}
                >
                  <Typography
                    id={`capability-${group}`}
                    component="h3"
                    variant="h5"
                    sx={{ mb: 2.5 }}
                  >
                    {label}
                  </Typography>
                  <Stack component="dl" gap={2.5} sx={{ m: 0 }}>
                    {project.features
                      .filter((feature) => feature.group === group)
                      .map((feature) => (
                        <Box key={feature.title}>
                          <Typography
                            component="dt"
                            variant="body1"
                            sx={{ mb: 0.5, fontWeight: 500 }}
                          >
                            {feature.title}
                          </Typography>
                          <Typography
                            component="dd"
                            variant="body2"
                            color="text.secondary"
                            sx={{ m: 0 }}
                          >
                            {feature.description}
                          </Typography>
                        </Box>
                      ))}
                  </Stack>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Stack>
    </PageLayout>
  );
}
