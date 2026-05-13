import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Zachary Reece",
  description: "Thoughts on software, life, and everything in between.",
  openGraph: {
    title: "Blog | Zachary Reece",
    description: "Thoughts on software, life, and everything in between.",
    url: "https://zacharyreece.dev/blog",
    siteName: "Zachary Reece",
    images: [
      {
        url: "https://zacharyreece.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zachary Reece - Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Zachary Reece",
    description: "Thoughts on software, life, and everything in between.",
    creator: "@zreecespieces",
    images: ["https://zacharyreece.dev/og-image.jpg"],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
