"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";

export function MakersMarkFooter() {
  return (
    <Box component="footer" sx={{ mt: { xs: 7, md: 10 }, pb: 4 }}>
      <Container>
        <Box sx={{ borderTop: "1px solid var(--zr-line-strong)", pt: { xs: 4, md: 5 } }}>
          <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" gap={4}>
            <Box>
              <Typography component="p" variant="h4">
                Keep in touch.
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: 1.5, color: "text.secondary", maxWidth: "40ch" }}
              >
                A conversation, a question, or something worth sharing.
              </Typography>
              <Typography
                component="a"
                href="mailto:zachdreece@gmail.com"
                sx={{
                  display: "inline-block",
                  mt: 2,
                  py: 1,
                  color: "text.primary",
                  textUnderlineOffset: "0.3em",
                }}
              >
                zachdreece@gmail.com
              </Typography>
            </Box>
            <Box sx={{ maxWidth: "36ch" }}>
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5 }}>
                Occasional notes on what I&apos;m building, writing, and learning.
              </Typography>
              <Button
                variant="outlined"
                onClick={() => window.dispatchEvent(new Event("zr:newsletter-open"))}
              >
                Subscribe to the newsletter
              </Button>
            </Box>
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            gap={2}
            sx={{ mt: 5, pt: 2.5, borderTop: "1px solid var(--zr-line-muted)" }}
          >
            <Typography
              component={Link}
              href="/"
              variant="caption"
              sx={{ color: "text.secondary", textDecoration: "none", py: 1 }}
            >
              Zachary Reece / Denver, Colorado
            </Typography>
            <Box
              component="nav"
              aria-label="Social and contact links"
              sx={{ display: "flex", flexWrap: "wrap", gap: { xs: 2.5, sm: 3 } }}
            >
              {[
                ["GitHub", "https://github.com/zreecespieces"],
                ["Instagram", "https://www.instagram.com/zacharydreece/"],
                ["LinkedIn", "https://www.linkedin.com/in/zachary-reece-b587811a8/"],
                ["Resume (PDF)", "/resume.pdf"],
              ].map(([label, href]) => (
                <Typography
                  key={href}
                  component="a"
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  variant="caption"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    minHeight: 44,
                    color: "text.secondary",
                    textDecoration: "none",
                    "&:hover": { color: "text.primary", textDecoration: "underline" },
                  }}
                >
                  {label}
                </Typography>
              ))}
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default MakersMarkFooter;
