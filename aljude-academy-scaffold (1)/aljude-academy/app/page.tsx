import Link from 'next/link'
import { categories } from '@/lib/data'

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <span className="badge bg-brand-800 text-brand-100 mb-4 text-xs">100% Free · No registration required</span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mt-2 mb-6">
            Build your organisation's<br className="hidden md:block" /> capabilities
          </h1>
          <p className="text-brand-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Practical tools, step-by-step workbooks, and 30-day plans — everything in one place for non-profit and civil society teams.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/start-here" className="px-8 py-4 bg-white text-brand-700 font-bold rounded-xl hover:bg-brand-50 transition-colors text-lg shadow-lg">
              Start Here →
            </Link>
            <Link href="/search" className="px-8 py-4 border-2 border-white/40 text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-lg">
              🔍 Search a capability
            </Link>
          </div>
        </div>
      </section>

      {/* Quick search bar */}
      <section className="bg-white border-b border-gray-200 py-5">
        <div className="max-w-2xl mx-auto px-4">
          <form action="/search" method="get" className="flex gap-2">
            <input
              name="q"
              type="search"
              placeholder="Search for a capability or problem — e.g. "budgeting", "volunteers""
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
            <button type="submit" className="btn-primary shrink-0">Search</button>
          </form>
        </div>
      </section>

      {/* Category cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Browse by category</h2>
        <p className="text-gray-500 mb-8">Pick the area you care about and explore its capabilities.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="card hover:border-brand-300 hover:bg-brand-50 group transition-all"
            >
              <div className="text-4xl mb-3">{cat.icon}</div>
              <h3 className="font-bold text-gray-900 text-lg group-hover:text-brand-700">{cat.name}</h3>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">{cat.description}</p>
              <p className="text-brand-500 text-sm font-semibold mt-4 group-hover:underline">
                {cat.capabilities.length} capabilities →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How Aljude Academy works</h2>
          <p className="text-gray-500 mb-10">From problem to action in two clicks.</p>
          <div className="grid sm:grid-cols-4 gap-6">
            {[
              { step: '1', icon: '🎯', title: 'Choose a category', desc: 'Pick the area you want to improve.' },
              { step: '2', icon: '🔍', title: 'Pick a capability', desc: 'Each category has 5 specific capabilities.' },
              { step: '3', icon: '📋', title: 'Select a sub-capability', desc: 'Go deep on exactly what you need.' },
              { step: '4', icon: '🚀', title: 'Assess, learn & apply', desc: 'Everything on one page — videos, workbook, templates, 30-day plan.' },
            ].map(item => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-brand-100 text-brand-600 text-xl flex items-center justify-center mx-auto mb-3">
                  {item.icon}
                </div>
                <p className="font-bold text-gray-900">{item.title}</p>
                <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA bottom */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to start?</h2>
        <p className="text-gray-500 mb-8">No registration. No cost. Just practical tools that work.</p>
        <Link href="/start-here" className="btn-primary text-lg px-8 py-4">Start Now →</Link>
      </section>
    </div>
  )
}
