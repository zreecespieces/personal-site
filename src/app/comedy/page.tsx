"use client"

import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Stack, 
  Typography, 
  Card, 
  Chip, 
  Tabs, 
  Tab,
  ButtonBase,
  Dialog,
  DialogContent,
  IconButton,
  Avatar,
  Link
} from "@mui/material";
import { comedians, getTotalShows, getTotalComediansSeen, formatDate, getComediansByEarliestSeen } from "./comedians";
import NextLink from "next/link";
import CloseIcon from '@mui/icons-material/Close';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import EventIcon from '@mui/icons-material/Event';
import StarIcon from '@mui/icons-material/Star';
import GradientBorder from "@/components/GradientBorder";

export default function Comedy() {
  const [selectedComedian, setSelectedComedian] = useState<number>(0);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [dialogImage, setDialogImage] = useState('');

  const handleComedianChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedComedian(newValue);
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
            Comedy
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, my: 2 }}>
            <Chip 
              icon={<TheaterComedyIcon />} 
              label={`${getTotalComediansSeen()} Comedians Seen`} 
              sx={{ 
                bgcolor: 'rgba(0, 114, 255, 0.1)', 
                color: '#0072FF',
                fontWeight: 500,
                px: 1
              }} 
            />
            <Chip 
              icon={<EventIcon />} 
              label={`${getTotalShows()} Live Shows`} 
              sx={{ 
                bgcolor: 'rgba(146, 239, 253, 0.1)', 
                color: '#92EFFD',
                fontWeight: 500,
                px: 1
              }} 
            />
          </Box>
        </GradientBorder>

        {/* Comedian Selection Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', overflowX: 'auto' }}>
          <Tabs 
            value={selectedComedian} 
            onChange={handleComedianChange} 
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
            {getComediansByEarliestSeen().map((comedian, index) => (
              <Tab 
                key={comedian.name} 
                label={comedian.name} 
                icon={(
                  <Avatar 
                    src={comedian.image} 
                    alt={comedian.name}
                    sx={{ 
                      width: 32, 
                      height: 32,
                      mb: 0.5,
                      border: comedian.favorite ? '2px solid gold' : 'none',
                    }}
                  />
                )}
                sx={{ 
                  flexDirection: 'column',
                  alignItems: 'center',
                  minHeight: 72,
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Comedian Details */}
        <Box>
          {getComediansByEarliestSeen().map((comedian, index) => (
            <Box 
              key={comedian.name}
              sx={{ 
                display: selectedComedian === index ? 'block' : 'none',
                animation: 'fadeIn 0.5s',
                '@keyframes fadeIn': {
                  '0%': { opacity: 0 },
                  '100%': { opacity: 1 }
                }
              }}
            >
              {/* Comedian Header */}
              <Box sx={{ 
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { xs: 'center', md: 'flex-start' },
                gap: 4,
                mb: 4,
              }}>
                {/* Comedian Image */}
                <Box 
                  sx={{ 
                    width: { xs: '100%', sm: 300 },
                    height: { xs: 300, sm: 400 },
                    flexShrink: 0,
                    position: 'relative',
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <ButtonBase 
                    sx={{ 
                      width: '100%',
                      height: '100%',
                      display: 'block',
                    }}
                    onClick={() => openImage(comedian.image)}
                  >
                    <img 
                      src={comedian.image} 
                      alt={comedian.name} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                      }} 
                    />
                  </ButtonBase>
                  
                  {comedian.favorite && (
                    <Chip 
                      icon={<StarIcon sx={{ color: 'gold !important' }} />}
                      label="Favorite"
                      sx={{ 
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        bgcolor: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        fontWeight: 'bold',
                        '& .MuiChip-icon': {
                          color: 'gold'
                        }
                      }}
                    />
                  )}
                </Box>
                
                {/* Comedian Bio */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h4" gutterBottom fontWeight="700">
                    {comedian.name}
                  </Typography>
                  
                  {comedian.bio && (
                    <Typography variant="body1" color="text.secondary" paragraph>
                      {comedian.bio}
                    </Typography>
                  )}

                  {/* Show statistics */}
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: 2,
                      mt: 3
                    }}
                  >
                    <Chip 
                      label={`${comedian.shows.length} ${comedian.shows.length === 1 ? 'Show' : 'Shows'} Attended`}
                      sx={{ 
                        bgcolor: 'rgba(0, 114, 255, 0.1)', 
                        color: '#0072FF',
                        fontWeight: 500  
                      }} 
                    />
                    
                    {comedian.shows.length > 0 && (
                      <Chip 
                        label={`First Seen: ${formatDate(comedian.shows.reduce((earliest, show) => 
                          !earliest || show.date < earliest ? show.date : earliest, ""))}`}
                        sx={{ 
                          bgcolor: 'rgba(146, 239, 253, 0.1)', 
                          color: '#92EFFD',
                          fontWeight: 500  
                        }} 
                      />
                    )}

                    {comedian.shows.length > 0 && (
                      <Chip 
                        label={`Last Seen: ${formatDate(comedian.shows.reduce((latest, show) => 
                          !latest || show.date > latest ? show.date : latest, ""))}`}
                        sx={{ 
                          bgcolor: 'rgba(255, 215, 0, 0.1)', 
                          color: 'gold',
                          fontWeight: 500  
                        }} 
                      />
                    )}
                  </Box>
                </Box>
              </Box>

              {/* Shows */}
              <Box sx={{ mt: 6 }}>
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  fontWeight="700"
                  sx={{ 
                    pb: 1, 
                    borderBottom: '2px solid rgba(146, 239, 253, 0.3)' 
                  }}
                >
                  Show History
                </Typography>
                
                <Stack spacing={3} sx={{ mt: 3 }}>
                  {comedian.shows.map((show, idx) => (
                    <Card 
                      key={idx} 
                      sx={{ 
                        p: 3, 
                        borderRadius: 2,
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <Box sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        mb: 2
                      }}>
                        <Typography variant="h6" fontWeight="600">
                          {show.tourName ? `${show.tourName}` : comedian.name}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: 2, 
                        mb: 2
                      }}>
                        <Chip 
                          label={formatDate(show.date)}
                          size="small"
                          sx={{ 
                            bgcolor: 'rgba(0, 114, 255, 0.1)', 
                            color: '#0072FF', 
                          }} 
                        />
                        <Chip 
                          label={`${show.venue}, ${show.city}`}
                          size="small"
                          sx={{ 
                            bgcolor: 'rgba(146, 239, 253, 0.1)', 
                            color: '#92EFFD', 
                          }} 
                        />
                      </Box>
                      
                      {show.notes && (
                        <Typography variant="body2" color="text.secondary">
                          {show.notes}
                        </Typography>
                      )}
                      
                      {show.ticketImage && (
                        <ButtonBase 
                          onClick={() => openImage(show.ticketImage!)}
                          sx={{ 
                            mt: 2, 
                            display: 'block', 
                            textAlign: 'left',
                            borderRadius: 1,
                            overflow: 'hidden',
                            width: { xs: '100%', sm: 200 },
                            height: 100,
                          }}
                        >
                          <img 
                            src={show.ticketImage} 
                            alt="Ticket" 
                            style={{ 
                              width: '100%', 
                              height: '100%', 
                              objectFit: 'cover'
                            }} 
                          />
                        </ButtonBase>
                      )}
                    </Card>
                  ))}
                </Stack>
              </Box>
            </Box>
          ))}
        </Box>
      </Stack>
      
      {/* Image Dialog */}
      <Dialog
        open={openImageDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <IconButton
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'white',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.7)',
              },
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>
          <img 
            src={dialogImage} 
            alt="Enlarged view" 
            style={{ 
              width: '100%', 
              display: 'block',
              maxHeight: '80vh',
              objectFit: 'contain',
            }} 
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
}