'use client'

import { useState } from 'react'
import Link from 'next/link'
import { naduProducts } from '@/data/nadu-products'
import { protocols } from '@/data/protocols'
import { cpapKnowledge } from '@/data/cpap-knowledge'

const stats = [
  { label: 'Knowledge Articles', value: cpapKnowledge.length, icon: '📖', href: '/chat' },
  { label: 'Products in Catalog', value: naduProducts.length, icon: '🛒', href: '/products' },
  { label: 'Clinical Protocols', value: protocols.length, icon: '📋', href: '/training' },
  { label: 'Triage Pathways', value: 5, icon: '🔍', href: '/triage' },
]

const integrations = [
  { name: 'ResMed AirView', status: 'planned', description: 'Remote monitoring data integration' },
  { name: 'Philips DreamMapper', status: 'planned', description: 'Compliance and therapy data sync' },
  { name: 'Nox T3 Home Sleep Testing', status: 'planned', description: 'Diagnostic study results import' },
  { name: 'Custom Knowledge Upload', status: 'planned', description: 'PDF / document ingestion for RAG' },
  { name: 'Multi-clinic Tenancy', status: 'planned', description: 'Per-clinic branding and product overlays' },
]

const roadmap = [
  { phase: 'Phase 1 — Current', items: ['AI Chat (patient/clinician/training/admin modes)', 'Visual triage decision tree', 'Clinical protocol checklists', 'Product catalog with specs', 'RAG knowledge injection'] },
  { phase: 'Phase 2 — Next', items: ['PDF/document upload for knowledge base', 'Per-clinic admin portal', 'Patient portal with therapy history', 'Remote monitoring data integration (AirView, DreamMapper)', 'Compliance report generation'] },
  { phase: 'Phase 3 — Future', items: ['Multi-tenant SaaS platform', 'Custom AI fine-tuning on clinic-specific data', 'Real-time alert system for at-risk patients', 'Mobile app (iOS/Android)', 'EHR integration (PMS, Epic, Cliniko)'] },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'roadmap' | 'integrations'>('overview')

  return (
    <div className="h-full overflow-y-auto">
      <div className="border-b border-slate-200 bg-white px-6 py-5">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-lg">⚙️</span>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-sm text-slate-500">Platform overview, roadmap, and knowledge management</p>
          </div>
        </div>
        <div className="mt-4 flex gap-1 border-b border-slate-200 -mb-5 pb-0">
          {(['overview', 'roadmap', 'integrations'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition-colors ${
                activeTab === tab ? 'border-teal-500 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map(s => (
                <Link key={s.label} href={s.href} className="rounded-xl border-2 border-slate-200 bg-white p-5 text-center transition-all hover:border-teal-300 hover:shadow-sm">
                  <p className="text-3xl">{s.icon}</p>
                  <p className="mt-2 text-2xl font-extrabold text-slate-900">{s.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
                </Link>
              ))}
            </div>

            <div className="rounded-xl border border-teal-200 bg-teal-50 p-6">
              <h2 className="font-bold text-teal-900">Platform Knowledge Base</h2>
              <p className="mt-1 text-sm text-teal-700">
                The AI assistant draws on a structured knowledge base of {cpapKnowledge.length} clinical articles covering machines, masks, settings, troubleshooting, and protocols. Knowledge is retrieved contextually on each query — no vector database required.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { label: 'Machine types', count: cpapKnowledge.filter(k => k.category === 'machine').length },
                  { label: 'Mask knowledge', count: cpapKnowledge.filter(k => k.category === 'mask').length },
                  { label: 'Troubleshooting', count: cpapKnowledge.filter(k => k.category === 'troubleshooting').length },
                  { label: 'Settings', count: cpapKnowledge.filter(k => k.category === 'settings').length },
                  { label: 'Protocols', count: cpapKnowledge.filter(k => k.category === 'protocol').length },
                  { label: 'Education', count: cpapKnowledge.filter(k => k.category === 'education').length },
                ].map(item => (
                  <div key={item.label} className="rounded-lg bg-white px-3 py-2 text-center">
                    <p className="text-xl font-bold text-teal-700">{item.count}</p>
                    <p className="text-xs text-slate-500">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="font-bold text-slate-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { icon: '🤖', label: 'Test AI as Clinician', href: '/chat', desc: 'Open chat in clinician mode' },
                  { icon: '🔍', label: 'Test Triage Flow', href: '/triage', desc: 'Walk through a triage pathway' },
                  { icon: '📋', label: 'Review Protocols', href: '/training', desc: 'Audit clinical protocols' },
                  { icon: '🛒', label: 'Review Product Catalog', href: '/products', desc: 'Check product data accuracy' },
                ].map(action => (
                  <Link key={action.label} href={action.href}
                    className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 transition-all hover:border-teal-300 hover:bg-slate-50">
                    <span className="text-2xl">{action.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{action.label}</p>
                      <p className="text-xs text-slate-500">{action.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm font-semibold text-amber-800">Configuration</p>
              <p className="mt-1 text-sm text-amber-700">
                Tenant configuration (clinic name, branding, contact details, custom context) is in <code className="rounded bg-amber-100 px-1 font-mono text-xs">data/nadu-products.ts</code> — <code className="rounded bg-amber-100 px-1 font-mono text-xs">naduTenantConfig</code>.
                CPAP knowledge is in <code className="rounded bg-amber-100 px-1 font-mono text-xs">data/cpap-knowledge.ts</code>. Add new knowledge chunks to expand the AI&apos;s expertise.
              </p>
              <p className="mt-2 text-sm text-amber-700">
                Set <code className="rounded bg-amber-100 px-1 font-mono text-xs">ANTHROPIC_API_KEY</code> in your <code className="rounded bg-amber-100 px-1 font-mono text-xs">.env.local</code> file to enable the AI assistant.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="space-y-4">
            {roadmap.map((phase, i) => (
              <div key={i} className={`rounded-xl border-2 p-6 ${i === 0 ? 'border-teal-300 bg-teal-50' : 'border-slate-200 bg-white'}`}>
                <h3 className={`font-bold text-sm ${i === 0 ? 'text-teal-800' : 'text-slate-700'}`}>{phase.phase}</h3>
                <ul className="mt-3 space-y-2">
                  {phase.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <span className={`h-2 w-2 rounded-full flex-shrink-0 ${i === 0 ? 'bg-teal-500' : 'bg-slate-300'}`} />
                      <span className={i === 0 ? 'text-teal-800' : 'text-slate-600'}>{item}</span>
                      {i === 0 && <span className="rounded-full bg-teal-200 px-2 py-0.5 text-xs text-teal-800 font-medium ml-auto">Live</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'integrations' && (
          <div className="space-y-3">
            <p className="text-sm text-slate-500 mb-4">Planned integrations to extend the platform with real device data and multi-tenant management.</p>
            {integrations.map(item => (
              <div key={item.name} className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-lg">🔗</span>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm text-slate-900">{item.name}</p>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500 capitalize">{item.status}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
