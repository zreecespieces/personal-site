"use client";

import { useId, type ReactNode } from "react";
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/** Image viewing and signup use the same surface, edge, title, and close affordance. */
export function DialogFrame({
  open,
  onClose,
  title,
  description,
  closeLabel,
  size = "sm",
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  closeLabel: string;
  size?: "sm" | "lg";
  children: ReactNode;
}) {
  const id = useId();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={size}
      aria-labelledby={`${id}-title`}
      aria-describedby={description ? `${id}-description` : undefined}
    >
      <DialogTitle id={`${id}-title`} sx={{ p: { xs: 2.5, sm: 3 }, pr: 9 }}>
        <Typography component="span" variant="h5">
          {title}
        </Typography>
      </DialogTitle>
      <IconButton
        aria-label={closeLabel}
        onClick={onClose}
        sx={{ position: "absolute", right: 12, top: 12 }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
      <DialogContent sx={{ px: { xs: 2.5, sm: 3 }, pt: "0 !important", pb: { xs: 2.5, sm: 3 } }}>
        {description && (
          <Typography id={`${id}-description`} color="text.secondary" sx={{ mb: 3 }}>
            {description}
          </Typography>
        )}
        <Box>{children}</Box>
      </DialogContent>
    </Dialog>
  );
}
