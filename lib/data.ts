// lib/data.ts
// ─────────────────────────────────────────────────────────────
// Aljude Academy – single source of truth
// ─────────────────────────────────────────────────────────────

export interface AssessmentQuestion {
  id: string
  text: string
}

export interface Video {
  id: string
  title: string
  duration: string
  thumbnail: string
  url: string
}

export interface Template {
  id: string
  title: string
  description: string
  downloadUrl: string
  previewUrl: string
}

export interface WeekPlan {
  week: number
  title: string
  tasks: string[]
  output: string
}

export interface Metric {
  label: string
  description: string
}

export interface SubCapability {
  id: string
  slug: string        // numeric "1" … "5"
  name: string
  benefit: string     // "You will get …"
  outcome: string     // "Today you will achieve …"
  outputs: string[]   // 3 bullets shown in "What you'll get"
  assessment: {
    intro: string
    questions: AssessmentQuestion[]
  }
  videos: Video[]
  workbook: {
    intro: string
    downloadUrl: string
    guideVideoUrl: string
    outputs: string[]
  }
  templates: Template[]
  plan30Days: {
    intro: string
    weeks: WeekPlan[]
    metrics: Metric[]
  }
}

export interface Capability {
  id: string
  slug: string
  name: string
  promise: string      // "You will leave with …"
  definition: string   // 2-line micro definition
  outcomes: string[]   // exactly 3
  deliverables: string[]
  timeEstimate: string
  implementationDays: number
  faq: { question: string; answer: string }[]
  subCapabilities: SubCapability[]
}

export interface Category {
  id: string
  slug: string
  name: string
  shortLabel: string
  icon: string          // emoji icon
  description: string
  capabilities: Capability[]
}

// ─────────────────────────────────────────────────────────────
// PLACEHOLDER helpers
// ─────────────────────────────────────────────────────────────
const placeholderVideo = (n: number, cap: string): Video => ({
  id: `v${n}`,
  title: `${cap} – Video ${n}`,
  duration: `${6 + n} min`,
  thumbnail: `https://placehold.co/640x360/3b5bdb/ffffff?text=Video+${n}`,
  url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
})

const placeholderTemplate = (n: number, cap: string): Template => ({
  id: `t${n}`,
  title: `${cap} Template ${n}`,
  description: `Ready-to-use template for ${cap.toLowerCase()} – customise with your organisation name.`,
  downloadUrl: '#',
  previewUrl: '#',
})

const placeholderWeeks = (subName: string): WeekPlan[] => [
  { week: 1, title: 'Start fast', tasks: [`Read the ${subName} overview`, 'Complete the self-assessment', 'Identify top 3 gaps'], output: 'Completed assessment + priority list' },
  { week: 2, title: 'Build the base', tasks: ['Watch all videos', 'Fill sections 1–3 of workbook', 'Draft first template'], output: 'Workbook 50 % complete' },
  { week: 3, title: 'Apply in real work', tasks: ['Use templates in your next meeting', 'Share draft with team', 'Collect feedback'], output: 'First version approved by team' },
  { week: 4, title: 'Stabilise & measure', tasks: ['Review against 3 metrics', 'Update workbook with real data', 'Set review date for next month'], output: 'Final document + improvement plan' },
]

const placeholderMetrics = (subName: string): Metric[] => [
  { label: 'Completion rate', description: `% of ${subName} tasks completed on time` },
  { label: 'Team alignment', description: 'Team agrees on the outcome (1–5 scale)' },
  { label: 'Repeat usage', description: 'Number of times the template is reused in 30 days' },
]

const placeholderAssessmentQuestions = (count: number): AssessmentQuestion[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `q${i + 1}`,
    text: `Statement ${i + 1}: We have a clear and documented approach in place for this area.`,
  }))

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────

// ── FINANCIAL MANAGEMENT (full example) ─────────────────────

const financialManagementCapabilities: Capability[] = [
  {
    id: 'fin-budgeting',
    slug: 'financial-management-budgeting',
    name: 'Budgeting & Financial Planning',
    promise: 'A realistic annual budget, a monthly tracking sheet, and confidence in every spending decision.',
    definition:
      'Budgeting is the process of estimating income and expenses over a defined period so your organisation can make intentional financial decisions.',
    outcomes: [
      'A complete annual budget linked to your programmes',
      'A monthly variance-tracking system',
      'A simple decision-making framework for unplanned expenses',
    ],
    deliverables: ['Annual budget spreadsheet', 'Monthly tracking template', 'Expense approval policy'],
    timeEstimate: '2–4 hours (split over 2 sessions)',
    implementationDays: 30,
    faq: [
      { question: 'Do I need an accountant?', answer: 'No. This capability is designed for non-finance managers. The templates do the heavy lifting.' },
      { question: 'Can I apply it alone?', answer: 'Yes. One person can build the first draft, then share with leadership for sign-off.' },
      { question: 'What if I don\'t have historical data?', answer: 'Start with estimates. The workbook guides you through reasonable assumptions.' },
    ],
    subCapabilities: [
      {
        id: 'fin-bud-1',
        slug: '1',
        name: 'Write your mission in one line',
        benefit: 'You will get a clear one-sentence financial purpose statement.',
        outcome: 'You will write a ready one-line mission that guides all budget decisions.',
        outputs: ['A one-line financial mission statement', 'Alignment on what "enough" looks like', 'A filter for every future spending decision'],
        assessment: {
          intro: 'Answer quickly to know where you stand. Then we\'ll suggest a clear starting point.',
          questions: placeholderAssessmentQuestions(8),
        },
        videos: [
          placeholderVideo(1, 'Budget Mission'),
          placeholderVideo(2, 'Budget Mission'),
          placeholderVideo(3, 'Budget Mission'),
        ],
        workbook: {
          intro: 'This is the practical part. Fill the workbook to produce ready documents.',
          downloadUrl: '#',
          guideVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          outputs: ['Financial mission statement', 'Spending priority list', 'Decision checklist'],
        },
        templates: [
          placeholderTemplate(1, 'Financial Mission'),
          placeholderTemplate(2, 'Financial Mission'),
          placeholderTemplate(3, 'Financial Mission'),
        ],
        plan30Days: {
          intro: 'Do small steps for 30 days to make the improvement stick.',
          weeks: placeholderWeeks('Budget Mission'),
          metrics: placeholderMetrics('Budget Mission'),
        },
      },
      {
        id: 'fin-bud-2',
        slug: '2',
        name: 'Build your income forecast',
        benefit: 'You will get a realistic 12-month income projection.',
        outcome: 'You will leave with a complete income forecast you can show to your board.',
        outputs: ['12-month income projection', 'Funding-source breakdown', 'Risk scenario (best vs worst case)'],
        assessment: {
          intro: 'Answer quickly to know where you stand.',
          questions: placeholderAssessmentQuestions(7),
        },
        videos: [
          placeholderVideo(1, 'Income Forecast'),
          placeholderVideo(2, 'Income Forecast'),
          placeholderVideo(3, 'Income Forecast'),
        ],
        workbook: {
          intro: 'Fill the workbook section by section to build your projection.',
          downloadUrl: '#',
          guideVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          outputs: ['Income projection spreadsheet', 'Funding gap analysis', 'Board-ready summary'],
        },
        templates: [
          placeholderTemplate(1, 'Income Forecast'),
          placeholderTemplate(2, 'Income Forecast'),
        ],
        plan30Days: {
          intro: 'Do small steps for 30 days to make the improvement stick.',
          weeks: placeholderWeeks('Income Forecast'),
          metrics: placeholderMetrics('Income Forecast'),
        },
      },
      {
        id: 'fin-bud-3',
        slug: '3',
        name: 'Map your expenses by programme',
        benefit: 'You will get a full cost breakdown linked to each programme.',
        outcome: 'You will leave with an expense map that shows the real cost of delivering your work.',
        outputs: ['Programme cost breakdown', 'Overhead allocation model', 'Cost-per-beneficiary estimate'],
        assessment: {
          intro: 'Answer quickly to know where you stand.',
          questions: placeholderAssessmentQuestions(9),
        },
        videos: [
          placeholderVideo(1, 'Expense Mapping'),
          placeholderVideo(2, 'Expense Mapping'),
          placeholderVideo(3, 'Expense Mapping'),
        ],
        workbook: {
          intro: 'This is the practical part. Fill the workbook to produce ready documents.',
          downloadUrl: '#',
          guideVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          outputs: ['Expense map spreadsheet', 'Overhead policy draft', 'Cost summary for funders'],
        },
        templates: [
          placeholderTemplate(1, 'Expense Mapping'),
          placeholderTemplate(2, 'Expense Mapping'),
        ],
        plan30Days: {
          intro: 'Do small steps for 30 days to make the improvement stick.',
          weeks: placeholderWeeks('Expense Mapping'),
          metrics: placeholderMetrics('Expense Mapping'),
        },
      },
      {
        id: 'fin-bud-4',
        slug: '4',
        name: 'Create a monthly tracking system',
        benefit: 'You will get a simple monthly reporting process your team can follow.',
        outcome: 'You will leave with a monthly finance meeting template and variance report.',
        outputs: ['Monthly variance report template', 'Finance meeting agenda', 'Traffic-light dashboard'],
        assessment: {
          intro: 'Answer quickly to know where you stand.',
          questions: placeholderAssessmentQuestions(6),
        },
        videos: [
          placeholderVideo(1, 'Monthly Tracking'),
          placeholderVideo(2, 'Monthly Tracking'),
          placeholderVideo(3, 'Monthly Tracking'),
        ],
        workbook: {
          intro: 'This is the practical part. Fill the workbook to produce ready documents.',
          downloadUrl: '#',
          guideVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          outputs: ['Tracking spreadsheet', 'Meeting agenda', 'Traffic-light template'],
        },
        templates: [
          placeholderTemplate(1, 'Monthly Tracking'),
          placeholderTemplate(2, 'Monthly Tracking'),
          placeholderTemplate(3, 'Monthly Tracking'),
        ],
        plan30Days: {
          intro: 'Do small steps for 30 days to make the improvement stick.',
          weeks: placeholderWeeks('Monthly Tracking'),
          metrics: placeholderMetrics('Monthly Tracking'),
        },
      },
      {
        id: 'fin-bud-5',
        slug: '5',
        name: 'Set a reserve & contingency policy',
        benefit: 'You will get a board-approved reserve policy you can implement immediately.',
        outcome: 'You will leave with a written reserve policy and a plan to fund it.',
        outputs: ['Reserve policy document', 'Funding timeline', 'Board approval template'],
        assessment: {
          intro: 'Answer quickly to know where you stand.',
          questions: placeholderAssessmentQuestions(7),
        },
        videos: [
          placeholderVideo(1, 'Reserve Policy'),
          placeholderVideo(2, 'Reserve Policy'),
          placeholderVideo(3, 'Reserve Policy'),
        ],
        workbook: {
          intro: 'This is the practical part. Fill the workbook to produce ready documents.',
          downloadUrl: '#',
          guideVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          outputs: ['Reserve policy draft', 'Funding gap analysis', 'Board presentation slide'],
        },
        templates: [
          placeholderTemplate(1, 'Reserve Policy'),
          placeholderTemplate(2, 'Reserve Policy'),
        ],
        plan30Days: {
          intro: 'Do small steps for 30 days to make the improvement stick.',
          weeks: placeholderWeeks('Reserve Policy'),
          metrics: placeholderMetrics('Reserve Policy'),
        },
      },
    ],
  },
  {
    id: 'fin-reporting',
    slug: 'financial-management-reporting',
    name: 'Financial Reporting & Transparency',
    promise: 'Clear financial reports your board, funders, and team can actually understand.',
    definition: 'Financial reporting turns raw numbers into meaningful stories that build trust with all stakeholders.',
    outcomes: ['A monthly financial dashboard', 'A funder-ready financial summary', 'A board report template'],
    deliverables: ['Financial dashboard', 'Funder summary template', 'Board report'],
    timeEstimate: '2–3 hours',
    implementationDays: 30,
    faq: [
      { question: 'Do I need accounting software?', answer: 'No. A spreadsheet is sufficient for most organisations at this stage.' },
      { question: 'Can I apply it alone?', answer: 'Yes. The templates are designed for one person to complete.' },
      { question: 'What if my data is incomplete?', answer: 'Use estimates with clear notes. Transparency about gaps is better than silence.' },
    ],
    subCapabilities: Array.from({ length: 5 }, (_, i) => ({
      id: `fin-rep-${i + 1}`,
      slug: `${i + 1}`,
      name: ['Build a simple dashboard', 'Write for non-finance readers', 'Report to your board', 'Report to funders', 'Set up an audit trail'][i],
      benefit: `You will get a clear output for sub-capability ${i + 1}.`,
      outcome: `Today you will produce a ready output for reporting sub-capability ${i + 1}.`,
      outputs: ['Output A', 'Output B', 'Output C'],
      assessment: { intro: 'Answer quickly to know where you stand.', questions: placeholderAssessmentQuestions(7) },
      videos: [1, 2, 3].map(n => placeholderVideo(n, 'Financial Reporting')),
      workbook: { intro: 'Fill the workbook to produce ready documents.', downloadUrl: '#', guideVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', outputs: ['Doc 1', 'Doc 2', 'Doc 3'] },
      templates: [1, 2, 3].map(n => placeholderTemplate(n, 'Financial Reporting')),
      plan30Days: { intro: 'Do small steps for 30 days to make the improvement stick.', weeks: placeholderWeeks('Financial Reporting'), metrics: placeholderMetrics('Financial Reporting') },
    })),
  },
]

// ── STUB GENERATOR for remaining categories ──────────────────

const stubCapabilities = (categoryName: string, slugPrefix: string, names: string[]): Capability[] =>
  names.map((name, ci) => ({
    id: `${slugPrefix}-${ci + 1}`,
    slug: `${slugPrefix}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    name,
    promise: `You will leave with a clear plan and ready tools for ${name.toLowerCase()}.`,
    definition: `${name} is a critical capability that helps your organisation achieve sustainable impact.`,
    outcomes: ['A clear action plan', 'Ready-to-use templates', 'A 30-day implementation roadmap'],
    deliverables: ['Action plan document', 'Template pack', 'Implementation checklist'],
    timeEstimate: '2–4 hours',
    implementationDays: 30,
    faq: [
      { question: 'Do I need a team?', answer: 'You can start alone and involve your team later.' },
      { question: 'Can I apply it alone?', answer: 'Yes. All materials are designed for solo use.' },
      { question: 'What if I don\'t have data?', answer: 'Start with estimates; refine over time.' },
    ],
    subCapabilities: Array.from({ length: 5 }, (_, si) => ({
      id: `${slugPrefix}-${ci + 1}-${si + 1}`,
      slug: `${si + 1}`,
      name: `${name} – Step ${si + 1}`,
      benefit: `You will get a clear output for step ${si + 1} of ${name}.`,
      outcome: `Today you will complete step ${si + 1} of ${name.toLowerCase()}.`,
      outputs: [`Output ${si + 1}A`, `Output ${si + 1}B`, `Output ${si + 1}C`],
      assessment: { intro: 'Answer quickly to know where you stand.', questions: placeholderAssessmentQuestions(8) },
      videos: [1, 2, 3].map(n => placeholderVideo(n, name)),
      workbook: { intro: 'Fill the workbook to produce ready documents.', downloadUrl: '#', guideVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', outputs: ['Doc A', 'Doc B', 'Doc C'] },
      templates: [1, 2, 3].map(n => placeholderTemplate(n, name)),
      plan30Days: { intro: 'Do small steps for 30 days to make the improvement stick.', weeks: placeholderWeeks(name), metrics: placeholderMetrics(name) },
    })),
  }))

// ─────────────────────────────────────────────────────────────
// ALL CATEGORIES
// ─────────────────────────────────────────────────────────────

export const categories: Category[] = [
  {
    id: 'strategy-governance',
    slug: 'strategy-governance',
    name: 'Strategy & Governance',
    shortLabel: 'Strategy',
    icon: '🎯',
    description: 'Clarify your direction, strengthen your board, and build accountability systems that last.',
    capabilities: stubCapabilities('Strategy & Governance', 'strategy', [
      'Clarify Your Organisation\'s Direction',
      'Strengthen Board Governance',
      'Build an Accountability Framework',
      'Manage Organisational Risk',
      'Plan for the Long Term',
    ]),
  },
  {
    id: 'impact-programs-services',
    slug: 'impact-programs-services',
    name: 'Impact Programs & Services',
    shortLabel: 'Programs',
    icon: '🌍',
    description: 'Design, deliver, and measure programmes that create real change for the people you serve.',
    capabilities: stubCapabilities('Impact Programs & Services', 'programs', [
      'Design High-Impact Programmes',
      'Measure Programme Outcomes',
      'Manage Programme Delivery',
      'Engage Beneficiaries',
      'Improve Programme Quality',
    ]),
  },
  {
    id: 'leadership',
    slug: 'leadership',
    name: 'Leadership',
    shortLabel: 'Leadership',
    icon: '🧭',
    description: 'Build the personal and organisational leadership that motivates teams and drives results.',
    capabilities: stubCapabilities('Leadership', 'leadership', [
      'Lead with Purpose',
      'Make Better Decisions',
      'Communicate as a Leader',
      'Build a Leadership Pipeline',
      'Navigate Change',
    ]),
  },
  {
    id: 'people-volunteers',
    slug: 'people-volunteers',
    name: 'People & Volunteers',
    shortLabel: 'Team',
    icon: '🤝',
    description: 'Attract, develop, and retain the people – paid and volunteer – who power your mission.',
    capabilities: stubCapabilities('People & Volunteers', 'people', [
      'Recruit the Right People',
      'Onboard Effectively',
      'Manage Volunteer Programmes',
      'Develop Your Team',
      'Retain Key People',
    ]),
  },
  {
    id: 'systems-operations',
    slug: 'systems-operations',
    name: 'Systems & Operations',
    shortLabel: 'Systems',
    icon: '⚙️',
    description: 'Put the processes, tools, and infrastructure in place to run a well-organised organisation.',
    capabilities: stubCapabilities('Systems & Operations', 'systems', [
      'Document Your Processes',
      'Choose the Right Tools',
      'Manage Projects Effectively',
      'Build a Knowledge Management System',
      'Improve Operational Efficiency',
    ]),
  },
  {
    id: 'financial-management',
    slug: 'financial-management',
    name: 'Financial Management',
    shortLabel: 'Money',
    icon: '💰',
    description: 'Build financial systems that give you clarity, confidence, and control over your resources.',
    capabilities: financialManagementCapabilities,
  },
  {
    id: 'fundraising',
    slug: 'fundraising',
    name: 'Fundraising',
    shortLabel: 'Funding',
    icon: '🎗️',
    description: 'Build stable, diversified funding through grants, individual donors, and earned income.',
    capabilities: stubCapabilities('Fundraising', 'fundraising', [
      'Build a Stable Funding Base',
      'Write Winning Grant Proposals',
      'Engage Individual Donors',
      'Run Fundraising Campaigns',
      'Diversify Your Income',
    ]),
  },
  {
    id: 'marketing-communications',
    slug: 'marketing-communications',
    name: 'Marketing & Communications',
    shortLabel: 'Comms',
    icon: '📣',
    description: 'Tell your story, grow your audience, and build the brand trust that attracts support.',
    capabilities: stubCapabilities('Marketing & Communications', 'comms', [
      'Define Your Brand Voice',
      'Build Your Online Presence',
      'Grow Your Audience',
      'Communicate Your Impact',
      'Manage Media Relations',
    ]),
  },
]

// ─────────────────────────────────────────────────────────────
// LOOKUP HELPERS
// ─────────────────────────────────────────────────────────────

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug)
}

export function getCapabilityBySlug(capSlug: string): { category: Category; capability: Capability } | undefined {
  for (const category of categories) {
    const capability = category.capabilities.find(cap => cap.slug === capSlug)
    if (capability) return { category, capability }
  }
  return undefined
}

export function getSubCapabilityBySlug(
  capSlug: string,
  subSlug: string
): { category: Category; capability: Capability; subCapability: SubCapability } | undefined {
  const found = getCapabilityBySlug(capSlug)
  if (!found) return undefined
  const subCapability = found.capability.subCapabilities.find(sc => sc.slug === subSlug)
  if (!subCapability) return undefined
  return { ...found, subCapability }
}

// ─────────────────────────────────────────────────────────────
// SEARCH INDEX
// ─────────────────────────────────────────────────────────────

export interface SearchResult {
  type: 'category' | 'capability' | 'subCapability'
  title: string
  description: string
  href: string
  category: string
  capability?: string
}

export function search(query: string): SearchResult[] {
  const q = query.toLowerCase().trim()
  if (!q) return []
  const results: SearchResult[] = []

  for (const cat of categories) {
    if (cat.name.toLowerCase().includes(q) || cat.description.toLowerCase().includes(q)) {
      results.push({ type: 'category', title: cat.name, description: cat.description, href: `/categories/${cat.slug}`, category: cat.name })
    }
    for (const cap of cat.capabilities) {
      if (cap.name.toLowerCase().includes(q) || cap.definition.toLowerCase().includes(q)) {
        results.push({ type: 'capability', title: cap.name, description: cap.definition, href: `/capabilities/${cap.slug}`, category: cat.name })
      }
      for (const sub of cap.subCapabilities) {
        if (sub.name.toLowerCase().includes(q) || sub.benefit.toLowerCase().includes(q)) {
          results.push({ type: 'subCapability', title: sub.name, description: sub.benefit, href: `/capabilities/${cap.slug}/${sub.slug}`, category: cat.name, capability: cap.name })
        }
      }
    }
  }
  return results
}
