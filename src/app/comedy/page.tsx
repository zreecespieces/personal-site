"use client";

import React, { useState } from "react";
import {
  Avatar,
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
import {
  formatDate,
  getComediansByEarliestSeen,
  getTotalComediansSeen,
  getTotalShows,
} from "./comedians";
import CloseIcon from "@mui/icons-material/Close";

export default function Comedy() {
  const theme = useTheme();
  const [selectedComedian, setSelectedComedian] = useState<number>(0);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [dialogImage, setDialogImage] = useState("");

  const handleComedianChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedComedian(newValue);
  };

  const openImage = (imageUrl: string) => {
    setDialogImage(imageUrl);
    setOpenImageDialog(true);
  };

  const handleCloseDialog = () => setOpenImageDialog(false);

  const comedians = getComediansByEarliestSeen();

  return (
    <Box component="main">
      <SectionFrame section="hobbies" spacing="loose">
        <PageHeader
          overline="Disciplines · Comedy"
          index="04"
          title="Stand-up comedians and live shows attended."
          subtitle="An ongoing log of the comics I keep going back to and the nights worth remembering."
          size="md"
          meta={
            <Stack direction="row" gap={1}>
              <LabelChip>{getTotalComediansSeen()} Comedians</LabelChip>
              <LabelChip>{getTotalShows()} Shows</LabelChip>
            </Stack>
          }
        />
      </SectionFrame>

      <SectionFrame section="hobbies" spacing="none">
        <Tabs
          value={selectedComedian}
          onChange={handleComedianChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: `1px solid ${theme.zr.lines.muted}`, mb: 5 }}
        >
          {comedians.map((comedian) => (
            <Tab
              key={comedian.name}
              label={
                <Stack direction="row" alignItems="center" gap={1.25}>
                  <Avatar
                    src={comedian.image}
                    alt={comedian.name}
                    sx={{ width: 28, height: 28, border: `1px solid ${theme.zr.lines.muted}` }}
                  />
                  <span>{comedian.name}</span>
                </Stack>
              }
              sx={{ alignItems: "center", minHeight: 56 }}
            />
          ))}
        </Tabs>

        {comedians.map((comedian, index) => (
          <Box key={comedian.name} sx={{ display: selectedComedian === index ? "block" : "none" }}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              gap={{ xs: 3, md: 5 }}
              sx={{ mb: 5 }}
              alignItems={{ md: "flex-start" }}
            >
              <Box
                sx={{
                  width: { xs: "100%", sm: 300 },
                  height: 400,
                  flexShrink: 0,
                  overflow: "hidden",
                  border: `1px solid ${theme.zr.lines.muted}`,
                }}
              >
                <ButtonBase
                  onClick={() => openImage(comedian.image)}
                  sx={{ width: "100%", height: "100%", display: "block" }}
                >
                  <Box
                    component="img"
                    src={comedian.image}
                    alt={comedian.name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "saturate(0.85)",
                    }}
                  />
                </ButtonBase>
              </Box>

              <Stack gap={2} sx={{ flex: 1, minWidth: 0 }}>
                <Overline>Comedian</Overline>
                <Typography variant="h3" component="h2">
                  {comedian.name}
                </Typography>
                <Stack direction="row" gap={1} flexWrap="wrap" sx={{ mt: 1 }}>
                  <LabelChip>
                    {comedian.shows.length} {comedian.shows.length === 1 ? "Show" : "Shows"}
                  </LabelChip>
                  {comedian.shows.length > 0 && (
                    <LabelChip>
                      Last seen ·{" "}
                      {formatDate(
                        comedian.shows.reduce(
                          (latest, show) => (!latest || show.date > latest ? show.date : latest),
                          ""
                        )
                      )}
                    </LabelChip>
                  )}
                </Stack>
              </Stack>
            </Stack>

            <Stack gap={2}>
              <Overline index="01">Show History</Overline>
              <Stack gap={2}>
                {comedian.shows.map((show, idx) => (
                  <ArtifactCard key={idx} padding="loose" hoverable={false}>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      alignItems={{ sm: "flex-start" }}
                      justifyContent="space-between"
                      gap={2}
                    >
                      <Stack gap={1.5} sx={{ flex: 1 }}>
                        <Typography variant="h6" component="h3">
                          {show.tourName ? show.tourName : comedian.name}
                        </Typography>
                        <Stack direction="row" gap={0.75} flexWrap="wrap">
                          <LabelChip size="sm">{formatDate(show.date)}</LabelChip>
                          <LabelChip size="sm">
                            {show.venue}, {show.city}
                          </LabelChip>
                        </Stack>
                        {show.notes && (
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            {show.notes}
                          </Typography>
                        )}
                      </Stack>
                      {show.ticketImage && (
                        <ButtonBase
                          onClick={() => openImage(show.ticketImage!)}
                          sx={{
                            width: { xs: "100%", sm: 220 },
                            height: 120,
                            border: `1px solid ${theme.zr.lines.muted}`,
                            overflow: "hidden",
                            display: "block",
                            flexShrink: 0,
                          }}
                        >
                          <Box
                            component="img"
                            src={show.ticketImage}
                            alt="Ticket"
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              filter: "saturate(0.85)",
                            }}
                          />
                        </ButtonBase>
                      )}
                    </Stack>
                  </ArtifactCard>
                ))}
              </Stack>
            </Stack>
          </Box>
        ))}

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
        open={openImageDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "rgba(15, 15, 13, 0.96)",
            border: `1px solid ${theme.zr.lines.muted}`,
            borderRadius: 1,
          },
        }}
      >
        <DialogContent sx={{ p: 0, position: "relative" }}>
          <IconButton
            onClick={handleCloseDialog}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "text.primary",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.6)" },
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src={dialogImage}
            alt="Enlarged view"
            sx={{
              width: "100%",
              display: "block",
              maxHeight: "80vh",
              objectFit: "contain",
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
