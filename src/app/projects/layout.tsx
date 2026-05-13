import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Zachary Reece",
  description:
    "Explore a showcase of software development projects by Zachary Reece including web applications, AI tools, and other technology innovations.",
};

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
