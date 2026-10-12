import { Metadata } from "next";
import React from "react";

const title = "Comedy Shows | Zachary Reece";
const description = "A personal log of live comedy shows and stand-up comedians I've seen.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/comedy" },
  openGraph: {
    title,
    description,
    url: "/comedy",
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

export default function ComedyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
