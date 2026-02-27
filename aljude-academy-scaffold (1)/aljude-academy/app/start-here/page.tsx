import Link from 'next/link'
import { categories } from '@/lib/data'

const COMMON_PROBLEMS = [
  { label: 'We don\'t have a clear strategy', slug: 'strategy-governance' },
  { label: 'Our fundraising is inconsistent', slug: 'fundraising' },
  { label: 'We struggle with budgeting', slug: 'financial-management' },
  { label: 'Team communication is poor', slug: 'people-volunteers' },
  { label: 'We can\'t measure our impact', slug: 'impact-programs-services' },
  { label: 'Our leadership needs development', slug: 'leadership' },
  { label: 'Operations are chaotic', slug: 'systems-operations' },
  { label: 'We need a better online presence', slug: 'marketing-communications' },
]

export default function StartHerePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Where do you want to start?</h1>
        <p className="text-gray-500 text-lg">Choose the path that fits you best.</p>
      </div>

      <div className="grid sm:grid-cols-1 gap-6">
        {/* Path 1 */}
        <div className="card border-2 border-brand-200">
          <h2 className="text-xl font-bold text-brand-700 mb-2">🔍 I know my problem</h2>
          <p className="text-gray-500 text-sm mb-5">Pick a common challenge and we'll suggest the right capabilities.</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {COMMON_PROBLEMS.map(p => (
              <Link
                key={p.slug}
                href={`/categories/${p.slug}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-brand-50 hover:text-brand-700 text-sm transition-colors"
              >
                <span className="text-brand-500">→</span> {p.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Path 2 */}
        <div className="card border-2 border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-2">📚 I know the category</h2>
          <p className="text-gray-500 text-sm mb-5">Browse directly by category and pick a capability.</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {categories.map(cat => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50 hover:bg-brand-50 text-sm transition-colors"
              >
                <span>{cat.icon}</span> <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Path 3 */}
        <div className="card border-2 border-gray-200 text-center py-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2">🧭 Take the full assessment</h2>
          <p className="text-gray-500 text-sm mb-5 max-w-md mx-auto">
            Not sure where to start? Go through a 10-minute diagnostic and we'll prioritise the top 3 capabilities for your organisation.
          </p>
          <Link href="/categories/strategy-governance/1" className="btn-primary">Start full assessment →</Link>
        </div>
      </div>
    </div>
  )
}
