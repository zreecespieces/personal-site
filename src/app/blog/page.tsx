import type { Metadata } from "next";
import { Typography } from "@mui/material";
import { LinkedRecordList, PageLayout } from "@/components/primitives";
import { getAllPosts } from "@/lib/blog";
import { formatCalendarDate } from "@/lib/dates";

export const metadata: Metadata = {
  title: { absolute: "Aberrant Quiddity | Zachary Reece" },
  description: "Notes on software and the tools I use to build it.",
  alternates: { canonical: "https://zacharyreece.dev/blog" },
  openGraph: {
    title: "Aberrant Quiddity | Zachary Reece",
    description: "Notes on software and the tools I use to build it.",
    url: "https://zacharyreece.dev/blog",
    type: "website",
    images: [
      {
        url: "https://zacharyreece.dev/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Zachary Reece",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aberrant Quiddity | Zachary Reece",
    description: "Notes on software and the tools I use to build it.",
    images: ["https://zacharyreece.dev/opengraph-image"],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <PageLayout
      section="professional"
      overline="Writing"
      title="Aberrant Quiddity"
      subtitle="Notes on software and the tools I use to build it."
      size="lg"
    >
      {posts.length ? (
        <LinkedRecordList
          records={posts.map((post) => ({
            id: post.slug,
            href: `/blog/${post.slug}`,
            title: post.title,
            description: post.description,
            date: { value: post.date, label: formatCalendarDate(post.date) },
            metadata: post.tags,
          }))}
        />
      ) : (
        <Typography color="text.secondary">No essays published yet.</Typography>
      )}
    </PageLayout>
  );
}
