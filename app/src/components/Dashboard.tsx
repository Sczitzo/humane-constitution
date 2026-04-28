import { startTransition, useDeferredValue, useEffect, useRef, useState, type UIEvent as ReactUIEvent, type WheelEvent as ReactWheelEvent } from 'react'
import { invoke } from '@tauri-apps/api/core'
import type { CorpusDoc, CorpusPayload } from '../generated/corpus'
import type { AppView } from './Layout'

interface DashboardProps {
  view: AppView
  corpus: CorpusPayload | null
  loadError: string | null
  onViewChange: (view: AppView) => void
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

const VIEW_META: Record<AppView, { title: string; subtitle: string; railLabel: string }> = {
  home: {
    title: 'Humane Constitution',
    subtitle: 'A constitutional design for separating survival, markets, and civic power.',
    railLabel: 'Featured',
  },
  constitution: {
    title: 'Constitution & Founding Order',
    subtitle: 'The governing text, interpretive documents, and the foundational order that frames the entire corpus.',
    railLabel: 'Core Texts',
  },
  annexes: {
    title: 'Annex Corpus',
    subtitle: 'Detailed clauses, hardening instruments, and the operational extension layer behind the core charter.',
    railLabel: 'Annex Shelf',
  },
  registries: {
    title: 'Registries & Governance Logs',
    subtitle: 'Threats, patches, commitments, acceptance records, and public disclosures that harden the system over time.',
    railLabel: 'Registry Shelf',
  },
  topics: {
    title: 'Browse by Topic',
    subtitle: 'Find documents across the corpus by theme or instrument.',
    railLabel: 'Topics',
  },
  paths: {
    title: 'Reading Paths',
    subtitle: 'Curated sequences for different entry points into the corpus.',
    railLabel: 'Paths',
  },
  validation: {
    title: 'Validation State',
    subtitle: 'Prelaunch evidence gates, reserved commitments, and the integrity checks that govern activation readiness.',
    railLabel: 'Validation Shelf',
  },
  settings: {
    title: 'Shell Settings',
    subtitle: 'This reader now prioritizes the corpus itself; remaining shell work is convenience tooling around it.',
    railLabel: 'Settings',
  },
}

const SECTION_LABELS: Record<CorpusDoc['section'], string> = {
  constitution: 'Constitution',
  founding_order: 'Founding Order',
  registry: 'Registry',
  annex: 'Annex',
}

interface PaneScrollState {
  shelf: number
  reader: number
  outline: number
}

const EMPTY_PANE_SCROLL_STATE: PaneScrollState = {
  shelf: 0,
  reader: 0,
  outline: 0,
}

const KEYBOARD_NAV_VIEWS: AppView[] = [
  'home',
  'constitution',
  'annexes',
  'registries',
  'topics',
  'paths',
  'validation',
]

const PINNED_DOCS_STORAGE_KEY = 'humane-reader:pinned-docs'
const RECENT_DOCS_STORAGE_KEY = 'humane-reader:recent-docs'
const READING_MODE_STORAGE_KEY = 'humane-reader:reading-mode'
const CORPUS_STAMP_STORAGE_KEY = 'humane-reader:corpus-stamp'
const MAX_RECENT_DOCS = 8

function isTypingElement(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  const tagName = target.tagName
  return (
    target.isContentEditable ||
    tagName === 'INPUT' ||
    tagName === 'TEXTAREA' ||
    tagName === 'SELECT'
  )
}

function docsForView(view: AppView, docs: CorpusDoc[], featuredPaths: string[]): CorpusDoc[] {
  const featuredPathSet = new Set<string>(featuredPaths)

  if (view === 'home') {
    return docs.filter((doc) => featuredPathSet.has(doc.path))
  }
  if (view === 'topics' || view === 'paths') {
    return []
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

function viewForDoc(doc: CorpusDoc): AppView {
  if (doc.section === 'annex') {
    return 'annexes'
  }
  if (doc.section === 'registry') {
    return 'registries'
  }
  return 'constitution'
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

function normalizeComparable(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
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

function renderTextWithHighlights(text: string, query: string, keyPrefix: string): React.ReactNode[] {
  if (!query.trim()) {
    return [text]
  }

  const pattern = new RegExp(`(${escapeRegExp(query)})`, 'gi')
  const parts = text.split(pattern)
  const normalizedQuery = query.trim().toLowerCase()

  return parts.filter(Boolean).map((part, index) => {
    if (part.toLowerCase() === normalizedQuery) {
      return (
        <mark
          key={`${keyPrefix}-hit-${index}`}
          data-reader-search-hit="true"
          className="reader-search-hit"
        >
          {part}
        </mark>
      )
    }

    return <span key={`${keyPrefix}-text-${index}`}>{part}</span>
  })
}

function renderInline(text: string, keyPrefix: string, query = ''): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  const tokenPattern = /(`[^`]+`|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*)/g
  let lastIndex = 0
  let match: RegExpExecArray | null = tokenPattern.exec(text)

  while (match) {
    if (match.index > lastIndex) {
      parts.push(...renderTextWithHighlights(text.slice(lastIndex, match.index), query, `${keyPrefix}-plain-${match.index}`))
    }

    if (match[1]?.startsWith('`')) {
      parts.push(
        <code
          key={`${keyPrefix}-code-${match.index}`}
          className="rounded-md bg-[rgba(60,54,46,0.08)] px-1.5 py-0.5 font-mono text-[0.88em] text-[var(--ink-strong)]"
        >
          {renderTextWithHighlights(match[1].slice(1, -1), query, `${keyPrefix}-code-inline-${match.index}`)}
        </code>,
      )
    } else if (match[2] && match[3]) {
      parts.push(
        <a
          key={`${keyPrefix}-link-${match.index}`}
          href={match[3]}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-[var(--accent-deep)] underline decoration-[rgba(159,108,49,0.3)] underline-offset-4 transition hover:text-[var(--ink-strong)]"
        >
          {renderTextWithHighlights(match[2], query, `${keyPrefix}-link-inline-${match.index}`)}
        </a>,
      )
    } else if (match[4]) {
      parts.push(
        <strong key={`${keyPrefix}-strong-${match.index}`} className="font-semibold text-[var(--ink-strong)]">
          {renderTextWithHighlights(match[4], query, `${keyPrefix}-strong-inline-${match.index}`)}
        </strong>,
      )
    } else if (match[5]) {
      parts.push(
        <em key={`${keyPrefix}-em-${match.index}`} className="italic text-[var(--ink)]">
          {renderTextWithHighlights(match[5], query, `${keyPrefix}-em-inline-${match.index}`)}
        </em>,
      )
    }

    lastIndex = tokenPattern.lastIndex
    match = tokenPattern.exec(text)
  }

  if (lastIndex < text.length) {
    parts.push(...renderTextWithHighlights(text.slice(lastIndex), query, `${keyPrefix}-tail`))
  }

  return parts
}

function parseTable(lines: string[]): { headers: string[]; rows: string[][] } | null {
  if (lines.length < 2) {
    return null
  }

  const parseRow = (line: string) =>
    line
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((cell) => cell.trim())

  const headers = parseRow(lines[0])
  const rows = lines.slice(2).map(parseRow).filter((row) => row.some((cell) => cell.length > 0))

  if (!headers.length || !rows.length) {
    return null
  }

  return { headers, rows }
}

function headingScrollId(doc: CorpusDoc, slug: string): string {
  return `${doc.id}--${slug}`
}

function parseHeadingHash(hash: string): { docId: string; slug: string } | null {
  const normalized = hash.replace(/^#/, '')
  if (!normalized) {
    return null
  }

  const separatorIndex = normalized.indexOf('--')
  if (separatorIndex <= 0 || separatorIndex >= normalized.length - 2) {
    return null
  }

  return {
    docId: normalized.slice(0, separatorIndex),
    slug: normalized.slice(separatorIndex + 2),
  }
}

function escapeSelectorValue(value: string): string {
  if (typeof window !== 'undefined' && 'CSS' in window && typeof window.CSS.escape === 'function') {
    return window.CSS.escape(value)
  }

  return value.replace(/["\\]/g, '\\$&')
}

function selectedDocStorageKey(view: AppView): string {
  return `humane-reader:selected-doc:${view}`
}

function paneScrollStorageKey(view: AppView): string {
  return `humane-reader:pane-scroll:${view}`
}

function readStoredSelectedDocId(view: AppView): string | null {
  if (typeof window === 'undefined') {
    return null
  }

  return window.localStorage.getItem(selectedDocStorageKey(view))
}

function readStoredDocList(storageKey: string): string[] {
  if (typeof window === 'undefined') {
    return []
  }

  const raw = window.localStorage.getItem(storageKey)
  if (!raw) {
    return []
  }

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === 'string') : []
  } catch {
    return []
  }
}

function readStoredBoolean(storageKey: string): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  return window.localStorage.getItem(storageKey) === 'true'
}

function readStoredPaneScroll(view: AppView): PaneScrollState {
  if (typeof window === 'undefined') {
    return EMPTY_PANE_SCROLL_STATE
  }

  const raw = window.localStorage.getItem(paneScrollStorageKey(view))
  if (!raw) {
    return EMPTY_PANE_SCROLL_STATE
  }

  try {
    const parsed = JSON.parse(raw) as Partial<PaneScrollState>
    return {
      shelf: typeof parsed.shelf === 'number' ? parsed.shelf : 0,
      reader: typeof parsed.reader === 'number' ? parsed.reader : 0,
      outline: typeof parsed.outline === 'number' ? parsed.outline : 0,
    }
  } catch {
    return EMPTY_PANE_SCROLL_STATE
  }
}

function jumpToHeading(doc: CorpusDoc, slug: string) {
  const element = document.getElementById(headingScrollId(doc, slug))
  element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

async function copyHeadingLink(doc: CorpusDoc, slug: string): Promise<string> {
  const headingId = headingScrollId(doc, slug)
  const url = new URL(window.location.href)
  url.hash = headingId
  window.history.replaceState(null, '', url.toString())

  const value = url.toString()

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value)
      return value
    } catch {
      // Fall through to the textarea copy path when the browser denies clipboard access.
    }
  }

  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.setAttribute('readonly', 'true')
  textarea.style.position = 'absolute'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
  return value
}

function visibleHeadings(doc: CorpusDoc): CorpusDoc['headings'] {
  return doc.headings.filter((heading, index) => {
    if (index !== 0) {
      return true
    }
    return normalizeComparable(heading.text) !== normalizeComparable(doc.title)
  })
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
    message: 'Opened an embedded markdown snapshot in a new tab. Native source launch remains available in the desktop shell.',
  }
}

function feedbackClass(tone: SourceFeedback['tone']): string {
  if (tone === 'success') {
    return 'text-[var(--sage-deep)]'
  }
  if (tone === 'warning') {
    return 'text-[var(--accent-deep)]'
  }
  if (tone === 'error') {
    return 'text-[#8b2d2d]'
  }
  return 'text-[var(--ink-soft)]'
}

function routeVerticalWheelToSelf(event: ReactWheelEvent<HTMLElement>) {
  if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
    return
  }

  const node = event.currentTarget

  if (node.scrollHeight <= node.clientHeight) {
    return
  }

  event.preventDefault()
  node.scrollTop += event.deltaY
}

function MetaStat({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="border-l border-line pl-4">
      <p className="text-[11px] uppercase tracking-[0.14em] text-ink-faint">{label}</p>
      <p className="mt-1 font-serif text-[1.3rem] leading-tight text-ink-strong">{value}</p>
    </div>
  )
}

function ActionButton({
  label,
  onClick,
  tone = 'default',
  disabled = false,
  testId,
}: {
  label: string
  onClick: () => void
  tone?: 'default' | 'accent'
  disabled?: boolean
  testId?: string
}) {
  const toneClass =
    tone === 'accent'
      ? 'border-[rgba(159,108,49,0.4)] bg-[rgba(230,207,172,0.35)] text-accent-deep hover:bg-[rgba(230,207,172,0.55)]'
      : 'border-line bg-[rgba(251,246,236,0.5)] text-ink-soft hover:text-ink-strong hover:bg-[rgba(251,246,236,0.85)]'

  return (
    <button
      data-testid={testId}
      type="button"
      disabled={disabled}
      aria-disabled={disabled || undefined}
      onClick={onClick}
      className={`focus-ring inline-flex h-8 min-w-8 items-center justify-center rounded border px-2.5 font-serif text-[12px] transition ${
        disabled ? 'cursor-not-allowed opacity-50' : ''
      } ${toneClass}`}
    >
      {label}
    </button>
  )
}

function DocumentRow({
  doc,
  selected,
  pinned = false,
  onSelect,
}: {
  doc: CorpusDoc
  selected: boolean
  pinned?: boolean
  onSelect: () => void
  onOpenSource: () => void
}) {
  return (
    <button
      data-testid={`document-row-${doc.id}`}
      data-selected={selected ? 'true' : 'false'}
      type="button"
      onClick={onSelect}
      className={`focus-ring group block w-full border-l-2 py-3 pl-4 pr-2 text-left transition ${
        selected
          ? 'border-l-accent bg-[rgba(251,246,236,0.6)]'
          : 'border-l-transparent hover:border-l-line hover:bg-[rgba(251,246,236,0.3)]'
      }`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[11px] uppercase tracking-[0.14em] text-ink-faint">
          {SECTION_LABELS[doc.section]}
        </p>
        {pinned ? (
          <span aria-label="Pinned" title="Pinned" className="text-[11px] text-accent-deep">
            ●
          </span>
        ) : null}
      </div>
      <h3
        className={`mt-1 font-serif text-[1.05rem] leading-snug ${
          selected ? 'text-ink-strong' : 'text-ink group-hover:text-ink-strong'
        }`}
      >
        {doc.title}
      </h3>
      {doc.summary ? (
        <p className="mt-1 line-clamp-2 text-[13px] leading-6 text-ink-soft">{doc.summary}</p>
      ) : null}
      <p className="mt-2 text-[11px] text-ink-faint">
        {estimatedReadMinutes(doc.wordCount)} min · {doc.headingCount} headings
      </p>
    </button>
  )
}

function QuickAccessSection({
  label,
  testId,
  docs,
  onSelect,
}: {
  label: string
  testId: string
  docs: CorpusDoc[]
  onSelect: (doc: CorpusDoc) => void
}) {
  if (!docs.length) {
    return null
  }

  return (
    <section data-testid={testId} className="border-t border-line pl-4 pr-2 pt-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">{label}</p>
      <ul className="mt-2 flex flex-col">
        {docs.map((doc) => (
          <li key={`${testId}-${doc.id}`}>
            <button
              data-testid={`${testId}-${doc.id}`}
              type="button"
              onClick={() => onSelect(doc)}
              className="focus-ring group block w-full py-1.5 text-left transition"
            >
              <span className="block text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                {SECTION_LABELS[doc.section]}
              </span>
              <span className="mt-0.5 block line-clamp-2 font-serif text-[13.5px] leading-snug text-ink group-hover:text-ink-strong">
                {doc.title}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

function MarkdownDocument({
  doc,
  searchQuery,
  copiedHeadingSlug,
  onCopyHeadingLink,
}: {
  doc: CorpusDoc
  searchQuery: string
  copiedHeadingSlug: string | null
  onCopyHeadingLink: (slug: string) => void
}) {
  const blocks = parseMarkdown(doc)
  const hiddenFirstHeading = normalizeComparable(doc.title)

  return (
    <article className="reader-prose">
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          if (index === 0 && normalizeComparable(block.text) === hiddenFirstHeading) {
            return null
          }

          const Tag = `h${Math.min(block.level, 6)}` as keyof JSX.IntrinsicElements
          return (
            <div key={`${doc.id}-heading-wrap-${block.slug}-${index}`} className="group/heading relative">
              <Tag
                id={headingScrollId(doc, block.slug)}
                className={`scroll-mt-24 pr-20 ${block.level === 1 ? 'reader-h1' : ''} ${
                  block.level === 2 ? 'reader-h2' : ''
                } ${block.level === 3 ? 'reader-h3' : ''} ${
                  block.level >= 4 ? 'reader-h4' : ''
                }`}
              >
                {renderInline(block.text, `${doc.id}-heading-inline-${index}`, searchQuery)}
              </Tag>
              <button
                type="button"
                data-testid={`copy-heading-link-${block.slug}`}
                onClick={() => onCopyHeadingLink(block.slug)}
                className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full border border-[rgba(60,54,46,0.14)] bg-[rgba(253,249,242,0.9)] px-3 py-1.5 text-[9px] font-mono uppercase tracking-[0.18em] text-[var(--ink-faint)] opacity-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] transition group-hover/heading:opacity-100 hover:border-[rgba(159,108,49,0.24)] hover:text-[var(--accent-deep)] focus:opacity-100"
              >
                {copiedHeadingSlug === block.slug ? 'Copied' : 'Copy link'}
              </button>
            </div>
          )
        }

        if (block.type === 'paragraph') {
          return (
            <p key={`${doc.id}-paragraph-${index}`}>
              {renderInline(block.text, `${doc.id}-paragraph-inline-${index}`, searchQuery)}
            </p>
          )
        }

        if (block.type === 'list') {
          const ListTag = block.ordered ? 'ol' : 'ul'
          return (
            <ListTag
              key={`${doc.id}-list-${index}`}
              className={block.ordered ? 'reader-list reader-list-ordered' : 'reader-list'}
            >
              {block.items.map((item, itemIndex) => (
                <li key={`${doc.id}-list-item-${index}-${itemIndex}`}>
                  {renderInline(item, `${doc.id}-list-inline-${index}-${itemIndex}`, searchQuery)}
                </li>
              ))}
            </ListTag>
          )
        }

        if (block.type === 'code') {
          return (
            <div key={`${doc.id}-code-${index}`} className="reader-code">
              {block.language ? <p className="reader-code-label">{block.language}</p> : null}
              <pre className="whitespace-pre-wrap break-words">{block.code}</pre>
            </div>
          )
        }

        if (block.type === 'quote') {
          return (
            <blockquote key={`${doc.id}-quote-${index}`} className="reader-quote">
              {renderInline(block.text, `${doc.id}-quote-inline-${index}`, searchQuery)}
            </blockquote>
          )
        }

        if (block.type === 'rule') {
          return (
            <hr
              key={`${doc.id}-rule-${index}`}
              aria-hidden="true"
              className="reader-rule"
            />
          )
        }

        if (block.type === 'table') {
          const parsedTable = parseTable(block.lines)
          if (!parsedTable) {
            return (
              <div key={`${doc.id}-table-fallback-${index}`} className="reader-code">
                <pre className="whitespace-pre-wrap break-words">{block.lines.join('\n')}</pre>
              </div>
            )
          }

          return (
            <div key={`${doc.id}-table-${index}`} className="reader-table-wrap">
              <table className="reader-table">
                <thead>
                  <tr>
                    {parsedTable.headers.map((header, headerIndex) => (
                      <th key={`${doc.id}-table-header-${index}-${headerIndex}`}>
                        {renderInline(header, `${doc.id}-table-header-inline-${index}-${headerIndex}`, searchQuery)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {parsedTable.rows.map((row, rowIndex) => (
                    <tr key={`${doc.id}-table-row-${index}-${rowIndex}`}>
                      {row.map((cell, cellIndex) => (
                        <td key={`${doc.id}-table-cell-${index}-${rowIndex}-${cellIndex}`}>
                          {renderInline(cell, `${doc.id}-table-cell-inline-${index}-${rowIndex}-${cellIndex}`, searchQuery)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }

        return <div key={`${doc.id}-rule-${index}`} className="my-10 h-px bg-[rgba(60,54,46,0.12)]" />
      })}
    </article>
  )
}

function ReaderOutline({
  doc,
  independentScroll = false,
  activeHeadingSlug,
}: {
  doc: CorpusDoc
  independentScroll?: boolean
  activeHeadingSlug: string | null
}) {
  const headings = visibleHeadings(doc)
  if (!headings.length) {
    return null
  }

  return (
    <nav
      data-testid="reader-outline-content"
      aria-label="Outline"
      className={`${independentScroll ? 'h-full overflow-y-auto' : 'self-start'}`}
    >
      <p className="text-[11px] uppercase tracking-[0.14em] text-ink-faint">On this page</p>
      <div className="mt-3 flex flex-col gap-px">
        {headings.map((heading) => (
          <button
            key={`${doc.id}-${heading.slug}`}
            data-testid={`outline-heading-${heading.slug}`}
            data-heading-slug={heading.slug}
            data-active-heading={activeHeadingSlug === heading.slug ? 'true' : 'false'}
            type="button"
            aria-current={activeHeadingSlug === heading.slug ? 'location' : undefined}
            onClick={() => jumpToHeading(doc, heading.slug)}
            className={`focus-ring border-l-2 py-1 pr-2 text-left text-[12px] leading-snug transition ${
              activeHeadingSlug === heading.slug
                ? 'border-l-accent text-accent-deep'
                : 'border-l-transparent text-ink-soft hover:border-l-line hover:text-ink-strong'
            }`}
            style={{ paddingLeft: `${10 + Math.max(0, heading.level - 1) * 10}px` }}
          >
            {heading.text}
          </button>
        ))}
      </div>
    </nav>
  )
}

function ReaderPanel({
  doc,
  feedback,
  onOpenSource,
  pinned,
  onTogglePinned,
  readingMode,
  onToggleReadingMode,
  copiedHeadingSlug,
  onCopyHeadingLink,
  searchQuery,
  onSearchChange,
  searchInputRef,
  matchCount,
  currentMatchIndex,
  onJumpToPreviousMatch,
  onJumpToNextMatch,
  allDocs,
  recentIds,
  pinnedIds,
  onSelectDoc,
}: {
  doc: CorpusDoc
  feedback: SourceFeedback
  onOpenSource: () => void
  pinned: boolean
  onTogglePinned: () => void
  readingMode: boolean
  onToggleReadingMode: () => void
  copiedHeadingSlug: string | null
  onCopyHeadingLink: (slug: string) => void
  searchQuery: string
  onSearchChange: (value: string) => void
  searchInputRef: (node: HTMLInputElement | null) => void
  matchCount: number
  currentMatchIndex: number
  onJumpToPreviousMatch: () => void
  onJumpToNextMatch: () => void
  allDocs: CorpusDoc[]
  recentIds: string[]
  pinnedIds: string[]
  onSelectDoc: (doc: CorpusDoc) => void
}) {
  return (
    <section id="reader-panel-start" data-testid="reader-panel" className="space-y-8">
      <header className="border-b border-line pb-6">
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">
            {SECTION_LABELS[doc.section]}
          </p>
          <p className="font-mono text-[11px] text-ink-faint">{doc.path}</p>
        </div>
        <h2
          data-testid="reader-title"
          className="mt-3 font-serif text-[2.1rem] leading-tight text-ink-strong sm:text-[2.6rem]"
        >
          {doc.title}
        </h2>
        {doc.summary ? (
          <p className="mt-4 max-w-[40rem] text-[15px] leading-7 text-ink-soft">{doc.summary}</p>
        ) : null}

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-ink-faint">
          <span>{estimatedReadMinutes(doc.wordCount)} min read</span>
          <span aria-hidden="true">·</span>
          <span>{doc.headingCount} headings</span>
          <span aria-hidden="true">·</span>
          <span>{doc.wordCount.toLocaleString()} words</span>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <ActionButton
            label={pinned ? 'Unpin' : 'Pin'}
            onClick={onTogglePinned}
            tone={pinned ? 'accent' : 'default'}
          />
          <ActionButton
            label={readingMode ? 'Exit reading mode' : 'Reading mode'}
            onClick={onToggleReadingMode}
            tone={readingMode ? 'accent' : 'default'}
            testId="reading-mode-toggle"
          />
          <ActionButton label="Open source" onClick={onOpenSource} />

          <div className="ml-auto flex w-full items-center gap-2 sm:w-auto">
            <label htmlFor="reader-search" className="sr-only">
              Search this document
            </label>
            <input
              id="reader-search"
              ref={searchInputRef}
              data-testid="reader-search-input"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Find in text…"
              className="focus-ring w-full min-w-0 rounded border border-line bg-[rgba(251,246,236,0.6)] px-3 py-1.5 font-serif text-[14px] text-ink-strong placeholder:text-ink-faint sm:w-56"
            />
            <span
              data-testid="reader-search-status"
              className="shrink-0 text-[11px] text-ink-faint"
            >
              {searchQuery.trim()
                ? matchCount
                  ? `${currentMatchIndex + 1}/${matchCount}`
                  : '—'
                : ''}
            </span>
            <ActionButton
              label="↑"
              onClick={onJumpToPreviousMatch}
              disabled={!matchCount}
              testId="reader-search-prev"
            />
            <ActionButton
              label="↓"
              onClick={onJumpToNextMatch}
              disabled={!matchCount}
              testId="reader-search-next"
            />
          </div>
        </div>

        {feedback.message ? (
          <p className={`mt-4 text-[12px] leading-6 ${feedbackClass(feedback.tone)}`}>
            {feedback.message}
          </p>
        ) : null}
      </header>

      <article data-testid="reader-paper-shell">
        <div
          data-testid="reader-document"
          className={`mx-auto ${readingMode ? 'max-w-[44rem]' : 'max-w-[42rem]'}`}
        >
          <MarkdownDocument
            doc={doc}
            searchQuery={searchQuery}
            copiedHeadingSlug={copiedHeadingSlug}
            onCopyHeadingLink={onCopyHeadingLink}
          />
          <ReadNext
            current={doc}
            allDocs={allDocs}
            recentIds={recentIds}
            pinnedIds={pinnedIds}
            onSelect={onSelectDoc}
          />
        </div>
      </article>
    </section>
  )
}

/* ============================================================
 * Read-next suggestion engine
 * ============================================================ */

const STOP_WORDS = new Set([
  'the', 'and', 'for', 'that', 'with', 'this', 'from', 'are', 'was',
  'been', 'have', 'has', 'will', 'its', 'all', 'any', 'can', 'may',
  'not', 'but', 'each', 'into', 'over', 'such', 'than', 'then', 'they',
  'which', 'where', 'when', 'how', 'what', 'their', 'there', 'these',
  'those', 'shall', 'must', 'also', 'only', 'within', 'under', 'upon',
])

function extractKeywords(doc: CorpusDoc): Set<string> {
  const words = doc.headings
    .map((h) => h.text)
    .join(' ')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 4 && !STOP_WORDS.has(w))
  return new Set(words)
}

interface Suggestion {
  doc: CorpusDoc
  reason: string
}

function buildSuggestions(
  current: CorpusDoc,
  allDocs: CorpusDoc[],
  recentIds: string[],
  pinnedIds: string[],
): Suggestion[] {
  const recentSet = new Set(recentIds)
  const pinnedSet = new Set(pinnedIds)
  const currentKeywords = extractKeywords(current)
  const candidates = allDocs.filter((d) => d.id !== current.id)
  const results: Suggestion[] = []
  const used = new Set<string>()

  function push(s: Suggestion) {
    if (!used.has(s.doc.id)) {
      used.add(s.doc.id)
      results.push(s)
    }
  }

  // 1. Pinned — always surface, reader explicitly saved these
  for (const doc of candidates) {
    if (results.length >= 4) break
    if (pinnedSet.has(doc.id)) {
      push({ doc, reason: 'In your reading list' })
    }
  }

  // 2. Same-section, not recently read — "Next in [section]"
  const sectionOrder = candidates.filter(
    (d) => d.section === current.section && !recentSet.has(d.id),
  )
  for (const doc of sectionOrder) {
    if (results.length >= 4) break
    push({ doc, reason: `Next in ${SECTION_LABELS[doc.section]}` })
  }

  // 3. Heading keyword overlap — find best match not yet added
  if (results.length < 4 && currentKeywords.size > 0) {
    const scored = candidates
      .filter((d) => !used.has(d.id))
      .map((doc) => {
        const kws = extractKeywords(doc)
        const shared = [...currentKeywords].filter((k) => kws.has(k))
        return { doc, shared }
      })
      .filter((x) => x.shared.length > 0)
      .sort((a, b) => b.shared.length - a.shared.length)

    for (const { doc, shared } of scored) {
      if (results.length >= 4) break
      const topic = shared
        .slice(0, 2)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(', ')
      push({ doc, reason: `Related: ${topic}` })
    }
  }

  // 4. Recently visited from a different section — cross-section continuity
  if (results.length < 4) {
    for (const id of recentIds) {
      if (results.length >= 4) break
      const doc = candidates.find((d) => d.id === id && d.section !== current.section)
      if (doc) push({ doc, reason: 'You were reading this' })
    }
  }

  // 5. Fallback: any unread same-section doc, then any doc
  if (results.length < 4) {
    for (const doc of candidates) {
      if (results.length >= 4) break
      push({ doc, reason: `Next in ${SECTION_LABELS[doc.section]}` })
    }
  }

  return results.slice(0, 4)
}

function ReadNext({
  current,
  allDocs,
  recentIds,
  pinnedIds,
  onSelect,
}: {
  current: CorpusDoc
  allDocs: CorpusDoc[]
  recentIds: string[]
  pinnedIds: string[]
  onSelect: (doc: CorpusDoc) => void
}) {
  const suggestions = buildSuggestions(current, allDocs, recentIds, pinnedIds)
  if (!suggestions.length) return null

  return (
    <aside
      data-testid="read-next"
      className="mt-16 border-t border-line pt-10"
    >
      <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
        Continue reading
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {suggestions.map(({ doc, reason }) => (
          <button
            key={doc.id}
            type="button"
            data-testid={`read-next-${doc.id}`}
            onClick={() => onSelect(doc)}
            className="focus-ring group flex flex-col rounded-lg border border-line bg-paper-strong p-4 text-left transition hover:border-[rgba(159,108,49,0.4)] hover:shadow-sm"
          >
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-2 py-0.5 font-sans text-[10px] tracking-[0.02em] text-ink-faint">
              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full bg-accent opacity-70"
              />
              {reason}
            </span>
            <h3 className="font-serif text-[0.97rem] font-semibold leading-snug text-ink-strong group-hover:text-[var(--accent-deep)]">
              {doc.title}
            </h3>
            <p className="mt-auto pt-2 text-[11px] text-ink-faint">
              {SECTION_LABELS[doc.section]} · {estimatedReadMinutes(doc.wordCount)} min
            </p>
          </button>
        ))}
      </div>
    </aside>
  )
}

function ReaderWorkspace({
  docs,
  allDocs,
  selectedDoc,
  pinnedDocIds,
  pinnedDocs,
  recentDocs,
  recentIds,
  onSelect,
  onSelectQuickDoc,
  onTogglePinned,
  readingMode,
  onToggleReadingMode,
  onOpenSource,
  feedback,
  railLabel,
  emptyLabel,
  independentScroll = false,
  shelfPaneRef,
  readerPaneRef,
  outlinePaneRef,
  onPaneScroll,
  activeHeadingSlug,
  copiedHeadingSlug,
  onCopyHeadingLink,
  searchQuery,
  onSearchChange,
  searchInputRef,
  matchCount,
  currentMatchIndex,
  onJumpToPreviousMatch,
  onJumpToNextMatch,
}: {
  docs: CorpusDoc[]
  allDocs: CorpusDoc[]
  selectedDoc: CorpusDoc | null
  pinnedDocIds: string[]
  pinnedDocs: CorpusDoc[]
  recentDocs: CorpusDoc[]
  recentIds: string[]
  onSelect: (doc: CorpusDoc) => void
  onSelectQuickDoc: (doc: CorpusDoc) => void
  onTogglePinned: () => void
  readingMode: boolean
  onToggleReadingMode: () => void
  onOpenSource: (doc: CorpusDoc) => void
  feedback: SourceFeedback
  railLabel: string
  emptyLabel: string
  independentScroll?: boolean
  shelfPaneRef: (node: HTMLElement | null) => void
  readerPaneRef: (node: HTMLDivElement | null) => void
  outlinePaneRef: (node: HTMLDivElement | null) => void
  onPaneScroll: (event: ReactUIEvent<HTMLElement>) => void
  activeHeadingSlug: string | null
  copiedHeadingSlug: string | null
  onCopyHeadingLink: (slug: string) => void
  searchQuery: string
  onSearchChange: (value: string) => void
  searchInputRef: (node: HTMLInputElement | null) => void
  matchCount: number
  currentMatchIndex: number
  onJumpToPreviousMatch: () => void
  onJumpToNextMatch: () => void
}) {
  void railLabel
  if (!docs.length || !selectedDoc) {
    return (
      <article className="border-l-2 border-line py-6 pl-5">
        <p className="font-serif text-[15px] leading-7 text-ink-soft">{emptyLabel}</p>
      </article>
    )
  }

  return (
    <div
      data-reading-mode={readingMode ? 'true' : 'false'}
      className={`grid gap-10 ${
        readingMode
          ? 'xl:grid-cols-[minmax(0,1fr)]'
          : 'xl:grid-cols-[16rem_minmax(0,1fr)] 2xl:grid-cols-[16rem_minmax(0,1fr)_13rem]'
      } ${independentScroll || readingMode ? 'items-start' : ''}`}
    >
      <section
        ref={shelfPaneRef}
        data-testid="shelf-pane"
        aria-label="Document index"
        className={`${readingMode ? 'hidden' : ''} ${
          independentScroll
            ? 'xl:sticky xl:top-20 xl:max-h-[calc(100vh-7rem)] xl:overflow-y-auto xl:overscroll-contain xl:pr-1'
            : 'xl:sticky xl:top-20 xl:self-start xl:max-h-[calc(100vh-7rem)] xl:overflow-y-auto xl:overscroll-contain xl:pr-1'
        }`}
        onScroll={onPaneScroll}
        onWheelCapture={routeVerticalWheelToSelf}
      >
        <p className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">
          {docs.length} {docs.length === 1 ? 'document' : 'documents'}
        </p>
        <div data-testid="shelf-list" className="mt-3 -ml-4 space-y-px">
          {pinnedDocs.length > 0 ? (
            <QuickAccessSection
              label="Pinned"
              testId="quick-access-pinned"
              docs={pinnedDocs}
              onSelect={onSelectQuickDoc}
            />
          ) : null}
          {recentDocs.length > 0 ? (
            <QuickAccessSection
              label="Recent"
              testId="quick-access-recent"
              docs={recentDocs}
              onSelect={onSelectQuickDoc}
            />
          ) : null}
          <div
            className={
              pinnedDocs.length || recentDocs.length ? 'border-t border-line pt-3 mt-3' : ''
            }
          >
            {docs.map((doc) => (
              <DocumentRow
                key={doc.id}
                doc={doc}
                selected={selectedDoc.id === doc.id}
                pinned={pinnedDocIds.includes(doc.id)}
                onSelect={() => onSelect(doc)}
                onOpenSource={() => onOpenSource(doc)}
              />
            ))}
          </div>
        </div>
      </section>

      <div
        key={`reader-pane-${selectedDoc.id}`}
        ref={readerPaneRef}
        data-testid="reader-scroll-pane"
        className={`min-w-0 ${readingMode ? 'mx-auto w-full max-w-[44rem]' : ''} ${
          independentScroll
            ? 'xl:sticky xl:top-20 xl:max-h-[calc(100vh-7rem)] xl:overflow-y-auto xl:overscroll-contain xl:pr-1'
            : ''
        }`}
        onScroll={independentScroll ? onPaneScroll : undefined}
        onWheelCapture={independentScroll ? routeVerticalWheelToSelf : undefined}
      >
        <ReaderPanel
          doc={selectedDoc}
          feedback={feedback}
          pinned={pinnedDocIds.includes(selectedDoc.id)}
          onTogglePinned={onTogglePinned}
          readingMode={readingMode}
          onToggleReadingMode={onToggleReadingMode}
          copiedHeadingSlug={copiedHeadingSlug}
          onCopyHeadingLink={onCopyHeadingLink}
          onOpenSource={() => onOpenSource(selectedDoc)}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          searchInputRef={searchInputRef}
          matchCount={matchCount}
          currentMatchIndex={currentMatchIndex}
          onJumpToPreviousMatch={onJumpToPreviousMatch}
          onJumpToNextMatch={onJumpToNextMatch}
          allDocs={allDocs}
          recentIds={recentIds}
          pinnedIds={pinnedDocIds}
          onSelectDoc={onSelectQuickDoc}
        />
      </div>

      <aside
        key={`outline-pane-${selectedDoc.id}`}
        ref={outlinePaneRef}
        data-testid="outline-scroll-pane"
        aria-label="Document outline"
        className={`${readingMode ? 'hidden' : 'hidden 2xl:block'} ${
          independentScroll
            ? '2xl:sticky 2xl:top-20 2xl:max-h-[calc(100vh-7rem)] 2xl:overflow-y-auto 2xl:overscroll-contain 2xl:pr-1'
            : ''
        }`}
        onScroll={independentScroll ? onPaneScroll : undefined}
        onWheelCapture={independentScroll ? routeVerticalWheelToSelf : undefined}
      >
        <div className={independentScroll ? '' : 'sticky top-20'}>
          <ReaderOutline doc={selectedDoc} independentScroll={false} activeHeadingSlug={activeHeadingSlug} />
        </div>
      </aside>
    </div>
  )
}

/* ============================================================
 * Inline document-link primitive.
 * ============================================================ */

function DocLink({
  path,
  corpus,
  onJump,
  children,
}: {
  path: string
  corpus: CorpusPayload
  onJump: (doc: CorpusDoc) => void
  children: React.ReactNode
}) {
  const doc = corpus.docs.find((entry) => entry.path === path)
  if (!doc) {
    return <span className="text-ink-faint italic">{children}</span>
  }
  return (
    <button
      type="button"
      data-testid={`doclink-${doc.id}`}
      onClick={() => onJump(doc)}
      className="focus-ring inline rounded-sm border-b border-accent/45 font-medium text-accent-deep transition hover:border-accent hover:text-[var(--accent)]"
      style={{ borderBottomColor: 'rgba(159, 108, 49, 0.45)' }}
    >
      {children}
    </button>
  )
}

interface HomeCard {
  path: string
  label: string
  description: string
  tag: string
}

const HOME_CARDS: HomeCard[] = [
  {
    path: 'docs/public/01_overview.md',
    label: 'One-Page Overview',
    description: 'The core diagnosis: why survival, markets, and civic power must be separated.',
    tag: 'Start here',
  },
  {
    path: 'docs/public/03_readiness.md',
    label: 'Readiness Guide',
    description: 'What is only designed, what still needs evidence, and which objections have the most pressure.',
    tag: 'Skeptics',
  },
  {
    path: 'docs/constitution/Humane_Constitution.md',
    label: 'Governing Text',
    description: 'The constitutional source of truth — lean by intention, extensible by annex.',
    tag: 'Core',
  },
  {
    path: 'docs/annexes/INDEX.md',
    label: 'Annex Index',
    description: 'Operational mechanics and detailed clauses that extend the charter without bloating it.',
    tag: 'Operational',
  },
  {
    path: 'docs/governance/Threat_Register.md',
    label: 'Threat Register',
    description: 'Every adversarial failure mode found by red-teaming, kept visible and open.',
    tag: 'Adversarial',
  },
  {
    path: 'docs/governance/Patch_Log.md',
    label: 'Patch Log',
    description: 'Structural responses to threats — the living record of how the design hardens over time.',
    tag: 'Adversarial',
  },
  {
    path: 'docs/public/04_white_paper.md',
    label: 'White Paper',
    description: 'The longer public-facing argument for the constitutional design.',
    tag: 'Public',
  },
  {
    path: 'docs/public/05_rights_layer.md',
    label: 'Rights Layer',
    description: 'Plain-language statement of what the design protects for ordinary people.',
    tag: 'Public',
  },
  {
    path: 'docs/constitution/INVARIANTS.md',
    label: 'Seven Invariants',
    description: 'Tier 1 protected commitments that cannot be amended without a refounding convention.',
    tag: 'Core',
  },
]

function HomeView({
  corpus,
  onJump,
}: {
  corpus: CorpusPayload
  onJump: (doc: CorpusDoc) => void
}) {
  return (
    <div className="space-y-10">
      <p className="max-w-[44rem] font-serif text-[1.05rem] leading-[1.78] text-ink">
        A constitutional design for separating survival, markets, and civic power so that wealth
        cannot quietly become coercion. Choose a starting point below, or use{' '}
        <span className="font-medium text-ink-strong">Topics</span> and{' '}
        <span className="font-medium text-ink-strong">Reading Paths</span> to navigate by theme.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {HOME_CARDS.map((card) => {
          const doc = corpus.docs.find((d) => d.path === card.path)
          return (
            <button
              key={card.path}
              type="button"
              onClick={() => doc && onJump(doc)}
              disabled={!doc}
              className={`focus-ring group flex flex-col rounded-lg border border-line bg-paper-strong p-5 text-left transition ${
                doc
                  ? 'hover:border-[rgba(159,108,49,0.4)] hover:shadow-sm'
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <span className="topic-tag mb-3 self-start">{card.tag}</span>
              <h3 className="font-serif text-[1.05rem] font-semibold leading-snug text-ink-strong group-hover:text-[var(--accent-deep)]">
                {card.label}
              </h3>
              <p className="mt-2 text-[13px] leading-6 text-ink-soft">{card.description}</p>
              {doc && (
                <p className="mt-auto pt-3 text-[11px] text-ink-faint">
                  {estimatedReadMinutes(doc.wordCount)} min · {doc.headingCount} headings
                </p>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

const SECTION_INTRO: Partial<Record<AppView, (corpus: CorpusPayload, link: (path: string, children: React.ReactNode) => JSX.Element) => JSX.Element>> = {
  constitution: (_, link) => (
    <p>
      Begin with the{' '}
      {link('docs/constitution/Humane_Constitution.md', 'governing text')}. The{' '}
      {link('docs/constitution/INVARIANTS.md', 'invariants')} state what cannot be amended without
      a refounding convention; the{' '}
      {link('docs/constitution/SPECIFICATIONS.md', 'specifications')} fix the formal state machine
      every implementation must respect; the{' '}
      {link('docs/constitution/Acceptance_Protocol.md', 'acceptance protocol')} governs how
      patches reach operation. Founding-order commitments live with the rest of the founding
      material below.
    </p>
  ),
  annexes: (_, link) => (
    <p>
      The annex corpus extends the lean charter without bloating it. Each annex is operational
      detail bound to a specific question. Use the{' '}
      {link('docs/annexes/INDEX.md', 'annex index')} to navigate by topic, or filter the shelf
      below.
    </p>
  ),
  registries: (_, link) => (
    <p>
      The {link('docs/governance/Threat_Register.md', 'threat register')} catalogues every
      adversarial failure mode the project has surfaced; the{' '}
      {link('docs/governance/Patch_Log.md', 'patch log')} records the responses. The{' '}
      {link('docs/governance/Claims_Evidence_Register.md', 'claims and evidence register')}{' '}
      tracks what the project is allowed to assert; the{' '}
      {link('docs/governance/Pilot_Evidence_Roadmap.md', 'pilot evidence roadmap')} names what
      must be tested before any scale claim.
    </p>
  ),
  validation: (_, link) => (
    <p>
      Validation is the activation shelf — it keeps the remaining pre-launch uncertainty visible.
      The{' '}
      {link('docs/governance/Founding_Preactivation_Disclosure.md', 'pre-activation disclosure')}{' '}
      states what must be true before any rollout begins. The{' '}
      {link('founding/commitments.md', 'founding commitments')} register holds the numerical
      lock-file every implementation is bound to.
    </p>
  ),
}

function SectionIntro({
  view,
  corpus,
  onJump,
}: {
  view: AppView
  corpus: CorpusPayload
  onJump: (doc: CorpusDoc) => void
}) {
  const builder = SECTION_INTRO[view]
  if (!builder) {
    return null
  }
  const link = (path: string, children: React.ReactNode) => (
    <DocLink path={path} corpus={corpus} onJump={onJump}>
      {children}
    </DocLink>
  )
  return (
    <div className="max-w-[42rem] space-y-3 pt-1 font-serif text-[15px] leading-7 text-ink">
      {builder(corpus, link)}
    </div>
  )
}

/* ============================================================
 * Topics view — browse corpus by theme tag.
 * Tags are derived by keyword matching document titles and summaries.
 * ============================================================ */

interface TopicDef {
  id: string
  label: string
  keywords: string[]
}

const TOPIC_DEFS: TopicDef[] = [
  { id: 'survival', label: 'Survival & Essential Access', keywords: ['survival', 'access', 'basic', 'subsistence', 'tier 1', 'rights layer'] },
  { id: 'governance', label: 'Governance & Accountability', keywords: ['governance', 'accountability', 'oversight', 'protocol', 'acceptance', 'patch', 'amendment'] },
  { id: 'threats', label: 'Threat Analysis', keywords: ['threat', 'adversarial', 'risk', 'failure', 'attack', 'capture'] },
  { id: 'economic', label: 'Economic Design', keywords: ['market', 'economic', 'flow', 'storehouse', 'wealth', 'tax', 'commerce'] },
  { id: 'civic', label: 'Civic Power & Voice', keywords: ['voice', 'civic', 'democratic', 'participation', 'referendum', 'representation'] },
  { id: 'validation', label: 'Validation & Evidence', keywords: ['validation', 'evidence', 'commitment', 'specification', 'invariant', 'reserved', 'preactivation'] },
  { id: 'public', label: 'Public Facing', keywords: ['overview', 'readiness', 'white paper', 'rights', 'plain language', 'public'] },
  { id: 'operational', label: 'Operational Mechanics', keywords: ['annex', 'index', 'operational', 'implementation', 'procedure', 'schedule'] },
]

function getDocTopics(doc: CorpusDoc): string[] {
  const haystack = [doc.title, doc.summary, doc.path].join(' ').toLowerCase()
  return TOPIC_DEFS
    .filter((t) => t.keywords.some((kw) => haystack.includes(kw)))
    .map((t) => t.id)
}

function TopicsView({
  corpus,
  onJump,
}: {
  corpus: CorpusPayload
  onJump: (doc: CorpusDoc) => void
}) {
  const taggedDocs: Map<string, CorpusDoc[]> = new Map(TOPIC_DEFS.map((t) => [t.id, []]))

  for (const doc of corpus.docs) {
    const topics = getDocTopics(doc)
    for (const topicId of topics) {
      taggedDocs.get(topicId)?.push(doc)
    }
  }

  return (
    <div className="space-y-10">
      {TOPIC_DEFS.map((topic) => {
        const docs = taggedDocs.get(topic.id) ?? []
        if (!docs.length) return null
        return (
          <section key={topic.id}>
            <h2 className="mb-4 font-serif text-[1.2rem] font-semibold text-ink-strong">
              {topic.label}
              <span className="ml-2 font-sans text-[12px] font-normal text-ink-faint">
                {docs.length} {docs.length === 1 ? 'document' : 'documents'}
              </span>
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {docs.map((doc) => (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => onJump(doc)}
                  className="focus-ring group flex flex-col rounded border border-line bg-paper-strong p-4 text-left transition hover:border-[rgba(159,108,49,0.4)] hover:shadow-sm"
                >
                  <span className="text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                    {SECTION_LABELS[doc.section]}
                  </span>
                  <h3 className="mt-1 font-serif text-[0.97rem] leading-snug text-ink group-hover:text-ink-strong">
                    {doc.title}
                  </h3>
                  {doc.summary ? (
                    <p className="mt-1.5 line-clamp-2 text-[12px] leading-5 text-ink-soft">{doc.summary}</p>
                  ) : null}
                </button>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}

/* ============================================================
 * Reading Paths view — curated sequential reading sequences.
 * ============================================================ */

interface PathStep {
  path: string
  note: string
}

interface ReadingPathDef {
  id: string
  title: string
  description: string
  steps: PathStep[]
}

const READING_PATHS: ReadingPathDef[] = [
  {
    id: 'skeptic',
    title: 'The Skeptic\'s Path',
    description: 'For those who arrived with objections. Starts with what is unknown, then builds the case.',
    steps: [
      { path: 'docs/public/03_readiness.md', note: 'What is designed vs. what still needs evidence' },
      { path: 'docs/governance/Threat_Register.md', note: 'Every adversarial failure mode, kept visible' },
      { path: 'docs/governance/Patch_Log.md', note: 'How the design has responded to threats' },
      { path: 'docs/constitution/Humane_Constitution.md', note: 'The governing text itself' },
    ],
  },
  {
    id: 'first-time',
    title: 'First-Time Reader',
    description: 'The intended public on-ramp: overview first, then the constitutional core.',
    steps: [
      { path: 'docs/public/01_overview.md', note: 'One-page diagnosis' },
      { path: 'docs/public/05_rights_layer.md', note: 'Plain-language rights' },
      { path: 'docs/constitution/Humane_Constitution.md', note: 'The governing text' },
      { path: 'docs/constitution/INVARIANTS.md', note: 'What cannot be amended' },
    ],
  },
  {
    id: 'implementer',
    title: 'Implementation Track',
    description: 'For those building or auditing a pilot. Focus on specifications and operational mechanics.',
    steps: [
      { path: 'docs/constitution/SPECIFICATIONS.md', note: 'Formal state machine every implementation must satisfy' },
      { path: 'docs/constitution/Acceptance_Protocol.md', note: 'How patches reach operation' },
      { path: 'docs/annexes/INDEX.md', note: 'Operational extension layer' },
      { path: 'founding/commitments.md', note: 'Numerical lock-file every implementation is bound to' },
    ],
  },
  {
    id: 'governance-deep',
    title: 'Governance Deep Dive',
    description: 'The full adversarial and evidence stack. For auditors, researchers, and red-teamers.',
    steps: [
      { path: 'docs/governance/Threat_Register.md', note: 'Catalogued failure modes' },
      { path: 'docs/governance/Patch_Log.md', note: 'Structural responses' },
      { path: 'docs/governance/Claims_Evidence_Register.md', note: 'What the project is allowed to assert' },
      { path: 'docs/governance/Pilot_Evidence_Roadmap.md', note: 'What must be tested before scale' },
      { path: 'docs/governance/Founding_Preactivation_Disclosure.md', note: 'Pre-activation truth conditions' },
    ],
  },
]

function ReadingPathsView({
  corpus,
  onJump,
}: {
  corpus: CorpusPayload
  onJump: (doc: CorpusDoc) => void
}) {
  return (
    <div className="space-y-10">
      {READING_PATHS.map((path) => (
        <section key={path.id} className="rounded-lg border border-line bg-paper-strong p-6">
          <h2 className="font-serif text-[1.3rem] font-semibold text-ink-strong">{path.title}</h2>
          <p className="mt-1 text-[14px] leading-6 text-ink-soft">{path.description}</p>
          <ol className="mt-5 space-y-2">
            {path.steps.map((step, index) => {
              const doc = corpus.docs.find((d) => d.path === step.path)
              return (
                <li key={step.path} className="flex gap-4">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(159,108,49,0.12)] font-mono text-[10px] text-accent-deep">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    {doc ? (
                      <button
                        type="button"
                        onClick={() => onJump(doc)}
                        className="focus-ring inline border-b border-[rgba(159,108,49,0.35)] font-serif text-[0.97rem] font-medium text-accent-deep transition hover:border-accent hover:text-[var(--accent)]"
                      >
                        {doc.title}
                      </button>
                    ) : (
                      <span className="font-serif text-[0.97rem] text-ink-faint">{step.path}</span>
                    )}
                    <p className="mt-0.5 text-[12px] leading-5 text-ink-soft">{step.note}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </section>
      ))}
    </div>
  )
}

function ValidationPanels({ corpus }: { corpus: CorpusPayload }) {
  return (
    <section className="border-b border-line pb-8">
      <div className="grid gap-6 sm:grid-cols-3">
        <MetaStat label="Corpus check" value={corpus.stats.validatorStatus.toUpperCase()} />
        <MetaStat label="Commitments" value={`${corpus.stats.commitmentCount}`} />
        <MetaStat label="Reserved" value={`${corpus.stats.reservedCommitmentCount}`} />
      </div>
      <p className="mt-6 max-w-[42rem] font-serif text-[15px] leading-7 text-ink-soft">
        The validation view keeps the remaining pre-launch uncertainty visible instead of hiding it in
        prose. Inspect reserved commitments, specification dependencies, and the corpus snapshot the
        reader is currently serving.
      </p>
    </section>
  )
}

function EmptySettings() {
  return (
    <article className="max-w-[42rem]">
      <h2 className="font-serif text-[2rem] leading-tight text-ink-strong">
        The reader is ready; operator tooling is next.
      </h2>
      <p className="mt-4 font-serif text-[15px] leading-7 text-ink-soft">
        The highest-value settings work from here would be search persistence, pinned documents, and
        explicit one-click shortcuts for validation, build, and corpus refresh tasks.
      </p>
    </article>
  )
}

export function Dashboard({ view, corpus, loadError, onViewChange }: DashboardProps) {
  const [query, setQuery] = useState('')
  const [documentQuery, setDocumentQuery] = useState('')
  const [selectedDocId, setSelectedDocId] = useState<string | null>(() => readStoredSelectedDocId(view))
  const [pinnedDocIds, setPinnedDocIds] = useState<string[]>(() => readStoredDocList(PINNED_DOCS_STORAGE_KEY))
  const [recentDocIds, setRecentDocIds] = useState<string[]>(() => readStoredDocList(RECENT_DOCS_STORAGE_KEY))
  const [readingMode, setReadingMode] = useState(() => readStoredBoolean(READING_MODE_STORAGE_KEY))
  const [staleCorpusNotice, setStaleCorpusNotice] = useState<string | null>(null)
  const [sourceFeedback, setSourceFeedback] = useState<SourceFeedback>({
    tone: 'neutral',
    message: 'Read in-app, or open the source document directly from the reader header.',
  })
  const [documentMatchCount, setDocumentMatchCount] = useState(0)
  const [activeMatchIndex, setActiveMatchIndex] = useState(0)
  const [activeHeadingSlug, setActiveHeadingSlug] = useState<string | null>(null)
  const [copiedHeadingSlug, setCopiedHeadingSlug] = useState<string | null>(null)
  const shelfPaneRef = useRef<HTMLElement | null>(null)
  const readerPaneRef = useRef<HTMLDivElement | null>(null)
  const outlinePaneRef = useRef<HTMLDivElement | null>(null)
  const readerSearchInputRef = useRef<HTMLInputElement | null>(null)
  const shelfSearchInputRef = useRef<HTMLInputElement | null>(null)
  const restorePaneScrollRef = useRef(true)
  const lastViewRef = useRef<AppView>(view)
  const scrollWriteFrameRef = useRef<number | null>(null)
  const shouldScrollToActiveMatchRef = useRef(false)
  const copiedHeadingTimeoutRef = useRef<number | null>(null)
  const pendingHashTargetRef = useRef<{ docId: string; slug: string } | null>(null)

  const deferredQuery = useDeferredValue(query)
  const allDocs = corpus?.docs ?? []
  const baseDocs = corpus ? docsForView(view, corpus.docs, corpus.featuredPaths) : []
  const visibleDocs = baseDocs.filter((doc) => matchesQuery(doc, deferredQuery))
  const selectedDoc = visibleDocs.find((doc) => doc.id === selectedDocId) ?? visibleDocs[0] ?? null
  const docById = new Map(allDocs.map((doc) => [doc.id, doc]))
  const pinnedDocs = pinnedDocIds
    .map((docId) => docById.get(docId))
    .filter((doc): doc is CorpusDoc => Boolean(doc))
  const recentDocs = recentDocIds
    .filter((docId) => !pinnedDocIds.includes(docId))
    .map((docId) => docById.get(docId))
    .filter((doc): doc is CorpusDoc => Boolean(doc))
  const meta = VIEW_META[view]
  const independentPaneView = view === 'constitution' || view === 'annexes' || view === 'registries'
  const bindShelfPaneRef = (node: HTMLElement | null) => {
    shelfPaneRef.current = node
  }
  const bindReaderPaneRef = (node: HTMLDivElement | null) => {
    readerPaneRef.current = node
  }
  const bindOutlinePaneRef = (node: HTMLDivElement | null) => {
    outlinePaneRef.current = node
  }
  const bindReaderSearchInputRef = (node: HTMLInputElement | null) => {
    readerSearchInputRef.current = node
  }

  useEffect(() => {
    if (lastViewRef.current === view) {
      return
    }

    lastViewRef.current = view
    restorePaneScrollRef.current = true
    startTransition(() => setSelectedDocId(readStoredSelectedDocId(view)))
  }, [view])

  useEffect(() => {
    if (!corpus) {
      return
    }

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
    if (typeof window === 'undefined') {
      return
    }

    if (selectedDocId) {
      window.localStorage.setItem(selectedDocStorageKey(view), selectedDocId)
      return
    }

    window.localStorage.removeItem(selectedDocStorageKey(view))
  }, [selectedDocId, view])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(PINNED_DOCS_STORAGE_KEY, JSON.stringify(pinnedDocIds))
  }, [pinnedDocIds])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(RECENT_DOCS_STORAGE_KEY, JSON.stringify(recentDocIds))
  }, [recentDocIds])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(READING_MODE_STORAGE_KEY, String(readingMode))
  }, [readingMode])

  // P3.2 — corpus-stamp purge: when the corpus build stamp changes, validate
  // every persisted doc id against the live corpus and drop any that no longer
  // resolve. Surfaces a transient notice if anything was removed.
  useEffect(() => {
    if (typeof window === 'undefined' || !corpus) {
      return
    }

    const currentStamp = corpus.stats.buildStamp
    let storedStamp: string | null = null
    try {
      storedStamp = window.localStorage.getItem(CORPUS_STAMP_STORAGE_KEY)
    } catch {
      storedStamp = null
    }

    if (storedStamp === currentStamp) {
      return
    }

    const liveIds = new Set(corpus.docs.map((doc) => doc.id))
    let droppedCount = 0

    setPinnedDocIds((prev) => {
      const kept = prev.filter((id) => liveIds.has(id))
      droppedCount += prev.length - kept.length
      return kept.length === prev.length ? prev : kept
    })

    setRecentDocIds((prev) => {
      const kept = prev.filter((id) => liveIds.has(id))
      droppedCount += prev.length - kept.length
      return kept.length === prev.length ? prev : kept
    })

    try {
      window.localStorage.setItem(CORPUS_STAMP_STORAGE_KEY, currentStamp)
    } catch {
      /* storage may be full or disabled; ignore */
    }

    if (droppedCount > 0) {
      setStaleCorpusNotice(
        `${droppedCount} pinned or recent ${
          droppedCount === 1 ? 'item was' : 'items were'
        } removed because the underlying documents moved.`,
      )
    }
  }, [corpus])

  // P3.3 — global keyboard shortcuts.
  // Cmd/Ctrl+K  → focus shelf search.
  // Cmd/Ctrl+F  → focus reader search (overrides browser Find inside the app shell).
  // /            → focus shelf search (when not typing).
  // Escape      → blur active input back to the reader.
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as EventTarget | null
      const typing = isTypingElement(target)
      const meta = event.metaKey || event.ctrlKey

      if (meta && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        shelfSearchInputRef.current?.focus()
        shelfSearchInputRef.current?.select()
        return
      }

      if (meta && event.key.toLowerCase() === 'f') {
        if (readerSearchInputRef.current) {
          event.preventDefault()
          readerSearchInputRef.current.focus()
          readerSearchInputRef.current.select()
        }
        return
      }

      if (event.key === 'Escape' && typing) {
        ;(target as HTMLElement | null)?.blur()
        return
      }

      if (typing) {
        return
      }

      if (event.key === '/') {
        event.preventDefault()
        shelfSearchInputRef.current?.focus()
        shelfSearchInputRef.current?.select()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (!selectedDoc?.id) {
      return
    }

    setRecentDocIds((current) => {
      const next = [selectedDoc.id, ...current.filter((docId) => docId !== selectedDoc.id)].slice(0, MAX_RECENT_DOCS)
      return next.every((docId, index) => docId === current[index]) && next.length === current.length ? current : next
    })
  }, [selectedDoc?.id])

  useEffect(() => {
    setSourceFeedback({
      tone: 'neutral',
      message: selectedDoc
        ? `Reading ${selectedDoc.path}. Use “Open Source” to launch the backing file directly.`
        : 'Refine the filter or switch views to select a document.',
    })
  }, [selectedDoc?.id])

  useEffect(() => {
    setCopiedHeadingSlug(null)
  }, [selectedDoc?.id])

  useEffect(() => {
    setActiveMatchIndex(0)
  }, [selectedDoc?.id, documentQuery])

  useEffect(() => {
    return () => {
      if (scrollWriteFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollWriteFrameRef.current)
      }
      if (copiedHeadingTimeoutRef.current !== null) {
        window.clearTimeout(copiedHeadingTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!independentPaneView || !selectedDoc || !restorePaneScrollRef.current) {
      return
    }

    restorePaneScrollRef.current = false

    window.requestAnimationFrame(() => {
      const stored = readStoredPaneScroll(view)
      if (shelfPaneRef.current) {
        shelfPaneRef.current.scrollTop = stored.shelf
      }
      if (readerPaneRef.current) {
        readerPaneRef.current.scrollTop = stored.reader
      }
      if (outlinePaneRef.current) {
        outlinePaneRef.current.scrollTop = stored.outline
      }
    })
  }, [independentPaneView, selectedDoc?.id, view])

  useEffect(() => {
    if (!selectedDoc) {
      setDocumentMatchCount(0)
      setActiveHeadingSlug(null)
      return
    }

    window.requestAnimationFrame(() => {
      const hits = readerPaneRef.current?.querySelectorAll<HTMLElement>('mark[data-reader-search-hit="true"]') ?? []
      setDocumentMatchCount(hits.length)
      setActiveMatchIndex((index) => (hits.length ? Math.min(index, hits.length - 1) : 0))
    })
  }, [selectedDoc?.id, documentQuery])

  useEffect(() => {
    if (!selectedDoc || !readerPaneRef.current) {
      setActiveHeadingSlug(null)
      return
    }

    const headings = visibleHeadings(selectedDoc)
    const readerNode = readerPaneRef.current
    const readerTop = readerNode.getBoundingClientRect().top
    let nextActiveSlug = headings[0]?.slug ?? null

    for (const heading of headings) {
      const element = document.getElementById(headingScrollId(selectedDoc, heading.slug))
      if (!element) {
        continue
      }

      if (element.getBoundingClientRect().top - readerTop <= 150) {
        nextActiveSlug = heading.slug
        continue
      }

      break
    }

    setActiveHeadingSlug(nextActiveSlug)
  }, [selectedDoc?.id])

  useEffect(() => {
    if (!activeHeadingSlug || !outlinePaneRef.current) {
      return
    }

    const activeNode = outlinePaneRef.current.querySelector<HTMLElement>(
      `[data-heading-slug="${escapeSelectorValue(activeHeadingSlug)}"]`,
    )
    activeNode?.scrollIntoView({ block: 'center' })
  }, [activeHeadingSlug, selectedDoc?.id])

  useEffect(() => {
    if (typeof window === 'undefined' || !allDocs.length) {
      return
    }

    const applyHashTarget = () => {
      const target = parseHeadingHash(window.location.hash)
      pendingHashTargetRef.current = target
      if (!target) {
        return
      }

      const targetDoc = allDocs.find((doc) => doc.id === target.docId)
      if (!targetDoc) {
        return
      }

      const targetView = viewForDoc(targetDoc)
      if (targetView !== view) {
        window.localStorage.setItem(selectedDocStorageKey(targetView), targetDoc.id)
        onViewChange(targetView)
        return
      }

      if (!visibleDocs.some((doc) => doc.id === targetDoc.id)) {
        startTransition(() => setQuery(''))
      }

      startTransition(() => setSelectedDocId(targetDoc.id))
    }

    applyHashTarget()
    window.addEventListener('hashchange', applyHashTarget)
    return () => {
      window.removeEventListener('hashchange', applyHashTarget)
    }
  }, [allDocs, onViewChange, view, visibleDocs])

  useEffect(() => {
    if (!selectedDoc || !pendingHashTargetRef.current) {
      return
    }

    const pending = pendingHashTargetRef.current
    if (pending.docId !== selectedDoc.id) {
      return
    }

    window.requestAnimationFrame(() => {
      document.getElementById(headingScrollId(selectedDoc, pending.slug))?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })

    pendingHashTargetRef.current = null
  }, [selectedDoc?.id])

  useEffect(() => {
    const hits = readerPaneRef.current?.querySelectorAll<HTMLElement>('mark[data-reader-search-hit="true"]') ?? []

    hits.forEach((hit, index) => {
      hit.dataset.activeHit = index === activeMatchIndex ? 'true' : 'false'
    })

    if (!shouldScrollToActiveMatchRef.current || !hits.length) {
      return
    }

    shouldScrollToActiveMatchRef.current = false
    hits[activeMatchIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }, [activeMatchIndex, documentMatchCount, selectedDoc?.id, documentQuery])

  function handlePaneScroll(event: ReactUIEvent<HTMLElement>) {
    if (!independentPaneView || typeof window === 'undefined') {
      return
    }

    const scrolledPane = event.currentTarget

    if (scrollWriteFrameRef.current !== null) {
      return
    }

    scrollWriteFrameRef.current = window.requestAnimationFrame(() => {
      scrollWriteFrameRef.current = null
      window.localStorage.setItem(
        paneScrollStorageKey(view),
        JSON.stringify({
          shelf: shelfPaneRef.current?.scrollTop ?? 0,
          reader: readerPaneRef.current?.scrollTop ?? 0,
          outline: outlinePaneRef.current?.scrollTop ?? 0,
        }),
      )

      if (scrolledPane !== readerPaneRef.current || !selectedDoc || !readerPaneRef.current) {
        return
      }

      const headings = visibleHeadings(selectedDoc)
      const readerTop = readerPaneRef.current.getBoundingClientRect().top
      let nextActiveSlug = headings[0]?.slug ?? null

      for (const heading of headings) {
        const element = document.getElementById(headingScrollId(selectedDoc, heading.slug))
        if (!element) {
          continue
        }

        if (element.getBoundingClientRect().top - readerTop <= 150) {
          nextActiveSlug = heading.slug
          continue
        }

        break
      }

      setActiveHeadingSlug((current) => (current === nextActiveSlug ? current : nextActiveSlug))
    })
  }

  function jumpSearchMatch(direction: 1 | -1) {
    if (!documentMatchCount) {
      return
    }

    shouldScrollToActiveMatchRef.current = true
    setActiveMatchIndex((current) => {
      const nextIndex = current + direction
      if (nextIndex < 0) {
        return documentMatchCount - 1
      }
      if (nextIndex >= documentMatchCount) {
        return 0
      }
      return nextIndex
    })
  }

  function selectRelativeDocument(direction: 1 | -1) {
    if (!selectedDoc || !visibleDocs.length) {
      return
    }

    const currentIndex = visibleDocs.findIndex((doc) => doc.id === selectedDoc.id)
    if (currentIndex < 0) {
      return
    }

    const nextIndex = currentIndex + direction
    if (nextIndex < 0 || nextIndex >= visibleDocs.length) {
      return
    }

    handleSelectDoc(visibleDocs[nextIndex])
  }

  function moveRelativeView(direction: 1 | -1) {
    const currentIndex = KEYBOARD_NAV_VIEWS.indexOf(view)
    if (currentIndex < 0) {
      return
    }

    const nextIndex = currentIndex + direction
    if (nextIndex < 0 || nextIndex >= KEYBOARD_NAV_VIEWS.length) {
      return
    }

    onViewChange(KEYBOARD_NAV_VIEWS[nextIndex])
  }

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

    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 1279px)').matches) {
      window.requestAnimationFrame(() => {
        document.getElementById('reader-panel-start')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      })
    }
  }

  function handleSelectQuickDoc(doc: CorpusDoc) {
    const targetView = viewForDoc(doc)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(selectedDocStorageKey(targetView), doc.id)
    }

    if (targetView !== view) {
      onViewChange(targetView)
      return
    }

    handleSelectDoc(doc)
  }

  function handleTogglePinned() {
    if (!selectedDoc) {
      return
    }

    setPinnedDocIds((current) => {
      if (current.includes(selectedDoc.id)) {
        return current.filter((docId) => docId !== selectedDoc.id)
      }

      return [selectedDoc.id, ...current.filter((docId) => docId !== selectedDoc.id)]
    })
  }

  function handleToggleReadingMode() {
    setReadingMode((current) => !current)
  }

  async function handleCopyHeadingLink(slug: string) {
    if (!selectedDoc) {
      return
    }

    try {
      await copyHeadingLink(selectedDoc, slug)
      setCopiedHeadingSlug(slug)
      setSourceFeedback({
        tone: 'success',
        message: `Copied a direct link to “${slug.replace(/-/g, ' ')}”.`,
      })
      if (copiedHeadingTimeoutRef.current !== null) {
        window.clearTimeout(copiedHeadingTimeoutRef.current)
      }
      copiedHeadingTimeoutRef.current = window.setTimeout(() => {
        setCopiedHeadingSlug((current) => (current === slug ? null : current))
      }, 1800)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown copy failure.'
      setSourceFeedback({
        tone: 'error',
        message: `Could not copy the section link: ${message}`,
      })
    }
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      if (event.key === '/') {
        if (isTypingElement(event.target)) {
          return
        }

        event.preventDefault()
        readerSearchInputRef.current?.focus()
        readerSearchInputRef.current?.select()
        return
      }

      if (event.key === 'Escape') {
        if (document.activeElement === readerSearchInputRef.current) {
          readerSearchInputRef.current?.blur()
        }
        return
      }

      if (isTypingElement(event.target)) {
        return
      }

      if (event.key === 'n' || event.key === 'N') {
        if (!documentQuery.trim() || !documentMatchCount) {
          return
        }

        event.preventDefault()
        jumpSearchMatch(event.shiftKey ? -1 : 1)
        return
      }

      if (event.key === 'j' || event.key === 'ArrowDown') {
        event.preventDefault()
        selectRelativeDocument(1)
        return
      }

      if (event.key === 'k' || event.key === 'ArrowUp') {
        event.preventDefault()
        selectRelativeDocument(-1)
        return
      }

      if (event.key === ']') {
        event.preventDefault()
        moveRelativeView(1)
        return
      }

      if (event.key === '[') {
        event.preventDefault()
        moveRelativeView(-1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [documentMatchCount, documentQuery, onViewChange, selectedDoc, view, visibleDocs])

  if (loadError) {
    return (
      <div role="alert" aria-live="assertive">
        <article className="border-l-2 border-l-[#8b2d2d] py-6 pl-5">
          <p className="text-[12px] uppercase tracking-[0.16em] text-[#8b2d2d]">Corpus load failure</p>
          <p className="mt-3 max-w-[42rem] font-serif text-[15px] leading-7 text-ink-soft">
            {loadError}
          </p>
        </article>
      </div>
    )
  }

  if (!corpus) {
    return (
      <div role="status" aria-live="polite" aria-busy="true">
        <article className="border-l-2 border-l-line py-6 pl-5">
          <p className="text-[12px] uppercase tracking-[0.16em] text-ink-faint">Loading corpus</p>
          <p className="mt-3 max-w-[42rem] font-serif text-[15px] leading-7 text-ink-soft">
            Pulling the generated constitutional corpus into the reader shell.
          </p>
        </article>
      </div>
    )
  }

  return (
    <div
      className={`space-y-6 ${
        independentPaneView ? 'xl:grid xl:grid-rows-[auto_minmax(0,1fr)] xl:gap-6 xl:space-y-0' : ''
      }`}
    >
      {staleCorpusNotice && (
        <div
          role="status"
          aria-live="polite"
          data-testid="stale-corpus-notice"
          className="flex items-start justify-between gap-4 border-l-2 border-l-accent bg-[rgba(251,246,236,0.6)] px-4 py-3 text-[13px] leading-6 text-ink-strong"
        >
          <p className="max-w-3xl">{staleCorpusNotice}</p>
          <button
            type="button"
            onClick={() => setStaleCorpusNotice(null)}
            aria-label="Dismiss notice"
            className="focus-ring shrink-0 text-[12px] text-ink-soft hover:text-ink-strong"
          >
            Dismiss
          </button>
        </div>
      )}
      {view !== 'home' && (
        <header className="border-b border-line pb-7">
          <h1
            data-testid="view-title"
            className="font-serif text-[2.5rem] leading-[1.04] text-ink-strong sm:text-[3.1rem]"
          >
            {meta.title}
          </h1>
          <p className="mt-3 max-w-[42rem] font-serif text-[15px] leading-7 text-ink-soft">
            {meta.subtitle}
          </p>
        </header>
      )}

      {view === 'home' && <HomeView corpus={corpus} onJump={handleSelectQuickDoc} />}
      {view === 'topics' && <TopicsView corpus={corpus} onJump={handleSelectQuickDoc} />}
      {view === 'paths' && <ReadingPathsView corpus={corpus} onJump={handleSelectQuickDoc} />}
      {view === 'validation' && <ValidationPanels corpus={corpus} />}
      {view === 'settings' && <EmptySettings />}

      {view !== 'home' && view !== 'topics' && view !== 'paths' && view !== 'settings' && (
        <SectionIntro view={view} corpus={corpus} onJump={handleSelectQuickDoc} />
      )}

      {view !== 'home' && view !== 'topics' && view !== 'paths' && view !== 'settings' && (
        <div className="flex max-w-md items-center gap-3">
          <label htmlFor="corpus-search" className="sr-only">
            Filter this section
          </label>
          <input
            id="corpus-search"
            ref={shelfSearchInputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter title, path, or headings…"
            className="focus-ring flex-1 rounded border border-line bg-[rgba(251,246,236,0.6)] px-3 py-1.5 font-serif text-[14px] text-ink-strong placeholder:text-ink-faint"
          />
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
            {visibleDocs.length} {visibleDocs.length === 1 ? 'match' : 'matches'}
          </span>
        </div>
      )}

      {view !== 'home' && view !== 'topics' && view !== 'paths' && view !== 'settings' && (
        <ReaderWorkspace
          docs={visibleDocs}
          allDocs={allDocs}
          selectedDoc={selectedDoc}
          pinnedDocIds={pinnedDocIds}
          pinnedDocs={pinnedDocs}
          recentDocs={recentDocs}
          recentIds={recentDocIds}
          onSelect={handleSelectDoc}
          onSelectQuickDoc={handleSelectQuickDoc}
          onTogglePinned={handleTogglePinned}
          readingMode={readingMode}
          onToggleReadingMode={handleToggleReadingMode}
          onOpenSource={handleOpenSource}
          feedback={sourceFeedback}
          railLabel={meta.railLabel}
          emptyLabel="No documents match the current filter. Broaden the query or move to another shelf."
          independentScroll={independentPaneView}
          shelfPaneRef={bindShelfPaneRef}
          readerPaneRef={bindReaderPaneRef}
          outlinePaneRef={bindOutlinePaneRef}
          onPaneScroll={handlePaneScroll}
          activeHeadingSlug={activeHeadingSlug}
          copiedHeadingSlug={copiedHeadingSlug}
          onCopyHeadingLink={handleCopyHeadingLink}
          searchQuery={documentQuery}
          onSearchChange={setDocumentQuery}
          searchInputRef={bindReaderSearchInputRef}
          matchCount={documentMatchCount}
          currentMatchIndex={activeMatchIndex}
          onJumpToPreviousMatch={() => jumpSearchMatch(-1)}
          onJumpToNextMatch={() => jumpSearchMatch(1)}
        />
      )}
    </div>
  )
}
