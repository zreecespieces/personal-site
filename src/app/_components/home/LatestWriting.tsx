"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { MetaLine } from "@/components/primitives";
import type { BlogPostMeta } from "@/lib/blog";
import { formatCalendarDate } from "@/lib/dates";

export default function LatestWriting({ post }: { post?: BlogPostMeta }) {
  if (!post) return null;

  return (
    <Box
      component="section"
      aria-labelledby="home-writing-title"
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "minmax(0, 0.7fr) minmax(0, 1.5fr)" },
        gap: { xs: 3, md: 8 },
        pt: 3,
        borderTop: "1px solid var(--zr-line-muted)",
      }}
    >
      <Box>
        <Typography id="home-writing-title" component="h2" variant="h4">
          Latest writing
        </Typography>
        <Typography
          component={Link}
          href="/blog"
          variant="body2"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            minHeight: 44,
            mt: 1,
            color: "text.secondary",
          }}
        >
          All writing <span aria-hidden="true">&nbsp;→</span>
        </Typography>
      </Box>
      <Box
        component={Link}
        href={`/blog/${post.slug}`}
        sx={{
          textDecoration: "none",
          color: "text.primary",
          "&:hover h3, &:focus-visible h3": { color: "primary.light" },
        }}
      >
        <MetaLine
          items={[
            <time key="date" dateTime={post.date}>
              {formatCalendarDate(post.date)}
            </time>,
          ]}
        />
        <Typography component="h3" variant="h3" sx={{ mt: 2, mb: 2 }}>
          {post.title}
        </Typography>
        <Typography sx={{ color: "text.secondary", maxWidth: "55ch" }}>
          {post.description}
        </Typography>
        <Typography variant="body2" sx={{ mt: 3, color: "text.primary" }}>
          Read the essay <span aria-hidden="true">↗</span>
        </Typography>
      </Box>
    </Box>
  );
}
