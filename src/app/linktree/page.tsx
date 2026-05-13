"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Stack,
  Grid,
  IconButton,
  Collapse,
} from "@mui/material";
import { contactInfo, linkCategories } from "./links";
import NextLink from "next/link";
import { LinkItem } from "./linkItem";
import GradientBorder from "@/components/GradientBorder";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const GRADIENT_PATTERNS = [
  ["#92EFFD", "#0072FF"], // Blue gradient
  ["#DAB1DA", "#8D0B93"], // Light purple to dark purple gradient
];

export default function LinkTree() {
  // State to track which categories are expanded
  const [expandedCategories, setExpandedCategories] = useState<Record<number, boolean>>(
    linkCategories.reduce((acc, _, index) => ({ ...acc, [index]: true }), {})
  );

  // Toggle expanded state for a category
  const toggleCategory = (index: number) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <Container maxWidth={false} sx={{ py: 4, px: 0, overflow: "hidden" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          pb: 8,
        }}
      >
        {/* Enhanced gradient background effects */}
        <Box
          sx={{
            position: "absolute",
            top: -150,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #4E65FF 0%, #92EFFD 100%)",
            filter: "blur(90px)",
            opacity: 0.2,
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -100,
            left: -120,
            width: 250,
            height: 250,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #FF057C 0%, #8D0B93 100%)",
            filter: "blur(90px)",
            opacity: 0.15,
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 200,
            left: -80,
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)",
            filter: "blur(80px)",
            opacity: 0.1,
            zIndex: 1,
          }}
        />

        <Container
          maxWidth="md"
          sx={{ alignItems: "center", display: "flex", flexDirection: "column" }}
        >
          {/* Enhanced Profile Section */}
          <Box
            sx={{
              position: "relative",
              padding: "4px",
              borderRadius: "50%",
              background: "linear-gradient(45deg, #00FFFF, #FF00FF)",
              mb: 2,
              width: "100%",
              height: "100%",
              maxWidth: "383px",
              maxHeight: "383px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
            }}
          >
            <Avatar
              alt="Zachary Reece"
              src="/profile-picture.jpg"
              sx={{
                width: "100%",
                height: "100%",
                maxHeight: "375px",
                maxWidth: "375px",
                background: "rgba(30, 30, 30, 0.8)",
              }}
            />
          </Box>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="700"
            align="center"
            gutterBottom
            sx={{
              background: "linear-gradient(to right, #00FFFF, #FF00FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.02em",
              mb: 0,
            }}
          >
            Zachary Reece
          </Typography>

          <Box
            sx={{
              position: "relative",
              padding: "2px",
              borderRadius: 16,
              background: "linear-gradient(45deg, #00FFFF, #FF00FF)",
              mb: 4.5,
              mt: 1,
              display: "inline-flex",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                background: `linear-gradient(90deg, rgba(0,0,0,0.7), rgba(0,0,0,0.7))`,
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box",
                borderRadius: "inherit",
                px: 2,
                position: "relative",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              <Typography
                textAlign="center"
                variant="body2"
                sx={{ color: "#FFFFFF", letterSpacing: "0.01em", lineHeight: 1, py: 0.5 }}
              >
                software engineer by trade
              </Typography>
              <Box
                sx={{
                  mx: 1.5,
                  height: "100%",
                  width: "2px",
                  background: "linear-gradient(to bottom, #00FFFF, #FF00FF)",
                }}
              />
              <Typography
                textAlign="center"
                variant="body2"
                sx={{ color: "#FFFFFF", letterSpacing: "0.01em", lineHeight: 1, py: 0.5 }}
              >
                martial artist by choice
              </Typography>
              <Box
                sx={{
                  mx: 1.5,
                  height: "100%",
                  width: "2px",
                  background: "linear-gradient(to bottom, #00FFFF, #FF00FF)",
                }}
              />
              <Typography
                textAlign="center"
                variant="body2"
                sx={{ color: "#FFFFFF", letterSpacing: "0.01em", lineHeight: 1, py: 0.5 }}
              >
                philosopher by nature
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={4}>
            <Grid size={12} sx={{ order: { xs: 2, md: 1 } }}>
              {/* Bio */}
              <GradientBorder
                gradientColors={["#FF00FF", "#00FFFF"]}
                sx={{ width: "100%", mb: { xs: 4.5, md: 0 } }}
                contentSx={{ p: 1 }}
              >
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  align="justify"
                  sx={{
                    fontWeight: 400,
                    letterSpacing: "0.01em",
                    px: 1,
                  }}
                >
                  I have been creating technology my entire life, since early childhood. In 2020 I
                  created a best-selling Udemy course on React and MUI development which has now
                  taught over 20,000 students in 145 countries. Since then I have worked with
                  companies ranging from cyber security defense contractors and multi-billion dollar
                  commercial real estate brokers to federal government agencies and software
                  consultancies. In January 2026 I joined Flint, an edtech startup, as a Product
                  Engineer building a next generation AI-powered LMS/SIS platform partnered with
                  hundreds of schools across the world to automate tasks for teachers and deliver
                  personalized learning to individual students. Learning will always be at the heart
                  of what I do - from teaching myself to code as a child, to teaching people all
                  over the world about coding, and now building tools that will redefine education
                  for students everywhere.
                </Typography>
              </GradientBorder>
            </Grid>
            <Grid size={12} sx={{ order: { xs: 1, md: 2 } }}>
              {/* Links Section with collapsible categories */}
              <Stack spacing={3.5} sx={{ width: "100%" }}>
                {linkCategories.map((category, categoryIndex) => (
                  <Box key={categoryIndex}>
                    {/* Clickable category header */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: expandedCategories[categoryIndex] ? 2 : 0,
                        cursor: "pointer",
                        "&:hover": {
                          opacity: 0.9,
                        },
                      }}
                      onClick={() => toggleCategory(categoryIndex)}
                    >
                      <Box sx={{ mr: 1, color: "primary.main" }}>{category.icon}</Box>
                      <Typography
                        variant="h6"
                        sx={{
                          background: "linear-gradient(to right, #00FFFF, #FF00FF)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          fontWeight: 600,
                          flex: 1,
                        }}
                      >
                        {category.title}
                      </Typography>
                      {expandedCategories[categoryIndex] ? (
                        <ExpandLessIcon sx={{ color: "#00FFFF" }} />
                      ) : (
                        <ExpandMoreIcon sx={{ color: "#FF00FF" }} />
                      )}
                    </Box>
                    {/* Collapsible links */}
                    <Collapse in={expandedCategories[categoryIndex]}>
                      <Stack spacing={2} sx={{ mb: 2 }}>
                        {category.links
                          .sort((a, b) => a.title.localeCompare(b.title))
                          .map((link, linkIndex) => (
                            <LinkItem
                              key={linkIndex}
                              {...link}
                              gradientColors={
                                GRADIENT_PATTERNS[
                                  (categoryIndex + linkIndex) % GRADIENT_PATTERNS.length
                                ]
                              }
                            />
                          ))}
                      </Stack>
                    </Collapse>
                  </Box>
                ))}
              </Stack>
            </Grid>
          </Grid>

          {/* Contact Info, icons only */}
          <Stack direction="row" spacing={2.5} sx={{ mt: { xs: 0, md: 3 }, mb: 1 }}>
            {contactInfo.map(({ icon, url }, index) => (
              <IconButton key={index} component={NextLink} href={url}>
                {icon}
              </IconButton>
            ))}
          </Stack>
        </Container>
      </Box>
    </Container>
  );
}
