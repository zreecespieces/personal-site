"use client";

import { ImageList, ImageListItem, Typography, Container, CardMedia, Stack, useMediaQuery } from "@mui/material";
import { pics } from "./pics";

export default function Art() {
    const matchesSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Stack direction="column" justifyContent="center" alignItems="center">
                <Typography variant="h4" gutterBottom>
                    My AI Art
                </Typography>
                {!matchesSM && (
                    <ImageList sx={{ width: '100%', height: '100%' }} variant="quilted" gap={8}>
                        {pics.map(pic => (
                            <ImageListItem key={pic.title}>
                                <CardMedia component="img" image={pic.src} alt={pic.title}/>
                            </ImageListItem>
                        ))}
                    </ImageList>
                )}
                {matchesSM && (
                    <Stack direction="column" justifyContent="center" alignItems="center">
                        {pics.map(pic => (
                            <ImageListItem key={pic.title}>
                                <CardMedia component="img" image={pic.src} alt={pic.title}/>
                            </ImageListItem>
                        ))}
                    </Stack>
                )}
            </Stack>
        </Container>
    );
}