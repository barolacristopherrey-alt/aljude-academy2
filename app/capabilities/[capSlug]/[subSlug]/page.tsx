import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getSubCapabilityBySlug, categories } from '@/lib/data'
import Breadcrumb from '@/components/Breadcrumb'
import SubCapabilityTabs from '@/components/SubCapabilityTabs'

interface Props { params: { capSlug: string; subSlug: string } }

export function generateStaticParams() {
  return categories.flatMap(c =>
    c.capabilities.flatMap(cap =>
      cap.subCapabilities.map(sub => ({ capSlug: cap.slug, subSlug: sub.slug }))
    )
  )
}

export default function SubCapabilityPage({ params }: Props) {
  const found = getSubCapabilityBySlug(params.capSlug, params.subSlug)
  if (!found) notFound()
  const { category, capability, subCapability: sub } = found

  const subIndex = capability.subCapabilities.findIndex(s => s.slug === params.subSlug)
  const prevSub = capability.subCapabilities[subIndex - 1]
  const nextSub = capability.subCapabilities[subIndex + 1]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb crumbs={[
        { label: 'Home', href: '/' },
        { label: category.name, href: `/categories/${category.slug}` },
        { label: capability.name, href: `/capabilities/${capability.slug}` },
        { label: sub.name },
      ]} />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="badge bg-brand-100 text-brand-700 text-xs">
            Step {subIndex + 1} of {capability.subCapabilities.length}
          </span>
          <span className="text-gray-400 text-xs">·</span>
          <span className="text-xs text-gray-500">⏱ 60–120 min · 📅 30 days · 🎯 Beginner / Intermediate</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">{sub.name}</h1>
        <p className="text-brand-600 font-semibold text-lg">Today you will achieve: {sub.outcome}</p>
      </div>

      {/* What you'll get */}
      <div className="bg-green-50 rounded-xl p-5 mb-8">
        <h2 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">What you'll get</h2>
        <ul className="space-y-1.5">
          {sub.outputs.map((o, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-green-500 font-bold mt-0.5">✅</span> {o}
            </li>
          ))}
        </ul>
      </div>

      {/* Sticky CTAs (static version) */}
      <div className="flex flex-wrap gap-3 mb-10 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
        <button className="btn-primary">Start assessment</button>
        <button className="btn-secondary">Start execution now</button>
        <button className="btn-ghost">⬇ Download all files</button>
      </div>

      {/* Main tabs */}
      <SubCapabilityTabs sub={sub} />

      {/* Bottom navigation */}
      <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex gap-3">
          {prevSub && (
            <Link href={`/capabilities/${capability.slug}/${prevSub.slug}`} className="btn-ghost">
              ← Previous: {prevSub.name}
            </Link>
          )}
          <Link href={`/capabilities/${capability.slug}`} className="btn-ghost">↑ Back to capability</Link>
        </div>
        <div className="flex gap-3">
          {nextSub && (
            <Link href={`/capabilities/${capability.slug}/${nextSub.slug}`} className="btn-primary">
              Next: {nextSub.name} →
            </Link>
          )}
          <button className="btn-ghost">Share with team 🔗</button>
        </div>
      </div>
    </div>
  )
}
