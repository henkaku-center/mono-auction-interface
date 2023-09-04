'use client'
import { Providers } from './providers'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import { ChangeNetwork } from '@/components/Web3/ChangeNetwork'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html lang="en">
        <body className={inter.className}>
          <Providers>
            <Header />
            <main>{children}</main>
            <ChangeNetwork />
          </Providers>
        </body>
      </html>
    </>
  )
}
