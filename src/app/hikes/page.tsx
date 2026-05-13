"use client";

import React, { useState } from "react";
import { Box, Dialog, Grid, IconButton, Stack, Tab, Tabs, Typography } from "@mui/material";
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
import { calculateHikeStats, groupHikesByLocation } from "./hikes";
import CloseIcon from "@mui/icons-material/Close";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

const formatDate = (dateString: string) => {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};

export default function Hikes() {
  const theme = useTheme();
  const hikeStats = calculateHikeStats();
  const locationGroups = groupHikesByLocation();

  const [selectedLocationId, setSelectedLocationId] = useState(() => locationGroups[0]?.id ?? "");
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageSet, setCurrentImageSet] = useState<string[]>([]);
  const selectedLocationGroup =
    locationGroups.find((location) => location.id === selectedLocationId) ?? locationGroups[0];

  const handleImageOpen = (imageUrl: string, index: number, images: string[]) => {
    setCurrentImage(imageUrl);
    setCurrentImageIndex(index);
    setCurrentImageSet(images);
    setImageDialogOpen(true);
  };

  const handleImageClose = () => setImageDialogOpen(false);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => {
      const next = (prev + 1) % currentImageSet.length;
      setCurrentImage(currentImageSet[next]);
      return next;
    });
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => {
      const next = (prev - 1 + currentImageSet.length) % currentImageSet.length;
      setCurrentImage(currentImageSet[next]);
      return next;
    });
  };

  // Map difficulty levels to restrained accent colors from the theme.
  const getDifficultyAccent = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return theme.zr.accent.moss;
      case "Moderate":
        return theme.zr.accent.brass;
      case "Hard":
        return theme.zr.accent.ember;
      case "Very Hard":
        return theme.zr.accent.oxide;
      default:
        return theme.zr.stone[500];
    }
  };

  return (
    <Box component="main">
      <SectionFrame section="hobbies" spacing="loose">
        <PageHeader
          overline="Disciplines · Hiking"
          index="02"
          title="Trails, summits, and the slow ascent."
          subtitle="A running log — distance, elevation, difficulty, and the occasional view worth sharing."
          size="md"
          meta={
            <Stack direction="row" gap={1} flexWrap="wrap">
              <LabelChip>{hikeStats.totalHikes} Hikes</LabelChip>
              <LabelChip>{hikeStats.totalDistance.toFixed(1)} Miles</LabelChip>
              <LabelChip>{hikeStats.totalElevation.toLocaleString()} ft Gain</LabelChip>
            </Stack>
          }
        />
      </SectionFrame>

      <SectionFrame section="hobbies" spacing="none">
        <Tabs
          value={selectedLocationGroup?.id ?? false}
          onChange={(_, newValue: string) => setSelectedLocationId(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="hike location tabs"
          sx={{ borderBottom: `1px solid ${theme.zr.lines.muted}`, mb: 5 }}
        >
          {locationGroups.map((location) => (
            <Tab key={location.id} value={location.id} label={location.name} />
          ))}
        </Tabs>

        {selectedLocationGroup && (
          <Box>
            <Stack gap={2.5} sx={{ mb: 5 }}>
              <Overline>
                {selectedLocationGroup.type === "domestic" ? "United States" : "International"}
              </Overline>
              <Typography variant="h3" component="h2">
                {selectedLocationGroup.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedLocationGroup.totalHikes} hikes ·{" "}
                {selectedLocationGroup.totalDistance.toFixed(1)} miles ·{" "}
                {selectedLocationGroup.totalElevation.toLocaleString()} ft gain
              </Typography>
            </Stack>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              {selectedLocationGroup.hikes.map((hike, i) => (
                <Grid key={`${selectedLocationGroup.id}-hike-${i}`} size={{ xs: 12, md: 6, lg: 4 }}>
                  <ArtifactCard
                    padding="none"
                    onClick={() => handleImageOpen(hike.images[0], 0, hike.images)}
                  >
                    <Box
                      sx={{
                        height: 200,
                        width: "100%",
                        overflow: "hidden",
                        borderBottom: `1px solid ${theme.zr.lines.muted}`,
                        position: "relative",
                      }}
                    >
                      <Box
                        component="img"
                        src={hike.images[0]}
                        alt={hike.name}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          filter: "saturate(0.85)",
                          display: "block",
                        }}
                      />
                    </Box>
                    <Stack gap={1.5} sx={{ p: 2.5 }}>
                      <Stack gap={0.25}>
                        <Overline>{formatDate(hike.date)}</Overline>
                        <Typography variant="h6" component="h3">
                          {hike.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {hike.location}
                        </Typography>
                      </Stack>
                      <Stack direction="row" gap={0.75} flexWrap="wrap" sx={{ mt: 0.5 }}>
                        <LabelChip size="sm" accent={getDifficultyAccent(hike.difficulty)}>
                          {hike.difficulty}
                        </LabelChip>
                        <LabelChip size="sm">{hike.distance} mi</LabelChip>
                        {hike.elevation && <LabelChip size="sm">{hike.elevation} ft</LabelChip>}
                      </Stack>
                    </Stack>
                  </ArtifactCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

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

      <Dialog
        open={imageDialogOpen}
        onClose={handleImageClose}
        maxWidth="lg"
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "rgba(15, 15, 13, 0.96)",
            backgroundImage: "none",
            border: `1px solid ${theme.zr.lines.muted}`,
            borderRadius: 1,
            overflow: "hidden",
            width: "100%",
            maxHeight: "90vh",
          },
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Box
            component="img"
            src={currentImage}
            alt="Hike enlarged view"
            sx={{
              width: "100%",
              maxHeight: "90vh",
              objectFit: "contain",
              display: "block",
            }}
          />
          <IconButton
            onClick={handleImageClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              color: "text.primary",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.6)" },
            }}
          >
            <CloseIcon />
          </IconButton>
          {currentImageSet.length > 1 && (
            <>
              <IconButton
                onClick={handlePrevImage}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: 8,
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  color: "text.primary",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.6)" },
                }}
              >
                <NavigateBeforeIcon />
              </IconButton>
              <IconButton
                onClick={handleNextImage}
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: 8,
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  color: "text.primary",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.6)" },
                }}
              >
                <NavigateNextIcon />
              </IconButton>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 16,
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "rgba(15, 15, 13, 0.85)",
                  border: `1px solid ${theme.zr.lines.muted}`,
                  color: "text.primary",
                  fontFamily: `var(${theme.zr.cssVars.fontMono})`,
                  fontSize: "0.7rem",
                  letterSpacing: "0.06em",
                  px: 1.5,
                  py: 0.4,
                  borderRadius: 1,
                }}
              >
                {currentImageIndex + 1} / {currentImageSet.length}
              </Box>
            </>
          )}
        </Box>
      </Dialog>
    </Box>
  );
}
