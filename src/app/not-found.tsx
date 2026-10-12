import { Box, Button, Stack } from "@mui/material";
import Link from "next/link";
import { PageHeader, SectionFrame } from "@/components/primitives";

export default function NotFound() {
  return (
    <Box component="main" id="main-content">
      <SectionFrame spacing="loose">
        <Stack gap={4} alignItems="flex-start">
          <PageHeader
            overline="404 / Not found"
            title="Nothing at this address."
            subtitle="This page may have moved, or the link may be incomplete."
          />
          <Button component={Link} href="/" variant="outlined">
            Back to the home page
          </Button>
        </Stack>
      </SectionFrame>
    </Box>
  );
}
