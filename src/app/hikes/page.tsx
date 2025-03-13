"use client"

import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Stack, 
  Card, 
  Rating, 
  Tabs, 
  Tab, 
  Grid, 
  Chip,
  Dialog,
  IconButton
} from "@mui/material";
import { hikes, calculateHikeStats } from "./hikes";
import GradientBorder from "@/components/GradientBorder";
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import LandscapeIcon from '@mui/icons-material/Landscape';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TimerIcon from '@mui/icons-material/Timer';
import StraightenIcon from '@mui/icons-material/Straighten';
import TerrainIcon from '@mui/icons-material/Terrain';
import FavoriteIcon from '@mui/icons-material/Favorite';

// Format date from YYYY-MM-DD to Month Day, Year
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

export default function Hikes() {
  const [selectedHike, setSelectedHike] = useState(0);
  const [openImage, setOpenImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hikeStats = calculateHikeStats();
  
  const handleImageOpen = (imageUrl: string, index: number) => {
    setOpenImage(imageUrl);
    setCurrentImageIndex(index);
  };
  
  const handleImageClose = () => {
    setOpenImage(null);
  };
  
  const handlePrevImage = () => {
    const currentHike = hikes[selectedHike];
    setCurrentImageIndex((prev) => {
      const newIndex = prev === 0 ? currentHike.images.length - 1 : prev - 1;
      setOpenImage(currentHike.images[newIndex]);
      return newIndex;
    });
  };
  
  const handleNextImage = () => {
    const currentHike = hikes[selectedHike];
    setCurrentImageIndex((prev) => {
      const newIndex = prev === currentHike.images.length - 1 ? 0 : prev + 1;
      setOpenImage(currentHike.images[newIndex]);
      return newIndex;
    });
  };
  
  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case "Easy":
        return "#4CAF50"; // Green
      case "Moderate":
        return "#2196F3"; // Blue
      case "Hard":
        return "#FF9800"; // Orange
      case "Very Hard":
        return "#F44336"; // Red
      default:
        return "#9E9E9E"; // Grey
    }
  };
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={6}>
        {/* Title and Stats */}
        <GradientBorder 
          gradientColors={["#4CAF50", "#2196F3"]} 
          sx={{ width: '100%' }}
          contentSx={{ p: 4, textAlign: 'center' }}
        >
          <Typography 
            variant="h3" 
            component="h1" 
            fontWeight="700" 
            gutterBottom
            sx={{
              background: 'linear-gradient(to right, #4CAF50, #2196F3)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.02em',
            }}
          >
            Hiking Adventures
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 3, mt: 2 }}>
            <Chip 
              icon={<LandscapeIcon />} 
              label={`${hikeStats.totalHikes} Hikes`} 
              sx={{ 
                bgcolor: 'rgba(76, 175, 80, 0.15)', 
                backdropFilter: 'blur(5px)',
                '& .MuiChip-icon': { color: '#4CAF50' }
              }} 
            />
            <Chip 
              icon={<StraightenIcon />} 
              label={`${hikeStats.totalDistance.toFixed(1)} Miles`} 
              sx={{ 
                bgcolor: 'rgba(33, 150, 243, 0.15)', 
                backdropFilter: 'blur(5px)',
                '& .MuiChip-icon': { color: '#2196F3' }
              }} 
            />
            <Chip 
              icon={<TerrainIcon />} 
              label={`${hikeStats.totalElevation.toLocaleString()} ft Climbed`} 
              sx={{ 
                bgcolor: 'rgba(156, 39, 176, 0.15)', 
                backdropFilter: 'blur(5px)',
                '& .MuiChip-icon': { color: '#9C27B0' }
              }} 
            />
          </Box>
        </GradientBorder>
        
        {/* Hike Tabs */}
        <Box sx={{ width: '100%' }}>
          <Tabs 
            value={selectedHike} 
            onChange={(_, newValue) => setSelectedHike(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ 
              mb: 3,
              '& .MuiTabs-indicator': {
                background: 'linear-gradient(to right, #4CAF50, #2196F3)',
              },
              '& .MuiTab-root': {
                fontWeight: 600,
                letterSpacing: '0.02em',
                transition: 'all 0.3s ease',
                opacity: 0.7,
                '&.Mui-selected': {
                  opacity: 1,
                  background: 'linear-gradient(to right, #4CAF50, #2196F3)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                },
              },
            }}
          >
            {hikes.map((hike) => (
              <Tab 
                key={hike.name} 
                label={hike.name} 
                icon={(
                  <Box 
                    sx={{ 
                      width: 10, 
                      height: 10, 
                      borderRadius: '50%', 
                      bgcolor: getDifficultyColor(hike.difficulty), 
                      display: 'inline-block',
                      mr: 1
                    }} 
                  />
                )} 
                iconPosition="start"
              />
            ))}
          </Tabs>
          
          {/* Selected Hike Content */}
          {hikes.map((hike, index) => (
            <Box key={`hike-${index}`} sx={{ display: selectedHike === index ? 'block' : 'none' }}>
              <GradientBorder 
                gradientColors={["#4CAF50", "#2196F3"]} 
                sx={{ width: '100%', mb: 4 }}
                contentSx={{ p: 0, overflow: 'hidden' }}
              >
                {/* Main Image */}
                <Box 
                  sx={{ 
                    position: 'relative', 
                    height: { xs: '200px', sm: '300px', md: '400px' },
                    width: '100%',
                    cursor: 'pointer',
                    overflow: 'hidden',
                  }}
                  onClick={() => handleImageOpen(hike.images[0], 0)}
                >
                  <img 
                    src={hike.images[0]}
                    alt={hike.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 3,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                  }}>
                    <Typography variant="h4" fontWeight="700" sx={{ color: 'white' }}>
                      {hike.name}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                      <LocationOnIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                      {hike.location} • {formatDate(hike.date)}
                    </Typography>
                  </Box>
                </Box>
                
                {/* Details */}
                <Box sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                    <Chip 
                      label={`Difficulty: ${hike.difficulty}`} 
                      sx={{ 
                        bgcolor: `${getDifficultyColor(hike.difficulty)}22`,
                        color: getDifficultyColor(hike.difficulty),
                        fontWeight: 600
                      }} 
                    />
                    <Chip 
                      icon={<StraightenIcon />}
                      label={`${hike.distance} miles`} 
                    />
                    <Chip 
                      icon={<TerrainIcon />}
                      label={`${hike.elevation} ft elevation`} 
                    />
                    <Chip 
                      icon={<TimerIcon />}
                      label={`${hike.duration}`} 
                    />
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ mr: 1 }}>
                      Rating:
                    </Typography>
                    <Rating 
                      value={hike.rating} 
                      precision={0.5} 
                      readOnly 
                      sx={{ 
                        '& .MuiRating-iconFilled': {
                          color: '#FFD700',
                        },
                      }}
                    />
                    <Typography variant="subtitle1" sx={{ ml: 1 }}>
                      ({hike.rating}/5)
                    </Typography>
                  </Box>
                  
                  <Typography variant="body1" paragraph>{hike.description}</Typography>
                  
                  {hike.trailMapUrl && (
                    <Typography variant="body2" paragraph>
                      <a 
                        href={hike.trailMapUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ 
                          color: '#2196F3', 
                          textDecoration: 'none',
                          fontWeight: 600,
                        }}
                      >
                        View Trail Map
                      </a>
                    </Typography>
                  )}
                </Box>
              </GradientBorder>
              
              {/* Gallery */}
              <Typography 
                variant="h5" 
                component="h2" 
                gutterBottom
                fontWeight="600"
                sx={{ 
                  mb: 3, 
                  borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                  pb: 1 
                }}
              >
                Gallery
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 4 }}>
                {hike.images.map((image, imgIndex) => (
                  <Grid item xs={12} sm={6} md={4} key={`${hike.name}-img-${imgIndex}`}>
                    <Box 
                      sx={{ 
                        height: 200, 
                        borderRadius: 2, 
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'scale(1.02)' }
                      }}
                      onClick={() => handleImageOpen(image, imgIndex)}
                    >
                      <img 
                        src={image} 
                        alt={`${hike.name} - Image ${imgIndex + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
              
              {/* Favorite Spots */}
              {hike.favoriteSpots && hike.favoriteSpots.length > 0 && (
                <>
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    gutterBottom
                    fontWeight="600"
                    sx={{ 
                      mb: 3, 
                      borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                      pb: 1,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <FavoriteIcon sx={{ mr: 1, color: '#f44336' }} /> Favorite Spots
                  </Typography>
                  
                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    {hike.favoriteSpots.map((spot, spotIndex) => (
                      <Grid item xs={12} md={6} key={`${hike.name}-spot-${spotIndex}`}>
                        <GradientBorder 
                          gradientColors={["#4CAF50", "#2196F3"]} 
                          sx={{ width: '100%', height: '100%' }}
                          contentSx={{ p: 0, height: '100%' }}
                        >
                          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            {spot.imageUrl && (
                              <Box 
                                sx={{ 
                                  height: 200, 
                                  width: '100%',
                                  cursor: 'pointer',
                                }}
                                onClick={() => spot.imageUrl && handleImageOpen(spot.imageUrl, 0)}
                              >
                                <img 
                                  src={spot.imageUrl} 
                                  alt={spot.name}
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                  }}
                                />
                              </Box>
                            )}
                            <Box sx={{ p: 3, flexGrow: 1 }}>
                              <Typography variant="h6" gutterBottom fontWeight="600">
                                {spot.name}
                              </Typography>
                              <Typography variant="body2">
                                {spot.description}
                              </Typography>
                            </Box>
                          </Box>
                        </GradientBorder>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </Box>
          ))}
        </Box>
      </Stack>
      
      {/* Image Dialog */}
      <Dialog 
        open={!!openImage} 
        onClose={handleImageClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: 'rgba(18, 18, 18, 0.95)',
            backgroundImage: 'none',
            boxShadow: 'none',
            position: 'relative',
            overflow: 'hidden',
          }
        }}
      >
        {openImage && (
          <>
            <IconButton 
              onClick={handleImageClose}
              sx={{ 
                position: 'absolute', 
                top: 8, 
                right: 8, 
                color: 'white',
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
                zIndex: 1
              }}
            >
              <CloseIcon />
            </IconButton>
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              p: { xs: 2, sm: 4 },
              height: '100%',
              position: 'relative',
            }}>
              <img 
                src={openImage} 
                alt="Enlarged view"
                style={{
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                }}
              />
              
              <IconButton 
                onClick={handlePrevImage}
                sx={{ 
                  position: 'absolute', 
                  left: { xs: 2, sm: 16 }, 
                  color: 'white',
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                  '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
                }}
              >
                <NavigateBeforeIcon fontSize="large" />
              </IconButton>
              
              <IconButton 
                onClick={handleNextImage}
                sx={{ 
                  position: 'absolute', 
                  right: { xs: 2, sm: 16 }, 
                  color: 'white',
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                  '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
                }}
              >
                <NavigateNextIcon fontSize="large" />
              </IconButton>
            </Box>
          </>
        )}
      </Dialog>
    </Container>
  );
}
