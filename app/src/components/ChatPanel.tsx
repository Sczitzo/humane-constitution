import { useState, useEffect, useRef } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, type UIMessage } from 'ai'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const transport = new DefaultChatTransport({ api: '/api/chat' })

const SUGGESTED = [
  'What is the Humane Constitution?',
  'How does demurrage work?',
  'What is Voice and how is it earned?',
  'Explain the Acceptance Protocol',
  'What threats does P-020 address?',
]

export function ChatPanel() {
  const { messages, sendMessage, status, error } = useChat({ transport })
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const isLoading = status === 'submitted' || status === 'streaming'

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
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

  return (
    <div className="flex flex-col h-full bg-paper dark:bg-paper rounded-xl border border-line overflow-hidden">

      {/* message list */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">

        {messages.length === 0 && (
          <div className="flex flex-col items-center gap-6 mt-8 px-2">
            <div className="text-center space-y-1">
              <p className="text-base font-medium text-ink">Ask the Protocol</p>
              <p className="text-sm text-ink-soft">
                Questions are grounded in the constitution, annexes, and threat registry.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 max-w-lg">
              {SUGGESTED.map((q) => (
                <button
                  key={q}
                  onClick={() => submit(q)}
                  className="text-xs px-3 py-1.5 rounded-full border border-line bg-paper-strong hover:bg-accent-soft hover:border-accent text-ink-soft hover:text-ink transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m: UIMessage) => {
          const text = m.parts?.find((p) => p.type === 'text')?.text ?? ''
          const isUser = m.role === 'user'

          return (
            <div key={m.id} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
              {!isUser && (
                <div className="shrink-0 w-7 h-7 rounded-full bg-accent-soft border border-accent/30 flex items-center justify-center mt-0.5">
                  <span className="text-accent text-xs font-semibold">AI</span>
                </div>
              )}

              <div className={isUser
                ? 'max-w-[72%] rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm bg-accent text-paper leading-relaxed'
                : 'max-w-[88%] rounded-2xl rounded-tl-sm px-4 py-3 text-sm bg-paper-strong border border-line text-ink leading-relaxed'
              }>
                {isUser ? text : (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                      strong: ({ children }) => <strong className="font-semibold text-ink-strong">{children}</strong>,
                      em: ({ children }) => <em className="italic">{children}</em>,
                      ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-0.5">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-0.5">{children}</ol>,
                      li: ({ children }) => <li className="text-ink">{children}</li>,
                      code: ({ children, className }) => {
                        const isBlock = className?.includes('language-')
                        return isBlock
                          ? <code className="block bg-paper border border-line rounded px-3 py-2 font-mono text-xs my-2 overflow-x-auto">{children}</code>
                          : <code className="bg-paper border border-line rounded px-1 py-0.5 font-mono text-xs">{children}</code>
                      },
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-2 border-accent pl-3 italic text-ink-soft my-2">{children}</blockquote>
                      ),
                      h1: ({ children }) => <h1 className="font-semibold text-base text-ink-strong mb-1">{children}</h1>,
                      h2: ({ children }) => <h2 className="font-semibold text-sm text-ink-strong mb-1">{children}</h2>,
                      h3: ({ children }) => <h3 className="font-medium text-sm text-ink mb-1">{children}</h3>,
                    }}
                  >
                    {text}
                  </ReactMarkdown>
                )}
              </div>

              {isUser && (
                <div className="shrink-0 w-7 h-7 rounded-full bg-accent flex items-center justify-center mt-0.5">
                  <span className="text-paper text-xs font-semibold">You</span>
                </div>
              )}
            </div>
          )
        })}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="shrink-0 w-7 h-7 rounded-full bg-accent-soft border border-accent/30 flex items-center justify-center">
              <span className="text-accent text-xs font-semibold">AI</span>
            </div>
            <div className="rounded-2xl rounded-tl-sm px-4 py-3 bg-paper-strong border border-line">
              <span className="flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-ink-faint animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-ink-faint animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-ink-faint animate-bounce [animation-delay:300ms]" />
              </span>
            </div>
          </div>
        )}

        {error && (
          <p className="text-center text-xs text-red-500 dark:text-red-400 px-4">{error.message}</p>
        )}

        <div ref={bottomRef} />
      </div>

      {/* input bar */}
      <div className="border-t border-line bg-paper px-3 py-3">
        <div className="flex items-end gap-2 rounded-xl border border-line bg-paper-strong px-3 py-2 focus-within:border-accent/60 focus-within:ring-1 focus-within:ring-accent/20 transition-all">
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              e.target.style.height = 'auto'
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
            }}
            onKeyDown={handleKeyDown}
            placeholder="Ask about the protocol… (Enter to send)"
            disabled={isLoading}
            className="flex-1 resize-none bg-transparent text-sm text-ink placeholder-ink-faint focus:outline-none leading-relaxed py-0.5 max-h-[120px] disabled:opacity-50"
            style={{ height: '24px' }}
          />
          <button
            onClick={() => submit(input)}
            disabled={isLoading || !input.trim()}
            className="shrink-0 rounded-lg bg-accent hover:bg-accent-deep disabled:opacity-30 text-paper px-3 py-1.5 text-xs font-medium transition-colors mb-0.5"
          >
            Send
          </button>
        </div>
        <p className="text-[10px] text-ink-faint mt-1.5 text-center">
          Shift+Enter for new line · answers grounded in protocol documents
        </p>
      </div>
    </div>
  )
}
