"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonBase,
  Dialog,
  DialogContent,
  Grid,
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
  formatDate,
  getProjectsSortedByDate,
  getTotalProjects,
  getTotalTechnologies,
} from "./projects";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LaunchIcon from "@mui/icons-material/Launch";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Projects() {
  const sortedProjects = getProjectsSortedByDate();
  const [selectedProject, setSelectedProject] = useState<number>(0);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [dialogImage, setDialogImage] = useState<{ url: string; caption?: string }>({ url: "" });

  const handleProjectChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedProject(newValue);
  };

  const openImage = (imageUrl: string, caption?: string) => {
    setDialogImage({ url: imageUrl, caption });
    setOpenImageDialog(true);
  };

  const handleCloseDialog = () => setOpenImageDialog(false);

  return (
    <Box component="main">
      <SectionFrame section="professional" spacing="loose">
        <PageHeader
          overline="Systems Built · Projects"
          index="02"
          title="Software, experiments, tools, and applied systems."
          subtitle="A working index of things I've built — production engineering, side projects, and the occasional speculative artifact."
          size="md"
          meta={
            <Stack direction="row" gap={1}>
              <LabelChip>
                {getTotalProjects()} {getTotalProjects() === 1 ? "Project" : "Projects"}
              </LabelChip>
              <LabelChip>{getTotalTechnologies()} Technologies</LabelChip>
            </Stack>
          }
        />
      </SectionFrame>

      <SectionFrame section="professional" spacing="none">
        <Tabs
          value={selectedProject}
          onChange={handleProjectChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="project tabs"
          sx={{ borderBottom: "1px solid var(--zr-line-muted)", mb: 5 }}
        >
          {sortedProjects.map((project) => (
            <Tab key={project.id} label={project.title} />
          ))}
        </Tabs>

        {sortedProjects.map((project, index) => (
          <Box key={project.id} sx={{ display: selectedProject === index ? "block" : "none" }}>
            <Stack gap={5}>
              <Stack gap={1.5}>
                <Overline>{project.subtitle}</Overline>
                <Typography variant="h3" component="h2">
                  {project.title}
                </Typography>
                <Stack direction="row" alignItems="center" gap={1} sx={{ mt: 1 }}>
                  <CalendarMonthIcon fontSize="small" sx={{ color: "var(--zr-section-accent)" }} />
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(project.startDate)}
                    {project.isOngoing
                      ? " — Present"
                      : project.endDate
                        ? ` — ${formatDate(project.endDate)}`
                        : ""}
                  </Typography>
                </Stack>
              </Stack>

              <ArtifactCard padding="loose" hoverable={false}>
                <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                  {project.description}
                </Typography>
              </ArtifactCard>

              <Stack gap={2}>
                <Overline index="01">Technologies</Overline>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {project.technologies.map((tech, i) => (
                    <LabelChip key={i}>{tech.name}</LabelChip>
                  ))}
                </Box>
              </Stack>

              <Stack gap={2}>
                <Overline index="02">Key Features</Overline>
                <Grid container spacing={2}>
                  {project.features.map((feature, i) => (
                    <Grid size={{ xs: 12, md: 6 }} key={i}>
                      <ArtifactCard padding="regular" hoverable={false}>
                        <Typography variant="h6" component="h4" sx={{ mb: 1 }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {feature.description}
                        </Typography>
                      </ArtifactCard>
                    </Grid>
                  ))}
                </Grid>
              </Stack>

              {project.highlights && project.highlights.length > 0 && (
                <Stack gap={2}>
                  <Overline index="03">Highlights</Overline>
                  <Stack gap={1.5}>
                    {project.highlights.map((highlight, i) => (
                      <Stack key={i} direction="row" alignItems="flex-start" gap={2}>
                        <Box
                          aria-hidden
                          sx={{
                            mt: 0.8,
                            width: 8,
                            height: 8,
                            border: "1px solid var(--zr-section-accent)",
                            transform: "rotate(45deg)",
                            flexShrink: 0,
                          }}
                        />
                        <Typography variant="body1">{highlight}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              )}

              {project.images.length > 0 && (
                <Stack gap={2}>
                  <Overline index="04">Gallery</Overline>
                  <Grid container spacing={2}>
                    {project.images.map((image, i) => (
                      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                        <ButtonBase
                          onClick={() => openImage(image.url, image.caption)}
                          sx={{
                            width: "100%",
                            overflow: "hidden",
                            border: "1px solid var(--zr-line-muted)",
                            borderRadius: 1,
                            display: "block",
                            transition: "border-color 180ms cubic-bezier(0.2, 0, 0, 1)",
                            "&:hover": {
                              borderColor: "var(--zr-section-accent)",
                            },
                            "&:hover img": {
                              transform: "scale(1.02)",
                            },
                          }}
                        >
                          <Box
                            component="img"
                            src={image.url}
                            alt={image.alt}
                            sx={{
                              width: "100%",
                              height: 220,
                              objectFit: "cover",
                              display: "block",
                              transition: "transform 240ms cubic-bezier(0.2, 0, 0, 1)",
                            }}
                          />
                        </ButtonBase>
                        {image.caption && (
                          <Typography
                            variant="caption"
                            component="p"
                            sx={{ mt: 1, color: "text.secondary", textAlign: "center" }}
                          >
                            {image.caption}
                          </Typography>
                        )}
                      </Grid>
                    ))}
                  </Grid>
                </Stack>
              )}

              <Stack direction="row" gap={2} flexWrap="wrap">
                {project.deployedUrl && (
                  <Button
                    component="a"
                    href={project.deployedUrl}
                    target="_blank"
                    rel="noreferrer"
                    variant="contained"
                    startIcon={<LaunchIcon fontSize="small" />}
                  >
                    View Live
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    component="a"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    variant="outlined"
                    startIcon={<GitHubIcon fontSize="small" />}
                  >
                    View Code
                  </Button>
                )}
              </Stack>

              <Box>
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
            </Stack>
          </Box>
        ))}
      </SectionFrame>

      <MakersMarkFooter />

      <Dialog
        open={openImageDialog}
        onClose={handleCloseDialog}
        maxWidth="lg"
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "rgba(15, 15, 13, 0.96)",
            backgroundImage: "none",
            border: "1px solid var(--zr-line-muted)",
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
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src={dialogImage.url}
            alt="Project image"
            sx={{ width: "100%", maxHeight: "90vh", objectFit: "contain", display: "block" }}
          />
          {dialogImage.caption && (
            <Typography variant="body2" sx={{ p: 2, textAlign: "center", color: "text.secondary" }}>
              {dialogImage.caption}
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
