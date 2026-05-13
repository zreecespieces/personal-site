import React from "react";
import { Metadata } from "next";
import { fontVariables } from "@/theme/fonts";
import { ink } from "@/theme/tokens";

export const metadata: Metadata = {
  metadataBase: new URL("https://zacharyreece.dev"),
  title: "Zachary Reece",
  description: "software engineer by trade | martial artist by choice | philosopher by nature",
  openGraph: {
    title: "Zachary Reece",
    description: "software engineer by trade | martial artist by choice | philosopher by nature",
    url: "https://zacharyreece.dev",
    siteName: "Zachary Reece",
    images: [
      {
        url: "https://zacharyreece.dev/og-image.jpg",
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
    title: "Zachary Reece",
    description: "software engineer by trade | martial artist by choice | philosopher by nature",
    creator: "@zreecespieces",
    images: ["https://zacharyreece.dev/og-image.jpg"],
  },
  icons: {
    icon: "/icon.svg",
  },
};

import { ClientRootLayout } from "../components/ClientRootLayout";

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
