import { Typography } from "@mui/material";
import { PageLayout } from "@/components/primitives";
import { getProjectsSortedByDate } from "./projects";
import ProjectList from "./_components/ProjectList";

export default function Projects() {
  const projects = getProjectsSortedByDate();

  return (
    <PageLayout
      section="professional"
      title="Projects"
      subtitle="Software, tools, and courses I've created."
    >
      {projects.length ? (
        <ProjectList projects={projects} />
      ) : (
        <Typography color="text.secondary">No projects published yet.</Typography>
      )}
    </PageLayout>
  );
}
