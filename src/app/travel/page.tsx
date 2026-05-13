"use client";

import React, { useState } from "react";
import {
  Box,
  ButtonBase,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import {
  ArtifactCard,
  LabelChip,
  MakersMarkFooter,
  Overline,
  PageHeader,
  SectionFrame,
} from "@/components/primitives";
import {
  calculateDaysSpent,
  countries,
  getTotalCountriesVisited,
  getTotalDaysSpent,
  getTotalStatesVisited,
} from "./countries";
import CloseIcon from "@mui/icons-material/Close";
import USAMapComponent from "./USAMapComponent";

// Format date from YYYY-MM-DD to Month Day, Year
const formatDate = (dateString: string) => {
  const dateTimeString = `${dateString}T12:00:00`;
  const date = new Date(dateTimeString);
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};

// Calculate days between two dates
const calculateDuration = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (isNaN(diffDays)) return "";
  return diffDays === 1 ? "1 day" : `${diffDays} days`;
};

export default function Travel() {
  const [selectedCountry, setSelectedCountry] = useState<number>(0);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [dialogImage, setDialogImage] = useState("");

  const handleCountryChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedCountry(newValue);
  };

  const openImage = (imageUrl: string) => {
    setDialogImage(imageUrl);
    setOpenImageDialog(true);
  };

  const handleCloseDialog = () => setOpenImageDialog(false);

  return (
    <Box component="main">
      <SectionFrame section="hobbies" spacing="loose">
        <PageHeader
          overline="Disciplines · Travel"
          index="01"
          title="Countries, states, and the slow accumulation of distance."
          subtitle="A running log of trips — where, when, and what stayed with me."
          size="md"
          meta={
            <Stack direction="row" gap={1} flexWrap="wrap">
              <LabelChip>{getTotalCountriesVisited()} Countries</LabelChip>
              <LabelChip>{getTotalStatesVisited()} States</LabelChip>
              <LabelChip>{getTotalDaysSpent()} Days Abroad</LabelChip>
            </Stack>
          }
        />
      </SectionFrame>

      <SectionFrame section="hobbies" spacing="none">
        <Tabs
          value={selectedCountry}
          onChange={handleCountryChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: "1px solid var(--zr-line-muted)", mb: 5 }}
        >
          {countries.map((country) => (
            <Tab
              key={country.name}
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span>{country.flag}</span>
                  <span>{country.name}</span>
                </Box>
              }
            />
          ))}
        </Tabs>

        {countries.map((country, index) => (
          <Box key={country.name} sx={{ display: selectedCountry === index ? "block" : "none" }}>
            <Stack gap={5}>
              {/* Cover image */}
              <Box
                sx={{
                  position: "relative",
                  height: { xs: 220, sm: 320, md: 420 },
                  borderRadius: 1,
                  overflow: "hidden",
                  border: "1px solid var(--zr-line-muted)",
                }}
              >
                <Box
                  component="img"
                  src={country.coverImage}
                  alt={country.name}
                  onClick={() => openImage(country.coverImage)}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    cursor: "pointer",
                    display: "block",
                    filter: "saturate(0.9) contrast(1.02)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, transparent 55%, rgba(15,15,13,0.85) 100%)",
                    pointerEvents: "none",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: { xs: 2.5, md: 4 },
                  }}
                >
                  <Stack gap={0.5}>
                    <Overline>{country.flag}</Overline>
                    <Typography variant="h3" component="h2" sx={{ color: "text.primary" }}>
                      {country.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {country.isHomeCountry
                        ? "Home — born and raised in Kansas."
                        : `${country.visits.length} ${country.visits.length === 1 ? "visit" : "visits"} · ${calculateDaysSpent(country.visits)} days total`}
                    </Typography>
                  </Stack>
                </Box>
              </Box>

              {country.description && (
                <Typography variant="body1" sx={{ lineHeight: 1.7, maxWidth: 760 }}>
                  {country.description}
                </Typography>
              )}

              <Stack gap={2}>
                <Overline index="01">Visit History</Overline>
                <Stack gap={1.5}>
                  {country.visits.map((visit, vIndex) => (
                    <ArtifactCard
                      key={`${visit.startDate}-${vIndex}`}
                      padding="regular"
                      hoverable={false}
                    >
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                        alignItems={{ sm: "center" }}
                        justifyContent="space-between"
                      >
                        <Box>
                          <Typography variant="subtitle1" component="div">
                            {formatDate(visit.startDate)} — {formatDate(visit.endDate)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {calculateDuration(visit.startDate, visit.endDate)}
                          </Typography>
                        </Box>
                        <LabelChip>{visit.purpose}</LabelChip>
                      </Stack>
                    </ArtifactCard>
                  ))}
                </Stack>
              </Stack>

              {country.favoriteSpots.length > 0 && (
                <Stack gap={2}>
                  <Overline index="02">Favorite Places</Overline>
                  <Box
                    sx={{
                      display: "grid",
                      gap: 3,
                      gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    }}
                  >
                    {country.favoriteSpots.map((spot, sIndex) => (
                      <ArtifactCard
                        key={`${spot.name}-${sIndex}`}
                        padding="none"
                        hoverable={Boolean(spot.image)}
                        onClick={spot.image ? () => openImage(spot.image as string) : undefined}
                      >
                        {spot.image && (
                          <Box
                            sx={{
                              width: "100%",
                              height: 200,
                              overflow: "hidden",
                              borderBottom: "1px solid var(--zr-line-muted)",
                            }}
                          >
                            <Box
                              component="img"
                              src={spot.image}
                              alt={spot.name}
                              sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                                filter: "saturate(0.9)",
                              }}
                            />
                          </Box>
                        )}
                        <Box sx={{ p: 3 }}>
                          <Typography variant="h6" component="h3">
                            {spot.name}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
                            {spot.description}
                          </Typography>
                        </Box>
                      </ArtifactCard>
                    ))}
                  </Box>
                </Stack>
              )}

              {country.name === "United States" && country.states && (
                <Stack gap={2}>
                  <Overline index="03">States Map</Overline>
                  <USAMapComponent visitedStates={country.states} />
                </Stack>
              )}
            </Stack>
          </Box>
        ))}

        <Box sx={{ mt: 8 }}>
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
        open={openImageDialog}
        onClose={handleCloseDialog}
        maxWidth="lg"
        PaperProps={{
          sx: {
            backgroundColor: "rgba(15, 15, 13, 0.96)",
            backgroundImage: "none",
            border: "1px solid var(--zr-line-muted)",
            borderRadius: 1,
            overflow: "hidden",
          },
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "text.primary",
            zIndex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.6)" },
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ p: 0 }}>
          <Box
            component="img"
            src={dialogImage}
            alt="Enlarged view"
            sx={{
              width: "100%",
              height: "auto",
              display: "block",
              maxHeight: "85vh",
              objectFit: "contain",
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
