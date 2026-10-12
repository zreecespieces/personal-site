"use client";

import type { ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import { ContentImage } from "./ContentImage";
import { DialogFrame } from "./DialogFrame";

export interface ImageLightboxProps {
  open: boolean;
  onClose: () => void;
  image: { src: string; alt: string; title?: string; caption?: string } | null;
  children?: ReactNode;
}

export function ImageLightbox({ open, onClose, image, children }: ImageLightboxProps) {
  return (
    <DialogFrame
      open={open && image !== null}
      onClose={onClose}
      size="lg"
      title={image?.title || image?.alt || "Image"}
      closeLabel="Close image"
    >
      {image && (
        <ContentImage
          src={image.src}
          alt={image.alt}
          sx={{ height: { xs: "50vh", sm: "65vh" }, aspectRatio: "auto", objectFit: "contain" }}
        />
      )}
      {image?.caption && (
        <Typography variant="body2" sx={{ mt: 2 }} color="text.secondary">
          {image.caption}
        </Typography>
      )}
      {children && <Box sx={{ mt: 2 }}>{children}</Box>}
    </DialogFrame>
  );
}

export default ImageLightbox;
