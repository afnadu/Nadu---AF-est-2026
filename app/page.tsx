'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function Home() {
  const router = useRouter()
  const [hovering, setHovering] = useState<'patient' | 'clinician' | null>(null)

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Split screen */}
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">

        {/* PATIENT side */}
        <button
          onClick={() => router.push('/patient')}
          onMouseEnter={() => setHovering('patient')}
          onMouseLeave={() => setHovering(null)}
          className={cn(
            'relative flex flex-1 flex-col items-center justify-center overflow-hidden px-8 py-16 text-left transition-all duration-500 focus:outline-none',
            hovering === 'clinician' ? 'flex-[0.35] md:flex-[0.35]' : hovering === 'patient' ? 'flex-[0.65] md:flex-[0.65]' : 'flex-1'
          )}
          style={{ background: 'linear-gradient(160deg, #FAF8F5 0%, #ECFDF5 60%, #D1FAE5 100%)' }}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#1B4332]/5 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#C9B99A]/20 blur-3xl" />
          </div>

          <div className="relative z-10 max-w-sm text-center">
            <div className={cn(
              'mb-6 inline-flex items-center justify-center rounded-3xl bg-white shadow-md transition-all duration-300 border border-[#E8E2D9]',
              hovering === 'patient' ? 'h-28 w-28 text-6xl' : 'h-20 w-20 text-4xl'
            )}>
              🛏️
            </div>

            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#1B4332]/10 px-3 py-1 text-xs font-semibold text-[#1B4332]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1B4332]" />
              Patient Support
            </div>

            <h2 className={cn(
              'mt-3 font-serif tracking-tight text-[#1A1A1A] transition-all duration-300',
              hovering === 'patient' ? 'text-4xl' : 'text-2xl md:text-3xl'
            )}>
              I&apos;m a Patient
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-[#6B6560]">
              Get plain-language help with your CPAP therapy — setup, comfort, troubleshooting, and finding the right equipment.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {['My mask leaks', "Can't sleep with it", 'Dry mouth', 'Need new mask', 'How to clean it'].map(q => (
                <span key={q} className="rounded-full border border-[#E8E2D9] bg-white/80 px-3 py-1 text-xs text-[#6B6560]">
                  {q}
                </span>
              ))}
            </div>

            <div className={cn(
              'mt-8 inline-flex items-center gap-2 rounded-full bg-[#1B4332] px-8 py-4 font-semibold text-white shadow-md transition-all duration-300',
              hovering === 'patient' ? 'scale-105 bg-[#15362A]' : ''
            )}>
              Get Help
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center md:flex-col">
          <div className="hidden h-full w-px bg-[#E8E2D9] md:block" />
          <div className="block h-px w-full bg-[#E8E2D9] md:hidden" />
          <div className="absolute flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E2D9] bg-[#FAF8F5] text-xs font-semibold text-[#6B6560] shadow-sm">
            OR
          </div>
        </div>

        {/* CLINICIAN side */}
        <button
          onClick={() => router.push('/clinician')}
          onMouseEnter={() => setHovering('clinician')}
          onMouseLeave={() => setHovering(null)}
          className={cn(
            'relative flex flex-1 flex-col items-center justify-center overflow-hidden px-8 py-16 text-left transition-all duration-500 focus:outline-none',
            hovering === 'patient' ? 'flex-[0.35] md:flex-[0.35]' : hovering === 'clinician' ? 'flex-[0.65] md:flex-[0.65]' : 'flex-1'
          )}
          style={{ background: 'linear-gradient(160deg, #FAF8F5 0%, #F0F4F0 60%, #E2EDE4 100%)' }}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#1B4332]/5 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#C9B99A]/20 blur-3xl" />
          </div>

          <div className="relative z-10 max-w-sm text-center">
            <div className={cn(
              'mb-6 inline-flex items-center justify-center rounded-3xl bg-white shadow-md transition-all duration-300 border border-[#E8E2D9]',
              hovering === 'clinician' ? 'h-28 w-28 text-6xl' : 'h-20 w-20 text-4xl'
            )}>
              🩺
            </div>

            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#1B4332]/10 px-3 py-1 text-xs font-semibold text-[#1B4332]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1B4332]" />
              Clinical Support
            </div>

            <h2 className={cn(
              'mt-3 font-serif tracking-tight text-[#1A1A1A] transition-all duration-300',
              hovering === 'clinician' ? 'text-4xl' : 'text-2xl md:text-3xl'
            )}>
              I&apos;m a Clinician
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-[#6B6560]">
              Clinical decision support, data interpretation, titration guidance, protocols, Medicare compliance, and product selection.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {['Interpret AHI data', 'Titration protocols', 'Treatment-emergent CA', 'NDIS quoting', 'BiPAP criteria'].map(q => (
                <span key={q} className="rounded-full border border-[#E8E2D9] bg-white/80 px-3 py-1 text-xs text-[#6B6560]">
                  {q}
                </span>
              ))}
            </div>

            <div className={cn(
              'mt-8 inline-flex items-center gap-2 rounded-full bg-[#1B4332] px-8 py-4 font-semibold text-white shadow-md transition-all duration-300',
              hovering === 'clinician' ? 'scale-105 bg-[#15362A]' : ''
            )}>
              Open Clinical Mode
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </button>
      </div>

      {/* Footer brand bar */}
      <div className="flex items-center justify-between border-t border-[#E8E2D9] bg-[#FAF8F5] px-6 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1B4332] text-xs font-bold text-white">A</span>
          <span className="font-serif font-semibold text-[#1A1A1A]">Clinic A</span>
          <span className="hidden text-xs text-[#6B6560] sm:block">— CPAP Triage Platform</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-[#6B6560]">
          <span>1300 xxx xxx</span>
          <span className="hidden sm:block">NDIS Registered</span>
        </div>
      </div>
    </div>
  )
}
