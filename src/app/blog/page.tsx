import type { Metadata } from "next";
import { Box, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import { Overline, PageHeader, SectionFrame } from "@/components/primitives";
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
  const [featured, ...otherPosts] = getAllPosts();

  return (
    <Box component="main" id="main-content">
      <SectionFrame section="professional" spacing="loose" signature={false}>
        <Stack gap={{ xs: 5, md: 7 }}>
          <PageHeader
            overline="Writing"
            title="Aberrant Quiddity"
            subtitle="Notes on software and the tools I use to build it."
            size="lg"
            withRule={false}
            withMark={false}
          />

          {featured ? (
            <Box
              component="article"
              aria-labelledby="featured-post-title"
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "220px minmax(0, 1fr)" },
                gap: { xs: 3, md: 6 },
                py: { xs: 4, md: 5 },
                borderTop: "1px solid var(--zr-line-muted)",
                borderBottom: "1px solid var(--zr-line-muted)",
              }}
            >
              <Stack gap={1.5}>
                <Overline>Latest essay</Overline>
                <Typography
                  component="time"
                  dateTime={featured.date}
                  variant="body2"
                  color="text.secondary"
                >
                  {formatCalendarDate(featured.date)}
                </Typography>
                {featured.tags.length > 0 && (
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    {featured.tags.join(" / ")}
                  </Typography>
                )}
              </Stack>
              <Stack gap={2.5} alignItems="flex-start">
                <Typography
                  id="featured-post-title"
                  variant="h3"
                  component="h2"
                  sx={{ maxWidth: "20ch" }}
                >
                  <Box
                    component={NextLink}
                    href={`/blog/${featured.slug}`}
                    sx={{
                      color: "text.primary",
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                        textDecorationThickness: "1px",
                        textUnderlineOffset: "0.15em",
                      },
                    }}
                  >
                    {featured.title}
                  </Box>
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ maxWidth: "54ch", lineHeight: 1.8 }}
                >
                  {featured.description}
                </Typography>
                <Typography
                  component={NextLink}
                  href={`/blog/${featured.slug}`}
                  variant="body2"
                  sx={{ mt: 1, color: "text.primary", textUnderlineOffset: "0.25em" }}
                >
                  Read the essay
                </Typography>
              </Stack>
            </Box>
          ) : (
            <Typography color="text.secondary">No essays published yet.</Typography>
          )}

          {otherPosts.length > 0 && (
            <Box component="section" aria-labelledby="earlier-posts-title">
              <Typography id="earlier-posts-title" variant="h5" component="h2" sx={{ mb: 3 }}>
                Earlier writing
              </Typography>
              {otherPosts.map((post) => (
                <Stack
                  key={post.slug}
                  gap={1}
                  sx={{ py: 3, borderTop: "1px solid var(--zr-line-muted)" }}
                >
                  <Typography
                    component="time"
                    dateTime={post.date}
                    variant="body2"
                    color="text.secondary"
                  >
                    {formatCalendarDate(post.date)}
                  </Typography>
                  <Typography variant="h5" component="h3">
                    <Box
                      component={NextLink}
                      href={`/blog/${post.slug}`}
                      sx={{ color: "text.primary", textUnderlineOffset: "0.2em" }}
                    >
                      {post.title}
                    </Box>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.description}
                  </Typography>
                </Stack>
              ))}
            </Box>
          )}

          <Box component="nav" aria-label="Site index">
            <Typography
              component={NextLink}
              href="/"
              variant="body2"
              sx={{ color: "text.secondary", textUnderlineOffset: "0.25em" }}
            >
              Back to the index
            </Typography>
          </Box>
        </Stack>
      </SectionFrame>
    </Box>
  );
}
