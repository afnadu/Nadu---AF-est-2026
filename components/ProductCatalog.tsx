'use client'

import { useState } from 'react'
import { naduProducts } from '@/data/nadu-products'
import { easyCpapProducts } from '@/data/easycpap-products'
import type { Product } from '@/types'
import { cn } from '@/lib/utils'

const allProducts: Product[] = [...naduProducts, ...easyCpapProducts]

const categoryLabels: Partial<Record<Product['category'], string>> = {
  cpap: 'CPAP',
  apap: 'APAP',
  bipap: 'BiPAP',
  asv: 'ASV',
  'mask-fullface': 'Full Face Mask',
  'mask-nasal': 'Nasal Mask',
  'mask-pillow': 'Nasal Pillow',
  'mask-hybrid': 'Hybrid Mask',
  accessory: 'Accessory',
  humidifier: 'Humidifier',
  tubing: 'Tubing',
  cleaning: 'Cleaning',
}

const groupOrder: Product['category'][] = ['cpap', 'apap', 'bipap', 'asv', 'mask-fullface', 'mask-nasal', 'mask-pillow', 'mask-hybrid', 'tubing', 'cleaning', 'accessory']

const groupColors: Partial<Record<Product['category'], string>> = {
  cpap: 'bg-blue-50 text-blue-700 border-blue-200',
  apap: 'bg-teal-50 text-teal-700 border-teal-200',
  bipap: 'bg-purple-50 text-purple-700 border-purple-200',
  'mask-fullface': 'bg-orange-50 text-orange-700 border-orange-200',
  'mask-nasal': 'bg-green-50 text-green-700 border-green-200',
  'mask-pillow': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  tubing: 'bg-slate-50 text-slate-700 border-slate-200',
  cleaning: 'bg-pink-50 text-pink-700 border-pink-200',
}

function ProductCard({ product, onSelect }: { product: Product; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="rounded-xl border-2 border-slate-200 bg-white p-5 text-left transition-all hover:border-teal-400 hover:shadow-md w-full"
    >
      <div className="flex items-start justify-between gap-2">
        <span className={cn(
          'rounded-full border px-2.5 py-0.5 text-xs font-medium',
          groupColors[product.category] ?? 'bg-slate-50 text-slate-700 border-slate-200'
        )}>
          {categoryLabels[product.category] ?? product.category}
        </span>
        {product.sku && <span className="text-xs text-slate-400">{product.sku}</span>}
      </div>
      <h3 className="mt-3 font-bold text-sm text-slate-900">{product.name}</h3>
      <p className="mt-1.5 text-xs text-slate-500 line-clamp-2">{product.description}</p>
      <div className="mt-3 flex flex-wrap gap-1">
        {product.features.slice(0, 3).map((f, i) => (
          <span key={i} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{f}</span>
        ))}
        {product.features.length > 3 && (
          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-400">+{product.features.length - 3} more</span>
        )}
      </div>
    </button>
  )
}

function ProductDetail({ product, onBack }: { product: Product; onBack: () => void }) {
  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white px-6 py-4">
        <button
          onClick={onBack}
          className="mb-2 flex items-center gap-1.5 text-sm text-teal-600 hover:text-teal-700"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to catalog
        </button>
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className={cn(
              'rounded-full border px-2.5 py-0.5 text-xs font-medium',
              groupColors[product.category] ?? 'bg-slate-50 text-slate-700 border-slate-200'
            )}>
              {categoryLabels[product.category]}
            </span>
            <h1 className="mt-2 text-xl font-bold text-slate-900">{product.name}</h1>
            {product.sku && <p className="text-xs text-slate-400 mt-0.5">SKU: {product.sku}</p>}
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6 max-w-2xl mx-auto w-full">
        <div>
          <p className="text-slate-700">{product.description}</p>
        </div>

        <div className="rounded-xl bg-slate-50 p-5">
          <h3 className="text-sm font-bold text-slate-900 mb-3">Key Features</h3>
          <ul className="space-y-2">
            {product.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <svg className="h-4 w-4 mt-0.5 flex-shrink-0 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-green-200 bg-green-50 p-4">
            <h3 className="text-sm font-bold text-green-800 mb-2">Indications</h3>
            <ul className="space-y-1">
              {product.indications.map((item, i) => (
                <li key={i} className="text-xs text-green-700 flex items-start gap-1.5">
                  <span className="flex-shrink-0 mt-0.5">✓</span>{item}
                </li>
              ))}
            </ul>
          </div>

          {product.contraindications && product.contraindications.length > 0 && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <h3 className="text-sm font-bold text-red-800 mb-2">Contraindications</h3>
              <ul className="space-y-1">
                {product.contraindications.map((item, i) => (
                  <li key={i} className="text-xs text-red-700 flex items-start gap-1.5">
                    <span className="flex-shrink-0 mt-0.5">✕</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {product.settings && Object.keys(product.settings).length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3">Settings</h3>
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              {Object.entries(product.settings).map(([key, value], i) => (
                <div key={i} className={cn('flex gap-3 px-4 py-3 text-sm', i % 2 === 0 ? 'bg-white' : 'bg-slate-50')}>
                  <span className="font-medium text-slate-700 w-32 flex-shrink-0">{key}</span>
                  <span className="text-slate-600">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {product.compatibility && product.compatibility.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">Compatible With</h3>
            <div className="flex flex-wrap gap-2">
              {product.compatibility.map((item, i) => (
                <span key={i} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {product.troubleshootingTips && product.troubleshootingTips.length > 0 && (
          <div className="rounded-xl border-l-4 border-amber-400 bg-amber-50 p-5">
            <h3 className="text-sm font-bold text-amber-800 mb-3">Troubleshooting Tips</h3>
            <ul className="space-y-2">
              {product.troubleshootingTips.map((tip, i) => (
                <li key={i} className="text-sm text-amber-700 flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">💡</span>{tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ProductCatalog() {
  const [selected, setSelected] = useState<Product | null>(null)
  const [filter, setFilter] = useState<'all' | 'machine' | 'mask' | 'accessory'>('all')
  const [search, setSearch] = useState('')

  if (selected) {
    return <ProductDetail product={selected} onBack={() => setSelected(null)} />
  }

  const filterFn = (p: Product) => {
    if (filter === 'machine') return ['cpap', 'apap', 'bipap', 'asv'].includes(p.category)
    if (filter === 'mask') return p.category.startsWith('mask')
    if (filter === 'accessory') return ['accessory', 'humidifier', 'tubing', 'cleaning'].includes(p.category)
    return true
  }

  const searchFn = (p: Product) => {
    if (!search.trim()) return true
    const s = search.toLowerCase()
    return (
      p.name.toLowerCase().includes(s) ||
      p.description.toLowerCase().includes(s) ||
      p.category.includes(s)
    )
  }

  const filtered = allProducts.filter(p => filterFn(p) && searchFn(p))
  const grouped = groupOrder.reduce<Record<string, Product[]>>((acc, cat) => {
    const items = filtered.filter(p => p.category === cat)
    if (items.length) acc[cat] = items
    return acc
  }, {})

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-[#E8E2D9] bg-[#FAF8F5] px-6 py-4">
        <h1 className="font-serif text-lg font-semibold text-[#1A1A1A]">Clinic A Product Catalogue</h1>
        <p className="text-sm text-[#6B6560]">Full specifications, indications, and troubleshooting tips</p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 rounded-xl border border-[#E8E2D9] bg-white px-3 py-2 text-sm outline-none focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/10"
          />
          <div className="flex rounded-full border border-[#E8E2D9] bg-white p-1 gap-1">
            {(['all', 'machine', 'mask', 'accessory'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors',
                  filter === f ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {Object.entries(grouped).map(([cat, products]) => (
          <div key={cat}>
            <h2 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <span>{categoryLabels[cat as Product['category']] ?? cat}</span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-500 normal-case tracking-normal">
                {products.length}
              </span>
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {products.map(p => (
                <ProductCard key={p.id} product={p} onSelect={() => setSelected(p)} />
              ))}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="rounded-xl border-2 border-dashed border-slate-200 p-12 text-center">
            <p className="text-3xl mb-2">🔍</p>
            <p className="text-sm font-semibold text-slate-700">No products found</p>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  )
}
