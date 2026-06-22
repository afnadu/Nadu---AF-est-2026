'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const links = [
  { href: '/chat', label: 'AI Assistant' },
  { href: '/triage', label: 'Triage' },
  { href: '/products', label: 'Products' },
  { href: '/training', label: 'Training' },
  { href: '/admin', label: 'Admin' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-sm font-bold text-white">N</span>
          <div className="leading-none">
            <p className="font-bold text-slate-900">Nadu</p>
            <p className="text-xs text-slate-500">Sleep Solutions</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/chat"
          className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
        >
          Get Help
        </Link>
      </div>
    </header>
  )
}
