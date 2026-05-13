import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkTree | Zachary Reece",
  description: "software engineer by trade | martial artist by choice | philosopher by nature",
  openGraph: {
    title: "LinkTree | Zachary Reece",
    description: "software engineer by trade | martial artist by choice | philosopher by nature",
    url: "https://zacharyreece.dev/linktree",
    siteName: "Zachary Reece",
    images: [
      {
        url: "https://zacharyreece.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zachary Reece - LinkTree",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkTree | Zachary Reece",
    description: "software engineer by trade | martial artist by choice | philosopher by nature",
    creator: "@zreecespieces",
    images: ["https://zacharyreece.dev/og-image.jpg"],
  },
};

export default function LinkTreeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
