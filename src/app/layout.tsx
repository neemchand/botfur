
import './globals.css'
import { Inter } from 'next/font/google'
import { PetProvider } from '@/context/PetContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Virtual Pet',
  description: 'Virtual Pet Web Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PetProvider>
          {children}
        </PetProvider>
      </body>
    </html>
  )
}