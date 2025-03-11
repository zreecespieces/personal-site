"use client"

import React from 'react';
import { Box, Container, Stack, Typography, Card, Rating, LinearProgress } from "@mui/material";
import { currentlyReading, completedBooks } from "./books";
import NextLink from "next/link";
import GradientBorder from "@/components/GradientBorder";

// Format date from YYYY-MM-DD to Month Day, Year
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

// Helper to format "days ago" for currently reading books
const getDaysAgo = (dateString: string) => {
  const startDate = new Date(dateString);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
};

export default function Reading() {
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
            Reading List
          </Typography>
          <Typography variant="subtitle1">
            {completedBooks.length} books completed
          </Typography>
        </GradientBorder>

        {/* Currently Reading Section */}
        <Box>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom
            fontWeight="600"
            sx={{ 
              mb: 3,
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
              pb: 1,
            }}
          >
            Currently Reading
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -2 }}>
            {currentlyReading.map((book, index) => (
              <Box key={`${book.title}-${index}`} sx={{ width: { xs: '100%', md: '50%' }, p: 2 }}>
                <Card sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  height: '100%',
                  bgcolor: 'rgba(30, 30, 30, 0.7)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 3,
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4)',
                  },
                }}>
                  {/* Book Cover */}
                  {book.coverImage && (
                    <Box 
                      sx={{ 
                        width: { xs: '100%', sm: 150 },
                        height: { xs: 200, sm: 'auto' },
                        flexShrink: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden',
                        bgcolor: 'black',
                      }}
                    >
                      <img 
                        src={book.coverImage} 
                        alt={book.title} 
                        style={{ 
                          height: '100%', 
                          width: '100%', 
                          objectFit: 'cover'
                        }} 
                      />
                    </Box>
                  )}
                  
                  {/* Book Details */}
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between',
                    p: 3,
                    width: '100%',
                  }}>
                    <Stack spacing={1}>
                      <Typography 
                        component="a" 
                        href={book.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        variant="h5" 
                        fontWeight="600"
                        sx={{ 
                          textDecoration: 'none', 
                          color: 'inherit',
                          '&:hover': { color: (theme) => theme.palette.primary.main }
                        }}
                      >
                        {book.title}
                      </Typography>
                      
                      <Typography variant="subtitle1" color="text.secondary">
                        by {book.author}
                      </Typography>
                      
                      <Typography variant="caption" color="text.secondary">
                        Started {formatDate(book.startedDate)} ({getDaysAgo(book.startedDate)})
                      </Typography>
                      
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                          Progress: {book.progress}%
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={book.progress}
                          sx={{ 
                            height: 8, 
                            borderRadius: 4,
                            '& .MuiLinearProgress-bar': {
                              background: `linear-gradient(to right, ${index % 2 === 0 ? '#0072FF, #92EFFD' : '#FFD700, #FFA500'})`
                            }
                          }} 
                        />
                      </Box>
                    </Stack>
                  </Box>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Completed Books Section */}
        <Box>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom
            fontWeight="600"
            sx={{ 
              mb: 3, 
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
              pb: 1 
            }}
          >
            Completed Books
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -2 }}>
            {completedBooks.map((book, index) => (
              <Box key={`${book.title}-${index}`} sx={{ width: { xs: '100%', md: '50%', lg: '33.333%' }, p: 2 }}>
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
                    background: `linear-gradient(90deg, ${index % 2 === 0 ? '#0072FF, #92EFFD' : '#FFD700, #FFA500'})`,
                  },
                }}>
                  {/* Book Cover */}
                  {book.coverImage && (
                    <Box 
                      sx={{ 
                        width: '100%',
                        height: 200,
                        flexShrink: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden',
                        bgcolor: 'black',
                      }}
                    >
                      <img 
                        src={book.coverImage} 
                        alt={book.title} 
                        style={{ 
                          height: '100%', 
                          width: '100%', 
                          objectFit: 'cover'
                        }} 
                      />
                    </Box>
                  )}
                  
                  {/* Book Details */}
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    p: 3,
                  }}>
                    <Stack spacing={1}>
                      <Typography 
                        component="a" 
                        href={book.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        variant="h6" 
                        fontWeight="600"
                        sx={{ 
                          textDecoration: 'none', 
                          color: 'inherit',
                          '&:hover': { color: (theme) => theme.palette.primary.main }
                        }}
                      >
                        {book.title}
                      </Typography>
                      
                      <Typography variant="subtitle2" color="text.secondary">
                        by {book.author}
                      </Typography>
                      
                      {book.rating && (
                        <Rating 
                          value={book.rating} 
                          readOnly 
                          size="small"
                          sx={{ mt: 0.5 }}
                        />
                      )}
                      
                      <Typography variant="caption" color="text.secondary">
                        Completed: {formatDate(book.completedDate)}
                      </Typography>
                      
                      {book.review && (
                        <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                          "{book.review}"
                        </Typography>
                      )}
                    </Stack>
                  </Box>
                </Card>
              </Box>
            ))}
          </Box>
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
    </Container>
  );
}
