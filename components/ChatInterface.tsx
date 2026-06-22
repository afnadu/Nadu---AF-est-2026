'use client'

import { useState, useRef, useEffect } from 'react'
import type { ChatMessage, UserMode } from '@/types'
import ModeSwitcher from './ModeSwitcher'
import { cn } from '@/lib/utils'

const STARTERS: Record<UserMode, string[]> = {
  patient: [
    'My mask is leaking air at night',
    "I'm waking up with a very dry mouth",
    "My stomach feels bloated after using CPAP",
    "I can't fall asleep with the mask on",
    "How do I clean my CPAP equipment?",
    "I'm still feeling tired even with CPAP",
  ],
  clinician: [
    'Patient has residual AHI >8 on APAP 5–15, 95th percentile pressure is 13.2',
    'How to titrate BiPAP for OHS patient newly off CPAP?',
    'Treatment-emergent central apneas — workup and management',
    'Medicare compliance documentation requirements',
    'When to refer for ASV — and contraindications',
    'Interpreting AirView data: flow limitation vs OA vs CA',
  ],
  training: [
    'Explain the difference between CPAP, APAP, and BiPAP',
    'Walk me through a first patient onboarding session',
    'Quiz me on mask types and their indications',
    'What are the red flags in CPAP therapy data?',
    'Explain EPR and Flex — when and why to use them',
    'How do I fit a nasal pillow mask correctly?',
  ],
  admin: [
    'What products should a new CPAP clinic stock?',
    'Help me design a 30-day patient follow-up protocol',
    'What are the key metrics for measuring clinic performance?',
    'Help me write a patient education leaflet on mask leaks',
    'What are the compliance reporting requirements for Medicare?',
    'How can we improve our new patient adherence rates?',
  ],
}

function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^### (.+)$/gm, '<h3 class="text-base font-bold mt-3 mb-1">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-lg font-bold mt-4 mb-2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-xl font-bold mt-4 mb-2">$1</h1>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, m => `<ul class="my-2 space-y-1">${m}</ul>`)
    .replace(/🟢 (.+)/g, '<span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-sm font-medium text-green-700">🟢 $1</span>')
    .replace(/🟡 (.+)/g, '<span class="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-0.5 text-sm font-medium text-yellow-700">🟡 $1</span>')
    .replace(/🔴 (.+)/g, '<span class="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-sm font-medium text-red-700">🔴 $1</span>')
    .replace(/\n\n/g, '</p><p class="mt-2">')
    .replace(/\n/g, '<br/>')
}

export default function ChatInterface() {
  const [mode, setMode] = useState<UserMode>('patient')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleModeChange = (newMode: UserMode) => {
    setMode(newMode)
    setMessages([])
  }

  const send = async (text: string) => {
    if (!text.trim() || loading) return
    setInput('')

    const userMessage: ChatMessage = { role: 'user', content: text, timestamp: Date.now() }
    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setLoading(true)

    const assistantMessage: ChatMessage = { role: 'assistant', content: '', timestamp: Date.now() }
    setMessages(m => [...m, assistantMessage])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages, mode }),
      })

      if (!res.ok || !res.body) throw new Error('Stream failed')

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
        copy[copy.length - 1] = {
          ...copy[copy.length - 1],
          content: 'Sorry, something went wrong. Please try again.',
        }
        return copy
      })
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* Mode bar */}
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
        <ModeSwitcher value={mode} onChange={handleModeChange} compact />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {messages.length === 0 ? (
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 text-center">
              <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-600 text-3xl">
                {mode === 'patient' ? '🛏️' : mode === 'clinician' ? '🩺' : mode === 'training' ? '📚' : '⚙️'}
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                {mode === 'patient' && 'CPAP Support Assistant'}
                {mode === 'clinician' && 'Clinical Decision Support'}
                {mode === 'training' && 'Staff Training Assistant'}
                {mode === 'admin' && 'Practice Management Assistant'}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {mode === 'patient' && 'Ask me anything about your CPAP therapy'}
                {mode === 'clinician' && 'Clinical-grade CPAP guidance and data interpretation'}
                {mode === 'training' && 'Learn CPAP therapy — ask me to explain, quiz you, or walk through cases'}
                {mode === 'admin' && 'Protocols, products, staff training, and clinic operations'}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {STARTERS[mode].map(s => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-xl border border-slate-200 bg-white p-3 text-left text-sm text-slate-700 transition-all hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-2xl space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={cn('flex gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                {msg.role === 'assistant' && (
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-teal-600 text-sm text-white font-bold">
                    N
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                    msg.role === 'user'
                      ? 'bg-teal-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-800 shadow-sm'
                  )}
                >
                  {msg.role === 'assistant' ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: `<p>${renderMarkdown(msg.content)}</p>` }}
                      className="prose-sm"
                    />
                  ) : (
                    msg.content
                  )}
                  {msg.role === 'assistant' && loading && i === messages.length - 1 && msg.content === '' && (
                    <span className="inline-flex gap-1">
                      <span className="animate-bounce text-teal-400">●</span>
                      <span className="animate-bounce text-teal-400" style={{ animationDelay: '0.1s' }}>●</span>
                      <span className="animate-bounce text-teal-400" style={{ animationDelay: '0.2s' }}>●</span>
                    </span>
                  )}
                </div>
                {msg.role === 'user' && (
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm text-slate-600">
                    U
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-slate-200 bg-white px-4 py-4">
        <div className="mx-auto max-w-2xl">
          <div className="flex gap-2 rounded-2xl border border-slate-300 bg-white p-2 shadow-sm focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask about ${mode === 'patient' ? 'your CPAP therapy...' : mode === 'clinician' ? 'clinical guidance...' : mode === 'training' ? 'anything to learn...' : 'clinic operations...'}`}
              rows={1}
              className="flex-1 resize-none bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none"
              style={{ minHeight: '36px', maxHeight: '120px' }}
              onInput={e => {
                const el = e.target as HTMLTextAreaElement
                el.style.height = 'auto'
                el.style.height = `${el.scrollHeight}px`
              }}
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || loading}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white transition-colors hover:bg-teal-700 disabled:opacity-40"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" strokeLinejoin="round" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <p className="mt-2 text-center text-xs text-slate-400">
            For urgent medical concerns, contact your clinician or emergency services directly.
          </p>
        </div>
      </div>
    </div>
  )
}
