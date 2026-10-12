import { Button } from "@mui/material";
import Link from "next/link";
import { PageLayout } from "@/components/primitives";

export default function NotFound() {
  return (
    <PageLayout
      section="professional"
      overline="404"
      title="Nothing at this address."
      subtitle="This page may have moved, or the link may be incomplete."
    >
      <Button component={Link} href="/" variant="outlined">
        Back to the home page
      </Button>
    </PageLayout>
  );
}
