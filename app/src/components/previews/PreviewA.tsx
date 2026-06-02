/**
 * Preview A — "The Scholar"
 * Point of view: editorial / print-inspired, Stripe Press meets LRB.
 *
 * Distinctive vs. current reader:
 *  - Body prose in Georgia (proper reading serif, not Inter)
 *  - Ref IDs as inline monospace chips; click opens a sidenote popover in-place
 *  - Three-panel: section nav | reading column (max 680px) | floating outline
 *  - Reading progress bar along top of page
 *  - Outline highlights active heading as you scroll
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { CorpusPayload, CorpusDoc } from '../../generated/corpus'
import { parseMarkdown, type MarkdownBlock } from '../../lib/markdown'
import { buildRefLookup } from '../RefChipShared'

const SERIF = 'Georgia, "Times New Roman", serif'
const MONO  = '"IBM Plex Mono", "Courier New", monospace'
const SANS  = 'Inter, "Helvetica Neue", sans-serif'

type Section = 'constitution' | 'annexes' | 'registry'

function sectionFor(doc: CorpusDoc): Section {
  if (doc.section === 'constitution' || doc.section === 'founding_order') return 'constitution'
  if (doc.section === 'annex') return 'annexes'
  return 'registry'
}

function minuteRead(wc: number) { return Math.max(1, Math.round(wc / 220)) }

function Inline({ text, onRef }: { text: string; onRef: (key: string, e: React.MouseEvent) => void }) {
  const combined = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\b(?:P-\d+|T-\d+|INV-\d+|FC-\d+|Annex\s+[A-Z]{1,3}\d*)\b)/g
  const parts: React.ReactNode[] = []
  let last = 0, m: RegExpExecArray | null
  combined.lastIndex = 0
  while ((m = combined.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    const tok = m[0]
    const key = `${m.index}`
    if (tok.startsWith('**')) {
      parts.push(<strong key={key} style={{ fontWeight: 700, color: '#0f0e0c' }}>{tok.slice(2, -2)}</strong>)
    } else if (tok.startsWith('`')) {
      parts.push(<code key={key} style={{ fontFamily: MONO, fontSize: '0.87em', background: 'rgba(0,0,0,0.06)', padding: '1px 5px', borderRadius: 3 }}>{tok.slice(1, -1)}</code>)
    } else if (tok.startsWith('*')) {
      parts.push(<em key={key} style={{ color: '#5e584f' }}>{tok.slice(1, -1)}</em>)
    } else {
      parts.push(
        <button key={key} onClick={e => onRef(tok, e)}
          style={{ display: 'inline', border: 'none', background: 'rgba(159,108,49,0.13)', color: '#7a4e18', cursor: 'pointer', fontFamily: MONO, fontSize: '0.78em', padding: '1px 6px', borderRadius: 3, fontWeight: 600, letterSpacing: '0.02em', verticalAlign: 'baseline' }}>
          {tok}
        </button>
      )
    }
    last = m.index + tok.length
  }
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts}</>
}

function TableBlock({ lines, onRef }: { lines: string[]; onRef: (key: string, e: React.MouseEvent) => void }) {
  const dataLines = lines.filter(l => l.trim().startsWith('|'))
  if (!dataLines.length) return null
  const parseRow = (l: string) => l.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim())
  const isSep = (l: string) => /^\|[\-| :]+\|$/.test(l.trim())
  const header = parseRow(dataLines[0])
  const body = dataLines.slice(1).filter(l => !isSep(l)).map(parseRow)
  const isKV = body.length > 0 && body[0].length === 2
  return (
    <div style={{ margin: '20px 0', border: '1px solid #d4c9b8', borderRadius: 10, overflow: 'hidden', background: '#f5f1eb' }}>
      {!isKV && (
        <div style={{ background: '#ede8e0', borderBottom: '1px solid #d4c9b8', display: 'flex' }}>
          {header.map((h, i) => (
            <div key={i} style={{ flex: 1, padding: '7px 14px', fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7a7268' }}>
              <Inline text={h} onRef={onRef} />
            </div>
          ))}
        </div>
      )}
      {body.map((row, ri) => (
        <div key={ri} style={{ display: 'flex', borderBottom: ri < body.length - 1 ? '1px solid #e0d8cc' : 'none' }}>
          {row.map((c, ci) => (
            <div key={ci} style={{ flex: 1, padding: '8px 14px', fontFamily: isKV && ci === 0 ? MONO : SERIF, fontSize: isKV && ci === 0 ? 12 : 13.5, fontWeight: isKV && ci === 0 ? 600 : 400, color: isKV && ci === 0 ? '#5e584f' : '#2a2722', lineHeight: 1.55 }}>
              <Inline text={c} onRef={onRef} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function DocBody({ blocks, onRef }: { blocks: MarkdownBlock[]; onRef: (key: string, e: React.MouseEvent) => void }) {
  return (
    <div style={{ fontFamily: SERIF, fontSize: 17, lineHeight: 1.78, color: '#2a2722' }}>
      {blocks.map((block, i) => {
        if (block.type === 'heading') {
          const sizes = ['', '2rem', '1.55rem', '1.25rem', '1.05rem']
          return (
            <div key={i} data-heading-slug={block.slug} style={{ margin: `${block.level <= 2 ? 44 : 28}px 0 ${block.level <= 2 ? 14 : 8}px`, scrollMarginTop: 72 }}>
              {block.level === 2 && <div style={{ height: 1, background: '#e0d8cc', marginBottom: 18 }} />}
              <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: sizes[block.level] ?? '1rem', letterSpacing: '-0.01em', lineHeight: 1.2, color: '#0f0e0c' }}>
                <Inline text={block.text} onRef={onRef} />
              </div>
            </div>
          )
        }
        if (block.type === 'paragraph') return <p key={i} style={{ margin: '0 0 1.1em' }}><Inline text={block.text} onRef={onRef} /></p>
        if (block.type === 'quote') return (
          <blockquote key={i} style={{ margin: '18px 0', borderLeft: '3px solid rgba(159,108,49,0.4)', paddingLeft: 18, color: '#5e584f', fontStyle: 'italic' }}>
            <Inline text={block.text} onRef={onRef} />
          </blockquote>
        )
        if (block.type === 'table') return <TableBlock key={i} lines={block.lines} onRef={onRef} />
        if (block.type === 'list') {
          const Tag = block.ordered ? 'ol' : 'ul'
          return (
            <Tag key={i} style={{ paddingLeft: 28, margin: '0 0 1.2em' }}>
              {block.items.map((item, li) => (
                <li key={li} style={{ marginBottom: '0.45em', lineHeight: 1.7 }}><Inline text={item} onRef={onRef} /></li>
              ))}
            </Tag>
          )
        }
        if (block.type === 'code') return (
          <pre key={i} style={{ overflowX: 'auto', border: '1px solid #e0d8cc', borderRadius: 8, background: 'rgba(0,0,0,0.03)', padding: '14px 18px', fontFamily: MONO, fontSize: 13, lineHeight: 1.65, margin: '0 0 1.2em', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            <code>{block.code}</code>
          </pre>
        )
        if (block.type === 'rule') return <hr key={i} style={{ border: 'none', borderTop: '1px solid #e0d8cc', margin: '32px 0' }} />
        return null
      })}
    </div>
  )
}

export function PreviewA({ corpus }: { corpus: CorpusPayload }) {
  const firstDoc = corpus.docs.find(d => d.section === 'constitution') ?? corpus.docs[0]
  const [selectedId, setSelectedId] = useState(firstDoc?.id ?? '')
  const [sectionFilter, setSectionFilter] = useState<Section>('constitution')
  const [scrollPct, setScrollPct] = useState(0)
  const [activeSlug, setActiveSlug] = useState('')
  const [sidenote, setSidenote] = useState<{ key: string; x: number; y: number } | null>(null)
  const readerRef = useRef<HTMLDivElement>(null)
  const refLookup = useMemo(() => buildRefLookup(corpus.docs), [corpus])

  const filteredDocs = useMemo(() => corpus.docs.filter(d => sectionFor(d) === sectionFilter), [corpus, sectionFilter])
  const doc = useMemo(() => corpus.docs.find(d => d.id === selectedId) ?? filteredDocs[0], [corpus, selectedId, filteredDocs])
  const blocks = useMemo(() => doc ? parseMarkdown(doc) : [], [doc])

  useEffect(() => {
    const el = readerRef.current
    if (!el) return
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight
      setScrollPct(max > 0 ? el.scrollTop / max : 0)
      const top = el.getBoundingClientRect().top
      let cur = ''
      el.querySelectorAll<HTMLElement>('[data-heading-slug]').forEach(h => {
        if (h.getBoundingClientRect().top - top < el.clientHeight * 0.4) cur = h.dataset.headingSlug ?? ''
      })
      setActiveSlug(cur)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [doc?.id])

  const selectDoc = useCallback((id: string) => {
    setSelectedId(id); setSidenote(null)
    if (readerRef.current) readerRef.current.scrollTop = 0
  }, [])

  const handleRef = useCallback((key: string, e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    const resolved = refLookup.get(key)
    if (resolved?.type === 'doc') { selectDoc(resolved.docId); return }
    setSidenote(prev => prev?.key === key ? null : { key, x: rect.left, y: rect.bottom + 6 })
  }, [refLookup, selectDoc])

  const sectionLabel = (s: Section) => s === 'registry' ? 'Registries' : s.charAt(0).toUpperCase() + s.slice(1)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#faf8f4', fontFamily: SANS, overflow: 'hidden' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, zIndex: 100, background: '#e8e0d3', pointerEvents: 'none' }}>
        <div style={{ height: '100%', background: '#9f6c31', width: `${scrollPct * 100}%`, transition: 'width 0.1s linear' }} />
      </div>

      <header style={{ borderBottom: '1px solid #e0d8cc', padding: '0 28px', height: 50, display: 'flex', alignItems: 'center', gap: 20, background: '#faf8f4', flexShrink: 0, zIndex: 50 }}>
        <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 16, letterSpacing: '-0.01em', color: '#1a1714' }}>Humane Constitution</span>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 11, fontFamily: MONO, color: '#b0a898', letterSpacing: '0.06em' }}>Preview A · The Scholar</span>
        <a href="/" style={{ fontSize: 12, color: '#9f6c31', textDecoration: 'none', fontFamily: SANS, padding: '4px 12px', border: '1px solid rgba(159,108,49,0.35)', borderRadius: 5 }}>← back</a>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <nav style={{ width: 228, borderRight: '1px solid #e0d8cc', display: 'flex', flexDirection: 'column', flexShrink: 0, background: '#f5f1eb', overflow: 'hidden' }}>
          <div style={{ padding: '10px 10px 8px', borderBottom: '1px solid #e0d8cc', display: 'flex', gap: 3 }}>
            {(['constitution','annexes','registry'] as Section[]).map(s => (
              <button key={s} onClick={() => { setSectionFilter(s); selectDoc(corpus.docs.find(d => sectionFor(d) === s)?.id ?? '') }}
                style={{ flex: 1, padding: '5px 2px', borderRadius: 5, border: 'none', cursor: 'pointer', fontSize: 10.5, fontFamily: SANS, fontWeight: sectionFilter === s ? 600 : 400, background: sectionFilter === s ? 'rgba(159,108,49,0.14)' : 'transparent', color: sectionFilter === s ? '#9f6c31' : '#5e584f' }}>
                {sectionLabel(s)}
              </button>
            ))}
          </div>
          <div style={{ overflowY: 'auto', flex: 1, padding: '4px 0' }}>
            {filteredDocs.map(d => (
              <button key={d.id} onClick={() => selectDoc(d.id)}
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '7px 14px', border: 'none', cursor: 'pointer', fontSize: 12, fontFamily: SERIF, background: d.id === selectedId ? 'rgba(159,108,49,0.1)' : 'transparent', color: d.id === selectedId ? '#6b4420' : '#2a2722', borderLeft: d.id === selectedId ? '2px solid #9f6c31' : '2px solid transparent', lineHeight: 1.4, transition: 'all 0.1s' }}>
                {d.title}
              </button>
            ))}
          </div>
        </nav>

        <main ref={readerRef} style={{ flex: 1, overflowY: 'auto' }} onClick={() => setSidenote(null)}>
          <div style={{ maxWidth: 680, margin: '0 auto', padding: '52px 48px 120px' }}>
            {doc && (
              <>
                <div style={{ marginBottom: 32, paddingBottom: 26, borderBottom: '1px solid #e0d8cc' }}>
                  <p style={{ fontSize: 11, fontFamily: MONO, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9a9080', marginBottom: 10 }}>
                    {sectionLabel(sectionFor(doc))} · {minuteRead(doc.wordCount)} min read
                  </p>
                  <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(24px, 3.2vw, 36px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#0f0e0c', margin: '0 0 12px' }}>
                    {doc.title}
                  </h1>
                  {doc.summary && <p style={{ fontFamily: SERIF, fontSize: 17, lineHeight: 1.68, color: '#5e584f', fontStyle: 'italic', margin: 0 }}>{doc.summary}</p>}
                </div>
                <DocBody blocks={blocks} onRef={(key, e) => { e.stopPropagation(); handleRef(key, e) }} />
              </>
            )}
          </div>
        </main>

        {doc && doc.headings.length > 2 && (
          <aside style={{ width: 188, borderLeft: '1px solid #e0d8cc', overflowY: 'auto', padding: '18px 0', flexShrink: 0 }}>
            <p style={{ padding: '0 14px 10px', fontSize: 10, fontFamily: MONO, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#b0a898', borderBottom: '1px solid #e0d8cc', marginBottom: 6 }}>Contents</p>
            {doc.headings.map(h => (
              <button key={h.slug} onClick={() => readerRef.current?.querySelector<HTMLElement>(`[data-heading-slug="${h.slug}"]`)?.scrollIntoView({ behavior: 'smooth' })}
                style={{ display: 'block', width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer', padding: `4px ${h.level >= 3 ? 22 : h.level === 2 ? 17 : 14}px`, fontSize: 11.5, fontFamily: SERIF, lineHeight: 1.4, background: activeSlug === h.slug ? 'rgba(159,108,49,0.1)' : 'transparent', color: activeSlug === h.slug ? '#9f6c31' : '#6b6359', borderLeft: activeSlug === h.slug ? '2px solid #9f6c31' : '2px solid transparent', transition: 'all 0.12s' }}>
                {h.text}
              </button>
            ))}
          </aside>
        )}
      </div>

      {sidenote && (() => {
        const resolved = refLookup.get(sidenote.key)
        const refDoc = resolved?.type === 'doc' ? corpus.docs.find(d => d.id === resolved.docId) : null
        const refText = resolved?.type === 'heading' ? resolved.text : null
        return (
          <div onClick={e => e.stopPropagation()} style={{ position: 'fixed', top: Math.min(sidenote.y, window.innerHeight - 180), left: Math.min(sidenote.x, window.innerWidth - 290), width: 270, background: '#faf8f4', border: '1px solid #d4c9b8', borderRadius: 10, boxShadow: '0 8px 40px rgba(0,0,0,0.14)', padding: '14px 16px', zIndex: 300, fontFamily: SERIF }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontFamily: MONO, color: '#9f6c31', fontWeight: 700 }}>{sidenote.key}</span>
              <button onClick={() => setSidenote(null)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 18, color: '#b0a898', lineHeight: 1, padding: 0 }}>×</button>
            </div>
            <p style={{ fontSize: 13.5, color: '#2a2722', lineHeight: 1.58, margin: 0 }}>
              {refDoc ? <><strong style={{ display: 'block', marginBottom: 4 }}>{refDoc.title}</strong>{refDoc.summary ?? 'See document for details.'}</> : refText ? `Section: ${refText}` : `Reference: ${sidenote.key}`}
            </p>
            {refDoc && (
              <button onClick={() => selectDoc(refDoc.id)} style={{ marginTop: 10, display: 'block', width: '100%', background: 'rgba(159,108,49,0.1)', border: '1px solid rgba(159,108,49,0.25)', borderRadius: 6, padding: '6px 0', fontSize: 12, fontFamily: SANS, color: '#9f6c31', cursor: 'pointer', fontWeight: 600 }}>
                Open document →
              </button>
            )}
          </div>
        )
      })()}
    </div>
  )
}
