"use client";

import React from "react";
import { Box, LinearProgress, Rating, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import NextLink from "next/link";
import {
  ArtifactCard,
  LabelChip,
  MakersMarkFooter,
  Overline,
  PageHeader,
  SectionFrame,
} from "@/components/primitives";
import { completedBooks, currentlyReading } from "./books";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};

const getDaysAgo = (dateString: string) => {
  const startDate = new Date(dateString);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
};

export default function Reading() {
  const theme = useTheme();

  return (
    <Box component="main">
      <SectionFrame section="education" spacing="loose">
        <PageHeader
          overline="Learning · Reading"
          index="03"
          title="Currently reading, recently completed, and annotated as I go."
          subtitle="A running shelf — fiction and nonfiction, in roughly equal measure."
          size="md"
          meta={
            <Stack direction="row" gap={1}>
              <LabelChip>{currentlyReading.length} In Progress</LabelChip>
              <LabelChip>{completedBooks.length} Completed</LabelChip>
            </Stack>
          }
        />
      </SectionFrame>

      <SectionFrame section="education" spacing="none">
        <Stack gap={6}>
          <Stack gap={2.5}>
            <Overline index="01">Currently Reading</Overline>
            <Box
              sx={{
                display: "grid",
                gap: 3,
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              }}
            >
              {currentlyReading.map((book) => (
                <ArtifactCard key={book.title} padding="none" hoverable={false}>
                  <Stack direction={{ xs: "column", sm: "row" }} sx={{ height: "100%" }}>
                    {book.coverImage && (
                      <Box
                        sx={{
                          width: { xs: "100%", sm: 150 },
                          height: { xs: 220, sm: "auto" },
                          flexShrink: 0,
                          overflow: "hidden",
                          backgroundColor: theme.zr.ink[900],
                          borderRight: { sm: `1px solid ${theme.zr.lines.muted}` },
                          borderBottom: { xs: `1px solid ${theme.zr.lines.muted}`, sm: "none" },
                        }}
                      >
                        <Box
                          component="img"
                          src={book.coverImage}
                          alt={book.title}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            filter: "saturate(0.85)",
                          }}
                        />
                      </Box>
                    )}
                    <Stack gap={1} sx={{ p: 3, flex: 1 }}>
                      <Typography
                        component="a"
                        href={book.url}
                        target="_blank"
                        rel="noreferrer"
                        variant="h5"
                        sx={{
                          textDecoration: "none",
                          color: "text.primary",
                          "&:hover": { color: theme.zr.accent.brassLight },
                        }}
                      >
                        {book.title}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        by {book.author}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Started {formatDate(book.startedDate)} · {getDaysAgo(book.startedDate)}
                      </Typography>

                      <Stack gap={0.75} sx={{ mt: 1.5 }}>
                        <Stack direction="row" justifyContent="space-between">
                          <Overline>Progress</Overline>
                          <Typography
                            variant="caption"
                            sx={{
                              fontFamily: `var(${theme.zr.cssVars.fontMono})`,
                              color: theme.zr.bone[200],
                            }}
                          >
                            {book.progress}%
                          </Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={book.progress}
                          sx={{
                            height: 3,
                            borderRadius: 0,
                            backgroundColor: theme.zr.lines.muted,
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: theme.zr.accent.brass,
                              borderRadius: 0,
                            },
                          }}
                        />
                      </Stack>
                    </Stack>
                  </Stack>
                </ArtifactCard>
              ))}
            </Box>
          </Stack>

          <Stack gap={2.5}>
            <Overline index="02">Completed</Overline>
            <Box
              sx={{
                display: "grid",
                gap: 3,
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                },
              }}
            >
              {completedBooks.map((book) => (
                <ArtifactCard key={book.title} padding="none" hoverable={false}>
                  {book.coverImage && (
                    <Box
                      sx={{
                        width: "100%",
                        height: 360,
                        overflow: "hidden",
                        backgroundColor: theme.zr.ink[900],
                        borderBottom: `1px solid ${theme.zr.lines.muted}`,
                      }}
                    >
                      <Box
                        component="img"
                        src={book.coverImage}
                        alt={book.title}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          filter: "saturate(0.85)",
                        }}
                      />
                    </Box>
                  )}
                  <Stack gap={1} sx={{ p: 3 }}>
                    <Typography
                      component="a"
                      href={book.url}
                      target="_blank"
                      rel="noreferrer"
                      variant="h6"
                      sx={{
                        textDecoration: "none",
                        color: "text.primary",
                        "&:hover": { color: theme.zr.accent.brassLight },
                      }}
                    >
                      {book.title}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      by {book.author}
                    </Typography>
                    {book.rating && (
                      <Rating
                        value={book.rating}
                        readOnly
                        size="small"
                        sx={{
                          mt: 0.5,
                          "& .MuiRating-iconFilled": { color: theme.zr.accent.brass },
                          "& .MuiRating-iconEmpty": { color: theme.zr.lines.muted },
                        }}
                      />
                    )}
                    {book.completedDate && (
                      <Typography variant="caption" color="text.secondary">
                        Completed {formatDate(book.completedDate)}
                      </Typography>
                    )}
                    {book.review && (
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 1.5,
                          fontStyle: "italic",
                          color: "text.secondary",
                          borderLeft: `2px solid ${theme.zr.accent.brass}`,
                          pl: 1.5,
                        }}
                      >
                        &ldquo;{book.review}&rdquo;
                      </Typography>
                    )}
                  </Stack>
                </ArtifactCard>
              ))}
            </Box>
          </Stack>
        </Stack>

        <Box sx={{ mt: 6 }}>
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
