"use client"

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Stack,
  LinearProgress,
  Chip,
  Button
} from "@mui/material";
import { courses, calculateCourseStats, khanAcademyStreak } from "./courses";
import GradientBorder from "@/components/GradientBorder";
import SchoolIcon from '@mui/icons-material/School';
import LaunchIcon from '@mui/icons-material/Launch';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import NextLink from 'next/link';

const formatDate = (dateString: string) => {
  // Add a time component to ensure correct date in all timezones
  const dateTimeString = `${dateString}T00:00:00`;
  const date = new Date(dateTimeString);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

export default function Study() {
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
          </Box>
        </GradientBorder>
        
        {/* Khan Academy Courses */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Stack direction="row" justifyContent="center" alignItems="baseline">
            <Typography 
              variant="h4" 
              fontWeight="600" 
              sx={{
                background: 'linear-gradient(to right, #6200EA, #03DAC6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center',
                mb: 2,
                mr: 2
              }}
            >
              Khan Academy 
            </Typography>
            <Chip 
              icon={<LocalFireDepartmentIcon />} 
              label={`${khanAcademyStreak.currentStreak} Week Streak`} 
              sx={{ 
                bgcolor: 'rgba(98, 0, 234, 0.15)',
                backdropFilter: 'blur(5px)',
                '& .MuiChip-icon': { color: '#6200EA' }
              }} 
            />
          </Stack>
          
          {courses.map((course) => (
            <GradientBorder 
              key={course.id}
              gradientColors={["#6200EA", "#03DAC6"]} 
              sx={{ width: '100%' }}
              contentSx={{ p: 0, overflow: 'hidden' }}
            >
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
                        width: { xs: 80, md: 100 },
                        height: { xs: 80, md: 100 },
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
                          padding: '5px',
                        }}
                      />
                    </Box>
                  )}
                  
                  {/* Course Info */}
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1 }}>
                      <Typography variant="h5" fontWeight="700">
                        {course.title}
                      </Typography>
                      
                      <Chip 
                        label={course.category.charAt(0).toUpperCase() + course.category.slice(1)} 
                        sx={{ 
                          bgcolor: "rgba(98, 0, 234, 0.5)",
                          color: "rgba(255, 255, 255, 0.8)",
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
                  </Box>
                </Box>
              </Box>
              
              {/* Overall Progress & Mastery */}
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                  {/* Mastery */}
                  <Box sx={{ flex: 1 }}>
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
                          backgroundColor: "#6200EA"
                        }
                      }} 
                    />
                  </Box>
                  
                  {course.courseUrl && (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                      <Button 
                        variant="outlined" 
                        href={course.courseUrl}
                        target="_blank"
                        endIcon={<LaunchIcon />}
                      >
                        View Course
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            </GradientBorder>
          ))}
        </Box>
        <Button component={NextLink} href="/linktree" sx={{ mt: 4, color: "#6200EA", alignSelf: "flex-start" }}>
          Back to Linktree
        </Button>
      </Stack>
    </Container>
  );
}
