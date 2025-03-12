"use client";

import { 
  ImageList, 
  ImageListItem, 
  Typography, 
  Container, 
  CardMedia, 
  Stack, 
  useMediaQuery, 
  Box, 
  Card, 
  CardContent,
  ButtonBase,
  Dialog,
  DialogContent,
  IconButton,
  Chip,
  Divider,
  Paper
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { pics, ArtPiece } from "./pics";
import NextLink from "next/link";
import GradientBorder from "@/components/GradientBorder";
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import React, { useState } from 'react';

export default function Art() {
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    
    const [openImageDialog, setOpenImageDialog] = useState(false);
    const [dialogImage, setDialogImage] = useState<ArtPiece>({ src: '', title: '' });

    const openImage = (pic: ArtPiece) => {
        setDialogImage(pic);
        setOpenImageDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenImageDialog(false);
    };

    // Format date from YYYY-MM-DD to Month Day, Year
    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    const getCols = () => {
        if (matchesSM) return 1;
        if (matchesMD) return 2;
        return 3;
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Stack spacing={6} alignItems="center">
                {/* Title */}
                <GradientBorder 
                    gradientColors={["#FF00FF", "#00FFFF"]} 
                    sx={{ width: '100%' }}
                    contentSx={{ p: 4, textAlign: 'center' }}
                >
                    <Typography 
                        variant="h3" 
                        component="h1" 
                        fontWeight="700" 
                        gutterBottom
                        sx={{
                            background: 'linear-gradient(to right, #FF00FF, #00FFFF)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '0.02em',
                        }}
                    >
                        AI Art Gallery
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, my: 2 }}>
                        <Chip 
                            icon={<ImageIcon />} 
                            label={`${pics.length} Creation${pics.length === 1 ? '' : 's'}`} 
                            sx={{ 
                                bgcolor: 'rgba(255, 0, 255, 0.1)', 
                                color: '#FF00FF',
                                fontWeight: 500,
                                px: 1
                            }} 
                        />
                    </Box>
                </GradientBorder>

                {/* Description */}
                <Typography 
                    variant="body1" 
                    component="p" 
                    align="center" 
                    sx={{ 
                        maxWidth: '800px', 
                        mx: 'auto',
                        fontSize: '1.1rem',
                        lineHeight: 1.6,
                        color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
                    }}
                >
                    A collection of AI-generated artwork created using state-of-the-art diffusion models.
                    Each piece represents a unique back-and-forth exchange between creative meta-prompting, prompting, and manual 
                    editing in Photoshop.
                </Typography>

                {/* Image Gallery */}
                <Box sx={{ width: '100%' }}>
                    {!matchesSM ? (
                        <ImageList 
                            variant="masonry" 
                            cols={getCols()} 
                            gap={16} 
                            sx={{ width: '100%', margin: 0 }}
                        >
                            {pics.map((pic: ArtPiece) => (
                                <Card 
                                    key={pic.title}
                                    sx={{ 
                                        borderRadius: 2, 
                                        overflow: 'hidden',
                                        bgcolor: 'rgba(30, 30, 30, 0.7)',
                                        backdropFilter: 'blur(10px)',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4)',
                                        },
                                    }}
                                >
                                    <ButtonBase 
                                        onClick={() => openImage(pic)}
                                        sx={{ display: 'block', width: '100%', textAlign: 'left' }}
                                    >
                                        <CardMedia 
                                            component="img" 
                                            image={pic.src} 
                                            alt={pic.title}
                                            sx={{ 
                                                width: '100%',
                                                height: 'auto',
                                            }}
                                        />
                                        <CardContent>
                                            <Typography variant="h6" fontWeight="600" gutterBottom>
                                                {pic.title}
                                            </Typography>
                                            {pic.description && (
                                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                                    {pic.description}
                                                </Typography>
                                            )}
                                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
                                                {pic.dateCreated && (
                                                    <Chip 
                                                        icon={<CalendarTodayIcon sx={{ fontSize: '0.8rem' }} />}
                                                        label={formatDate(pic.dateCreated)}
                                                        size="small"
                                                        sx={{ 
                                                            bgcolor: 'rgba(0, 255, 255, 0.1)', 
                                                            color: '#00FFFF',
                                                            fontSize: '0.75rem',
                                                            height: 24
                                                        }}
                                                    />
                                                )}
                                                {pic.model && (
                                                    <Chip 
                                                        icon={<SmartToyIcon sx={{ fontSize: '0.8rem' }} />}
                                                        label={pic.model}
                                                        size="small"
                                                        sx={{ 
                                                            bgcolor: 'rgba(255, 0, 255, 0.1)', 
                                                            color: '#FF00FF',
                                                            fontSize: '0.75rem',
                                                            height: 24
                                                        }}
                                                    />
                                                )}
                                            </Stack>
                                        </CardContent>
                                    </ButtonBase>
                                </Card>
                            ))}
                        </ImageList>
                    ) : (
                        <Stack spacing={3}>
                            {pics.map((pic: ArtPiece) => (
                                <Card 
                                    key={pic.title}
                                    sx={{ 
                                        borderRadius: 2, 
                                        overflow: 'hidden',
                                        bgcolor: 'rgba(30, 30, 30, 0.7)',
                                        backdropFilter: 'blur(10px)',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4)',
                                        },
                                    }}
                                >
                                    <ButtonBase 
                                        onClick={() => openImage(pic)}
                                        sx={{ display: 'block', width: '100%', textAlign: 'left' }}
                                    >
                                        <CardMedia 
                                            component="img" 
                                            image={pic.src} 
                                            alt={pic.title}
                                            sx={{ 
                                                width: '100%',
                                                height: 'auto',
                                            }}
                                        />
                                        <CardContent>
                                            <Typography variant="h6" fontWeight="600" gutterBottom>
                                                {pic.title}
                                            </Typography>
                                            {pic.description && (
                                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                                    {pic.description}
                                                </Typography>
                                            )}
                                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
                                                {pic.dateCreated && (
                                                    <Chip 
                                                        icon={<CalendarTodayIcon sx={{ fontSize: '0.8rem' }} />}
                                                        label={formatDate(pic.dateCreated)}
                                                        size="small"
                                                        sx={{ 
                                                            bgcolor: 'rgba(0, 255, 255, 0.1)', 
                                                            color: '#00FFFF',
                                                            fontSize: '0.75rem',
                                                            height: 24
                                                        }}
                                                    />
                                                )}
                                                {pic.model && (
                                                    <Chip 
                                                        icon={<SmartToyIcon sx={{ fontSize: '0.8rem' }} />}
                                                        label={pic.model}
                                                        size="small"
                                                        sx={{ 
                                                            bgcolor: 'rgba(255, 0, 255, 0.1)', 
                                                            color: '#FF00FF',
                                                            fontSize: '0.75rem',
                                                            height: 24
                                                        }}
                                                    />
                                                )}
                                            </Stack>
                                        </CardContent>
                                    </ButtonBase>
                                </Card>
                            ))}
                        </Stack>
                    )}
                </Box>

                {/* Back to LinkTree Button with matching styling */}
                <Box sx={{ display: 'flex', justifyContent: 'left', width: "100%", mt: 2 }}>
                    <Typography 
                        component={NextLink} 
                        href="/linktree" 
                        variant="body1" 
                        sx={{ 
                            textDecoration: "none", 
                            color: "#FF00FF",
                            py: 1,
                            px: 3,
                            alignSelf: "start",
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
                        backdropFilter: 'blur(5px)',
                        borderRadius: 2,
                        overflow: 'hidden',
                    }
                }}
            >
                <DialogContent sx={{ p: 0, position: 'relative' }}>
                    <IconButton
                        onClick={handleCloseDialog}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: 'white',
                            bgcolor: 'rgba(0, 0, 0, 0.4)',
                            '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.6)' },
                            zIndex: 1,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <img 
                        src={dialogImage.src} 
                        alt={dialogImage.title} 
                        style={{ 
                            width: '100%', 
                            height: 'auto',
                            maxHeight: '80vh',
                            objectFit: 'contain',
                        }} 
                    />
                    
                    {/* Image metadata in dialog */}
                    <Paper 
                        elevation={0} 
                        sx={{ 
                            bgcolor: 'rgba(0, 0, 0, 0.7)', 
                            p: 3, 
                            borderRadius: 0,
                            color: 'white'
                        }}
                    >
                        <Typography variant="h5" fontWeight="600" gutterBottom>
                            {dialogImage.title}
                        </Typography>
                        
                        {dialogImage.description && (
                            <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                                {dialogImage.description}
                            </Typography>
                        )}
                        
                        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                            {dialogImage.dateCreated && (
                                <Box>
                                    <Typography variant="caption" color="rgba(255,255,255,0.7)">
                                        Created
                                    </Typography>
                                    <Typography variant="body2">
                                        {formatDate(dialogImage.dateCreated)}
                                    </Typography>
                                </Box>
                            )}
                            
                            {dialogImage.model && (
                                <Box>
                                    <Typography variant="caption" color="rgba(255,255,255,0.7)">
                                        Platform
                                    </Typography>
                                    <Typography variant="body2">
                                        {dialogImage.model}
                                    </Typography>
                                </Box>
                            )}
                        </Stack>
                    </Paper>
                </DialogContent>
            </Dialog>
        </Container>
    );
}