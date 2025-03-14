"use client"

import React, { useState } from "react"
import {
  Box,
  Container,
  Stack,
  Typography,
  Card,
  Chip,
  Tabs,
  Tab,
  Button,
  ButtonBase,
  Grid,
  Dialog,
  DialogContent,
  IconButton,
  Link,
} from "@mui/material"
import { getTotalProjects, getTotalTechnologies, formatDate, getProjectsSortedByDate, Technology } from "./projects"
import CloseIcon from "@mui/icons-material/Close"
import CodeIcon from "@mui/icons-material/Code"
import ConstructionIcon from "@mui/icons-material/Construction"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import LaunchIcon from "@mui/icons-material/Launch"
import GitHubIcon from "@mui/icons-material/GitHub"
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import GradientBorder from "@/components/GradientBorder"

function FancyChip({ tech, techIndex }: { tech: Technology; techIndex: number }) {
  return (
    <Chip
      key={techIndex}
      label={tech.name}
      sx={{
        background: `linear-gradient(90deg, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), linear-gradient(90deg, #00FFFF, #FF00FF)`,
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        border: "1px solid transparent",
        borderRadius: 25,
        color: "#FFFFFF",
        fontWeight: 500,
        px: 1,
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
          transform: "translateY(-1px)",
        },
        transition: "all 0.2s ease-in-out",
      }}
    />
  )
}

export default function Projects() {
  const sortedProjects = getProjectsSortedByDate()
  const [selectedProject, setSelectedProject] = useState<number>(0)
  const [openImageDialog, setOpenImageDialog] = useState(false)
  const [dialogImage, setDialogImage] = useState<{ url: string; caption?: string }>({ url: "" })

  const handleProjectChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedProject(newValue)
  }

  const openImage = (imageUrl: string, caption?: string) => {
    setDialogImage({ url: imageUrl, caption })
    setOpenImageDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenImageDialog(false)
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={6}>
        {/* Title */}
        <GradientBorder gradientColors={["#00FFFF", "#FF00FF"]} sx={{ width: "100%" }} contentSx={{ p: 4, textAlign: "center" }}>
          <Typography
            variant="h3"
            component="h1"
            fontWeight="700"
            gutterBottom
            sx={{
              background: "linear-gradient(to right, #00FFFF, #FF00FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.02em",
            }}>
            Projects
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 2, my: 2 }}>
            <FancyChip 
              tech={{ name: `${getTotalProjects()} Project${getTotalProjects() === 1 ? "" : "s"}`, color: "#00FFFF" }} 
              techIndex={0} 
            />
            <FancyChip 
              tech={{ name: `${getTotalTechnologies()} Technologies`, color: "#FF00FF" }} 
              techIndex={1} 
            />
          </Box>
        </GradientBorder>

        {/* Project Tabs */}
        <GradientBorder gradientColors={["#00FFFF", "#FF00FF"]} sx={{ width: "100%" }} contentSx={{ p: 0 }}>
          <Tabs
            value={selectedProject}
            onChange={handleProjectChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="project tabs"
            sx={{
              "& .MuiTabs-indicator": {
                background: "linear-gradient(to right, #00FFFF, #FF00FF)",
              },
              "& .MuiTab-root": {
                color: "text.secondary",
                "&.Mui-selected": {
                  color: "white",
                },
                py: 3,
                px: 4,
              },
            }}>
            {sortedProjects.map((project, index) => (
              <Tab key={project.id} label={project.title} />
            ))}
          </Tabs>
        </GradientBorder>

        {/* Project Content */}
        {sortedProjects.map((project, index) => (
          <Box key={project.id} sx={{ display: selectedProject === index ? "block" : "none" }}>
            <Stack spacing={4}>
              {/* Project Title */}
              <Typography
                variant="h4"
                component="h2"
                fontWeight="700"
                sx={{
                  background: "linear-gradient(to right, #00FFFF, #FF00FF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                {project.title}
              </Typography>

              <Typography
                variant="h6"
                component="p"
                sx={{
                  color: "#E0E0E0",
                  fontWeight: 500,
                  mb: 2,
                }}>
                {project.subtitle}
              </Typography>

              {/* Project Timeline */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CalendarMonthIcon sx={{ color: "#00FFFF" }} />
                <Typography variant="body1">
                  {formatDate(project.startDate)}
                  {project.isOngoing ? " - Present" : project.endDate ? ` - ${formatDate(project.endDate)}` : ""}
                </Typography>
              </Box>

              {/* Project Description */}
              <GradientBorder gradientColors={["#00FFFF", "#FF00FF"]} sx={{ width: "100%" }} contentSx={{ p: 3 }}>
                <Typography variant="body1" sx={{ lineHeight: 1.6, textAlign: "justify" }}>
                  {project.description}
                </Typography>
              </GradientBorder>

              {/* Technologies Used */}
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  mt: 3,
                  background: "linear-gradient(to right, #00FFFF, #FF00FF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 600,
                }}>
                Technologies
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                {project.technologies.map((tech, techIndex) => <FancyChip key={techIndex} tech={tech} techIndex={techIndex} />)}
              </Box>

              {/* Features */}
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  background: "linear-gradient(to right, #00FFFF, #FF00FF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 600,
                }}>
                Key Features
              </Typography>

              <Grid container spacing={2}>
                {project.features.map((feature, featureIndex) => (
                  <Grid size={{ xs: 12, md: 6 }} key={featureIndex}>
                    <GradientBorder gradientColors={["#00FFFF", "#FF00FF"]} sx={{ height: "100%" }} contentSx={{ p: 2 }}>
                      <Typography
                        variant="h6"
                        component="h4"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "#FFFFFF",
                          fontWeight: 600,
                          mb: 1,
                        }}>
                        <FeaturedPlayListIcon sx={{ mr: 1, color: "#00FFFF" }} />
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#E0E0E0" }}>
                        {feature.description}
                      </Typography>
                    </GradientBorder>
                  </Grid>
                ))}
              </Grid>

              {/* Highlights */}
              {project.highlights && (
                <>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      background: "linear-gradient(to right, #00FFFF, #FF00FF)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: 600,
                    }}>
                    Highlights
                  </Typography>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    {project.highlights.map((highlight, highlightIndex) => (
                      <Box key={highlightIndex} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <CheckCircleIcon sx={{ color: "#00FFFF" }} />
                        <Typography variant="body1">{highlight}</Typography>
                      </Box>
                    ))}
                  </Box>
                </>
              )}

              {/* Project Images */}
              {project.images.length > 0 && (
                <>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      background: "linear-gradient(to right, #00FFFF, #FF00FF)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: 600,
                      mb: 2,
                    }}>
                    Gallery
                  </Typography>
                </>
              )}

              <Grid container spacing={2}>
                {project.images.map((image, imageIndex) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={imageIndex}>
                    <ButtonBase
                      onClick={() => openImage(image.url, image.caption)}
                      sx={{
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                        borderRadius: 2,
                        position: "relative",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          background: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))",
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                        },
                        "&:hover::after": {
                          opacity: 1,
                        },
                        "&:hover img": {
                          transform: "scale(1.05)",
                        },
                      }}>
                      <Box
                        component="img"
                        src={image.url}
                        alt={image.alt}
                        sx={{
                          width: "100%",
                          height: 220,
                          objectFit: "cover",
                          transition: "transform 0.3s ease",
                          borderRadius: 2,
                        }}
                      />
                    </ButtonBase>
                    {image.caption && (
                      <Typography
                        variant="caption"
                        component="p"
                        sx={{
                          mt: 1,
                          color: "#AAAAAA",
                          textAlign: "center",
                        }}>
                        {image.caption}
                      </Typography>
                    )}
                  </Grid>
                ))}
              </Grid>

              {/* Project Links */}
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {project.deployedUrl && (
                  <Button
                    component={Link}
                    href={project.deployedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    startIcon={<LaunchIcon />}
                    sx={{
                      position: "relative",
                      bgcolor: "rgba(0, 0, 0, 0.5)",
                      borderRadius: 2,
                      px: 3,
                      color: "#FFF",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: "inherit",
                        padding: "2px",
                        background: "linear-gradient(45deg, #00FFFF, #FF00FF)",
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      },
                      "&:hover": {
                        bgcolor: "rgba(0, 0, 0, 0.7)",
                      },
                    }}>
                    View Live Project
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    component={Link}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    startIcon={<GitHubIcon />}
                    sx={{
                      color: "#FFFFFF",
                      borderColor: "rgba(255,255,255,0.3)",
                      borderRadius: 2,
                      px: 3,
                      "&:hover": {
                        borderColor: "#FFFFFF",
                        background: "rgba(255,255,255,0.05)",
                      },
                    }}>
                    View Code
                  </Button>
                )}
              </Box>
              <Button component={Link} href="/linktree" sx={{ color: "#00FFFF", textTransform: "none", alignSelf: "flex-start" }}>
                Back to LinkTree
              </Button>
            </Stack>
          </Box>
        ))}
      </Stack>

      {/* Image Dialog */}
      <Dialog
        open={openImageDialog}
        onClose={handleCloseDialog}
        maxWidth="lg"
        sx={{
          "& .MuiDialog-paper": {
            bgcolor: "rgba(20, 20, 20, 0.95)",
            backgroundImage: "none",
            borderRadius: 2,
            overflow: "hidden",
          },
        }}>
        <DialogContent sx={{ p: 0, position: "relative" }}>
          <IconButton
            onClick={handleCloseDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "white",
              bgcolor: "rgba(0, 0, 0, 0.5)",
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.7)",
              },
            }}>
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src={dialogImage.url}
            alt="Project image"
            sx={{
              width: "100%",
              maxHeight: "90vh",
              objectFit: "contain",
            }}
          />
          {dialogImage.caption && (
            <Typography
              variant="body2"
              sx={{
                p: 2,
                textAlign: "center",
                color: "#CCCCCC",
              }}>
              {dialogImage.caption}
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  )
}
