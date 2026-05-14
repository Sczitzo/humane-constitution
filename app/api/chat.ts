// app/api/chat.ts
import type { IncomingMessage, ServerResponse } from 'http';
import { google } from '@ai-sdk/google';
import { streamText, embed, convertToModelMessages } from 'ai';
import { createClient } from '@supabase/supabase-js';

function titleFromSource(source: string): string {
  const filename = source.split('/').pop() ?? source
  return filename
    .replace(/\.md$/i, '')
    .replace(/_+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^ANNEX /i, 'Annex ')
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
  let messages: unknown[];
  try {
    const parsed = JSON.parse(body);
    messages = parsed.messages;
    if (!Array.isArray(messages) || messages.length === 0) throw new Error('invalid');
  } catch {
    res.writeHead(400);
    res.end('Bad Request: invalid message body');
    return;
  }
  const lastMsg = messages[messages.length - 1] as Record<string, unknown>;
  const userQuery: string =
    (lastMsg.content as string | undefined) ??
    (lastMsg.parts as Array<{ type: string; text?: string }> | undefined)
      ?.find((p) => p.type === 'text')?.text ??
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
- Whenever you reference a source document, use standard markdown hyperlink syntax.
- Format: [Human-Readable Title](exact/source/path.md)
- The title must be a real name, NOT the file path. The path goes inside the parentheses only.
- CORRECT: "...as defined in the [Threat Register](governance/Threat_Register.md)..."
- WRONG: "...[governance/Threat_Register.md]..." — bare path in brackets is NOT a link
- WRONG: "[governance/Threat_Register.md](governance/Threat_Register.md)" — path as title
- Only use paths that appear verbatim in the context headers below. Do not invent paths.
- NEVER use absolute URLs (https://...) or hash anchors (#section). Bare path only: annexes/ANNEX_AV.md

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
