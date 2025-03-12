import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zachary Reece | Travel Journal',
  description: 'Countries I\'ve visited, time spent, and favorite places around the world',
  openGraph: {
    title: 'Zachary Reece | Travel Journal',
    description: 'Countries I\'ve visited, time spent, and favorite places around the world',
    url: 'https://zacharyreece.dev/travel',
    siteName: 'Zachary Reece',
    images: [
      {
        url: 'https://zacharyreece.dev/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Zachary Reece - Travel Journal',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zachary Reece | Travel Journal',
    description: 'Countries I\'ve visited, time spent, and favorite places around the world',
    creator: '@zreecespieces',
    images: ['https://zacharyreece.dev/og-image.png'],
  },
};

export default function TravelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
