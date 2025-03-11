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
  ButtonBase,
  Dialog,
  DialogContent,
  IconButton,
  Avatar,
  Link
} from "@mui/material";
import { comedians, getTotalShows, getTotalComediansSeen, formatDate } from "./comedians";
import NextLink from "next/link";
import CloseIcon from '@mui/icons-material/Close';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import EventIcon from '@mui/icons-material/Event';
import StarIcon from '@mui/icons-material/Star';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';
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
            {comedians.map((comedian, index) => (
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
          {comedians.map((comedian, index) => (
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
                    <Box 
                      sx={{ 
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        bgcolor: 'rgba(0, 0, 0, 0.6)',
                        color: 'gold',
                        borderRadius: '50%',
                        width: 40,
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <StarIcon />
                    </Box>
                  )}
                </Box>
                
                {/* Comedian Info */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h4" fontWeight="700" gutterBottom>
                    {comedian.name}
                  </Typography>
                  
                  {comedian.bio && (
                    <Typography variant="body1" sx={{ mb: 2, fontSize: '1.1rem', lineHeight: 1.7 }}>
                      {comedian.bio}
                    </Typography>
                  )}
                  
                  {/* Social Media */}
                  {comedian.socialMedia && (
                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                      {comedian.socialMedia.instagram && (
                        <Link 
                          href={`https://instagram.com/${comedian.socialMedia.instagram}`} 
                          target="_blank"
                          sx={{ 
                            color: 'text.secondary',
                            '&:hover': { color: '#0072FF' },
                          }}
                        >
                          <InstagramIcon />
                        </Link>
                      )}
                      
                      {comedian.socialMedia.twitter && (
                        <Link 
                          href={`https://twitter.com/${comedian.socialMedia.twitter}`} 
                          target="_blank"
                          sx={{ 
                            color: 'text.secondary',
                            '&:hover': { color: '#0072FF' },
                          }}
                        >
                          <TwitterIcon />
                        </Link>
                      )}
                      
                      {comedian.socialMedia.website && (
                        <Link 
                          href={`https://${comedian.socialMedia.website}`} 
                          target="_blank"
                          sx={{ 
                            color: 'text.secondary',
                            '&:hover': { color: '#0072FF' },
                          }}
                        >
                          <LanguageIcon />
                        </Link>
                      )}
                    </Box>
                  )}
                  
                  {/* Specials To Watch */}
                  {comedian.specialsToWatch && comedian.specialsToWatch.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                        Specials to Watch:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {comedian.specialsToWatch.map((special, sIndex) => (
                          <Chip 
                            key={special}
                            label={special}
                            size="small"
                            sx={{ 
                              bgcolor: sIndex % 2 === 0 ? 'rgba(0, 114, 255, 0.1)' : 'rgba(146, 239, 253, 0.1)', 
                              color: sIndex % 2 === 0 ? '#0072FF' : '#92EFFD',
                              fontWeight: 500,
                              height: 'auto',
                              py: 0.5,
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>

              {/* Shows List */}
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
                <EventIcon color="primary" />
                Shows Attended
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -2 }}>
                {comedian.shows.map((show, sIndex) => (
                  <Box key={`${show.date}-${sIndex}`} sx={{ width: { xs: '100%', md: '50%' }, p: 2 }}>
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
                      {/* Show Details */}
                      <Box sx={{ p: 3 }}>
                        <Typography variant="h6" fontWeight="600" gutterBottom>
                          {show.venue}
                        </Typography>
                        
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          {show.city} • {formatDate(show.date)}
                        </Typography>
                        
                        {show.tourName && (
                          <Chip 
                            label={show.tourName}
                            size="small"
                            sx={{ 
                              mt: 1,
                              mb: 2,
                              bgcolor: 'rgba(146, 239, 253, 0.1)', 
                              color: '#92EFFD',
                              fontWeight: 500,
                              height: 'auto',
                              py: 0.5,
                            }}
                          />
                        )}
                        
                        {show.rating && (
                          <Rating 
                            value={show.rating} 
                            readOnly 
                            precision={0.5}
                            size="small"
                            sx={{ mt: 0.5, mb: 1.5 }}
                          />
                        )}
                        
                        {show.notes && (
                          <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                            "{show.notes}"
                          </Typography>
                        )}

                        {/* Ticket Image */}
                        {show.ticketImage && (
                          <ButtonBase 
                            sx={{ 
                              width: '100%',
                              mt: 2,
                              display: 'block',
                              borderRadius: 1,
                              overflow: 'hidden',
                            }}
                            onClick={() => openImage(show.ticketImage || '')}
                          >
                            <Box 
                              sx={{ 
                                width: '100%',
                                height: 120,
                                position: 'relative',
                              }}
                            >
                              <img 
                                src={show.ticketImage} 
                                alt="Ticket stub" 
                                style={{ 
                                  width: '100%', 
                                  height: '100%', 
                                  objectFit: 'cover',
                                }} 
                              />
                            </Box>
                          </ButtonBase>
                        )}
                      </Box>
                    </Card>
                  </Box>
                ))}
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