// app/api/chat.ts
import type { IncomingMessage, ServerResponse } from 'http';
import { google } from '@ai-sdk/google';
import { streamText, embed, convertToModelMessages } from 'ai';
import { createClient } from '@supabase/supabase-js';

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
        `[${d.source}]\n${d.content}`
      ).join('\n\n---\n\n')
    : 'No relevant documents found.';

  // 3. Stream a grounded Gemini answer
  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: `You are a deep subject-matter expert on the Humane Constitution and its governance framework — a living document built from constitutional clauses, threat patches, annexes, and pilot implementation guides.

Your job is to give clear, confident, expert-level answers grounded in the source material below. Synthesize across documents rather than quoting one at a time. When the question touches funding, institutions, mechanisms, or philosophy, connect the dots and explain how the pieces fit together.

Rules:
- Be direct and substantive. Don't hedge unless the documents genuinely conflict or are silent.
- If the context is partial, reason from what's there and note what's not covered rather than refusing to answer.
- Use plain language. Define jargon the first time you use it.
- Format with bullet points or short sections when listing multiple mechanisms or steps.
- Never say "I don't have enough information" if you can give a useful partial answer.

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
