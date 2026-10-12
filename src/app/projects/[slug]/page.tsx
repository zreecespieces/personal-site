import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "../_components/ProjectDetail";
import { getProjectBySlug, projects } from "../projects";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const url = `/projects/${project.slug}`;
  const title = `${project.title} | Zachary Reece`;
  return {
    title: { absolute: title },
    description: project.summary,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: project.summary,
      url,
      siteName: "Zachary Reece",
      type: "website",
      locale: "en_US",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
      creator: "@zreecespieces",
      images: ["/opengraph-image"],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
