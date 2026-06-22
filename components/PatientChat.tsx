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

function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^### (.+)$/gm, '<p class="font-semibold text-base mt-4 mb-1 text-[#1A1A1A]">$1</p>')
    .replace(/^## (.+)$/gm, '<p class="font-semibold text-lg mt-4 mb-2 text-[#1A1A1A]">$1</p>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-[#1A1A1A]">$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal text-[#1A1A1A]">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, m => `<ul class="my-2 space-y-1">${m}</ul>`)
    .replace(/🟢 \*\*([^*]+)\*\*/g, '<span class="inline-flex items-center gap-1 rounded-full bg-[#ECFDF5] px-2.5 py-1 text-sm font-semibold text-[#065F46]">✅ $1</span>')
    .replace(/🟡 \*\*([^*]+)\*\*/g, '<span class="inline-flex items-center gap-1 rounded-full bg-[#FFFBEB] px-2.5 py-1 text-sm font-semibold text-[#92400E]">📅 $1</span>')
    .replace(/🔴 \*\*([^*]+)\*\*/g, '<span class="inline-flex items-center gap-1 rounded-full bg-[#FEF2F2] px-2.5 py-1 text-sm font-semibold text-[#991B1B]">🚨 $1</span>')
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
        copy[copy.length - 1] = { ...copy[copy.length - 1], content: 'Sorry, something went wrong. Please try again or call Clinic A on 1300 xxx xxx.' }
        return copy
      })
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  return (
    <div className="flex h-full flex-col bg-[#FAF8F5]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E8E2D9] bg-[#1B4332] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-lg font-bold text-white">A</div>
          <div>
            <p className="font-serif font-semibold text-white text-sm leading-none tracking-tight">Clinic A</p>
            <p className="text-xs text-white/60 mt-0.5">Patient Support</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="tel:1300xxxxxx" className="hidden items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20 sm:flex">
            📞 1300 xxx xxx
          </a>
          <Link href="/" className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20">
            ← Back
          </Link>
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {messages.length === 0 ? (
          <div className="mx-auto max-w-lg">
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-white border border-[#E8E2D9] text-4xl shadow-sm">
                🛏️
              </div>
              <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A]">Hi, how can I help?</h2>
              <p className="mt-2 text-sm text-[#6B6560]">
                Ask me anything about your CPAP therapy — comfort, equipment, or getting started.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {STARTERS.map(s => (
                <button
                  key={s.text}
                  onClick={() => send(s.text)}
                  className="flex items-start gap-2 rounded-2xl border border-[#E8E2D9] bg-white p-3 text-left text-xs text-[#1A1A1A] transition-all hover:border-[#1B4332] hover:shadow-sm"
                >
                  <span className="text-base flex-shrink-0">{s.icon}</span>
                  <span>{s.text}</span>
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] p-3 text-xs text-[#92400E]">
              <strong>Urgent concerns?</strong> If you have trouble breathing, chest pain, or new medical symptoms — call 000 or see your doctor.
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-lg space-y-5">
            {messages.map((msg, i) => (
              <div key={i} className={cn('flex gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                {msg.role === 'assistant' && (
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#1B4332] text-xs font-bold text-white shadow-sm">A</div>
                )}
                <div className={cn(
                  'max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                  msg.role === 'user'
                    ? 'bg-[#1B4332] text-white rounded-br-sm'
                    : 'bg-white border border-[#E8E2D9] text-[#1A1A1A] rounded-bl-sm shadow-sm'
                )}>
                  {msg.role === 'assistant' ? (
                    <>
                      <div dangerouslySetInnerHTML={{ __html: `<p>${renderMarkdown(msg.content)}</p>` }} />
                      {loading && i === messages.length - 1 && msg.content === '' && (
                        <span className="inline-flex gap-1 pt-1">
                          {[0, 1, 2].map(n => (
                            <span key={n} className="h-2 w-2 rounded-full bg-[#1B4332]/40 animate-bounce" style={{ animationDelay: `${n * 0.1}s` }} />
                          ))}
                        </span>
                      )}
                    </>
                  ) : msg.content}
                </div>
                {msg.role === 'user' && (
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#E8E2D9] text-xs text-[#6B6560] shadow-sm">U</div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-[#E8E2D9] bg-white px-4 py-3">
        <div className="mx-auto max-w-lg">
          <div className="flex gap-2 rounded-2xl border border-[#E8E2D9] bg-[#FAF8F5] p-2 focus-within:border-[#1B4332] focus-within:ring-2 focus-within:ring-[#1B4332]/10">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) } }}
              placeholder="Ask about your CPAP therapy..."
              rows={1}
              className="flex-1 resize-none bg-transparent text-sm text-[#1A1A1A] placeholder-[#6B6560] outline-none"
              style={{ maxHeight: '100px' }}
              onInput={e => { const el = e.target as HTMLTextAreaElement; el.style.height = 'auto'; el.style.height = `${el.scrollHeight}px` }}
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || loading}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#1B4332] text-white transition-colors hover:bg-[#15362A] disabled:opacity-40"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" strokeLinejoin="round" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <p className="mt-2 text-center text-xs text-[#6B6560]">NDIS registered • Free express shipping • 30-day mask guarantee</p>
        </div>
      </div>
    </div>
  )
}
