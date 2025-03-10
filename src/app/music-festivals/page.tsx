"use client"

import { Box, Container, Stack, Typography } from "@mui/material";
import { festivals } from "./festivals";
import NextLink from "next/link";

export default function MusicFestivals() {
    return (
        <Container maxWidth="lg">
            <Stack spacing={4} alignItems="center" p={2}>
                <Box textAlign="center" p={2} sx={{ bgcolor: (theme) => theme.palette.background.default, borderRadius: 3}}>
                    <Typography variant="h3" component="h1" fontWeight="700" gutterBottom textAlign="center">
                        Music Festival History
                    </Typography>
                    <Typography variant="subtitle1" textAlign="center">{festivals.length} total</Typography>
                </Box>
                {festivals.map((festival) => (
                    <Stack spacing={1} key={festival.name + festival.year} alignItems="center" width="100%">
                        <Typography textAlign="center" sx={{ textDecoration: "none", color: "inherit", width: "fit-content", fontSize: "1.5rem" }} variant="h4" component="a" fontWeight="700" gutterBottom href={festival.url} target="_blank" rel="noopener noreferrer">
                            {festival.name} {festival.year} - {festival.location}
                        </Typography>
                        <Box width="100%">
                            <img src={festival.image} alt={festival.name} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                        </Box>
                        {festival.description && (
                            <Typography variant="body1" component="p" align="center" gutterBottom>
                                {festival.description}
                            </Typography>
                        )}
                    </Stack>
                ))}
            </Stack>
            <Typography component={NextLink} href="/linktree" variant="body1" textAlign="center" sx={{ textDecoration: "none", color: "inherit" }}>
                Back to LinkTree
            </Typography>
        </Container>
    );
}