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
    <div className="rounded-[18px] border border-[rgba(60,54,46,0.14)] bg-[rgba(253,249,242,0.8)] px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_14px_24px_rgba(35,30,20,0.06)]">
      <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--ink-faint)]">
        {label}
      </p>
      <p className="mt-2 font-serif text-[1.3rem] leading-tight text-[var(--ink-strong)]">{value}</p>
    </div>
  )
}

function ActionButton({
  label,
  onClick,
  tone = 'default',
  disabled = false,
}: {
  label: string
  onClick: () => void
  tone?: 'default' | 'accent'
  disabled?: boolean
}) {
  const toneClass =
    tone === 'accent'
      ? 'border-[rgba(159,108,49,0.3)] bg-[rgba(159,108,49,0.14)] text-[var(--accent-deep)] shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] hover:bg-[rgba(159,108,49,0.2)]'
      : 'border-[rgba(60,54,46,0.14)] bg-[rgba(253,249,242,0.8)] text-[var(--ink-soft)] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] hover:bg-[rgba(253,249,242,0.96)] hover:text-[var(--ink-strong)]'

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-[10px] font-mono uppercase tracking-[0.2em] transition ${
        disabled ? 'cursor-not-allowed opacity-45' : ''
      } ${toneClass}`}
    >
      {label}
    </button>
  )
}

function DocumentRow({
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
      data-testid={`document-row-${doc.id}`}
      data-selected={selected ? 'true' : 'false'}
      className={`rounded-[24px] border p-4 transition ${
        selected
          ? 'border-[rgba(159,108,49,0.26)] bg-[rgba(253,249,242,0.92)] shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_16px_28px_rgba(35,30,20,0.08)]'
          : 'border-[rgba(60,54,46,0.1)] bg-[rgba(253,249,242,0.46)] shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] hover:border-[rgba(159,108,49,0.14)] hover:bg-[rgba(253,249,242,0.7)] hover:shadow-[0_14px_24px_rgba(35,30,20,0.06)]'
      }`}
    >
      <button className="w-full text-left" onClick={onSelect}>
        <div className="min-w-0">
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--ink-faint)]">
            {SECTION_LABELS[doc.section]}
          </p>
          <h3 className="mt-2 font-serif text-[1.18rem] leading-7 text-[var(--ink-strong)]">
            {doc.title}
          </h3>
        </div>
        <p className="mt-3 line-clamp-2 text-[13px] leading-6 text-[var(--ink-soft)]">{doc.summary}</p>
      </button>

      <div className="mt-4 flex flex-wrap items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.18em] text-[var(--ink-faint)]">
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

function MarkdownDocument({
  doc,
  searchQuery,
}: {
  doc: CorpusDoc
  searchQuery: string
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
            <Tag
              key={`${doc.id}-heading-${block.slug}-${index}`}
              id={headingScrollId(doc, block.slug)}
              className={`scroll-mt-24 ${block.level === 1 ? 'reader-h1' : ''} ${
                block.level === 2 ? 'reader-h2' : ''
              } ${block.level === 3 ? 'reader-h3' : ''} ${
                block.level >= 4 ? 'reader-h4' : ''
              }`}
            >
              {renderInline(block.text, `${doc.id}-heading-inline-${index}`, searchQuery)}
            </Tag>
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
    <aside
      data-testid="reader-outline-content"
      className={`rounded-[26px] border border-[rgba(60,54,46,0.16)] bg-[linear-gradient(180deg,rgba(252,248,241,0.96),rgba(248,242,232,0.9))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_20px_36px_rgba(35,30,20,0.08)] ${
        independentScroll ? 'h-full overflow-y-auto' : 'self-start'
      }`}
    >
      <div className="mb-4 h-px w-full bg-[linear-gradient(90deg,rgba(159,108,49,0.28),rgba(159,108,49,0.08),transparent)]" />
      <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--ink-faint)]">
        Outline
      </p>
      <div className="mt-4 space-y-1">
        {headings.map((heading) => (
          <button
            key={`${doc.id}-${heading.slug}`}
            data-testid={`outline-heading-${heading.slug}`}
            data-active-heading={activeHeadingSlug === heading.slug ? 'true' : 'false'}
            onClick={() => jumpToHeading(doc, heading.slug)}
            className={`block w-full rounded-[16px] px-3 py-2 text-left text-[12px] leading-5 transition ${
              activeHeadingSlug === heading.slug
                ? 'bg-[rgba(159,108,49,0.12)] text-[var(--accent-deep)] shadow-[inset_0_0_0_1px_rgba(159,108,49,0.16)]'
                : 'text-[var(--ink-soft)] hover:bg-[rgba(60,54,46,0.05)] hover:text-[var(--ink-strong)]'
            }`}
            style={{ paddingLeft: `${12 + Math.max(0, heading.level - 1) * 10}px` }}
          >
            {heading.text}
          </button>
        ))}
      </div>
    </aside>
  )
}

function ReaderPanel({
  doc,
  feedback,
  onOpenSource,
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
  searchQuery: string
  onSearchChange: (value: string) => void
  searchInputRef: (node: HTMLInputElement | null) => void
  matchCount: number
  currentMatchIndex: number
  onJumpToPreviousMatch: () => void
  onJumpToNextMatch: () => void
}) {
  return (
    <section id="reader-panel-start" data-testid="reader-panel" className="space-y-6">
      <header className="rounded-[30px] border border-[rgba(60,54,46,0.18)] bg-[linear-gradient(180deg,rgba(253,249,242,1),rgba(247,240,229,0.95))] px-6 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_28px_48px_rgba(35,30,20,0.11)] sm:px-8">
        <div className="mb-5 h-px w-full bg-[linear-gradient(90deg,rgba(159,108,49,0.32),rgba(159,108,49,0.1),transparent)]" />
        <div className="min-w-0">
          <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-[var(--ink-faint)]">
            {SECTION_LABELS[doc.section]}
          </p>
          <h2 data-testid="reader-title" className="mt-3 font-serif text-[2rem] leading-tight text-[var(--ink-strong)] sm:text-[2.55rem]">
            {doc.title}
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-[var(--ink-soft)]">
            {doc.summary}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--ink-faint)]">
          <span>{doc.path}</span>
          <span>•</span>
          <span>{estimatedReadMinutes(doc.wordCount)} min read</span>
          <span>•</span>
          <span>{doc.wordCount} words</span>
          <span>•</span>
          <span>{doc.headingCount} headings</span>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <ActionButton label="Open Source" onClick={onOpenSource} tone="accent" />
        </div>

        <div className="mt-5 rounded-[22px] border border-[rgba(60,54,46,0.12)] bg-[rgba(252,248,241,0.72)] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0 flex-1">
              <label
                htmlFor="reader-search"
                className="block text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--ink-faint)]"
              >
                Search this document
              </label>
              <input
                id="reader-search"
                ref={searchInputRef}
                data-testid="reader-search-input"
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Find a term, phrase, or heading"
                className="mt-3 w-full border-0 bg-transparent p-0 font-serif text-[1.08rem] text-[var(--ink-strong)] outline-none placeholder:font-sans placeholder:text-[var(--ink-faint)]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 lg:justify-end">
              <span
                data-testid="reader-search-status"
                className="rounded-full border border-[rgba(60,54,46,0.12)] bg-[rgba(253,249,242,0.8)] px-3 py-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--ink-faint)]"
              >
                {searchQuery.trim()
                  ? matchCount
                    ? `${currentMatchIndex + 1} of ${matchCount} hits`
                    : 'No matches'
                  : 'Find in text'}
              </span>
              <ActionButton label="Prev" onClick={onJumpToPreviousMatch} disabled={!matchCount} />
              <ActionButton label="Next" onClick={onJumpToNextMatch} disabled={!matchCount} />
            </div>
          </div>
        </div>

        <p className={`mt-4 text-[12px] leading-6 ${feedbackClass(feedback.tone)}`}>
          {feedback.message}
        </p>
      </header>

      <article data-testid="reader-paper-shell" className="rounded-[30px] border border-[rgba(60,54,46,0.18)] bg-[linear-gradient(180deg,rgba(252,246,238,0.98),rgba(245,238,227,0.92))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_28px_48px_rgba(35,30,20,0.12)] sm:p-4">
        <div className="rounded-[24px] border border-[rgba(60,54,46,0.12)] bg-[var(--paper-strong)] px-6 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.76),0_1px_0_rgba(60,54,46,0.04)] sm:px-10 sm:py-10">
          <div data-testid="reader-document" className="mx-auto max-w-[47rem]">
            <MarkdownDocument doc={doc} searchQuery={searchQuery} />
          </div>
        </div>
      </article>
    </section>
  )
}

function ReaderWorkspace({
  docs,
  selectedDoc,
  onSelect,
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
  onSelect: (doc: CorpusDoc) => void
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
  searchQuery: string
  onSearchChange: (value: string) => void
  searchInputRef: (node: HTMLInputElement | null) => void
  matchCount: number
  currentMatchIndex: number
  onJumpToPreviousMatch: () => void
  onJumpToNextMatch: () => void
}) {
  if (!docs.length || !selectedDoc) {
    return (
      <article className="rounded-[32px] border border-[rgba(60,54,46,0.14)] bg-[rgba(250,246,238,0.92)] px-6 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_24px_40px_rgba(35,30,20,0.08)]">
        <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--ink-faint)]">No Matches</p>
        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[var(--ink-soft)]">{emptyLabel}</p>
      </article>
    )
  }

  return (
    <div
      className={`grid gap-6 xl:grid-cols-[21.5rem_minmax(0,1fr)] 2xl:grid-cols-[21.5rem_minmax(0,1fr)_15.5rem] ${
        independentScroll ? 'items-start' : ''
      }`}
    >
        <section
          ref={shelfPaneRef}
          data-testid="shelf-pane"
          className={`space-y-4 ${
            independentScroll
              ? 'xl:sticky xl:top-6 xl:max-h-[calc(100vh-9rem)] xl:overflow-y-auto xl:overscroll-contain xl:pr-1'
            : 'xl:sticky xl:top-6 xl:self-start xl:max-h-[calc(100vh-9rem)] xl:overflow-y-auto xl:overscroll-contain xl:pr-1'
          }`}
          onScroll={onPaneScroll}
          onWheelCapture={routeVerticalWheelToSelf}
        >
          <div className="space-y-4 rounded-[30px] border border-[rgba(60,54,46,0.18)] bg-[linear-gradient(180deg,rgba(246,239,228,0.82),rgba(238,230,218,0.68))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_24px_42px_rgba(35,30,20,0.1)]">
            <div className="rounded-[26px] border border-[rgba(60,54,46,0.16)] bg-[linear-gradient(180deg,rgba(252,248,241,0.96),rgba(248,242,232,0.9))] px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_18px_30px_rgba(35,30,20,0.08)]">
              <div className="mb-4 h-px w-full bg-[linear-gradient(90deg,rgba(159,108,49,0.28),rgba(159,108,49,0.08),transparent)]" />
              <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--ink-faint)]">
                {railLabel}
              </p>
              <div className="mt-3 flex items-end justify-between gap-4">
                <p className="font-serif text-[1.55rem] leading-tight text-[var(--ink-strong)]">
                  {docs.length} documents
                </p>
                <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-[var(--ink-faint)]">
                  browse + read
                </span>
              </div>
              <p className="mt-3 text-[13px] leading-6 text-[var(--ink-soft)]">
                Select a document from the shelf, then stay in one stable reading surface while the corpus remains browseable.
              </p>
            </div>

            <div className="overflow-hidden rounded-[26px] border border-[rgba(60,54,46,0.16)] bg-[linear-gradient(180deg,rgba(252,248,241,0.92),rgba(247,240,230,0.86))] shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_18px_30px_rgba(35,30,20,0.08)]">
              <div data-testid="shelf-list" className="space-y-2 p-3">
                {docs.map((doc) => (
                  <DocumentRow
                    key={doc.id}
                    doc={doc}
                    selected={selectedDoc.id === doc.id}
                    onSelect={() => onSelect(doc)}
                    onOpenSource={() => onOpenSource(doc)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <div
          key={`reader-pane-${selectedDoc.id}`}
          ref={readerPaneRef}
          data-testid="reader-scroll-pane"
          className={`min-w-0 ${
            independentScroll
              ? 'xl:sticky xl:top-6 xl:max-h-[calc(100vh-9rem)] xl:overflow-y-auto xl:overscroll-contain xl:pr-1'
              : ''
          }`}
          onScroll={independentScroll ? onPaneScroll : undefined}
          onWheelCapture={independentScroll ? routeVerticalWheelToSelf : undefined}
        >
          <div className="rounded-[34px] border border-[rgba(60,54,46,0.18)] bg-[linear-gradient(180deg,rgba(244,236,224,0.84),rgba(236,227,214,0.66))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_28px_50px_rgba(35,30,20,0.11)]">
            <ReaderPanel
              doc={selectedDoc}
              feedback={feedback}
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
        </div>

        <div
          key={`outline-pane-${selectedDoc.id}`}
          ref={outlinePaneRef}
          data-testid="outline-scroll-pane"
          className={`hidden 2xl:block ${
            independentScroll
              ? '2xl:sticky 2xl:top-6 2xl:max-h-[calc(100vh-9rem)] 2xl:overflow-y-auto 2xl:overscroll-contain 2xl:pr-1'
              : ''
          }`}
          onScroll={independentScroll ? onPaneScroll : undefined}
          onWheelCapture={independentScroll ? routeVerticalWheelToSelf : undefined}
        >
          <div className={independentScroll ? '' : 'sticky top-8'}>
            <div className="rounded-[30px] border border-[rgba(60,54,46,0.18)] bg-[linear-gradient(180deg,rgba(244,236,224,0.78),rgba(236,227,214,0.62))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_20px_36px_rgba(35,30,20,0.08)]">
              <ReaderOutline doc={selectedDoc} independentScroll={false} activeHeadingSlug={activeHeadingSlug} />
            </div>
          </div>
        </div>
    </div>
  )
}

function OverviewPanels({ corpus }: { corpus: CorpusPayload }) {
  const constitutionDocs = corpus.docs.filter((doc) => doc.section === 'constitution').length
  const annexDocs = corpus.docs.filter((doc) => doc.section === 'annex').length
  const registryDocs = corpus.docs.filter((doc) => doc.section === 'registry').length

  return (
    <section className="rounded-[30px] border border-[rgba(60,54,46,0.14)] bg-[rgba(250,246,238,0.94)] px-6 py-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_18px_30px_rgba(35,30,20,0.06)] sm:px-8">
      <p className="text-[10px] font-mono uppercase tracking-[0.26em] text-[var(--ink-faint)]">
        Reading Room
      </p>
      <div className="mt-4 grid gap-8 xl:grid-cols-[minmax(0,1.28fr)_minmax(22rem,0.92fr)] xl:items-start">
        <div>
          <h2 className="max-w-4xl font-serif text-[2rem] leading-tight text-[var(--ink-strong)] sm:text-[2.45rem]">
            Read the corpus as a constitutional archive, not a dashboard.
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-8 text-[var(--ink-soft)]">
            This shell now prioritizes reading comfort, collection navigation, and direct source access. Start with the public overview
            documents on the shelf below, then move through the formal constitutional and governance layers as needed.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
          <MetaStat label="Schema" value={`${corpus.stats.articleCount} articles`} />
          <MetaStat label="Annexes" value={`${corpus.stats.annexCount} annexes`} />
          <MetaStat label="Registries" value={`${corpus.stats.threatCount} threats · ${corpus.stats.patchCount} patches`} />
        </div>
      </div>

      <div className="mt-7 grid gap-5 border-t border-[rgba(60,54,46,0.1)] pt-7 sm:grid-cols-3">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--ink-faint)]">Constitution shelf</p>
          <p className="mt-3 font-serif text-[1.35rem] leading-tight text-[var(--ink-strong)]">{constitutionDocs}</p>
          <p className="mt-2 text-[14px] leading-7 text-[var(--ink-soft)]">
            {constitutionDocs} documents spanning the charter, public white paper, rights layer, and formal specifications.
          </p>
        </div>
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--ink-faint)]">Annex shelf</p>
          <p className="mt-3 font-serif text-[1.35rem] leading-tight text-[var(--ink-strong)]">{annexDocs}</p>
          <p className="mt-2 text-[14px] leading-7 text-[var(--ink-soft)]">
            {annexDocs} annexes for hardening clauses, operational mechanics, and deeper implementation detail.
          </p>
        </div>
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--ink-faint)]">Registry shelf</p>
          <p className="mt-3 font-serif text-[1.35rem] leading-tight text-[var(--ink-strong)]">{registryDocs}</p>
          <p className="mt-2 text-[14px] leading-7 text-[var(--ink-soft)]">
            {registryDocs} living governance logs covering threats, patches, commitments, and activation discipline.
          </p>
        </div>
      </div>
    </section>
  )
}

function ValidationPanels({ corpus }: { corpus: CorpusPayload }) {
  return (
    <section className="rounded-[30px] border border-[rgba(60,54,46,0.14)] bg-[rgba(250,246,238,0.9)] px-6 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_18px_30px_rgba(35,30,20,0.06)]">
      <div className="grid gap-4 lg:grid-cols-3">
        <MetaStat label="Corpus check" value={corpus.stats.validatorStatus.toUpperCase()} />
        <MetaStat label="Commitments" value={`${corpus.stats.commitmentCount}`} />
        <MetaStat label="Reserved" value={`${corpus.stats.reservedCommitmentCount}`} />
      </div>
      <p className="mt-5 max-w-4xl text-[14px] leading-7 text-[var(--ink-soft)]">
        The validation view is the activation shelf: it keeps the remaining prelaunch uncertainty visible instead of hiding it in prose.
        Use it to inspect reserved commitments, specification dependencies, and the corpus snapshot that the reader is currently serving.
      </p>
    </section>
  )
}

function EmptySettings() {
  return (
    <article className="rounded-[30px] border border-[rgba(60,54,46,0.14)] bg-[rgba(250,246,238,0.9)] px-6 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_18px_30px_rgba(35,30,20,0.06)]">
      <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--ink-faint)]">Shell Settings</p>
      <h2 className="mt-3 font-serif text-[2rem] leading-tight text-[var(--ink-strong)]">The reader is ready; operator tooling is next.</h2>
      <p className="mt-4 max-w-3xl text-[15px] leading-8 text-[var(--ink-soft)]">
        The highest-value settings work from here would be search persistence, pinned documents, and explicit one-click shortcuts for
        validation, build, and corpus refresh tasks.
      </p>
    </article>
  )
}

export function Dashboard({ view, corpus, loadError, onViewChange }: DashboardProps) {
  const [query, setQuery] = useState('')
  const [documentQuery, setDocumentQuery] = useState('')
  const [selectedDocId, setSelectedDocId] = useState<string | null>(() => readStoredSelectedDocId(view))
  const [sourceFeedback, setSourceFeedback] = useState<SourceFeedback>({
    tone: 'neutral',
    message: 'Read in-app, or open the source document directly from the reader header.',
  })
  const [documentMatchCount, setDocumentMatchCount] = useState(0)
  const [activeMatchIndex, setActiveMatchIndex] = useState(0)
  const [activeHeadingSlug, setActiveHeadingSlug] = useState<string | null>(null)
  const shelfPaneRef = useRef<HTMLElement | null>(null)
  const readerPaneRef = useRef<HTMLDivElement | null>(null)
  const outlinePaneRef = useRef<HTMLDivElement | null>(null)
  const readerSearchInputRef = useRef<HTMLInputElement | null>(null)
  const restorePaneScrollRef = useRef(true)
  const lastViewRef = useRef<AppView>(view)
  const scrollWriteFrameRef = useRef<number | null>(null)
  const shouldScrollToActiveMatchRef = useRef(false)

  const deferredQuery = useDeferredValue(query)
  const baseDocs = corpus ? docsForView(view, corpus.docs, corpus.featuredPaths) : []
  const visibleDocs = baseDocs.filter((doc) => matchesQuery(doc, deferredQuery))
  const selectedDoc = visibleDocs.find((doc) => doc.id === selectedDocId) ?? visibleDocs[0] ?? null
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
    setSourceFeedback({
      tone: 'neutral',
      message: selectedDoc
        ? `Reading ${selectedDoc.path}. Use “Open Source” to launch the backing file directly.`
        : 'Refine the filter or switch views to select a document.',
    })
  }, [selectedDoc?.id])

  useEffect(() => {
    setActiveMatchIndex(0)
  }, [selectedDoc?.id, documentQuery])

  useEffect(() => {
    return () => {
      if (scrollWriteFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollWriteFrameRef.current)
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
      <div className="space-y-6">
        <article className="rounded-[32px] border border-[rgba(139,45,45,0.22)] bg-[rgba(255,248,246,0.92)] px-6 py-8 shadow-[0_18px_30px_rgba(35,30,20,0.07)]">
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8b2d2d]">Corpus Load Failure</p>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[var(--ink-soft)]">{loadError}</p>
        </article>
      </div>
    )
  }

  if (!corpus) {
    return (
      <div className="space-y-6">
        <article className="rounded-[32px] border border-[rgba(60,54,46,0.14)] bg-[rgba(250,246,238,0.9)] px-6 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_18px_30px_rgba(35,30,20,0.06)]">
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--ink-faint)]">Loading Corpus</p>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[var(--ink-soft)]">
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
      <header className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--ink-faint)]">
            Humane Constitution Reader
          </p>
          <h1 className="mt-3 font-serif text-[2.1rem] leading-tight text-[var(--ink-strong)] sm:text-[2.75rem]">
            {meta.title}
          </h1>
          <p className="mt-4 max-w-4xl text-[15px] leading-8 text-[var(--ink-soft)]">
            {meta.subtitle}
          </p>
        </div>

        {view !== 'settings' && (
          <div className="w-full max-w-[23rem] rounded-[20px] border border-[rgba(60,54,46,0.14)] bg-[rgba(250,246,238,0.86)] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.42),0_12px_20px_rgba(35,30,20,0.05)]">
            <label
              className="block text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--ink-faint)]"
              htmlFor="corpus-search"
            >
              Filter this shelf
            </label>
            <input
              id="corpus-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title, path, or headings"
              className="mt-3 w-full border-0 bg-transparent p-0 font-serif text-[1.05rem] text-[var(--ink-strong)] outline-none placeholder:font-sans placeholder:text-[var(--ink-faint)]"
            />
            <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--ink-faint)]">
              <span>{visibleDocs.length} matches</span>
              <span>•</span>
              <span>{corpus.stats.buildStamp}</span>
            </div>
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
          railLabel={meta.railLabel}
          emptyLabel="No documents match the current filter. Broaden the query or move to another shelf."
          independentScroll={independentPaneView}
          shelfPaneRef={bindShelfPaneRef}
          readerPaneRef={bindReaderPaneRef}
          outlinePaneRef={bindOutlinePaneRef}
          onPaneScroll={handlePaneScroll}
          activeHeadingSlug={activeHeadingSlug}
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
