import type { Metadata } from "next";

const title = "Projects | Zachary Reece";
const description = "Software I've built: web applications, AI tools, and personal experiments.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title,
    description,
    url: "/projects",
    siteName: "Zachary Reece",
    type: "website",
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Zachary Reece" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@zreecespieces",
    images: ["/opengraph-image"],
  },
};

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
