'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import type { ChatMessage } from '@/types'
import { cn } from '@/lib/utils'

const STARTERS = [
  { icon: '📊', text: 'Patient AHI >8 on APAP 5–15 with P90 pressure 13.4 cmH₂O — next steps?' },
  { icon: '🫁', text: 'When is BiPAP indicated over APAP for OSA patients?' },
  { icon: '⚠️', text: 'Treatment-emergent central apneas — workup and management pathway' },
  { icon: '📋', text: 'Walk me through the 30-day Medicare compliance review process' },
  { icon: '🔄', text: 'Hospital discharge to home PAP — what must be in place before discharge?' },
  { icon: '🛒', text: 'Compare ResMed AirSense 11, F&P SleepStyle, and BMC Luna G3 for a new patient' },
  { icon: '📉', text: 'Patient compliance <4h/night on 60% of nights — intervention strategy' },
  { icon: '🚨', text: 'ASV indications and SERVE-HF contraindication — clinical summary' },
]

function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="rounded bg-slate-100 px-1 font-mono text-xs text-slate-700">$1</code>')
    .replace(/^### (.+)$/gm, '<p class="font-bold text-sm mt-4 mb-1 text-slate-900 border-l-2 border-blue-400 pl-2">$1</p>')
    .replace(/^## (.+)$/gm, '<p class="font-bold text-base mt-5 mb-2 text-slate-900">$1</p>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-slate-700">$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal text-slate-700">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, m => `<ul class="my-2 space-y-1">${m}</ul>`)
    .replace(/🟢 \*\*([^*]+)\*\*/g, '<span class="inline-flex items-center gap-1 rounded bg-green-50 border border-green-200 px-2 py-0.5 text-xs font-semibold text-green-700 font-mono">✓ $1</span>')
    .replace(/🟡 \*\*([^*]+)\*\*/g, '<span class="inline-flex items-center gap-1 rounded bg-amber-50 border border-amber-200 px-2 py-0.5 text-xs font-semibold text-amber-700">⚠ $1</span>')
    .replace(/🔴 \*\*([^*]+)\*\*/g, '<span class="inline-flex items-center gap-1 rounded bg-red-50 border border-red-200 px-2 py-0.5 text-xs font-semibold text-red-700">🚨 $1</span>')
    .replace(/\n\n/g, '</p><p class="mt-2">')
    .replace(/\n/g, '<br/>')
}

export default function ClinicianChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showContext, setShowContext] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async (text: string) => {
    if (!text.trim() || loading) return
    setInput('')

    const userMsg: ChatMessage = { role: 'user', content: text, timestamp: Date.now() }
    const nextMessages = [...messages, userMsg]
    setMessages(nextMessages)
    setLoading(true)

    const assistantMsg: ChatMessage = { role: 'assistant', content: '', timestamp: Date.now() }
    setMessages(m => [...m, assistantMsg])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages, mode: 'clinician', tenant: 'easycpap' }),
      })
      if (!res.ok || !res.body) throw new Error()

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })
        setMessages(m => {
          const copy = [...m]
          copy[copy.length - 1] = { ...copy[copy.length - 1], content: accumulated }
          return copy
        })
      }
    } catch {
      setMessages(m => {
        const copy = [...m]
        copy[copy.length - 1] = { ...copy[copy.length - 1], content: 'Connection error. Please try again or contact Clinic A clinical support.' }
        return copy
      })
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-blue-100 bg-gradient-to-r from-slate-900 to-blue-950 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow">E</div>
          <div>
            <p className="font-bold text-white text-sm leading-none">Clinic A</p>
            <p className="text-xs text-blue-300 mt-0.5">Clinical Decision Support</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowContext(c => !c)}
            className={cn(
              'rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors',
              showContext ? 'border-blue-400 bg-blue-900 text-blue-200' : 'border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-300'
            )}
          >
            {showContext ? 'Hide' : 'Show'} protocols
          </button>
          <Link href="/" className="rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-medium text-slate-400 hover:border-slate-500 hover:text-slate-300">
            ← Switch role
          </Link>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Protocols sidebar */}
        {showContext && (
          <div className="hidden w-64 flex-shrink-0 overflow-y-auto border-r border-slate-100 bg-slate-50 p-4 lg:block">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">Quick Reference</p>
            <div className="space-y-2">
              {[
                { label: 'AASM OSA Severity', value: 'AHI: mild 5–14, mod 15–29, severe ≥30' },
                { label: 'Therapy AHI Target', value: '<5 events/hr; excellent <2' },
                { label: 'Leak Target (ResMed)', value: '<24 L/min (95th %ile)' },
                { label: 'Medicare Compliance', value: '≥4h/night, ≥70% of nights (30-day window)' },
                { label: 'APAP Starting Range', value: 'Min 5, Max 15 cmH₂O typical' },
                { label: 'EPR Full Pressure', value: 'EPR 3 reduces EPAP by 3 cmH₂O' },
                { label: 'ASV Contraindication', value: 'CHF + EF ≤45% (SERVE-HF)' },
                { label: 'Cushion Replace', value: 'Every 1–3 months' },
                { label: 'Headgear Replace', value: 'Every 6 months' },
                { label: 'Machine Lifespan', value: '5–7 years typical' },
              ].map(item => (
                <div key={item.label} className="rounded-lg bg-white border border-slate-200 p-2.5">
                  <p className="text-xs font-semibold text-slate-700">{item.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>

            <p className="mt-4 mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Red Flags</p>
            <div className="space-y-1.5">
              {[
                'AHI >10 with good seal → pressure adjustment',
                'Central AHI >25% total → consider ASV eval',
                'Persistent fatigue 3+ months good compliance → comorbidity workup',
                'New cardiac/respiratory symptoms → urgent medical review',
              ].map((flag, i) => (
                <div key={i} className="flex gap-1.5 rounded-lg bg-red-50 border border-red-100 p-2">
                  <span className="flex-shrink-0 text-red-500 text-xs mt-0.5">⚠️</span>
                  <p className="text-xs text-red-700">{flag}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chat */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {messages.length === 0 ? (
              <div className="mx-auto max-w-2xl">
                <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
                  <p className="text-sm font-bold text-blue-900">Clinical Mode Active</p>
                  <p className="mt-1 text-xs text-blue-700">
                    Full clinical terminology, data-driven guidance, titration protocols, Medicare requirements, and prescribing-level detail. All Clinic A product specifications included.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {STARTERS.map(s => (
                    <button
                      key={s.text}
                      onClick={() => send(s.text)}
                      className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-left text-xs text-slate-700 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800"
                    >
                      <span className="text-base flex-shrink-0">{s.icon}</span>
                      <span>{s.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mx-auto max-w-2xl space-y-5">
                {messages.map((msg, i) => (
                  <div key={i} className={cn('flex gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                    {msg.role === 'assistant' && (
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600 text-xs font-bold text-white shadow">E</div>
                    )}
                    <div className={cn(
                      'max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                      msg.role === 'user'
                        ? 'bg-slate-800 text-white rounded-br-sm font-mono text-xs'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm shadow-sm'
                    )}>
                      {msg.role === 'assistant' ? (
                        <>
                          <div dangerouslySetInnerHTML={{ __html: `<p>${renderMarkdown(msg.content)}</p>` }} />
                          {loading && i === messages.length - 1 && msg.content === '' && (
                            <span className="inline-flex gap-1 pt-1">
                              {[0, 1, 2].map(n => (
                                <span key={n} className="h-2 w-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: `${n * 0.1}s` }} />
                              ))}
                            </span>
                          )}
                        </>
                      ) : msg.content}
                    </div>
                    {msg.role === 'user' && (
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-slate-700 text-xs text-slate-300 shadow-sm">MD</div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-slate-200 bg-white px-4 py-3">
            <div className="mx-auto max-w-2xl">
              <div className="flex gap-2 rounded-2xl border border-slate-300 bg-slate-50 p-2 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) } }}
                  placeholder="Clinical question, patient data, protocol query..."
                  rows={1}
                  className="flex-1 resize-none bg-transparent font-mono text-sm text-slate-800 placeholder-slate-400 outline-none"
                  style={{ maxHeight: '120px' }}
                  onInput={e => { const el = e.target as HTMLTextAreaElement; el.style.height = 'auto'; el.style.height = `${el.scrollHeight}px` }}
                />
                <button
                  onClick={() => send(input)}
                  disabled={!input.trim() || loading}
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition-colors hover:bg-blue-700 disabled:opacity-40"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" strokeLinejoin="round" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <p className="mt-1.5 text-xs text-slate-400">
                Clinical support tool — verify all clinical decisions against current guidelines and patient-specific factors. Clinic A clinical team: 1300 064 779
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
