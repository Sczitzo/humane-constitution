import { useState, useEffect, useRef, useMemo } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, type UIMessage } from 'ai'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Plugin } from 'unified'
import type { Root, Text, Parent } from 'mdast'
import { visit } from 'unist-util-visit'
import type { CorpusPayload } from '../generated/corpus'
import { RefChip, RefNavContext, buildRefLookup } from './RefChipShared'

const transport = new DefaultChatTransport({ api: '/api/chat' })

const SUGGESTED = [
  'What is the Humane Constitution?',
  'How does demurrage work?',
  'What is Voice and how is it earned?',
  'Explain the Acceptance Protocol',
  'What threats does P-020 address?',
]

// Ref pattern: P-NNN, T-NNN, TR-NNN, PRD-NNN, INV-NNN, FC-NNN, Annex XX
const REF_PATTERN = /\b(P-\d{1,4}|T-\d{1,4}|TR-\d{1,4}|PRD-\d{1,4}|INV-\d{1,4}|FC-\d{1,4}|Annex\s+[A-Z]{1,3}\d*(?:\s+§[\w.\-]+)?)\b/g

/** Remark plugin: split text nodes containing ref patterns into inline-code nodes
 *  with a `ref:KEY` value that our custom code renderer can pick up. */
const remarkRefs: Plugin<[], Root> = () => (tree) => {
  visit(tree, 'text', (node: Text, index, parent: Parent | null) => {
    if (!parent || index == null) return
    const text = node.value
    REF_PATTERN.lastIndex = 0
    const parts: Array<{ type: 'text'; value: string } | { type: 'inlineCode'; value: string }> = []
    let last = 0
    let m: RegExpExecArray | null

    while ((m = REF_PATTERN.exec(text)) !== null) {
      if (m.index > last) parts.push({ type: 'text', value: text.slice(last, m.index) })
      parts.push({ type: 'inlineCode', value: `ref:${m[1]}` })
      last = m.index + m[0].length
    }
    if (last === 0) return // no matches
    if (last < text.length) parts.push({ type: 'text', value: text.slice(last) })

    parent.children.splice(index, 1, ...parts as never[])
    return index + parts.length // skip past inserted nodes
  })
}

interface ChatPanelProps {
  corpus: CorpusPayload | null
  onNavigateToDoc: (docId: string, slug?: string) => void
}

interface LinkRendererProps {
  href?: string
  children?: React.ReactNode
  sourceToDocId: Map<string, string>
  onNavigateToDoc: (docId: string, slug?: string) => void
}

function normalizeLinkHref(href: string): string {
  try {
    const url = new URL(href)
    if (url.hostname.includes('humane-constitution') || url.hostname === 'localhost') {
      return url.pathname.replace(/^\//, '')
    }
  } catch {
    // Not a full URL — use as-is, just strip hash fragment
  }
  return href.split('#')[0]
}

function LinkRenderer({ href, children, sourceToDocId, onNavigateToDoc }: LinkRendererProps) {
  if (href) {
    const normalized = normalizeLinkHref(href)
    const docId = sourceToDocId.get(normalized)
    if (docId) {
      return (
        <button
          onClick={() => onNavigateToDoc(docId)}
          className="text-accent underline underline-offset-2 hover:text-accent-deep cursor-pointer bg-transparent border-none p-0 font-[inherit] text-[inherit]"
        >
          {children}
        </button>
      )
    }
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent underline underline-offset-2 hover:text-accent-deep"
    >
      {children}
    </a>
  )
}

export function ChatPanel({ corpus, onNavigateToDoc }: ChatPanelProps) {
  const { messages, sendMessage, status, error } = useChat({ transport })
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const lastAssistantRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const isLoading = status === 'submitted' || status === 'streaming'
  const prevMessageCountRef = useRef(0)

  // Build source-path → docId lookup from corpus
  const sourceToDocId = useMemo(() => {
    const map = new Map<string, string>()
    if (!corpus) return map
    for (const doc of corpus.docs) {
      const source = doc.path.replace(/^docs\//, '')
      map.set(source, doc.id)
    }
    return map
  }, [corpus])

  // Build ref lookup for chips
  const refLookup = useMemo(() => buildRefLookup(corpus?.docs ?? []), [corpus])

  // RefNavContext value — stable reference via useMemo
  const refNavValue = useMemo(() => ({
    lookup: refLookup,
    onNavigate: onNavigateToDoc,
    isDark: false,
  }), [refLookup, onNavigateToDoc])

  useEffect(() => {
    const newMessage = messages.length > prevMessageCountRef.current
    prevMessageCountRef.current = messages.length
    const lastMsg = messages[messages.length - 1]
    if (newMessage && lastMsg?.role === 'assistant') {
      lastAssistantRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isLoading])

  function submit(text: string) {
    const trimmed = text.trim()
    if (!trimmed || isLoading) return
    sendMessage({ text: trimmed })
    setInput('')
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit(input)
    }
  }

  // Markdown components — defined inside render but stable refs via useMemo
  const mdComponents = useMemo(() => ({
    p: ({ children }: { children?: React.ReactNode }) => <p className="mb-2 last:mb-0">{children}</p>,
    strong: ({ children }: { children?: React.ReactNode }) => <strong className="font-semibold text-ink-strong">{children}</strong>,
    em: ({ children }: { children?: React.ReactNode }) => <em className="italic">{children}</em>,
    ul: ({ children }: { children?: React.ReactNode }) => <ul className="list-disc list-inside mb-2 space-y-0.5">{children}</ul>,
    ol: ({ children }: { children?: React.ReactNode }) => <ol className="list-decimal list-inside mb-2 space-y-0.5">{children}</ol>,
    li: ({ children }: { children?: React.ReactNode }) => <li>{children}</li>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    a: ({ href, children }: any) => (
      <LinkRenderer
        href={href}
        children={children}
        sourceToDocId={sourceToDocId}
        onNavigateToDoc={onNavigateToDoc}
      />
    ),
    code: ({ children, className }: { children?: React.ReactNode; className?: string }) => {
      // Block code
      if (className?.includes('language-')) {
        return <code className="block bg-paper border border-line rounded px-2 py-1.5 font-mono text-[10px] my-1.5 overflow-x-auto">{children}</code>
      }
      // Ref chip — injected by remarkRefs plugin
      const raw = typeof children === 'string' ? children : ''
      if (raw.startsWith('ref:')) {
        const refKey = raw.slice(4)
        return <RefChip refKey={refKey} display={refKey} />
      }
      return <code className="bg-paper border border-line rounded px-1 py-0.5 font-mono text-[10px]">{children}</code>
    },
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-2 border-accent pl-2 italic text-ink-soft my-2">{children}</blockquote>
    ),
    h1: ({ children }: { children?: React.ReactNode }) => <h1 className="font-semibold text-sm text-ink-strong mb-1">{children}</h1>,
    h2: ({ children }: { children?: React.ReactNode }) => <h2 className="font-semibold text-xs text-ink-strong mb-1">{children}</h2>,
    h3: ({ children }: { children?: React.ReactNode }) => <h3 className="font-medium text-xs text-ink mb-1">{children}</h3>,
  }), [sourceToDocId, onNavigateToDoc])

  return (
    <RefNavContext.Provider value={refNavValue}>
      <div className="flex flex-col h-full bg-paper rounded-xl border border-line overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-line flex items-center gap-2 bg-paper-strong shrink-0">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span className="text-xs font-medium text-ink-soft">Ask the Protocol</span>
        </div>

        {/* Message list */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 min-h-0">
          {messages.length === 0 && (
            <div className="flex flex-col items-center gap-5 mt-4 px-1">
              <p className="text-xs text-ink-soft text-center">
                Answers grounded in the constitution, annexes, and threat registry.
              </p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {SUGGESTED.map((q) => (
                  <button
                    key={q}
                    onClick={() => submit(q)}
                    className="text-[11px] px-2.5 py-1 rounded-full border border-line bg-paper-strong hover:bg-accent-soft hover:border-accent text-ink-soft hover:text-ink transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m: UIMessage, idx: number) => {
            const text = m.parts?.find((p) => p.type === 'text')?.text ?? ''
            const isUser = m.role === 'user'
            const isLastAssistant = !isUser && idx === messages.length - 1
            return (
              <div
                key={m.id}
                ref={isLastAssistant ? lastAssistantRef : undefined}
                className={`flex gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="shrink-0 w-6 h-6 rounded-full bg-accent-soft border border-accent/30 flex items-center justify-center mt-0.5">
                    <span className="text-accent text-[9px] font-bold">AI</span>
                  </div>
                )}
                <div className={isUser
                  ? 'max-w-[78%] rounded-2xl rounded-tr-sm px-3 py-2 text-xs bg-accent text-paper leading-relaxed'
                  : 'max-w-[90%] rounded-2xl rounded-tl-sm px-3 py-2.5 text-xs bg-paper-strong border border-line text-ink leading-relaxed'
                }>
                  {isUser ? text : (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm, remarkRefs]}
                      components={mdComponents}
                    >
                      {text}
                    </ReactMarkdown>
                  )}
                </div>
                {isUser && (
                  <div className="shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center mt-0.5">
                    <span className="text-paper text-[9px] font-bold">You</span>
                  </div>
                )}
              </div>
            )
          })}

          {isLoading && (
            <div className="flex gap-2 justify-start">
              <div className="shrink-0 w-6 h-6 rounded-full bg-accent-soft border border-accent/30 flex items-center justify-center">
                <span className="text-accent text-[9px] font-bold">AI</span>
              </div>
              <div className="rounded-2xl rounded-tl-sm px-3 py-2.5 bg-paper-strong border border-line">
                <span className="flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-ink-faint animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-ink-faint animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-ink-faint animate-bounce [animation-delay:300ms]" />
                </span>
              </div>
            </div>
          )}

          {error && (
            <p className="text-center text-[11px] text-red-500 px-3">{error.message}</p>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-line bg-paper px-3 py-2.5 shrink-0">
          <div className="flex items-end gap-2 rounded-xl border border-line bg-paper-strong px-2.5 py-1.5 focus-within:border-accent/60 focus-within:ring-1 focus-within:ring-accent/20 transition-all">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
                e.target.style.height = 'auto'
                e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px'
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask about the protocol…"
              disabled={isLoading}
              className="flex-1 resize-none bg-transparent text-xs text-ink placeholder-ink-faint focus:outline-none leading-relaxed py-0.5 max-h-[100px] disabled:opacity-50"
              style={{ height: '20px' }}
            />
            <button
              onClick={() => submit(input)}
              disabled={isLoading || !input.trim()}
              className="shrink-0 rounded-lg bg-accent hover:bg-accent-deep disabled:opacity-30 text-paper px-2.5 py-1 text-[11px] font-medium transition-colors mb-0.5"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </RefNavContext.Provider>
  )
}
