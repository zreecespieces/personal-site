"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

export interface ContentImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  sx?: SxProps<Theme>;
}

export function ContentImage({
  src,
  alt,
  width = 1200,
  height = 800,
  sizes = width < 200
    ? `${width}px`
    : `(max-width: 600px) 100vw, (max-width: 1200px) 50vw, ${Math.min(width, 1200)}px`,
  priority = false,
  sx = [],
}: ContentImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  useEffect(() => {
    setFailedSrc((failed) => (failed === src ? failed : null));
  }, [src]);

  return (
    <Box
      component="span"
      data-content-image=""
      sx={[
        {
          position: "relative",
          display: "block",
          width: "100%",
          minWidth: 0,
          aspectRatio: `${width} / ${height}`,
          overflow: "hidden",
          bgcolor: "action.hover",
          objectFit: "cover",
          "button:focus-visible &": {
            outline: "2px solid",
            outlineColor: "text.primary",
            outlineOffset: 3,
          },
          "& img": {
            position: "absolute",
            inset: 0,
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "inherit",
            objectPosition: "inherit",
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {!src || failedSrc === src ? (
        <Box
          component="span"
          role="img"
          aria-label={alt ? `${alt} (image unavailable)` : "Image unavailable"}
          sx={{ height: "100%", minHeight: 64, display: "grid", placeItems: "center", p: 1.5 }}
        >
          <Typography component="span" variant="caption" color="text.secondary" align="center">
            Image unavailable
          </Typography>
        </Box>
      ) : (
        <Image
          key={src}
          ref={(image) => {
            // Catch cached failures on attachment; Next also replays pre-hydration errors.
            if (image?.complete && image.naturalWidth === 0) setFailedSrc(src);
          }}
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailedSrc(src)}
        />
      )}
    </Box>
  );
}

export default ContentImage;
