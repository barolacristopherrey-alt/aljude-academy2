'use client'
import { useState } from 'react'
import Link from 'next/link'
import { search, type SearchResult } from '@/lib/data'

const TYPE_LABELS: Record<SearchResult['type'], string> = {
  category: 'Category',
  capability: 'Capability',
  subCapability: 'Sub-capability',
}

const TYPE_COLORS: Record<SearchResult['type'], string> = {
  category: 'bg-purple-100 text-purple-700',
  capability: 'bg-brand-100 text-brand-700',
  subCapability: 'bg-green-100 text-green-700',
}

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const results = search(query)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Search</h1>
      <p className="text-gray-500 mb-8">Search by keyword — e.g. "funding", "report", "governance", "volunteers"</p>

      <div className="relative mb-8">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Type a keyword..."
          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 shadow-sm"
          autoFocus
        />
      </div>

      {query && (
        <div>
          <p className="text-sm text-gray-500 mb-4">
            {results.length === 0
              ? `No results for "${query}"`
              : `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`}
          </p>
          <div className="space-y-3">
            {results.map((r, i) => (
              <Link
                key={i}
                href={r.href}
                className="card flex items-start gap-4 hover:border-brand-300 hover:bg-brand-50 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={`badge text-xs ${TYPE_COLORS[r.type]}`}>{TYPE_LABELS[r.type]}</span>
                    <span className="text-xs text-gray-400">{r.category}{r.capability ? ` › ${r.capability}` : ''}</span>
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">{r.title}</p>
                  <p className="text-gray-500 text-xs mt-1 line-clamp-2">{r.description}</p>
                </div>
                <span className="text-brand-400 text-lg shrink-0">→</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {!query && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {['budgeting', 'volunteers', 'governance', 'fundraising', 'impact', 'reporting', 'strategy', 'mission'].map(kw => (
            <button
              key={kw}
              onClick={() => setQuery(kw)}
              className="text-sm px-4 py-2 border border-gray-200 rounded-full hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 transition-colors"
            >
              {kw}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
