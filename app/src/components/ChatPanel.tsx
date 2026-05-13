import { useEffect, useRef } from 'react'
import type { CorpusDoc } from '../generated/corpus'
import { useAIWorker } from '../hooks/useAIWorker'

// ── Keyword scorer ────────────────────────────────────────────────────────────

function scoreDoc(doc: CorpusDoc, terms: string[]): number {
  let score = 0
  const titleLower = doc.title.toLowerCase()
  const summaryLower = doc.summary.toLowerCase()

  for (const term of terms) {
    if (titleLower === term) score += 10
    else if (titleLower.startsWith(term)) score += 5
    else if (titleLower.includes(term)) score += 4

    if (summaryLower.includes(term)) score += 3

    for (const h of doc.headings) {
      if (h.text.toLowerCase().includes(term)) score += 4
    }
  }

  if (doc.section === 'constitution' || doc.section === 'founding_order') {
    score *= 1.2
  }

  return score
}

function getTopDocs(allDocs: CorpusDoc[], query: string, n = 2): CorpusDoc[] {
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter(t => t.length > 2)

  if (terms.length === 0) return allDocs.slice(0, n)

  const scored = allDocs.map(doc => ({ doc, score: scoreDoc(doc, terms) }))
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, n).map(s => s.doc)
}

function buildContext(docs: CorpusDoc[]): string {
  return docs
    .map(d => {
      const headings = d.headings.map(h => `  slug: ${h.slug} — ${h.text}`).join('\n')
      const body = d.content.length > 2000 ? d.content.slice(0, 2000) + '\n…[truncated]' : d.content
      return `**${d.id}** — ${d.title}\n${d.summary}\nHeadings:\n${headings}\n\nContent:\n${body}`
    })
    .join('\n\n---\n\n')
}

// ── Markdown renderer ─────────────────────────────────────────────────────────

function renderInline(
  text: string,
  allDocIds: Set<string>,
  onNavigate: (docId: string, slug?: string) => void,
  baseKey: number,
): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g
  let lastIndex = 0
  let match
  let k = baseKey

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<span key={k++}>{text.slice(lastIndex, match.index)}</span>)
    }

    if (match[1] !== undefined) {
      const linkText = match[1]
      const target = match[2]

      if (target.startsWith('http')) {
        parts.push(
          <a key={k++} href={target} target="_blank" rel="noopener noreferrer" className="chat-link">
            {linkText}
          </a>,
        )
      } else {
        const [docId, slug] = target.split('#')
        if (allDocIds.has(docId)) {
          parts.push(
            <button
              key={k++}
              type="button"
              className="chat-citation"
              onClick={() => onNavigate(docId, slug)}
            >
              {linkText}
            </button>,
          )
        } else {
          parts.push(
            <span key={k++} className="chat-citation-invalid">
              {linkText}
            </span>,
          )
        }
      }
    } else if (match[3] !== undefined) {
      parts.push(<strong key={k++}>{match[3]}</strong>)
    }

    lastIndex = pattern.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push(<span key={k++}>{text.slice(lastIndex)}</span>)
  }

  return parts
}

function renderMarkdown(
  text: string,
  allDocIds: Set<string>,
  onNavigate: (docId: string, slug?: string) => void,
): React.ReactNode[] {
  const lines = text.split('\n')
  const nodes: React.ReactNode[] = []
  let key = 0
  const listBuffer: React.ReactNode[] = []

  function flushList() {
    if (listBuffer.length > 0) {
      nodes.push(<ul key={key++} className="chat-ul">{listBuffer}</ul>)
      listBuffer.length = 0
    }
  }

  for (const line of lines) {
    if (line.startsWith('## ')) {
      flushList()
      nodes.push(<h2 key={key++} className="chat-h2">{line.slice(3)}</h2>)
    } else if (line.startsWith('### ')) {
      flushList()
      nodes.push(<h3 key={key++} className="chat-h3">{line.slice(4)}</h3>)
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      listBuffer.push(
        <li key={key++} className="chat-li">
          {renderInline(line.slice(2), allDocIds, onNavigate, key)}
        </li>,
      )
      key += 100
    } else if (line.trim() === '') {
      flushList()
      nodes.push(<br key={key++} />)
    } else {
      flushList()
      nodes.push(
        <p key={key++} className="chat-p">
          {renderInline(line, allDocIds, onNavigate, key)}
        </p>,
      )
      key += 100
    }
  }

  flushList()

  return nodes
}

// ── ChatPanel ─────────────────────────────────────────────────────────────────

interface ChatPanelProps {
  isOpen: boolean
  onClose: () => void
  allDocs: CorpusDoc[]
  onNavigate: (docId: string, slug?: string) => void
  isDark: boolean
}

export function ChatPanel({ isOpen, onClose, allDocs, onNavigate, isDark }: ChatPanelProps) {
  const { status, downloadProgress, webgpuAvailable, isDesktopBrowser, messages, streamingOutput, error, generate, abort, clearHistory } = useAIWorker()
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const allDocIds = new Set(allDocs.map(d => d.id))
  const isGenerating = status === 'generating'

  // Build display list — append in-progress assistant turn while streaming
  const displayMessages = isGenerating && streamingOutput
    ? [...messages, { role: 'assistant' as const, text: streamingOutput }]
    : messages

  // Focus on open
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 80)
  }, [isOpen])

  // Scroll to bottom as tokens stream in
  useEffect(() => {
    if (streamingOutput) outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [streamingOutput])

  // Escape closes
  useEffect(() => {
    if (!isOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  // Focus trap
  useEffect(() => {
    if (!isOpen || !panelRef.current) return
    const focusables = panelRef.current.querySelectorAll<HTMLElement>(
      'button, input, [tabindex]:not([tabindex="-1"])',
    )
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    function trap(e: KeyboardEvent) {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus() }
      }
    }
    window.addEventListener('keydown', trap)
    return () => window.removeEventListener('keydown', trap)
  }, [isOpen])

  function handleNavigate(docId: string, slug?: string) {
    onNavigate(docId, slug)
    onClose()
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const input = inputRef.current
    if (!input) return
    const query = input.value.trim()
    if (!query || isGenerating || status === 'loading') return

    const matched = getTopDocs(allDocs, query)
    const context = buildContext(matched)
    input.value = ''
    generate(query, context)
  }

  const isTauri =
    typeof window !== 'undefined' &&
    !!(window as unknown as Record<string, unknown>).__TAURI__

  const showUnsupported = isTauri || !isDesktopBrowser

  const bg = isDark ? '#161210' : '#fdf9f2'
  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.12)'
  const headerBg = isDark ? '#1c1714' : '#f5ede0'
  const textColor = isDark ? '#e8dfd4' : '#2a2018'
  const textSoft = isDark ? 'rgba(232,223,212,0.55)' : 'rgba(42,32,24,0.55)'

  const isReady = status === 'ready'
  const isLoading = status === 'loading'
  const inputDisabled = status === 'loading' || status === 'generating'

  return (
    <>
      {isOpen && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed', inset: 0, zIndex: 9990,
            background: 'rgba(0,0,0,0.35)',
            backdropFilter: 'blur(2px)',
          }}
          onClick={onClose}
        />
      )}

      <div
        ref={panelRef}
        role="dialog"
        aria-label="Corpus AI assistant"
        aria-modal="true"
        style={{
          position: 'fixed',
          top: 0, right: 0, bottom: 0,
          width: 'min(420px, 100vw)',
          zIndex: 9991,
          display: 'flex',
          flexDirection: 'column',
          background: bg,
          borderLeft: `1px solid ${border}`,
          boxShadow: '-4px 0 32px rgba(0,0,0,0.22)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          color: textColor,
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: `1px solid ${border}`, background: headerBg, flexShrink: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Ask the Corpus</span>
            <span style={{ fontSize: 11, color: textSoft }}>
              {isLoading
                ? `Calibrating… ${downloadProgress}%`
                : isReady
                  ? `Gemma 4 2B · ${webgpuAvailable ? 'WebGPU' : 'WASM'} · local`
                  : status === 'error'
                    ? 'Model error'
                    : 'Initializing…'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {messages.length > 0 && (
              <button
                type="button"
                onClick={clearHistory}
                style={{
                  fontSize: 11, padding: '3px 8px', borderRadius: 5,
                  background: 'transparent',
                  border: `1px solid ${border}`,
                  color: textSoft, cursor: 'pointer',
                }}
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 6, background: 'transparent', border: 'none', cursor: 'pointer', color: textSoft }}
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" width={16} height={16}>
                <path strokeLinecap="round" d="M5 5l10 10M15 5L5 15" />
              </svg>
            </button>
          </div>
        </div>

        {/* Download progress bar */}
        {isLoading && (
          <div style={{ height: 3, background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)', flexShrink: 0 }}>
            <div
              style={{
                height: '100%',
                width: `${downloadProgress}%`,
                background: 'var(--accent, #9b7b3a)',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        )}

        {showUnsupported ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: textSoft, maxWidth: 280, lineHeight: 1.6 }}>
              {isTauri
                ? <>AI chat is available in the web version at{' '}<a href="https://humane-constitution.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>humane-constitution.vercel.app</a></>
                : 'The AI assistant requires a desktop browser — it runs a 2B parameter model locally and needs the memory available on a desktop device.'}
            </p>
          </div>
        ) : (
          <>
            {/* Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>

              {!webgpuAvailable && isReady && (
                <div style={{ fontSize: 12, color: textSoft, background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)', borderRadius: 8, padding: '8px 12px', lineHeight: 1.5 }}>
                  WebGPU unavailable on this device — running on WASM. Responses will be slower.
                </div>
              )}

              {isLoading && messages.length === 0 && (
                <div style={{ color: textSoft, fontSize: 13, lineHeight: 1.7 }}>
                  <p style={{ marginBottom: 6 }}>Downloading Gemma 4 2B weights — {downloadProgress}% complete.</p>
                  <p style={{ fontSize: 12 }}>This happens once. The model is cached locally after download.</p>
                </div>
              )}

              {!isLoading && messages.length === 0 && !error && (
                <div style={{ color: textSoft, fontSize: 13, lineHeight: 1.7, paddingTop: 4 }}>
                  <p style={{ marginBottom: 10 }}>Ask anything about the Humane Constitution corpus.</p>
                  <p style={{ fontSize: 12, marginBottom: 6 }}>Suggested questions:</p>
                  <ul style={{ paddingLeft: 16, fontSize: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <li>What is the Flow instrument?</li>
                    <li>How are threats and patches linked?</li>
                    <li>What protections exist for AI autonomy?</li>
                  </ul>
                </div>
              )}

              {displayMessages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  {msg.role === 'user' ? (
                    <div style={{
                      maxWidth: '85%',
                      background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                      borderRadius: '12px 12px 2px 12px',
                      padding: '8px 12px',
                      fontSize: 13,
                      lineHeight: 1.5,
                      color: textColor,
                    }}>
                      {msg.text}
                    </div>
                  ) : (
                    <div className="chat-response" style={{ fontSize: 13, lineHeight: 1.65, color: textColor, width: '100%' }}>
                      {renderMarkdown(msg.text, allDocIds, handleNavigate)}
                      {isGenerating && i === displayMessages.length - 1 && (
                        <span className="chat-thinking"> ▋</span>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {error && (
                <div style={{ background: 'rgba(180,50,50,0.12)', border: '1px solid rgba(180,50,50,0.25)', borderRadius: 8, padding: '10px 12px', fontSize: 12, color: isDark ? '#f08080' : '#8b2020', lineHeight: 1.55 }}>
                  {error}
                </div>
              )}

              <div ref={outputRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', gap: 8, padding: '12px 16px', borderTop: `1px solid ${border}`, flexShrink: 0, background: headerBg }}
            >
              <input
                ref={inputRef}
                disabled={inputDisabled}
                placeholder={isLoading ? `Calibrating… ${downloadProgress}%` : 'Ask about the corpus…'}
                style={{ flex: 1, fontSize: 13, padding: '8px 12px', borderRadius: 8, border: `1px solid ${border}`, background: bg, color: textColor, outline: 'none', opacity: inputDisabled ? 0.6 : 1 }}
              />
              {isGenerating ? (
                <button
                  type="button"
                  onClick={abort}
                  style={{ fontSize: 13, padding: '8px 14px', borderRadius: 8, background: isDark ? '#8b2020' : '#c0392b', color: '#fff', border: 'none', cursor: 'pointer', transition: 'background 0.15s' }}
                >
                  Stop
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={inputDisabled}
                  style={{ fontSize: 13, padding: '8px 14px', borderRadius: 8, background: inputDisabled ? 'rgba(155,123,58,0.35)' : 'var(--accent, #9b7b3a)', color: '#fff', border: 'none', cursor: inputDisabled ? 'default' : 'pointer', transition: 'background 0.15s' }}
                >
                  Ask
                </button>
              )}
            </form>
          </>
        )}
      </div>
    </>
  )
}
