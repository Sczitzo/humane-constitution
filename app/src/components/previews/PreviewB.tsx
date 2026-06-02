/**
 * Preview B — "The Study"
 * Point of view: focused minimalist reader, iA Writer meets Instapaper.
 *
 * Distinctive vs. current reader:
 *  - Two modes: Browse (split rail + reader) and Focus (full-width, zero chrome)
 *  - Body text in a system monospace-inspired stack (iA Writer Mono approximated
 *    with Courier New / monospace) — gives a typewriter quality to long-form prose
 *  - Navigation is command-palette-first: Cmd/Ctrl+K opens a fuzzy doc search
 *  - Ref chips are footnote-style: small superscript numbers that open an
 *    inline footnote area below the paragraph rather than navigating away
 *  - Deliberately sparse colour: near-black on near-white, one amber accent only
 *  - Reading path shown as a linear progress strip at the very top
 *  - Dark mode: true black #0a0a0a (OLED-friendly)
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { CorpusPayload, CorpusDoc } from '../../generated/corpus'
import { parseMarkdown, type MarkdownBlock } from '../../lib/markdown'
import { buildRefLookup } from '../RefChipShared'

const MONO_READING = '"Courier New", "Lucida Console", monospace'
const MONO_UI      = '"IBM Plex Mono", "Courier New", monospace'
const SANS         = 'Inter, "Helvetica Neue", sans-serif'
const AMBER        = '#c9890d'

function minuteRead(wc: number) { return Math.max(1, Math.round(wc / 220)) }

type FootnoteEntry = { key: string; text: string }

function Inline({ text, footnotes, onAddFootnote }: {
  text: string
  footnotes: FootnoteEntry[]
  onAddFootnote: (key: string, text: string) => number
}) {
  const combined = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\b(?:P-\d+|T-\d+|INV-\d+|FC-\d+|Annex\s+[A-Z]{1,3}\d*)\b)/g
  const parts: React.ReactNode[] = []
  let last = 0, m: RegExpExecArray | null
  combined.lastIndex = 0
  while ((m = combined.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    const tok = m[0]
    const key = `${m.index}`
    if (tok.startsWith('**')) {
      parts.push(<strong key={key} style={{ fontWeight: 700 }}>{tok.slice(2, -2)}</strong>)
    } else if (tok.startsWith('`')) {
      parts.push(<code key={key} style={{ fontFamily: MONO_UI, fontSize: '0.87em', background: 'rgba(180,130,30,0.1)', padding: '1px 4px', borderRadius: 2 }}>{tok.slice(1, -1)}</code>)
    } else if (tok.startsWith('*')) {
      parts.push(<em key={key}>{tok.slice(1, -1)}</em>)
    } else {
      const n = onAddFootnote(tok, tok)
      const existing = footnotes.find(f => f.key === tok)
      parts.push(
        <sup key={key} title={tok} style={{ fontSize: '0.68em', color: AMBER, fontFamily: MONO_UI, fontWeight: 700, cursor: 'default', verticalAlign: 'super' }}>
          [{n}]
        </sup>
      )
      void existing // prevent unused warning
    }
    last = m.index + tok.length
  }
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts}</>
}

function TableBlock({ lines }: { lines: string[] }) {
  const dataLines = lines.filter(l => l.trim().startsWith('|'))
  if (!dataLines.length) return null
  const parseRow = (l: string) => l.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim())
  const isSep = (l: string) => /^\|[\-| :]+\|$/.test(l.trim())
  const header = parseRow(dataLines[0])
  const body = dataLines.slice(1).filter(l => !isSep(l)).map(parseRow)
  const isKV = header.every(h => h === '') && body[0]?.length === 2
  return (
    <div style={{ margin: '16px 0', border: '1px solid rgba(180,130,30,0.25)', borderRadius: 4, overflow: 'hidden', fontFamily: MONO_READING, fontSize: 14 }}>
      {!isKV && header.some(h => h) && (
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(180,130,30,0.2)', background: 'rgba(180,130,30,0.06)' }}>
          {header.map((h, i) => <div key={i} style={{ flex: 1, padding: '6px 12px', fontWeight: 700, fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', color: AMBER }}>{h}</div>)}
        </div>
      )}
      {body.map((row, ri) => (
        <div key={ri} style={{ display: 'flex', borderBottom: ri < body.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
          {row.map((c, ci) => (
            <div key={ci} style={{ flex: 1, padding: '7px 12px', color: ci === 0 && isKV ? '#888' : 'inherit', fontWeight: ci === 0 && isKV ? 600 : 400, lineHeight: 1.5 }}>{c}</div>
          ))}
        </div>
      ))}
    </div>
  )
}

function DocBody({ blocks, isDark }: { blocks: MarkdownBlock[]; isDark: boolean }) {
  const footnotes = useRef<FootnoteEntry[]>([])
  footnotes.current = []
  const addFootnote = (key: string, text: string): number => {
    const existing = footnotes.current.find(f => f.key === key)
    if (existing) return footnotes.current.indexOf(existing) + 1
    footnotes.current.push({ key, text })
    return footnotes.current.length
  }

  const blockEls = blocks.map((block, i) => {
    if (block.type === 'heading') {
      const sizes = ['', '1.8rem', '1.4rem', '1.15rem', '1rem']
      return (
        <div key={i} data-heading-slug={block.slug} style={{ margin: `${block.level <= 2 ? 40 : 28}px 0 ${block.level <= 2 ? 14 : 8}px`, scrollMarginTop: 60 }}>
          <div style={{ fontFamily: MONO_UI, fontWeight: 700, fontSize: sizes[block.level] ?? '1rem', lineHeight: 1.25, letterSpacing: block.level === 1 ? '-0.02em' : '-0.01em' }}>
            {block.text}
          </div>
          {block.level === 2 && <div style={{ height: 1, background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', marginTop: 12 }} />}
        </div>
      )
    }
    if (block.type === 'paragraph') return (
      <p key={i} style={{ margin: '0 0 1.15em', lineHeight: 1.82 }}>
        <Inline text={block.text} footnotes={footnotes.current} onAddFootnote={addFootnote} />
      </p>
    )
    if (block.type === 'quote') return (
      <blockquote key={i} style={{ margin: '16px 0', borderLeft: `2px solid ${AMBER}`, paddingLeft: 16, opacity: 0.72, fontStyle: 'italic' }}>
        {block.text}
      </blockquote>
    )
    if (block.type === 'table') return <TableBlock key={i} lines={block.lines} />
    if (block.type === 'list') {
      const Tag = block.ordered ? 'ol' : 'ul'
      return (
        <Tag key={i} style={{ paddingLeft: 28, margin: '0 0 1.2em', lineHeight: 1.75 }}>
          {block.items.map((item, li) => <li key={li} style={{ marginBottom: '0.4em' }}>{item}</li>)}
        </Tag>
      )
    }
    if (block.type === 'code') return (
      <pre key={i} style={{ overflowX: 'auto', border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, borderRadius: 4, padding: '12px 16px', fontFamily: MONO_UI, fontSize: 12.5, lineHeight: 1.65, margin: '0 0 1.2em', background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        <code>{block.code}</code>
      </pre>
    )
    if (block.type === 'rule') return <hr key={i} style={{ border: 'none', borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, margin: '28px 0' }} />
    return null
  })

  const collectedFootnotes = [...footnotes.current]
  return (
    <>
      <div>{blockEls}</div>
      {collectedFootnotes.length > 0 && (
        <div style={{ marginTop: 48, paddingTop: 20, borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
          <p style={{ fontFamily: MONO_UI, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: AMBER, marginBottom: 14 }}>References</p>
          {collectedFootnotes.map((fn, i) => (
            <div key={fn.key} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'baseline' }}>
              <span style={{ fontFamily: MONO_UI, fontSize: 11, color: AMBER, fontWeight: 700, flexShrink: 0, width: 22 }}>[{i + 1}]</span>
              <span style={{ fontFamily: MONO_UI, fontSize: 13, opacity: 0.65 }}>{fn.text}</span>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export function PreviewB({ corpus }: { corpus: CorpusPayload }) {
  const firstDoc = corpus.docs.find(d => d.section === 'constitution') ?? corpus.docs[0]
  const [selectedId, setSelectedId] = useState(firstDoc?.id ?? '')
  const [focusMode, setFocusMode] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [cmdOpen, setCmdOpen] = useState(false)
  const [cmdQuery, setCmdQuery] = useState('')
  const [scrollPct, setScrollPct] = useState(0)
  const readerRef = useRef<HTMLDivElement>(null)
  const cmdRef = useRef<HTMLInputElement>(null)
  const refLookup = useMemo(() => buildRefLookup(corpus.docs), [corpus])
  void refLookup

  const doc = useMemo(() => corpus.docs.find(d => d.id === selectedId) ?? corpus.docs[0], [corpus, selectedId])
  const blocks = useMemo(() => doc ? parseMarkdown(doc) : [], [doc])

  const cmdResults = useMemo(() => {
    if (!cmdQuery.trim()) return corpus.docs.slice(0, 10)
    const q = cmdQuery.toLowerCase()
    return corpus.docs.filter(d => d.title.toLowerCase().includes(q) || d.path.toLowerCase().includes(q)).slice(0, 8)
  }, [corpus, cmdQuery])

  useEffect(() => {
    const el = readerRef.current
    if (!el) return
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight
      setScrollPct(max > 0 ? el.scrollTop / max : 0)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [doc?.id])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setCmdOpen(v => !v) }
      if (e.key === 'Escape') setCmdOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (cmdOpen) { setCmdQuery(''); setTimeout(() => cmdRef.current?.focus(), 50) }
  }, [cmdOpen])

  const selectDoc = useCallback((id: string) => {
    setSelectedId(id); setCmdOpen(false)
    if (readerRef.current) readerRef.current.scrollTop = 0
  }, [])

  const bg  = isDark ? '#0a0a0a' : '#f8f7f4'
  const ink = isDark ? '#e8e5df' : '#1a1714'
  const subtle = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
  const navBg  = isDark ? '#111' : '#f0eee9'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: bg, color: ink, fontFamily: MONO_READING, fontSize: 16, overflow: 'hidden', transition: 'background 0.25s, color 0.25s' }}>
      {/* Progress line */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 1.5, background: 'transparent', zIndex: 100, pointerEvents: 'none' }}>
        <div style={{ height: '100%', background: AMBER, width: `${scrollPct * 100}%`, transition: 'width 0.1s linear' }} />
      </div>

      {!focusMode && (
        <header style={{ borderBottom: `1px solid ${subtle}`, padding: '0 20px', height: 46, display: 'flex', alignItems: 'center', gap: 14, background: navBg, flexShrink: 0, zIndex: 50 }}>
          <span style={{ fontFamily: MONO_UI, fontWeight: 700, fontSize: 13, letterSpacing: '0.02em' }}>humane-constitution</span>
          <span style={{ flex: 1 }} />
          <button onClick={() => setCmdOpen(true)} style={{ fontFamily: MONO_UI, fontSize: 12, color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', background: subtle, border: 'none', borderRadius: 4, padding: '4px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>Search docs</span>
            <span style={{ fontSize: 10, opacity: 0.6, letterSpacing: '0.05em' }}>⌘K</span>
          </button>
          <button onClick={() => setFocusMode(true)} title="Focus mode" style={{ fontFamily: MONO_UI, fontSize: 11, color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)', background: 'none', border: `1px solid ${subtle}`, borderRadius: 4, padding: '4px 10px', cursor: 'pointer' }}>focus</button>
          <button onClick={() => setIsDark(v => !v)} style={{ fontFamily: MONO_UI, fontSize: 11, color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)', background: 'none', border: `1px solid ${subtle}`, borderRadius: 4, padding: '4px 10px', cursor: 'pointer' }}>
            {isDark ? 'light' : 'dark'}
          </button>
          <span style={{ fontSize: 11, fontFamily: MONO_UI, color: isDark ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.28)', letterSpacing: '0.04em' }}>Preview B · The Study</span>
          <a href="/" style={{ fontSize: 11, color: AMBER, textDecoration: 'none', fontFamily: MONO_UI }}>← back</a>
        </header>
      )}

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {!focusMode && (
          <nav style={{ width: 200, borderRight: `1px solid ${subtle}`, display: 'flex', flexDirection: 'column', flexShrink: 0, background: navBg, overflow: 'hidden' }}>
            <div style={{ overflowY: 'auto', flex: 1, padding: '8px 0' }}>
              {corpus.docs.slice(0, 40).map(d => (
                <button key={d.id} onClick={() => selectDoc(d.id)}
                  style={{ display: 'block', width: '100%', textAlign: 'left', padding: '6px 14px', border: 'none', cursor: 'pointer', fontSize: 12, fontFamily: MONO_UI, background: d.id === selectedId ? `rgba(201,137,13,0.12)` : 'transparent', color: d.id === selectedId ? AMBER : (isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)'), borderLeft: d.id === selectedId ? `2px solid ${AMBER}` : '2px solid transparent', lineHeight: 1.4, transition: 'all 0.1s', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {d.title}
                </button>
              ))}
            </div>
          </nav>
        )}

        <main ref={readerRef} style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
          {focusMode && (
            <div style={{ position: 'fixed', top: 12, right: 20, zIndex: 80, display: 'flex', gap: 8 }}>
              <button onClick={() => setCmdOpen(true)} style={{ fontFamily: MONO_UI, fontSize: 11, color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)', background: 'none', border: `1px solid ${subtle}`, borderRadius: 4, padding: '4px 10px', cursor: 'pointer' }}>⌘K</button>
              <button onClick={() => setFocusMode(false)} style={{ fontFamily: MONO_UI, fontSize: 11, color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)', background: 'none', border: `1px solid ${subtle}`, borderRadius: 4, padding: '4px 10px', cursor: 'pointer' }}>exit focus</button>
              <button onClick={() => setIsDark(v => !v)} style={{ fontFamily: MONO_UI, fontSize: 11, color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)', background: 'none', border: `1px solid ${subtle}`, borderRadius: 4, padding: '4px 10px', cursor: 'pointer' }}>{isDark ? '☀' : '☾'}</button>
            </div>
          )}

          <div style={{ maxWidth: 620, margin: '0 auto', padding: focusMode ? '80px 40px 120px' : '52px 48px 120px' }}>
            {doc && (
              <>
                <div style={{ marginBottom: 36, paddingBottom: 24, borderBottom: `1px solid ${subtle}` }}>
                  <p style={{ fontSize: 10, fontFamily: MONO_UI, letterSpacing: '0.14em', textTransform: 'uppercase', color: AMBER, marginBottom: 12, opacity: 0.8 }}>
                    {doc.section} · {minuteRead(doc.wordCount)} min
                  </p>
                  <h1 style={{ fontFamily: MONO_UI, fontSize: 'clamp(20px, 2.8vw, 30px)', fontWeight: 700, lineHeight: 1.25, letterSpacing: '-0.02em', margin: '0 0 12px' }}>{doc.title}</h1>
                  {doc.summary && <p style={{ fontFamily: MONO_READING, fontSize: 15, lineHeight: 1.72, opacity: 0.6, fontStyle: 'italic', margin: 0 }}>{doc.summary}</p>}
                </div>
                <DocBody blocks={blocks} isDark={isDark} />
              </>
            )}
          </div>
        </main>
      </div>

      {/* Command palette */}
      {cmdOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 400, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '18vh' }} onClick={() => setCmdOpen(false)}>
          <div style={{ width: 520, background: isDark ? '#1a1a1a' : '#fff', border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`, borderRadius: 10, boxShadow: '0 20px 60px rgba(0,0,0,0.4)', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '12px 16px', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: MONO_UI, fontSize: 14, opacity: 0.35 }}>›</span>
              <input ref={cmdRef} value={cmdQuery} onChange={e => setCmdQuery(e.target.value)}
                placeholder="Search documents…"
                style={{ flex: 1, border: 'none', background: 'none', outline: 'none', fontFamily: MONO_UI, fontSize: 14, color: isDark ? '#e8e5df' : '#1a1714' }} />
              <span style={{ fontFamily: MONO_UI, fontSize: 10, opacity: 0.3, letterSpacing: '0.06em' }}>ESC to close</span>
            </div>
            {cmdResults.map(d => (
              <button key={d.id} onClick={() => selectDoc(d.id)}
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px', border: 'none', cursor: 'pointer', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`, background: d.id === selectedId ? (isDark ? 'rgba(201,137,13,0.15)' : 'rgba(201,137,13,0.08)') : 'transparent', color: isDark ? '#e8e5df' : '#1a1714' }}>
                <div style={{ fontFamily: MONO_UI, fontSize: 13, fontWeight: d.id === selectedId ? 600 : 400, marginBottom: 2 }}>{d.title}</div>
                <div style={{ fontFamily: MONO_UI, fontSize: 11, opacity: 0.4 }}>{d.section} · {minuteRead(d.wordCount)} min</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
