"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import { Alert, Box, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { DialogFrame } from "./DialogFrame";

export function NewsletterDialog() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const emailInput = useRef<HTMLInputElement>(null);
  const doneButton = useRef<HTMLButtonElement>(null);
  const request = useRef<AbortController | null>(null);

  useEffect(() => {
    const handleOpen = () => {
      setEmailError("");
      setError("");
      setSuccess("");
      setOpen(true);
    };
    window.addEventListener("zr:newsletter-open", handleOpen);
    return () => {
      window.removeEventListener("zr:newsletter-open", handleOpen);
      request.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (success) doneButton.current?.focus();
  }, [success]);

  const handleClose = () => {
    request.current?.abort();
    request.current = null;
    setLoading(false);
    setOpen(false);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (loading || request.current) return;
    const trimmedEmail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setEmailError("Please enter a valid email address, such as name@example.com.");
      emailInput.current?.focus();
      return;
    }
    setEmailError("");
    setError("");
    setLoading(true);
    const controller = new AbortController();
    request.current = controller;
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail }),
        signal: controller.signal,
      });
      const result = await response.json();
      if (controller.signal.aborted) return;
      if (response.ok && result.success) {
        setEmail("");
        setSuccess(result.message || "Thanks for subscribing.");
      } else {
        setError(result.message || "Unable to subscribe. Please try again.");
      }
    } catch {
      if (!controller.signal.aborted)
        setError("Unable to subscribe. Check your connection and try again.");
    } finally {
      if (request.current === controller) {
        request.current = null;
        setLoading(false);
      }
    }
  };

  return (
    <DialogFrame
      open={open}
      onClose={handleClose}
      title={success ? "You're subscribed." : "Newsletter"}
      description={
        success
          ? undefined
          : "Occasional notes on what I'm building, writing, and learning. No sales pitches."
      }
      closeLabel="Close newsletter signup"
    >
      {success ? (
        <Stack gap={3} alignItems="flex-start">
          <Typography role="status">{success}</Typography>
          <Button ref={doneButton} variant="outlined" onClick={handleClose}>
            Done
          </Button>
        </Stack>
      ) : (
        <Box component="form" onSubmit={handleSubmit} noValidate aria-busy={loading}>
          <TextField
            id="newsletter-email"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={emailInput}
            label="Email Address"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setEmailError("");
              setError("");
            }}
            error={Boolean(emailError)}
            helperText={emailError}
            slotProps={{
              htmlInput: { readOnly: loading },
              formHelperText: { "aria-live": "polite" },
            }}
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            aria-disabled={loading}
            aria-busy={loading}
            sx={{ mt: 3 }}
            startIcon={
              loading ? (
                <CircularProgress size={16} color="inherit" aria-hidden="true" />
              ) : undefined
            }
          >
            {loading ? "Subscribing…" : "Subscribe"}
          </Button>
        </Box>
      )}
    </DialogFrame>
  );
}
