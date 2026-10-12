import type { Metadata } from "next";

const title = "AI Art | Zachary Reece";
const description = "A small gallery of AI-generated visuals and experiments with manual editing.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/art" },
  openGraph: {
    title,
    description,
    url: "/art",
    siteName: "Zachary Reece",
    type: "website",
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Zachary Reece" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@zreecespieces",
    images: ["/opengraph-image"],
  },
};

export default function ArtLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
