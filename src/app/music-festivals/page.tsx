"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  ButtonBase,
  Dialog,
  DialogContent,
  IconButton,
  Paper,
  Divider,
  Tabs,
  Tab,
  useTheme,
} from "@mui/material";
import { festivals, Festival } from "./festivals";
import NextLink from "next/link";
import GradientBorder from "@/components/GradientBorder";
import CloseIcon from "@mui/icons-material/Close";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function MusicFestivals() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>("all");

  // Get unique years from festivals and sort in descending order
  const years = Array.from(new Set(festivals.map((festival) => festival.year))).sort((a, b) => parseInt(b) - parseInt(a));

  // Group festivals by year
  const festivalsByYear: { [key: string]: Festival[] } = {};
  years.forEach((year) => {
    festivalsByYear[year] = festivals.filter((festival) => festival.year === year);
  });

  const allFestivalsSorted = festivals; // already sorted by year when entered

  // Handle year tab change
  const handleYearChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedYear(newValue);
  };

  // Open festival dialog
  const openFestivalDetails = (festival: Festival) => {
    setSelectedFestival(festival);
    setOpenDialog(true);
  };

  // Close festival dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={6}>
        {/* Title Section */}
        <GradientBorder gradientColors={["#FF7B00", "#FFD000"]} sx={{ width: "100%" }} contentSx={{ p: 4, textAlign: "center" }}>
          <Typography
            variant="h3"
            component="h1"
            fontWeight="700"
            gutterBottom
            sx={{
              background: "linear-gradient(to right, #FF7B00, #FFD000)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.02em",
            }}>
            Music Festivals
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 2, my: 2 }}>
            <Chip
              icon={<MusicNoteIcon />}
              label={`${festivals.length} Festivals Attended`}
              sx={{
                bgcolor: "rgba(255, 123, 0, 0.1)",
                color: "#FF7B00",
                fontWeight: 500,
                px: 1,
              }}
            />
            <Chip
              icon={<CalendarTodayIcon />}
              label={`${years.length} Years`}
              sx={{
                bgcolor: "rgba(255, 208, 0, 0.1)",
                color: "#FFD000",
                fontWeight: 500,
                px: 1,
              }}
            />
          </Box>
        </GradientBorder>

        {/* Year Tabs */}
        <Box sx={{ width: "100%", bgcolor: "background.paper", borderRadius: 2, overflow: "hidden" }}>
          <Tabs
            value={selectedYear}
            onChange={handleYearChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              "& .MuiTabs-indicator": {
                backgroundColor: "#FF7B00",
              },
              "& .MuiTab-root.Mui-selected": {
                color: "#FF7B00",
                fontWeight: 600,
              },
            }}>
            <Tab
              key="all"
              label="All"
              value="all"
              icon={<FilterListIcon fontSize="small" />}
              iconPosition="start"
              sx={{ fontWeight: 500 }}
            />
            {years.map((year) => (
              <Tab key={year} label={year} value={year} sx={{ fontWeight: 500 }} />
            ))}
          </Tabs>
        </Box>

        {/* Festival Cards by Year or All */}
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 3 }}>
            {(selectedYear === "all" ? allFestivalsSorted : festivalsByYear[selectedYear])?.map((festival, index) => (
              <Box
                key={`${festival.name}-${festival.year}-${index}`}
                sx={{
                  gridColumn: {
                    xs: "span 12",
                    sm: "span 6",
                    md: "span 4",
                  },
                }}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 2,
                    overflow: "hidden",
                    bgcolor: "rgba(30, 30, 30, 0.7)",
                    backdropFilter: "blur(10px)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.4)",
                    },
                  }}>
                  <ButtonBase
                    onClick={() => openFestivalDetails(festival)}
                    sx={{ display: "block", width: "100%", textAlign: "left", flexGrow: 1 }}>
                    <Box sx={{ position: "relative", paddingTop: "56.25%", overflow: "hidden" }}>
                      <CardMedia
                        component="img"
                        image={festival.image}
                        alt={`${festival.name} ${festival.year}`}
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" fontWeight="600" gutterBottom>
                        {festival.name}
                      </Typography>

                      <Stack direction="row" spacing={1} mt={1}>
                        <Chip
                          icon={<LocationOnIcon sx={{ fontSize: "0.8rem" }} />}
                          label={festival.location}
                          size="small"
                          sx={{
                            bgcolor: "rgba(255, 123, 0, 0.1)",
                            color: "#FF7B00",
                            fontSize: "0.75rem",
                            height: 24,
                          }}
                        />
                        {selectedYear === "all" && (
                          <Chip
                            icon={<CalendarTodayIcon sx={{ fontSize: "0.8rem" }} />}
                            label={festival.year}
                            size="small"
                            sx={{
                              bgcolor: "rgba(255, 208, 0, 0.1)",
                              color: "#FFD000",
                              fontSize: "0.75rem",
                              height: 24,
                            }}
                          />
                        )}
                      </Stack>
                    </CardContent>
                  </ButtonBase>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Back to LinkTree Button */}
        <Box sx={{ display: "flex", justifyContent: "left", mt: 2 }}>
          <Typography
            component={NextLink}
            href="/linktree"
            variant="body1"
            sx={{
              textDecoration: "none",
              color: "#FF7B00",
              py: 1,
              px: 3,
              borderRadius: 2,
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "rgba(187, 134, 252, 0.1)",
              },
            }}>
            Back to LinkTree
          </Typography>
        </Box>
      </Stack>

      {/* Festival Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "rgba(18, 18, 18, 0.95)",
            backdropFilter: "blur(5px)",
            borderRadius: 2,
            overflow: "hidden",
          },
        }}>
        {selectedFestival && (
          <DialogContent sx={{ p: 0, position: "relative" }}>
            <IconButton
              onClick={handleCloseDialog}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: "white",
                bgcolor: "rgba(0, 0, 0, 0.4)",
                "&:hover": { bgcolor: "rgba(0, 0, 0, 0.6)" },
                zIndex: 1,
              }}>
              <CloseIcon />
            </IconButton>

            <Box sx={{ position: "relative", width: "100%", paddingTop: "50%" }}>
              <CardMedia
                component="img"
                image={selectedFestival.image}
                alt={`${selectedFestival.name} ${selectedFestival.year}`}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>

            <Paper
              elevation={0}
              sx={{
                bgcolor: "rgba(0, 0, 0, 0.7)",
                p: 3,
                borderRadius: 0,
                color: "white",
              }}>
              <Typography variant="h4" fontWeight="700" gutterBottom>
                {selectedFestival.name}{" "}
                <Typography component="span" variant="h5" color="primary">
                  {selectedFestival.year}
                </Typography>
              </Typography>

              <Typography variant="subtitle1" sx={{ mb: 2, color: "rgba(255,255,255,0.7)" }}>
                {selectedFestival.location}
              </Typography>

              {selectedFestival.description && (
                <Typography variant="body1" paragraph sx={{ my: 2 }}>
                  {selectedFestival.description}
                </Typography>
              )}

              {selectedFestival.url && (
                <Box sx={{ mt: 3 }}>
                  <ButtonBase
                    component="a"
                    href={selectedFestival.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      color: "#FF7B00",
                      bgcolor: "rgba(255, 123, 0, 0.1)",
                      py: 1,
                      px: 2,
                      borderRadius: 2,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: "rgba(255, 123, 0, 0.2)",
                      },
                    }}>
                    <Typography variant="button" sx={{ mr: 1, fontWeight: 500 }}>
                      Visit Official Site
                    </Typography>
                    <OpenInNewIcon fontSize="small" />
                  </ButtonBase>
                </Box>
              )}
            </Paper>
          </DialogContent>
        )}
      </Dialog>
    </Container>
  );
}
