"use client";

import React, { useState } from "react";
import { Box, Container, Typography, Stack, Tabs, Tab, Grid, Chip, Dialog, IconButton, Button } from "@mui/material";
import { hikes, calculateHikeStats, groupHikesByLocation } from "./hikes";
import GradientBorder from "@/components/GradientBorder";
import CloseIcon from "@mui/icons-material/Close";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TimerIcon from "@mui/icons-material/Timer";
import StraightenIcon from "@mui/icons-material/Straighten";
import TerrainIcon from "@mui/icons-material/Terrain";
import HikingIcon from "@mui/icons-material/Hiking";
import PublicIcon from "@mui/icons-material/Public";
import FlagIcon from "@mui/icons-material/Flag";
import NextLink from "next/link";

// Format date from YYYY-MM-DD to Month Day, Year
const formatDate = (dateString: string) => {
  const date = new Date(dateString + "T00:00:00"); // Add time component to ensure correct date
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};

export default function Hikes() {
  const hikeStats = calculateHikeStats();
  const locationGroups = groupHikesByLocation();

  const [selectedLocationIndex, setSelectedLocationIndex] = useState(0);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageSet, setCurrentImageSet] = useState<string[]>([]);

  // Image Dialog Handlers
  const handleImageOpen = (imageUrl: string, index: number, images: string[]) => {
    setCurrentImage(imageUrl);
    setCurrentImageIndex(index);
    setCurrentImageSet(images);
    setImageDialogOpen(true);
  };

  const handleImageClose = () => {
    setImageDialogOpen(false);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % currentImageSet.length;
      setCurrentImage(currentImageSet[newIndex]);
      return newIndex;
    });
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + currentImageSet.length) % currentImageSet.length;
      setCurrentImage(currentImageSet[newIndex]);
      return newIndex;
    });
  };

  // Get difficulty level color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "#4CAF50"; // Green
      case "Moderate":
        return "#FF9800"; // Orange
      case "Hard":
        return "#F44336"; // Red
      case "Very Hard":
        return "#9C27B0"; // Purple
      default:
        return "#9E9E9E"; // Grey
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={6}>
        {/* Title and Stats */}
        <GradientBorder gradientColors={["#66ff00", "#228B22"]} sx={{ width: "100%" }} contentSx={{ p: 4, textAlign: "center" }}>
          <Typography
            variant="h3"
            component="h1"
            fontWeight="700"
            gutterBottom
            sx={{
              background: "linear-gradient(to right, #66ff00, #228B22)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.02em",
            }}>
            Hiking
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 3, mt: 2 }}>
            <Chip
              icon={<HikingIcon />}
              label={`${hikeStats.totalHikes} Hikes`}
              sx={{
                bgcolor: "rgba(76, 175, 80, 0.15)",
                backdropFilter: "blur(5px)",
                "& .MuiChip-icon": { color: "#66ff00" },
              }}
            />
            <Chip
              icon={<StraightenIcon />}
              label={`${hikeStats.totalDistance.toFixed(1)} Miles`}
              sx={{
                bgcolor: "rgba(33, 150, 243, 0.15)",
                backdropFilter: "blur(5px)",
                "& .MuiChip-icon": { color: "#03DAC6" },
              }}
            />
            <Chip
              icon={<TerrainIcon />}
              label={`${hikeStats.totalElevation.toLocaleString()} ft Climbed`}
              sx={{
                bgcolor: "rgba(245, 245, 220, 0.15)",
                backdropFilter: "blur(5px)",
                "& .MuiChip-icon": { color: "#F5F5DC" },
              }}
            />
          </Box>
        </GradientBorder>

        {/* Location Tabs */}
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={selectedLocationIndex}
            onChange={(_, newValue) => setSelectedLocationIndex(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              mb: 3,
              "& .MuiTabs-indicator": {
                background: "linear-gradient(to right, #66ff00, #228B22)",
              },
              "& .MuiTab-root": {
                fontWeight: 600,
                letterSpacing: "0.02em",
                opacity: 0.7,
                "&.Mui-selected": {
                  opacity: 1,
                  background: "linear-gradient(to right, #66ff00, #228B22)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                },
              },
            }}>
            {locationGroups.map((location, index) => (
              <Tab
                key={location.id}
                label={location.name}
                icon={location.type === "domestic" ? <FlagIcon fontSize="small" /> : <PublicIcon fontSize="small" />}
                iconPosition="start"
              />
            ))}
          </Tabs>

          {/* Selected Location Content */}
          {locationGroups.map((locationGroup, groupIndex) => (
            <Box key={`location-${locationGroup.id}`} sx={{ display: selectedLocationIndex === groupIndex ? "block" : "none" }}>
              {/* Location Header */}
              <GradientBorder gradientColors={["#66ff00", "#228B22"]} sx={{ width: "100%", mb: 4 }} contentSx={{ p: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
                  <Box>
                    <Typography variant="h4" fontWeight="700" gutterBottom>
                      {locationGroup.name}
                      <Typography component="span" variant="h6" color="text.secondary" sx={{ ml: 1 }}>
                        {locationGroup.type === "domestic" ? "United States" : ""}
                      </Typography>
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {locationGroup.totalHikes} hikes • {locationGroup.totalDistance.toFixed(1)} miles hiked •{" "}
                      {locationGroup.totalElevation.toLocaleString()} ft elevation gain
                    </Typography>
                  </Box>
                  <Box>
                    <Chip
                      icon={locationGroup.type === "domestic" ? <FlagIcon /> : <PublicIcon />}
                      label={locationGroup.type === "domestic" ? "Domestic" : "International"}
                      sx={{
                        bgcolor: locationGroup.type === "domestic" ? "rgba(33, 150, 243, 0.15)" : "rgba(156, 39, 176, 0.15)",
                        "& .MuiChip-icon": {
                          color: locationGroup.type === "domestic" ? "#03DAC6" : "#9C27B0",
                        },
                      }}
                    />
                  </Box>
                </Box>
              </GradientBorder>

              {/* Hikes Grid */}
              <Grid container spacing={3} sx={{ mb: 6 }}>
                {locationGroup.hikes.map((hike, hikeIndex) => (
                  <Grid key={`${locationGroup.id}-hike-${hikeIndex}`} size={{ xs: 12, md: 6, lg: 4 }}>
                    <GradientBorder
                      gradientColors={["#66ff00", "#228B22"]}
                      sx={{ width: "100%", height: "100%" }}
                      contentSx={{ p: 0, height: "100%", display: "flex", flexDirection: "column" }}>
                      {/* Hike Image */}
                      <Box
                        sx={{
                          height: 180,
                          width: "100%",
                          position: "relative",
                          cursor: "pointer",
                        }}
                        onClick={() => handleImageOpen(hike.images[0], 0, hike.images)}>
                        <img
                          src={hike.images[0]}
                          alt={hike.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            p: 1,
                            bgcolor: "rgba(0,0,0,0.5)",
                          }}>
                          <Typography variant="subtitle1" fontWeight="600" sx={{ color: "white", fontSize: "0.8rem" }}>
                            {hike.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)", fontSize: "0.65rem" }}>
                            {formatDate(hike.date)}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Hike Details */}
                      <Box sx={{ p: 2, display: "flex", flexDirection: "column", flex: 1 }}>
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                          <Chip
                            label={`Difficulty: ${hike.difficulty}`}
                            size="small"
                            sx={{
                              bgcolor: `${getDifficultyColor(hike.difficulty)}22`,
                              color: getDifficultyColor(hike.difficulty),
                              fontWeight: 600,
                            }}
                          />
                          <Chip
                            icon={<StraightenIcon sx={{ fontSize: "0.8rem" }} />}
                            label={`${hike.distance} miles`}
                            size="small"
                          />
                          {hike.elevation && (
                            <Chip
                              icon={<TerrainIcon sx={{ fontSize: "0.8rem" }} />}
                              label={`${hike.elevation} ft`}
                              size="small"
                            />
                          )}
                        </Box>

                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
                          <LocationOnIcon fontSize="small" sx={{ verticalAlign: "middle", mr: 0.5, opacity: 0.7 }} />
                          {hike.location}
                        </Typography>
                      </Box>
                    </GradientBorder>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
          <Button component={NextLink} href="/linktree" sx={{ mt: 4, color: "#66ff00", textTransform: "none" }}>
            Back to Linktree
          </Button>
        </Box>
      </Stack>

      {/* Image Dialog */}
      <Dialog
        open={imageDialogOpen}
        onClose={handleImageClose}
        maxWidth="lg"
        sx={{
          "& .MuiDialog-paper": {
            bgcolor: "background.paper",
            backgroundImage: "none",
            boxShadow: 24,
            p: 0,
            m: 0,
            borderRadius: 2,
            overflow: "hidden",
            width: "100%",
            height: "auto",
            maxHeight: "90vh",
          },
        }}>
        <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
          <img
            src={currentImage}
            alt="Enlarged view"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "90vh",
              objectFit: "contain",
            }}
          />
          <IconButton
            onClick={handleImageClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.7)",
              },
            }}>
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
                  bgcolor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  "&:hover": {
                    bgcolor: "rgba(0, 0, 0, 0.7)",
                  },
                }}>
                <NavigateBeforeIcon />
              </IconButton>
              <IconButton
                onClick={handleNextImage}
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: 8,
                  transform: "translateY(-50%)",
                  bgcolor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  "&:hover": {
                    bgcolor: "rgba(0, 0, 0, 0.7)",
                  },
                }}>
                <NavigateNextIcon />
              </IconButton>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 16,
                  left: "50%",
                  transform: "translateX(-50%)",
                  bgcolor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  px: 2,
                  py: 0.5,
                  borderRadius: 4,
                  fontSize: "0.875rem",
                }}>
                {currentImageIndex + 1} / {currentImageSet.length}
              </Box>
            </>
          )}
        </Box>
      </Dialog>
    </Container>
  );
}
