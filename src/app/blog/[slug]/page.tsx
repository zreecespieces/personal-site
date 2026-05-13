import React from "react";
import { notFound } from "next/navigation";
import { Box, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  ArtifactCard,
  LabelChip,
  MakersMarkFooter,
  Overline,
  SectionFrame,
} from "@/components/primitives";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

// MDX component overrides — typography flows through the theme's
// editorial scale; only the surfaces (blockquote, code, hr) need bespoke
// styling.
const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Typography
      variant="h3"
      component="h1"
      sx={{ color: "text.primary", mt: 5, mb: 2 }}
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Typography
      variant="h4"
      component="h2"
      sx={{ color: "text.primary", mt: 4, mb: 2 }}
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Typography
      variant="h5"
      component="h3"
      sx={{ color: "text.primary", mt: 3, mb: 1.5 }}
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <Typography
      variant="body1"
      component="p"
      sx={{
        mb: 2.5,
        color: "text.primary",
        fontSize: { xs: "1.05rem", md: "1.15rem" },
        lineHeight: 1.78,
      }}
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <Box component="ul" sx={{ mb: 2, pl: 3, "& li": { mb: 0.75 } }} {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <Box component="ol" sx={{ mb: 2, pl: 3, "& li": { mb: 0.75 } }} {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <Typography
      component="li"
      variant="body1"
      sx={{
        color: "text.primary",
        fontSize: { xs: "1.05rem", md: "1.15rem" },
        lineHeight: 1.78,
      }}
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <Box
      component="blockquote"
      sx={{
        borderLeft: "2px solid var(--zr-section-accent)",
        pl: 3,
        py: 0.5,
        my: 3,
        ml: 0,
        color: "text.secondary",
        fontStyle: "italic",
        "& p": { mb: 0 },
      }}
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <Box
      component="code"
      sx={{
        backgroundColor: "rgba(238, 229, 210, 0.08)",
        color: "text.primary",
        px: 0.75,
        py: 0.25,
        borderRadius: 1,
        fontSize: "0.875em",
        fontFamily: "var(--font-plex-mono)",
      }}
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <Box
      component="pre"
      sx={{
        backgroundColor: "rgba(15, 15, 13, 0.6)",
        border: "1px solid var(--zr-line-muted)",
        borderRadius: 1,
        p: 2.5,
        my: 3,
        overflowX: "auto",
        fontFamily: "var(--font-plex-mono)",
        fontSize: "0.875rem",
        "& code": {
          backgroundColor: "transparent",
          px: 0,
          py: 0,
        },
      }}
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <Box
      component="a"
      sx={{
        color: "text.primary",
        textDecorationColor: "var(--zr-section-accent)",
        textUnderlineOffset: "0.22em",
        "&:hover": {
          color: "text.primary",
          textUnderlineOffset: "0.32em",
        },
      }}
      {...props}
    />
  ),
  hr: () => (
    <Box
      component="hr"
      sx={{
        border: "none",
        height: 1,
        backgroundColor: "var(--zr-line-muted)",
        my: 5,
      }}
    />
  ),
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Zachary Reece`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <Box component="main">
      <SectionFrame section="professional" spacing="loose">
        <Stack gap={6}>
          {/* Post header */}
          <Stack gap={2.5}>
            <Stack direction="row" gap={2} alignItems="center">
              <Overline>Field Notes</Overline>
              <Overline accent="var(--zr-section-accent)">{formatDate(post.date)}</Overline>
            </Stack>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                color: "text.primary",
                maxWidth: "22ch",
              }}
            >
              {post.title}
            </Typography>
            <Box
              aria-hidden
              sx={{
                height: 1,
                width: { xs: 96, md: 160 },
                background: "linear-gradient(90deg, var(--zr-section-accent), transparent)",
              }}
            />
            {post.tags.length > 0 && (
              <Stack direction="row" gap={0.75} flexWrap="wrap" sx={{ mt: 1 }}>
                {post.tags.map((tag) => (
                  <LabelChip key={tag}>{tag}</LabelChip>
                ))}
              </Stack>
            )}
          </Stack>

          {/* Post body */}
          <ArtifactCard padding="loose" hoverable={false} sx={{ maxWidth: 760 }}>
            <MDXRemote source={post.content} components={mdxComponents} />
          </ArtifactCard>

          {/* Navigation */}
          <Box>
            <Typography
              component={NextLink}
              href="/blog"
              variant="overline"
              sx={{
                color: "text.secondary",
                textDecorationColor: "var(--zr-section-accent)",
                "&:hover": { color: "text.primary" },
              }}
            >
              ← Back to Field Notes
            </Typography>
          </Box>
        </Stack>
      </SectionFrame>

      <MakersMarkFooter />
    </Box>
  );
}
