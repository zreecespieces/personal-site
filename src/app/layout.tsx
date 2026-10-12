import React from "react";
import { Metadata } from "next";
import { fontVariables } from "@/theme/fonts";
import { ink } from "@/theme/tokens";
import { ClientRootLayout } from "../components/ClientRootLayout";

const description =
  "Software, learning & the things between. Projects, writing, and personal archives by Zachary Reece.";

export const metadata: Metadata = {
  metadataBase: new URL("https://zacharyreece.dev"),
  title: "Zachary Reece",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Zachary Reece",
    description,
    url: "/",
    siteName: "Zachary Reece",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Zachary Reece - Software, learning & the things between",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zachary Reece",
    description,
    creator: "@zreecespieces",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={fontVariables}
      style={{ backgroundColor: ink[950] }}
    >
      <body>
        <ClientRootLayout>{props.children}</ClientRootLayout>
      </body>
    </html>
  );
}
