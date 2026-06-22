import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Nadu Sleep Solutions — CPAP Triage Platform',
  description: 'Expert CPAP triage, troubleshooting, and clinical support powered by AI',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-slate-50 font-sans antialiased">
        <div className="flex h-full flex-col">
          <Navbar />
          <main className="flex-1 overflow-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
