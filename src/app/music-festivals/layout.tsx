import type { Metadata } from "next";

const title = "Music Festivals | Zachary Reece";
const description = "Music festivals I've attended, with lineups and locations organized by year.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/music-festivals" },
  openGraph: {
    title,
    description,
    url: "/music-festivals",
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

export default function MusicFestivalsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
