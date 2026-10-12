"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  Box,
  IconButton,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

export function NewsletterDialog() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailError, setEmailError] = useState("");
  const emailInput = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const handleOpen = () => {
      setEmailError("");
      setSnackbar((prev) => ({ ...prev, open: false }));
      setOpen(true);
    };

    window.addEventListener("zr:newsletter-open", handleOpen);
    return () => window.removeEventListener("zr:newsletter-open", handleOpen);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    const trimmedEmail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setEmailError("Please enter a valid email address, such as name@example.com.");
      emailInput.current?.focus();
      return;
    }

    setEmailError("");
    setLoading(true);

    try {
      // Use the Firebase API route instead of direct function call for better separation
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSnackbar({ open: true, message: result.message, severity: "success" });
        setEmail("");
        setFirstName("");
        setLastName("");
        setOpen(false);
      } else {
        setSnackbar({
          open: true,
          message: result.message || "Unable to subscribe. Please try again later.",
          severity: "error",
        });
      }
    } catch {
      setSnackbar({
        open: true,
        message: "An error occurred. Please try again later.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="newsletter-dialog-title"
        aria-describedby="newsletter-dialog-description"
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "rgba(15, 15, 13, 0.96)",
              backgroundImage: "none",
              border: "1px solid var(--zr-line-muted)",
              borderRadius: 1,
              position: "relative",
              overflow: "hidden",
            },
          },
        }}
      >
        {/* Close button */}
        <IconButton
          aria-label="Close newsletter signup"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "text.secondary",
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogTitle
          id="newsletter-dialog-title"
          sx={{
            pb: 1,
            pt: 3,
            pr: 6,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <EmailIcon color="primary" fontSize="small" />
          <Typography variant="h5" component="span" sx={{ fontWeight: 500 }}>
            Newsletter
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ position: "relative", zIndex: 1 }}>
          <DialogContentText id="newsletter-dialog-description" sx={{ mb: 3 }}>
            Occasional updates on what I'm building, writing, and learning. No sales pitches.
          </DialogContentText>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            aria-busy={loading}
            sx={{ mt: 1 }}
          >
            <TextField
              id="newsletter-email"
              name="email"
              autoComplete="email"
              autoFocus
              inputRef={emailInput}
              margin="dense"
              label="Email Address"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              error={Boolean(emailError)}
              helperText={emailError}
              slotProps={{ formHelperText: { "aria-live": "polite" } }}
              disabled={loading}
              sx={{ mb: 2.5 }}
            />

            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
              <TextField
                id="newsletter-first-name"
                name="firstName"
                autoComplete="given-name"
                disabled={loading}
                margin="dense"
                label="First Name (optional)"
                type="text"
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <TextField
                id="newsletter-last-name"
                name="lastName"
                autoComplete="family-name"
                disabled={loading}
                margin="dense"
                label="Last Name (optional)"
                type="text"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Box>

            <DialogActions sx={{ px: 0, pb: 0, pt: 2 }}>
              <Button onClick={handleClose} color="inherit">
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <MailOutlineIcon />}
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Feedback snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          slotProps={{ message: { sx: { color: "#FFF" } } }}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
