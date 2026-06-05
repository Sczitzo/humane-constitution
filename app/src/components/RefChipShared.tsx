/**
 * Shared ref-chip system — used by both Dashboard (reader) and ChatPanel (AI chat).
 * Extracted from Dashboard.tsx to avoid duplication.
 */
import { createContext, useContext, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { CorpusDoc } from '../generated/corpus'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RefEntry {
  label: string
  title: string
  summary: string
  status: string
  docId: string
  slug?: string
}

export type RefLookup = Map<string, RefEntry>

export interface RefNavContextValue {
  lookup: RefLookup
  onNavigate: (docId: string, slug?: string) => void
  isDark: boolean
}

export const RefNavContext = createContext<RefNavContextValue>({
  lookup: new Map(),
  onNavigate: () => {},
  isDark: false,
})

// ─── Status styling ───────────────────────────────────────────────────────────

export type StatusVisualKey =
  | 'active' | 'addressed' | 'designed' | 'proposed' | 'partial'
  | 'open' | 'ongoing' | 'evidence' | 'moral' | 'reference' | ''

export function statusVisualKey(status: string): StatusVisualKey {
  const n = status.toLowerCase().trim().replace(/\*\*/g, '').replace(/`/g, '').replace(/\s+/g, ' ')
  if (!n) return ''
  if (n.includes('evidence-backed') || n === 'resolved') return 'evidence'
  if (n.includes('active-unproven')) return 'addressed'
  if (n === 'active') return 'active'
  if (n.includes('addressed')) return 'addressed'
  if (n.includes('moral commitment')) return 'moral'
  if (n.includes('designed') || n === 'proposed') return 'designed'
  if (n.includes('partial') || n.includes('needs evidence')) return 'partial'
  if (n.includes('unresolved prerequisite') || n === 'open') return 'open'
  if (n.includes('ongoing') || n.includes('partly tested')) return 'ongoing'
  if (n === 'reference') return 'reference'
  return 'reference'
}

const STATUS_CHIP_STYLES: Record<string, string> = {
  active:    'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100',
  addressed: 'bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100',
  designed:  'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100',
  proposed:  'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100',
  partial:   'bg-orange-50 text-orange-800 border border-orange-200 hover:bg-orange-100',
  open:      'bg-red-50 text-red-800 border border-red-200 hover:bg-red-100',
  ongoing:   'bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100',
  evidence:  'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100',
  moral:     'bg-lime-50 text-lime-800 border border-lime-200 hover:bg-lime-100',
  reference: 'bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100',
  '':        'bg-stone-100 text-stone-600 border border-stone-200 hover:bg-stone-200',
}

const STATUS_CHIP_STYLES_DARK: Record<string, string> = {
  active:    'bg-emerald-950/70 text-emerald-300 border border-emerald-700/50 hover:bg-emerald-900/70',
  addressed: 'bg-teal-950/70 text-teal-300 border border-teal-700/50 hover:bg-teal-900/70',
  designed:  'bg-amber-950/70 text-amber-300 border border-amber-700/50 hover:bg-amber-900/70',
  proposed:  'bg-amber-950/70 text-amber-300 border border-amber-700/50 hover:bg-amber-900/70',
  partial:   'bg-orange-950/70 text-orange-300 border border-orange-700/50 hover:bg-orange-900/70',
  open:      'bg-red-950/70 text-red-300 border border-red-700/50 hover:bg-red-900/70',
  ongoing:   'bg-sky-950/70 text-sky-300 border border-sky-700/50 hover:bg-sky-900/70',
  evidence:  'bg-emerald-950/70 text-emerald-300 border border-emerald-700/50 hover:bg-emerald-900/70',
  moral:     'bg-lime-950/70 text-lime-300 border border-lime-700/50 hover:bg-lime-900/70',
  reference: 'bg-sky-950/70 text-sky-300 border border-sky-700/50 hover:bg-sky-900/70',
  '':        'bg-white/10 text-stone-300 border border-white/20 hover:bg-white/15',
}

export const STATUS_DOT_COLORS: Record<StatusVisualKey, string> = {
  active: '#10b981', addressed: '#14b8a6', designed: '#f59e0b', proposed: '#f59e0b',
  partial: '#f97316', open: '#ef4444', ongoing: '#0ea5e9', evidence: '#059669',
  moral: '#65a30d', reference: '#38bdf8', '': '#a8a29e',
}

export const STATUS_DOT_COLORS_DARK: Record<StatusVisualKey, string> = {
  active: '#34d399', addressed: '#2dd4bf', designed: '#fbbf24', proposed: '#fbbf24',
  partial: '#fb923c', open: '#f87171', ongoing: '#38bdf8', evidence: '#6ee7b7',
  moral: '#a3e635', reference: '#38bdf8', '': '#78716c',
}

export const STATUS_BADGE_PALETTE: Record<StatusVisualKey, { bg: string; color: string; darkBg: string; darkColor: string }> = {
  active:    { bg: '#dcfce7', color: '#166534', darkBg: 'rgba(6,78,59,0.7)',    darkColor: '#6ee7b7' },
  addressed: { bg: '#ccfbf1', color: '#115e59', darkBg: 'rgba(19,78,74,0.72)', darkColor: '#5eead4' },
  designed:  { bg: '#fef3c7', color: '#92400e', darkBg: 'rgba(78,52,10,0.7)',  darkColor: '#fcd34d' },
  proposed:  { bg: '#fef3c7', color: '#92400e', darkBg: 'rgba(78,52,10,0.7)',  darkColor: '#fcd34d' },
  partial:   { bg: '#ffedd5', color: '#9a3412', darkBg: 'rgba(124,45,18,0.7)', darkColor: '#fdba74' },
  open:      { bg: '#fee2e2', color: '#991b1b', darkBg: 'rgba(127,29,29,0.72)',darkColor: '#fca5a5' },
  ongoing:   { bg: '#e0f2fe', color: '#075985', darkBg: 'rgba(7,68,100,0.7)',  darkColor: '#7dd3fc' },
  evidence:  { bg: '#d1fae5', color: '#065f46', darkBg: 'rgba(6,78,59,0.74)', darkColor: '#6ee7b7' },
  moral:     { bg: '#ecfccb', color: '#3f6212', darkBg: 'rgba(54,83,20,0.7)', darkColor: '#bef264' },
  reference: { bg: '#e0f2fe', color: '#075985', darkBg: 'rgba(7,68,100,0.7)', darkColor: '#7dd3fc' },
  '':        { bg: '#f5f5f4', color: '#57534e', darkBg: 'rgba(68,64,60,0.72)',darkColor: '#d6d3d1' },
}

// ─── RefChip component ────────────────────────────────────────────────────────

interface TooltipPos { x: number; y: number; align: 'left' | 'right' }

export function RefChip({ refKey, display, fallback }: { refKey: string; display: string; fallback?: React.ReactNode }) {
  const { lookup, onNavigate, isDark } = useContext(RefNavContext)
  const strippedKey = refKey.replace(/\s*§.*$/, '').trim()
  const strippedDisplay = display.replace(/\s*§.*$/, '').trim()
  const entry = lookup.get(refKey) || lookup.get(display) || lookup.get(strippedKey) || lookup.get(strippedDisplay)
  const btnRef = useRef<HTMLButtonElement>(null)
  const [pos, setPos] = useState<TooltipPos | null>(null)

  if (!entry) return fallback !== undefined ? <>{fallback}</> : <>{display}</>

  const chipStyles = isDark ? STATUS_CHIP_STYLES_DARK : STATUS_CHIP_STYLES
  const visualStatus = statusVisualKey(entry.status)
  const chipStyle = chipStyles[visualStatus] ?? chipStyles['']
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

  const tipBg     = isDark ? '#16212d' : '#ffffff'
  const tipBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
  const tipShadow = isDark ? '0 4px 24px rgba(0,0,0,0.55)' : '0 4px 20px rgba(0,0,0,0.14)'
  const tipLabel  = isDark ? '#a09680' : '#6b7280'
  const tipTitle  = isDark ? '#ede8df' : '#1f2937'
  const tipBody   = isDark ? '#7d7567' : '#6b7280'
  const tipHint   = isDark ? '#5a5246' : '#9ca3af'

  const badgePalette = STATUS_BADGE_PALETTE[visualStatus] ?? STATUS_BADGE_PALETTE.reference
  const badgeBg      = isDark ? badgePalette.darkBg    : badgePalette.bg
  const badgeColor   = isDark ? badgePalette.darkColor : badgePalette.color
  const dotColor     = isDark ? STATUS_DOT_COLORS_DARK[visualStatus] : STATUS_DOT_COLORS[visualStatus]

  const tooltip = pos && typeof document !== 'undefined'
    ? createPortal(
        <div
          role="tooltip"
          style={{
            position: 'fixed',
            top: pos.y,
            left: pos.align === 'left' ? pos.x : undefined,
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
          <span style={{
            position: 'absolute', top: -5,
            left: pos.align === 'left' ? 16 : undefined,
            right: pos.align === 'right' ? 16 : undefined,
            width: 10, height: 10,
            background: tipBg, border: `1px solid ${tipBorder}`,
            borderRight: 'none', borderBottom: 'none',
            transform: 'rotate(45deg)', borderRadius: 2,
          }} />
          <div style={{ padding: '10px 12px 10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
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
        {(/[/\\]/.test(display) || display.endsWith('.md') || display.endsWith('.ts') || display.endsWith('.json')) ? entry.title : display}
      </button>
      {tooltip}
    </span>
  )
}

// ─── Static doc phrase definitions ────────────────────────────────────────────

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
  // ── Evidence test packages ────────────────────────────────────────────────
  { phrases: ['Capacity Measurement Evidence Test Package', 'Capacity Measurement Evidence Test'], path: 'docs/governance/Capacity_Measurement_Evidence_Test_Package.md' },
  { phrases: ['Identity and Recovery Evidence Test Package', 'Identity Recovery Evidence Test Package', 'Identity and Recovery Evidence Test'], path: 'docs/governance/Identity_Recovery_Evidence_Test_Package.md' },
  { phrases: ['Essential-Sector Refusal Test Package', 'Essential Sector Refusal Test Package', 'Essential-Sector Refusal Test'], path: 'docs/governance/Essential_Sector_Refusal_Test_Package.md' },
  {
    phrases: [
	      'Commons Return and Universal Stake Evidence Package',
	      'Commons Return and Universal Stake Evidence Test Package',
	      'Commons Return Universal Stake Evidence Package',
	    ],
    path: 'docs/governance/Commons_Return_Universal_Stake_Evidence_Test_Package.md',
  },
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

// ─── buildRefLookup ───────────────────────────────────────────────────────────

export function buildRefLookup(docs: CorpusDoc[]): RefLookup {
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
      for (const h of doc.headings) {
        const hm = h.text.match(/^(P-\d+)\s*[—–-]/)
        if (hm) {
          const pKey = hm[1]
          if (!map.has(pKey)) {
            map.set(pKey, {
              label: pKey, title: h.text,
              summary: doc.summary || '', status: doc.statusBucket,
              docId: doc.id, slug: h.slug,
            })
          }
        }
      }
    }

    // Threat/INV entries
    if (doc.section === 'registry' || doc.section === 'constitution') {
      for (const h of doc.headings) {
        const tm = h.text.match(/^(T-\d+|TR-\d+|PRD-\d+|INV-\d+)\s*[—–:\s]/)
        if (tm) {
          const tKey = tm[1]
          if (!map.has(tKey)) {
            map.set(tKey, {
              label: tKey, title: h.text, summary: '',
              status: doc.statusBucket || 'reference', docId: doc.id, slug: h.slug,
            })
          }
        }
      }
    }

    // Annex entries
    if (doc.section === 'annex') {
      const annexMatch = doc.path.match(/ANNEX_([A-Z]{1,3}\d*)\.md$/i)
        || doc.title.match(/^ANNEX\s+([A-Z]{1,3}\d*)\s*[—–-]/i)
      if (annexMatch) {
        const code = annexMatch[1].toUpperCase()
        const entry: RefEntry = {
          label: `Annex ${code}`, title: doc.title,
          summary: doc.summary || '', status: doc.statusBucket, docId: doc.id,
        }
        for (const k of [`Annex ${code}`, `ANNEX ${code}`, code]) {
          if (!map.has(k)) map.set(k, entry)
        }
        for (let n = 1; n <= 9; n++) {
          for (const k of [`Annex ${code}${n}`, `ANNEX ${code}${n}`]) {
            if (!map.has(k)) map.set(k, { ...entry, label: `Annex ${code}${n}` })
          }
        }
        for (const h of doc.headings) {
          const sub = h.text.match(/^([A-Z]{1,3}\d+\.\d+)(?:\s|$|[—–\-])/)
          const makeSubEntry = (subCode: string): RefEntry => {
            const escapedCode = subCode.replace(/\./g, '\\.')
            const hMatch = doc.content.match(new RegExp(`^#{1,6}\\s+${escapedCode}\\b[^\\n]*`, 'm'))
            let summary = ''
            if (hMatch && hMatch.index !== undefined) {
              const after = doc.content.slice(hMatch.index + hMatch[0].length)
              const paras = after.split(/\n{2,}/).map(p => p.trim()).filter(p => p && !p.startsWith('#'))
              if (paras[0]) summary = paras[0].replace(/[*`\[\]]/g, '').slice(0, 140)
            }
            return { label: subCode, title: h.text, summary, status: entry.status, docId: doc.id, slug: h.slug }
          }
          if (sub) {
            const subCode = sub[1]
            const subEntry = makeSubEntry(subCode)
            for (const k of [`Annex ${subCode}`, `ANNEX ${subCode}`, subCode]) {
              if (!map.has(k)) map.set(k, subEntry)
            }
          }
          const secMatch = h.text.match(/^§([A-Z0-9][\w.\-]*)(?:\s|$|[.—–\-])/i)
            ?? h.text.match(/^([A-Z]{1,3}\d+(?:\.\d+)?)(?:\s|$|[.—–\-])/)
          if (secMatch) {
            const secCode = secMatch[1]
            const secEntry: RefEntry = { label: `§${secCode}`, title: h.text, summary: '', status: entry.status, docId: doc.id, slug: h.slug }
            for (const k of [
              `Annex ${code} §${secCode}`, `ANNEX ${code} §${secCode}`,
              `${code} §${secCode}`, `§${secCode}`,
            ]) {
              if (!map.has(k)) map.set(k, secEntry)
            }
          }
        }
      }
    }
  }

  // FC-NNN pass
  for (const doc of docs) {
    if (!/commitments/i.test(doc.path)) continue
    const fcPattern = /\|\s*\*{0,2}(FC-\d+)\*{0,2}\s*\|\s*`?([^`|\n]{3,60})`?\s*\|(?:[^|]*\|){1,2}\s*([^|\n]{0,80})\|/g
    let fm: RegExpExecArray | null = fcPattern.exec(doc.content)
    while (fm) {
      const key = fm[1]
      if (!map.has(key)) {
        map.set(key, { label: key, title: `${key} — ${fm[2].trim()}`, summary: '', status: 'reference', docId: doc.id })
      }
      fm = fcPattern.exec(doc.content)
    }
  }

  // Inline PRD/TR in table cells
  for (const doc of docs) {
    if (!/patch.log|patch_log|threat.register|threat_register/i.test(doc.path)) continue
    const cellPattern = /\b(PRD-\d+|TR-\d+)\s*\/\s*([^|,\n]{3,60})/g
    let cm: RegExpExecArray | null = cellPattern.exec(doc.content)
    while (cm) {
      const key = cm[1]
      const desc = cm[2].trim().replace(/\*+/g, '').trim()
      if (!map.has(key)) {
        map.set(key, { label: key, title: `${key} — ${desc}`, summary: '', status: 'reference', docId: doc.id })
      }
      cm = cellPattern.exec(doc.content)
    }
    const rowPattern = /\|\s*P-\d+\s*\|\s*(PRD-\d+)\s*\|\s*\*{0,2}\w+\*{0,2}\s*\|\s*\w+\s*\|\s*([^|]{5,120})\|/g
    let rm: RegExpExecArray | null = rowPattern.exec(doc.content)
    while (rm) {
      const key = rm[1]
      const desc = rm[2].trim().replace(/\*+/g, '').trim()
      if (!map.has(key) && desc.length > 4) {
        map.set(key, { label: key, title: `${key} — ${desc.slice(0, 80)}`, summary: '', status: 'reference', docId: doc.id })
      }
      rm = rowPattern.exec(doc.content)
    }
    const combinedPattern = /\b(T-\d+)\s*\/\s*(T-\d+)\s*[—–]/g
    let combo: RegExpExecArray | null = combinedPattern.exec(doc.content)
    while (combo) {
      for (const key of [combo[1], combo[2]]) {
        if (!map.has(key)) {
          const h = doc.headings.find(hd => hd.text.includes(combo![1]) || hd.text.includes(combo![2]))
          map.set(key, { label: key, title: h?.text ?? key, summary: '', status: 'reference', docId: doc.id, slug: h?.slug })
        }
      }
      combo = combinedPattern.exec(doc.content)
    }
  }

  // P-NNN in Patch Log
  for (const doc of docs) {
    if (/patch.log/i.test(doc.path) || /patch_log/i.test(doc.path)) {
      for (const h of doc.headings) {
        const hm = h.text.match(/^(P-\d+)\s*[—–-]/)
        if (hm && !map.has(hm[1])) {
          map.set(hm[1], { label: hm[1], title: h.text, summary: '', status: 'reference', docId: doc.id, slug: h.slug })
        }
      }
    }
    if (/threat.register/i.test(doc.path) || /threat_register/i.test(doc.path)) {
      for (const h of doc.headings) {
        const tm = h.text.match(/^(T-\d+|TR-\d+|PRD-\d+|INV-\d+)\s*[—–:\s]/)
        if (tm && !map.has(tm[1])) {
          map.set(tm[1], { label: tm[1], title: h.text, summary: '', status: 'reference', docId: doc.id, slug: h.slug })
        }
      }
    }
  }

  // File path index
  for (const doc of docs) {
    const path = doc.path
    const filename = path.split('/').pop() ?? path
    const entry: RefEntry = { label: filename, title: doc.title, summary: doc.summary || '', status: doc.statusBucket, docId: doc.id }
    for (const k of [path, `/${path}`]) {
      if (!map.has(k)) map.set(k, entry)
    }
    if (!map.has(filename)) map.set(filename, { ...entry, label: filename })
    const dir = path.substring(0, path.lastIndexOf('/') + 1)
    if (dir && (filename === 'README.md' || filename === 'index.md')) {
      for (const k of [dir, `/${dir}`, dir.replace(/\/$/, ''), `/${dir.replace(/\/$/, '')}`]) {
        if (!map.has(k)) map.set(k, { ...entry, label: dir })
      }
    }
  }

  // Doc phrase keywords
  for (const def of DOC_PHRASE_DEFS) {
    const docEntry = docs.find(d => d.path === def.path)
    if (!docEntry) continue
    const entry: RefEntry = { label: def.phrases[0], title: docEntry.title, summary: docEntry.summary || '', status: docEntry.statusBucket, docId: docEntry.id }
    for (const phrase of def.phrases) {
      const key = `docphrase:${phrase.toLowerCase()}`
      if (!map.has(key)) map.set(key, entry)
    }
  }

  return map
}
