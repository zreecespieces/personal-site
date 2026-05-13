import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import {
  ArtifactCard,
  LabelChip,
  MakersMarkFooter,
  Overline,
  PageHeader,
  SectionFrame,
} from "@/components/primitives";
import { getAllPosts } from "@/lib/blog";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Box component="main">
      <SectionFrame section="professional" spacing="loose">
        <PageHeader
          overline="Field Notes · Aberrant Quiddity"
          index="01"
          title="Notes on software, philosophy, and intelligence."
          subtitle="An infrequent notebook of long-form thinking that didn't fit anywhere else."
          size="md"
        />
      </SectionFrame>

      <SectionFrame section="professional" spacing="none">
        <Stack gap={3} sx={{ mb: 8 }}>
          {posts.map((post, i) => (
            <ArtifactCard key={post.slug} href={`/blog/${post.slug}`} padding="loose">
              <Stack gap={1.5}>
                <Stack direction="row" alignItems="center" gap={2}>
                  <Overline>{formatDate(post.date)}</Overline>
                  <Overline index={i + 1} accent="var(--zr-section-accent)">
                    Entry
                  </Overline>
                </Stack>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    color: "text.primary",
                    fontWeight: 500,
                  }}
                >
                  {post.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    maxWidth: "62ch",
                  }}
                >
                  {post.description}
                </Typography>
                {post.tags.length > 0 && (
                  <Stack direction="row" gap={0.75} flexWrap="wrap" sx={{ mt: 1 }}>
                    {post.tags.map((tag) => (
                      <LabelChip key={tag} size="sm">
                        {tag}
                      </LabelChip>
                    ))}
                  </Stack>
                )}
              </Stack>
            </ArtifactCard>
          ))}
        </Stack>

        <Box>
          <Typography
            component={NextLink}
            href="/"
            variant="overline"
            sx={{
              color: "text.secondary",
              textDecorationColor: "var(--zr-section-accent)",
              "&:hover": { color: "text.primary" },
            }}
          >
            ← Back to index
          </Typography>
        </Box>
      </SectionFrame>

      <MakersMarkFooter />
    </Box>
  );
}
