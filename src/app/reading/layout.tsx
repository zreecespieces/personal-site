import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reading List | Zachary Reece",
  description: "Books I've read and am currently reading",
  alternates: { canonical: "/reading" },
  openGraph: {
    title: "Reading List | Zachary Reece",
    description: "Books I've read and am currently reading",
    url: "https://zacharyreece.dev/reading",
    siteName: "Zachary Reece",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Zachary Reece",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reading List | Zachary Reece",
    description: "Books I've read and am currently reading",
    creator: "@zreecespieces",
    images: ["/opengraph-image"],
  },
};

export default function ReadingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
