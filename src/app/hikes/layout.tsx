import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hiking | Zachary Reece',
  description: 'A collection of memorable hikes and trails I have experienced around the world.',
}

export default function HikesLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {children}
    </section>
  )
}
