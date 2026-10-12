"use client";

import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  ["Projects", "/projects"],
  ["Writing", "/blog"],
  ["About", "/about"],
  ["Index", "/#index"],
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <Box component="header">
      <Box component="a" href="#main-content" className="skip-link">
        Skip to content
      </Box>
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            columnGap: 4,
            rowGap: 1,
            minHeight: { xs: 92, sm: 96 },
            py: 2,
            borderBottom: "1px solid var(--zr-line-muted)",
          }}
        >
          <Box
            component={Link}
            href="/"
            aria-label="Zachary Reece, home"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1.5,
              textDecoration: "none",
              minHeight: 44,
            }}
          >
            <Box
              component="svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              sx={{ width: 30, height: 30, color: "primary.main" }}
            >
              <path
                d="M16 2 28 9v14l-12 7-12-7V9Z M4 23 28 9 M4 9l24 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <circle cx="16" cy="16" r="4" fill="currentColor" />
            </Box>
            <Typography
              component="span"
              sx={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "1rem",
                fontWeight: 500,
                letterSpacing: "-0.03em",
              }}
            >
              Zachary Reece
            </Typography>
          </Box>
          <Box
            component="nav"
            aria-label="Main navigation"
            sx={{ display: "flex", flexWrap: "wrap", gap: { xs: 2.5, sm: 4 } }}
          >
            {LINKS.map(([label, href]) => {
              const active =
                !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));
              return (
                <Box
                  key={href}
                  component={Link}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    minHeight: 44,
                    fontSize: "0.84rem",
                    textDecoration: "none",
                    position: "relative",
                    color: active ? "text.primary" : "text.secondary",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 5,
                      left: 0,
                      right: 0,
                      height: "1px",
                      bgcolor: "primary.main",
                      transform: active ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "left",
                      transition: "transform 180ms ease",
                    },
                    "&:hover::after, &:focus-visible::after": { transform: "scaleX(1)" },
                  }}
                >
                  {label}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
