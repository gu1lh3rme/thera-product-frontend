import type { Metadata } from 'next'
import './globals.css'
import { ReduxProvider } from '@/components/ReduxProvider'

export const metadata: Metadata = {
  title: 'Product Management',
  description: 'Product management application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
