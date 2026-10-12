import { Box, Typography } from "@mui/material";
import Link from "next/link";
import ProjectList from "@/app/projects/_components/ProjectList";
import { getProjectsSortedByDate } from "@/app/projects/projects";

export default function HomeProjects() {
  // Keep Perler on /projects, per the homepage's editorial selection.
  const projects = getProjectsSortedByDate().filter(
    (project) => project.slug !== "instant-perler-pattern"
  );
  return (
    <Box
      component="section"
      aria-labelledby="home-projects-title"
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "minmax(0, 0.7fr) minmax(0, 1.5fr)" },
        gap: { xs: 3, md: 8 },
        pt: 3,
        borderTop: "1px solid var(--zr-line-muted)",
      }}
    >
      <Box>
        <Typography id="home-projects-title" component="h2" variant="h4">
          Projects
        </Typography>
        <Typography
          component={Link}
          href="/projects"
          variant="body2"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            minHeight: 44,
            mt: 1,
            color: "text.secondary",
          }}
        >
          All projects <span aria-hidden="true">&nbsp;→</span>
        </Typography>
      </Box>
      <ProjectList
        projects={projects}
        headingLevel={3}
        showMetadata={false}
        withTopBorder={false}
      />
    </Box>
  );
}
