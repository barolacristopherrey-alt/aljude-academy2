'use client'
import { useState } from 'react'

const FAQ = [
  { q: 'Is Aljude Academy completely free?', a: 'Yes. There is no cost, no registration required, and no hidden fees. All content is freely available to everyone.' },
  { q: 'Do I need to create an account?', a: 'No. You can access all capabilities, videos, workbooks, and templates without creating an account.' },
  { q: 'How long does it take to complete a sub-capability?', a: 'Each sub-capability takes 60–120 minutes to complete the learning portion, with a 30-day implementation plan to apply what you\'ve learned.' },
  { q: 'Can I use this alone, without a team?', a: 'Yes. All materials are designed so that one person can work through them independently, then share outputs with their team.' },
  { q: 'What if I don\'t have historical data?', a: 'Start with estimates. The workbooks are designed to guide you with prompts and examples even when data is limited.' },
  { q: 'How do I know which capability to start with?', a: 'Use the "Start Here" page to pick based on a common problem or take the full assessment. You can also browse by category.' },
  { q: 'Are the templates editable?', a: 'Yes. All templates are designed to be customised with your organisation\'s name and specific details.' },
  { q: 'Can I share materials with my team?', a: 'Absolutely. We encourage sharing workbooks and templates with your whole team.' },
]

export default function HelpPage() {
  const [open, setOpen] = useState<number | null>(null)
  const [sent, setSent] = useState(false)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Help</h1>
      <p className="text-gray-500 mb-12">Everything you need to get the most from Aljude Academy.</p>

      {/* Quick Guide */}
      <section id="guide" className="mb-14">
        <h2 className="text-xl font-bold text-gray-800 mb-6">⚡ How to use the academy in 10 minutes</h2>
        <div className="space-y-4">
          {[
            { step: '1', title: 'Choose a category', body: 'From the top menu, click the category that matches your biggest challenge — e.g. Financial Management, Fundraising, or Leadership.' },
            { step: '2', title: 'Browse capabilities', body: 'Each category has 5 capabilities. Click "Expand" on a capability card to see its 5 sub-capabilities inline.' },
            { step: '3', title: 'Open a sub-capability', body: 'Click any sub-capability to open a full page with all the learning materials.' },
            { step: '4', title: 'Start the assessment', body: 'Take the 10-minute self-assessment on the sub-capability page to know where you stand and what to focus on first.' },
            { step: '5', title: 'Watch, work, apply', body: 'Watch the short videos, fill in the workbook, download the templates, and follow the 30-day plan. Everything is on one page.' },
          ].map(item => (
            <div key={item.step} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-brand-500 text-white text-sm font-bold flex items-center justify-center shrink-0">{item.step}</div>
              <div>
                <p className="font-semibold text-gray-800">{item.title}</p>
                <p className="text-gray-500 text-sm mt-0.5">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mb-14">
        <h2 className="text-xl font-bold text-gray-800 mb-6">❓ Frequently asked questions</h2>
        <div className="space-y-3">
          {FAQ.map((item, i) => (
            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-medium text-gray-800 text-sm">{item.q}</span>
                <span className="text-gray-400 shrink-0 text-lg">{open === i ? '▲' : '▼'}</span>
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-sm text-gray-600 border-t border-gray-100">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact form */}
      <section id="contact" className="bg-gray-50 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-2">📬 Contact us</h2>
        <p className="text-gray-500 text-sm mb-6">Have a question or suggestion? We'd love to hear from you.</p>
        {sent ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <p className="text-green-700 font-semibold text-lg">✅ Message sent!</p>
            <p className="text-green-600 text-sm mt-1">We'll get back to you within 2 working days.</p>
          </div>
        ) : (
          <form
            onSubmit={e => { e.preventDefault(); setSent(true) }}
            className="space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input required type="text" placeholder="Your name" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input required type="email" placeholder="you@organisation.org" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea required rows={4} placeholder="How can we help?" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none" />
            </div>
            <button type="submit" className="btn-primary">Send message →</button>
          </form>
        )}
      </section>
    </div>
  )
}
