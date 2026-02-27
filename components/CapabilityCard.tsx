'use client'
import Link from 'next/link'
import { useState } from 'react'
import type { Capability } from '@/lib/data'

export default function CapabilityCard({ capability }: { capability: Capability }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg leading-tight">{capability.name}</h3>
          <p className="text-gray-500 text-sm mt-1">{capability.definition}</p>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="shrink-0 text-brand-500 text-sm font-medium hover:underline"
          aria-expanded={expanded}
        >
          {expanded ? 'Hide ▲' : 'Expand ▼'}
        </button>
      </div>

      <div className="flex gap-3 mt-4">
        <Link href={`/capabilities/${capability.slug}`} className="btn-primary">Open capability</Link>
        <Link href={`/capabilities/${capability.slug}/1`} className="btn-secondary">Start assessment</Link>
      </div>

      {/* Inline sub-capability accordion */}
      {expanded && (
        <div className="mt-4 border-t border-gray-100 pt-4 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Choose what to improve now</p>
          {capability.subCapabilities.map((sub, i) => (
            <Link
              key={sub.id}
              href={`/capabilities/${capability.slug}/${sub.slug}`}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-brand-50 hover:text-brand-700 transition-colors group"
            >
              <div>
                <span className="text-xs font-semibold text-gray-400 mr-2">{i + 1}.</span>
                <span className="text-sm font-medium">{sub.name}</span>
                <p className="text-xs text-gray-500 mt-0.5 ml-5">{sub.benefit}</p>
              </div>
              <span className="text-gray-400 group-hover:text-brand-500 text-lg">→</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
