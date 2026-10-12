"use client";

import { useId, type ReactNode } from "react";
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ContentImage } from "./ContentImage";

export interface ImageLightboxProps {
  open: boolean;
  onClose: () => void;
  image: { src: string; alt: string; title?: string; caption?: string } | null;
  children?: ReactNode;
}

export function ImageLightbox({ open, onClose, image, children }: ImageLightboxProps) {
  const id = useId();
  return (
    <Dialog
      open={open && image !== null}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      aria-labelledby={`${id}-title`}
      aria-describedby={image?.caption ? `${id}-caption` : undefined}
    >
      <DialogTitle id={`${id}-title`} sx={{ pr: 8 }}>
        {image?.title || image?.alt || "Image"}
      </DialogTitle>
      <IconButton
        aria-label="Close image"
        onClick={onClose}
        sx={{ position: "absolute", right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ p: { xs: 2, sm: 3 }, pt: 0 }}>
        {image && (
          <ContentImage
            src={image.src}
            alt={image.alt}
            sx={{ height: { xs: "50vh", sm: "65vh" }, aspectRatio: "auto", objectFit: "contain" }}
          />
        )}
        {image?.caption && (
          <Typography id={`${id}-caption`} sx={{ mt: 2 }} color="text.secondary">
            {image.caption}
          </Typography>
        )}
        {children && <Box sx={{ mt: 2 }}>{children}</Box>}
      </DialogContent>
    </Dialog>
  );
}

export default ImageLightbox;
