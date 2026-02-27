import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCapabilityBySlug, categories } from '@/lib/data'
import Breadcrumb from '@/components/Breadcrumb'

interface Props { params: { capSlug: string } }

export function generateStaticParams() {
  return categories.flatMap(c => c.capabilities.map(cap => ({ capSlug: cap.slug })))
}

export default function CapabilityPage({ params }: Props) {
  const found = getCapabilityBySlug(params.capSlug)
  if (!found) notFound()
  const { category, capability } = found

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb crumbs={[
        { label: 'Home', href: '/' },
        { label: category.name, href: `/categories/${category.slug}` },
        { label: capability.name },
      ]} />

      {/* Header */}
      <div className="mb-10">
        <span className="badge bg-brand-100 text-brand-700 mb-3">{category.icon} {category.name}</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-3">{capability.name}</h1>
        <p className="text-gray-500 text-lg">{capability.definition}</p>
        <div className="mt-4 bg-brand-50 border-l-4 border-brand-500 rounded-r-lg px-5 py-3">
          <p className="text-brand-700 font-semibold text-sm">✦ You will leave with: {capability.promise}</p>
        </div>
      </div>

      {/* What you'll get */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h2 className="font-bold text-gray-800 mb-4">What you'll get</h2>
        <ul className="space-y-2">
          {capability.outcomes.map((o, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-green-500 mt-0.5 font-bold">✅</span> {o}
            </li>
          ))}
        </ul>
      </div>

      {/* Primary CTAs */}
      <div className="flex flex-wrap gap-3 mb-12">
        <Link href={`/capabilities/${capability.slug}/1`} className="btn-primary">Start assessment</Link>
        <Link href={`/capabilities/${capability.slug}/1`} className="btn-secondary">Start with step 1 →</Link>
      </div>

      {/* Sub-capability cards */}
      <h2 className="text-xl font-bold text-gray-900 mb-6">Choose what you want to improve now</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {capability.subCapabilities.map((sub, i) => (
          <Link
            key={sub.id}
            href={`/capabilities/${capability.slug}/${sub.slug}`}
            className="card hover:border-brand-300 hover:bg-brand-50 group transition-all flex flex-col"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 rounded-full bg-brand-100 text-brand-600 text-sm font-bold flex items-center justify-center">{i + 1}</span>
              <p className="font-semibold text-gray-900 text-sm group-hover:text-brand-700">{sub.name}</p>
            </div>
            <p className="text-gray-500 text-xs mb-4">{sub.benefit}</p>
            {/* Fixed icons */}
            <div className="flex flex-wrap gap-1 mt-auto mb-3">
              {['Assessment', 'Video', 'Workbook', 'Templates', '30-day plan'].map(label => (
                <span key={label} className="badge bg-gray-100 text-gray-500 text-xs">{label}</span>
              ))}
            </div>
            <span className="btn-primary text-xs justify-center w-full">Open →</span>
          </Link>
        ))}
      </div>

      {/* How it works */}
      <div className="mt-12 bg-gray-50 rounded-xl p-6">
        <h3 className="font-bold text-gray-800 mb-4">How it works</h3>
        <div className="flex flex-wrap gap-4">
          {['Assess', 'Learn', 'Apply', 'Improve'].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              {i > 0 && <span className="text-gray-300">→</span>}
              <span className="px-3 py-1 bg-brand-100 text-brand-700 text-sm font-semibold rounded-full">{step}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 grid sm:grid-cols-3 gap-4 text-sm text-gray-600">
          <p>⏱ <strong>Time:</strong> {capability.timeEstimate}</p>
          <p>📅 <strong>Implementation:</strong> {capability.implementationDays} days</p>
          <p>📦 <strong>Deliverables:</strong> {capability.deliverables.length} outputs</p>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-10">
        <h3 className="font-bold text-gray-800 mb-4">Frequently asked questions</h3>
        <div className="space-y-4">
          {capability.faq.map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg">
              <summary className="px-5 py-4 cursor-pointer font-medium text-gray-800 text-sm hover:bg-gray-50">
                {item.question}
              </summary>
              <p className="px-5 pb-4 text-sm text-gray-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}
