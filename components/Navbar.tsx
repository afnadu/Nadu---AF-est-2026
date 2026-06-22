'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const links = [
  { href: '/patient', label: 'Patient Help' },
  { href: '/clinician', label: 'Clinician' },
  { href: '/triage', label: 'Triage' },
  { href: '/products', label: 'Products' },
  { href: '/training', label: 'Protocols' },
]

export default function Navbar() {
  const pathname = usePathname()

  if (pathname === '/patient' || pathname === '/clinician') return null

  return (
    <header className="sticky top-0 z-50 border-b border-[#E8E2D9] bg-[#FAF8F5]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1B4332] text-sm font-bold text-white">A</span>
          <div className="leading-none">
            <p className="font-serif font-semibold text-[#1A1A1A] text-sm tracking-tight">Clinic A</p>
            <p className="text-xs text-[#6B6560]">CPAP Triage Platform</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'bg-[#1B4332] text-white'
                  : 'text-[#6B6560] hover:bg-[#E8E2D9] hover:text-[#1A1A1A]'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="rounded-full bg-[#1B4332] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#15362A]"
        >
          Get Help
        </Link>
      </div>
    </header>
  )
}
