import './globals.css'
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { SearchProvider } from "@/contexts/search"
import type { Metadata } from 'next'
import { Lato } from 'next/font/google'

const lato = Lato({
  weight: ['100','300','400','700','900'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Disney Characters',
  description: 'Explore your favorite Disney characters',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <SearchProvider>
          <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </SearchProvider>
      </body>
    </html>
  )
}

