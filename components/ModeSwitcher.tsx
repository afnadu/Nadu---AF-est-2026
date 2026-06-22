'use client'

import { cn } from '@/lib/utils'
import type { UserMode } from '@/types'

const modes: { value: UserMode; label: string; icon: string; description: string; color: string }[] = [
  {
    value: 'patient',
    label: 'Patient',
    icon: '🛏️',
    description: 'Home user — plain language support',
    color: 'text-blue-700 bg-blue-50 border-blue-200',
  },
  {
    value: 'clinician',
    label: 'Clinician',
    icon: '🩺',
    description: 'Full clinical detail + data guidance',
    color: 'text-teal-700 bg-teal-50 border-teal-200',
  },
  {
    value: 'training',
    label: 'Training',
    icon: '📚',
    description: 'Educational explanations + quizzes',
    color: 'text-purple-700 bg-purple-50 border-purple-200',
  },
  {
    value: 'admin',
    label: 'Admin',
    icon: '⚙️',
    description: 'Operations, content & strategy',
    color: 'text-orange-700 bg-orange-50 border-orange-200',
  },
]

interface Props {
  value: UserMode
  onChange: (mode: UserMode) => void
  compact?: boolean
}

export default function ModeSwitcher({ value, onChange, compact = false }: Props) {
  if (compact) {
    return (
      <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-1 gap-1">
        {modes.map(m => (
          <button
            key={m.value}
            onClick={() => onChange(m.value)}
            className={cn(
              'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all',
              value === m.value
                ? 'bg-white shadow text-slate-900'
                : 'text-slate-500 hover:text-slate-700'
            )}
          >
            <span>{m.icon}</span>
            {m.label}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {modes.map(m => (
        <button
          key={m.value}
          onClick={() => onChange(m.value)}
          className={cn(
            'flex flex-col items-start gap-1 rounded-xl border-2 p-4 text-left transition-all hover:shadow-md',
            value === m.value ? m.color + ' border-current shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'
          )}
        >
          <span className="text-2xl">{m.icon}</span>
          <span className="font-semibold text-sm">{m.label}</span>
          <span className="text-xs text-slate-500">{m.description}</span>
        </button>
      ))}
    </div>
  )
}
