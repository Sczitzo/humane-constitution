import { createContext, startTransition, useCallback, useContext, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { StatechartDiagram } from './StatechartDiagram'
import { invoke } from '@tauri-apps/api/core'
import type { CorpusDoc, CorpusPayload } from '../generated/corpus'
import type { AppView } from './Layout'

// ─── Ref-chip system ────────────────────────────────────────────────────────

interface RefEntry {
  label: string        // e.g. "P-013", "T-007", "Annex AH"
  title: string        // short title shown in tooltip
  summary: string      // one-line description or excerpt
  status: string       // 'active' | 'proposed' | 'reference' | ''
  docId: string        // corpus doc id to navigate to
  slug?: string        // optional heading slug within that doc
}

type RefLookup = Map<string, RefEntry>

interface RefNavContextValue {
  lookup: RefLookup
  onNavigate: (docId: string, slug?: string) => void
  isDark: boolean
}

const RefNavContext = createContext<RefNavContextValue>({
  lookup: new Map(),
  onNavigate: () => {},
  isDark: false,
})

/** Build a lookup map from the full corpus docs list. */
function buildRefLookup(docs: CorpusDoc[]): RefLookup {
  const map: RefLookup = new Map()

  for (const doc of docs) {
    // Patch entries: P-\d+
    if (doc.section === 'registry' && /patch/i.test(doc.path)) {
      const pMatch = doc.title.match(/P-(\d+)/i)
      if (pMatch) {
        const key = `P-${pMatch[1].padStart(3, '0')}`
        const shortKey = `P-${parseInt(pMatch[1], 10)}`
        const entry: RefEntry = {
          label: shortKey,
          title: doc.title,
          summary: doc.summary || '',
          status: doc.statusBucket,
          docId: doc.id,
        }
        map.set(shortKey, entry)
        map.set(key, entry)
      }
      // Also index any P-NNN headings within patch docs
      for (const h of doc.headings) {
        const hm = h.text.match(/^(P-\d+)\s*[—–-]/)
        if (hm) {
          const pKey = hm[1]
          if (!map.has(pKey)) {
            map.set(pKey, {
              label: pKey,
              title: h.text,
              summary: doc.summary || '',
              status: doc.statusBucket,
              docId: doc.id,
              slug: h.slug,
            })
          }
        }
      }
    }

    // Threat entries: T-\d+, TR-\d+, PRD-\d+, INV-\d+ — scan registry + constitution docs
    if (doc.section === 'registry' || doc.section === 'constitution') {
      for (const h of doc.headings) {
        const tm = h.text.match(/^(T-\d+|TR-\d+|PRD-\d+|INV-\d+)\s*[—–:\s]/)
        if (tm) {
          const tKey = tm[1]
          if (!map.has(tKey)) {
            map.set(tKey, {
              label: tKey,
              title: h.text,
              summary: '',
              status: doc.statusBucket || 'reference',
              docId: doc.id,
              slug: h.slug,
            })
          }
        }
      }
    }

    // Annex entries
    if (doc.section === 'annex') {
      // Match "ANNEX_AB" style path or "Annex AB" style title
      const annexMatch = doc.path.match(/ANNEX_([A-Z]{1,3}\d*)\.md$/i)
        || doc.title.match(/^ANNEX\s+([A-Z]{1,3}\d*)\s*[—–-]/i)
      if (annexMatch) {
        const code = annexMatch[1].toUpperCase()
        const entry: RefEntry = {
          label: `Annex ${code}`,
          title: doc.title,
          summary: doc.summary || '',
          status: doc.statusBucket,
          docId: doc.id,
        }
        // Register base keys
        for (const k of [`Annex ${code}`, `ANNEX ${code}`, code]) {
          if (!map.has(k)) map.set(k, entry)
        }
        // Also register subsection variants: "Annex AC1", "Annex AC2", etc.
        // so that inline references like "Annex AC1" chip to the parent annex
        for (let n = 1; n <= 9; n++) {
          for (const k of [`Annex ${code}${n}`, `ANNEX ${code}${n}`]) {
            if (!map.has(k)) map.set(k, { ...entry, label: `Annex ${code}${n}` })
          }
        }
      }
    }
  }

  // Fourth pass: index FC-NNN entries from founding/commitments.md
  for (const doc of docs) {
    if (!/commitments/i.test(doc.path)) continue
    // Rows: | **FC-030** | `ORACLE_N_MIN` | ... | Name | ... |
    const fcPattern = /\|\s*\*{0,2}(FC-\d+)\*{0,2}\s*\|\s*`?([^`|\n]{3,60})`?\s*\|(?:[^|]*\|){1,2}\s*([^|\n]{0,80})\|/g
    let fm: RegExpExecArray | null = fcPattern.exec(doc.content)
    while (fm) {
      const key = fm[1]
      const name = fm[2].trim()
      if (!map.has(key)) {
        map.set(key, {
          label: key,
          title: `${key} — ${name}`,
          summary: '',
          status: 'reference',
          docId: doc.id,
        })
      }
      fm = fcPattern.exec(doc.content)
    }
  }

  // Second pass: scan raw content for inline PRD-xxx, TR-xx references in table cells
  // Format: "| PRD-004 / household coercion |", "| P-030 | PRD-004 | ACTIVE | Critical | description |"
  for (const doc of docs) {
    if (!/patch.log|patch_log|threat.register|threat_register/i.test(doc.path)) continue
    // Pattern A: PRD-NNN / description
    const cellPattern = /\b(PRD-\d+|TR-\d+)\s*\/\s*([^|,\n]{3,60})/g
    let cm: RegExpExecArray | null = cellPattern.exec(doc.content)
    while (cm) {
      const key = cm[1]
      const desc = cm[2].trim().replace(/\*+/g, '').trim()
      if (!map.has(key)) {
        map.set(key, {
          label: key,
          title: `${key} — ${desc}`,
          summary: '',
          status: 'reference',
          docId: doc.id,
        })
      }
      cm = cellPattern.exec(doc.content)
    }
    // Pattern B: table row "| P-NNN | PRD-NNN | STATUS | Priority | description |"
    const rowPattern = /\|\s*P-\d+\s*\|\s*(PRD-\d+)\s*\|\s*\*{0,2}\w+\*{0,2}\s*\|\s*\w+\s*\|\s*([^|]{5,120})\|/g
    let rm: RegExpExecArray | null = rowPattern.exec(doc.content)
    while (rm) {
      const key = rm[1]
      const desc = rm[2].trim().replace(/\*+/g, '').trim()
      if (!map.has(key) && desc.length > 4) {
        map.set(key, {
          label: key,
          title: `${key} — ${desc.slice(0, 80)}`,
          summary: '',
          status: 'reference',
          docId: doc.id,
        })
      }
      rm = rowPattern.exec(doc.content)
    }
    // Also catch "T-010 / T-011 — Combined heading" style
    const combinedPattern = /\b(T-\d+)\s*\/\s*(T-\d+)\s*[—–]/g
    let combo: RegExpExecArray | null = combinedPattern.exec(doc.content)
    while (combo) {
      // Both T-IDs point to the same heading
      for (const key of [combo[1], combo[2]]) {
        if (!map.has(key)) {
          // Find the heading that contains this
          const h = doc.headings.find(hd => hd.text.includes(combo![1]) || hd.text.includes(combo![2]))
          map.set(key, {
            label: key,
            title: h?.text ?? key,
            summary: '',
            status: 'reference',
            docId: doc.id,
            slug: h?.slug,
          })
        }
      }
      combo = combinedPattern.exec(doc.content)
    }
  }

  // Third pass: index P-NNN headings inside the Patch Log doc
  for (const doc of docs) {
    if (/patch.log/i.test(doc.path) || /patch_log/i.test(doc.path)) {
      for (const h of doc.headings) {
        const hm = h.text.match(/^(P-\d+)\s*[—–-]/)
        if (hm) {
          const pKey = hm[1]
          if (!map.has(pKey)) {
            map.set(pKey, {
              label: pKey,
              title: h.text,
              summary: '',
              status: 'reference',
              docId: doc.id,
              slug: h.slug,
            })
          }
        }
      }
    }
    if (/threat.register/i.test(doc.path) || /threat_register/i.test(doc.path)) {
      for (const h of doc.headings) {
        const tm = h.text.match(/^(T-\d+|TR-\d+|PRD-\d+|INV-\d+)\s*[—–:\s]/)
        if (tm) {
          const tKey = tm[1]
          if (!map.has(tKey)) {
            map.set(tKey, {
              label: tKey,
              title: h.text,
              summary: '',
              status: 'reference',
              docId: doc.id,
              slug: h.slug,
            })
          }
        }
      }
    }
  }

  // Fifth pass: index every doc by path and filename so backtick path references become chips
  for (const doc of docs) {
    const path = doc.path  // e.g. "docs/constitution/Humane_Constitution.md"
    const filename = path.split('/').pop() ?? path  // "Humane_Constitution.md"
    const entry: RefEntry = {
      label: filename,
      title: doc.title,
      summary: doc.summary || '',
      status: doc.statusBucket,
      docId: doc.id,
    }
    // Full path (with and without leading slash)
    for (const k of [path, `/${path}`]) {
      if (!map.has(k)) map.set(k, entry)
    }
    // Filename only
    if (!map.has(filename)) map.set(filename, { ...entry, label: filename })
    // Directory path → map to this doc if it's a README-style entry
    const dir = path.substring(0, path.lastIndexOf('/') + 1)  // "founding/order/"
    if (dir && (filename === 'README.md' || filename === 'index.md')) {
      for (const k of [dir, `/${dir}`, dir.replace(/\/$/, ''), `/${dir.replace(/\/$/, '')}`]) {
        if (!map.has(k)) map.set(k, { ...entry, label: dir })
      }
    }
  }

  // Sixth pass: doc phrase keywords for prose auto-linking
  for (const def of DOC_PHRASE_DEFS) {
    const docEntry = docs.find(d => d.path === def.path)
    if (!docEntry) continue
    const entry: RefEntry = {
      label: def.phrases[0],
      title: docEntry.title,
      summary: docEntry.summary || '',
      status: docEntry.statusBucket,
      docId: docEntry.id,
    }
    for (const phrase of def.phrases) {
      const key = `docphrase:${phrase.toLowerCase()}`
      if (!map.has(key)) map.set(key, entry)
    }
  }

  return map
}

const STATUS_CHIP_STYLES: Record<string, string> = {
  active:   'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100',
  addressed:'bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100',
  designed: 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100',
  proposed: 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100',
  partial:  'bg-orange-50 text-orange-800 border border-orange-200 hover:bg-orange-100',
  open:     'bg-red-50 text-red-800 border border-red-200 hover:bg-red-100',
  ongoing:  'bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100',
  evidence: 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100',
  moral:    'bg-lime-50 text-lime-800 border border-lime-200 hover:bg-lime-100',
  reference:'bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100',
  '':       'bg-stone-100 text-stone-600 border border-stone-200 hover:bg-stone-200',
}

const STATUS_CHIP_STYLES_DARK: Record<string, string> = {
  active:   'bg-emerald-950/70 text-emerald-300 border border-emerald-700/50 hover:bg-emerald-900/70',
  addressed:'bg-teal-950/70 text-teal-300 border border-teal-700/50 hover:bg-teal-900/70',
  designed: 'bg-amber-950/70 text-amber-300 border border-amber-700/50 hover:bg-amber-900/70',
  proposed: 'bg-amber-950/70 text-amber-300 border border-amber-700/50 hover:bg-amber-900/70',
  partial:  'bg-orange-950/70 text-orange-300 border border-orange-700/50 hover:bg-orange-900/70',
  open:     'bg-red-950/70 text-red-300 border border-red-700/50 hover:bg-red-900/70',
  ongoing:  'bg-sky-950/70 text-sky-300 border border-sky-700/50 hover:bg-sky-900/70',
  evidence: 'bg-emerald-950/70 text-emerald-300 border border-emerald-700/50 hover:bg-emerald-900/70',
  moral:    'bg-lime-950/70 text-lime-300 border border-lime-700/50 hover:bg-lime-900/70',
  reference:'bg-sky-950/70 text-sky-300 border border-sky-700/50 hover:bg-sky-900/70',
  '':       'bg-white/10 text-stone-300 border border-white/20 hover:bg-white/15',
}

const STATUS_DOT_COLORS: Record<StatusVisualKey, string> = {
  active: '#10b981',
  addressed: '#14b8a6',
  designed: '#f59e0b',
  proposed: '#f59e0b',
  partial: '#f97316',
  open: '#ef4444',
  ongoing: '#0ea5e9',
  evidence: '#059669',
  moral: '#65a30d',
  reference: '#38bdf8',
  '': '#a8a29e',
}

const STATUS_DOT_COLORS_DARK: Record<StatusVisualKey, string> = {
  active: '#34d399',
  addressed: '#2dd4bf',
  designed: '#fbbf24',
  proposed: '#fbbf24',
  partial: '#fb923c',
  open: '#f87171',
  ongoing: '#38bdf8',
  evidence: '#6ee7b7',
  moral: '#a3e635',
  reference: '#38bdf8',
  '': '#78716c',
}

interface TooltipPos { x: number; y: number; align: 'left' | 'right' }

function RefChip({ refKey, display, fallback }: { refKey: string; display: string; fallback?: React.ReactNode }) {
  const { lookup, onNavigate, isDark } = useContext(RefNavContext)
  const entry = lookup.get(refKey) || lookup.get(display)
  const btnRef = useRef<HTMLButtonElement>(null)
  const [pos, setPos] = useState<TooltipPos | null>(null)

  if (!entry) return fallback !== undefined ? <>{fallback}</> : <>{display}</>

  const chipStyles = isDark ? STATUS_CHIP_STYLES_DARK : STATUS_CHIP_STYLES
  const visualStatus = statusVisualKey(entry.status)
  const chipStyle  = chipStyles[visualStatus] ?? chipStyles['']
  const tooltipTitle = entry.title.replace(/^(P-\d+|T-\d+|PRD-\d+|TR-\d+|INV-\d+|ANNEX\s+[A-Z\d]+|FC-\d+)\s*[—–\-]+\s*/i, '').trim()

  const TOOLTIP_W = 220

  function showTooltip() {
    if (!btnRef.current) return
    const r = btnRef.current.getBoundingClientRect()
    const spaceRight = window.innerWidth - r.left
    const align: 'left' | 'right' = spaceRight >= TOOLTIP_W + 8 ? 'left' : 'right'
    setPos({ x: align === 'left' ? r.left : r.right, y: r.bottom + 6, align })
  }

  function hideTooltip() { setPos(null) }

  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    hideTooltip()
    onNavigate(entry!.docId, entry!.slug)
  }

  // Tooltip colours — contextually aware of dark mode
  const tipBg     = isDark ? '#232018' : '#ffffff'
  const tipBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
  const tipShadow = isDark
    ? '0 4px_24px_rgba(0,0,0,0.55)'
    : '0 4px 20px rgba(0,0,0,0.14)'
  const tipLabel  = isDark ? '#a09680' : '#6b7280'
  const tipTitle  = isDark ? '#ede8df' : '#1f2937'
  const tipBody   = isDark ? '#7d7567' : '#6b7280'
  const tipHint   = isDark ? '#5a5246' : '#9ca3af'

  // Status badge colours
  const badgePalette = STATUS_BADGE_PALETTE[visualStatus] ?? STATUS_BADGE_PALETTE.reference
  const badgeBg = isDark ? badgePalette.darkBg : badgePalette.bg
  const badgeColor = isDark ? badgePalette.darkColor : badgePalette.color
  const tooltipDotColor = isDark ? STATUS_DOT_COLORS_DARK[visualStatus] : STATUS_DOT_COLORS[visualStatus]

  const tooltip = pos && typeof document !== 'undefined'
    ? createPortal(
        <div
          role="tooltip"
          style={{
            position: 'fixed',
            top: pos.y,
            left:  pos.align === 'left'  ? pos.x : undefined,
            right: pos.align === 'right' ? window.innerWidth - pos.x : undefined,
            width: TOOLTIP_W,
            zIndex: 99999,
            background: tipBg,
            border: `1px solid ${tipBorder}`,
            borderRadius: 10,
            boxShadow: tipShadow,
          }}
          className="pointer-events-none text-left"
        >
          {/* Arrow */}
          <span
            style={{
              position: 'absolute',
              top: -5,
              left: pos.align === 'left' ? 16 : undefined,
              right: pos.align === 'right' ? 16 : undefined,
              width: 10, height: 10,
              background: tipBg,
              border: `1px solid ${tipBorder}`,
              borderRight: 'none',
              borderBottom: 'none',
              transform: 'rotate(45deg)',
              borderRadius: 2,
            }}
          />
          <div style={{ padding: '10px 12px 10px' }}>
            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: tooltipDotColor, flexShrink: 0 }} />
              <span style={{ fontFamily: 'monospace', fontSize: 11, fontWeight: 700, color: tipLabel }}>{entry.label}</span>
              <span style={{ marginLeft: 'auto', borderRadius: 4, padding: '1px 5px', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', background: badgeBg, color: badgeColor }}>
                {entry.status || 'ref'}
              </span>
            </div>
            {tooltipTitle && (
              <p style={{ marginTop: 7, fontSize: 12, fontWeight: 600, lineHeight: 1.4, color: tipTitle }}>
                {tooltipTitle.length > 90 ? tooltipTitle.slice(0, 90) + '…' : tooltipTitle}
              </p>
            )}
            {entry.summary && (
              <p style={{ marginTop: 4, fontSize: 11, lineHeight: 1.5, color: tipBody }}>
                {entry.summary.length > 110 ? entry.summary.slice(0, 110) + '…' : entry.summary}
              </p>
            )}
            <p style={{ marginTop: 8, fontSize: 10, color: tipHint }}>Click to open →</p>
          </div>
        </div>,
        document.body
      )
    : null

  return (
    <span className="relative inline-block align-baseline">
      <button
        ref={btnRef}
        type="button"
        onClick={handleClick}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        className={`inline-flex cursor-pointer items-center rounded px-1.5 py-0.5 font-mono text-[0.78em] font-semibold leading-none whitespace-nowrap transition-colors ${chipStyle}`}
      >
        {display}
      </button>
      {tooltip}
    </span>
  )
}

// ─── End ref-chip system ─────────────────────────────────────────────────────

interface DashboardProps {
  view: AppView
  corpus: CorpusPayload | null
  loadError: string | null
  onViewChange: (view: AppView) => void
  onProgressChange?: (progress: number) => void
  onNavDocsChange: (recent: CorpusDoc[], shelf: CorpusDoc[], label: string) => void
  corpusQuery: string
  onCorpusQueryChange: (q: string) => void
  pendingDocId?: string | null
  onPendingDocIdConsumed?: () => void
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

interface MarkdownMermaid {
  type: 'mermaid'
  code: string
}

interface MarkdownStatechart {
  type: 'statechart'
  code: string
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
  | MarkdownMermaid
  | MarkdownStatechart
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
const READ_DOCS_STORAGE_KEY   = 'humane-reader:read-docs'
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
      const code = codeLines.join('\n')
      if (language === 'mermaid') {
        blocks.push({ type: 'mermaid', code })
      } else if (language === 'statechart') {
        blocks.push({ type: 'statechart', code })
      } else {
        blocks.push({ type: 'code', code, language })
      }
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

// Pattern that matches ref tokens we want to chip-ify in plain text
const REF_TOKEN_PATTERN = /\b(PRD-\d+|P-\d+|TR-\d+|T-\d+|INV-\d+|Annex\s+[A-Z]{1,3}\d*|ANNEX\s+[A-Z]{1,3}\d*|FC-\d+)\b/g

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
  // 0. Plural annexes: "Annexes M, AL, AQ" → "Annex M, Annex AL, Annex AQ"
  let out = text.replace(
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
  { phrases: ['Claims Evidence Register', 'Claims and Evidence Register'], path: 'docs/governance/Claims_Evidence_Register.md' },
  { phrases: ['Pilot Evidence Roadmap'], path: 'docs/governance/Pilot_Evidence_Roadmap.md' },
  { phrases: ['Threat Resolution Matrix'], path: 'docs/governance/Threat_Resolution_Matrix.md' },
  { phrases: ['Open Problems Docket', 'Open Problems Resolution Docket'], path: 'docs/governance/Open_Problems_Resolution_Docket.md' },
  { phrases: ['Acceptance Protocol'], path: 'docs/constitution/Acceptance_Protocol.md' },
  { phrases: ['Humane Constitution'], path: 'docs/constitution/Humane_Constitution.md' },
  { phrases: ['Founding Disclosure', 'Pre-Activation Disclosure'], path: 'docs/governance/Founding_Preactivation_Disclosure.md' },
  { phrases: ['Hardening Queue'], path: 'docs/governance/Hardening_Queue.md' },
  { phrases: ['Provenance Map'], path: 'docs/governance/Provenance_Map.md' },
  { phrases: ['Threat Register'], path: 'docs/governance/Threat_Register.md' },
  { phrases: ['Annex Index'], path: 'docs/annexes/INDEX.md' },
  { phrases: ['Patch Log'], path: 'docs/governance/Patch_Log.md' },
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
    const raw = rm[1]
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
    result.push(<RefChip key={`${keyPrefix}-chip-${m.index}`} refKey={m.key} display={m.raw} />)
    last = m.end
  }
  if (last < expanded.length) {
    result.push(...renderTextWithHighlights(expanded.slice(last), query, `${keyPrefix}-post`))
  }
  return result
}

function renderInline(text: string, keyPrefix: string, query = '', noChips = false, onInternalLink?: (href: string) => void, currentDocPath?: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  const tokenPattern = /(`[^`]+`|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*)/g
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
      parts.push(
        isPathLike
          ? <RefChip key={`${keyPrefix}-pathchip-${match.index}`} refKey={codeContent} display={codeContent} fallback={codeEl} />
          : codeEl
      )
    } else if (match[2] && match[3]) {
      const linkHref = match[3]
      const linkLabel = match[2]
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
type StatusVisualKey =
  | 'active'
  | 'addressed'
  | 'designed'
  | 'proposed'
  | 'partial'
  | 'open'
  | 'ongoing'
  | 'evidence'
  | 'moral'
  | 'reference'
  | ''

const STATUS_BADGE_PALETTE: Record<StatusVisualKey, { bg: string; color: string; darkBg: string; darkColor: string }> = {
  active:    { bg: '#dcfce7', color: '#166534', darkBg: 'rgba(6,78,59,0.7)', darkColor: '#6ee7b7' },
  addressed: { bg: '#ccfbf1', color: '#115e59', darkBg: 'rgba(19,78,74,0.72)', darkColor: '#5eead4' },
  designed:  { bg: '#fef3c7', color: '#92400e', darkBg: 'rgba(78,52,10,0.7)', darkColor: '#fcd34d' },
  proposed:  { bg: '#fef3c7', color: '#92400e', darkBg: 'rgba(78,52,10,0.7)', darkColor: '#fcd34d' },
  partial:   { bg: '#ffedd5', color: '#9a3412', darkBg: 'rgba(124,45,18,0.7)', darkColor: '#fdba74' },
  open:      { bg: '#fee2e2', color: '#991b1b', darkBg: 'rgba(127,29,29,0.72)', darkColor: '#fca5a5' },
  ongoing:   { bg: '#e0f2fe', color: '#075985', darkBg: 'rgba(7,68,100,0.7)', darkColor: '#7dd3fc' },
  evidence:  { bg: '#d1fae5', color: '#065f46', darkBg: 'rgba(6,78,59,0.74)', darkColor: '#6ee7b7' },
  moral:     { bg: '#ecfccb', color: '#3f6212', darkBg: 'rgba(54,83,20,0.7)', darkColor: '#bef264' },
  reference: { bg: '#e0f2fe', color: '#075985', darkBg: 'rgba(7,68,100,0.7)', darkColor: '#7dd3fc' },
  '':        { bg: '#f5f5f4', color: '#57534e', darkBg: 'rgba(68,64,60,0.72)', darkColor: '#d6d3d1' },
}

const STATUS_MAP: Array<{ pattern: RegExp; meta: StatusMeta }> = [
  { pattern: /^ACTIVE-UNPROVEN$/i,           meta: { badgeClass: 's-active-unproven', rowClass: 'row-active-unproven', label: 'ACTIVE-UNPROVEN' } },
  { pattern: /^ACTIVE$/i,                    meta: { badgeClass: 's-active',          rowClass: 'row-active',          label: 'ACTIVE' } },
  { pattern: /^ADDRESSED\*?$/i,              meta: { badgeClass: 's-addressed',       rowClass: 'row-addressed',       label: 'ADDRESSED' } },
  { pattern: /^RESOLVED$/i,                  meta: { badgeClass: 's-evidence-backed', rowClass: 'row-evidence-backed', label: 'RESOLVED' } },
  { pattern: /^EVIDENCE-BACKED$/i,           meta: { badgeClass: 's-evidence-backed', rowClass: 'row-evidence-backed', label: 'EVIDENCE-BACKED' } },
  { pattern: /^CLOSED$/i,                    meta: { badgeClass: 's-closed',          rowClass: 'row-closed',          label: 'CLOSED' } },
  { pattern: /^DESIGNED$/i,                  meta: { badgeClass: 's-designed',        rowClass: 'row-designed',        label: 'DESIGNED' } },
  { pattern: /^PROPOSED$/i,                  meta: { badgeClass: 's-proposed',        rowClass: 'row-proposed',        label: 'PROPOSED' } },
  { pattern: /^PARTIAL$/i,                   meta: { badgeClass: 's-partial',         rowClass: 'row-partial',         label: 'PARTIAL' } },
  { pattern: /^OPEN$/i,                      meta: { badgeClass: 's-open',            rowClass: 'row-open',            label: 'OPEN' } },
  { pattern: /^ONGOING$/i,                   meta: { badgeClass: 's-ongoing',         rowClass: 'row-ongoing',         label: 'ONGOING' } },
  { pattern: /^FOUNDING$/i,                  meta: { badgeClass: 's-founding',        rowClass: 'row-founding',        label: 'FOUNDING' } },
  { pattern: /UNRESOLVED PREREQUISITE/i,     meta: { badgeClass: 's-unresolved',      rowClass: 'row-unresolved',      label: 'UNRESOLVED PREREQUISITE' } },
  { pattern: /NEEDS EVIDENCE/i,              meta: { badgeClass: 's-needs-evidence',  rowClass: 'row-needs-evidence',  label: 'NEEDS EVIDENCE' } },
  { pattern: /PARTLY TESTED/i,               meta: { badgeClass: 's-partly-tested',   rowClass: 'row-partly-tested',   label: 'PARTLY TESTED' } },
  { pattern: /MORAL COMMITMENT/i,            meta: { badgeClass: 's-moral',           rowClass: 'row-moral',           label: 'MORAL COMMITMENT' } },
  { pattern: /ACTIVE-UNPROVEN CONTROL/i,     meta: { badgeClass: 's-active-unproven', rowClass: 'row-active-unproven', label: 'ACTIVE-UNPROVEN' } },
  { pattern: /DESIGNED MECHANISM|DESIGNED DIRECTION|DESIGNED CONTROL|DESIGNED$/i, meta: { badgeClass: 's-designed', rowClass: 'row-designed', label: 'DESIGNED' } },
  { pattern: /^\*\*Critical\*\*$/i,    meta: { badgeClass: 's-critical', rowClass: 'row-open',     label: 'Critical' } },
  { pattern: /^Critical$/i,            meta: { badgeClass: 's-critical', rowClass: 'row-open',     label: 'Critical' } },
  { pattern: /^\*\*Med-High\*\*$/i,    meta: { badgeClass: 's-med-high', rowClass: 'row-partial',  label: 'Med-High' } },
  { pattern: /^Med-High$/i,            meta: { badgeClass: 's-med-high', rowClass: 'row-partial',  label: 'Med-High' } },
  { pattern: /^\*\*High\*\*$/i,        meta: { badgeClass: 's-high',     rowClass: 'row-partial',  label: 'High' } },
  { pattern: /^High$/i,                meta: { badgeClass: 's-high',     rowClass: 'row-partial',  label: 'High' } },
  { pattern: /^Medium$/i,              meta: { badgeClass: 's-medium',   rowClass: '',             label: 'Medium' } },
  { pattern: /^Low$/i,                 meta: { badgeClass: 's-low',      rowClass: '',             label: 'Low' } },
]

function cleanStatusCell(cell: string): string {
  return cell.replace(/\*\*/g, '').replace(/`/g, '').trim().replace(/\s+/g, ' ')
}

function statusVisualKey(status: string): StatusVisualKey {
  const normalized = cleanStatusCell(status).toLowerCase()
  if (!normalized) return ''
  if (normalized.includes('evidence-backed') || normalized === 'resolved') return 'evidence'
  if (normalized.includes('active-unproven')) return 'addressed'
  if (normalized === 'active') return 'active'
  if (normalized.includes('addressed')) return 'addressed'
  if (normalized.includes('moral commitment')) return 'moral'
  if (normalized.includes('designed') || normalized === 'proposed') return 'designed'
  if (normalized.includes('partial') || normalized.includes('needs evidence')) return 'partial'
  if (normalized.includes('unresolved prerequisite') || normalized === 'open') return 'open'
  if (normalized.includes('ongoing')) return 'ongoing'
  if (normalized.includes('partly tested')) return 'ongoing'
  if (normalized === 'reference') return 'reference'
  return 'reference'
}

function matchStatus(cell: string): StatusMeta | null {
  const trimmed = cleanStatusCell(cell)
  for (const { pattern, meta } of STATUS_MAP) {
    if (pattern.test(trimmed)) return meta
  }
  return null
}

function getRowStatusClass(row: string[]): string {
  for (const cell of row) {
    const meta = matchStatus(cell)
    if (meta?.rowClass) return meta.rowClass
  }
  return ''
}

function renderTableCell(text: string, keyPrefix: string, query: string, onInternalLink?: (href: string) => void, currentDocPath?: string): React.ReactNode {
  const meta = matchStatus(text.trim())
  if (meta) {
    return (
      <span className={`status-badge ${meta.badgeClass}`}>
        {meta.label}
      </span>
    )
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

// ── appearance settings ────────────────────────────────────────────────────

const FONT_SIZE_KEY    = 'humane-reader:font-size'
const COLUMN_WIDTH_KEY = 'humane-reader:column-width'

type FontSizeOption  = 'sm' | 'md' | 'lg' | 'xl'
type ColumnWidthOption = 'narrow' | 'normal' | 'wide'

const FONT_SIZE_VALUES: Record<FontSizeOption, string> = {
  sm: '14px', md: '16px', lg: '18px', xl: '20px',
}
const COLUMN_WIDTH_VALUES: Record<ColumnWidthOption, string> = {
  narrow: '38rem', normal: '52rem', wide: '68rem',
}

function readFontSize(): FontSizeOption {
  const v = typeof window !== 'undefined' ? window.localStorage.getItem(FONT_SIZE_KEY) : null
  return (v === 'sm' || v === 'md' || v === 'lg' || v === 'xl') ? v : 'md'
}
function readColumnWidth(): ColumnWidthOption {
  const v = typeof window !== 'undefined' ? window.localStorage.getItem(COLUMN_WIDTH_KEY) : null
  return (v === 'narrow' || v === 'normal' || v === 'wide') ? v : 'normal'
}
function applyFontSize(size: FontSizeOption) {
  document.documentElement.style.setProperty('--reader-font-size', FONT_SIZE_VALUES[size])
}
function applyColumnWidth(width: ColumnWidthOption) {
  document.documentElement.style.setProperty('--reader-column-width', COLUMN_WIDTH_VALUES[width])
}

const THEME_KEY = 'humane-reader:theme'
type ThemeOption = 'light' | 'dark' | 'system'

function readTheme(): ThemeOption {
  const v = typeof window !== 'undefined' ? window.localStorage.getItem(THEME_KEY) : null
  return (v === 'light' || v === 'dark' || v === 'system') ? v : 'system'
}

function resolveTheme(pref: ThemeOption): 'light' | 'dark' {
  if (pref === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return pref
}

function applyTheme(pref: ThemeOption) {
  const resolved = resolveTheme(pref)
  if (resolved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.removeAttribute('data-theme')
  }
}

// ── ─────────────────────────────────────────────────────────────────────────

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
          el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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

          return (
            <div key={`${doc.id}-table-${index}`} className="reader-table-wrap">
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
                    const rowClass = getRowStatusClass(row)
                    return (
                      <tr key={`${doc.id}-table-row-${index}-${rowIndex}`} className={rowClass || undefined}>
                        {row.map((cell, cellIndex) => (
                          <td key={`${doc.id}-table-cell-${index}-${rowIndex}-${cellIndex}`}>
                            {renderTableCell(cell, `${doc.id}-table-cell-inline-${index}-${rowIndex}-${cellIndex}`, searchQuery, handleInternalLink, doc.path)}
                          </td>
                        ))}
                      </tr>
                    )
                  })}
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
}) {
  return (
    <section id="reader-panel-start" data-testid="reader-panel" className="scroll-mt-16 space-y-8">
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
              className="focus-ring w-full min-w-0 rounded border border-[var(--line-strong)] bg-[var(--paper-strong)] px-3 py-1.5 font-serif text-[14px] text-ink-strong placeholder:text-ink-faint sm:w-56"
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
}) {
  if (!docs.length || !selectedDoc) {
    return (
      <article className="border-l-2 border-line py-6 pl-5">
        <p className="font-serif text-[15px] leading-7 text-ink-soft">{emptyLabel}</p>
      </article>
    )
  }

  return (
    <div data-reading-mode={readingMode ? 'true' : 'false'} className="w-full">
      <div
        key={`reader-pane-${selectedDoc.id}`}
        ref={readerPaneRef}
        data-testid="reader-scroll-pane"
        className="min-w-0"
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
        />
      </div>
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
      setActiveIndex(i => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
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
  { keys: ['/'], label: 'Focus section filter' },
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


export function Dashboard({ view, corpus, loadError, onViewChange, onProgressChange, onNavDocsChange, corpusQuery, onCorpusQueryChange, pendingDocId, onPendingDocIdConsumed }: DashboardProps) {
  const [documentQuery, setDocumentQuery] = useState('')
  const [selectedDocId, setSelectedDocId] = useState<string | null>(() => readStoredSelectedDocId(view))
  const [pinnedDocIds, setPinnedDocIds] = useState<string[]>(() => readStoredDocList(PINNED_DOCS_STORAGE_KEY))
  const [recentDocIds, setRecentDocIds] = useState<string[]>(() => readStoredDocList(RECENT_DOCS_STORAGE_KEY))
  const [readDocIds, setReadDocIds]     = useState<string[]>(() => readStoredDocList(READ_DOCS_STORAGE_KEY))
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
    if (!pendingDocId) return
    userPickedDocRef.current = true
    setSelectedDocId(pendingDocId)
    onPendingDocIdConsumed?.()
    // Scroll reader panel into view below the sticky header after doc change.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById('reader-panel-start')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    })
  }, [pendingDocId])

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

      if (event.key === '/') {
        event.preventDefault()
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
      onViewChange(targetView)
      // The view-change useEffect will restore selectedDocId from storage.
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

    if (targetView !== view) {
      onViewChange(targetView)
      return
    }

    handleSelectDoc(doc)
  }

  function handleGlobalSearchSelect(doc: CorpusDoc) {
    onViewChange(viewForDoc(doc))
    setSelectedDocId(doc.id)
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
      {view === 'topics' && <TopicsView corpus={corpus} onJump={handleSelectQuickDoc} />}
      {view === 'paths' && <ReadingPathsView corpus={corpus} onJump={handleSelectQuickDoc} />}
      {view === 'validation' && <ValidationPanels corpus={corpus} />}
      {view !== 'home' && view !== 'topics' && view !== 'paths' && view !== 'settings' && (
        <SectionIntro view={view} corpus={corpus} onJump={handleSelectQuickDoc} />
      )}


      {view !== 'home' && view !== 'topics' && view !== 'paths' && view !== 'settings' && (
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
        />
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
