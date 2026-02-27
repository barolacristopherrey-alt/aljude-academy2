import { notFound } from 'next/navigation'
import { getCategoryBySlug, categories } from '@/lib/data'
import Breadcrumb from '@/components/Breadcrumb'
import CapabilityCard from '@/components/CapabilityCard'

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return categories.map(c => ({ slug: c.slug }))
}

export default function CategoryPage({ params }: Props) {
  const category = getCategoryBySlug(params.slug)
  if (!category) notFound()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: category.name }]} />

      {/* Header */}
      <div className="flex items-start gap-5 mb-10">
        <div className="text-6xl">{category.icon}</div>
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">{category.name}</h1>
          <p className="text-gray-500 text-lg mt-2 max-w-2xl">{category.description}</p>
        </div>
      </div>

      {/* Capability list */}
      <h2 className="text-xl font-bold text-gray-800 mb-5">
        {category.capabilities.length} capabilities — click to expand
      </h2>
      <div className="space-y-4">
        {category.capabilities.map(cap => (
          <CapabilityCard key={cap.id} capability={cap} />
        ))}
      </div>
    </div>
  )
}
