/**
 * Preview C — "The Archive"
 * Point of view: structured knowledge base, Notion meets Linear.
 *
 * Distinctive vs. current reader:
 *  - Three-column layout: section hierarchy | document list | reader
 *  - Color-coded sections: Constitution=deep blue, Annexes=amber, Registries=rose
 *  - Reader header shows the T→P→Annex provenance chain for each document
 *  - Ref chips navigate via a breadcrumb back-stack (← Previous doc button persists)
 *  - Tables rendered as card grids when they have a "status" column
 *  - Document metadata (word count, section, headings count) shown in a sidebar strip
 *  - Clean Inter throughout — this is the information-dense path, not the reading path
 */

import { useCallback, useMemo, useRef, useState } from 'react'
import type { CorpusPayload, CorpusDoc } from '../../generated/corpus'
import { parseMarkdown, type MarkdownBlock } from '../../lib/markdown'
import { buildRefLookup } from '../RefChipShared'

const SANS = 'Inter, "Helvetica Neue", sans-serif'
const MONO = '"IBM Plex Mono", "Courier New", monospace'

type Section = 'constitution' | 'annex' | 'registry'

const SECTION_META: Record<Section, { label: string; color: string; bg: string; border: string }> = {
  constitution: { label: 'Constitution',  color: '#2563eb', bg: 'rgba(37,99,235,0.06)',  border: 'rgba(37,99,235,0.2)' },
  annex:        { label: 'Annexes',        color: '#9f6c31', bg: 'rgba(159,108,49,0.07)', border: 'rgba(159,108,49,0.2)' },
  registry:     { label: 'Registries',     color: '#be185d', bg: 'rgba(190,24,93,0.06)',  border: 'rgba(190,24,93,0.18)' },
}

function sectionFor(doc: CorpusDoc): Section {
  if (doc.section === 'constitution' || doc.section === 'founding_order') return 'constitution'
  if (doc.section === 'annex') return 'annex'
  return 'registry'
}

const STATUS_COLORS: Record<string, string> = {
  'active': 'rgba(34,197,94,0.15)',
  'designed': 'rgba(234,179,8,0.15)',
  'proposed': 'rgba(234,179,8,0.12)',
  'resolved': 'rgba(34,197,94,0.12)',
  'open': 'rgba(239,68,68,0.12)',
  'partly tested': 'rgba(59,130,246,0.12)',
}

function statusColor(cell: string) {
  const lower = cell.toLowerCase().replace(/[_-]/g, ' ')
  for (const [k, v] of Object.entries(STATUS_COLORS)) {
    if (lower.includes(k)) return v
  }
  return 'transparent'
}

function InlinePlain({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g)
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith('**')) return <strong key={i} style={{ fontWeight: 600 }}>{p.slice(2, -2)}</strong>
        if (p.startsWith('`')) return <code key={i} style={{ fontFamily: MONO, fontSize: '0.85em', background: 'rgba(0,0,0,0.06)', padding: '0 4px', borderRadius: 2 }}>{p.slice(1, -1)}</code>
        if (p.startsWith('*')) return <em key={i}>{p.slice(1, -1)}</em>
        return <span key={i}>{p}</span>
      })}
    </>
  )
}

function RefBadge({ token, onNavigate }: { token: string; onNavigate: (key: string) => void }) {
  const sectionMeta = token.startsWith('P-') ? SECTION_META.registry
    : token.startsWith('T-') ? SECTION_META.registry
    : token.startsWith('Annex') || token.startsWith('ANNEX') ? SECTION_META.annex
    : SECTION_META.constitution

  return (
    <button onClick={() => onNavigate(token)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 3, border: `1px solid ${sectionMeta.border}`, background: sectionMeta.bg, color: sectionMeta.color, cursor: 'pointer', fontFamily: MONO, fontSize: '0.76em', padding: '1px 6px', borderRadius: 4, fontWeight: 600, letterSpacing: '0.02em', verticalAlign: 'baseline' }}>
      {token}
    </button>
  )
}

function Inline({ text, onNavigate }: { text: string; onNavigate: (key: string) => void }) {
  const combined = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\b(?:P-\d+|T-\d+|INV-\d+|FC-\d+|Annex\s+[A-Z]{1,3}\d*)\b)/g
  const parts: React.ReactNode[] = []
  let last = 0, m: RegExpExecArray | null
  combined.lastIndex = 0
  while ((m = combined.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    const tok = m[0]
    const key = `${m.index}`
    if (tok.startsWith('**')) parts.push(<strong key={key} style={{ fontWeight: 600 }}>{tok.slice(2, -2)}</strong>)
    else if (tok.startsWith('`')) parts.push(<code key={key} style={{ fontFamily: MONO, fontSize: '0.85em', background: 'rgba(0,0,0,0.06)', padding: '0 4px', borderRadius: 2 }}>{tok.slice(1, -1)}</code>)
    else if (tok.startsWith('*')) parts.push(<em key={key}>{tok.slice(1, -1)}</em>)
    else parts.push(<RefBadge key={key} token={tok} onNavigate={onNavigate} />)
    last = m.index + tok.length
  }
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts}</>
}

function TableBlock({ lines, onNavigate }: { lines: string[]; onNavigate: (key: string) => void }) {
  const dataLines = lines.filter(l => l.trim().startsWith('|'))
  if (!dataLines.length) return null
  const parseRow = (l: string) => l.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim())
  const isSep = (l: string) => /^\|[\-| :]+\|$/.test(l.trim())
  const header = parseRow(dataLines[0])
  const body = dataLines.slice(1).filter(l => !isSep(l)).map(parseRow)
  const hasStatus = header.some(h => /status|level|severity/i.test(h))

  if (hasStatus && body.length > 0) {
    return (
      <div style={{ margin: '16px 0', display: 'grid', gap: 6 }}>
        {body.slice(0, 20).map((row, ri) => {
          const statusCell = row[header.findIndex(h => /status|level|severity/i.test(h))] ?? ''
          const bg = statusColor(statusCell)
          return (
            <div key={ri} style={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: 6, padding: '10px 14px', background: bg || '#fff', display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              {row.map((cell, ci) => cell ? (
                <div key={ci} style={{ minWidth: 80, flex: ci === 0 ? '1 1 160px' : '1 1 120px' }}>
                  <div style={{ fontSize: 10, fontFamily: MONO, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#888', marginBottom: 3 }}>{header[ci] ?? ''}</div>
                  <div style={{ fontSize: 13, fontFamily: SANS, lineHeight: 1.45 }}>
                    <Inline text={cell} onNavigate={onNavigate} />
                  </div>
                </div>
              ) : null)}
            </div>
          )
        })}
        {body.length > 20 && <div style={{ fontSize: 12, color: '#888', padding: '4px 0', fontFamily: MONO }}>…{body.length - 20} more rows</div>}
      </div>
    )
  }

  return (
    <div style={{ margin: '16px 0', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 6, overflow: 'hidden' }}>
      {header.some(h => h) && (
        <div style={{ display: 'flex', background: '#f8f8f8', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
          {header.map((h, i) => <div key={i} style={{ flex: 1, padding: '7px 12px', fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#777' }}><InlinePlain text={h} /></div>)}
        </div>
      )}
      {body.map((row, ri) => (
        <div key={ri} style={{ display: 'flex', borderBottom: ri < body.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
          {row.map((c, ci) => <div key={ci} style={{ flex: 1, padding: '7px 12px', fontSize: 13.5, lineHeight: 1.5, fontFamily: SANS }}><Inline text={c} onNavigate={onNavigate} /></div>)}
        </div>
      ))}
    </div>
  )
}

function DocBody({ blocks, onNavigate }: { blocks: MarkdownBlock[]; onNavigate: (key: string) => void }) {
  return (
    <div style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.68, color: '#1a1a1a' }}>
      {blocks.map((block, i) => {
        if (block.type === 'heading') {
          const sizes = ['', '1.75rem', '1.35rem', '1.1rem', '0.97rem']
          return (
            <div key={i} data-heading-slug={block.slug} style={{ margin: `${block.level <= 2 ? 36 : 24}px 0 ${block.level <= 2 ? 12 : 6}px`, scrollMarginTop: 60 }}>
              {block.level === 2 && <div style={{ height: 1, background: 'rgba(0,0,0,0.08)', marginBottom: 14 }} />}
              <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: sizes[block.level] ?? '0.95rem', lineHeight: 1.25, color: '#0a0a0a', letterSpacing: block.level === 1 ? '-0.02em' : '-0.01em' }}>
                <Inline text={block.text} onNavigate={onNavigate} />
              </div>
            </div>
          )
        }
        if (block.type === 'paragraph') return <p key={i} style={{ margin: '0 0 1em' }}><Inline text={block.text} onNavigate={onNavigate} /></p>
        if (block.type === 'quote') return (
          <blockquote key={i} style={{ margin: '14px 0', borderLeft: '3px solid rgba(0,0,0,0.15)', paddingLeft: 16, color: '#555', fontStyle: 'italic', fontSize: 14 }}>
            <InlinePlain text={block.text} />
          </blockquote>
        )
        if (block.type === 'table') return <TableBlock key={i} lines={block.lines} onNavigate={onNavigate} />
        if (block.type === 'list') {
          const Tag = block.ordered ? 'ol' : 'ul'
          return (
            <Tag key={i} style={{ paddingLeft: 24, margin: '0 0 1em' }}>
              {block.items.map((item, li) => (
                <li key={li} style={{ marginBottom: '0.35em', lineHeight: 1.6 }}>
                  <Inline text={item} onNavigate={onNavigate} />
                </li>
              ))}
            </Tag>
          )
        }
        if (block.type === 'code') return (
          <pre key={i} style={{ overflowX: 'auto', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 6, padding: '12px 16px', fontFamily: MONO, fontSize: 12.5, lineHeight: 1.6, margin: '0 0 1em', background: '#f8f8f8', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            <code>{block.code}</code>
          </pre>
        )
        if (block.type === 'rule') return <hr key={i} style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.08)', margin: '28px 0' }} />
        return null
      })}
    </div>
  )
}

export function PreviewC({ corpus }: { corpus: CorpusPayload }) {
  const firstDoc = corpus.docs.find(d => d.section === 'constitution') ?? corpus.docs[0]
  const [selectedId, setSelectedId] = useState(firstDoc?.id ?? '')
  const [activeSection, setActiveSection] = useState<Section>('constitution')
  const [backStack, setBackStack] = useState<string[]>([])
  const readerRef = useRef<HTMLDivElement>(null)
  const refLookup = useMemo(() => buildRefLookup(corpus.docs), [corpus])

  const sectionDocs = useMemo(() => corpus.docs.filter(d => sectionFor(d) === activeSection), [corpus, activeSection])
  const doc = useMemo(() => corpus.docs.find(d => d.id === selectedId) ?? corpus.docs[0], [corpus, selectedId])
  const blocks = useMemo(() => doc ? parseMarkdown(doc) : [], [doc])
  const meta = SECTION_META[sectionFor(doc)]

  const selectDoc = useCallback((id: string) => {
    setSelectedId(id)
    setActiveSection(sectionFor(corpus.docs.find(d => d.id === id) ?? corpus.docs[0]))
    if (readerRef.current) readerRef.current.scrollTop = 0
  }, [corpus])

  const handleNavigate = useCallback((key: string) => {
    const resolved = refLookup.get(key)
    if (resolved?.type === 'doc') {
      setBackStack(s => [selectedId, ...s.slice(0, 4)])
      selectDoc(resolved.docId)
    }
  }, [refLookup, selectedId, selectDoc])

  const handleBack = () => {
    if (!backStack.length) return
    const [prev, ...rest] = backStack
    setBackStack(rest)
    selectDoc(prev)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#f9f9f9', fontFamily: SANS, overflow: 'hidden' }}>
      {/* Top bar */}
      <header style={{ borderBottom: '1px solid rgba(0,0,0,0.08)', padding: '0 20px', height: 46, display: 'flex', alignItems: 'center', gap: 12, background: '#fff', flexShrink: 0, zIndex: 50 }}>
        <span style={{ fontWeight: 700, fontSize: 14, color: '#0a0a0a', letterSpacing: '-0.01em' }}>Humane Constitution</span>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 11, fontFamily: MONO, color: '#aaa', letterSpacing: '0.04em' }}>Preview C · The Archive</span>
        <a href="/" style={{ fontSize: 12, color: '#2563eb', textDecoration: 'none', padding: '4px 12px', border: '1px solid rgba(37,99,235,0.25)', borderRadius: 5 }}>← back</a>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Section nav */}
        <div style={{ width: 148, borderRight: '1px solid rgba(0,0,0,0.08)', background: '#fff', display: 'flex', flexDirection: 'column', flexShrink: 0, padding: '12px 8px' }}>
          {(Object.entries(SECTION_META) as [Section, typeof SECTION_META[Section]][]).map(([s, m]) => (
            <button key={s} onClick={() => { setActiveSection(s); selectDoc(corpus.docs.find(d => sectionFor(d) === s)?.id ?? '') }}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '7px 10px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: activeSection === s ? 600 : 400, background: activeSection === s ? m.bg : 'transparent', color: activeSection === s ? m.color : '#444', marginBottom: 2, transition: 'all 0.1s' }}>
              {m.label}
              <span style={{ display: 'block', fontSize: 10, fontFamily: MONO, color: '#aaa', marginTop: 1, fontWeight: 400 }}>
                {corpus.docs.filter(d => sectionFor(d) === s).length} docs
              </span>
            </button>
          ))}
        </div>

        {/* Doc list */}
        <div style={{ width: 220, borderRight: '1px solid rgba(0,0,0,0.08)', background: '#fff', overflowY: 'auto', flexShrink: 0 }}>
          <div style={{ padding: '10px 12px 6px', borderBottom: '1px solid rgba(0,0,0,0.05)', fontSize: 11, fontFamily: MONO, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa' }}>
            {SECTION_META[activeSection].label}
          </div>
          {sectionDocs.map(d => (
            <button key={d.id} onClick={() => selectDoc(d.id)}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '9px 12px', border: 'none', cursor: 'pointer', fontSize: 12.5, background: d.id === selectedId ? SECTION_META[activeSection].bg : 'transparent', color: d.id === selectedId ? SECTION_META[activeSection].color : '#1a1a1a', borderLeft: d.id === selectedId ? `2px solid ${SECTION_META[activeSection].color}` : '2px solid transparent', lineHeight: 1.4, transition: 'all 0.1s' }}>
              {d.title}
            </button>
          ))}
        </div>

        {/* Reader */}
        <main ref={readerRef} style={{ flex: 1, overflowY: 'auto', background: '#fafafa' }}>
          <div style={{ maxWidth: 740, margin: '0 auto', padding: '36px 40px 100px' }}>
            {doc && (
              <>
                {/* Provenance header */}
                <div style={{ marginBottom: 24, padding: '12px 16px', border: `1px solid ${meta.border}`, borderRadius: 8, background: meta.bg, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11, fontFamily: MONO, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: meta.color }}>{meta.label}</span>
                  <span style={{ color: '#bbb', fontSize: 13 }}>·</span>
                  <span style={{ fontSize: 12, fontFamily: MONO, color: '#888' }}>{doc.path.split('/').pop()}</span>
                  {doc.status && (
                    <>
                      <span style={{ color: '#bbb', fontSize: 13 }}>·</span>
                      <span style={{ fontSize: 11, fontFamily: MONO, color: '#888' }}>{doc.status}</span>
                    </>
                  )}
                  <span style={{ flex: 1 }} />
                  {backStack.length > 0 && (
                    <button onClick={handleBack} style={{ fontSize: 12, fontFamily: SANS, color: '#2563eb', background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)', borderRadius: 4, padding: '3px 10px', cursor: 'pointer' }}>
                      ← Back
                    </button>
                  )}
                </div>

                {/* Doc header */}
                <div style={{ marginBottom: 28, paddingBottom: 20, borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                  <h1 style={{ fontFamily: SANS, fontSize: 'clamp(22px, 2.8vw, 32px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#0a0a0a', margin: '0 0 10px' }}>
                    {doc.title}
                  </h1>
                  {doc.summary && <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.6, color: '#555', margin: 0 }}>{doc.summary}</p>}

                  {/* Meta strip */}
                  <div style={{ display: 'flex', gap: 16, marginTop: 14, flexWrap: 'wrap' }}>
                    {[
                      [`${Math.max(1, Math.round(doc.wordCount / 220))} min read`, '#888'],
                      [`${doc.wordCount.toLocaleString()} words`, '#888'],
                      [`${doc.headings.length} sections`, '#888'],
                    ].map(([label, color], i) => (
                      <span key={i} style={{ fontSize: 11, fontFamily: MONO, color: color as string, letterSpacing: '0.04em' }}>{label}</span>
                    ))}
                  </div>
                </div>

                <DocBody blocks={blocks} onNavigate={handleNavigate} />
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
