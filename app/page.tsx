import Link from 'next/link'

const cards = [
  {
    href: '/chat',
    icon: '🤖',
    title: 'AI Assistant',
    description: 'Chat with a CPAP-specialist AI for troubleshooting, education, and clinical guidance. Switch between patient, clinician, training, and admin modes.',
    cta: 'Start chatting',
    color: 'from-teal-500 to-teal-600',
    badge: 'Most popular',
  },
  {
    href: '/triage',
    icon: '🔍',
    title: 'Visual Triage',
    description: 'Navigate a guided decision tree to diagnose CPAP problems. Each path ends with a prioritised, step-by-step intervention checklist.',
    cta: 'Open triage tool',
    color: 'from-blue-500 to-blue-600',
  },
  {
    href: '/training',
    icon: '📚',
    title: 'Clinical Protocols',
    description: 'Interactive checklists for every stage of CPAP care — onboarding, follow-up, titration, hospital-to-home transitions, and staff training.',
    cta: 'View protocols',
    color: 'from-purple-500 to-purple-600',
  },
  {
    href: '/products',
    icon: '🛒',
    title: 'Product Catalog',
    description: 'Browse the full Nadu product range with specifications, indications, compatibility details, and troubleshooting tips for every device and mask.',
    cta: 'Browse products',
    color: 'from-orange-500 to-orange-600',
  },
]

const stats = [
  { value: '20+', label: 'CPAP problems covered' },
  { value: '5', label: 'Triage categories' },
  { value: '10+', label: 'Clinical protocols' },
  { value: '4', label: 'User modes' },
]

export default function Home() {
  return (
    <div className="h-full overflow-y-auto">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium">
            <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
            AI-Powered CPAP Platform
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Expert CPAP Support,<br />
            <span className="text-teal-400">Available 24/7</span>
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto">
            Nadu&apos;s AI triage platform combines deep clinical knowledge with smart guidance tools — for patients, clinicians, and sleep therapy teams.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/chat"
              className="rounded-xl bg-teal-500 px-6 py-3 font-semibold text-white shadow-lg shadow-teal-500/25 transition-all hover:bg-teal-400 hover:shadow-teal-400/30"
            >
              Get help now
            </Link>
            <Link
              href="/triage"
              className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition-all hover:bg-white/20"
            >
              Visual triage
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-extrabold text-teal-600">{s.value}</p>
                <p className="mt-1 text-sm text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-slate-900">
            Everything your sleep clinic needs
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {cards.map(card => (
              <Link
                key={card.href}
                href={card.href}
                className="group relative rounded-2xl border-2 border-slate-200 bg-white p-6 transition-all hover:border-teal-300 hover:shadow-lg"
              >
                {card.badge && (
                  <span className="absolute -top-2.5 right-4 rounded-full bg-teal-500 px-3 py-0.5 text-xs font-bold text-white shadow">
                    {card.badge}
                  </span>
                )}
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} text-2xl shadow-sm`}>
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{card.description}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-teal-600 group-hover:gap-2 transition-all">
                  {card.cta}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="bg-white px-6 py-16 border-t border-slate-100">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-slate-900">Who uses the platform?</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '🛏️', role: 'Patients', use: 'Self-service troubleshooting at home, any time of day' },
              { icon: '🩺', role: 'Clinicians', use: 'Clinical decision support, data interpretation, protocol checklists' },
              { icon: '🎓', role: 'New Staff', use: 'Structured onboarding, equipment familiarity, clinical quizzes' },
              { icon: '⚙️', role: 'Practice Managers', use: 'Protocol design, product knowledge, compliance reporting' },
            ].map(item => (
              <div key={item.role} className="rounded-xl bg-slate-50 p-5">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="mt-3 font-bold text-sm text-slate-900">{item.role}</h3>
                <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">{item.use}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-600 px-6 py-16 text-center text-white">
        <h2 className="text-2xl font-bold">Ready to improve patient outcomes?</h2>
        <p className="mt-2 text-teal-100">Get clinical-grade CPAP support in seconds.</p>
        <Link
          href="/chat"
          className="mt-6 inline-block rounded-xl bg-white px-8 py-3 font-bold text-teal-700 shadow-lg transition-all hover:bg-teal-50"
        >
          Open AI Assistant
        </Link>
      </section>

      <footer className="border-t border-slate-200 bg-white px-6 py-8 text-center text-xs text-slate-400">
        © 2026 Nadu Sleep Solutions. This platform provides clinical support tools only — not a substitute for professional medical advice.
        <br />
        For urgent clinical concerns, contact your prescribing physician or emergency services.
      </footer>
    </div>
  )
}
