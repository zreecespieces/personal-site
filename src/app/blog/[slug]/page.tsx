import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Box, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Overline, SectionFrame } from "@/components/primitives";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { formatCalendarDate } from "@/lib/dates";

const getReadingTime = (content: string) => {
  const averageWordsPerMinute = 225;
  const wordCount = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[^\w\s'-]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(wordCount / averageWordsPerMinute));
};

const mdxComponents = {
  // The article title owns the page's h1, including when an MDX file uses #.
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Typography
      variant="h4"
      component="h2"
      sx={{ color: "text.primary", mt: { xs: 5, md: 6 }, mb: 2 }}
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Typography
      variant="h4"
      component="h2"
      sx={{ color: "text.primary", mt: { xs: 5, md: 6 }, mb: 2 }}
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Typography
      variant="h5"
      component="h3"
      sx={{ color: "text.primary", mt: 4, mb: 1.5 }}
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <Typography
      variant="body1"
      component="p"
      sx={{
        mb: 3,
        color: "text.primary",
        fontSize: { xs: "1.06rem", md: "1.17rem" },
        lineHeight: 1.86,
      }}
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <Box component="ul" sx={{ mb: 3, pl: 3, "& li": { mb: 1 } }} {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <Box component="ol" sx={{ mb: 3, pl: 3, "& li": { mb: 1 } }} {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <Typography
      component="li"
      variant="body1"
      sx={{ color: "text.primary", fontSize: { xs: "1.06rem", md: "1.17rem" }, lineHeight: 1.86 }}
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <Box
      component="blockquote"
      sx={{
        borderLeft: "2px solid var(--zr-section-accent)",
        pl: { xs: 2.5, md: 3.5 },
        my: { xs: 4, md: 5 },
        mx: 0,
        "& p": { fontStyle: "italic" },
        "& p:last-child": { mb: 0 },
      }}
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <Box
      component="code"
      sx={{
        backgroundColor: "action.hover",
        color: "text.primary",
        px: 0.5,
        py: 0.25,
        borderRadius: 0.5,
        fontSize: "0.875em",
        fontFamily: "var(--font-plex-mono)",
      }}
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <Box
      component="pre"
      tabIndex={0}
      sx={{
        backgroundColor: "background.paper",
        border: "1px solid var(--zr-line-muted)",
        p: { xs: 2, md: 2.5 },
        my: 4,
        maxWidth: "100%",
        overflowX: "auto",
        fontFamily: "var(--font-plex-mono)",
        fontSize: "0.875rem",
        lineHeight: 1.7,
        "& code": { backgroundColor: "transparent", p: 0, fontSize: "inherit" },
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
        "&:hover": { textDecorationColor: "currentColor" },
      }}
      {...props}
    />
  ),
  hr: () => (
    <Box component="hr" sx={{ border: 0, borderTop: "1px solid var(--zr-line-muted)", my: 5 }} />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <Box
      component="img"
      loading="lazy"
      decoding="async"
      sx={{ display: "block", maxWidth: "100%", height: "auto", my: 4 }}
      {...props}
    />
  ),
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = `https://zacharyreece.dev/blog/${post.slug}`;
  const title = `${post.title} | Zachary Reece`;
  const image = "https://zacharyreece.dev/opengraph-image";

  return {
    title: { absolute: title },
    description: post.description,
    authors: [{ name: "Zachary Reece", url: "https://zacharyreece.dev/about" }],
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: "Zachary Reece",
      locale: "en_US",
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: ["Zachary Reece"],
      tags: post.tags,
      images: [{ url: image, width: 1200, height: 630, alt: "Zachary Reece" }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@zreecespieces",
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const readingMinutes = getReadingTime(post.content);

  return (
    <Box component="main" id="main-content">
      <SectionFrame section="professional" spacing="loose" signature={false}>
        <Box component="article" aria-labelledby="article-title" sx={{ maxWidth: 800, mx: "auto" }}>
          <Stack
            component="header"
            gap={2.5}
            sx={{
              pb: { xs: 4, md: 5 },
              mb: { xs: 4, md: 5 },
              borderBottom: "1px solid var(--zr-line-muted)",
            }}
          >
            <Typography
              component={NextLink}
              href="/blog"
              variant="body2"
              sx={{
                width: "fit-content",
                mb: 2,
                color: "text.secondary",
                textUnderlineOffset: "0.25em",
              }}
            >
              All writing / Aberrant Quiddity
            </Typography>
            <Typography
              id="article-title"
              variant="h2"
              component="h1"
              sx={{ color: "text.primary", maxWidth: "20ch" }}
            >
              {post.title}
            </Typography>
            <Typography
              variant="subtitle1"
              component="p"
              sx={{ maxWidth: "60ch", color: "text.secondary", lineHeight: 1.7 }}
            >
              {post.description}
            </Typography>
            <Stack direction="row" gap={2} flexWrap="wrap" sx={{ color: "text.secondary" }}>
              <Typography variant="body2">Zachary Reece</Typography>
              <Typography component="time" dateTime={post.date} variant="body2">
                {formatCalendarDate(post.date)}
              </Typography>
              <Typography variant="body2">About {readingMinutes} min read</Typography>
            </Stack>
          </Stack>

          <Box
            sx={{
              maxWidth: 720,
              mx: "auto",
              overflowWrap: "anywhere",
              "& > :first-child": { mt: 0 },
              "& > :last-child": { mb: 0 },
              "& > p:first-of-type": { fontSize: { xs: "1.12rem", md: "1.22rem" } },
            }}
          >
            <MDXRemote source={post.content} components={mdxComponents} />
          </Box>

          <Box
            component="footer"
            sx={{ mt: { xs: 6, md: 8 }, pt: 3, borderTop: "1px solid var(--zr-line-muted)" }}
          >
            {post.tags.length > 0 && (
              <Stack direction="row" gap={1.5} alignItems="baseline" sx={{ mb: 3 }}>
                <Overline>Topics</Overline>
                <Typography variant="body2" color="text.secondary">
                  {post.tags.join(" / ")}
                </Typography>
              </Stack>
            )}
            <Stack
              component="nav"
              aria-label="Article navigation"
              direction="row"
              justifyContent="space-between"
              gap={2}
              flexWrap="wrap"
            >
              <Typography
                component={NextLink}
                href="/blog"
                variant="body2"
                sx={{ color: "text.primary", textUnderlineOffset: "0.25em" }}
              >
                Back to all writing
              </Typography>
              <Typography
                component={NextLink}
                href="/"
                variant="body2"
                sx={{ color: "text.secondary", textUnderlineOffset: "0.25em" }}
              >
                Site index
              </Typography>
            </Stack>
          </Box>
        </Box>
      </SectionFrame>
    </Box>
  );
}
