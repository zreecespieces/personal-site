"use client";

import React, { useState, useEffect } from 'react';
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
  Link,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { subscribeToNewsletter, storeNewsletterResponse, shouldShowNewsletterPrompt } from '@/utils/mailchimp';

export function NewsletterDialog() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dontAskAgain, setDontAskAgain] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });

  useEffect(() => {
    // Check if we should show the dialog and set a timer
    const shouldShow = shouldShowNewsletterPrompt();
    
    if (shouldShow) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 15000); // 15 seconds
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    
    if (dontAskAgain) {
      storeNewsletterResponse('dont_ask');
    } else {
      storeNewsletterResponse('dismissed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setSnackbar({
        open: true,
        message: 'Please enter your email address',
        severity: 'error'
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await subscribeToNewsletter({ email, firstName, lastName });
      
      if (result.success) {
        setSnackbar({
          open: true,
          message: result.message,
          severity: 'success'
        });
        storeNewsletterResponse('subscribed');
        setOpen(false);
      } else {
        setSnackbar({
          open: true,
          message: result.message,
          severity: 'error'
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'An error occurred. Please try again later.',
        severity: 'error'
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
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: 'rgba(30, 30, 30, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            border: '1px solid rgba(81, 81, 81, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            position: 'relative',
            overflow: 'hidden',
          }
        }}
      >
        {/* Decorative gradients */}
        <Box
          sx={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4E65FF 0%, #92EFFD 100%)',
            filter: 'blur(70px)',
            opacity: 0.15,
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -50,
            left: -50,
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF057C 0%, #8D0B93 100%)',
            filter: 'blur(60px)',
            opacity: 0.1,
            zIndex: 0,
          }}
        />
        
        {/* Close button */}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'text.secondary',
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
            display: 'flex',
            alignItems: 'center',
            gap: 1.5
          }}
        >
          <EmailIcon color="primary" />
          <Typography 
            variant="h5" 
            component="span"
            sx={{
              fontWeight: 600,
              background: 'linear-gradient(to right, #BB86FC, #03DAC6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Stay Connected
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ position: 'relative', zIndex: 1 }}>
          <DialogContentText sx={{ mb: 3 }}>
            I won't be trying to sell you stuff, it's just a way to keep up with whenever I make or do something interesting. 
            It won't be often, but when it does happen it should be cool.
          </DialogContentText>
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="dense"
              label="Email Address"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2.5 }}
            />
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                margin="dense"
                label="First Name (Optional)"
                type="text"
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              
              <TextField
                margin="dense"
                label="Last Name (Optional)"
                type="text"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Box>
            
            <FormControlLabel
              control={
                <Checkbox
                  checked={dontAskAgain}
                  onChange={(e) => setDontAskAgain(e.target.checked)}
                  color="primary"
                />
              }
              label="Don't ask me again"
              sx={{ mt: 2 }}
            />
            
            <DialogActions sx={{ px: 0, pb: 0, pt: 2 }}>
              <Button onClick={handleClose} color="inherit">
                Not Now
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <MailOutlineIcon />}
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
      
      {/* Feedback snackbar */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
