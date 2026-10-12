import { LinkedRecordList } from "@/components/primitives";
import type { Project } from "../projects";

export default function ProjectList({
  projects,
  headingLevel = 2,
  showMetadata = true,
  withTopBorder = true,
}: {
  projects: Project[];
  headingLevel?: 2 | 3;
  showMetadata?: boolean;
  withTopBorder?: boolean;
}) {
  return (
    <LinkedRecordList
      headingLevel={headingLevel}
      withTopBorder={withTopBorder}
      records={projects.map((project) => ({
        id: project.slug,
        href: `/projects/${project.slug}`,
        title: project.title,
        description: project.subtitle,
        date: {
          value:
            project.datePrecision === "month" ? project.startDate.slice(0, 7) : project.startDate,
          label:
            project.endDate && project.endDate.slice(0, 4) !== project.startDate.slice(0, 4)
              ? `${project.startDate.slice(0, 4)}–${project.endDate.slice(0, 4)}`
              : project.startDate.slice(0, 4),
        },
        metadata: showMetadata
          ? project.technologies.map((technology) => technology.name)
          : undefined,
      }))}
    />
  );
}
