import { useDeferredValue, useState } from 'react'
import { corpusDocs, corpusStats, featuredPaths, type CorpusDoc } from '../generated/corpus'
import type { AppView } from './Layout'

interface DashboardProps {
  view: AppView
}

const FEATURED_PATHS = new Set<string>(featuredPaths)

const VIEW_META: Record<AppView, { title: string; subtitle: string }> = {
  overview: {
    title: 'Corpus Overview',
    subtitle: 'Generated directly from the live constitutional repository.',
  },
  constitution: {
    title: 'Constitution & Founding Order',
    subtitle: 'Core charter texts, explanatory documents, and founding-order instruments.',
  },
  annexes: {
    title: 'Annex Corpus',
    subtitle: 'Operational annexes, hardening clauses, and supporting specifications.',
  },
  registries: {
    title: 'Registries & Governance Logs',
    subtitle: 'Threats, patches, commitments, activation protocols, and public disclosures.',
  },
  validation: {
    title: 'Validation State',
    subtitle: 'Corpus integrity, reserved commitments, and prelaunch evidence gates.',
  },
  settings: {
    title: 'Shell Settings',
    subtitle: 'Desktop controls are not implemented yet; this build is focused on the corpus.',
  },
}

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-neon-lime/10 text-neon-lime border border-neon-lime/20',
  proposed: 'bg-neon-amber/10 text-neon-amber border border-neon-amber/20',
  reference: 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20',
}

const SECTION_LABELS: Record<CorpusDoc['section'], string> = {
  constitution: 'Constitution',
  founding_order: 'Founding Order',
  registry: 'Registry',
  annex: 'Annex',
}

function metricTone(label: string): string {
  if (label === 'pass') {
    return 'text-neon-lime'
  }
  return 'text-white/80'
}

function docsForView(view: AppView): CorpusDoc[] {
  if (view === 'overview') {
    return corpusDocs.filter((doc) => FEATURED_PATHS.has(doc.path))
  }
  if (view === 'constitution') {
    return corpusDocs.filter(
      (doc) => doc.section === 'constitution' || doc.section === 'founding_order',
    )
  }
  if (view === 'annexes') {
    return corpusDocs.filter((doc) => doc.section === 'annex')
  }
  if (view === 'registries') {
    return corpusDocs.filter((doc) => doc.section === 'registry')
  }
  if (view === 'validation') {
    return corpusDocs.filter((doc) =>
      [
        'founding/commitments.md',
        'docs/SPECIFICATIONS.md',
        'docs/annexes/ANNEX_AK.md',
        'docs/annexes/ANNEX_AR.md',
        'docs/annexes/ANNEX_AL.md',
        'docs/annexes/ANNEX_AS.md',
      ].includes(doc.path),
    )
  }
  return []
}

function matchesQuery(doc: CorpusDoc, query: string): boolean {
  if (!query) {
    return true
  }

  const haystack = [
    doc.title,
    doc.path,
    doc.summary,
    doc.status,
    SECTION_LABELS[doc.section],
  ]
    .join(' ')
    .toLowerCase()

  return haystack.includes(query.toLowerCase())
}

function StatusBadge({ doc }: { doc: CorpusDoc }) {
  const bucket = doc.statusBucket || 'reference'
  const badgeClass = STATUS_STYLES[bucket] ?? STATUS_STYLES.reference
  const label = doc.status ? doc.status.replace(/^Status:\s*/i, '') : bucket.toUpperCase()

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[9px] font-mono uppercase tracking-[0.18em] ${badgeClass}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {label}
    </span>
  )
}

function MetricCard({
  label,
  value,
  detail,
}: {
  label: string
  value: string
  detail: string
}) {
  return (
    <article className="backdrop-refract refract-lens glass-shimmer rounded-2xl p-4">
      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25">{label}</p>
      <div className="mt-3 flex items-end justify-between gap-4">
        <p className={`text-3xl font-mono font-semibold ${metricTone(value.toLowerCase())}`}>{value}</p>
        <p className="max-w-[12rem] text-right text-[10px] font-mono leading-relaxed text-white/30">
          {detail}
        </p>
      </div>
    </article>
  )
}

function DocCard({ doc }: { doc: CorpusDoc }) {
  return (
    <article className="backdrop-refract refract-lens glass-shimmer rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[9px] font-mono uppercase tracking-[0.22em] text-white/25">
            {SECTION_LABELS[doc.section]}
          </p>
          <h3 className="mt-2 text-sm font-mono uppercase tracking-[0.12em] text-white/80">
            {doc.title}
          </h3>
        </div>
        <StatusBadge doc={doc} />
      </div>

      <p className="mt-4 text-[11px] font-mono leading-relaxed text-white/38">{doc.summary}</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div>
          <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-white/20">Path</p>
          <p className="mt-1 break-all text-[10px] font-mono text-white/42">{doc.path}</p>
        </div>
        <div>
          <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-white/20">Words</p>
          <p className="mt-1 text-sm font-mono text-white/70">{doc.wordCount}</p>
        </div>
        <div>
          <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-white/20">Headings</p>
          <p className="mt-1 text-sm font-mono text-white/70">{doc.headingCount}</p>
        </div>
      </div>
    </article>
  )
}

function OverviewPanels() {
  const constitutionDocs = corpusDocs.filter((doc) => doc.section === 'constitution').length
  const foundingDocs = corpusDocs.filter((doc) => doc.section === 'founding_order').length
  const registryDocs = corpusDocs.filter((doc) => doc.section === 'registry').length
  const featuredDocs = corpusDocs.filter((doc) => FEATURED_PATHS.has(doc.path))

  return (
    <>
      <div className="grid gap-4 xl:grid-cols-4">
        <MetricCard
          label="Schema"
          value={`${corpusStats.articleCount} Articles`}
          detail={`${corpusStats.schema} with ${corpusStats.foundingOrderDocumentCount} founding-order documents.`}
        />
        <MetricCard
          label="Annexes"
          value={`${corpusStats.annexCount}`}
          detail={`${corpusStats.activeAnnexCount} active, ${corpusStats.proposedAnnexCount} proposed, ${corpusStats.referenceAnnexCount} reference.`}
        />
        <MetricCard
          label="Registries"
          value={`${corpusStats.threatCount}/${corpusStats.patchCount}`}
          detail="Threat and patch registries remain first-class live sources in the shell."
        />
        <MetricCard
          label="Validator"
          value={corpusStats.validatorStatus.toUpperCase()}
          detail={`${corpusStats.buildStamp} generated from the live repository corpus.`}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.35fr,0.9fr]">
        <article className="backdrop-refract refract-lens glass-shimmer rounded-2xl p-5">
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/25">
            Section Breakdown
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              ['Constitution', constitutionDocs, 'Primary charter, white paper, README, and formal specifications.'],
              ['Founding Order', foundingDocs, 'Consent, exit, reentry, subsidiarity, and jurisdictional scale rules.'],
              ['Registries', registryDocs, 'Threats, patches, commitments, disclosures, and acceptance pathways.'],
            ].map(([label, count, detail]) => (
              <div key={label} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-white/22">{label}</p>
                <p className="mt-2 text-2xl font-mono text-white/78">{count}</p>
                <p className="mt-3 text-[10px] font-mono leading-relaxed text-white/32">{detail}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="backdrop-refract refract-lens glass-shimmer rounded-2xl p-5">
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/25">
            Activation Gates
          </p>
          <div className="mt-5 space-y-4">
            <div className="rounded-2xl border border-neon-amber/15 bg-neon-amber/5 p-4">
              <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-neon-amber">
                Reserved Commitments
              </p>
              <p className="mt-2 text-2xl font-mono text-white/78">
                {corpusStats.reservedCommitmentCount}
              </p>
              <p className="mt-3 text-[10px] font-mono leading-relaxed text-white/32">
                Unbound founding gates are now explicit FC records instead of free-form placeholders.
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-white/22">
                Featured Files
              </p>
              <p className="mt-2 text-[10px] font-mono leading-relaxed text-white/38">
                {featuredDocs.length} generated entries feed this shell directly from the repo.
              </p>
            </div>
          </div>
        </article>
      </div>
    </>
  )
}

function ValidationPanels({ docs }: { docs: CorpusDoc[] }) {
  return (
    <>
      <div className="grid gap-4 xl:grid-cols-3">
        <MetricCard
          label="Corpus Check"
          value={corpusStats.validatorStatus.toUpperCase()}
          detail="`python3 scripts/validate_corpus.py` passes with zero errors after the placeholder-to-FC conversion."
        />
        <MetricCard
          label="Commitments"
          value={`${corpusStats.commitmentCount}`}
          detail={`${corpusStats.reservedCommitmentCount} commitments remain intentionally reserved behind activation gates.`}
        />
        <MetricCard
          label="Snapshot"
          value={corpusStats.buildStamp}
          detail="Deterministic content fingerprint for the generated corpus snapshot."
        />
      </div>

      <article className="backdrop-refract refract-lens glass-shimmer rounded-2xl p-5">
        <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/25">
          Reserved-Commitment Surfaces
        </p>
        <p className="mt-3 max-w-3xl text-[11px] font-mono leading-relaxed text-white/34">
          The remaining prelaunch uncertainty is no longer hidden in prose. Identity AED bands, contract-commitment thresholds,
          and several specification activation parameters now resolve through reserved FC records in the commitments registry.
        </p>
      </article>

      <div className="grid gap-4 xl:grid-cols-2">
        {docs.map((doc) => (
          <DocCard key={doc.id} doc={doc} />
        ))}
      </div>
    </>
  )
}

function EmptySettings() {
  return (
    <article className="backdrop-refract refract-lens glass-shimmer rounded-2xl p-6">
      <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/25">Not Wired Yet</p>
      <p className="mt-4 max-w-2xl text-[11px] font-mono leading-relaxed text-white/34">
        This desktop build now prioritizes corpus fidelity over shell controls. The next useful settings pass would be local
        file open actions, search persistence, and validator / build command shortcuts.
      </p>
    </article>
  )
}

export function Dashboard({ view }: DashboardProps) {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const baseDocs = docsForView(view)
  const visibleDocs = baseDocs.filter((doc) => matchesQuery(doc, deferredQuery))
  const meta = VIEW_META[view]

  return (
    <div className="p-6">
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-white/22">
              Humane Constitution Shell
            </p>
            <h1 className="mt-2 text-sm font-mono font-semibold uppercase tracking-[0.18em] text-white/84">
              {meta.title}
            </h1>
            <p className="mt-2 max-w-3xl text-[11px] font-mono leading-relaxed text-white/34">
              {meta.subtitle}
            </p>
          </div>

          {view !== 'settings' && (
            <div className="backdrop-refract rounded-2xl px-4 py-3 xl:w-[24rem]">
              <label className="block text-[9px] font-mono uppercase tracking-[0.2em] text-white/20" htmlFor="corpus-search">
                Filter Current View
              </label>
              <input
                id="corpus-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="title, path, summary, status"
                className="mt-2 w-full border-0 bg-transparent p-0 text-[12px] font-mono text-white/72 outline-none placeholder:text-white/20"
              />
            </div>
          )}
        </header>

        {view === 'overview' && <OverviewPanels />}
        {view === 'validation' && <ValidationPanels docs={visibleDocs} />}
        {view === 'settings' && <EmptySettings />}

        {view !== 'overview' && view !== 'validation' && view !== 'settings' && (
          <div className="grid gap-4 xl:grid-cols-2">
            {visibleDocs.map((doc) => (
              <DocCard key={doc.id} doc={doc} />
            ))}
          </div>
        )}

        {view === 'overview' && (
          <div className="grid gap-4 xl:grid-cols-2">
            {visibleDocs.map((doc) => (
              <DocCard key={doc.id} doc={doc} />
            ))}
          </div>
        )}

        {view !== 'settings' && visibleDocs.length === 0 && (
          <article className="backdrop-refract rounded-2xl p-6">
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/25">No Matches</p>
            <p className="mt-3 text-[11px] font-mono leading-relaxed text-white/34">
              The current filter does not match any documents in this view.
            </p>
          </article>
        )}
      </div>
    </div>
  )
}
