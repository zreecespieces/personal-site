import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Journal | Zachary Reece",
  description: "Countries I've visited, time spent, and favorite places around the world",
  alternates: { canonical: "/travel" },
  openGraph: {
    title: "Travel Journal | Zachary Reece",
    description: "Countries I've visited, time spent, and favorite places around the world",
    url: "https://zacharyreece.dev/travel",
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
    title: "Travel Journal | Zachary Reece",
    description: "Countries I've visited, time spent, and favorite places around the world",
    creator: "@zreecespieces",
    images: ["/opengraph-image"],
  },
};

export default function TravelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
