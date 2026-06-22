import { cpapKnowledge } from '@/data/cpap-knowledge'
import { naduProducts, naduTenantConfig } from '@/data/nadu-products'
import { easyCpapProducts, easyCpapTenantConfig } from '@/data/easycpap-products'
import type { KnowledgeChunk, UserMode, TenantConfig, Product } from '@/types'

const STOP_WORDS = new Set([
  'the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'but',
  'in', 'with', 'my', 'i', 'it', 'to', 'do', 'can', 'how', 'what', 'why',
  'me', 'for', 'be', 'are', 'was', 'have', 'has', 'this', 'that', 'will'
])

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

function scoreProduct(product: Product, queryTokens: string[]): number {
  const text = `${product.name} ${product.description} ${product.features.join(' ')} ${product.indications.join(' ')} ${product.category}`.toLowerCase()
  let score = 0
  for (const token of queryTokens) {
    if (text.includes(token)) score++
    if (product.name.toLowerCase().includes(token)) score += 2
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

const PRODUCT_TRIGGER_TOKENS = [
  'mask', 'machine', 'device', 'tube', 'tubing', 'airsense', 'airfit', 'airmini',
  'aircurve', 'f20', 'n20', 'p10', 'n30', 'f30', 'dreamstation', 'sleepstyle',
  'luna', 'bmc', 'fisher', 'paykel', 'resmed', 'philips', 'medistrom', 'battery',
  'pilot', 'filter', 'humidifier', 'chamber', 'humidity', 'product', 'recommend',
  'buy', 'purchase', 'brand', 'model', 'cost', 'price', 'best', 'choose', 'cushion',
  'headgear', 'cleaning', 'wipes', 'evora', 'brevida', 'pilairo', 'vitera', 'eson',
  'travel', 'pillow', 'nasal', 'full', 'face',
]

export function retrieveProductContext(query: string, tenant: string, topK = 3): string {
  const tokens = tokenise(query)
  const isProductQuery = tokens.some(t => PRODUCT_TRIGGER_TOKENS.includes(t))
  if (!isProductQuery) return ''

  const products = tenant === 'easycpap' ? easyCpapProducts : naduProducts

  const scored = products
    .map(p => ({ p, score: scoreProduct(p, tokens) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)

  if (scored.length === 0) return ''

  const storeName = tenant === 'easycpap' ? 'Clinic A' : 'Nadu'
  const lines = scored.map(({ p }) => {
    const parts = [
      `**${p.name}** (${p.category}) — ${p.description}`,
      `Features: ${p.features.slice(0, 4).join('; ')}`,
    ]
    if (p.indications?.length) parts.push(`Indicated for: ${p.indications.slice(0, 3).join(', ')}`)
    if (p.troubleshootingTips?.length) parts.push(`Tip: ${p.troubleshootingTips[0]}`)
    return parts.join('\n')
  })

  return `### ${storeName} Products Relevant to This Query\n${lines.join('\n\n')}`
}

export function buildContextBlock(query: string, mode: UserMode, tenant = 'easycpap'): string {
  const knowledge = retrieveKnowledge(query, mode)
  const products = retrieveProductContext(query, tenant)
  return [knowledge, products].filter(Boolean).join('\n\n---\n\n')
}

export function getTenantConfig(tenant: string): TenantConfig {
  return tenant === 'easycpap' ? easyCpapTenantConfig : naduTenantConfig
}

export function getTenantContext(tenant: string): string {
  const cfg = getTenantConfig(tenant)
  return `
You are the AI assistant for **${cfg.name}** — ${cfg.tagline}.
${cfg.customContext}
Contact: ${cfg.phone ?? ''} | ${cfg.clinicianEmail ?? ''} | ${cfg.website ?? ''}
  `.trim()
}
