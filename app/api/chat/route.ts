import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'
import { buildSystemPrompt } from '@/lib/system-prompts'
import { buildContextBlock } from '@/lib/knowledge-retriever'
import type { UserMode, ChatMessage } from '@/types'

export const runtime = 'nodejs'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  const {
    messages,
    mode = 'patient',
    tenant = 'easycpap',
  }: { messages: ChatMessage[]; mode: UserMode; tenant?: string } = await req.json()

  if (!messages?.length) {
    return new Response('No messages provided', { status: 400 })
  }

  const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')?.content ?? ''
  const injectedContext = buildContextBlock(lastUserMessage, mode, tenant)
  const systemPrompt = buildSystemPrompt(mode, tenant, injectedContext)

  const stream = client.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    system: systemPrompt,
    messages: messages.map(m => ({ role: m.role, content: m.content })),
  })

  const readableStream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
            controller.enqueue(new TextEncoder().encode(chunk.delta.text))
          }
        }
      } finally {
        controller.close()
      }
    },
  })

  return new Response(readableStream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'X-Accel-Buffering': 'no',
    },
  })
}
