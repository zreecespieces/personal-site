import type { Metadata } from "next";

const title = "Study Progress | Zachary Reece";
const description = "What I'm learning: courses, academic pursuits, and progress along the way.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/study" },
  openGraph: {
    title,
    description,
    url: "/study",
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

export default function StudyLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
