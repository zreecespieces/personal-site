import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Study Progress | Zachary Reece',
  description: 'Tracking my educational journey and progress through various courses and academic pursuits.',
}

export default function StudyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {children}
    </section>
  )
}
