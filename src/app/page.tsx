import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import { Alert } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Alert severity="warning">This is my personal website! It's under construction right now. Check out{" "} 
          <Link component={NextLink} href="/linktree">my linktree</Link> for more information.</Alert>
      </Box>
    </Container>
  );
}
