import { startTransition, useDeferredValue, useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/core'
import type { CorpusDoc, CorpusPayload } from '../generated/corpus'
import type { AppView } from './Layout'

interface DashboardProps {
  view: AppView
  corpus: CorpusPayload | null
  loadError: string | null
}

interface SourceFeedback {
  tone: 'neutral' | 'success' | 'warning' | 'error'
  message: string
}

interface MarkdownHeading {
  type: 'heading'
  level: number
  text: string
  slug: string
}

interface MarkdownParagraph {
  type: 'paragraph'
  text: string
}

interface MarkdownList {
  type: 'list'
  ordered: boolean
  items: string[]
}

interface MarkdownCode {
  type: 'code'
  code: string
  language: string
}

interface MarkdownQuote {
  type: 'quote'
  text: string
}

interface MarkdownRule {
  type: 'rule'
}

interface MarkdownTable {
  type: 'table'
  lines: string[]
}

type MarkdownBlock =
  | MarkdownHeading
  | MarkdownParagraph
  | MarkdownList
  | MarkdownCode
  | MarkdownQuote
  | MarkdownRule
  | MarkdownTable

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
    subtitle: 'The reader is now live; the remaining shell work is convenience tooling around it.',
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

function docsForView(view: AppView, docs: CorpusDoc[], featuredPaths: string[]): CorpusDoc[] {
  const featuredPathSet = new Set<string>(featuredPaths)

  if (view === 'overview') {
    return docs.filter((doc) => featuredPathSet.has(doc.path))
  }
  if (view === 'constitution') {
    return docs.filter(
      (doc) => doc.section === 'constitution' || doc.section === 'founding_order',
    )
  }
  if (view === 'annexes') {
    return docs.filter((doc) => doc.section === 'annex')
  }
  if (view === 'registries') {
    return docs.filter((doc) => doc.section === 'registry')
  }
  if (view === 'validation') {
    return docs.filter((doc) =>
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
    ...doc.headings.map((heading) => heading.text),
  ]
    .join(' ')
    .toLowerCase()

  return haystack.includes(query.toLowerCase())
}

function estimatedReadMinutes(wordCount: number): number {
  return Math.max(1, Math.round(wordCount / 220))
}

function isHeadingLine(trimmed: string): boolean {
  return /^#{1,6}\s+/.test(trimmed)
}

function isRuleLine(trimmed: string): boolean {
  return /^([-*_]\s*){3,}$/.test(trimmed)
}

function isCodeFence(trimmed: string): boolean {
  return /^```/.test(trimmed)
}

function isOrderedListLine(trimmed: string): boolean {
  return /^\d+\.\s+/.test(trimmed)
}

function isUnorderedListLine(trimmed: string): boolean {
  return /^[-*]\s+/.test(trimmed)
}

function isTableLine(trimmed: string): boolean {
  return trimmed.startsWith('|')
}

function isQuoteLine(trimmed: string): boolean {
  return trimmed.startsWith('>')
}

function parseMarkdown(doc: CorpusDoc): MarkdownBlock[] {
  const lines = doc.content.split('\n')
  const blocks: MarkdownBlock[] = []
  let index = 0
  let headingIndex = 0

  while (index < lines.length) {
    const rawLine = lines[index]
    const trimmed = rawLine.trim()

    if (!trimmed) {
      index += 1
      continue
    }

    if (isCodeFence(trimmed)) {
      const language = trimmed.replace(/^```/, '').trim()
      index += 1
      const codeLines: string[] = []
      while (index < lines.length && !isCodeFence(lines[index].trim())) {
        codeLines.push(lines[index])
        index += 1
      }
      if (index < lines.length) {
        index += 1
      }
      blocks.push({
        type: 'code',
        code: codeLines.join('\n'),
        language,
      })
      continue
    }

    if (isHeadingLine(trimmed)) {
      const level = trimmed.match(/^#{1,6}/)?.[0].length ?? 1
      const text = trimmed.replace(/^#{1,6}\s+/, '').trim()
      const heading = doc.headings[headingIndex]
      blocks.push({
        type: 'heading',
        level,
        text,
        slug: heading?.slug ?? `${doc.id}-heading-${headingIndex + 1}`,
      })
      headingIndex += 1
      index += 1
      continue
    }

    if (isRuleLine(trimmed)) {
      blocks.push({ type: 'rule' })
      index += 1
      continue
    }

    if (isTableLine(trimmed)) {
      const tableLines: string[] = []
      while (index < lines.length && isTableLine(lines[index].trim())) {
        tableLines.push(lines[index])
        index += 1
      }
      blocks.push({ type: 'table', lines: tableLines })
      continue
    }

    if (isQuoteLine(trimmed)) {
      const quoteLines: string[] = []
      while (index < lines.length && isQuoteLine(lines[index].trim())) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ''))
        index += 1
      }
      blocks.push({ type: 'quote', text: quoteLines.join(' ') })
      continue
    }

    if (isOrderedListLine(trimmed) || isUnorderedListLine(trimmed)) {
      const ordered = isOrderedListLine(trimmed)
      const items: string[] = []
      while (index < lines.length) {
        const current = lines[index].trim()
        if (!current) {
          index += 1
          break
        }
        if (ordered && !isOrderedListLine(current)) {
          break
        }
        if (!ordered && !isUnorderedListLine(current)) {
          break
        }
        items.push(current.replace(ordered ? /^\d+\.\s+/ : /^[-*]\s+/, '').trim())
        index += 1
      }
      blocks.push({ type: 'list', ordered, items })
      continue
    }

    const paragraphLines: string[] = []
    while (index < lines.length) {
      const current = lines[index]
      const currentTrimmed = current.trim()
      if (!currentTrimmed) {
        index += 1
        break
      }
      if (
        isHeadingLine(currentTrimmed) ||
        isRuleLine(currentTrimmed) ||
        isCodeFence(currentTrimmed) ||
        isTableLine(currentTrimmed) ||
        isQuoteLine(currentTrimmed) ||
        isOrderedListLine(currentTrimmed) ||
        isUnorderedListLine(currentTrimmed)
      ) {
        break
      }
      paragraphLines.push(currentTrimmed)
      index += 1
    }
    blocks.push({ type: 'paragraph', text: paragraphLines.join(' ') })
  }

  return blocks
}

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  const tokenPattern = /(`[^`]+`|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*)/g
  let lastIndex = 0
  let match: RegExpExecArray | null = tokenPattern.exec(text)

  while (match) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    if (match[1]?.startsWith('`')) {
      parts.push(
        <code
          key={`${keyPrefix}-code-${match.index}`}
          className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[0.92em] text-neon-cyan"
        >
          {match[1].slice(1, -1)}
        </code>,
      )
    } else if (match[2] && match[3]) {
      parts.push(
        <a
          key={`${keyPrefix}-link-${match.index}`}
          href={match[3]}
          target="_blank"
          rel="noreferrer"
          className="text-neon-cyan underline decoration-white/15 underline-offset-4 transition hover:text-white"
        >
          {match[2]}
        </a>,
      )
    } else if (match[4]) {
      parts.push(
        <strong key={`${keyPrefix}-strong-${match.index}`} className="font-semibold text-white/86">
          {match[4]}
        </strong>,
      )
    } else if (match[5]) {
      parts.push(
        <em key={`${keyPrefix}-em-${match.index}`} className="italic text-white/80">
          {match[5]}
        </em>,
      )
    }

    lastIndex = tokenPattern.lastIndex
    match = tokenPattern.exec(text)
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts
}

function headingScrollId(doc: CorpusDoc, slug: string): string {
  return `${doc.id}--${slug}`
}

function jumpToHeading(doc: CorpusDoc, slug: string) {
  const element = document.getElementById(headingScrollId(doc, slug))
  element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function headingClass(level: number): string {
  if (level === 1) {
    return 'text-2xl text-white/88'
  }
  if (level === 2) {
    return 'text-xl text-white/84'
  }
  if (level === 3) {
    return 'text-lg text-white/78'
  }
  return 'text-base text-white/72'
}

async function openSourceDocument(doc: CorpusDoc): Promise<SourceFeedback> {
  if (typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window) {
    await invoke('open_source_path', { relativePath: doc.path })
    return {
      tone: 'success',
      message: `Opened ${doc.path} with the system default application.`,
    }
  }

  const blob = new Blob([doc.content], { type: 'text/plain;charset=utf-8' })
  const blobUrl = URL.createObjectURL(blob)
  window.open(blobUrl, '_blank', 'noopener,noreferrer')
  window.setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000)
  return {
    tone: 'warning',
    message: 'Opened an embedded markdown snapshot in a new tab. Native source launch is available in the desktop shell.',
  }
}

function feedbackClass(tone: SourceFeedback['tone']): string {
  if (tone === 'success') {
    return 'text-neon-lime'
  }
  if (tone === 'warning') {
    return 'text-neon-amber'
  }
  if (tone === 'error') {
    return 'text-red-300'
  }
  return 'text-white/32'
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

function ActionButton({
  label,
  onClick,
  tone = 'default',
}: {
  label: string
  onClick: () => void
  tone?: 'default' | 'accent'
}) {
  const toneClass =
    tone === 'accent'
      ? 'border-neon-cyan/20 bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan/15'
      : 'border-white/10 bg-white/[0.04] text-white/58 hover:bg-white/[0.07] hover:text-white/82'

  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] transition ${toneClass}`}
    >
      {label}
    </button>
  )
}

function DocListItem({
  doc,
  selected,
  onSelect,
  onOpenSource,
}: {
  doc: CorpusDoc
  selected: boolean
  onSelect: () => void
  onOpenSource: () => void
}) {
  return (
    <article
      className={`rounded-2xl border p-4 transition ${
        selected
          ? 'border-neon-cyan/20 bg-neon-cyan/10'
          : 'border-white/8 bg-white/[0.03] hover:bg-white/[0.05]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <button className="min-w-0 flex-1 text-left" onClick={onSelect}>
          <p className="text-[9px] font-mono uppercase tracking-[0.22em] text-white/25">
            {SECTION_LABELS[doc.section]}
          </p>
          <h3 className="mt-2 text-sm font-mono uppercase tracking-[0.12em] text-white/84">
            {doc.title}
          </h3>
        </button>
        <StatusBadge doc={doc} />
      </div>

      <p className="mt-4 text-[11px] font-mono leading-relaxed text-white/38">{doc.summary}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-[9px] font-mono uppercase tracking-[0.16em] text-white/28">
        <span>{estimatedReadMinutes(doc.wordCount)} min read</span>
        <span>•</span>
        <span>{doc.headingCount} headings</span>
        <span>•</span>
        <span>{doc.wordCount} words</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <ActionButton label={selected ? 'Reading' : 'Read'} onClick={onSelect} tone={selected ? 'accent' : 'default'} />
        <ActionButton label="Open Source" onClick={onOpenSource} />
      </div>
    </article>
  )
}

function MarkdownDocument({ doc }: { doc: CorpusDoc }) {
  const blocks = parseMarkdown(doc)

  return (
    <article className="space-y-5 text-[13px] font-mono leading-7 text-white/68">
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          const Tag = `h${Math.min(block.level, 6)}` as keyof JSX.IntrinsicElements
          return (
            <Tag
              key={`${doc.id}-heading-${block.slug}-${index}`}
              id={headingScrollId(doc, block.slug)}
              className={`scroll-mt-24 font-mono uppercase tracking-[0.08em] ${headingClass(block.level)}`}
            >
              {renderInline(block.text, `${doc.id}-heading-inline-${index}`)}
            </Tag>
          )
        }

        if (block.type === 'paragraph') {
          return (
            <p key={`${doc.id}-paragraph-${index}`} className="text-white/64">
              {renderInline(block.text, `${doc.id}-paragraph-inline-${index}`)}
            </p>
          )
        }

        if (block.type === 'list') {
          const ListTag = block.ordered ? 'ol' : 'ul'
          return (
            <ListTag
              key={`${doc.id}-list-${index}`}
              className={`space-y-2 pl-5 text-white/64 ${block.ordered ? 'list-decimal' : 'list-disc'}`}
            >
              {block.items.map((item, itemIndex) => (
                <li key={`${doc.id}-list-item-${index}-${itemIndex}`}>
                  {renderInline(item, `${doc.id}-list-inline-${index}-${itemIndex}`)}
                </li>
              ))}
            </ListTag>
          )
        }

        if (block.type === 'code') {
          return (
            <div
              key={`${doc.id}-code-${index}`}
              className="rounded-2xl border border-white/8 bg-black/30 p-4 text-[12px] text-neon-cyan"
            >
              {block.language ? (
                <p className="mb-3 text-[9px] font-mono uppercase tracking-[0.18em] text-white/30">
                  {block.language}
                </p>
              ) : null}
              <pre className="whitespace-pre-wrap break-words">{block.code}</pre>
            </div>
          )
        }

        if (block.type === 'quote') {
          return (
            <blockquote
              key={`${doc.id}-quote-${index}`}
              className="border-l-2 border-neon-cyan/30 pl-4 text-white/58"
            >
              {renderInline(block.text, `${doc.id}-quote-inline-${index}`)}
            </blockquote>
          )
        }

        if (block.type === 'table') {
          return (
            <div
              key={`${doc.id}-table-${index}`}
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-[12px] text-white/58"
            >
              <pre className="whitespace-pre-wrap break-words">{block.lines.join('\n')}</pre>
            </div>
          )
        }

        return <div key={`${doc.id}-rule-${index}`} className="h-px bg-white/10" />
      })}
    </article>
  )
}

function ReaderPanel({
  doc,
  feedback,
  onOpenSource,
}: {
  doc: CorpusDoc
  feedback: SourceFeedback
  onOpenSource: () => void
}) {
  return (
    <aside className="backdrop-refract refract-lens glass-shimmer rounded-3xl p-5 xl:sticky xl:top-6 xl:max-h-[calc(100vh-7rem)] xl:overflow-y-auto">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/25">
            {SECTION_LABELS[doc.section]}
          </p>
          <h2 className="mt-2 text-base font-mono font-semibold uppercase tracking-[0.14em] text-white/88">
            {doc.title}
          </h2>
          <p className="mt-3 max-w-3xl text-[11px] font-mono leading-relaxed text-white/38">
            {doc.summary}
          </p>
        </div>
        <StatusBadge doc={doc} />
      </div>

      <div className="mt-5 flex flex-wrap gap-3 text-[9px] font-mono uppercase tracking-[0.16em] text-white/28">
        <span>{doc.path}</span>
        <span>•</span>
        <span>{estimatedReadMinutes(doc.wordCount)} min read</span>
        <span>•</span>
        <span>{doc.wordCount} words</span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <ActionButton label="Open Source" onClick={onOpenSource} tone="accent" />
      </div>

      <p className={`mt-3 text-[10px] font-mono leading-relaxed ${feedbackClass(feedback.tone)}`}>
        {feedback.message}
      </p>

      {doc.headings.length > 0 ? (
        <div className="mt-6 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
          <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/25">Outline</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {doc.headings.map((heading) => (
              <button
                key={`${doc.id}-${heading.slug}`}
                onClick={() => jumpToHeading(doc, heading.slug)}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-mono text-white/54 transition hover:bg-white/[0.08] hover:text-white/78"
                style={{ marginLeft: `${Math.max(0, heading.level - 1) * 6}px` }}
              >
                {heading.text}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-6 rounded-3xl border border-white/8 bg-black/15 p-5">
        <MarkdownDocument doc={doc} />
      </div>
    </aside>
  )
}

function ReaderWorkspace({
  docs,
  selectedDoc,
  onSelect,
  onOpenSource,
  feedback,
  emptyLabel,
}: {
  docs: CorpusDoc[]
  selectedDoc: CorpusDoc | null
  onSelect: (doc: CorpusDoc) => void
  onOpenSource: (doc: CorpusDoc) => void
  feedback: SourceFeedback
  emptyLabel: string
}) {
  if (!docs.length || !selectedDoc) {
    return (
      <article className="backdrop-refract refract-lens glass-shimmer rounded-3xl p-6">
        <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/25">No Matches</p>
        <p className="mt-4 max-w-2xl text-[11px] font-mono leading-relaxed text-white/34">{emptyLabel}</p>
      </article>
    )
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(18rem,0.95fr),minmax(24rem,1.35fr)]">
      <section className="space-y-4">
        {docs.map((doc) => (
          <DocListItem
            key={doc.id}
            doc={doc}
            selected={selectedDoc.id === doc.id}
            onSelect={() => onSelect(doc)}
            onOpenSource={() => onOpenSource(doc)}
          />
        ))}
      </section>

      <ReaderPanel doc={selectedDoc} feedback={feedback} onOpenSource={() => onOpenSource(selectedDoc)} />
    </div>
  )
}

function OverviewPanels({ corpus }: { corpus: CorpusPayload }) {
  const constitutionDocs = corpus.docs.filter((doc) => doc.section === 'constitution').length
  const foundingDocs = corpus.docs.filter((doc) => doc.section === 'founding_order').length
  const registryDocs = corpus.docs.filter((doc) => doc.section === 'registry').length
  const featuredDocs = corpus.docs.filter((doc) => corpus.featuredPaths.includes(doc.path))

  return (
    <>
      <div className="grid gap-4 xl:grid-cols-4">
        <MetricCard
          label="Schema"
          value={`${corpus.stats.articleCount} Articles`}
          detail={`${corpus.stats.schema} with ${corpus.stats.foundingOrderDocumentCount} founding-order documents.`}
        />
        <MetricCard
          label="Annexes"
          value={`${corpus.stats.annexCount}`}
          detail={`${corpus.stats.activeAnnexCount} active, ${corpus.stats.proposedAnnexCount} proposed, ${corpus.stats.referenceAnnexCount} reference.`}
        />
        <MetricCard
          label="Registries"
          value={`${corpus.stats.threatCount}/${corpus.stats.patchCount}`}
          detail="Threat and patch registries remain first-class live sources in the shell."
        />
        <MetricCard
          label="Validator"
          value={corpus.stats.validatorStatus.toUpperCase()}
          detail={`${corpus.stats.buildStamp} generated from the live repository corpus.`}
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
                {corpus.stats.reservedCommitmentCount}
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

function ValidationPanels({ corpus }: { corpus: CorpusPayload }) {
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      <MetricCard
        label="Corpus Check"
        value={corpus.stats.validatorStatus.toUpperCase()}
        detail="`python3 scripts/validate_corpus.py` passes with zero errors after the full-reader export pass."
      />
      <MetricCard
        label="Commitments"
        value={`${corpus.stats.commitmentCount}`}
        detail={`${corpus.stats.reservedCommitmentCount} commitments remain intentionally reserved behind activation gates.`}
      />
      <MetricCard
        label="Snapshot"
        value={corpus.stats.buildStamp}
        detail="Deterministic content fingerprint for the generated corpus snapshot."
      />
    </div>
  )
}

function EmptySettings() {
  return (
    <article className="backdrop-refract refract-lens glass-shimmer rounded-2xl p-6">
      <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/25">Next Useful Shell Work</p>
      <p className="mt-4 max-w-2xl text-[11px] font-mono leading-relaxed text-white/34">
        The core reader is now live. The next useful settings pass would be search persistence, document pinning,
        and explicit validator / build command shortcuts for local operators.
      </p>
    </article>
  )
}

export function Dashboard({ view, corpus, loadError }: DashboardProps) {
  const [query, setQuery] = useState('')
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null)
  const [sourceFeedback, setSourceFeedback] = useState<SourceFeedback>({
    tone: 'neutral',
    message: 'Read in-app, or open the source document directly from the reader toolbar.',
  })

  const deferredQuery = useDeferredValue(query)
  const baseDocs = corpus ? docsForView(view, corpus.docs, corpus.featuredPaths) : []
  const visibleDocs = baseDocs.filter((doc) => matchesQuery(doc, deferredQuery))
  const selectedDoc = visibleDocs.find((doc) => doc.id === selectedDocId) ?? visibleDocs[0] ?? null
  const meta = VIEW_META[view]

  useEffect(() => {
    if (!visibleDocs.length) {
      if (selectedDocId !== null) {
        startTransition(() => setSelectedDocId(null))
      }
      return
    }

    if (!selectedDocId || !visibleDocs.some((doc) => doc.id === selectedDocId)) {
      startTransition(() => setSelectedDocId(visibleDocs[0].id))
    }
  }, [selectedDocId, visibleDocs])

  useEffect(() => {
    setSourceFeedback({
      tone: 'neutral',
      message: selectedDoc
        ? `Reading ${selectedDoc.path}. Use “Open Source” to launch the backing file directly.`
        : 'Refine the filter or switch views to select a document.',
    })
  }, [selectedDoc?.id])

  async function handleOpenSource(doc: CorpusDoc) {
    setSourceFeedback({
      tone: 'neutral',
      message: `Opening ${doc.path}...`,
    })

    try {
      const feedback = await openSourceDocument(doc)
      setSourceFeedback(feedback)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown source-open failure.'
      setSourceFeedback({
        tone: 'error',
        message: `Could not open ${doc.path}: ${message}`,
      })
    }
  }

  function handleSelectDoc(doc: CorpusDoc) {
    startTransition(() => setSelectedDocId(doc.id))
  }

  if (loadError) {
    return (
      <div className="p-6">
        <article className="backdrop-refract refract-lens glass-shimmer rounded-3xl p-6">
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-red-300">Corpus Load Failure</p>
          <p className="mt-4 max-w-2xl text-[11px] font-mono leading-relaxed text-white/40">{loadError}</p>
        </article>
      </div>
    )
  }

  if (!corpus) {
    return (
      <div className="p-6">
        <article className="backdrop-refract refract-lens glass-shimmer rounded-3xl p-6">
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/25">Loading Corpus</p>
          <p className="mt-4 max-w-2xl text-[11px] font-mono leading-relaxed text-white/34">
            Pulling the generated constitutional corpus into the reader shell.
          </p>
        </article>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-white/22">
              Humane Constitution Reader
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
                placeholder="title, path, heading, status"
                className="mt-2 w-full border-0 bg-transparent p-0 text-[12px] font-mono text-white/72 outline-none placeholder:text-white/20"
              />
            </div>
          )}
        </header>

        {view === 'overview' && <OverviewPanels corpus={corpus} />}
        {view === 'validation' && <ValidationPanels corpus={corpus} />}
        {view === 'settings' && <EmptySettings />}

        {view !== 'settings' && (
          <ReaderWorkspace
            docs={visibleDocs}
            selectedDoc={selectedDoc}
            onSelect={handleSelectDoc}
            onOpenSource={handleOpenSource}
            feedback={sourceFeedback}
            emptyLabel="No documents match the current filter. Try a broader query or switch to a different corpus view."
          />
        )}
      </div>
    </div>
  )
}
