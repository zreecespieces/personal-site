import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Zachary Reece",
  description: "Thoughts on software, life, and everything in between.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Zachary Reece",
    description: "Thoughts on software, life, and everything in between.",
    url: "https://zacharyreece.dev/blog",
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
    title: "Blog | Zachary Reece",
    description: "Thoughts on software, life, and everything in between.",
    creator: "@zreecespieces",
    images: ["/opengraph-image"],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
