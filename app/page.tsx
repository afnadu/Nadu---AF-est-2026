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
          style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 40%, #bbf7d0 100%)' }}
        >
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-green-200/40 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />
          </div>

          <div className="relative z-10 max-w-sm text-center">
            <div className={cn(
              'mb-6 inline-flex items-center justify-center rounded-3xl bg-white shadow-xl transition-all duration-300',
              hovering === 'patient' ? 'h-28 w-28 text-6xl' : 'h-20 w-20 text-4xl'
            )}>
              🛏️
            </div>

            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Patient Support
            </div>

            <h2 className={cn(
              'mt-3 font-extrabold tracking-tight text-slate-900 transition-all duration-300',
              hovering === 'patient' ? 'text-4xl' : 'text-2xl md:text-3xl'
            )}>
              I&apos;m a Patient
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Get plain-language help with your CPAP therapy — setup, comfort, troubleshooting, and finding the right equipment.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {['My mask leaks', 'Can\'t sleep with it', 'Dry mouth', 'Need new mask', 'How to clean it'].map(q => (
                <span key={q} className="rounded-full border border-green-200 bg-white/80 px-3 py-1 text-xs text-slate-600">
                  {q}
                </span>
              ))}
            </div>

            <div className={cn(
              'mt-8 inline-flex items-center gap-2 rounded-2xl bg-green-600 px-8 py-4 font-bold text-white shadow-lg shadow-green-600/30 transition-all duration-300',
              hovering === 'patient' ? 'scale-105 bg-green-500' : ''
            )}>
              Get Help
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center md:flex-col">
          <div className="hidden h-full w-px bg-slate-200 md:block" />
          <div className="block h-px w-full bg-slate-200 md:hidden" />
          <div className="absolute flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-200 bg-white text-xs font-bold text-slate-500 shadow-sm">
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
          style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 40%, #bfdbfe 100%)' }}
        >
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl" />
          </div>

          <div className="relative z-10 max-w-sm text-center">
            <div className={cn(
              'mb-6 inline-flex items-center justify-center rounded-3xl bg-white shadow-xl transition-all duration-300',
              hovering === 'clinician' ? 'h-28 w-28 text-6xl' : 'h-20 w-20 text-4xl'
            )}>
              🩺
            </div>

            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              Clinical Support
            </div>

            <h2 className={cn(
              'mt-3 font-extrabold tracking-tight text-slate-900 transition-all duration-300',
              hovering === 'clinician' ? 'text-4xl' : 'text-2xl md:text-3xl'
            )}>
              I&apos;m a Clinician
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Clinical decision support, data interpretation, titration guidance, protocols, Medicare compliance, and product selection.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {['Interpret AHI data', 'Titration protocols', 'Treatment-emergent CA', 'NDIS quoting', 'BiPAP criteria'].map(q => (
                <span key={q} className="rounded-full border border-blue-200 bg-white/80 px-3 py-1 text-xs text-slate-600">
                  {q}
                </span>
              ))}
            </div>

            <div className={cn(
              'mt-8 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-600/30 transition-all duration-300',
              hovering === 'clinician' ? 'scale-105 bg-blue-500' : ''
            )}>
              Open Clinical Mode
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </button>
      </div>

      {/* Footer brand bar */}
      <div className="flex items-center justify-between border-t border-slate-200 bg-white px-6 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-600 text-xs font-extrabold text-white">E</span>
          <span className="font-bold text-slate-900">Clinic A</span>
          <span className="hidden text-xs text-slate-400 sm:block">— Australia&apos;s Most Trusted CPAP Store</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <a href="https://easycpap.com.au" target="_blank" rel="noreferrer" className="hover:text-green-600">easycpap.com.au</a>
          <span>1300 064 779</span>
          <span className="hidden sm:block">NDIS Registered</span>
        </div>
      </div>
    </div>
  )
}
