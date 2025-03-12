import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zachary Reece',
  description: 'software engineer by trade | martial artist by choice | philosopher by nature',
  openGraph: {
    title: 'Zachary Reece',
    description: 'software engineer by trade | martial artist by choice | philosopher by nature',
    url: 'https://zacharyreece.dev',
    siteName: 'Zachary Reece',
    images: [
      {
        url: 'https://zacharyreece.dev/og-image.png', 
        width: 1200,
        height: 630,
        alt: 'Zachary Reece',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zachary Reece',
    description: 'software engineer by trade | martial artist by choice | philosopher by nature',
    creator: '@zreecespieces',
    images: ['https://zacharyreece.dev/og-image.png'],
  },
};

import { ClientRootLayout } from '../components/ClientRootLayout';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning style={{ backgroundColor: '#121212' }}>
      <body>
        <ClientRootLayout>{props.children}</ClientRootLayout>
      </body>
    </html>
  );
}
