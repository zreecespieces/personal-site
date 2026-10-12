import type { Metadata } from "next";

const title = "Hiking | Zachary Reece";
const description = "A personal log of hikes, trails, and summits around the world.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/hikes" },
  openGraph: {
    title,
    description,
    url: "/hikes",
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

export default function HikesLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
