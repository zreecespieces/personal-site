"use client"

import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Stack, 
  Card, 
  Tabs,
  Tab,
  LinearProgress,
  Chip,
  Grid,
  Divider,
  Button
} from "@mui/material";
import { courses, calculateCourseStats } from "./courses";
import GradientBorder from "@/components/GradientBorder";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import SchoolIcon from '@mui/icons-material/School';
import TimelineIcon from '@mui/icons-material/Timeline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import ListIcon from '@mui/icons-material/List';
import LaunchIcon from '@mui/icons-material/Launch';

// Format date from YYYY-MM-DD to Month Day, Year
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

// Get course type icon and color
const getCategoryColor = (category: string) => {
  switch(category) {
    case "mathematics":
      return "#F44336"; // Red
    case "programming":
      return "#2196F3"; // Blue
    case "philosophy":
      return "#9C27B0"; // Purple
    case "languages":
      return "#4CAF50"; // Green
    default:
      return "#FF9800"; // Orange
  }
};

export default function Study() {
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const courseStats = calculateCourseStats();
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={6}>
        {/* Title and Stats */}
        <GradientBorder 
          gradientColors={["#6200EA", "#03DAC6"]} 
          sx={{ width: '100%' }}
          contentSx={{ p: 4, textAlign: 'center' }}
        >
          <Typography 
            variant="h3" 
            component="h1" 
            fontWeight="700" 
            gutterBottom
            sx={{
              background: 'linear-gradient(to right, #6200EA, #03DAC6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.02em',
            }}
          >
            Study Progress
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 3, mt: 2 }}>
            <Chip 
              icon={<SchoolIcon />} 
              label={`${courseStats.totalCourses} Courses`} 
              sx={{ 
                bgcolor: 'rgba(98, 0, 234, 0.15)', 
                backdropFilter: 'blur(5px)',
                '& .MuiChip-icon': { color: '#6200EA' }
              }} 
            />
            <Chip 
              icon={<TimelineIcon />} 
              label={`${courseStats.inProgressCourses} In Progress`} 
              sx={{ 
                bgcolor: 'rgba(3, 218, 198, 0.15)', 
                backdropFilter: 'blur(5px)',
                '& .MuiChip-icon': { color: '#03DAC6' }
              }} 
            />
            <Chip 
              icon={<StarIcon />} 
              label={`${courseStats.averageMastery.toFixed(1)}% Avg Mastery`} 
              sx={{ 
                bgcolor: 'rgba(255, 152, 0, 0.15)', 
                backdropFilter: 'blur(5px)',
                '& .MuiChip-icon': { color: '#FF9800' }
              }} 
            />
          </Box>
        </GradientBorder>
        
        {/* Course Tabs */}
        <Box sx={{ width: '100%' }}>
          <Tabs 
            value={selectedCourseIndex} 
            onChange={(_, newValue) => setSelectedCourseIndex(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ 
              mb: 3,
              '& .MuiTabs-indicator': {
                background: 'linear-gradient(to right, #6200EA, #03DAC6)',
              },
              '& .MuiTab-root': {
                fontWeight: 600,
                letterSpacing: '0.02em',
                transition: 'all 0.3s ease',
                opacity: 0.7,
                '&.Mui-selected': {
                  opacity: 1,
                  background: 'linear-gradient(to right, #6200EA, #03DAC6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                },
              },
            }}
          >
            {courses.map((course, index) => (
              <Tab 
                key={course.id} 
                label={course.title}
                icon={(
                  <Box 
                    sx={{ 
                      width: 10, 
                      height: 10, 
                      borderRadius: '50%', 
                      bgcolor: getCategoryColor(course.category),
                      display: 'inline-block',
                      mr: 1
                    }} 
                  />
                )} 
                iconPosition="start"
              />
            ))}
          </Tabs>
          
          {/* Selected Course Content */}
          {courses.map((course, index) => (
            <Box key={course.id} sx={{ display: selectedCourseIndex === index ? 'block' : 'none' }}>
              <GradientBorder 
                gradientColors={["#6200EA", "#03DAC6"]} 
                sx={{ width: '100%', mb: 4 }}
                contentSx={{ p: 0, overflow: 'hidden' }}
              >
                {/* Course Header */}
                <Box sx={{ 
                  p: 3, 
                  background: 'linear-gradient(135deg, rgba(98, 0, 234, 0.1) 0%, rgba(3, 218, 198, 0.1) 100%)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
                    {/* Course Image/Logo */}
                    {course.imageUrl && (
                      <Box 
                        sx={{ 
                          width: { xs: 80, md: 120 },
                          height: { xs: 80, md: 120 },
                          borderRadius: 2,
                          overflow: 'hidden',
                          flexShrink: 0,
                          bgcolor: 'rgba(18, 18, 18, 0.8)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <img 
                          src={course.imageUrl} 
                          alt={course.provider}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            padding: '10px',
                          }}
                        />
                      </Box>
                    )}
                    
                    {/* Course Info */}
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1 }}>
                        <Typography variant="h4" fontWeight="700">
                          {course.title}
                        </Typography>
                        
                        <Chip 
                          label={course.category.charAt(0).toUpperCase() + course.category.slice(1)} 
                          sx={{ 
                            bgcolor: `${getCategoryColor(course.category)}22`,
                            color: getCategoryColor(course.category),
                            fontWeight: 600,
                          }} 
                        />
                      </Box>
                      
                      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        <SchoolIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5, opacity: 0.8 }} />
                        {course.provider}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Started: {formatDate(course.startDate)}
                        {course.endDate && ` • Completed: ${formatDate(course.endDate)}`}
                      </Typography>
                      
                      {course.courseUrl && (
                        <Button 
                          variant="outlined" 
                          size="small"
                          href={course.courseUrl}
                          target="_blank"
                          endIcon={<LaunchIcon />}
                          sx={{ mt: 2 }}
                        >
                          View Course
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Box>
                
                {/* Overall Progress & Mastery */}
                <Box sx={{ p: 3 }}>
                  {course.description && (
                    <Typography variant="body1" paragraph>
                      {course.description}
                    </Typography>
                  )}
                  
                  <Grid container spacing={3} sx={{ mt: 1 }}>
                    {/* Progress */}
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography variant="subtitle1" gutterBottom fontWeight="600">
                        Progress: {course.progress}%
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={course.progress}
                        sx={{ 
                          height: 10, 
                          borderRadius: 5,
                          mb: 1,
                          '& .MuiLinearProgress-bar': {
                            background: 'linear-gradient(to right, #6200EA, #03DAC6)'
                          }
                        }} 
                      />
                      <Typography variant="body2" color="text.secondary">
                        {course.progress < 100 
                          ? `${100 - course.progress}% remaining to completion` 
                          : <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CheckCircleIcon color="success" fontSize="small" sx={{ mr: 0.5 }} />
                              Course completed
                            </Box>
                        }
                      </Typography>
                    </Grid>
                    
                    {/* Mastery */}
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography variant="subtitle1" gutterBottom fontWeight="600">
                        Mastery: {course.mastery}%
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={course.mastery}
                        sx={{ 
                          height: 10, 
                          borderRadius: 5,
                          mb: 1,
                          '& .MuiLinearProgress-bar': {
                            background: 'linear-gradient(to right, #FF9800, #F44336)'
                          }
                        }} 
                      />
                      <Typography variant="body2" color="text.secondary">
                        {course.mastery < 100 
                          ? `${100 - course.mastery}% mastery to achieve` 
                          : <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <StarIcon sx={{ color: '#FFD700', mr: 0.5 }} fontSize="small" />
                              Complete mastery
                            </Box>
                        }
                      </Typography>
                    </Grid>
                  </Grid>
                  
                  {/* Skills */}
                  {course.skills && course.skills.length > 0 && (
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="subtitle1" gutterBottom fontWeight="600">
                        Key Skills
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {course.skills.map((skill, i) => (
                          <Chip 
                            key={`${course.id}-skill-${i}`}
                            label={skill}
                            size="small"
                            sx={{ 
                              bgcolor: 'rgba(255, 255, 255, 0.05)',
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>
                
                {/* Modules Progress */}
                {course.modules && course.modules.length > 0 && (
                  <Box sx={{ p: 3, pt: 0 }}>
                    <Divider sx={{ my: 3 }} />
                    
                    <Typography 
                      variant="h6" 
                      gutterBottom 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 2,
                        fontWeight: 600
                      }}
                    >
                      <ListIcon sx={{ mr: 1 }} /> Course Modules
                    </Typography>
                    
                    <Grid container spacing={3}>
                      {course.modules.map((module, i) => (
                        <Grid size={{ xs: 12, md: 6, lg: 4 }} key={`${course.id}-module-${i}`}>
                          <Card sx={{ 
                            p: 2, 
                            height: '100%',
                            bgcolor: 'rgba(30, 30, 30, 0.7)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: 2,
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-5px)',
                              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                            },
                          }}>
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="subtitle1" gutterBottom fontWeight="600">
                                {module.title}
                              </Typography>
                              
                              {/* Progress */}
                              <Typography variant="body2" gutterBottom>
                                Progress: {module.progress}%
                              </Typography>
                              <LinearProgress 
                                variant="determinate" 
                                value={module.progress}
                                sx={{ 
                                  height: 6, 
                                  borderRadius: 3,
                                  mb: 2,
                                  '& .MuiLinearProgress-bar': {
                                    background: 'linear-gradient(to right, #6200EA, #03DAC6)'
                                  }
                                }} 
                              />
                              
                              {/* Mastery */}
                              <Typography variant="body2" gutterBottom>
                                Mastery: {module.mastery}%
                              </Typography>
                              <LinearProgress 
                                variant="determinate" 
                                value={module.mastery}
                                sx={{ 
                                  height: 6, 
                                  borderRadius: 3,
                                  '& .MuiLinearProgress-bar': {
                                    background: 'linear-gradient(to right, #FF9800, #F44336)'
                                  }
                                }} 
                              />
                            </Box>
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              {module.progress === 100 && (
                                <Chip 
                                  icon={<CheckCircleIcon />} 
                                  label="Completed" 
                                  size="small" 
                                  color="success"
                                  sx={{ height: 24 }}
                                />
                              )}
                            </Box>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </GradientBorder>
            </Box>
          ))}
        </Box>
      </Stack>
    </Container>
  );
}
