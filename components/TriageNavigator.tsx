'use client'

import { useState } from 'react'
import { triageTrees } from '@/data/triage-trees'
import type { TriageNode, Intervention, UrgencyLevel } from '@/types'
import { cn } from '@/lib/utils'

const urgencyConfig: Record<UrgencyLevel, { label: string; color: string; dot: string }> = {
  'self-care': {
    label: 'Self-care — try tonight',
    color: 'bg-green-50 border-green-200 text-green-800',
    dot: 'bg-green-500',
  },
  'contact-clinic': {
    label: 'Contact your clinic within 1 week',
    color: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    dot: 'bg-yellow-500',
  },
  'urgent-medical': {
    label: 'Seek urgent medical attention',
    color: 'bg-red-50 border-red-200 text-red-800',
    dot: 'bg-red-500',
  },
}

function InterventionCard({ intervention }: { intervention: Intervention }) {
  const [expanded, setExpanded] = useState(true)
  const cfg = urgencyConfig[intervention.urgency]

  return (
    <div className={cn('rounded-xl border-2 p-4', cfg.color)}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          <span className={cn('mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full', cfg.dot)} />
          <div>
            <p className="font-semibold text-sm">{intervention.title}</p>
            <p className="text-xs opacity-75 mt-0.5">{cfg.label}</p>
          </div>
        </div>
        <button
          onClick={() => setExpanded(e => !e)}
          className="mt-0.5 text-xs font-medium opacity-60 hover:opacity-100"
        >
          {expanded ? 'Hide' : 'Show steps'}
        </button>
      </div>

      {expanded && (
        <ol className="mt-3 space-y-1.5 ml-4">
          {intervention.steps.map((step, i) => (
            <li key={i} className="flex gap-2 text-sm">
              <span className="flex-shrink-0 font-bold opacity-60">{i + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      )}

      {expanded && intervention.notes && (
        <p className="mt-3 ml-4 text-xs italic opacity-75 border-t border-current/20 pt-2">{intervention.notes}</p>
      )}

      {expanded && intervention.naduProducts && intervention.naduProducts.length > 0 && (
        <div className="mt-3 ml-4 flex flex-wrap gap-1.5">
          {intervention.naduProducts.map(p => (
            <span key={p} className="rounded-full bg-teal-100 px-2 py-0.5 text-xs font-medium text-teal-800">
              Nadu: {p}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function NodeCard({ node, onSelect, depth = 0 }: { node: TriageNode; onSelect: (n: TriageNode) => void; depth?: number }) {
  return (
    <button
      onClick={() => onSelect(node)}
      className={cn(
        'flex w-full items-start gap-3 rounded-xl border-2 border-slate-200 bg-white p-4 text-left transition-all hover:border-teal-400 hover:bg-teal-50 hover:shadow-sm',
        depth > 0 && 'pl-6'
      )}
    >
      {node.icon && <span className="mt-0.5 text-xl flex-shrink-0">{node.icon}</span>}
      <div>
        <p className="font-semibold text-sm text-slate-900">{node.label}</p>
        {node.description && <p className="mt-0.5 text-xs text-slate-500">{node.description}</p>}
      </div>
      <svg className="ml-auto mt-1 h-4 w-4 flex-shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  )
}

export default function TriageNavigator() {
  const [path, setPath] = useState<TriageNode[]>([])

  const current: TriageNode[] = path.length === 0 ? triageTrees : (path[path.length - 1].children ?? [])
  const activeNode = path[path.length - 1]

  const navigateTo = (node: TriageNode) => {
    setPath(p => [...p, node])
  }

  const navigateToDepth = (depth: number) => {
    setPath(p => p.slice(0, depth))
  }

  const hasChildren = current.length > 0
  const hasInterventions = activeNode?.interventions && activeNode.interventions.length > 0

  return (
    <div className="flex h-full flex-col">
      {/* Header + breadcrumb */}
      <div className="border-b border-slate-200 bg-white px-6 py-4">
        <h1 className="text-lg font-bold text-slate-900">Visual Triage Tool</h1>
        <p className="text-sm text-slate-500 mt-0.5">Navigate to your problem to get targeted step-by-step guidance</p>

        {path.length > 0 && (
          <nav className="mt-3 flex flex-wrap items-center gap-1 text-sm">
            <button
              onClick={() => setPath([])}
              className="text-teal-600 hover:underline font-medium"
            >
              Start
            </button>
            {path.map((node, i) => (
              <span key={node.id} className="flex items-center gap-1">
                <span className="text-slate-400">/</span>
                <button
                  onClick={() => navigateToDepth(i + 1)}
                  className={cn(
                    'hover:underline',
                    i === path.length - 1 ? 'text-slate-900 font-semibold' : 'text-teal-600'
                  )}
                >
                  {node.label}
                </button>
              </span>
            ))}
          </nav>
        )}
      </div>

      {/* Visual path indicator */}
      {path.length > 0 && (
        <div className="border-b border-slate-100 bg-slate-50 px-6 py-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            {path.map((node, i) => (
              <div key={node.id} className="flex items-center gap-2 flex-shrink-0">
                <div className={cn(
                  'flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
                  i === path.length - 1 ? 'bg-teal-600 text-white' : 'bg-white border border-slate-200 text-slate-600'
                )}>
                  {node.icon && <span>{node.icon}</span>}
                  {node.label}
                </div>
                {i < path.length - 1 && (
                  <svg className="h-3 w-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-2xl">
          {/* Active node description */}
          {activeNode && (
            <div className="mb-6 rounded-xl bg-slate-900 px-5 py-4 text-white">
              <div className="flex items-center gap-2">
                {activeNode.icon && <span className="text-2xl">{activeNode.icon}</span>}
                <h2 className="text-lg font-bold">{activeNode.label}</h2>
              </div>
              <p className="mt-1 text-sm text-slate-300">{activeNode.description}</p>
            </div>
          )}

          {/* Interventions */}
          {hasInterventions && (
            <div className="mb-8">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-500">
                <span>Recommended Interventions</span>
                <span className="rounded-full bg-teal-100 px-2 py-0.5 text-teal-700 normal-case tracking-normal">
                  {activeNode.interventions!.length} options
                </span>
              </h3>
              <div className="space-y-3">
                {activeNode.interventions!.map((iv, i) => (
                  <InterventionCard key={i} intervention={iv} />
                ))}
              </div>
            </div>
          )}

          {/* Child nodes */}
          {hasChildren && (
            <div>
              {(hasInterventions || activeNode) && (
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
                  Narrow It Down Further
                </h3>
              )}
              {!activeNode && (
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
                  What area is the problem in?
                </h3>
              )}
              <div className="space-y-2">
                {current.map(node => (
                  <NodeCard key={node.id} node={node} onSelect={navigateTo} />
                ))}
              </div>
            </div>
          )}

          {/* Leaf with no interventions */}
          {!hasChildren && !hasInterventions && activeNode && (
            <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5">
              <p className="text-sm font-semibold text-yellow-800">Contact your clinic</p>
              <p className="mt-1 text-sm text-yellow-700">
                This issue requires clinical assessment. Please call Nadu on 1800 SLEEP WELL or email clinical@nadu.co.
              </p>
            </div>
          )}

          {/* Empty start state */}
          {path.length === 0 && (
            <div className="mb-6 rounded-xl border-2 border-dashed border-slate-200 p-6 text-center">
              <p className="text-3xl mb-2">🔍</p>
              <p className="text-sm font-semibold text-slate-700">Select a category above to begin</p>
              <p className="text-xs text-slate-500 mt-1">Each category guides you through a visual diagnostic pathway</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer reset */}
      {path.length > 0 && (
        <div className="border-t border-slate-200 px-6 py-3">
          <button
            onClick={() => setPath([])}
            className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Start over
          </button>
        </div>
      )}
    </div>
  )
}
