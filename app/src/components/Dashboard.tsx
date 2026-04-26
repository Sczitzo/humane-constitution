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
  overview: {
    title: 'Corpus Overview',
    subtitle: 'Begin with the public-facing documents, then move inward to the formal constitutional body.',
    railLabel: 'Featured Shelf',
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
  'overview',
  'constitution',
  'annexes',
  'registries',
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
    <section data-testid={testId} className="border-t border-line pt-3">
      <p className="text-[11px] uppercase tracking-[0.14em] text-ink-faint">{label}</p>
      <ul className="mt-2 flex flex-col">
        {docs.map((doc) => (
          <li key={`${testId}-${doc.id}`}>
            <button
              data-testid={`${testId}-${doc.id}`}
              type="button"
              onClick={() => onSelect(doc)}
              className="focus-ring group block w-full py-1.5 text-left text-[13px] leading-snug text-ink-soft transition hover:text-ink-strong"
            >
              <span className="font-serif text-ink group-hover:text-ink-strong">{doc.title}</span>
              <span className="ml-2 text-[11px] text-ink-faint">{SECTION_LABELS[doc.section]}</span>
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
        </div>
      </article>
    </section>
  )
}

function ReaderWorkspace({
  docs,
  selectedDoc,
  pinnedDocIds,
  pinnedDocs,
  recentDocs,
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
  selectedDoc: CorpusDoc | null
  pinnedDocIds: string[]
  pinnedDocs: CorpusDoc[]
  recentDocs: CorpusDoc[]
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

function OverviewPanels({ corpus }: { corpus: CorpusPayload }) {
  void corpus
  return null
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
      <header className="border-b border-line pb-6">
        <h1
          data-testid="view-title"
          className="font-serif text-[2.4rem] leading-tight text-ink-strong sm:text-[2.9rem]"
        >
          {meta.title}
        </h1>
        <p className="mt-3 max-w-[42rem] font-serif text-[15px] leading-7 text-ink-soft">
          {meta.subtitle}
        </p>
        {view !== 'settings' && (
          <div className="mt-5 flex max-w-md items-center gap-3">
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
            <span className="shrink-0 text-[11px] text-ink-faint">
              {visibleDocs.length} {visibleDocs.length === 1 ? 'match' : 'matches'}
            </span>
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
          pinnedDocIds={pinnedDocIds}
          pinnedDocs={pinnedDocs}
          recentDocs={recentDocs}
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
