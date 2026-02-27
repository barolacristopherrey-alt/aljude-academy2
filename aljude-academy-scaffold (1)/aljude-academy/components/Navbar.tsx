'use client'
import Link from 'next/link'
import { useState } from 'react'
import { categories } from '@/lib/data'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-brand-700">
            <span className="text-2xl">🎓</span>
            <span>Aljude Academy</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {categories.map(cat => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="text-sm font-medium text-gray-600 hover:text-brand-600 px-3 py-2 rounded-md hover:bg-brand-50 transition-colors"
              >
                {cat.shortLabel}
              </Link>
            ))}
            <Link href="/search" className="btn-ghost ml-1">🔍</Link>
            <Link href="/help" className="btn-ghost">Help</Link>
            <Link href="/start-here" className="btn-primary ml-2">Start Now →</Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-1">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-brand-50 hover:text-brand-600 rounded-md"
              onClick={() => setMobileOpen(false)}
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
          <hr className="my-2" />
          <Link href="/search" className="block px-3 py-2 text-sm font-medium text-gray-700" onClick={() => setMobileOpen(false)}>🔍 Search</Link>
          <Link href="/help" className="block px-3 py-2 text-sm font-medium text-gray-700" onClick={() => setMobileOpen(false)}>Help</Link>
          <Link href="/start-here" className="btn-primary block text-center mt-2" onClick={() => setMobileOpen(false)}>Start Now →</Link>
        </div>
      )}
    </nav>
  )
}
