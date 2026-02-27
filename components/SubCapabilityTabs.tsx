'use client'
import { useState } from 'react'
import type { SubCapability } from '@/lib/data'

const TABS = [
  { id: 'assessment', label: '✅ Self-Assessment', shortLabel: 'Assessment' },
  { id: 'videos',     label: '▶️ Videos',          shortLabel: 'Videos' },
  { id: 'workbook',   label: '📓 Workbook',        shortLabel: 'Workbook' },
  { id: 'templates',  label: '📄 Templates',       shortLabel: 'Templates' },
  { id: 'plan',       label: '📅 30-Day Plan',     shortLabel: '30-Day Plan' },
]

type AssessmentAnswer = 'not' | 'partial' | 'full' | null

export default function SubCapabilityTabs({ sub }: { sub: SubCapability }) {
  const [activeTab, setActiveTab] = useState('assessment')

  // Assessment state
  const [answers, setAnswers] = useState<Record<string, AssessmentAnswer>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleAnswer = (qId: string, val: AssessmentAnswer) => {
    setAnswers(prev => ({ ...prev, [qId]: val }))
  }

  const calcLevel = () => {
    const vals = Object.values(answers)
    const score = vals.reduce((acc, v) => acc + (v === 'full' ? 2 : v === 'partial' ? 1 : 0), 0)
    const max = sub.assessment.questions.length * 2
    const pct = score / max
    if (pct >= 0.7) return 'A'
    if (pct >= 0.4) return 'B'
    return 'C'
  }

  return (
    <div>
      {/* Tab bar */}
      <div className="flex overflow-x-auto gap-1 border-b border-gray-200 mb-6">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-brand-500 text-brand-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.shortLabel}</span>
          </button>
        ))}
      </div>

      {/* ── Tab 1: Self-Assessment ── */}
      {activeTab === 'assessment' && (
        <div className="max-w-2xl">
          <p className="text-gray-600 mb-6">{sub.assessment.intro}</p>
          {!submitted ? (
            <>
              <div className="space-y-4">
                {sub.assessment.questions.map((q, i) => (
                  <div key={q.id} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-800 mb-3">
                      <span className="text-brand-500 font-bold mr-2">{i + 1}.</span>{q.text}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(['not', 'partial', 'full'] as const).map(val => {
                        const label = val === 'not' ? 'Not in place' : val === 'partial' ? 'Partially in place' : 'Fully in place'
                        const active = answers[q.id] === val
                        return (
                          <button
                            key={val}
                            onClick={() => handleAnswer(q.id, val)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                              active
                                ? val === 'not' ? 'bg-red-100 border-red-300 text-red-700'
                                : val === 'partial' ? 'bg-amber-100 border-amber-300 text-amber-700'
                                : 'bg-green-100 border-green-300 text-green-700'
                                : 'border-gray-300 text-gray-600 hover:border-gray-400'
                            }`}
                          >
                            {label}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setSubmitted(true)}
                className="btn-primary mt-6"
                disabled={Object.keys(answers).length < sub.assessment.questions.length}
              >
                See my results →
              </button>
              {Object.keys(answers).length < sub.assessment.questions.length && (
                <p className="text-xs text-gray-400 mt-2">Answer all {sub.assessment.questions.length} questions to continue.</p>
              )}
            </>
          ) : (
            <div className="bg-brand-50 border border-brand-200 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-brand-500 text-white text-2xl font-bold flex items-center justify-center">
                  {calcLevel()}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Your current level: <span className="text-brand-600">{calcLevel()}</span></p>
                  <p className="text-sm text-gray-500">
                    {calcLevel() === 'A' ? 'Strong foundation – focus on excellence.' : calcLevel() === 'B' ? 'Good progress – a few key gaps to close.' : 'Early stage – great opportunity ahead.'}
                  </p>
                </div>
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-700 mb-2">Suggested next step:</p>
                <p className="text-sm text-brand-700 bg-brand-100 rounded-lg px-4 py-2">"Start with Video 1, then open the workbook."</p>
              </div>
              <button onClick={() => { setAnswers({}); setSubmitted(false) }} className="text-sm text-gray-400 hover:text-gray-600 underline">
                Retake assessment
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Tab 2: Videos ── */}
      {activeTab === 'videos' && (
        <div>
          <p className="text-gray-600 mb-6">Watch short videos. Each ends with a direct action.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sub.videos.map((video, i) => (
              <div key={video.id} className="card group">
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-3">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-brand-600 text-xl shadow-lg group-hover:scale-105 transition-transform">
                      ▶
                    </div>
                  </div>
                </div>
                <p className="text-xs font-semibold text-gray-400 mb-1">Video {i + 1} · {video.duration}</p>
                <p className="font-medium text-gray-800 text-sm">{video.title}</p>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs mt-3 w-full justify-center"
                >
                  ▶ Watch
                </a>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-6 italic">Now open the workbook and start filling it out.</p>
        </div>
      )}

      {/* ── Tab 3: Workbook ── */}
      {activeTab === 'workbook' && (
        <div className="max-w-xl">
          <p className="text-gray-600 mb-6">{sub.workbook.intro}</p>

          <div className="flex flex-wrap gap-3 mb-6">
            <a href={sub.workbook.downloadUrl} className="btn-primary">📓 Open workbook</a>
            <a href={sub.workbook.downloadUrl} download className="btn-secondary">⬇ Download PDF</a>
          </div>

          {/* Workbook guide video */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-3">📹 Watch workbook guide (page-by-page)</p>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-4xl cursor-pointer hover:bg-gray-300 transition-colors">
              ▶
            </div>
          </div>

          {/* Outputs */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">Workbook outputs:</p>
            <ul className="space-y-2">
              {sub.workbook.outputs.map((o, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-brand-500">📄</span> {o}
                </li>
              ))}
            </ul>
          </div>

          {/* Progress */}
          <div className="mt-6">
            <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Progress</p>
            <div className="flex gap-3">
              {[0, 25, 50, 75, 100].map(pct => (
                <button key={pct} className="px-3 py-1 text-xs border border-gray-300 rounded-full hover:bg-brand-50 hover:border-brand-300 transition-colors">
                  {pct}%
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Tab 4: Templates ── */}
      {activeTab === 'templates' && (
        <div>
          <p className="text-gray-600 mb-6">Don't start from scratch. Use ready templates and customise with your organisation name.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sub.templates.map((tpl, i) => (
              <div key={tpl.id} className="card">
                <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600 text-xl mb-3">📄</div>
                <p className="font-semibold text-gray-800 text-sm">{tpl.title}</p>
                <p className="text-xs text-gray-500 mt-1 mb-4">{tpl.description}</p>
                <div className="flex gap-2">
                  <a href={tpl.previewUrl} className="btn-secondary text-xs">Preview</a>
                  <a href={tpl.downloadUrl} download className="btn-primary text-xs">Download</a>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <a href="#" className="btn-primary">⬇ Download full template pack</a>
          </div>
        </div>
      )}

      {/* ── Tab 5: 30-Day Plan ── */}
      {activeTab === 'plan' && (
        <div className="max-w-2xl">
          <p className="text-gray-600 mb-6">{sub.plan30Days.intro}</p>
          <div className="space-y-4 mb-8">
            {sub.plan30Days.weeks.map(week => (
              <div key={week.week} className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-brand-50 px-5 py-3 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-brand-500 text-white text-xs font-bold flex items-center justify-center shrink-0">{week.week}</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Week {week.week}: {week.title}</p>
                  </div>
                </div>
                <div className="px-5 py-4">
                  <ul className="space-y-1.5 mb-3">
                    {week.tasks.map((task, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-gray-400 mt-0.5">□</span> {task}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-2 bg-green-50 rounded-lg px-3 py-2">
                    <span className="text-green-500 text-sm">✓</span>
                    <p className="text-xs text-green-700 font-medium">Weekly output: {week.output}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Metrics */}
          <div className="bg-gray-50 rounded-xl p-5 mb-6">
            <p className="font-semibold text-gray-800 mb-4 text-sm">📊 Track these 3 metrics:</p>
            <div className="space-y-3">
              {sub.plan30Days.metrics.map((m, i) => (
                <div key={i} className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{m.label}</p>
                    <p className="text-xs text-gray-500">{m.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="btn-primary">📅 Start 30-day plan</button>
        </div>
      )}
    </div>
  )
}
