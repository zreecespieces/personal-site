import React from "react";
import { notFound } from "next/navigation";
import { Box, Container, Stack, Typography, Chip } from "@mui/material";
import NextLink from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import GradientBorder from "@/components/GradientBorder";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { BLOG_GRADIENT, BLOG_HOVER, BLOG_SHADOW, BLOG_SURFACE, BLOG_TEXT } from "../theme";

const BLOG_BODY_FONT =
  '"Avenir Next", Avenir, "Inter", "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, sans-serif';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

// MDX component overrides styled for the blog's dark theme.
const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Typography
      variant="h3"
      component="h1"
      fontWeight="700"
      sx={{ color: BLOG_TEXT, mt: 5, mb: 2 }}
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Typography
      variant="h4"
      component="h2"
      fontWeight="600"
      sx={{ color: BLOG_TEXT, mt: 4, mb: 2 }}
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Typography
      variant="h5"
      component="h3"
      fontWeight="600"
      sx={{ color: BLOG_TEXT, mt: 3, mb: 1.5 }}
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <Typography
      variant="body1"
      sx={{
        mb: 2.5,
        color: BLOG_TEXT,
        fontFamily: BLOG_BODY_FONT,
        fontSize: { xs: "1.22rem", md: "1.38rem" },
        fontWeight: 400,
        letterSpacing: "0.008em",
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
        color: BLOG_TEXT,
        fontFamily: BLOG_BODY_FONT,
        fontSize: { xs: "1.22rem", md: "1.38rem" },
        fontWeight: 400,
        letterSpacing: "0.008em",
        lineHeight: 1.78,
      }}
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <Box
      component="blockquote"
      sx={{
        borderLeft: `3px solid ${BLOG_GRADIENT[0]}`,
        pl: 3,
        py: 0.5,
        my: 2,
        bgcolor: "rgba(163, 230, 53, 0.08)",
        borderRadius: "0 8px 8px 0",
        "& p": { mb: 0 },
      }}
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <Box
      component="code"
      sx={{
        bgcolor: "rgba(163, 230, 53, 0.12)",
        color: BLOG_GRADIENT[0],
        px: 0.75,
        py: 0.25,
        borderRadius: 1,
        fontSize: "0.875em",
        fontFamily: "monospace",
      }}
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <Box
      component="pre"
      sx={{
        bgcolor: "rgba(10, 15, 14, 0.9)",
        border: "1px solid rgba(163, 230, 53, 0.2)",
        borderRadius: 2,
        p: 2.5,
        my: 2,
        overflowX: "auto",
        "& code": {
          bgcolor: "transparent",
          px: 0,
          py: 0,
          fontSize: "0.875rem",
        },
      }}
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <Box
      component="a"
      sx={{
        color: BLOG_GRADIENT[0],
        textDecoration: "none",
        borderBottom: `1px solid transparent`,
        transition: "border-color 0.2s ease",
        "&:hover": {
          borderBottom: `1px solid ${BLOG_GRADIENT[0]}`,
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
        height: "1px",
        background: `linear-gradient(90deg, transparent, ${BLOG_GRADIENT[0]}, transparent)`,
        my: 4,
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
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* Post Header */}
        <GradientBorder
          gradientColors={BLOG_GRADIENT}
          sx={{ width: "100%" }}
          contentSx={{ p: 4, background: BLOG_SURFACE, boxShadow: BLOG_SHADOW }}
        >
          <Typography
            variant="h3"
            component="h1"
            fontWeight="700"
            sx={{
              background: `linear-gradient(to right, ${BLOG_GRADIENT[0]}, ${BLOG_GRADIENT[1]})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.02em",
              lineHeight: 1.08,
              mb: 1,
            }}
          >
            {post.title}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              color: "#FFFFFF",
              fontFamily: BLOG_BODY_FONT,
              fontWeight: 500,
              fontSize: "1.08rem",
              lineHeight: 1.2,
              mb: 1,
            }}
          >
            {formatDate(post.date)}
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {post.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="medium"
                sx={{
                  bgcolor: "rgba(163, 230, 53, 0.12)",
                  border: "1px solid rgba(163, 230, 53, 0.18)",
                  color: BLOG_GRADIENT[0],
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  height: 32,
                  minWidth: 56,
                  "& .MuiChip-label": { px: 1.25 },
                }}
              />
            ))}
          </Stack>
        </GradientBorder>

        {/* Post Body */}
        <Box
          sx={{
            background: BLOG_SURFACE,
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(163, 230, 53, 0.16)",
            borderRadius: 3,
            p: { xs: 3, md: 5 },
            boxShadow: BLOG_SHADOW,
          }}
        >
          <MDXRemote source={post.content} components={mdxComponents} />
        </Box>

        {/* Navigation */}
        <Stack direction="row" spacing={2}>
          <Typography
            component={NextLink}
            href="/blog"
            variant="body1"
            sx={{
              textDecoration: "none",
              color: BLOG_GRADIENT[0],
              py: 1,
              px: 3,
              borderRadius: 2,
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: BLOG_HOVER,
              },
            }}
          >
            Back to Blog
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
}
