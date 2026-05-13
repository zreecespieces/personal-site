"use client";

import React, { useState } from "react";
import {
  Box,
  ButtonBase,
  CardMedia,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
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
import { Festival, festivals } from "./festivals";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export default function MusicFestivals() {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>("all");

  const years = Array.from(new Set(festivals.map((festival) => festival.year))).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  const festivalsByYear: { [key: string]: Festival[] } = {};
  years.forEach((year) => {
    festivalsByYear[year] = festivals.filter((festival) => festival.year === year);
  });

  const handleYearChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedYear(newValue);
  };

  const openFestivalDetails = (festival: Festival) => {
    setSelectedFestival(festival);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const visibleFestivals =
    selectedYear === "all" ? festivals : (festivalsByYear[selectedYear] ?? []);

  return (
    <Box component="main">
      <SectionFrame section="hobbies" spacing="loose">
        <PageHeader
          overline="Disciplines · Music Festivals"
          index="05"
          title="Festivals attended, year by year."
          subtitle="A running ledger of the lineups worth flying for — Bonnaroo, ACL, Lost Lands, and more."
          size="md"
          meta={
            <Stack direction="row" gap={1}>
              <LabelChip>{festivals.length} Festivals</LabelChip>
              <LabelChip>{years.length} Years</LabelChip>
            </Stack>
          }
        />
      </SectionFrame>

      <SectionFrame section="hobbies" spacing="none">
        <Tabs
          value={selectedYear}
          onChange={handleYearChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: `1px solid ${theme.zr.lines.muted}`, mb: 5 }}
        >
          <Tab key="all" label="All" value="all" />
          {years.map((year) => (
            <Tab key={year} label={year} value={year} />
          ))}
        </Tabs>

        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
          }}
        >
          {visibleFestivals.map((festival, index) => (
            <ArtifactCard
              key={`${festival.name}-${festival.year}-${index}`}
              padding="none"
              onClick={() => openFestivalDetails(festival)}
            >
              <Box
                sx={{
                  position: "relative",
                  paddingTop: "56.25%",
                  overflow: "hidden",
                  borderBottom: `1px solid ${theme.zr.lines.muted}`,
                }}
              >
                <CardMedia
                  component="img"
                  image={festival.image}
                  alt={`${festival.name} ${festival.year}`}
                  sx={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "saturate(0.85)",
                  }}
                />
              </Box>
              <Stack gap={1} sx={{ p: 2.5 }}>
                <Stack direction="row" alignItems="baseline" gap={1.5}>
                  <Typography variant="h6" component="h3">
                    {festival.name}
                  </Typography>
                  {selectedYear === "all" && (
                    <Overline sx={{ ml: "auto" }}>{festival.year}</Overline>
                  )}
                </Stack>
                <Typography variant="caption" color="text.secondary">
                  {festival.location}
                </Typography>
              </Stack>
            </ArtifactCard>
          ))}
        </Box>

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
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "rgba(15, 15, 13, 0.96)",
            backgroundImage: "none",
            border: `1px solid ${theme.zr.lines.muted}`,
            borderRadius: 1,
            overflow: "hidden",
          },
        }}
      >
        {selectedFestival && (
          <DialogContent sx={{ p: 0, position: "relative" }}>
            <IconButton
              onClick={handleCloseDialog}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: "text.primary",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.6)" },
                zIndex: 1,
              }}
            >
              <CloseIcon />
            </IconButton>

            <Box sx={{ position: "relative", width: "100%", paddingTop: "50%" }}>
              <CardMedia
                component="img"
                image={selectedFestival.image}
                alt={`${selectedFestival.name} ${selectedFestival.year}`}
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "saturate(0.85)",
                }}
              />
            </Box>

            <Stack
              gap={1.5}
              sx={{
                p: 3,
                borderTop: `1px solid ${theme.zr.lines.muted}`,
              }}
            >
              <Overline>{selectedFestival.year}</Overline>
              <Typography variant="h4" component="h3">
                {selectedFestival.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedFestival.location}
              </Typography>

              {selectedFestival.description && (
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {selectedFestival.description}
                </Typography>
              )}

              {selectedFestival.url && (
                <Box sx={{ mt: 2 }}>
                  <LabelChip
                    href={selectedFestival.url}
                    endGlyph={<OpenInNewIcon sx={{ fontSize: "0.8rem" }} />}
                  >
                    Visit Official Site
                  </LabelChip>
                </Box>
              )}
            </Stack>
          </DialogContent>
        )}
      </Dialog>
    </Box>
  );
}
