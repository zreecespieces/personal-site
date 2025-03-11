import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Comedy Shows | Zachary Reece",
  description: "A collection of live comedy shows and stand-up comedians I've seen in person, with ratings, notes, and recommendations.",
  openGraph: {
    title: "Comedy Shows | Zachary Reece",
    description: "A collection of live comedy shows and stand-up comedians I've seen in person, with ratings, notes, and recommendations.",
    images: ["/images/og-comedy.jpg"],
  },
};

export default function ComedyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#121212] to-[#1e1e1e]">
      {children}
    </main>
  );
}