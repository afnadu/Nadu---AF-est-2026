'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const links = [
  { href: '/patient', label: 'Patient Help', color: 'text-green-700 bg-green-50' },
  { href: '/clinician', label: 'Clinician', color: 'text-blue-700 bg-blue-50' },
  { href: '/triage', label: 'Triage' },
  { href: '/products', label: 'Products' },
  { href: '/training', label: 'Protocols' },
]

export default function Navbar() {
  const pathname = usePathname()

  // Hide navbar on role-specific pages (they have their own headers)
  if (pathname === '/patient' || pathname === '/clinician') return null

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-sm font-extrabold text-white">E</span>
          <div className="leading-none">
            <p className="font-bold text-slate-900 text-sm">Easy CPAP</p>
            <p className="text-xs text-slate-400">CPAP Triage Platform</p>
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
                  ? (link.color ?? 'bg-slate-100 text-slate-900')
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
        >
          Get Help
        </Link>
      </div>
    </header>
  )
}
