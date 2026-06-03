# RAG Chatbot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a streaming RAG chatbot to the Humane Constitution reader that answers questions about the governance docs using Gemini 2.5 Flash and Supabase pgvector.

**Architecture:** Vercel Edge Function at `app/api/chat.ts` embeds the user query with Google `text-embedding-004` (768 dims), retrieves the top-5 matching chunks from a Supabase `documents` table via pgvector cosine similarity, then streams a grounded Gemini answer back using the Vercel AI SDK. A local `scripts/ingest-rag.ts` script chunks all 77 `.md` files in `docs/` and populates Supabase once (re-run after content changes).

**Tech Stack:** `ai` (Vercel AI SDK), `@ai-sdk/google` (Gemini + embeddings), `@supabase/supabase-js`, `tsx` (script runner), Supabase free-tier (pgvector), Vercel Edge runtime.

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `app/api/chat.ts` | **Create** | Edge Function: embed query → retrieve chunks → stream Gemini answer |
| `app/src/components/ChatPanel.tsx` | **Create** | Chat UI using `useChat` from `ai/react` |
| `app/src/App.tsx` | **Modify** | Add `'chat'` to `AppView` union and wire ChatPanel |
| `app/src/components/Layout.tsx` | **Modify** | Add Chat nav item |
| `app/vercel.json` | **Modify** | Add `rewrites` so `/api/*` hits the Edge functions |
| `app/.env.local` | **Create** | Local secrets (gitignored) |
| `app/package.json` | **Modify** | Add new deps |
| `scripts/ingest-rag.ts` | **Create** | One-shot ingestion: chunk → embed → upsert to Supabase |
| `scripts/.env` | **Create** | Secrets for ingest script (gitignored) |
| `supabase/migrations/001_rag.sql` | **Create** | pgvector schema + `match_documents` RPC |

---

## Task 1: Supabase schema

**Files:**
- Create: `supabase/migrations/001_rag.sql`

- [ ] **Step 1: Create the SQL migration file**

```sql
-- supabase/migrations/001_rag.sql
-- Run this in the Supabase SQL editor (free tier: Dashboard > SQL Editor)

create extension if not exists vector;

create table if not exists documents (
  id        bigserial primary key,
  content   text        not null,
  source    text        not null,   -- relative path e.g. "docs/annexes/ANNEX_A.md"
  chunk_idx integer     not null,
  embedding vector(768)
);

-- IVFFlat index — tune lists=100 after ingestion (free tier: skip ANALYZE, just create)
create index if not exists documents_embedding_idx
  on documents using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- Semantic search RPC used by the chat API
create or replace function match_documents(
  query_embedding vector(768),
  match_threshold float,
  match_count     int
)
returns table (
  id         bigint,
  content    text,
  source     text,
  similarity float
)
language sql stable as $$
  select
    id,
    content,
    source,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;
```

- [ ] **Step 2: Run it in Supabase**

1. Go to your Supabase project → **SQL Editor**
2. Paste the entire file contents and click **Run**
3. Confirm the `documents` table and `match_documents` function appear in **Table Editor** / **Database > Functions**

- [ ] **Step 3: Commit**

```bash
git add supabase/migrations/001_rag.sql
git commit -m "feat(rag): supabase pgvector schema + match_documents RPC"
```

---

## Task 2: Install dependencies

**Files:**
- Modify: `app/package.json`

- [ ] **Step 1: Install runtime deps**

```bash
cd app
npm install ai @ai-sdk/google @supabase/supabase-js
```

- [ ] **Step 2: Install script-only dev dep**

```bash
npm install -D tsx
```

- [ ] **Step 3: Verify versions installed**

```bash
npm ls ai @ai-sdk/google @supabase/supabase-js tsx
```

Expected output (versions may vary):
```
├── @ai-sdk/google@...
├── @supabase/supabase-js@...
├── ai@...
└── tsx@... (dev)
```

- [ ] **Step 4: Commit**

```bash
git add app/package.json app/package-lock.json
git commit -m "feat(rag): add ai-sdk, google provider, supabase deps"
```

---

## Task 3: Environment variables

**Files:**
- Create: `app/.env.local` (gitignored)
- Create: `scripts/.env` (gitignored)

- [ ] **Step 1: Gather your credentials**

From Supabase Dashboard:
- **Project URL** → Settings > API > Project URL
- **Service role key** → Settings > API > service_role (not anon — ingest needs write access)
- **Anon key** → Settings > API > anon key (used by the Edge Function for reads)

From Google AI Studio (aistudio.google.com):
- **GOOGLE_GENERATIVE_AI_API_KEY** → Create API key (free tier)

- [ ] **Step 2: Create `app/.env.local`**

```bash
# app/.env.local — loaded by Vite dev server AND Vercel preview/prod
GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key_here
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
```

- [ ] **Step 3: Create `scripts/.env`**

```bash
# scripts/.env — only used by the local ingest script
GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key_here
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_KEY=your_service_role_key_here
```

- [ ] **Step 4: Verify .gitignore covers these files**

```bash
grep -E '\.env' .gitignore app/.gitignore scripts/.gitignore 2>/dev/null || true
```

If `app/.env.local` or `scripts/.env` are not covered, add them:

```bash
echo ".env" >> scripts/.gitignore
echo ".env.local" >> app/.gitignore  # likely already there via Vite template
```

- [ ] **Step 5: Add env vars to Vercel**

In Vercel Dashboard → your project → **Settings > Environment Variables**, add:
- `GOOGLE_GENERATIVE_AI_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

Set scope to **Production + Preview + Development**.

---

## Task 4: Ingestion script

**Files:**
- Create: `scripts/ingest-rag.ts`

- [ ] **Step 1: Create the ingestion script**

```typescript
// scripts/ingest-rag.ts
// Usage: cd scripts && npx tsx ingest-rag.ts

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { google } from '@ai-sdk/google';
import { embed } from 'ai';
import { createClient } from '@supabase/supabase-js';

// Load scripts/.env manually (tsx doesn't auto-load it)
import { config } from 'fs';
const envPath = join(__dirname, '.env');
if (statSync(envPath, { throwIfNoEntry: false })) {
  const lines = readFileSync(envPath, 'utf-8').split('\n');
  for (const line of lines) {
    const [k, ...rest] = line.split('=');
    if (k && rest.length) process.env[k.trim()] = rest.join('=').trim();
  }
}

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!;
const CHUNK_WORDS = 400;   // target words per chunk
const CHUNK_OVERLAP = 50;  // words of overlap between consecutive chunks

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in scripts/.env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
const embeddingModel = google.textEmbeddingModel('text-embedding-004');
const DOCS_ROOT = join(__dirname, '..', 'docs');

/** Recursively collect all .md file paths under a directory */
function collectMdFiles(dir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  const results: string[] = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) results.push(...collectMdFiles(full));
    else if (e.name.endsWith('.md')) results.push(full);
  }
  return results;
}

/** Split text into overlapping word-based chunks */
function chunkText(text: string): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];
  let start = 0;
  while (start < words.length) {
    const end = Math.min(start + CHUNK_WORDS, words.length);
    chunks.push(words.slice(start, end).join(' '));
    if (end === words.length) break;
    start += CHUNK_WORDS - CHUNK_OVERLAP;
  }
  return chunks.filter(c => c.trim().length > 0);
}

/** Embed a single string via Google text-embedding-004 */
async function embedText(text: string): Promise<number[]> {
  const { embedding } = await embed({ model: embeddingModel, value: text });
  return embedding;
}

/** Upsert a batch of rows into Supabase */
async function upsertChunks(rows: { content: string; source: string; chunk_idx: number; embedding: number[] }[]) {
  const { error } = await supabase.from('documents').insert(rows);
  if (error) throw new Error(`Supabase insert error: ${error.message}`);
}

async function main() {
  const files = collectMdFiles(DOCS_ROOT);
  console.log(`Found ${files.length} .md files`);

  // Clear existing rows to allow clean re-ingestion
  const { error: delErr } = await supabase.from('documents').delete().neq('id', 0);
  if (delErr) throw new Error(`Failed to clear documents: ${delErr.message}`);
  console.log('Cleared existing documents');

  let totalChunks = 0;

  for (const filePath of files) {
    const relPath = relative(join(__dirname, '..'), filePath);
    const text = readFileSync(filePath, 'utf-8');
    const chunks = chunkText(text);

    console.log(`  ${relPath}: ${chunks.length} chunks`);

    const rows = [];
    for (let i = 0; i < chunks.length; i++) {
      const embedding = await embedText(chunks[i]);
      rows.push({ content: chunks[i], source: relPath, chunk_idx: i, embedding });
      // Small delay to stay within free-tier rate limits (60 req/min)
      await new Promise(r => setTimeout(r, 250));
    }

    await upsertChunks(rows);
    totalChunks += chunks.length;
  }

  console.log(`\nDone. ${totalChunks} chunks ingested from ${files.length} files.`);
}

main().catch(err => { console.error(err); process.exit(1); });
```

- [ ] **Step 2: Run the ingestion**

```bash
cd scripts
npx tsx ingest-rag.ts
```

Expected output:
```
Found 77 .md files
Cleared existing documents
  docs/annexes/ANNEX_A.md: 12 chunks
  docs/annexes/ANNEX_AH.md: 31 chunks
  ...
Done. ~900 chunks ingested from 77 files.
```

This takes ~5–10 minutes on the free-tier rate limit (250ms delay × ~900 chunks).

- [ ] **Step 3: Verify in Supabase**

```bash
# Quick check — use Supabase SQL Editor:
# select count(*) from documents;
# select source, count(*) from documents group by source limit 5;
```

- [ ] **Step 4: Commit**

```bash
git add scripts/ingest-rag.ts
git commit -m "feat(rag): local ingestion script for docs/ chunks into supabase"
```

---

## Task 5: Chat Edge Function

**Files:**
- Create: `app/api/chat.ts`

- [ ] **Step 1: Create the Edge Function**

```typescript
// app/api/chat.ts
// Vercel Edge Runtime — streams Gemini responses, bypasses 10s timeout

import { google } from '@ai-sdk/google';
import { streamText, embed } from 'ai';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const { messages } = await req.json();
  const userQuery: string = messages[messages.length - 1].content;

  // 1. Embed the user query
  const { embedding: queryEmbedding } = await embed({
    model: google.textEmbeddingModel('text-embedding-004'),
    value: userQuery,
  });

  // 2. Retrieve relevant chunks from Supabase
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );

  const { data: docs, error } = await supabase.rpc('match_documents', {
    query_embedding: queryEmbedding,
    match_threshold: 0.45,
    match_count: 5,
  });

  if (error) {
    return new Response(`Supabase error: ${error.message}`, { status: 500 });
  }

  const context = docs?.length
    ? docs.map((d: { content: string; source: string }) =>
        `[${d.source}]\n${d.content}`
      ).join('\n\n---\n\n')
    : 'No relevant documents found.';

  // 3. Stream a grounded Gemini answer
  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: `You are a knowledgeable assistant for the Humane Constitution — a governance framework for humane AI. Answer questions accurately and concisely using ONLY the context below. If the context does not contain enough information to answer, say so clearly rather than speculating.

Retrieved context:
${context}`,
    messages,
  });

  return result.toDataStreamResponse();
}
```

- [ ] **Step 2: Update `app/vercel.json` to expose the api/ directory**

Current `app/vercel.json`:
```json
{
  "buildCommand": "tsc && vite build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite"
}
```

Replace with:
```json
{
  "buildCommand": "tsc && vite build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    { "source": "/api/:path*", "destination": "/api/:path*" }
  ]
}
```

- [ ] **Step 3: Commit**

```bash
git add app/api/chat.ts app/vercel.json
git commit -m "feat(rag): streaming edge function for chat at /api/chat"
```

---

## Task 6: Chat UI component

**Files:**
- Create: `app/src/components/ChatPanel.tsx`

- [ ] **Step 1: Create `ChatPanel.tsx`**

```tsx
// app/src/components/ChatPanel.tsx
import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';

export function ChatPanel() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
  });

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Ask the Protocol
      </h1>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
        {messages.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Ask a question about the Humane Constitution governance documents.
          </p>
        )}
        {messages.map(m => (
          <div
            key={m.id}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap leading-relaxed ${
                m.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2.5 text-sm text-gray-500">
              <span className="animate-pulse">Thinking…</span>
            </div>
          </div>
        )}
        {error && (
          <p className="text-red-500 text-sm text-center">{error.message}</p>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask about threats, patches, annexes…"
          disabled={isLoading}
          className="flex-1 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/src/components/ChatPanel.tsx
git commit -m "feat(rag): ChatPanel component with useChat streaming"
```

---

## Task 7: Wire ChatPanel into the app

**Files:**
- Modify: `app/src/App.tsx`
- Modify: `app/src/components/Layout.tsx`

- [ ] **Step 1: Add `'chat'` to `AppView` in `Layout.tsx`**

Find the `AppView` type definition in `app/src/components/Layout.tsx`. It currently looks like:

```typescript
export type AppView = 'home' | 'constitution' | 'annexes' | 'registries' | 'topics' | 'paths' | 'validation' | 'settings';
```

Change it to:

```typescript
export type AppView = 'home' | 'constitution' | 'annexes' | 'registries' | 'topics' | 'paths' | 'validation' | 'settings' | 'chat';
```

- [ ] **Step 2: Add Chat to the nav items array in `Layout.tsx`**

Find the `navItems` array (or equivalent navigation list) in `Layout.tsx`. Add a chat entry. It will look something like:

```typescript
{ id: 'chat', label: 'Ask AI', icon: '💬' },
```

Match the exact structure of existing nav items in the file — they may use icon components or strings. Use the same pattern.

- [ ] **Step 3: Render `ChatPanel` in `App.tsx`**

In `app/src/App.tsx`, import the component and add a branch to the view-rendering logic:

```typescript
import { ChatPanel } from './components/ChatPanel';
```

Find where the app switches on the current view (likely a conditional render or switch-like structure). Add:

```typescript
{currentView === 'chat' && <ChatPanel />}
```

Place it alongside the other view renders, in the same location in the JSX tree.

- [ ] **Step 4: Commit**

```bash
git add app/src/App.tsx app/src/components/Layout.tsx
git commit -m "feat(rag): wire ChatPanel into app navigation as 'chat' view"
```

---

## Task 8: Smoke test locally

**Files:** none (verification only)

- [ ] **Step 1: Start dev server**

```bash
cd app
npm run dev
```

Expected: server starts on `http://localhost:1420`

- [ ] **Step 2: Navigate to the Chat view**

Open `http://localhost:1420` in a browser, click the **Ask AI** nav item.

Expected: ChatPanel renders with the placeholder text.

- [ ] **Step 3: Ask a test question**

Type: `What is the purpose of the Humane Constitution?`

Expected:
- "Thinking…" appears while streaming
- A grounded answer appears, citing content from the governance docs
- No console errors

- [ ] **Step 4: Ask a question with no expected match**

Type: `What is the capital of France?`

Expected: The assistant says it cannot find relevant information in the context rather than hallucinating.

- [ ] **Step 5: Check the network tab**

Open DevTools → Network → filter for `/api/chat`.

Expected: a streaming response with `content-type: text/event-stream` or `application/octet-stream`.

---

## Task 9: Deploy to Vercel

**Files:** none (deployment)

- [ ] **Step 1: Push branch to remote**

```bash
git push origin HEAD
```

- [ ] **Step 2: Confirm env vars are set in Vercel**

Dashboard → Settings → Environment Variables — verify all three are present:
- `GOOGLE_GENERATIVE_AI_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

- [ ] **Step 3: Deploy**

```bash
cd app
vercel --prod
```

- [ ] **Step 4: Smoke test on production URL**

Navigate to the deployed URL, open Chat, ask the same test question from Task 8 Step 3.

Expected: identical streaming behavior on prod.

---

## Verification Checklist

- [ ] `supabase/migrations/001_rag.sql` runs cleanly in SQL Editor
- [ ] `select count(*) from documents` returns ~800–1000 rows after ingestion
- [ ] `/api/chat` returns `content-type: text/event-stream`
- [ ] Chat answer references actual document content (not hallucinated)
- [ ] Off-topic question returns a graceful "not in context" response
- [ ] Vercel prod deployment streams correctly (no timeout)
- [ ] No secrets committed to git (run `git log -p | grep -i api_key`)
