"use client"

import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Stack, 
  Typography, 
  Card, 
  Rating, 
  Chip, 
  Tabs, 
  Tab,
  Divider,
  ButtonBase,
  Dialog,
  DialogContent,
  IconButton
} from "@mui/material";
import { countries, calculateDaysSpent, getTotalCountriesVisited, getTotalDaysSpent } from "./countries";
import NextLink from "next/link";
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PublicIcon from '@mui/icons-material/Public';
import FlightIcon from '@mui/icons-material/Flight';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GradientBorder from "@/components/GradientBorder";

// Format date from YYYY-MM-DD to Month Day, Year
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

// Calculate days between two dates
const calculateDuration = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1 ? '1 day' : `${diffDays} days`;
};

export default function Travel() {
  const [selectedCountry, setSelectedCountry] = useState<number>(0);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [dialogImage, setDialogImage] = useState('');

  const handleCountryChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedCountry(newValue);
  };

  const openImage = (imageUrl: string) => {
    setDialogImage(imageUrl);
    setOpenImageDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenImageDialog(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={6}>
        {/* Title */}
        <GradientBorder 
          gradientColors={["#0072FF", "#92EFFD"]} 
          sx={{ width: '100%' }}
          contentSx={{ p: 4, textAlign: 'center' }}
        >
          <Typography 
            variant="h3" 
            component="h1" 
            fontWeight="700" 
            gutterBottom
            sx={{
              background: 'linear-gradient(to right, #0072FF, #92EFFD)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.02em',
            }}
          >
            Travel
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, my: 2 }}>
            <Chip 
              icon={<PublicIcon />} 
              label={`${getTotalCountriesVisited()} Countries Visited`} 
              sx={{ 
                bgcolor: 'rgba(0, 114, 255, 0.1)', 
                color: '#0072FF',
                fontWeight: 500,
                px: 1
              }} 
            />
            <Chip 
              icon={<AccessTimeIcon />} 
              label={`${getTotalDaysSpent()} Days Abroad`} 
              sx={{ 
                bgcolor: 'rgba(146, 239, 253, 0.1)', 
                color: '#92EFFD',
                fontWeight: 500,
                px: 1
              }} 
            />
          </Box>
        </GradientBorder>

        {/* Country Selection Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', overflowX: 'auto' }}>
          <Tabs 
            value={selectedCountry} 
            onChange={handleCountryChange} 
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                p: 2,
                minWidth: 0,
                mr: 2,
              },
              '& .Mui-selected': {
                color: '#0072FF !important',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#0072FF',
                height: 3,
              },
            }}
          >
            {countries.map((country, index) => (
              <Tab 
                key={country.name} 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span>{country.flag}</span>
                    <span>{country.name}</span>
                  </Box>
                } 
              />
            ))}
          </Tabs>
        </Box>

        {/* Country Details */}
        <Box>
          {countries.map((country, index) => (
            <Box 
              key={country.name}
              sx={{ 
                display: selectedCountry === index ? 'block' : 'none',
                animation: 'fadeIn 0.5s',
                '@keyframes fadeIn': {
                  '0%': { opacity: 0 },
                  '100%': { opacity: 1 }
                }
              }}
            >
              {/* Country Header with Cover Image */}
              <Box sx={{ 
                position: 'relative',
                mb: 4,
                height: { xs: 200, sm: 300, md: 400 },
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              }}>
                <Box 
                  component="img"
                  src={country.coverImage}
                  alt={country.name}
                  sx={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  onClick={() => openImage(country.coverImage)}
                  style={{ cursor: 'pointer' }}
                />
                
                {/* Overlay with country name */}
                <Box sx={{ 
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: 3,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}>
                  <Box>
                    <Typography variant="h4" fontWeight="700" color="white">
                      {country.name} {country.flag}
                    </Typography>
                    <Typography variant="body1" color="rgba(255, 255, 255, 0.8)">
                      {country.visits.length} {country.visits.length === 1 ? 'visit' : 'visits'} · {calculateDaysSpent(country.visits)} total days
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Country Description */}
              {country.description && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                    {country.description}
                  </Typography>
                </Box>
              )}

              {/* Visits History */}
              <Box sx={{ mb: 4 }}>
                <Typography 
                  variant="h5" 
                  component="h2" 
                  sx={{ 
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    '&::after': {
                      content: '""',
                      height: '1px',
                      flexGrow: 1,
                      bgcolor: 'divider',
                      ml: 2,
                    },
                  }}
                >
                  <FlightIcon color="primary" />
                  Visit History
                </Typography>
                
                <Stack spacing={2}>
                  {country.visits.map((visit, vIndex) => (
                    <Card key={`${visit.startDate}-${vIndex}`} sx={{ 
                      p: 2,
                      bgcolor: 'rgba(30, 30, 30, 0.7)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 2,
                    }}>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between">
                        <Box>
                          <Typography variant="subtitle1" fontWeight="600">
                            {formatDate(visit.startDate)} - {formatDate(visit.endDate)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {calculateDuration(visit.startDate, visit.endDate)}
                          </Typography>
                        </Box>
                        <Chip 
                          label={visit.purpose}
                          size="small"
                          sx={{ 
                            bgcolor: vIndex % 2 === 0 ? 'rgba(0, 114, 255, 0.1)' : 'rgba(255, 215, 0, 0.1)', 
                            color: vIndex % 2 === 0 ? '#0072FF' : '#FFD700',
                            fontWeight: 500,
                            height: 'auto',
                            py: 0.5,
                          }}
                        />
                      </Stack>
                    </Card>
                  ))}
                </Stack>
              </Box>

              {/* Favorite Spots */}
              <Box>
                <Typography 
                  variant="h5" 
                  component="h2" 
                  sx={{ 
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    '&::after': {
                      content: '""',
                      height: '1px',
                      flexGrow: 1,
                      bgcolor: 'divider',
                      ml: 2,
                    },
                  }}
                >
                  <FavoriteIcon sx={{ color: '#e91e63' }} />
                  Favorite Places
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -2 }}>
                  {country.favoriteSpots.map((spot, sIndex) => (
                    <Box key={`${spot.name}-${sIndex}`} sx={{ width: { xs: '100%', md: '50%' }, p: 2 }}>
                      <Card sx={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        height: '100%',
                        bgcolor: 'rgba(30, 30, 30, 0.7)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 3,
                        overflow: 'hidden',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        position: 'relative',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4)',
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '4px',
                          background: `linear-gradient(90deg, ${sIndex % 2 === 0 ? '#0072FF, #92EFFD' : '#FFD700, #FFA500'})`,
                        },
                      }}>
                        {/* Spot Image */}
                        {spot.image && (
                          <ButtonBase 
                            sx={{ 
                              width: '100%',
                              height: 200,
                              display: 'block',
                            }}
                            onClick={() => openImage(spot.image || '')}
                          >
                            <Box 
                              sx={{ 
                                width: '100%',
                                height: '100%',
                                position: 'relative',
                                overflow: 'hidden',
                                bgcolor: 'black',
                              }}
                            >
                              <img 
                                src={spot.image} 
                                alt={spot.name} 
                                style={{ 
                                  height: '100%', 
                                  width: '100%', 
                                  objectFit: 'cover',
                                  transition: 'transform 0.5s ease'
                                }} 
                              />
                            </Box>
                          </ButtonBase>
                        )}
                        
                        {/* Spot Details */}
                        <Box sx={{ 
                          display: 'flex', 
                          flexDirection: 'column', 
                          flexGrow: 1,
                          p: 3,
                        }}>
                          <Typography variant="h6" fontWeight="600" gutterBottom>
                            {spot.name}
                          </Typography>
                          
                          {spot.location && (
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                              {spot.location}
                            </Typography>
                          )}
                          
                          {spot.rating && (
                            <Rating 
                              value={spot.rating} 
                              readOnly 
                              precision={0.5}
                              size="small"
                              sx={{ mt: 0.5, mb: 1 }}
                            />
                          )}
                          
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            {spot.description}
                          </Typography>
                        </Box>
                      </Card>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
        
        {/* Back to LinkTree Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Typography 
            component={NextLink} 
            href="/linktree" 
            variant="body1" 
            sx={{ 
              textDecoration: "none", 
              color: "inherit",
              py: 1,
              px: 3,
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'rgba(187, 134, 252, 0.1)',
              }
            }}
          >
            Back to LinkTree
          </Typography>
        </Box>
      </Stack>

      {/* Image Dialog */}
      <Dialog
        open={openImageDialog}
        onClose={handleCloseDialog}
        maxWidth="lg"
        PaperProps={{
          sx: {
            bgcolor: 'rgba(18, 18, 18, 0.95)',
            borderRadius: 2,
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
            overflow: 'hidden',
          }
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white',
            zIndex: 1,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.7)',
            }
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ p: 0 }}>
          <img
            src={dialogImage}
            alt="Enlarged view"
            style={{ 
              width: '100%', 
              height: 'auto', 
              display: 'block',
              maxHeight: '80vh',
              objectFit: 'contain'
            }}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
}
