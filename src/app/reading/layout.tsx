import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zachary Reece | Reading List',
  description: 'Books I\'ve read and am currently reading',
  openGraph: {
    title: 'Zachary Reece | Reading List',
    description: 'Books I\'ve read and am currently reading',
    url: 'https://zacharyreece.dev/reading',
    siteName: 'Zachary Reece',
    images: [
      {
        url: 'https://zacharyreece.dev/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Zachary Reece - Reading List',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zachary Reece | Reading List',
    description: 'Books I\'ve read and am currently reading',
    creator: '@zreecespieces',
    images: ['https://zacharyreece.dev/og-image.png'],
  },
};

export default function ReadingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
