import Link from 'next/link'
import { categories } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1 – Academy */}
          <div>
            <h3 className="text-white font-semibold mb-4">Academy</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">About the Academy</Link></li>
              <li><Link href="/help#guide" className="hover:text-white transition-colors">How to use</Link></li>
              <li><Link href="/categories/strategy-governance" className="hover:text-white transition-colors">Capabilities</Link></li>
              <li><Link href="/start-here" className="hover:text-white transition-colors">Full Assessment</Link></li>
            </ul>
          </div>

          {/* Column 2 – Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              {categories.map(cat => (
                <li key={cat.slug}>
                  <Link href={`/categories/${cat.slug}`} className="hover:text-white transition-colors">
                    {cat.shortLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 – Help */}
          <div>
            <h3 className="text-white font-semibold mb-4">Help</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help#faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/help#guide" className="hover:text-white transition-colors">Quick Guide</Link></li>
              <li><Link href="/help#contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 4 – Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>© {new Date().getFullYear()} Aljude Academy. Free for all.</p>
          <div className="flex gap-4">
            <Link href="/start-here" className="hover:text-white transition-colors font-medium">Start Now</Link>
            <Link href="/help" className="hover:text-white transition-colors font-medium">Help</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
