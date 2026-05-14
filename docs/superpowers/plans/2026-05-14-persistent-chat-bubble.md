# Persistent Chat Bubble Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the full-page chat view with a persistent floating chat bubble that overlays all reader views, renders clickable corpus hyperlinks in AI responses that navigate the reader, and delivers concise expert answers.

**Architecture:** `ChatBubble` is a new always-mounted component rendered at the App level (outside the view switch), holding open/close state and the `useChat` instance so history persists across opens. `ChatPanel` becomes a pure presentational component receiving corpus + navigate props. The system prompt is updated for conciseness and to instruct the model to emit source-path markdown links which the custom ReactMarkdown `a` renderer intercepts and converts into reader navigation calls.

**Tech Stack:** React, `@ai-sdk/react`, `react-markdown`, `remark-gfm`, Tailwind CSS, Vercel serverless functions, Supabase pgvector, `@ai-sdk/google`

---

## File Map

| File | Change | Responsibility |
|------|--------|----------------|
| `app/api/chat.ts` | Modify | Concise system prompt + link instructions + titled context |
| `app/src/components/ChatBubble.tsx` | **Create** | FAB button + slide-up panel shell, open/close state |
| `app/src/components/ChatPanel.tsx` | Modify | Accept corpus/navigate props, custom link renderer, remove standalone transport |
| `app/src/App.tsx` | Modify | Mount ChatBubble persistently, wire corpus + onNavigateToDoc, remove chat view branch |
| `app/src/components/Layout.tsx` | Modify | Remove 'chat' from AppView and NAV_ITEMS |

---

## Task 1: Update system prompt — conciseness + titled context + link format

**Files:**
- Modify: `app/api/chat.ts`

- [ ] **Step 1: Add a `sourceTitle` helper and update context formatting**

Replace the context block in `app/api/chat.ts`. The `docs` from Supabase have `source` (e.g. `constitution/Humane_Constitution.md`). Derive a readable title from the path:

```typescript
function titleFromSource(source: string): string {
  const filename = source.split('/').pop() ?? source
  return filename
    .replace(/\.md$/, '')
    .replace(/_/g, ' ')
    .replace(/^ANNEX /, 'Annex ')
}
```

Update the context formatter:
```typescript
const context = docs?.length
  ? docs.map((d: { content: string; source: string }) =>
      `[${d.source} | ${titleFromSource(d.source)}]\n${d.content}`
    ).join('\n\n---\n\n')
  : 'No relevant documents found.';
```

- [ ] **Step 2: Rewrite the system prompt to add conciseness + link rules**

Replace the `system:` string in `streamText(...)`:

```typescript
system: `You are a subject-matter expert on the Humane Constitution — a governance framework for humane AI and economic design. You have deep knowledge of the source documents AND real-world history: monetary theory, constitutional economics, political philosophy, and historical precedents.

CONCISENESS RULES (non-negotiable):
- No preamble. Answer immediately.
- Simple factual questions: 2–4 sentences max.
- Multi-part questions: tight bullet list, one phrase per bullet.
- No closing summary or restatement.
- Never say "In essence", "In summary", or "It's important to note".

ENGAGEMENT RULES:
- Acknowledge the legitimate concern behind skeptical questions before rebutting.
- Cite real-world precedents when they exist (Wörgl 1932, Elinor Ostrom, Henry George, Bank of North Dakota, Chiemgauer, etc.).
- Be honest about what is experimental vs. established.
- Never open with "The framework defines..." — synthesize and reason, then cite.

LINK RULES:
- Whenever you reference a source document, make it a markdown link using the exact source path shown in the context headers.
- Format: [Readable Title](source/path/to/doc.md)
- Example: the funding mechanisms are defined in the [Humane Constitution](constitution/Humane_Constitution.md).
- Only link sources that appear in the context below. Do not invent paths.

Source documents:
${context}`,
```

- [ ] **Step 3: Verify build passes**

```bash
cd app && npm run build 2>&1 | grep -E "error|Error"
```
Expected: no output (clean build).

- [ ] **Step 4: Smoke-test the new prompt via curl**

```bash
BODY=$(cat <<'EOF'
{
  "id": "t1","messages":[{"id":"m1","role":"user","parts":[{"type":"text","text":"how is the system funded?"}],"metadata":{}}],
  "trigger":"submit-message","messageId":"m1"
}
EOF
)
curl -s -X POST https://humane-constitution.vercel.app/api/chat \
  -H "Content-Type: application/json" -d "$BODY" --max-time 30 \
  | grep '"delta"' | sed 's/.*"delta":"//;s/".*//' | tr -d '\n'
echo
```
Expected: response under ~200 words containing at least one markdown link like `(constitution/Humane_Constitution.md)`.

- [ ] **Step 5: Deploy and commit**

```bash
cd app && vercel --prod 2>&1 | grep -E "Aliased:|Error"
cd .. && git add app/api/chat.ts
git commit -m "feat(chat): concise system prompt with corpus hyperlinks and titled context"
git push origin claude/nostalgic-cartwright-26d397
```

---

## Task 2: Create ChatBubble component

**Files:**
- Create: `app/src/components/ChatBubble.tsx`

This component owns the open/closed state and renders the FAB + the panel shell. It does NOT contain `useChat` — that stays in `ChatPanel` so the hook is always mounted and history persists.

- [ ] **Step 1: Create `app/src/components/ChatBubble.tsx`**

```tsx
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
      {/* Panel — always mounted so chat history persists, visibility toggled */}
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
          /* × close icon */
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          /* chat bubble icon */
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
      </button>
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd app && npx tsc --noEmit 2>&1 | grep -v "node_modules"
```
Expected: no errors related to `ChatBubble.tsx`.

- [ ] **Step 3: Commit**

```bash
git add app/src/components/ChatBubble.tsx
git commit -m "feat(chat): add ChatBubble FAB + panel shell component"
```

---

## Task 3: Update ChatPanel — corpus props + custom link renderer

**Files:**
- Modify: `app/src/components/ChatPanel.tsx`

`ChatPanel` receives `corpus` and `onNavigateToDoc`. It builds a `Map<string, string>` from source path → docId so the custom `a` renderer can intercept links. The `DefaultChatTransport` stays inside `ChatPanel` (singleton at module level).

- [ ] **Step 1: Replace ChatPanel with the updated version**

```tsx
import { useState, useEffect, useRef, useMemo } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, type UIMessage } from 'ai'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { CorpusPayload } from '../generated/corpus'

const transport = new DefaultChatTransport({ api: '/api/chat' })

const SUGGESTED = [
  'What is the Humane Constitution?',
  'How does demurrage work?',
  'What is Voice and how is it earned?',
  'Explain the Acceptance Protocol',
  'What threats does P-020 address?',
]

interface ChatPanelProps {
  corpus: CorpusPayload | null
  onNavigateToDoc: (docId: string) => void
}

export function ChatPanel({ corpus, onNavigateToDoc }: ChatPanelProps) {
  const { messages, sendMessage, status, error } = useChat({ transport })
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const isLoading = status === 'submitted' || status === 'streaming'

  // Build source-path → docId lookup from corpus
  const sourceToDocId = useMemo(() => {
    const map = new Map<string, string>()
    if (!corpus) return map
    for (const doc of corpus.docs) {
      // doc.path is like "docs/constitution/Humane_Constitution.md"
      // source in context is like "constitution/Humane_Constitution.md"
      const source = doc.path.replace(/^docs\//, '')
      map.set(source, doc.id)
    }
    return map
  }, [corpus])

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

  // Custom link renderer — intercepts corpus links, falls back to external for others
  function LinkRenderer({ href, children }: { href?: string; children?: React.ReactNode }) {
    if (href) {
      const docId = sourceToDocId.get(href)
      if (docId) {
        return (
          <button
            onClick={() => onNavigateToDoc(docId)}
            className="text-accent underline underline-offset-2 hover:text-accent-deep cursor-pointer bg-transparent border-none p-0 font-inherit text-inherit"
          >
            {children}
          </button>
        )
      }
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer"
        className="text-accent underline underline-offset-2 hover:text-accent-deep">
        {children}
      </a>
    )
  }

  return (
    <div className="flex flex-col h-full bg-paper dark:bg-paper rounded-xl border border-line overflow-hidden">

      {/* Header */}
      <div className="px-4 py-3 border-b border-line flex items-center gap-2 bg-paper-strong">
        <div className="w-2 h-2 rounded-full bg-accent" />
        <span className="text-xs font-medium text-ink-soft">Ask the Protocol</span>
      </div>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
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

        {messages.map((m: UIMessage) => {
          const text = m.parts?.find((p) => p.type === 'text')?.text ?? ''
          const isUser = m.role === 'user'
          return (
            <div key={m.id} className={`flex gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
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
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                      strong: ({ children }) => <strong className="font-semibold text-ink-strong">{children}</strong>,
                      em: ({ children }) => <em className="italic">{children}</em>,
                      ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-0.5">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-0.5">{children}</ol>,
                      li: ({ children }) => <li>{children}</li>,
                      a: ({ href, children }) => <LinkRenderer href={href} children={children} />,
                      code: ({ children, className }) => {
                        const isBlock = className?.includes('language-')
                        return isBlock
                          ? <code className="block bg-paper border border-line rounded px-2 py-1.5 font-mono text-[10px] my-1.5 overflow-x-auto">{children}</code>
                          : <code className="bg-paper border border-line rounded px-1 py-0.5 font-mono text-[10px]">{children}</code>
                      },
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-2 border-accent pl-2 italic text-ink-soft my-2">{children}</blockquote>
                      ),
                      h1: ({ children }) => <h1 className="font-semibold text-sm text-ink-strong mb-1">{children}</h1>,
                      h2: ({ children }) => <h2 className="font-semibold text-xs text-ink-strong mb-1">{children}</h2>,
                      h3: ({ children }) => <h3 className="font-medium text-xs text-ink mb-1">{children}</h3>,
                    }}
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
      <div className="border-t border-line bg-paper px-3 py-2.5">
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
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd app && npx tsc --noEmit 2>&1 | grep -v "node_modules"
```
Expected: no errors in `ChatPanel.tsx` or `ChatBubble.tsx`.

- [ ] **Step 3: Commit**

```bash
git add app/src/components/ChatPanel.tsx
git commit -m "feat(chat): corpus hyperlinks with custom link renderer, bubble-ready props"
```

---

## Task 4: Wire ChatBubble into App.tsx + remove chat view

**Files:**
- Modify: `app/src/App.tsx`

- [ ] **Step 1: Import ChatBubble and remove ChatPanel import**

In `app/src/App.tsx`, replace:
```tsx
import { ChatPanel } from './components/ChatPanel'
```
with:
```tsx
import { ChatBubble } from './components/ChatBubble'
```

- [ ] **Step 2: Remove chat from `readStoredView` validator**

In the `readStoredView` function, remove `value === 'chat'` from the conditional and from the return-path mapping. Change:
```tsx
    value === 'settings' ||
    value === 'chat'
  ) {
    // Map legacy 'overview' and 'settings' → 'home'.
    return (value === 'overview' || value === 'settings') ? 'home' : value
```
to:
```tsx
    value === 'settings'
  ) {
    return (value === 'overview' || value === 'settings') ? 'home' : value
```

- [ ] **Step 3: Add `onNavigateToDoc` handler and mount `ChatBubble`**

Replace the render block:
```tsx
      {view === 'chat' ? (
        <ChatPanel />
      ) : (
        <Dashboard
          ...
        />
      )}
```
with:
```tsx
        <Dashboard
          view={view}
          corpus={corpus}
          loadError={loadError}
          onViewChange={handleViewChange}
          onProgressChange={setReadingProgress}
          onNavDocsChange={handleNavDocsChange}
          corpusQuery={corpusQuery}
          onCorpusQueryChange={setCorpusQuery}
          pendingDocTarget={pendingDocTarget}
          onPendingDocTargetConsumed={() => setPendingDocTarget(null)}
          pendingPathId={pendingPathId}
          onPendingPathConsumed={() => setPendingPathId(null)}
        />
```

And outside the `<Layout>` block (but inside the fragment/return), add:
```tsx
      <ChatBubble
        corpus={corpus}
        onNavigateToDoc={(docId) => {
          if (!corpus) return
          const doc = corpus.docs.find((d) => d.id === docId)
          if (doc) handleSelectNavDoc(doc)
        }}
      />
```

The full return should look like:
```tsx
  if (showLanding) {
    return <LandingPage onEnter={handleEnterFromLanding} returningVisitor={logoReturn} />
  }

  return (
    <>
      <Layout
        activeNav={view}
        onNavChange={handleNavChange}
        onLogoClick={handleLogoClick}
        readingProgress={readingProgress}
        recentDocs={recentDocs}
        shelfDocs={shelfDocs}
        shelfLabel={shelfLabel}
        onSelectDoc={handleSelectNavDoc}
        allDocs={corpus?.docs ?? []}
      >
        <Dashboard
          view={view}
          corpus={corpus}
          loadError={loadError}
          onViewChange={handleViewChange}
          onProgressChange={setReadingProgress}
          onNavDocsChange={handleNavDocsChange}
          corpusQuery={corpusQuery}
          onCorpusQueryChange={setCorpusQuery}
          pendingDocTarget={pendingDocTarget}
          onPendingDocTargetConsumed={() => setPendingDocTarget(null)}
          pendingPathId={pendingPathId}
          onPendingPathConsumed={() => setPendingPathId(null)}
        />
      </Layout>
      <ChatBubble
        corpus={corpus}
        onNavigateToDoc={(docId) => {
          if (!corpus) return
          const doc = corpus.docs.find((d) => d.id === docId)
          if (doc) handleSelectNavDoc(doc)
        }}
      />
    </>
  )
```

- [ ] **Step 4: Verify TypeScript**

```bash
cd app && npx tsc --noEmit 2>&1 | grep -v "node_modules"
```
Expected: clean.

- [ ] **Step 5: Commit**

```bash
git add app/src/App.tsx
git commit -m "feat(chat): mount ChatBubble persistently, remove chat from view router"
```

---

## Task 5: Remove 'chat' from Layout nav

**Files:**
- Modify: `app/src/components/Layout.tsx`

- [ ] **Step 1: Remove 'chat' from AppView union**

In `app/src/components/Layout.tsx`, change:
```tsx
export type AppView =
  | 'home'
  | 'constitution'
  | 'annexes'
  | 'registries'
  | 'topics'
  | 'paths'
  | 'validation'
  | 'settings'
  | 'chat'
```
to:
```tsx
export type AppView =
  | 'home'
  | 'constitution'
  | 'annexes'
  | 'registries'
  | 'topics'
  | 'paths'
  | 'validation'
  | 'settings'
```

- [ ] **Step 2: Remove 'chat' from NAV_ITEMS**

```tsx
const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'constitution', label: 'Constitution' },
  { id: 'annexes', label: 'Annexes' },
  { id: 'registries', label: 'Threats & Patches' },
  { id: 'topics', label: 'Topics' },
  { id: 'paths', label: 'Reading Paths' },
  { id: 'validation', label: 'Validation' },
]
```

- [ ] **Step 3: Remove 'chat' from Dashboard.tsx VIEW_META**

In `app/src/components/Dashboard.tsx`, find the `VIEW_META` record and remove the `chat` entry:
```typescript
// Remove this entry:
chat: {
  title: 'Ask the Protocol',
  subtitle: 'Ask questions grounded in the governance documents.',
  railLabel: 'Chat',
},
```

- [ ] **Step 4: Full build check**

```bash
cd app && npm run build 2>&1 | grep -E "error TS|Error"
```
Expected: no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add app/src/components/Layout.tsx app/src/components/Dashboard.tsx
git commit -m "feat(chat): remove chat nav item — bubble replaces full-page view"
```

---

## Task 6: Deploy + end-to-end verification

**Files:** none (deployment + smoke test)

- [ ] **Step 1: Deploy to production**

```bash
cd app && vercel --prod 2>&1 | grep -E "Aliased:|Error"
git push origin claude/nostalgic-cartwright-26d397
```

- [ ] **Step 2: Smoke-test API with corpus-link prompt**

```bash
BODY=$(cat <<'EOF'
{
  "id":"t","messages":[{"id":"m1","role":"user","parts":[{"type":"text","text":"how is demurrage defined?"}],"metadata":{}}],
  "trigger":"submit-message","messageId":"m1"
}
EOF
)
curl -s -X POST https://humane-constitution.vercel.app/api/chat \
  -H "Content-Type: application/json" -d "$BODY" --max-time 30 \
  | grep '"delta"' | sed 's/.*"delta":"//;s/".*//' | tr -d '\n'
echo
```
Expected: concise answer (≤150 words) containing at least one markdown link with a `.md` path.

- [ ] **Step 3: Visual check — FAB visible on reader views**

Open `https://humane-constitution.vercel.app`, navigate to Constitution view. Confirm:
- Chat FAB appears bottom-right (amber circle, chat icon)
- Clicking opens the slide-up panel
- Asking a question returns a streaming response
- A doc link in the response navigates the reader and panel stays open
- Closing the bubble and re-opening preserves chat history

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "chore: persistent chat bubble — complete"
git push origin claude/nostalgic-cartwright-26d397
```
