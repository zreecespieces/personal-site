"use client"

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Avatar,
  Card,
  Stack,
  Grid,
  IconButton
} from '@mui/material'
import { links, contactInfo } from './links';
import NextLink from 'next/link';

// Define gradient patterns
const GRADIENT_PATTERNS = [
  ['#92EFFD', '#0072FF'], // Blue gradient
  ['#FFD700', '#FFA500'], // Gold gradient
];

export interface LinkItemProps {
  icon: React.ReactNode;
  title: string;
  url: string;
  subtitle?: string;
}

const LinkItem: React.FC<LinkItemProps & { gradientColors: string[] }> = ({ icon, title, url, gradientColors, subtitle }) => {
  return (
    <Card
      component="a"
      href={url === '' ? undefined : url}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2.5,
        mb: 2.5,
        width: '100%',
        bgcolor: 'rgba(30, 30, 30, 0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: 3,
        textDecoration: 'none',
        color: 'text.primary',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: `linear-gradient(90deg, ${gradientColors.join(', ')})`,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(to right, transparent, rgba(${parseInt(gradientColors[0].slice(1, 3), 16)}, ${parseInt(gradientColors[0].slice(3, 5), 16)}, ${parseInt(gradientColors[0].slice(5, 7), 16)}, 0.03))`,
          zIndex: 0,
        },
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4)',
          bgcolor: 'rgba(40, 40, 45, 0.8)',
          '&::before': {
            height: '3px',
          },
        },
      }}
    >
      <Box 
        sx={{ 
          mr: 2.5, 
          color: gradientColors[0],
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 45,
          height: 45,
          borderRadius: '50%',
          background: `linear-gradient(135deg, rgba(${parseInt(gradientColors[0].slice(1, 3), 16)}, ${parseInt(gradientColors[0].slice(3, 5), 16)}, ${parseInt(gradientColors[0].slice(5, 7), 16)}, 0.2), rgba(${parseInt(gradientColors[1].slice(1, 3), 16)}, ${parseInt(gradientColors[1].slice(3, 5), 16)}, ${parseInt(gradientColors[1].slice(5, 7), 16)}, 0.1))`,
          backdropFilter: 'blur(5px)',
          boxShadow: `0 0 20px rgba(${parseInt(gradientColors[0].slice(1, 3), 16)}, ${parseInt(gradientColors[0].slice(3, 5), 16)}, ${parseInt(gradientColors[0].slice(5, 7), 16)}, 0.3)`,
          '& > svg': {
            fontSize: 22,
          }
        }}
      >
        {icon}
      </Box>
      <Stack sx={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="subtitle1" component="span" fontWeight="600" sx={{ letterSpacing: '0.02em' }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" component="span" color="text.secondary" sx={{ opacity: 0.8 }}>
            {subtitle}
          </Typography>
        )}
      </Stack>
    </Card>
  );
};

export default function LinkTree() {
  return (
      <Container maxWidth={false} sx={{ py: 8, overflow: 'hidden' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            pb: 8,
          }}
        >
          {/* Enhanced gradient background effects */}
          <Box
            sx={{
              position: 'absolute',
              top: -150,
              right: -100,
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4E65FF 0%, #92EFFD 100%)',
              filter: 'blur(90px)',
              opacity: 0.2,
              zIndex: -1,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -100,
              left: -120,
              width: 250,
              height: 250,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FF057C 0%, #8D0B93 100%)',
              filter: 'blur(90px)',
              opacity: 0.15,
              zIndex: -1,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 200,
              left: -80,
              width: 180,
              height: 180,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)',
              filter: 'blur(80px)',
              opacity: 0.1,
              zIndex: -1,
            }}
          />

          {/* Enhanced Profile Section */}
          <Avatar
            alt="Zachary Reece"
            src="/profile-picture.png"
            sx={{
              width: 200,
              height: 200,
              mb: 3,
              border: '4px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(30, 30, 30, 0.8)',
              boxShadow: `0 0 0 2px rgba(187, 134, 252, 0.3), 0 8px 20px rgba(0, 0, 0, 0.4)`,
            }}
          />
          <Typography 
            variant="h4" 
            component="h1" 
            fontWeight="700" 
            align="center" 
            gutterBottom
            sx={{
              background: 'linear-gradient(to right, #00FFFF, #FF00FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.02em',
              mb: 1,
            }}
          >
            Zachary Reece
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary" 
            align="center" 
            sx={{ 
              mb: 4.5,
              fontWeight: 400,
              letterSpacing: '0.01em',
              opacity: 0.9,
              px: 2,
            }}
          >
            software engineer by trade | martial artist by choice | philosopher by nature
          </Typography>

          <Grid container spacing={4}>
            <Grid size={12} sx={{ order: { xs: 2, md: 1 } }}>
                {/* Bio */}
                <Box 
                    sx={{ 
                        width: '100%', 
                        p: 2, 
                        mb: { xs: 4.5, md: 0 }, 
                        borderRadius: 3, 
                        bgcolor: (theme) => theme.palette.background.default,
                        position: 'relative',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: -2,
                            left: -2,
                            right: -2,
                            bottom: -2,
                            background: 'linear-gradient(45deg, #FF00FF, #00FFFF)',
                            borderRadius: 'inherit',
                            zIndex: -1,
                        },
                    }}
                >
                    <Typography 
                        variant="subtitle1" 
                        color="text.secondary" 
                        align="justify" 
                        sx={{
                            fontWeight: 400,
                            letterSpacing: '0.01em',
                            opacity: 0.9,
                            px: 2,
                        }}
                    >
                        I have been working professionally as a React developer for 5+ years but I have been creating technology
                        for my entire life since early childhood. For the last 3 years I have been working as a Senior React Developer
                        for Cloudwell, a software consultancy specializing in enterprise cloud solutions within the Microsoft
                        ecosystem. There I have gained exceptional professional software experience while working for clients ranging
                        from cyber security defense contractors and multi-billion dollar commercial real estate brokers to federal
                        government agencies. I have led efforts including significant refactors of mission-critical logic,
                        rearchitecting a core automated testing system, and implementing brand new features in both a design and
                        development capacity. Before that, I created a bestselling Udemy course on React and MUI development which has
                        taught over 20,000 students in 145 countries. I'm now most interested in building agentic systems with LLMs to
                        develop autonomous tools and workflows that could never have been previously imagined, specifically in education.
                    </Typography>
                </Box>
            </Grid>
            <Grid size={12} sx={{ order: { xs: 1, md: 2 } }}>
                {/* Links Section with enhanced spacing and alternating gradient colors */}
                <Stack spacing={2.5} sx={{ width: '100%', px: 2 }}>
                    {links.map((link, index) => (
                    <LinkItem 
                        key={index} 
                        {...link} 
                        gradientColors={GRADIENT_PATTERNS[index % GRADIENT_PATTERNS.length]} 
                    />
                    ))}
                </Stack>
            </Grid>
          </Grid>

          {/* Contact Info, icons only */}
          <Stack direction="row" spacing={2.5} sx={{ mt: { xs: 0, md: 3 }, mb: 1 }}>
            {contactInfo.map(({ icon, title, url }, index) => (
              <IconButton key={index} component={NextLink} href={url}>
                {icon}
              </IconButton>
            ))}
          </Stack>
          
          {/* Footer */}
          <Typography
            variant="caption" 
            color="text.secondary" 
            align="center" 
            sx={{
              opacity: 0.6,
              letterSpacing: '0.03em',
            }}
          >
            &copy; {new Date().getFullYear()} • Built while listening to ALLEYCVT 🎶
          </Typography>
        </Box>
      </Container>
  );
}