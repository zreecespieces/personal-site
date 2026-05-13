import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About | Zachary Reece",
  description:
    "Software engineer, educator, and martial artist building systems for learning and human capability.",
  openGraph: {
    title: "About | Zachary Reece",
    description:
      "Software engineer, educator, and martial artist building systems for learning and human capability.",
    images: ["/og-image.jpg"],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
