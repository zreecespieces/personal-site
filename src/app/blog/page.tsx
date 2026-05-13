import React from "react";
import { Box, Container, Stack, Typography, Chip } from "@mui/material";
import NextLink from "next/link";
import GradientBorder from "@/components/GradientBorder";
import { getAllPosts } from "@/lib/blog";
import { BLOG_GRADIENT, BLOG_HOVER, BLOG_SHADOW, BLOG_SURFACE, BLOG_TEXT } from "./theme";

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
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* Header */}
        <GradientBorder
          gradientColors={BLOG_GRADIENT}
          sx={{ width: "100%" }}
          contentSx={{
            p: 4,
            textAlign: "center",
            background: BLOG_SURFACE,
            boxShadow: BLOG_SHADOW,
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            fontWeight="700"
            gutterBottom
            sx={{
              background: `linear-gradient(to right, ${BLOG_GRADIENT[0]}, ${BLOG_GRADIENT[1]})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.02em",
            }}
          >
            Aberrant Quiddity
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#FFFFFF", fontSize: "1.05rem", lineHeight: 1.5 }}
          >
            Thoughts on software engineering, philosophy, and AI.
          </Typography>
        </GradientBorder>

        {/* Posts */}
        <Stack spacing={3}>
          {posts.map((post) => (
            <Box
              key={post.slug}
              component={NextLink}
              href={`/blog/${post.slug}`}
              sx={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
            >
              <Box
                sx={{
                  background: BLOG_SURFACE,
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(163, 230, 53, 0.16)",
                  borderRadius: 3,
                  p: 3,
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: BLOG_SHADOW,
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: `linear-gradient(90deg, ${BLOG_GRADIENT[0]}, ${BLOG_GRADIENT[1]})`,
                  },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: BLOG_TEXT,
                    fontSize: { xs: "1.45rem", md: "1.7rem" },
                    fontWeight: 700,
                    letterSpacing: "0.01em",
                    lineHeight: 1.15,
                    mb: 0.75,
                  }}
                >
                  {post.title}
                </Typography>

                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "#FFFFFF",
                    display: "block",
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    fontWeight: 600,
                    lineHeight: 1.25,
                    mb: 1.25,
                  }}
                >
                  {formatDate(post.date)}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: "#FFFFFF",
                    fontSize: { xs: "1rem", md: "1.06rem" },
                    fontWeight: 400,
                    lineHeight: 1.6,
                    mb: 2.25,
                  }}
                >
                  {post.description}
                </Typography>

                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {post.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{
                        bgcolor: "rgba(163, 230, 53, 0.1)",
                        border: "1px solid rgba(163, 230, 53, 0.15)",
                        color: BLOG_GRADIENT[0],
                        fontSize: "0.72rem",
                        fontWeight: 500,
                        height: 25,
                        minWidth: 48,
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            </Box>
          ))}
        </Stack>

        {/* Back to LinkTree */}
        <Box sx={{ display: "flex", justifyContent: "left", mt: 2 }}>
          <Typography
            component={NextLink}
            href="/linktree"
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
            Back to LinkTree
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
}
