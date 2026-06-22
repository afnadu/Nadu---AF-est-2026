'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import type { ChatMessage } from '@/types'
import { cn } from '@/lib/utils'

const STARTERS = [
  { icon: '💨', text: 'My mask keeps leaking air at night' },
  { icon: '😴', text: "I can't fall asleep with my mask on" },
  { icon: '🌵', text: "I wake up with a really dry mouth" },
  { icon: '🫃', text: "I feel bloated after using my CPAP" },
  { icon: '🛒', text: "What CPAP machine should I buy?" },
  { icon: '😷', text: "Which mask is best for side sleepers?" },
  { icon: '🧹', text: "How often should I clean my equipment?" },
  { icon: '✈️', text: "Can I travel with my CPAP machine?" },
]

const URGENCY_RE = /🔴\s?\*\*Urgent\*\*/gi

function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^### (.+)$/gm, '<p class="font-bold text-base mt-4 mb-1 text-slate-900">$1</p>')
    .replace(/^## (.+)$/gm, '<p class="font-bold text-lg mt-4 mb-2 text-slate-900">$1</p>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-slate-700">$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal text-slate-700">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, m => `<ul class="my-2 space-y-1">${m}</ul>`)
    .replace(/🟢 \*\*([^*]+)\*\*/g, '<span class="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-sm font-semibold text-green-800">✅ $1</span>')
    .replace(/🟡 \*\*([^*]+)\*\*/g, '<span class="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-sm font-semibold text-amber-800">📅 $1</span>')
    .replace(/🔴 \*\*([^*]+)\*\*/g, '<span class="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-sm font-semibold text-red-800">🚨 $1</span>')
    .replace(/\n\n/g, '</p><p class="mt-2">')
    .replace(/\n/g, '<br/>')
}

export default function PatientChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
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
        body: JSON.stringify({ messages: nextMessages, mode: 'patient', tenant: 'easycpap' }),
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
        copy[copy.length - 1] = { ...copy[copy.length - 1], content: 'Sorry, something went wrong. Please try again or call Clinic A on 1300 064 779.' }
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
      <div className="flex items-center justify-between border-b border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600 text-lg font-bold text-white shadow">E</div>
          <div>
            <p className="font-bold text-slate-900 text-sm leading-none">Clinic A Support</p>
            <p className="text-xs text-green-600 mt-0.5">Patient Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="tel:1300064779" className="hidden items-center gap-1.5 rounded-lg border border-green-200 bg-white px-3 py-1.5 text-xs font-semibold text-green-700 hover:bg-green-50 sm:flex">
            📞 1300 064 779
          </a>
          <Link href="/" className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-50">
            ← Switch role
          </Link>
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {messages.length === 0 ? (
          <div className="mx-auto max-w-lg">
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-green-100 text-4xl shadow-sm">
                🛏️
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">Hi! How can I help?</h2>
              <p className="mt-2 text-sm text-slate-500">
                Ask me anything about your CPAP therapy — comfort, equipment, or getting started.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {STARTERS.map(s => (
                <button
                  key={s.text}
                  onClick={() => send(s.text)}
                  className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-left text-xs text-slate-700 transition-all hover:border-green-300 hover:bg-green-50"
                >
                  <span className="text-base flex-shrink-0">{s.icon}</span>
                  <span>{s.text}</span>
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-700">
              <strong>Urgent concerns?</strong> If you have trouble breathing, chest pain, or new medical symptoms — call 000 or see your doctor. This assistant is for CPAP therapy support only.
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-lg space-y-5">
            {messages.map((msg, i) => (
              <div key={i} className={cn('flex gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                {msg.role === 'assistant' && (
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-green-600 text-xs font-bold text-white shadow">E</div>
                )}
                <div className={cn(
                  'max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                  msg.role === 'user'
                    ? 'bg-green-600 text-white rounded-br-sm'
                    : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-bl-sm shadow-sm'
                )}>
                  {msg.role === 'assistant' ? (
                    <>
                      <div dangerouslySetInnerHTML={{ __html: `<p>${renderMarkdown(msg.content)}</p>` }} />
                      {loading && i === messages.length - 1 && msg.content === '' && (
                        <span className="inline-flex gap-1 pt-1">
                          {[0, 1, 2].map(n => (
                            <span key={n} className="h-2 w-2 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: `${n * 0.1}s` }} />
                          ))}
                        </span>
                      )}
                    </>
                  ) : msg.content}
                </div>
                {msg.role === 'user' && (
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-slate-200 text-xs text-slate-600 shadow-sm">U</div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-slate-200 bg-white px-4 py-3">
        <div className="mx-auto max-w-lg">
          <div className="flex gap-2 rounded-2xl border border-slate-300 bg-slate-50 p-2 focus-within:border-green-400 focus-within:ring-2 focus-within:ring-green-100">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) } }}
              placeholder="Ask about your CPAP therapy..."
              rows={1}
              className="flex-1 resize-none bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none"
              style={{ maxHeight: '100px' }}
              onInput={e => { const el = e.target as HTMLTextAreaElement; el.style.height = 'auto'; el.style.height = `${el.scrollHeight}px` }}
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || loading}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-green-600 text-white transition-colors hover:bg-green-700 disabled:opacity-40"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" strokeLinejoin="round" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
            <span>30-day mask guarantee • Free express shipping • NDIS registered</span>
            <a href="https://easycpap.com.au" target="_blank" rel="noreferrer" className="hover:text-green-600">Shop →</a>
          </div>
        </div>
      </div>
    </div>
  )
}
