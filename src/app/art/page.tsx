"use client";

import React, { useState } from "react";
import {
  Box,
  ButtonBase,
  CardMedia,
  Dialog,
  DialogContent,
  IconButton,
  ImageList,
  Stack,
  Typography,
  useMediaQuery,
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
import { ArtPiece, pics } from "./pics";
import CloseIcon from "@mui/icons-material/Close";

export default function Art() {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));

  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [dialogImage, setDialogImage] = useState<ArtPiece>({ src: "", title: "" });

  const openImage = (pic: ArtPiece) => {
    setDialogImage(pic);
    setOpenImageDialog(true);
  };

  const handleCloseDialog = () => setOpenImageDialog(false);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  const getCols = () => {
    if (matchesSM) return 1;
    if (matchesMD) return 2;
    return 3;
  };

  const renderCard = (pic: ArtPiece) => (
    <ArtifactCard key={pic.title} padding="none" onClick={() => openImage(pic)}>
      <CardMedia
        component="img"
        image={pic.src}
        alt={pic.title}
        sx={{
          width: "100%",
          height: "auto",
          display: "block",
          filter: "saturate(0.9)",
          borderBottom: `1px solid ${theme.zr.lines.muted}`,
        }}
      />
      <Stack gap={1} sx={{ p: 2.5 }}>
        <Typography variant="h6" component="h3">
          {pic.title}
        </Typography>
        {pic.description && (
          <Typography variant="body2" color="text.secondary">
            {pic.description}
          </Typography>
        )}
        <Stack direction="row" gap={0.75} flexWrap="wrap" sx={{ mt: 0.75 }}>
          {pic.dateCreated && <LabelChip size="sm">{formatDate(pic.dateCreated)}</LabelChip>}
          {pic.model && <LabelChip size="sm">{pic.model}</LabelChip>}
        </Stack>
      </Stack>
    </ArtifactCard>
  );

  return (
    <Box component="main">
      <SectionFrame section="hobbies" spacing="loose">
        <PageHeader
          overline="Disciplines · AI Art"
          index="06"
          title="Generated visuals — prompts, loops, and post-process work."
          subtitle="A small gallery of AI-generated pieces, mostly diffusion models with manual editing in Photoshop."
          size="md"
          meta={
            <Stack direction="row" gap={1}>
              <LabelChip>
                {pics.length} {pics.length === 1 ? "Piece" : "Pieces"}
              </LabelChip>
            </Stack>
          }
        />
      </SectionFrame>

      <SectionFrame section="hobbies" spacing="none">
        <Box sx={{ mb: 6 }}>
          {!matchesSM ? (
            <ImageList variant="masonry" cols={getCols()} gap={16} sx={{ width: "100%", m: 0 }}>
              {pics.map((pic) => renderCard(pic))}
            </ImageList>
          ) : (
            <Stack gap={3}>{pics.map((pic) => renderCard(pic))}</Stack>
          )}
        </Box>

        <Box sx={{ mt: 4 }}>
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
            border: `1px solid ${theme.zr.lines.muted}`,
            borderRadius: 1,
            overflow: "hidden",
          },
        }}
      >
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
          <Box
            component="img"
            src={dialogImage.src}
            alt={dialogImage.title}
            sx={{
              width: "100%",
              maxHeight: "80vh",
              objectFit: "contain",
              display: "block",
            }}
          />
          <Box
            sx={{
              borderTop: `1px solid ${theme.zr.lines.muted}`,
              p: 3,
            }}
          >
            <Stack gap={1}>
              <Overline>Piece</Overline>
              <Typography variant="h5" component="h3">
                {dialogImage.title}
              </Typography>
              {dialogImage.description && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {dialogImage.description}
                </Typography>
              )}
              <Stack direction="row" gap={0.75} flexWrap="wrap" sx={{ mt: 1.5 }}>
                {dialogImage.dateCreated && (
                  <LabelChip size="sm">Created · {formatDate(dialogImage.dateCreated)}</LabelChip>
                )}
                {dialogImage.model && (
                  <LabelChip size="sm">Platform · {dialogImage.model}</LabelChip>
                )}
              </Stack>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
