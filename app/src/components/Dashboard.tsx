import { startTransition, useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { StatechartDiagram } from './StatechartDiagram'
import { DiagramRegistry } from './diagrams/index'
import { invoke } from '@tauri-apps/api/core'
import type { CorpusDoc, CorpusPayload } from '../generated/corpus'
import type { AppView } from './Layout'
import { parseMarkdown } from '../lib/markdown'
import {
  readFontSize, readColumnWidth, applyFontSize, applyColumnWidth,
  readTheme, applyTheme,
  selectedDocStorageKey,
  readStoredSelectedDocId, readStoredDocList, readStoredBoolean, readStoredPaneScroll,
} from '../lib/persistence'
import { RefNavContext, buildRefLookup, RefChip } from './RefChipShared'


interface DashboardProps {
  view: AppView
  corpus: CorpusPayload | null
  loadError: string | null
  onViewChange: (view: AppView) => void
  onProgressChange?: (progress: number) => void
  onNavDocsChange: (recent: CorpusDoc[], shelf: CorpusDoc[], label: string) => void
  corpusQuery: string
  onCorpusQueryChange: (q: string) => void
  pendingDocTarget?: { id: string; headingSlug?: string } | null
  onPendingDocTargetConsumed?: () => void
  pendingPathId?: string | null
  onPendingPathConsumed?: () => void
}

interface SourceFeedback {
  tone: 'neutral' | 'success' | 'warning' | 'error'
  message: string
}

const VIEW_META: Record<AppView, { title: string; subtitle: string; railLabel: string }> = {
  home: {
    title: 'Humane Constitution',
    subtitle: 'A constitutional design for separating survival, markets, and civic power.',
    railLabel: 'Featured',
  },
  constitution: {
    title: 'Public & Governing Texts',
    subtitle: 'Public guides, governing text, interpretive documents, and the founding order that frames the corpus.',
    railLabel: 'Public & Core Texts',
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
const READ_DOCS_STORAGE_KEY   = 'humane-reader:read-docs'
const ACTIVE_PATH_STORAGE_KEY = 'humane-reader:active-path'
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
  if (view === 'home') {
    const docsByPath = new Map(docs.map((doc) => [doc.path, doc]))
    return featuredPaths
      .map((path) => docsByPath.get(path))
      .filter((doc): doc is CorpusDoc => Boolean(doc))
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
    const annexCode = (doc: CorpusDoc) => {
      const m = doc.path.match(/ANNEX_([A-Z]+)\.md$/)
      return m ? m[1] : ''
    }
    return docs
      .filter((doc) => doc.section === 'annex')
      .sort((a, b) => {
        const ca = annexCode(a), cb = annexCode(b)
        if (ca === '' && cb === '') return 0
        if (ca === '') return -1
        if (cb === '') return 1
        if (ca.length !== cb.length) return ca.length - cb.length
        return ca.localeCompare(cb)
      })
  }
  if (view === 'registries') {
    return docs.filter((doc) => doc.section === 'registry')
  }
  if (view === 'validation') {
    return docs.filter((doc) =>
      [
        'founding/commitments.md',
        'docs/constitution/SPECIFICATIONS.md',
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

// Pattern that matches ref tokens we want to chip-ify in plain text
const REF_TOKEN_PATTERN = /\b(PRD-\d+|P-\d+|TR-\d+|T-\d+|INV-\d+|Annex\s+[A-Z]{1,3}\d*|ANNEX\s+[A-Z]{1,3}\d*|FC-\d+)|(§[A-Z]{0,3}\d+(?:\.\d+)*)/g

/**
 * Expand shorthand multi-ref sequences before tokenising.
 *
 * Slash list:  "T-012/013/014/015"   → "T-012 / T-013 / T-014 / T-015"
 * Range:       "T-012–T-015"         → "T-012 / T-013 / T-014 / T-015"
 *              "T-012–015"           → same (prefix may be omitted on end)
 *              "FC-080/081/082"      → "FC-080 / FC-081 / FC-082"
 * Works for any prefix (T, P, FC, TR, PRD, INV).
 */
function expandShorthandRefs(text: string): string {
  // -1. Normalise underscore-separated annex refs used throughout corpus prose:
  //     ANNEX_AW → Annex AW, ANNEX_AC1 → Annex AC1, etc.
  let out = text.replace(/\bANNEX_([A-Z]{1,3}\d*)\b/g, 'Annex $1')

  // 0. Plural annexes: "Annexes M, AL, AQ" → "Annex M, Annex AL, Annex AQ"
  out = out.replace(
    /\bAnnexes\s+((?:[A-Z]{1,3}\d*(?:[,\s]+|(?=[^,\s])))+)/g,
    (_m, rest) => rest.split(/[,\s]+/).filter(Boolean).map((c: string) => `Annex ${c}`).join(', ')
  )
  // 1. Range notation: PREFIX-N[–—-][PREFIX-]M  (en-dash, em-dash, or hyphen between two IDs)
  out = out.replace(
    /\b(T|P|FC|TR|PRD|INV)-(\d+)\s*[–—]\s*(?:T|P|FC|TR|PRD|INV)?-?(\d+)\b/g,
    (_match, prefix, fromStr, toStr) => {
      const from = parseInt(fromStr, 10)
      const to   = parseInt(toStr,   10)
      // Safety: only expand sensible ranges
      if (to <= from || to - from > 30) return _match
      // Preserve leading-zero width from the source (e.g. "012" → pad to 3 digits)
      const padLen = Math.max(fromStr.length, toStr.length)
      return Array.from({ length: to - from + 1 }, (_, i) =>
        `${prefix}-${String(from + i).padStart(padLen, '0')}`
      ).join(' / ')
    }
  )
  // 2. Slash list: PREFIX-N(/M)+
  out = out.replace(
    /\b(T|P|FC|TR|PRD|INV)-(\d+)((?:\/\d+)+)\b/g,
    (_match, prefix, first, rest) => {
      const nums = [first, ...rest.slice(1).split('/')]
      return nums.map(n => `${prefix}-${n}`).join(' / ')
    }
  )
  return out
}

// Static doc phrase definitions for prose auto-linking
const DOC_PHRASE_DEFS: Array<{ phrases: string[]; path: string }> = [
  // ── Core governance registers ─────────────────────────────────────────────
  { phrases: ['Claims Evidence Register', 'Claims and Evidence Register'], path: 'docs/governance/Claims_Evidence_Register.md' },
  { phrases: ['Hardening Queue'], path: 'docs/governance/Hardening_Queue.md' },
  { phrases: ['Patch Log'], path: 'docs/governance/Patch_Log.md' },
  { phrases: ['Threat Register'], path: 'docs/governance/Threat_Register.md' },
  { phrases: ['Threat Resolution Matrix'], path: 'docs/governance/Threat_Resolution_Matrix.md' },
  { phrases: ['Provenance Map'], path: 'docs/governance/Provenance_Map.md' },
  { phrases: ['Pilot Evidence Roadmap'], path: 'docs/governance/Pilot_Evidence_Roadmap.md' },
  { phrases: ['Open Problems Docket', 'Open Problems Resolution Docket'], path: 'docs/governance/Open_Problems_Resolution_Docket.md' },
  { phrases: ['Parameter Calibration Register'], path: 'docs/governance/Parameter_Calibration_Register.md' },
  { phrases: ['External Evidence Register'], path: 'docs/governance/External_Evidence_Register.md' },
  { phrases: ['Evidence Ladder'], path: 'docs/governance/Evidence_Ladder.md' },
  { phrases: ['Architecture Source Map'], path: 'docs/governance/Architecture_Source_Map.md' },
  { phrases: ['Collapse-State Crosswalk', 'Collapse State Crosswalk'], path: 'docs/governance/Collapse_State_Crosswalk.md' },
  { phrases: ['Abuse Case Library'], path: 'docs/governance/Abuse_Case_Library.md' },
  { phrases: ['Fairness Vignette Library'], path: 'docs/governance/Fairness_Vignette_Library.md' },
  { phrases: ['Implementation Drift Audit Package', 'Implementation Drift Audit'], path: 'docs/governance/Implementation_Drift_Audit_Package.md' },
  { phrases: ['Jurisdiction Interface Clause'], path: 'docs/governance/Jurisdiction_Interface_Clause.md' },
  // ── Evidence test packages (appear frequently in governing reference columns) ─
  { phrases: ['Capacity Measurement Evidence Test Package', 'Capacity Measurement Evidence Test'], path: 'docs/governance/Capacity_Measurement_Evidence_Test_Package.md' },
  { phrases: ['Identity and Recovery Evidence Test Package', 'Identity Recovery Evidence Test Package', 'Identity and Recovery Evidence Test'], path: 'docs/governance/Identity_Recovery_Evidence_Test_Package.md' },
  { phrases: ['Essential-Sector Refusal Test Package', 'Essential Sector Refusal Test Package', 'Essential-Sector Refusal Test'], path: 'docs/governance/Essential_Sector_Refusal_Test_Package.md' },
  { phrases: ['Demurrage Evidence and Test Package', 'Demurrage Evidence Test Package'], path: 'docs/governance/Demurrage_Evidence_Test_Package.md' },
  { phrases: ['Service Record Misuse Evidence Test Package', 'Service Record Misuse Evidence Test'], path: 'docs/governance/Service_Record_Misuse_Evidence_Test_Package.md' },
  { phrases: ['Capture Dashboard Specification'], path: 'docs/governance/Capture_Dashboard_Specification.md' },
  { phrases: ['Vulnerable Population Consent Protocol', 'VPCP'], path: 'docs/governance/Vulnerable_Population_Consent_Protocol.md' },
  // ── Founding & legitimacy dossiers ────────────────────────────────────────
  { phrases: ['Founding Legitimacy Dossier'], path: 'docs/governance/Founding_Legitimacy_Dossier.md' },
  { phrases: ['Conglomerate Transition Dossier'], path: 'docs/governance/Conglomerate_Transition_Dossier.md' },
  { phrases: ['Founding Disclosure', 'Pre-Activation Disclosure', 'Founding Pre-Activation Disclosure'], path: 'docs/governance/Founding_Preactivation_Disclosure.md' },
  { phrases: ['Founding Capital Framework'], path: 'docs/governance/Founding_Capital_Framework.md' },
  { phrases: ['Founding Team Composition Standard'], path: 'docs/governance/Founding_Team_Composition_Standard.md' },
  // ── Pilot & timeline ─────────────────────────────────────────────────────
  { phrases: ['Pilot Site Selection Criteria'], path: 'docs/governance/Pilot_Site_Selection_Criteria.md' },
  { phrases: ['Pilot Timeline Framework'], path: 'docs/governance/Pilot_Timeline_Framework.md' },
  // ── Simulations ───────────────────────────────────────────────────────────
  { phrases: ['Adversarial Narrative Simulation'], path: 'docs/simulations/Adversarial_Narrative_Simulation.md' },
  { phrases: ['Annual Compound Simulation'], path: 'docs/simulations/Annual_Compound_Simulation.md' },
  // ── Constitution & founding order ─────────────────────────────────────────
  { phrases: ['Acceptance Protocol'], path: 'docs/constitution/Acceptance_Protocol.md' },
  { phrases: ['Humane Constitution'], path: 'docs/constitution/Humane_Constitution.md' },
  { phrases: ['INVARIANTS', 'Constitutional Invariants'], path: 'docs/constitution/INVARIANTS.md' },
  { phrases: ['SPECIFICATIONS', 'Formal System Specifications'], path: 'docs/constitution/SPECIFICATIONS.md' },
  { phrases: ['Founding Order'], path: 'founding/order/README.md' },
  { phrases: ['Annex Index'], path: 'docs/annexes/INDEX.md' },
]

// phrase (lowercase) → target path, used to detect self-references
const DOC_PHRASE_PATH = new Map<string, string>(
  DOC_PHRASE_DEFS.flatMap(d => d.phrases.map(p => [p.toLowerCase(), d.path]))
)

// Regex: longest phrases first to prevent partial matches
const _docPhrasesSorted = DOC_PHRASE_DEFS.flatMap(d => d.phrases).sort((a, b) => b.length - a.length)
const DOC_PHRASE_PATTERN = new RegExp(
  `\\b(${_docPhrasesSorted.map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`,
  'gi'
)

function renderPlainWithRefChips(text: string, query: string, keyPrefix: string, noChips = false, currentDocPath?: string): React.ReactNode[] {
  if (noChips) {
    return renderTextWithHighlights(text, query, keyPrefix)
  }
  const expanded = expandShorthandRefs(text)

  interface TokenMatch { index: number; end: number; raw: string; key: string }
  const allMatches: TokenMatch[] = []

  // Pass 1: structured ref tokens (T-NNN, P-NNN, Annex XX, FC-NNN, etc.)
  REF_TOKEN_PATTERN.lastIndex = 0
  let rm: RegExpExecArray | null = REF_TOKEN_PATTERN.exec(expanded)
  while (rm) {
    const raw = (rm[1] ?? rm[2]) as string  // group 1: named refs, group 2: §section refs
    const key = raw.replace(/^ANNEX\s+/i, 'Annex ')
    allMatches.push({ index: rm.index, end: REF_TOKEN_PATTERN.lastIndex, raw, key })
    rm = REF_TOKEN_PATTERN.exec(expanded)
  }

  // Pass 2: doc phrase tokens — skip self-references and positions already claimed by pass 1
  DOC_PHRASE_PATTERN.lastIndex = 0
  let pm: RegExpExecArray | null = DOC_PHRASE_PATTERN.exec(expanded)
  while (pm) {
    const raw = pm[1]
    const phraseKey = raw.toLowerCase()
    const targetPath = DOC_PHRASE_PATH.get(phraseKey)
    const isSelf = currentDocPath !== undefined && targetPath === currentDocPath
    if (!isSelf) {
      const pStart = pm.index
      const pEnd = pm.index + raw.length
      const overlaps = allMatches.some(m => pStart < m.end && pEnd > m.index)
      if (!overlaps) {
        allMatches.push({ index: pStart, end: pEnd, raw, key: `docphrase:${phraseKey}` })
      }
    }
    pm = DOC_PHRASE_PATTERN.exec(expanded)
  }

  allMatches.sort((a, b) => a.index - b.index)

  const result: React.ReactNode[] = []
  let last = 0
  for (const m of allMatches) {
    if (m.index < last) continue
    if (m.index > last) {
      result.push(...renderTextWithHighlights(expanded.slice(last, m.index), query, `${keyPrefix}-pre-${m.index}`))
    }
    // Section refs (§X.Y) that have no lookup entry should still render as a
    // styled monospace span rather than unstyled plain text.
    const sectionFallback = m.raw.startsWith('§') ? (
      <code key={`${keyPrefix}-sect-${m.index}`} className="rounded-md bg-[rgba(60,54,46,0.08)] px-1.5 py-0.5 font-mono text-[0.88em] text-[var(--ink-strong)]">
        {m.raw}
      </code>
    ) : undefined
    result.push(<RefChip key={`${keyPrefix}-chip-${m.index}`} refKey={m.key} display={m.raw} fallback={sectionFallback} />)
    last = m.end
  }
  if (last < expanded.length) {
    result.push(...renderTextWithHighlights(expanded.slice(last), query, `${keyPrefix}-post`))
  }
  return result
}

function renderInline(text: string, keyPrefix: string, query = '', noChips = false, onInternalLink?: (href: string) => void, currentDocPath?: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  const tokenPattern = /(`[^`]+`|!\[([^\]]*)\]\(([^)]+)\)|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*)/g
  let lastIndex = 0
  let match: RegExpExecArray | null = tokenPattern.exec(text)

  while (match) {
    if (match.index > lastIndex) {
      parts.push(...renderPlainWithRefChips(text.slice(lastIndex, match.index), query, `${keyPrefix}-plain-${match.index}`, noChips, currentDocPath))
    }

    if (match[1]?.startsWith('`')) {
      const codeContent = match[1].slice(1, -1)
      const isPathLike = /[/\\]/.test(codeContent) || codeContent.endsWith('.md') || codeContent.endsWith('.ts') || codeContent.endsWith('.json')
      const codeEl = (
        <code
          key={`${keyPrefix}-code-${match.index}`}
          className="rounded-md bg-[rgba(60,54,46,0.08)] px-1.5 py-0.5 font-mono text-[0.88em] text-[var(--ink-strong)]"
        >
          {renderTextWithHighlights(codeContent, query, `${keyPrefix}-code-inline-${match.index}`)}
        </code>
      )
      // Try ref lookup for any code span — catches path-like refs AND things like "Annex Y §Y1"
      parts.push(
        <RefChip key={`${keyPrefix}-pathchip-${match.index}`} refKey={codeContent} display={codeContent} fallback={isPathLike ? undefined : codeEl} />
      )
    } else if (match[1]?.startsWith('!')) {
      // Image: ![alt](src) — check registry first, fall back to <img>
      const src = match[3] ?? ''
      const vMatch = src.match(/\/images\/(V-\d+)\.png/)
      const DiagramComponent = vMatch ? DiagramRegistry[vMatch[1]] : undefined
      parts.push(
        DiagramComponent ? (
          <DiagramComponent
            key={`${keyPrefix}-diagram-${match.index}`}
            onInternalLink={onInternalLink ?? (() => {})}
          />
        ) : (
          <img
            key={`${keyPrefix}-img-${match.index}`}
            src={src}
            alt={match[2] ?? ''}
            className="my-4 max-w-full rounded-lg"
          />
        ),
      )
    } else if (match[4] && match[5]) {
      const linkHref = match[5]
      const linkLabel = match[4]
      const isInternal = !!(onInternalLink && (linkHref.endsWith('.md') || linkHref.includes('.md#') || linkHref.startsWith('#')))
      const linkClass = 'cursor-pointer font-medium text-[var(--accent-deep)] underline decoration-[var(--accent-deep)] underline-offset-2 transition hover:opacity-75'
      parts.push(
        isInternal ? (
          <button
            key={`${keyPrefix}-link-${match.index}`}
            onClick={() => onInternalLink!(linkHref)}
            className={linkClass}
          >
            {renderTextWithHighlights(linkLabel, query, `${keyPrefix}-link-inline-${match.index}`)}
          </button>
        ) : (
          <a
            key={`${keyPrefix}-link-${match.index}`}
            href={linkHref}
            target="_blank"
            rel="noreferrer"
            className={linkClass}
          >
            {renderTextWithHighlights(linkLabel, query, `${keyPrefix}-link-inline-${match.index}`)}
          </a>
        ),
      )
    } else if (match[6]) {
      parts.push(
        <strong key={`${keyPrefix}-strong-${match.index}`} className="font-semibold text-[var(--ink-strong)]">
          {renderTextWithHighlights(match[6], query, `${keyPrefix}-strong-inline-${match.index}`)}
        </strong>,
      )
    } else if (match[7]) {
      parts.push(
        <em key={`${keyPrefix}-em-${match.index}`} className="italic text-[var(--ink)]">
          {renderTextWithHighlights(match[7], query, `${keyPrefix}-em-inline-${match.index}`)}
        </em>,
      )
    }

    lastIndex = tokenPattern.lastIndex
    match = tokenPattern.exec(text)
  }

  if (lastIndex < text.length) {
    parts.push(...renderPlainWithRefChips(text.slice(lastIndex), query, `${keyPrefix}-tail`, noChips, currentDocPath))
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

// ── Status badge helpers ──────────────────────────────────────────────────────

type StatusMeta = { badgeClass: string; rowClass: string; label: string }
// Headers that indicate a column carries status/level values eligible for badge rendering.
const STATUS_HEADER_RE = /status|level|evidence|severity|priority|state|type|risk|governing/i

const STATUS_MAP: Array<{ pattern: RegExp; meta: StatusMeta }> = [
  // ── Core corpus vocabulary (CLAUDE.md canonical set) ───────────────────────
  // Normalised input: em/en dashes already converted to hyphens by cleanStatusCell.
  { pattern: /^Active-unproven$/i,           meta: { badgeClass: 's-active-unproven', rowClass: 'row-active-unproven', label: 'Active — unproven' } },
  { pattern: /^Active$/i,                    meta: { badgeClass: 's-active',          rowClass: 'row-active',          label: 'Active' } },
  { pattern: /^Resolved$/i,                  meta: { badgeClass: 's-evidence-backed', rowClass: 'row-evidence-backed', label: 'Resolved' } },
  { pattern: /^Evidence-backed$/i,           meta: { badgeClass: 's-evidence-backed', rowClass: 'row-evidence-backed', label: 'Evidence-backed' } },
  { pattern: /^Designed$/i,                  meta: { badgeClass: 's-designed',        rowClass: 'row-designed',        label: 'Designed' } },
  { pattern: /^Proposed$/i,                  meta: { badgeClass: 's-proposed',        rowClass: 'row-proposed',        label: 'Proposed' } },
  { pattern: /Partly tested/i,               meta: { badgeClass: 's-partly-tested',   rowClass: 'row-partly-tested',   label: 'Partly tested' } },

  // ── Extended status variants found across corpus ───────────────────────────
  { pattern: /^Addressed\*?$/i,              meta: { badgeClass: 's-addressed',       rowClass: 'row-addressed',       label: 'Addressed' } },
  { pattern: /^Closed$/i,                    meta: { badgeClass: 's-closed',          rowClass: 'row-closed',          label: 'Closed' } },
  { pattern: /^Partial$/i,                   meta: { badgeClass: 's-partial',         rowClass: 'row-partial',         label: 'Partial' } },
  { pattern: /^Open$/i,                      meta: { badgeClass: 's-open',            rowClass: 'row-open',            label: 'Open' } },
  { pattern: /^Ongoing$/i,                   meta: { badgeClass: 's-ongoing',         rowClass: 'row-ongoing',         label: 'Ongoing' } },
  { pattern: /^Founding$/i,                  meta: { badgeClass: 's-founding',        rowClass: 'row-founding',        label: 'Founding' } },
  { pattern: /^Superseded$/i,                meta: { badgeClass: 's-closed',          rowClass: 'row-closed',          label: 'Superseded' } },
  { pattern: /^Retired$/i,                   meta: { badgeClass: 's-closed',          rowClass: 'row-closed',          label: 'Retired' } },

  // ── Claims Evidence Register / Hardening Queue compound statuses ───────────
  { pattern: /Active-unproven control/i,     meta: { badgeClass: 's-active-unproven', rowClass: 'row-active-unproven', label: 'Active — unproven' } },
  { pattern: /Unresolved prerequisite/i,     meta: { badgeClass: 's-unresolved',      rowClass: 'row-unresolved',      label: 'Unresolved prerequisite' } },
  { pattern: /Needs evidence/i,              meta: { badgeClass: 's-needs-evidence',  rowClass: 'row-needs-evidence',  label: 'Needs evidence' } },
  { pattern: /Needs simulation/i,            meta: { badgeClass: 's-needs-evidence',  rowClass: 'row-needs-evidence',  label: 'Needs simulation' } },
  { pattern: /Needs proof/i,                 meta: { badgeClass: 's-needs-evidence',  rowClass: 'row-needs-evidence',  label: 'Needs proof' } },
  { pattern: /Needs drills/i,                meta: { badgeClass: 's-needs-evidence',  rowClass: 'row-needs-evidence',  label: 'Needs drills' } },
  { pattern: /Moral commitment/i,            meta: { badgeClass: 's-moral',           rowClass: 'row-moral',           label: 'Moral commitment' } },
  { pattern: /Designed mechanism/i,          meta: { badgeClass: 's-designed',        rowClass: 'row-designed',        label: 'Designed' } },
  { pattern: /Designed direction/i,          meta: { badgeClass: 's-designed',        rowClass: 'row-designed',        label: 'Designed' } },
  { pattern: /Designed control/i,            meta: { badgeClass: 's-designed',        rowClass: 'row-designed',        label: 'Designed' } },
  { pattern: /Not ready/i,                   meta: { badgeClass: 's-open',            rowClass: 'row-open',            label: 'Not ready' } },
  { pattern: /Working prototype/i,           meta: { badgeClass: 's-partly-tested',   rowClass: 'row-partly-tested',   label: 'Working prototype' } },

  // ── Issue types (governance docs) ─────────────────────────────────────────
  { pattern: /^Defect$/i,                    meta: { badgeClass: 's-open',            rowClass: 'row-open',            label: 'Defect' } },
  { pattern: /^Structural gap$/i,            meta: { badgeClass: 's-unresolved',      rowClass: 'row-unresolved',      label: 'Structural gap' } },
  { pattern: /^Improvement$/i,               meta: { badgeClass: 's-designed',        rowClass: 'row-designed',        label: 'Improvement' } },
  { pattern: /^Uncertain$/i,                 meta: { badgeClass: 's-proposed',        rowClass: 'row-proposed',        label: 'Uncertain' } },

  // ── Severity / priority levels ─────────────────────────────────────────────
  { pattern: /^Critical$/i,            meta: { badgeClass: 's-critical', rowClass: 'row-open',     label: 'Critical' } },
  { pattern: /^Med-High$/i,            meta: { badgeClass: 's-med-high', rowClass: 'row-partial',  label: 'Med-High' } },
  { pattern: /^High$/i,                meta: { badgeClass: 's-high',     rowClass: 'row-partial',  label: 'High' } },
  { pattern: /^Medium$/i,              meta: { badgeClass: 's-medium',   rowClass: '',             label: 'Medium' } },
  { pattern: /^Low$/i,                 meta: { badgeClass: 's-low',      rowClass: '',             label: 'Low' } },
]

function cleanStatusCell(cell: string): string {
  return cell
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .trim()
    .replace(/\s+/g, ' ')
    // Normalise em-dash (—) and en-dash (–) to hyphen so patterns above don't
    // need separate em-dash variants. "Active — unproven" → "Active-unproven".
    .replace(/\s*[—–]\s*/g, '-')
}

function matchStatus(cell: string): StatusMeta | null {
  const trimmed = cleanStatusCell(cell)
  for (const { pattern, meta } of STATUS_MAP) {
    if (pattern.test(trimmed)) return meta
  }
  return null
}

function getRowStatusClass(row: string[], statusCols: Set<number>): string {
  for (const [i, cell] of row.entries()) {
    if (statusCols.size > 0 && !statusCols.has(i)) continue
    const meta = matchStatus(cell)
    if (meta?.rowClass) return meta.rowClass
  }
  return ''
}

function getTableGroupColumn(headers: string[]): number | null {
  const groupHeaders = new Set(['status', 'honest status', 'state', 'level', 'severity', 'priority'])
  const groupIndex = headers.findIndex((header) => groupHeaders.has(cleanStatusCell(header).toLowerCase()))
  return groupIndex >= 0 ? groupIndex : null
}

function getTableCardTitleColumn(headers: string[], statusCols: Set<number>): number {
  const titleIndex = headers.findIndex((_, index) => !statusCols.has(index))
  return titleIndex >= 0 ? titleIndex : 0
}

function getTableGroupLabel(cell: string): string {
  return matchStatus(cell)?.label ?? (cleanStatusCell(cell) || 'Unspecified')
}

function renderTableCell(text: string, keyPrefix: string, query: string, isStatusCol: boolean, onInternalLink?: (href: string) => void, currentDocPath?: string): React.ReactNode {
  if (isStatusCol) {
    const meta = matchStatus(text.trim())
    if (meta) {
      return (
        <span className={`status-badge ${meta.badgeClass}`}>
          {meta.label}
        </span>
      )
    }
  }
  // Annex code in a table cell, optionally followed by a parenthetical label
  // e.g. "AB", "AH2", "AE2.1", "AH (Founding Order)"
  const standaloneAnnex = text.trim().match(/^([A-Z]{1,3}\d*(?:\.\d+)*)(\s*\(.*\))?$/)
  if (standaloneAnnex) {
    const code = standaloneAnnex[1]
    const suffix = standaloneAnnex[2] ?? ''
    return <>{<RefChip refKey={`Annex ${code}`} display={code} />}{suffix && <span className="text-[var(--ink-muted)] ml-1">{suffix}</span>}</>
  }
  return renderInline(text, keyPrefix, query, false, onInternalLink, currentDocPath)
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


function jumpToHeading(doc: CorpusDoc, slug: string) {
  const element = document.getElementById(headingScrollId(doc, slug))
  if (!element) return
  element.scrollIntoView({ behavior: 'auto', block: 'start' })
  element.classList.remove('link-pulse')
  void element.offsetWidth // force reflow so re-adding the class restarts the animation
  element.classList.add('link-pulse')
  element.addEventListener('animationend', () => element.classList.remove('link-pulse'), { once: true })
}

function queueHeadingJump(doc: CorpusDoc, slug: string) {
  const jump = () => jumpToHeading(doc, slug)
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(jump)
  })
  window.setTimeout(jump, 50)
  window.setTimeout(jump, 150)
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
      ? 'border-[rgba(159,108,49,0.45)] bg-[var(--accent-soft)] text-[var(--accent-deep)] hover:opacity-80'
      : 'border-[var(--line-strong)] bg-[var(--paper-strong)] text-[var(--ink-soft)] hover:text-[var(--ink-strong)] hover:bg-[var(--paper-warm)]'

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

/* ============================================================
 * Mermaid diagram renderer — lazy-loaded, themed to match the app palette.
 * ============================================================ */

let mermaidReady = false

async function renderMermaid(code: string, id: string): Promise<string> {
  const mermaid = (await import('mermaid')).default
  if (!mermaidReady) {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        background: '#fdf9f2',
        primaryColor: '#f3ede4',
        primaryTextColor: '#2a2722',
        primaryBorderColor: 'rgba(60,54,46,0.28)',
        lineColor: 'rgba(60,54,46,0.4)',
        secondaryColor: '#f8f1e5',
        tertiaryColor: '#fdf9f2',
        fontFamily: '"Iowan Old Style","Palatino Linotype","Book Antiqua",Georgia,serif',
        fontSize: '13px',
        // state diagram
        stateBkg: '#fdf9f2',
        stateBorder: 'rgba(60,54,46,0.25)',
        transitionColor: 'rgba(60,54,46,0.45)',
        // graph nodes
        clusterBkg: '#f8f1e5',
        clusterBorder: 'rgba(60,54,46,0.15)',
        edgeLabelBackground: '#fdf9f2',
        // special nodes
        labelBoxBkgColor: '#f3ede4',
        labelBoxBorderColor: 'rgba(60,54,46,0.18)',
        labelTextColor: '#2a2722',
        activeTaskBkgColor: 'rgba(230,207,172,0.35)',
        activeTaskBorderColor: '#9f6c31',
        doneTaskBkgColor: '#f3ede4',
        doneTaskBorderColor: 'rgba(60,54,46,0.2)',
        critBkgColor: 'rgba(159,108,49,0.1)',
        critBorderColor: 'rgba(159,108,49,0.5)',
        // notes / annotations
        noteBkgColor: '#f8f1e5',
        noteBorderColor: 'rgba(159,108,49,0.3)',
        noteTextColor: '#5e584f',
        // title
        titleColor: '#2a2722',
      },
    })
    mermaidReady = true
  }
  const safeId = id.replace(/[^a-zA-Z0-9]/g, '_')
  const { svg } = await mermaid.render(safeId, code)
  return svg
}

function MermaidBlock({ code, id }: { code: string; id: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setError(null)
    renderMermaid(code, id)
      .then((svg) => {
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg
          // Make the generated SVG responsive
          const svgEl = containerRef.current.querySelector('svg')
          if (svgEl) {
            svgEl.removeAttribute('height')
            svgEl.style.maxWidth = '100%'
            svgEl.style.height = 'auto'
          }
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Diagram render failed')
        }
      })
    return () => {
      cancelled = true
    }
  }, [code, id])

  if (error) {
    return (
      <div className="reader-code">
        <p className="reader-code-label text-[#8b2d2d]">diagram error</p>
        <pre className="whitespace-pre-wrap break-words text-[0.82rem] text-[#8b2d2d]">{error}</pre>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      data-testid={`mermaid-${id}`}
      className="my-2 overflow-x-auto rounded-lg border border-line bg-paper-strong p-4"
      aria-label="Diagram"
    />
  )
}

function resolveInternalDoc(href: string, currentPath: string, allDocs: CorpusDoc[]): CorpusDoc | null {
  const path = href.split('#')[0]
  if (!path.endsWith('.md')) return null
  // Resolve path relative to the directory of the current doc path
  const dir = currentPath.includes('/') ? currentPath.slice(0, currentPath.lastIndexOf('/')) : ''
  const parts = (dir ? dir + '/' + path : path).split('/')
  const resolved: string[] = []
  for (const part of parts) {
    if (part === '..') resolved.pop()
    else if (part !== '.') resolved.push(part)
  }
  const resolvedPath = resolved.join('/')
  return allDocs.find((d) => d.path === resolvedPath) ?? null
}

function MarkdownDocument({
  doc,
  searchQuery,
  copiedHeadingSlug,
  onCopyHeadingLink,
  allDocs,
  onSelectDoc,
}: {
  doc: CorpusDoc
  searchQuery: string
  copiedHeadingSlug: string | null
  onCopyHeadingLink: (slug: string) => void
  allDocs: CorpusDoc[]
  onSelectDoc: (doc: CorpusDoc) => void
}) {
  const blocks = parseMarkdown(doc)
  const handleInternalLink = (href: string) => {
    const hashIdx = href.indexOf('#')
    const pathPart = hashIdx >= 0 ? href.slice(0, hashIdx) : href
    const anchor = hashIdx >= 0 ? href.slice(hashIdx + 1) : null
    const target = pathPart ? resolveInternalDoc(pathPart, doc.path, allDocs) : null
    const finalTarget = target ?? (anchor ? doc : null)
    if (!finalTarget) return
    const scrollToAnchor = anchor
      ? () => {
          const el =
            document.getElementById(`${finalTarget.id}--${anchor}`) ??
            document.getElementById(anchor)
          if (!el) return
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          el.classList.remove('link-pulse')
          void el.offsetWidth
          el.classList.add('link-pulse')
          el.addEventListener('animationend', () => el.classList.remove('link-pulse'), { once: true })
        }
      : null
    if (target && target.id !== doc.id) {
      onSelectDoc(target)
      if (scrollToAnchor) setTimeout(scrollToAnchor, 200)
    } else if (scrollToAnchor) {
      scrollToAnchor()
    }
  }
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
                {renderInline(block.text, `${doc.id}-heading-inline-${index}`, searchQuery, true)}
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
              {renderInline(block.text, `${doc.id}-paragraph-inline-${index}`, searchQuery, false, handleInternalLink, doc.path)}
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
                  {renderInline(item, `${doc.id}-list-inline-${index}-${itemIndex}`, searchQuery, false, handleInternalLink, doc.path)}
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

        if (block.type === 'mermaid') {
          return (
            <MermaidBlock
              key={`${doc.id}-mermaid-${index}`}
              id={`${doc.id}-mermaid-${index}`}
              code={block.code}
            />
          )
        }

        if (block.type === 'statechart') {
          return (
            <StatechartDiagram
              key={`${doc.id}-statechart-${index}`}
              dsl={block.code}
            />
          )
        }

        if (block.type === 'quote') {
          return (
            <blockquote key={`${doc.id}-quote-${index}`} className="reader-quote">
              {renderInline(block.text, `${doc.id}-quote-inline-${index}`, searchQuery, false, handleInternalLink, doc.path)}
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

          const statusCols = new Set(
            parsedTable.headers
              .map((h, i) => (STATUS_HEADER_RE.test(h) ? i : -1))
              .filter((i) => i >= 0)
          )
          const groupColumn = getTableGroupColumn(parsedTable.headers)
          const titleColumn = getTableCardTitleColumn(parsedTable.headers, statusCols)
          const groupedRows = parsedTable.rows.reduce<Array<{ label: string; rows: Array<{ row: string[]; rowIndex: number }> }>>((groups, row, rowIndex) => {
            const label = groupColumn === null ? '' : getTableGroupLabel(row[groupColumn] ?? '')
            const existingGroup = groups.find((group) => group.label === label)
            if (existingGroup) {
              existingGroup.rows.push({ row, rowIndex })
            } else {
              groups.push({ label, rows: [{ row, rowIndex }] })
            }
            return groups
          }, [])

          return (
            <div key={`${doc.id}-table-${index}`} className="reader-table-set">
              <div className="reader-table-wrap">
                <table className="reader-table">
                  <thead>
                    <tr>
                      {parsedTable.headers.map((header, headerIndex) => (
                        <th key={`${doc.id}-table-header-${index}-${headerIndex}`}>
                          {renderInline(header, `${doc.id}-table-header-inline-${index}-${headerIndex}`, searchQuery, false, undefined, doc.path)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {parsedTable.rows.map((row, rowIndex) => {
                      const rowClass = getRowStatusClass(row, statusCols)
                      return (
                        <tr key={`${doc.id}-table-row-${index}-${rowIndex}`} className={rowClass || undefined}>
                          {row.map((cell, cellIndex) => (
                            <td key={`${doc.id}-table-cell-${index}-${rowIndex}-${cellIndex}`}>
                              {renderTableCell(cell, `${doc.id}-table-cell-inline-${index}-${rowIndex}-${cellIndex}`, searchQuery, statusCols.has(cellIndex), handleInternalLink, doc.path)}
                            </td>
                          ))}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div className="reader-table-cards">
                {groupedRows.map((group, groupIndex) => (
                  <section key={`${doc.id}-table-card-group-${index}-${groupIndex}`} className="reader-table-card-group">
                    {groupColumn !== null ? (
                      <h3 className="reader-table-card-group-title">
                        {group.label}
                        <span>{group.rows.length}</span>
                      </h3>
                    ) : null}
                    <div className="reader-table-card-list" role="list" aria-label={groupColumn === null ? 'Table rows' : `${group.label} rows`}>
                      {group.rows.map(({ row, rowIndex }) => {
                        const rowClass = getRowStatusClass(row, statusCols)
                        return (
                          <article
                            key={`${doc.id}-table-card-${index}-${rowIndex}`}
                            className={`reader-table-card ${rowClass}`}
                            role="listitem"
                          >
                            <div className="reader-table-card-header">
                              <span className="reader-table-card-label">
                                {renderInline(parsedTable.headers[titleColumn] ?? 'Item', `${doc.id}-table-card-title-label-${index}-${rowIndex}`, searchQuery, false, undefined, doc.path)}
                              </span>
                              <div className="reader-table-card-title">
                                {renderTableCell(row[titleColumn] ?? '', `${doc.id}-table-card-title-${index}-${rowIndex}`, searchQuery, statusCols.has(titleColumn), handleInternalLink, doc.path)}
                              </div>
                            </div>
                            <dl className="reader-table-card-fields">
                              {parsedTable.headers.map((header, cellIndex) => {
                                if (cellIndex === titleColumn || !row[cellIndex]?.trim()) return null
                                return (
                                  <div key={`${doc.id}-table-card-field-${index}-${rowIndex}-${cellIndex}`} className="reader-table-card-field">
                                    <dt>
                                      {renderInline(header, `${doc.id}-table-card-field-label-${index}-${rowIndex}-${cellIndex}`, searchQuery, false, undefined, doc.path)}
                                    </dt>
                                    <dd>
                                      {renderTableCell(row[cellIndex], `${doc.id}-table-card-field-value-${index}-${rowIndex}-${cellIndex}`, searchQuery, statusCols.has(cellIndex), handleInternalLink, doc.path)}
                                    </dd>
                                  </div>
                                )
                              })}
                            </dl>
                          </article>
                        )
                      })}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          )
        }

        return <div key={`${doc.id}-rule-${index}`} className="my-10 h-px bg-[rgba(60,54,46,0.12)]" />
      })}
    </article>
  )
}

/* ============================================================
 * DocListPanel — Scholar left column: section picker + 2-tab panel (Docs / Topics).
 * Reading Paths moved to header dropdown in Layout.tsx.
 * ============================================================ */

// Section options for the top picker — excludes topics/paths/settings
// which are handled by the tab strip.
const SECTION_OPTIONS: Array<{ id: AppView; label: string }> = [
  { id: 'home',         label: 'Home' },
  { id: 'constitution', label: 'Constitution' },
  { id: 'annexes',      label: 'Annexes' },
  { id: 'registries',   label: 'Threats & Patches' },
  { id: 'validation',   label: 'Validation' },
]

type PanelTab = 'docs' | 'topics'

function DocListPanel({
  docs,
  allDocs,
  selectedId,
  onSelect,
  readDocIds,
  view,
  onViewChange,
}: {
  docs: CorpusDoc[]
  allDocs: CorpusDoc[]
  selectedId: string | null
  onSelect: (doc: CorpusDoc) => void
  readDocIds: string[]
  view: AppView
  onViewChange: (v: AppView) => void
}) {
  const [tab, setTab] = useState<PanelTab>('docs')
  const [sectionOpen, setSectionOpen] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Close section dropdown on outside click
  useEffect(() => {
    if (!sectionOpen) return
    function onPointer(e: PointerEvent) {
      if (sectionRef.current && !sectionRef.current.contains(e.target as Node)) {
        setSectionOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointer)
    return () => document.removeEventListener('pointerdown', onPointer)
  }, [sectionOpen])

  const sectionLabel = SECTION_OPTIONS.find(s => s.id === view)?.label ?? view

  // Unique topics sorted by doc count, computed once from the full corpus.
  const allTopics = useMemo(() => {
    const counts = new Map<string, number>()
    for (const doc of allDocs) {
      for (const t of getDocTopics(doc)) {
        counts.set(t, (counts.get(t) ?? 0) + 1)
      }
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => ({ tag, count }))
  }, [allDocs])

  if (!docs.length && tab === 'docs') return null

  const TABS: Array<{ id: PanelTab; label: string }> = [
    { id: 'docs',   label: 'Docs'   },
    { id: 'topics', label: 'Topics' },
  ]

  const itemStyle = (active: boolean, read = false): React.CSSProperties => ({
    padding: '0.46rem 1rem',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    fontFamily: 'var(--font-serif)',
    fontSize: '0.81em',
    lineHeight: 1.45,
    background: active ? 'rgba(159,108,49,0.09)' : 'transparent',
    color: active ? 'var(--accent-deep)' : read ? 'var(--ink-soft)' : 'var(--ink)',
    borderLeft: active ? '2px solid var(--accent)' : '2px solid transparent',
    transition: 'all 0.1s',
    display: 'block',
  })

  return (
    <nav
      aria-label="Navigation panel"
      className="hidden xl:flex xl:flex-col"
      style={{ width: 212, flexShrink: 0, borderRight: '1px solid var(--line)' }}
    >
      {/* ── Section picker ── */}
      <div ref={sectionRef} style={{ position: 'relative', padding: '0.6rem 0.65rem 0.55rem', borderBottom: '1px solid var(--line)' }}>
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={sectionOpen}
          onClick={() => setSectionOpen(o => !o)}
          style={{
            display: 'flex', width: '100%', alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.28rem 0.6rem',
            background: 'rgba(159,108,49,0.06)',
            border: '1px solid var(--line-strong)',
            borderRadius: 5, cursor: 'pointer',
            fontFamily: 'var(--font-mono)', fontSize: '0.69em',
            letterSpacing: '0.07em', textTransform: 'uppercase',
            color: 'var(--ink-soft)', transition: 'border-color 0.15s',
          }}
        >
          <span style={{ color: 'var(--ink-strong)', fontWeight: 600 }}>{sectionLabel}</span>
          <svg aria-hidden="true" viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M2 4l4 4 4-4" />
          </svg>
        </button>
        {sectionOpen && (
          <div
            role="listbox"
            aria-label="Select section"
            style={{
              position: 'absolute', top: 'calc(100% + 2px)',
              left: '0.65rem', right: '0.65rem', zIndex: 60,
              background: 'var(--paper-strong)',
              border: '1px solid var(--line-strong)',
              borderRadius: 7,
              boxShadow: '0 8px 28px rgba(0,0,0,0.22)',
              overflow: 'hidden',
            }}
          >
            {SECTION_OPTIONS.map(s => (
              <button
                key={s.id}
                role="option"
                aria-selected={view === s.id}
                type="button"
                onClick={() => { onViewChange(s.id); setSectionOpen(false) }}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '0.45rem 0.75rem', border: 'none',
                  background: view === s.id ? 'rgba(159,108,49,0.1)' : 'transparent',
                  color: view === s.id ? 'var(--accent-deep)' : 'var(--ink)',
                  fontFamily: 'var(--font-ui)', fontSize: '0.83em',
                  cursor: 'pointer', transition: 'background 0.1s',
                  fontWeight: view === s.id ? 600 : 400,
                  borderLeft: view === s.id ? '2px solid var(--accent)' : '2px solid transparent',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Tab strip ── */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--line)', padding: '0.5rem 0.75rem 0' }}>
        {TABS.map(t => (
          <button
            key={t.id}
            type="button"
            aria-selected={tab === t.id}
            role="tab"
            onClick={() => setTab(t.id)}
            style={{
              flex: 1,
              padding: '5px 2px 6px',
              border: 'none',
              background: 'transparent',
              color: tab === t.id ? 'var(--accent-deep)' : 'var(--ink-faint)',
              fontSize: '0.7em',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontWeight: tab === t.id ? 700 : 400,
              borderBottom: tab === t.id ? '2px solid var(--accent)' : '2px solid transparent',
              transition: 'color 0.15s, border-color 0.15s',
              marginBottom: -1,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Content ── */}
      <div style={{ overflowY: 'auto', flex: 1, maxHeight: 'calc(100dvh - 9rem)', scrollbarWidth: 'none' }}>

        {/* Docs tab — current section document list */}
        {tab === 'docs' && docs.map((doc) => {
          const isSelected = doc.id === selectedId
          const isRead = readDocIds.includes(doc.id)
          return (
            <button key={doc.id} type="button" onClick={() => onSelect(doc)}
              aria-current={isSelected ? 'page' : undefined}
              style={itemStyle(isSelected, isRead)}
            >
              <span className="line-clamp-2">{doc.title}</span>
              {isRead && !isSelected && (
                <span style={{ fontSize: '0.72em', color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)' }}> ✓</span>
              )}
            </button>
          )
        })}

        {/* Topics tab — all unique topic tags with doc counts */}
        {tab === 'topics' && allTopics.map(({ tag, count }) => {
          const first = allDocs.find(d => getDocTopics(d).includes(tag))
          return (
            <button key={tag} type="button"
              onClick={() => { if (first) onSelect(first) }}
              style={{
                ...itemStyle(false),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-ui)',
              }}
            >
              <span style={{ lineHeight: 1.35 }}>{tag}</span>
              <span style={{ fontSize: '0.73em', color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{count}</span>
            </button>
          )
        })}

      </div>
    </nav>
  )
}

/* ============================================================
 * ReaderOutline — sticky table of contents, highlights active heading.
 * ============================================================ */

function ReaderOutline({
  doc,
  readerRef,
}: {
  doc: CorpusDoc
  readerRef: React.RefObject<HTMLDivElement | null>
}) {
  const [activeSlug, setActiveSlug] = useState('')

  useEffect(() => {
    const container = readerRef.current
    if (!container || !doc.headings.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length) {
          const el = visible[0].target as HTMLElement
          // headingScrollId format: `${docId}--${slug}`
          const parts = el.id.split('--')
          const slug = parts.length > 1 ? parts.slice(1).join('--') : ''
          if (slug) setActiveSlug(slug)
        }
      },
      {
        root: container,
        rootMargin: '-8% 0px -65% 0px',
        threshold: 0,
      },
    )

    const headingEls = container.querySelectorAll<HTMLElement>(`[id^="${doc.id}--"]`)
    headingEls.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [doc.id, readerRef])

  if (doc.headings.length < 3) return null

  return (
    <nav aria-label="Document outline" className="reader-outline hidden xl:block" style={{ width: 196, flexShrink: 0 }}>
      <p className="reader-outline-label">Contents</p>
      {doc.headings.map((h) => (
        <button
          key={h.slug}
          type="button"
          data-active={activeSlug === h.slug ? 'true' : 'false'}
          data-level={String(h.level)}
          className="reader-outline-item"
          title={h.text}
          onClick={() => {
            const el = document.getElementById(headingScrollId(doc, h.slug))
            if (!el) return
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            setActiveSlug(h.slug)
          }}
        >
          <span className="line-clamp-2">{h.text}</span>
        </button>
      ))}
    </nav>
  )
}

function ReaderPanel({
  doc,
  feedback,
  onOpenSource,
  pinned,
  onTogglePinned,
  read,
  onToggleRead,
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
  activePathId,
  allCorpusDocs,
  onMarkDocRead,
  onSelectPathDoc,
  onClearPath,
}: {
  doc: CorpusDoc
  feedback: SourceFeedback
  onOpenSource: () => void
  pinned: boolean
  onTogglePinned: () => void
  read: boolean
  onToggleRead: () => void
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
  activePathId?: string | null
  allCorpusDocs?: CorpusDoc[]
  onMarkDocRead?: (docId: string) => void
  onSelectPathDoc?: (doc: CorpusDoc) => void
  onClearPath?: (nextView?: AppView) => void
}) {
  // Derive active path context
  const activePath = activePathId ? READING_PATHS.find((p) => p.id === activePathId) ?? null : null
  const pathDocs = activePath && allCorpusDocs
    ? activePath.steps.map((s) => allCorpusDocs.find((d) => d.path === s.path) ?? null)
    : []
  const pathStepIndex = activePath ? pathDocs.findIndex((d) => d?.id === doc.id) : -1
  const pathPrevDoc = pathStepIndex > 0 ? pathDocs[pathStepIndex - 1] : null
  const pathNextDoc = pathStepIndex >= 0 && pathStepIndex < pathDocs.length - 1 ? pathDocs[pathStepIndex + 1] : null
  const isLastPathStep = activePath !== null && pathStepIndex >= 0 && pathStepIndex === pathDocs.length - 1

  // Scroll-to-bottom sentinel: auto-mark read when the reader reaches the end
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!activePath || pathStepIndex < 0 || !sentinelRef.current) return
    const el = sentinelRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onMarkDocRead?.(doc.id)
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [doc.id, activePath, pathStepIndex])
  return (
    <section id="reader-panel-start" data-testid="reader-panel" className="scroll-mt-16 space-y-6 sm:space-y-8">
      <header className="border-b border-line pb-5 sm:pb-6">
        <div className="reader-doc-eyebrow flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <p className="text-[10px] uppercase tracking-[0.16em] text-ink-faint sm:text-[11px]">
            {SECTION_LABELS[doc.section]}
          </p>
          <p className="font-mono text-[10px] text-ink-faint sm:text-[11px] break-all">{doc.path}</p>
        </div>
        <h2
          data-testid="reader-title"
          className="mt-2 font-serif text-[1.75rem] leading-[1.15] tracking-tight text-ink-strong sm:mt-3 sm:text-[2.4rem] sm:leading-snug"
        >
          {doc.title.replace(/^(INVARIANTS|SPECIFICATIONS)(?:\.md)?\s*[—–]\s*/, '')}
        </h2>
        {doc.summary ? (
          <p className="mt-3 max-w-[40rem] text-[14px] leading-[1.65] text-ink-soft sm:mt-4 sm:text-[15px] sm:leading-7">{doc.summary}</p>
        ) : null}

        <div className="reader-doc-meta mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-ink-faint sm:mt-4 sm:gap-x-4 sm:gap-y-2 sm:text-[12px]">
          <span>{estimatedReadMinutes(doc.wordCount)} min read</span>
          <span aria-hidden="true">·</span>
          <span>{doc.headingCount} headings</span>
          <span aria-hidden="true">·</span>
          <span>{doc.wordCount.toLocaleString()} words</span>
        </div>

        <div className="reader-doc-toolbar mt-4 flex flex-wrap items-center gap-2 sm:mt-5">
          <ActionButton
            label={pinned ? 'Unpin' : 'Pin'}
            onClick={onTogglePinned}
            tone={pinned ? 'accent' : 'default'}
          />
          <ActionButton
            label={read ? 'Mark unread' : 'Mark as read'}
            onClick={onToggleRead}
            tone={read ? 'accent' : 'default'}
          />
          <ActionButton
            label={readingMode ? 'Exit reading mode' : 'Reading mode'}
            onClick={onToggleReadingMode}
            tone={readingMode ? 'accent' : 'default'}
            testId="reading-mode-toggle"
          />
          <ActionButton label="Open source" onClick={onOpenSource} />

          <div className="reader-find-controls mt-2 flex w-full items-center gap-2 sm:ml-auto sm:mt-0 sm:w-auto">
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
              className="focus-ring w-full min-w-0 rounded border border-[var(--line-strong)] bg-[var(--paper-strong)] px-3 py-2 font-serif text-[16px] text-ink-strong placeholder:text-ink-faint sm:w-56 sm:py-1.5 sm:text-[14px]"
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

      {/* Path progress banner */}
      {activePath && pathStepIndex >= 0 && (
        <div className="mx-auto mb-4 flex items-center gap-2 sm:gap-3" style={{ maxWidth: 'var(--reader-column-width)' }}>
          <div className="flex min-w-0 flex-1 flex-col gap-1.5 rounded-lg border border-accent/25 bg-accent/5 px-3 py-2.5 sm:px-4">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 sm:flex-nowrap">
              <span className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-accent-deep">{activePath.title}</span>
              <span className="hidden sm:inline text-ink-faint">·</span>
              <div className="flex flex-wrap gap-1">
                {pathDocs.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-3 rounded-full transition-all sm:w-4 ${i < pathStepIndex ? 'bg-emerald-500/70' : i === pathStepIndex ? 'bg-accent' : 'bg-line'}`}
                  />
                ))}
              </div>
              <span className="ml-auto font-mono text-[10px] text-ink-faint sm:ml-1">{pathStepIndex + 1}/{pathDocs.length}</span>
            </div>
            {activePath.steps[pathStepIndex]?.note && (
              <p className="text-[12px] leading-5 text-ink-soft">{activePath.steps[pathStepIndex].note}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => onClearPath?.()}
            aria-label="Exit reading path"
            className="focus-ring flex h-9 w-9 shrink-0 items-center justify-center rounded text-[13px] text-ink-faint transition hover:text-ink"
            title="Exit reading path"
          >
            ✕
          </button>
        </div>
      )}

      <article data-testid="reader-paper-shell">
        <div
          data-testid="reader-document"
          className="mx-auto"
          style={{ maxWidth: 'var(--reader-column-width)' }}
        >
          <MarkdownDocument
            doc={doc}
            searchQuery={searchQuery}
            copiedHeadingSlug={copiedHeadingSlug}
            onCopyHeadingLink={onCopyHeadingLink}
            allDocs={allDocs}
            onSelectDoc={onSelectDoc}
          />

          {/* Scroll sentinel for auto-mark-read */}
          {activePath && pathStepIndex >= 0 && <div ref={sentinelRef} className="h-1" />}

          {activePath && pathStepIndex >= 0 ? (
            <aside className="mt-16 border-t border-line pt-10">
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                {isLastPathStep ? 'Path complete' : 'Next in path'}
              </p>
              {isLastPathStep ? (
                <div className="rounded-lg border border-emerald-700/30 bg-emerald-900/20 p-5">
                  <p className="font-serif text-[1rem] font-semibold text-emerald-300">
                    You've finished {activePath.title}
                  </p>
                  <p className="mt-1 text-[13px] text-ink-soft">All {pathDocs.length} documents in this path read.</p>
                  <button
                    type="button"
                    onClick={() => onClearPath?.('paths')}
                    className="focus-ring mt-4 rounded-md border border-emerald-700/40 bg-emerald-900/30 px-4 py-2 text-[13px] font-medium text-emerald-300 transition hover:bg-emerald-900/50"
                  >
                    Back to Reading Paths
                  </button>
                </div>
              ) : pathNextDoc ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {pathPrevDoc && (
                    <button
                      type="button"
                      onClick={() => onSelectPathDoc?.(pathPrevDoc)}
                      className="focus-ring group flex flex-col rounded-lg border border-line bg-paper-strong p-4 text-left transition hover:border-[rgba(159,108,49,0.4)] hover:shadow-sm"
                    >
                      <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-2 py-0.5 font-sans text-[10px] tracking-[0.02em] text-ink-faint">
                        ← Previous
                      </span>
                      <h3 className="font-serif text-[0.97rem] font-semibold leading-snug text-ink-strong group-hover:text-[var(--accent-deep)]">
                        {pathPrevDoc.title}
                      </h3>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onSelectPathDoc?.(pathNextDoc)}
                    className="focus-ring group flex flex-col rounded-lg border border-accent/30 bg-accent/5 p-4 text-left transition hover:border-accent/60 hover:shadow-sm"
                  >
                    <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 font-sans text-[10px] tracking-[0.02em] text-accent-deep">
                      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent opacity-70" />
                      Next · {activePath.title}
                    </span>
                    <h3 className="font-serif text-[0.97rem] font-semibold leading-snug text-ink-strong group-hover:text-[var(--accent-deep)]">
                      {pathNextDoc.title}
                    </h3>
                    {activePath.steps[pathStepIndex + 1]?.note && (
                      <p className="mt-1.5 text-[12px] leading-5 text-ink-soft">
                        {activePath.steps[pathStepIndex + 1].note}
                      </p>
                    )}
                    <p className="mt-auto pt-2 text-[11px] text-ink-faint">
                      Step {pathStepIndex + 2} of {pathDocs.length}
                    </p>
                  </button>
                </div>
              ) : null}
            </aside>
          ) : (
            <ReadNext
              current={doc}
              allDocs={allDocs}
              recentIds={recentIds}
              pinnedIds={pinnedIds}
              onSelect={onSelectDoc}
            />
          )}
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
  recentIds,
  onSelectQuickDoc,
  onTogglePinned,
  readDocIds,
  onToggleRead,
  readingMode,
  onToggleReadingMode,
  onOpenSource,
  feedback,
  emptyLabel,
  readerPaneRef,
  copiedHeadingSlug,
  onCopyHeadingLink,
  searchQuery,
  onSearchChange,
  searchInputRef,
  matchCount,
  currentMatchIndex,
  onJumpToPreviousMatch,
  onJumpToNextMatch,
  activePathId,
  allCorpusDocs,
  onMarkDocRead,
  onSelectPathDoc,
  onClearPath,
}: {
  docs: CorpusDoc[]
  allDocs: CorpusDoc[]
  selectedDoc: CorpusDoc | null
  pinnedDocIds: string[]
  recentIds: string[]
  onSelectQuickDoc: (doc: CorpusDoc) => void
  onTogglePinned: () => void
  readDocIds: string[]
  onToggleRead: () => void
  readingMode: boolean
  onToggleReadingMode: () => void
  onOpenSource: (doc: CorpusDoc) => void
  feedback: SourceFeedback
  emptyLabel: string
  readerPaneRef: (node: HTMLDivElement | null) => void
  copiedHeadingSlug: string | null
  onCopyHeadingLink: (slug: string) => void
  searchQuery: string
  onSearchChange: (value: string) => void
  searchInputRef: (node: HTMLInputElement | null) => void
  matchCount: number
  currentMatchIndex: number
  onJumpToPreviousMatch: () => void
  onJumpToNextMatch: () => void
  activePathId: string | null
  allCorpusDocs: CorpusDoc[]
  onMarkDocRead: (docId: string) => void
  onSelectPathDoc: (doc: CorpusDoc) => void
  onClearPath: (nextView?: AppView) => void
}) {
  if (!docs.length || !selectedDoc) {
    return (
      <article className="border-l-2 border-line py-6 pl-5">
        <p className="font-serif text-[15px] leading-7 text-ink-soft">{emptyLabel}</p>
      </article>
    )
  }

  // Stable ref for ReaderOutline's IntersectionObserver root
  const outlineReaderRef = useRef<HTMLDivElement | null>(null)

  return (
    <div
      data-reading-mode={readingMode ? 'true' : 'false'}
      className="w-full xl:flex xl:items-start xl:gap-0"
    >
      <div
        key={`reader-pane-${selectedDoc.id}`}
        ref={(node) => {
          outlineReaderRef.current = node
          readerPaneRef(node)
        }}
        data-testid="reader-scroll-pane"
        className="min-w-0 flex-1"
      >
        <ReaderPanel
          doc={selectedDoc}
          feedback={feedback}
          pinned={pinnedDocIds.includes(selectedDoc.id)}
          onTogglePinned={onTogglePinned}
          read={readDocIds.includes(selectedDoc.id)}
          onToggleRead={onToggleRead}
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
          activePathId={activePathId}
          allCorpusDocs={allCorpusDocs}
          onMarkDocRead={onMarkDocRead}
          onSelectPathDoc={onSelectPathDoc}
          onClearPath={onClearPath}
        />
      </div>
      {!readingMode && (
        <ReaderOutline doc={selectedDoc} readerRef={outlineReaderRef} />
      )}
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
    path: 'docs/public/07_life_under_the_system.md',
    label: 'Life Under The System',
    description: 'Realistic one-year pressure stories about ordinary people under the proposed rules.',
    tag: 'Human path',
  },
  {
    path: 'docs/public/05_rights_layer.md',
    label: 'Rights Layer',
    description: 'Plain-language statement of what the design is meant to protect for ordinary people.',
    tag: 'Public',
  },
  {
    path: 'docs/public/06_big_companies.md',
    label: 'Big Companies',
    description: 'How profit can remain without allowing essential-sector hostage power.',
    tag: 'Markets',
  },
  {
    path: 'docs/public/02_faq.md',
    label: 'FAQ',
    description: 'Short answers to common objections in plain language.',
    tag: 'Questions',
  },
  {
    path: 'docs/public/04_white_paper.md',
    label: 'White Paper',
    description: 'The longer public-facing argument for the constitutional design.',
    tag: 'Public',
  },
  {
    path: 'docs/public/03_readiness.md',
    label: 'Readiness Guide',
    description: 'What is only designed, what still needs evidence, and which objections have the most pressure.',
    tag: 'Skeptics',
  },
  {
    path: 'docs/governance/Claims_Evidence_Register.md',
    label: 'Claims & Evidence',
    description: 'The status ledger for moral commitments, mechanisms, risks, and missing proof.',
    tag: 'Evidence',
  },
  {
    path: 'docs/annexes/INDEX.md',
    label: 'Annex Index',
    description: 'Operational mechanics and detailed clauses that extend the charter without bloating it.',
    tag: 'Technical',
  },
]

interface GlobalSearchResult {
  doc: CorpusDoc
  matchType: 'title' | 'heading' | 'body'
  excerpt: string
}

function globalSearch(allDocs: CorpusDoc[], rawQuery: string): GlobalSearchResult[] {
  const q = rawQuery.trim().toLowerCase()
  if (!q || q.length < 2) return []
  const results: GlobalSearchResult[] = []
  const seen = new Set<string>()

  for (const doc of allDocs) {
    const addResult = (matchType: GlobalSearchResult['matchType'], excerpt: string) => {
      if (!seen.has(`${doc.id}:${matchType}`)) {
        seen.add(`${doc.id}:${matchType}`)
        results.push({ doc, matchType, excerpt })
      }
    }

    if (doc.title.toLowerCase().includes(q)) {
      addResult('title', doc.title)
    }
    for (const h of doc.headings) {
      if (h.text.toLowerCase().includes(q)) {
        addResult('heading', h.text)
        break
      }
    }
    const bodyLower = doc.content.toLowerCase()
    const idx = bodyLower.indexOf(q)
    if (idx !== -1) {
      const start = Math.max(0, idx - 60)
      const end = Math.min(doc.content.length, idx + q.length + 60)
      const raw = doc.content.slice(start, end).replace(/\s+/g, ' ').trim()
      addResult('body', (start > 0 ? '…' : '') + raw + (end < doc.content.length ? '…' : ''))
    }
  }

  return results.slice(0, 40)
}

function highlightMatch(text: string, query: string) {
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-[var(--accent-soft)] text-inherit">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  )
}

function GlobalSearchOverlay({
  allDocs,
  onSelect,
  onClose,
}: {
  allDocs: CorpusDoc[]
  onSelect: (doc: CorpusDoc) => void
  onClose: () => void
}) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const listRef = useRef<HTMLUListElement | null>(null)
  const dq = useDeferredValue(query)

  const results = useMemo(() => globalSearch(allDocs, dq), [allDocs, dq])

  useEffect(() => { inputRef.current?.focus() }, [])
  useEffect(() => { setActiveIndex(0) }, [dq])

  const handleSelect = useCallback((doc: CorpusDoc) => {
    onSelect(doc)
    onClose()
  }, [onSelect, onClose])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (results.length === 0) return
      setActiveIndex(i => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (results.length === 0) return
      setActiveIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[activeIndex]) {
      handleSelect(results[activeIndex].doc)
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  useEffect(() => {
    if (!listRef.current) return
    const active = listRef.current.querySelector('[data-active="true"]') as HTMLElement | null
    active?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-[rgba(0,0,0,0.5)] pt-[12vh]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[42rem] overflow-hidden rounded-xl border border-line bg-paper-strong shadow-2xl"
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <span className="text-ink-faint" aria-hidden="true">⌕</span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search all documents…"
            className="flex-1 bg-transparent font-serif text-[1rem] text-ink-strong placeholder:text-ink-faint focus:outline-none"
          />
          <kbd className="hidden rounded border border-line bg-paper px-1.5 py-0.5 font-mono text-[10px] text-ink-faint sm:block">
            esc
          </kbd>
        </div>

        {results.length > 0 ? (
          <ul ref={listRef} className="max-h-[50vh] overflow-y-auto py-2" role="listbox">
            {results.map((r, i) => (
              <li key={`${r.doc.id}:${r.matchType}`} role="option" aria-selected={i === activeIndex} data-active={i === activeIndex ? 'true' : 'false'}>
                <button
                  type="button"
                  onClick={() => handleSelect(r.doc)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`w-full px-4 py-2.5 text-left transition ${
                    i === activeIndex ? 'bg-[rgba(159,108,49,0.1)]' : 'hover:bg-[rgba(159,108,49,0.06)]'
                  }`}
                >
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-[0.9rem] font-semibold leading-snug text-ink-strong">
                      {highlightMatch(r.doc.title, query)}
                    </span>
                    <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.1em] text-ink-faint">
                      {r.matchType === 'title' ? 'title' : r.matchType === 'heading' ? 'heading' : 'body'}
                    </span>
                  </div>
                  {r.matchType !== 'title' && (
                    <p className="mt-0.5 line-clamp-1 text-[12px] leading-5 text-ink-soft">
                      {highlightMatch(r.excerpt, query)}
                    </p>
                  )}
                </button>
              </li>
            ))}
          </ul>
        ) : query.length >= 2 ? (
          <p className="px-4 py-6 text-center font-serif text-[14px] text-ink-faint">No results found.</p>
        ) : (
          <p className="px-4 py-6 text-center font-serif text-[14px] text-ink-faint">
            Type at least 2 characters to search.
          </p>
        )}
      </div>
    </div>
  )
}

const KEYBOARD_SHORTCUTS = [
  { keys: ['⌘', 'K'], label: 'Global search across all documents' },
  { keys: ['⌘', 'F'], label: 'Search within current document' },
  { keys: ['/'], label: 'Focus document search' },
  { keys: ['?'], label: 'Show this keyboard reference' },
  { keys: ['↑', '↓'], label: 'Navigate search results' },
  { keys: ['↵'], label: 'Open selected result' },
  { keys: ['Esc'], label: 'Close overlay / clear search' },
]

function KeyboardCheatsheet({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' || e.key === '?') { e.preventDefault(); onClose() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm overflow-hidden rounded-xl border border-line bg-paper-strong shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-serif text-[1.1rem] font-semibold text-ink-strong">Keyboard shortcuts</h2>
          <button
            type="button"
            onClick={onClose}
            className="focus-ring rounded text-ink-faint hover:text-ink"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <ul className="divide-y divide-line">
          {KEYBOARD_SHORTCUTS.map((s, i) => (
            <li key={i} className="flex items-center justify-between gap-4 px-5 py-3">
              <span className="font-serif text-[13px] text-ink-soft">{s.label}</span>
              <span className="flex shrink-0 items-center gap-1">
                {s.keys.map((k, ki) => (
                  <kbd
                    key={ki}
                    className="inline-block rounded border border-line bg-paper px-1.5 py-0.5 font-mono text-[11px] text-ink-soft"
                  >
                    {k}
                  </kbd>
                ))}
              </span>
            </li>
          ))}
        </ul>
        <p className="border-t border-line px-5 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
          Press ? or Esc to close
        </p>
      </div>
    </div>
  )
}

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
  readDocIds,
}: {
  corpus: CorpusPayload
  onJump: (doc: CorpusDoc) => void
  readDocIds: string[]
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
              {docs.map((doc) => {
                const isRead = readDocIds.includes(doc.id)
                return (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => onJump(doc)}
                    className="focus-ring group relative flex flex-col rounded border border-line bg-paper-strong p-4 text-left transition hover:border-[rgba(159,108,49,0.4)] hover:shadow-sm"
                  >
                    {isRead && (
                      <span className="absolute right-3 top-3 flex items-center gap-0.5 rounded-full bg-emerald-900/40 px-1.5 py-0.5 text-[10px] font-medium text-emerald-400">
                        ✓ Read
                      </span>
                    )}
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
                )
              })}
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
    id: 'first-time',
    title: 'First-Time Reader',
    description: 'The intended public on-ramp: human stakes first, then the plain case and readiness caveats.',
    steps: [
      { path: 'docs/public/01_overview.md', note: 'Start here. One page that names the three problems and the five-instrument response — read this before anything else.' },
      { path: 'docs/public/07_life_under_the_system.md', note: 'Watch how the system behaves under real pressure. These are one-year stories for ordinary people — a caregiver, a small business owner, a person in housing crisis.' },
      { path: 'docs/governance/Fairness_Vignette_Library.md', note: 'See how the principles play out in concrete human situations.' },
      { path: 'docs/public/05_rights_layer.md', note: 'What the design is trying to protect in plain language. Read this to understand what "working" looks like from a person\'s perspective.' },
      { path: 'docs/public/06_big_companies.md', note: 'The hardest political economy question: can large profitable firms coexist with this system? This is where to look for the honest answer.' },
      { path: 'docs/public/02_faq.md', note: 'Common objections answered directly. If you have a specific doubt, check here before going deeper.' },
      { path: 'docs/public/04_white_paper.md', note: 'The fuller public case — more detail on the design logic, the separation of instruments, and the transition approach.' },
      { path: 'docs/public/03_readiness.md', note: 'End here. An honest account of what is only designed vs. what still needs pilots and outside evidence. The system is not ready to deploy — this explains exactly where it stands.' },
    ],
  },
  {
    id: 'skeptic',
    title: 'The Skeptic\'s Path',
    description: 'For those who arrived with objections. Starts with what is unknown, then builds the case.',
    steps: [
      { path: 'docs/governance/Evidence_Ladder.md', note: 'Understand the standard before evaluating claims.' },
      { path: 'docs/governance/Claims_Evidence_Register.md', note: 'Grade each claim against the evidence standard.' },
      { path: 'docs/governance/Open_Problems_Resolution_Docket.md', note: 'See what the framework admits it hasn\'t solved.' },
      { path: 'docs/constitution/Humane_Constitution.md', note: 'Read the final document knowing where the gaps are.' },
    ],
  },
  {
    id: 'economic-instruments',
    title: 'Economic Instruments',
    description: 'The five-instrument model: Flow, Essential Access, Voice, Service Record, and the survival floor.',
    steps: [
      { path: 'docs/public/01_overview.md', note: 'Start here. The one-page framing explains why five separate instruments are needed and what each one is supposed to prevent.' },
      { path: 'docs/annexes/ANNEX_Y.md', note: 'The Constitutional Survival Minimum — the unconditional floor. Pay attention to what cannot be withdrawn and under what circumstances the floor is defended.' },
      { path: 'docs/annexes/ANNEX_X.md', note: 'How Flow (the currency) is issued and how demurrage works. This is the monetary engine — notice how issuance is tied to real capacity rather than debt.' },
      { path: 'docs/annexes/ANNEX_Z.md', note: 'Voice and Service Record — the civic instruments. Watch for where each one\'s limits are drawn and how they are prevented from becoming social credit.' },
      { path: 'docs/annexes/ANNEX_D.md', note: 'Progressive net-worth demurrage — the single carrying cost on accumulated wealth. The participation floor, progressive brackets, and productive-use exemptions that keep idle concentration in check without punishing small savers or patient productive capital.' },
      { path: 'docs/annexes/ANNEX_K.md', note: 'Essential basket governance — how the survival floor is measured in real goods. This is where the system has to answer the hard question: measured by whom, and how.' },
    ],
  },
  {
    id: 'founding-order',
    title: 'Founding Order & Exit Rights',
    description: 'How subsidiarity, consent, and exit work. For anyone who wants to know whether — and how — they can leave.',
    steps: [
      { path: 'founding/order/README.md', note: 'Start here. The overview of how subsidiarity, consent, and exit are structured together — why all three are needed and how they interact.' },
      { path: 'founding/order/jurisdictional_scales.md', note: 'The five governance scales and how authority flows between them. Read this before the mechanisms — it is the structural frame that makes subsidiarity, consent, and exit intelligible.' },
      { path: 'founding/order/subsidiarity_rule.md', note: 'How decisions are pushed to the lowest capable scale. Watch for the test of when a higher scale may override — that is where the power question lives.' },
      { path: 'founding/order/consent_protocol.md', note: 'How consent is established and renewed. Read this carefully — consent that cannot be withdrawn is not consent.' },
      { path: 'founding/order/exit_protocol.md', note: 'How individuals and communities leave. The specifics here matter: exit rights that are procedurally expensive are not real exit rights.' },
      { path: 'founding/order/reentry_protocol.md', note: 'End here. How re-entry works after exit — a system that punishes return is coercive in a different direction.' },
    ],
  },
  {
    id: 'identity-personhood',
    title: 'Identity & Personhood',
    description: 'Proof-of-personhood, identity tradeoffs, error doctrine, and residency. The layer everything else depends on.',
    steps: [
      { path: 'docs/annexes/ANNEX_P.md', note: 'Start here. The core identity architecture — proof-of-personhood, the tradeoffs the design accepts, and the red lines it will not cross. Every other instrument depends on this layer being sound.' },
      { path: 'docs/annexes/ANNEX_I.md', note: 'Residency, migration, and onboarding. Watch for how the system handles people who move, arrive, or exist in overlapping jurisdictions.' },
      { path: 'docs/annexes/ANNEX_AK.md', note: 'Asymmetric error doctrine — how false-negatives (excluding someone who belongs) and false-positives (admitting someone who doesn\'t) are weighted. The design choice here has large equity consequences.' },
      { path: 'docs/governance/Identity_Recovery_Evidence_Test_Package.md', note: 'The evidence requirements for identity recovery. This is the hardest edge case: what happens when someone loses access and needs to prove they are who they say they are.' },
    ],
  },
  {
    id: 'governance-deep',
    title: 'Governance Deep Dive',
    description: 'The full adversarial and evidence stack. For auditors, researchers, and red-teamers.',
    steps: [
      { path: 'docs/governance/Threat_Register.md', note: 'Start here. Every catalogued failure mode — read through the full list before forming a view on whether any single threat is handled well.' },
      { path: 'docs/governance/Patch_Log.md', note: 'Structural responses to each threat. Cross-reference with the Threat Register: every threat should have a corresponding patch, or be marked open.' },
      { path: 'docs/governance/Threat_Resolution_Matrix.md', note: 'Which threats are resolved, partially addressed, or still open. This is the honest audit summary — the open column is where the real work remains.' },
      { path: 'docs/governance/Abuse_Case_Library.md', note: 'Stress-test the framework against adversarial misuse scenarios.' },
      { path: 'docs/simulations/Adversarial_Narrative_Simulation.md', note: 'See how bad actors might exploit or subvert the system.' },
      { path: 'docs/governance/Pilot_Evidence_Roadmap.md', note: 'The staged testing path — what must be demonstrated before the design can be considered validated at each scale.' },
      { path: 'docs/governance/Founding_Preactivation_Disclosure.md', note: 'Pre-activation truth conditions. The project\'s own statement of what must be true before it is legitimate to activate — a useful benchmark for auditors.' },
      { path: 'docs/governance/Founding_Legitimacy_Dossier.md', note: 'The founding legitimacy record. End here — this is where to check whether the artifacts the project says are required actually exist yet.' },
    ],
  },
  {
    id: 'implementer',
    title: 'Implementation Track',
    description: 'For those building or auditing a pilot. Specifications, operational mechanics, and the numerical lock-file.',
    steps: [
      { path: 'docs/constitution/SPECIFICATIONS.md', note: 'Start here. The formal state machine every compliant implementation must satisfy — if your system can\'t pass these checks, it is not a compliant pilot.' },
      { path: 'docs/constitution/Acceptance_Protocol.md', note: 'How patches reach operation. Read this to understand the governance chain your implementation is bound by — no patch takes effect without clearing this protocol.' },
      { path: 'docs/annexes/INDEX.md', note: 'The operational extension layer. Each annex governs a specific domain — use this index to orient yourself to what exists before reading the locked parameters.' },
      { path: 'founding/commitments.md', note: 'The numerical lock-file: every architecturally fixed parameter and its value. Now that you know the annex landscape, these are the numbers your implementation cannot drift from.' },
      { path: 'docs/annexes/ANNEX_N.md', note: 'Transition, genesis, and deployability preconditions. The checklist of what must be true before a pilot can go live — read this before you plan a launch date.' },
      { path: 'docs/annexes/ANNEX_Q.md', note: 'Minimum viable pilot stack. The smallest set of components a compliant pilot must include — and the transition doctrine for getting there from a legacy system.' },
    ],
  },
  {
    id: 'pilot-deployment',
    title: 'Pilot & Deployment',
    description: 'What it takes to stand up a compliant pilot: evidence requirements, transition mechanics, and conglomerate handling.',
    steps: [
      { path: 'docs/governance/Pilot_Evidence_Roadmap.md', note: 'Start here. The staged testing path — what must be demonstrated at each phase before the next is permitted. This is the gate the pilot must pass through.' },
      { path: 'docs/public/03_readiness.md', note: 'An honest account of where the design stands today: what is written, what is only designed, and what still needs outside evidence. Know this before committing resources.' },
      { path: 'docs/annexes/ANNEX_N.md', note: 'Genesis and deployability preconditions. The specific conditions that must be met before activation — know the go/no-go gate before planning what to build.' },
      { path: 'docs/annexes/ANNEX_Q.md', note: 'The minimum viable pilot stack — the smallest compliant configuration and the transition doctrine for building up from a legacy system.' },
      { path: 'docs/annexes/ANNEX_V.md', note: 'Transition mechanics: how legacy money, debt, and ownership convert into the new system. The highest-risk operational phase is here.' },
      { path: 'docs/governance/Conglomerate_Transition_Dossier.md', note: 'How large incumbent firms are handled at transition. Read this last — conglomerate resistance is the most likely source of pilot failure.' },
    ],
  },
  {
    id: 'architectural-integrity',
    title: 'Architectural Integrity',
    description: 'How the Tier 1 invariants are cryptographically locked against silent drift. For engineers and security reviewers.',
    steps: [
      { path: 'architecture/parameter_registry.md', note: 'Start here. Every architecturally locked parameter and its current value — the complete set of constraints your implementation cannot drift from.' },
      { path: 'architecture/amendment_protocol.md', note: 'The 7-of-9 signature threshold and 180-day timelock. This is the constitutional amendment mechanism — understand it before evaluating whether the locks are real.' },
      { path: 'architecture/drift_chain.md', note: 'The append-only hash chain used for tamper detection. Read this to understand how silent parameter drift would be caught at startup.' },
      { path: 'architecture/implementation_binding.md', note: 'The binding requirement: every operational service must verify the chain before running. This is where the cryptographic guarantee becomes an operational constraint.' },
      { path: 'docs/annexes/ANNEX_AV.md', note: 'The two-key architectural precondition for Tier 1 invariant enforcement. Without this, the locks described in the previous documents are not enforceable.' },
    ],
  },
]

function ReadingPathsView({
  corpus,
  onStartPath,
  activePathId,
  readDocIds,
}: {
  corpus: CorpusPayload
  onStartPath: (pathId: string, doc: CorpusDoc) => void
  activePathId: string | null
  readDocIds: string[]
}) {
  return (
    <div className="space-y-10">
      {READING_PATHS.map((path) => {
        const docs = path.steps.map((s) => corpus.docs.find((d) => d.path === s.path) ?? null)
        const readCount = docs.filter((d) => d && readDocIds.includes(d.id)).length
        const isActive = activePathId === path.id
        const firstUnread = docs.find((d) => d && !readDocIds.includes(d.id))
        const resumeDoc = firstUnread ?? docs[0]

        return (
          <section key={path.id} className={`rounded-lg border p-6 transition ${isActive ? 'border-accent/40 bg-[rgba(159,108,49,0.06)]' : 'border-line bg-paper-strong'}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="font-serif text-[1.3rem] font-semibold text-ink-strong">{path.title}</h2>
                <p className="mt-1 text-[14px] leading-6 text-ink-soft">{path.description}</p>
              </div>
              {resumeDoc && (
                <button
                  type="button"
                  onClick={() => onStartPath(path.id, resumeDoc)}
                  className="focus-ring shrink-0 rounded-md border border-accent/40 bg-accent/10 px-3 py-1.5 font-sans text-[12px] font-medium text-accent-deep transition hover:bg-accent/20"
                >
                  {readCount === 0 ? 'Start' : readCount === path.steps.length ? 'Review' : 'Resume'}
                </button>
              )}
            </div>

            {readCount > 0 && (
              <div className="mt-3 flex items-center gap-2">
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full rounded-full bg-accent/60 transition-all"
                    style={{ width: `${(readCount / path.steps.length) * 100}%` }}
                  />
                </div>
                <span className="font-mono text-[10px] text-ink-faint">{readCount}/{path.steps.length}</span>
              </div>
            )}

            <ol className="mt-5 space-y-2">
              {path.steps.map((step, index) => {
                const doc = docs[index]
                const isRead = doc ? readDocIds.includes(doc.id) : false
                return (
                  <li key={step.path} className="flex gap-4">
                    <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] transition ${isRead ? 'bg-emerald-900/40 text-emerald-400' : 'bg-[rgba(159,108,49,0.12)] text-accent-deep'}`}>
                      {isRead ? '✓' : index + 1}
                    </span>
                    <div className="min-w-0">
                      {doc ? (
                        <button
                          type="button"
                          onClick={() => onStartPath(path.id, doc)}
                          className={`focus-ring inline border-b font-serif text-[0.97rem] font-medium transition ${isRead ? 'border-emerald-700/40 text-ink-soft hover:text-ink' : 'border-[rgba(159,108,49,0.35)] text-accent-deep hover:border-accent hover:text-[var(--accent)]'}`}
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
        )
      })}
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


export function Dashboard({ view, corpus, loadError, onViewChange, onProgressChange, onNavDocsChange, corpusQuery, onCorpusQueryChange, pendingDocTarget, onPendingDocTargetConsumed, pendingPathId, onPendingPathConsumed }: DashboardProps) {
  const [documentQuery, setDocumentQuery] = useState('')
  const [selectedDocId, setSelectedDocId] = useState<string | null>(() => readStoredSelectedDocId(view))
  const [pinnedDocIds, setPinnedDocIds] = useState<string[]>(() => readStoredDocList(PINNED_DOCS_STORAGE_KEY))
  const [recentDocIds, setRecentDocIds] = useState<string[]>(() => readStoredDocList(RECENT_DOCS_STORAGE_KEY))
  const [readDocIds, setReadDocIds]     = useState<string[]>(() => readStoredDocList(READ_DOCS_STORAGE_KEY))
  const [activePathId, setActivePathId] = useState<string | null>(() => window.localStorage.getItem(ACTIVE_PATH_STORAGE_KEY))
  const [showGlobalSearch, setShowGlobalSearch] = useState(false)
  const [showCheatsheet, setShowCheatsheet] = useState(false)
  const [readingMode, setReadingMode] = useState(() => readStoredBoolean(READING_MODE_STORAGE_KEY))
  const [staleCorpusNotice, setStaleCorpusNotice] = useState<string | null>(null)
  const [sourceFeedback, setSourceFeedback] = useState<SourceFeedback>({
    tone: 'neutral',
    message: 'Read in-app, or open the source document directly from the reader header.',
  })
  const [documentMatchCount, setDocumentMatchCount] = useState(0)
  const [activeMatchIndex, setActiveMatchIndex] = useState(0)
  const [copiedHeadingSlug, setCopiedHeadingSlug] = useState<string | null>(null)
  const readerPaneRef = useRef<HTMLDivElement | null>(null)
  const readerSearchInputRef = useRef<HTMLInputElement | null>(null)

  const restorePaneScrollRef = useRef(true)
  const lastViewRef = useRef<AppView>(view)
  const scrollWriteFrameRef = useRef<number | null>(null)
  const shouldScrollToActiveMatchRef = useRef(false)
  const copiedHeadingTimeoutRef = useRef<number | null>(null)
  const pendingHashTargetRef = useRef<{ docId: string; slug: string } | null>(null)
  // Set to true when the user explicitly picks a doc so the guard effect skips its reset.
  const userPickedDocRef = useRef(false)
  const [isDark, setIsDark] = useState(() =>
    typeof document !== 'undefined'
      ? document.documentElement.getAttribute('data-theme') === 'dark'
      : false
  )
  const [backTarget, setBackTarget] = useState<{ docId: string; scrollTop: number } | null>(null)
  const backTimeoutRef = useRef<number | null>(null)
  const isGoingBackRef = useRef(false)
  const pendingDocRafRef = useRef<number>(0)

  const deferredQuery = useDeferredValue(corpusQuery)
  const allDocs = corpus?.docs ?? []
  const refLookup = useMemo(() => buildRefLookup(allDocs), [allDocs])
  const baseDocs = corpus ? docsForView(view, corpus.docs, corpus.featuredPaths) : []
  const visibleDocs = baseDocs.filter((doc) => matchesQuery(doc, deferredQuery))
  const selectedDoc = visibleDocs.find((doc) => doc.id === selectedDocId) ?? visibleDocs[0] ?? null
  const docById = new Map(allDocs.map((doc) => [doc.id, doc]))
  const recentDocs = recentDocIds
    .filter((docId) => !pinnedDocIds.includes(docId))
    .map((docId) => docById.get(docId))
    .filter((doc): doc is CorpusDoc => Boolean(doc))
  const meta = VIEW_META[view]

  const recentDocIdString = useMemo(() => recentDocs.map(d => d.id).join(','), [recentDocs])
  const visibleDocIdString = useMemo(() => visibleDocs.map(d => d.id).join(','), [visibleDocs])

  useEffect(() => {
    onNavDocsChange(recentDocs, visibleDocs, meta.railLabel)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recentDocIdString, visibleDocIdString, meta.railLabel])

  const independentPaneView = view === 'constitution' || view === 'annexes' || view === 'registries'
  const bindReaderPaneRef = (node: HTMLDivElement | null) => {
    readerPaneRef.current = node
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

  // Handle nav-bar doc selection — fires even when view doesn't change.
  // Set userPickedDocRef BEFORE the urgent setSelectedDocId so the
  // visibleDocs-reset effect (which fires after this one) sees the flag
  // and doesn't queue a startTransition back to visibleDocs[0].
  useEffect(() => {
    if (!pendingDocTarget) return
    userPickedDocRef.current = true
    if (pendingDocTarget.headingSlug) {
      pendingHashTargetRef.current = { docId: pendingDocTarget.id, slug: pendingDocTarget.headingSlug }
    }
    setSelectedDocId(pendingDocTarget.id)
    onPendingDocTargetConsumed?.()
    pendingDocRafRef.current = requestAnimationFrame(() => {
      pendingDocRafRef.current = requestAnimationFrame(() => {
        const targetDoc = allDocs.find((doc) => doc.id === pendingDocTarget.id)
        if (targetDoc && pendingDocTarget.headingSlug) {
          queueHeadingJump(targetDoc, pendingDocTarget.headingSlug)
          return
        }
        // No heading target — scroll to the reader panel start so the document
        // title is the first thing visible (not the shelf header above it).
        if (readerPaneRef.current) readerPaneRef.current.scrollTop = 0
        document.getElementById('reader-panel-start')?.scrollIntoView({ behavior: 'instant', block: 'start' })
      })
    })
    return () => cancelAnimationFrame(pendingDocRafRef.current)
  }, [allDocs, pendingDocTarget])

  // Auto-start a path selected from the landing page
  useEffect(() => {
    if (!pendingPathId || !corpus) return
    const path = READING_PATHS.find((p) => p.id === pendingPathId)
    if (!path) { onPendingPathConsumed?.(); return }
    const firstStep = path.steps[0]
    const doc = corpus.docs.find((d) => d.path === firstStep.path)
    if (!doc) { onPendingPathConsumed?.(); return }
    onPendingPathConsumed?.()
    handleStartPath(pendingPathId, doc)
  }, [pendingPathId, corpus])

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
      // Don't reset if the user just explicitly picked this doc (e.g. ReadNext).
      // The doc may be in a different section and view-change is already in flight.
      if (userPickedDocRef.current) {
        userPickedDocRef.current = false
        return
      }
      startTransition(() => setSelectedDocId(visibleDocs[0].id))
    }
  }, [selectedDocId, visibleDocs])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    if (selectedDocId && visibleDocs.some((doc) => doc.id === selectedDocId)) {
      window.localStorage.setItem(selectedDocStorageKey(view), selectedDocId)
      return
    }

    window.localStorage.removeItem(selectedDocStorageKey(view))
  }, [selectedDocId, view, visibleDocs])

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
  // Cmd/Ctrl+K  → open global document search.
  // Cmd/Ctrl+F  → focus reader search (overrides browser Find inside the app shell).
  // /            → handled by Layout for nav document search.
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
        setShowGlobalSearch(true)
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

      if (event.key === '?') {
        event.preventDefault()
        setShowCheatsheet(v => !v)
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
    // Apply persisted appearance settings immediately on mount
    applyFontSize(readFontSize())
    applyColumnWidth(readColumnWidth())
    applyTheme(readTheme())
  }, [])

  // Track dark-mode changes so RefChip can switch colour palettes reactively
  useEffect(() => {
    const root = document.documentElement
    const obs = new MutationObserver(() => {
      setIsDark(root.getAttribute('data-theme') === 'dark')
    })
    obs.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    return () => {
      if (scrollWriteFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollWriteFrameRef.current)
      }
      if (copiedHeadingTimeoutRef.current !== null) {
        window.clearTimeout(copiedHeadingTimeoutRef.current)
      }
      if (backTimeoutRef.current !== null) {
        window.clearTimeout(backTimeoutRef.current)
      }
    }
  }, [])

  // Window-scroll progress — always active. The pane-scroll handler overrides
  // this when the reader pane is the active scroll container (xl+ viewports).
  useEffect(() => {
    if (!onProgressChange) return
    function handleWindowScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight
      onProgressChange!(max > 0 ? window.scrollY / max : 0)
    }
    window.addEventListener('scroll', handleWindowScroll, { passive: true })
    handleWindowScroll()
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [onProgressChange])

  useEffect(() => {
    if (!independentPaneView || !selectedDoc || !restorePaneScrollRef.current) {
      return
    }

    restorePaneScrollRef.current = false

    window.requestAnimationFrame(() => {
      const stored = readStoredPaneScroll(view)
      if (readerPaneRef.current) {
        readerPaneRef.current.scrollTop = stored.reader
      }
    })
  }, [independentPaneView, selectedDoc?.id, view])

  useEffect(() => {
    if (!selectedDoc) {
      setDocumentMatchCount(0)
      return
    }

    window.requestAnimationFrame(() => {
      const hits = readerPaneRef.current?.querySelectorAll<HTMLElement>('mark[data-reader-search-hit="true"]') ?? []
      setDocumentMatchCount(hits.length)
      setActiveMatchIndex((index) => (hits.length ? Math.min(index, hits.length - 1) : 0))
    })
  }, [selectedDoc?.id, documentQuery])


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
        startTransition(() => onCorpusQueryChange(''))
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

    queueHeadingJump(selectedDoc, pending.slug)

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
    const targetView = viewForDoc(doc)

    // If the doc lives in a different section, switch view first and persist the
    // selection so the view-change effect restores it correctly.
    if (targetView !== view) {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(selectedDocStorageKey(targetView), doc.id)
      }
      userPickedDocRef.current = true
      setSelectedDocId(doc.id)
      onViewChange(targetView)
      return
    }

    // Use a plain state update (not startTransition) so the new doc renders
    // synchronously in this batch. Then scroll AFTER the DOM has painted.
    userPickedDocRef.current = true
    setSelectedDocId(doc.id)

    if (typeof window !== 'undefined' && !isGoingBackRef.current) {
      // Two rAFs: first fires after React flushes, second after the browser paints.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (isGoingBackRef.current) return  // back navigation will restore scroll itself
          if (window.matchMedia('(max-width: 1279px)').matches) {
            document.getElementById('reader-panel-start')?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            })
          } else {
            window.scrollTo({ top: 0, behavior: 'instant' })
          }
        })
      })
    }
  }

  function handleSelectQuickDoc(doc: CorpusDoc) {
    const targetView = viewForDoc(doc)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(selectedDocStorageKey(targetView), doc.id)
    }
    userPickedDocRef.current = true
    setSelectedDocId(doc.id)

    if (targetView !== view) {
      onViewChange(targetView)
      return
    }

    handleSelectDoc(doc)
  }

  function handleGlobalSearchSelect(doc: CorpusDoc) {
    const targetView = viewForDoc(doc)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(selectedDocStorageKey(targetView), doc.id)
    }
    userPickedDocRef.current = true
    setSelectedDocId(doc.id)

    if (targetView !== view) {
      onViewChange(targetView)
      return
    }
  }

  function handleNavToRef(docId: string, slug?: string) {
    const doc = allDocs.find((d) => d.id === docId)
    if (!doc) return

    // Save current position so the user can jump back
    const currentScrollTop = readerPaneRef.current?.scrollTop ?? window.scrollY
    const currentDocId = selectedDoc?.id
    if (currentDocId) {
      if (backTimeoutRef.current !== null) window.clearTimeout(backTimeoutRef.current)
      setBackTarget({ docId: currentDocId, scrollTop: currentScrollTop })
      backTimeoutRef.current = window.setTimeout(() => {
        setBackTarget(null)
        backTimeoutRef.current = null
      }, 12000)
    }

    handleSelectDoc(doc)
    if (slug) {
      // Give the renderer a tick to mount the doc before jumping
      requestAnimationFrame(() => {
        requestAnimationFrame(() => jumpToHeading(doc, slug))
      })
    }
  }

  function handleGoBack() {
    if (!backTarget) return
    const doc = allDocs.find((d) => d.id === backTarget.docId)
    if (!doc) { setBackTarget(null); return }
    const savedScrollTop = backTarget.scrollTop
    setBackTarget(null)
    if (backTimeoutRef.current !== null) {
      window.clearTimeout(backTimeoutRef.current)
      backTimeoutRef.current = null
    }
    isGoingBackRef.current = true
    handleSelectDoc(doc)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isGoingBackRef.current = false
        if (readerPaneRef.current) {
          readerPaneRef.current.scrollTop = savedScrollTop
        } else {
          window.scrollTo({ top: savedScrollTop, behavior: 'instant' })
        }
      })
    })
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

  function handleToggleRead() {
    if (!selectedDoc) return
    setReadDocIds((current) => {
      const next = current.includes(selectedDoc.id)
        ? current.filter((id) => id !== selectedDoc.id)
        : [...current, selectedDoc.id]
      window.localStorage.setItem(READ_DOCS_STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  function handleMarkDocRead(docId: string) {
    setReadDocIds((current) => {
      if (current.includes(docId)) return current
      const next = [...current, docId]
      window.localStorage.setItem(READ_DOCS_STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  function handleStartPath(pathId: string, doc: CorpusDoc) {
    window.localStorage.setItem(ACTIVE_PATH_STORAGE_KEY, pathId)
    setActivePathId(pathId)
    handleSelectQuickDoc(doc)
  }

function handleClearPath(nextView?: AppView) {
    window.localStorage.removeItem(ACTIVE_PATH_STORAGE_KEY)
    setActivePathId(null)
    if (nextView) {
      onViewChange(nextView)
    }
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
    <RefNavContext.Provider value={{ lookup: refLookup, onNavigate: handleNavToRef, isDark }}>
    <div
      className={`space-y-6 ${
        independentPaneView ? 'xl:grid xl:grid-rows-[auto_minmax(0,1fr)] xl:gap-6 xl:space-y-0' : ''
      }`}
    >
      {showGlobalSearch && (
        <GlobalSearchOverlay
          allDocs={allDocs}
          onSelect={handleGlobalSearchSelect}
          onClose={() => setShowGlobalSearch(false)}
        />
      )}
      {showCheatsheet && (
        <KeyboardCheatsheet onClose={() => setShowCheatsheet(false)} />
      )}
      {staleCorpusNotice && (
        <div
          role="status"
          aria-live="polite"
          data-testid="stale-corpus-notice"
          className="flex items-start justify-between gap-4 border-l-2 border-l-accent bg-[var(--paper-strong)] px-4 py-3 text-[13px] leading-6 text-ink-strong"
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
      {view === 'topics' && <TopicsView corpus={corpus} onJump={handleSelectQuickDoc} readDocIds={readDocIds} />}
      {view === 'paths' && <ReadingPathsView corpus={corpus} onStartPath={handleStartPath} activePathId={activePathId} readDocIds={readDocIds} />}
      {view === 'validation' && <ValidationPanels corpus={corpus} />}
      {view !== 'home' && view !== 'topics' && view !== 'paths' && view !== 'settings' && (
        <SectionIntro view={view} corpus={corpus} onJump={handleSelectQuickDoc} />
      )}


      {view !== 'home' && view !== 'topics' && view !== 'paths' && view !== 'settings' && (
        <div className="scholar-panels xl:flex xl:items-start xl:gap-0">
          {!readingMode && (
            <DocListPanel
              docs={visibleDocs}
              allDocs={allDocs}
              selectedId={selectedDoc?.id ?? null}
              onSelect={handleSelectQuickDoc}
              readDocIds={readDocIds}
              view={view}
              onViewChange={onViewChange}
            />
          )}
          <ReaderWorkspace
            docs={visibleDocs}
            allDocs={allDocs}
            selectedDoc={selectedDoc}
            pinnedDocIds={pinnedDocIds}
            recentIds={recentDocIds}
            onSelectQuickDoc={handleSelectQuickDoc}
            onTogglePinned={handleTogglePinned}
            readDocIds={readDocIds}
            onToggleRead={handleToggleRead}
            readingMode={readingMode}
            onToggleReadingMode={handleToggleReadingMode}
            onOpenSource={handleOpenSource}
            feedback={sourceFeedback}
            emptyLabel="No documents match the current filter. Broaden the query or move to another shelf."
            readerPaneRef={bindReaderPaneRef}
            copiedHeadingSlug={copiedHeadingSlug}
            onCopyHeadingLink={handleCopyHeadingLink}
            searchQuery={documentQuery}
            onSearchChange={setDocumentQuery}
            searchInputRef={bindReaderSearchInputRef}
            matchCount={documentMatchCount}
            currentMatchIndex={activeMatchIndex}
            onJumpToPreviousMatch={() => jumpSearchMatch(-1)}
            onJumpToNextMatch={() => jumpSearchMatch(1)}
            activePathId={activePathId}
            allCorpusDocs={allDocs}
            onMarkDocRead={handleMarkDocRead}
            onSelectPathDoc={handleSelectQuickDoc}
            onClearPath={handleClearPath}
          />
        </div>
      )}
    </div>

    {/* Back-navigation float — appears after clicking a ref chip, auto-dismisses after 12s */}
    {backTarget && typeof document !== 'undefined' && createPortal(
      <div
        style={{
          position: 'fixed',
          bottom: 28,
          left: 28,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          background: isDark ? '#1a2a20' : '#2a2520',
          border: `1px solid ${isDark ? 'rgba(80,200,120,0.25)' : 'rgba(255,255,255,0.18)'}`,
          borderRadius: 12,
          boxShadow: isDark
            ? '0 8px 32px rgba(30,120,60,0.4), 0 2px 8px rgba(0,0,0,0.5)'
            : '0 8px 32px rgba(0,0,0,0.28), 0 2px 8px rgba(0,0,0,0.18)',
          overflow: 'hidden',
          animation: 'fadeSlideUp 0.2s cubic-bezier(0.16,1,0.3,1)',
        }}
        role="navigation"
        aria-label="Return to previous position"
      >
        {/* Main back button */}
        <button
          type="button"
          onClick={handleGoBack}
          style={{
            background: 'none',
            border: 'none',
            padding: '10px 14px 10px 14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: 'inherit',
            fontSize: 13,
            fontWeight: 600,
            color: '#f0ebe4',
            letterSpacing: '0.01em',
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'none')}
        >
          <svg
            width="13" height="13" viewBox="0 0 13 13" fill="none"
            style={{ color: isDark ? '#4ade80' : '#9f8c6e', flexShrink: 0 }}
          >
            <path d="M8 2L4 6.5L8 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to previous position
        </button>
        {/* Divider */}
        <span style={{ width: 1, alignSelf: 'stretch', background: isDark ? 'rgba(80,200,120,0.2)' : 'rgba(255,255,255,0.1)', flexShrink: 0 }} />
        {/* Dismiss */}
        <button
          type="button"
          onClick={() => { setBackTarget(null); if (backTimeoutRef.current !== null) { window.clearTimeout(backTimeoutRef.current); backTimeoutRef.current = null } }}
          aria-label="Dismiss"
          style={{
            background: 'none',
            border: 'none',
            padding: '10px 12px',
            cursor: 'pointer',
            color: 'rgba(240,235,228,0.45)',
            fontSize: 13,
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
          }}
          onMouseEnter={e => { (e.currentTarget.style.background = 'rgba(255,255,255,0.07)'); (e.currentTarget.style.color = 'rgba(240,235,228,0.85)') }}
          onMouseLeave={e => { (e.currentTarget.style.background = 'none'); (e.currentTarget.style.color = 'rgba(240,235,228,0.45)') }}
        >
          ✕
        </button>
      </div>,
      document.body
    )}
    </RefNavContext.Provider>
  )
}
