import { cpapKnowledge } from '@/data/cpap-knowledge'
import { naduProducts, naduTenantConfig } from '@/data/nadu-products'
import type { KnowledgeChunk, UserMode } from '@/types'

const STOP_WORDS = new Set(['the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'but', 'in', 'with', 'my', 'i', 'it', 'to', 'do', 'can', 'how', 'what', 'why'])

function tokenise(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2 && !STOP_WORDS.has(t))
}

function scoreChunk(chunk: KnowledgeChunk, queryTokens: string[]): number {
  const chunkText = `${chunk.topic} ${chunk.content} ${chunk.tags.join(' ')}`.toLowerCase()
  let score = 0
  for (const token of queryTokens) {
    if (chunkText.includes(token)) {
      if (chunk.topic.toLowerCase().includes(token)) score += 3
      else if (chunk.tags.some(t => t.includes(token))) score += 2
      else score += 1
    }
  }
  return score
}

export function retrieveKnowledge(query: string, mode: UserMode, topK = 5): string {
  const tokens = tokenise(query)
  if (tokens.length === 0) return ''

  const scored = cpapKnowledge
    .filter(chunk => mode === 'clinician' || !chunk.clinicianOnly)
    .map(chunk => ({ chunk, score: scoreChunk(chunk, tokens) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)

  if (scored.length === 0) return ''

  return scored
    .map(({ chunk }) => `### ${chunk.topic}\n${chunk.content}`)
    .join('\n\n')
}

export function retrieveProductContext(query: string): string {
  const tokens = tokenise(query)
  const productKeywords = ['mask', 'machine', 'device', 'tube', 'airsense', 'airfit', 'airmini', 'airviva', 'f20', 'n20', 'p10', 'n30', 'dreamstation', 'sleepstyle', 'product', 'recommend', 'buy', 'purchase', 'brand', 'model']

  const isProductQuery = tokens.some(t => productKeywords.includes(t))
  if (!isProductQuery) return ''

  const scored = naduProducts
    .map(p => {
      const text = `${p.name} ${p.description} ${p.features.join(' ')} ${p.indications.join(' ')} ${p.category}`.toLowerCase()
      let score = 0
      for (const token of tokens) {
        if (text.includes(token)) score++
      }
      return { p, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  if (scored.length === 0) return ''

  const lines = scored.map(({ p }) =>
    `**${p.name}** (${p.category}): ${p.description}\nKey features: ${p.features.slice(0, 3).join(', ')}`
  )

  return `### Nadu Products Relevant to This Query\n${lines.join('\n\n')}`
}

export function buildContextBlock(query: string, mode: UserMode): string {
  const knowledge = retrieveKnowledge(query, mode)
  const products = retrieveProductContext(query)
  const parts = [knowledge, products].filter(Boolean)
  return parts.join('\n\n---\n\n')
}

export function getTenantContext(): string {
  const cfg = naduTenantConfig
  return `
You are the AI assistant for **${cfg.name}** — ${cfg.tagline}.
${cfg.customContext}

Contact: ${cfg.phone ?? ''} | ${cfg.clinicianEmail ?? ''} | ${cfg.website ?? ''}
  `.trim()
}
