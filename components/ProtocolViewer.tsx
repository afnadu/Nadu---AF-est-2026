'use client'

import { useState } from 'react'
import { protocols } from '@/data/protocols'
import type { Protocol, ProtocolStep } from '@/types'
import { cn } from '@/lib/utils'

const categoryColors: Record<Protocol['category'], string> = {
  onboarding: 'bg-blue-100 text-blue-700',
  followup: 'bg-teal-100 text-teal-700',
  titration: 'bg-purple-100 text-purple-700',
  troubleshooting: 'bg-orange-100 text-orange-700',
  compliance: 'bg-yellow-100 text-yellow-700',
  'hospital-to-home': 'bg-red-100 text-red-700',
  training: 'bg-slate-100 text-slate-700',
}

const categoryLabels: Record<Protocol['category'], string> = {
  onboarding: 'Onboarding',
  followup: 'Follow-up',
  titration: 'Titration',
  troubleshooting: 'Troubleshooting',
  compliance: 'Compliance',
  'hospital-to-home': 'Hospital → Home',
  training: 'Training',
}

function StepCard({ step, isActive, onToggle }: { step: ProtocolStep; isActive: boolean; onToggle: () => void }) {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set())

  const toggleItem = (i: number) => {
    setCheckedItems(s => {
      const next = new Set(s)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  const allChecked = step.checklist ? checkedItems.size === step.checklist.length : false

  return (
    <div className={cn(
      'rounded-xl border-2 transition-all',
      isActive ? 'border-teal-400 shadow-sm' : 'border-slate-200'
    )}>
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-4 p-4 text-left"
      >
        <div className={cn(
          'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold',
          allChecked ? 'bg-teal-500 text-white' : isActive ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-600'
        )}>
          {allChecked ? '✓' : step.step}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-slate-900">{step.title}</p>
          <p className="text-xs text-slate-500 mt-0.5 truncate">{step.description}</p>
        </div>
        {step.checklist && (
          <span className="text-xs text-slate-400 flex-shrink-0">
            {checkedItems.size}/{step.checklist.length}
          </span>
        )}
        <svg
          className={cn('h-4 w-4 text-slate-400 transition-transform flex-shrink-0', isActive && 'rotate-90')}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {isActive && (
        <div className="border-t border-slate-100 px-4 pb-4 pt-3">
          {step.checklist && (
            <div className="space-y-2">
              {step.checklist.map((item, i) => (
                <label key={i} className="flex items-start gap-2.5 cursor-pointer group">
                  <div className={cn(
                    'mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border-2 transition-colors',
                    checkedItems.has(i) ? 'border-teal-500 bg-teal-500' : 'border-slate-300 group-hover:border-teal-400'
                  )}
                    onClick={() => toggleItem(i)}
                  >
                    {checkedItems.has(i) && (
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span
                    className={cn('text-sm', checkedItems.has(i) ? 'line-through text-slate-400' : 'text-slate-700')}
                    onClick={() => toggleItem(i)}
                  >
                    {item}
                  </span>
                </label>
              ))}
            </div>
          )}

          {step.notes && (
            <div className="mt-3 rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-800">
              <strong>Note:</strong> {step.notes}
            </div>
          )}

          {step.escalateIf && step.escalateIf.length > 0 && (
            <div className="mt-3 rounded-lg bg-red-50 px-3 py-2">
              <p className="text-xs font-semibold text-red-700 mb-1.5">Escalate if:</p>
              <ul className="space-y-1">
                {step.escalateIf.map((flag, i) => (
                  <li key={i} className="flex gap-1.5 text-xs text-red-700">
                    <span className="flex-shrink-0">⚠️</span>
                    {flag}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function ProtocolViewer() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [activeStep, setActiveStep] = useState<number | null>(0)
  const [filterCategory, setFilterCategory] = useState<Protocol['category'] | 'all'>('all')

  const filtered = protocols.filter(p => filterCategory === 'all' || p.category === filterCategory)
  const selected = protocols.find(p => p.id === selectedId)

  const categories = Array.from(new Set(protocols.map(p => p.category)))

  if (selected) {
    return (
      <div className="flex h-full flex-col">
        <div className="border-b border-slate-200 bg-white px-6 py-4">
          <button
            onClick={() => { setSelectedId(null); setActiveStep(0) }}
            className="mb-2 flex items-center gap-1.5 text-sm text-teal-600 hover:text-teal-700"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Protocols
          </button>
          <h1 className="text-lg font-bold text-slate-900">{selected.title}</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-medium', categoryColors[selected.category])}>
              {categoryLabels[selected.category]}
            </span>
            {selected.timeframe && (
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">
                {selected.timeframe}
              </span>
            )}
            {selected.requiredRole && selected.requiredRole !== 'both' && (
              <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-700 capitalize">
                {selected.requiredRole} only
              </span>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-2xl space-y-3">
            {selected.steps.map((step, i) => (
              <StepCard
                key={step.step}
                step={step}
                isActive={activeStep === i}
                onToggle={() => setActiveStep(activeStep === i ? null : i)}
              />
            ))}

            {selected.references && (
              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">References</p>
                <ul className="space-y-1">
                  {selected.references.map((ref, i) => (
                    <li key={i} className="text-xs text-slate-600">• {ref}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-slate-200 bg-white px-6 py-4">
        <h1 className="text-lg font-bold text-slate-900">Clinical Protocols</h1>
        <p className="text-sm text-slate-500">Interactive checklists for every stage of CPAP care</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={() => setFilterCategory('all')}
            className={cn(
              'rounded-full px-3 py-1 text-xs font-medium transition-colors',
              filterCategory === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            )}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={cn(
                'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                filterCategory === cat ? categoryColors[cat] : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-2xl grid grid-cols-1 gap-3 sm:grid-cols-2">
          {filtered.map(protocol => (
            <button
              key={protocol.id}
              onClick={() => setSelectedId(protocol.id)}
              className="rounded-xl border-2 border-slate-200 bg-white p-5 text-left transition-all hover:border-teal-400 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', categoryColors[protocol.category])}>
                    {categoryLabels[protocol.category]}
                  </span>
                  <h3 className="mt-2 font-semibold text-sm text-slate-900">{protocol.title}</h3>
                  {protocol.timeframe && (
                    <p className="mt-1 text-xs text-slate-500">{protocol.timeframe}</p>
                  )}
                </div>
                <div className="flex-shrink-0 rounded-full bg-slate-50 px-2 py-0.5 text-xs text-slate-500">
                  {protocol.steps.length} steps
                </div>
              </div>
              <div className="mt-3 flex gap-1">
                {protocol.steps.slice(0, 5).map((_, i) => (
                  <div key={i} className="h-1.5 flex-1 rounded-full bg-slate-100" />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
