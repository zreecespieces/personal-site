"use client";

import { Box, Stack } from "@mui/material";
import type { ReactNode } from "react";
import type { SectionKey } from "@/theme/tokens";
import { PageHeader, type PageHeaderProps } from "./PageHeader";
import { SectionFrame } from "./SectionFrame";

export interface PageLayoutProps extends Pick<
  PageHeaderProps,
  "title" | "subtitle" | "overline" | "meta" | "size"
> {
  section: SectionKey;
  actions?: ReactNode;
  children: ReactNode;
}

/** The shared title-to-content relationship for public pages. */
export function PageLayout({ section, actions, children, ...header }: PageLayoutProps) {
  return (
    <Box component="main" id="main-content" tabIndex={-1}>
      <SectionFrame section={section} spacing="regular" sx={{ pb: 0 }}>
        <Box component="header">
          <PageHeader size="md" {...header} />
          {actions && (
            <Stack direction="row" gap={1.5} flexWrap="wrap" sx={{ mt: 3 }}>
              {actions}
            </Stack>
          )}
        </Box>
        <Box
          sx={(theme) => ({
            mt: {
              xs: `${theme.zr.layout.pageGap.mobile}px`,
              md: `${theme.zr.layout.pageGap.desktop}px`,
            },
          })}
        >
          {children}
        </Box>
      </SectionFrame>
    </Box>
  );
}
