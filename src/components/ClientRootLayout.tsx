"use client";

import React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Analytics } from "@vercel/analytics/next";
import { zacharyTheme } from "@/theme";
import { NewsletterDialog } from "./NewsletterDialog";

export function ClientRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={zacharyTheme}>
        {/*
          CssBaseline installs the redesign's global texture stack, focus
          ring, and reduced-motion overrides — see `src/theme/index.ts`
          MuiCssBaseline overrides for the full layer composition.
        */}
        <CssBaseline />
        {children}

        {/* Newsletter Signup Dialog */}
        <NewsletterDialog />

        {/* Vercel Analytics — page views + SPA navigation tracking */}
        <Analytics />
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
