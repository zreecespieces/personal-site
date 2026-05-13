"use client";

import React from "react";
import { Box, Container, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import DescriptionIcon from "@mui/icons-material/Description";

export interface MakersMarkFooterProps {
  /** Optional override for the maker's-mark line. */
  motto?: string;
  /** Optional override for the location subtitle. */
  location?: string;
}

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/zacharydreece/",
    icon: InstagramIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/zachary-reece-b587811a8/",
    icon: LinkedInIcon,
  },
  {
    label: "Email",
    href: "mailto:zachdreece@gmail.com",
    icon: EmailIcon,
  },
  {
    label: "Resume (PDF)",
    href: "/resume.pdf",
    icon: DescriptionIcon,
    target: "_blank",
  },
];

/**
 * The site's footer, styled as a maker's mark / inscription. Renders a
 * thin top rule, a mono motto, a quiet location line, and a single row
 * of line-icon social links — including the resume PDF per the resolved
 * decision in `docs/redesign_roadmap.md` §1.2.
 */
export function MakersMarkFooter({
  motto = "ZACHARY REECE — SOFTWARE / LEARNING / SYSTEMS / DISCIPLINE",
  location = "Denver, Colorado",
}: MakersMarkFooterProps) {
  const theme = useTheme();
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        mt: { xs: 8, md: 14 },
        borderTop: `1px solid ${theme.zr.lines.muted}`,
        py: { xs: 5, md: 7 },
        position: "relative",
        // Tiny ascending construction tick on the left edge — printer's mark
        "&::before": {
          content: '""',
          position: "absolute",
          top: -1,
          left: theme.zr.layout.gutterDesktop,
          width: 28,
          height: 1,
          backgroundColor: theme.zr.accent.brass,
        },
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          gap={{ xs: 3, md: 4 }}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{
                color: theme.zr.bone[200],
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                display: "block",
              }}
            >
              {motto}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                mt: 0.5,
                color: alpha(theme.zr.bone[200], 0.6),
              }}
            >
              {location} · © {year}
            </Typography>
          </Box>

          <Stack direction="row" gap={0.5} alignItems="center">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon, target }) => (
              <Tooltip key={label} title={label} placement="top" arrow={false}>
                <IconButton
                  component="a"
                  href={href}
                  target={target ?? (href.startsWith("http") ? "_blank" : undefined)}
                  rel={target === "_blank" || href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={label}
                  size="small"
                  sx={{
                    color: alpha(theme.zr.bone[100], 0.7),
                    "&:hover": {
                      color: theme.zr.accent.brassLight,
                    },
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              </Tooltip>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default MakersMarkFooter;
