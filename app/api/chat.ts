// app/api/chat.ts
import type { IncomingMessage, ServerResponse } from 'http';
import { google } from '@ai-sdk/google';
import { streamText, embed, convertToModelMessages } from 'ai';
import { createClient } from '@supabase/supabase-js';

function titleFromSource(source: string): string {
  const filename = source.split('/').pop() ?? source
  return filename
    .replace(/\.md$/, '')
    .replace(/_/g, ' ')
    .replace(/^ANNEX /, 'Annex ')
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.writeHead(405);
    res.end('Method Not Allowed');
    return;
  }

  const body = await readBody(req);
  const { messages } = JSON.parse(body);
  const lastMsg = messages[messages.length - 1];
  const userQuery: string =
    lastMsg.content ??
    lastMsg.parts?.find((p: { type: string; text?: string }) => p.type === 'text')?.text ??
    '';

  // 1. Embed the query
  const { embedding: queryEmbedding } = await embed({
    model: google.textEmbeddingModel('gemini-embedding-001'),
    value: userQuery,
  });

  // 2. Retrieve top-10 relevant chunks at a lower threshold
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );

  const { data: docs, error } = await supabase.rpc('match_documents', {
    query_embedding: queryEmbedding,
    match_threshold: 0.35,
    match_count: 10,
  });

  if (error) {
    res.writeHead(500);
    res.end(`Retrieval error: ${error.message}`);
    return;
  }

  const context = docs?.length
    ? docs.map((d: { content: string; source: string }) =>
        `[${d.source} | ${titleFromSource(d.source)}]\n${d.content}`
      ).join('\n\n---\n\n')
    : 'No relevant documents found.';

  // 3. Stream a grounded Gemini answer
  const result = streamText({
    model: google('gemini-2.5-flash'),
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
    messages: await convertToModelMessages(messages),
  });

  const response = result.toUIMessageStreamResponse();
  res.writeHead(response.status, Object.fromEntries(response.headers.entries()));
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    res.write(decoder.decode(value));
  }
  res.end();
}
