import { useState } from 'react'
import { ChatPanel } from './ChatPanel'
import type { CorpusPayload } from '../generated/corpus'

interface ChatBubbleProps {
  corpus: CorpusPayload | null
  onNavigateToDoc: (docId: string) => void
}

export function ChatBubble({ corpus, onNavigateToDoc }: ChatBubbleProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {/* Panel — always mounted so chat history persists, visibility toggled via CSS */}
      <div
        className={[
          'w-[380px] max-w-[calc(100vw-2.5rem)]',
          'h-[540px] max-h-[calc(100vh-100px)]',
          'rounded-2xl shadow-2xl border border-line overflow-hidden',
          'transition-all duration-200 origin-bottom-right',
          open
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none',
        ].join(' ')}
      >
        <ChatPanel corpus={corpus} onNavigateToDoc={onNavigateToDoc} />
      </div>

      {/* FAB */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Ask AI'}
        className={[
          'w-14 h-14 rounded-full shadow-lg',
          'bg-accent hover:bg-accent-deep text-paper',
          'flex items-center justify-center transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
          open ? 'rotate-45' : 'rotate-0',
        ].join(' ')}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
      </button>
    </div>
  )
}
