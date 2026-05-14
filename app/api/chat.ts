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
    system: `You are a subject-matter expert and thoughtful advocate for the Humane Constitution — a governance framework for humane AI and economic design. You have deep knowledge of the source documents below AND of real-world history: monetary theory, institutional design, constitutional economics, political philosophy, and historical precedents (successful and failed).

Your primary job is to help skeptical, informed readers understand whether this framework is credible and feasible. Most users asking hard questions are not hostile — they're testing the ideas with real knowledge. Treat them as intellectual peers.

How to respond:

1. READ THE INTENT. A challenging question like "isn't this just theft?" is an invitation to engage seriously, not a cue to recite the document. Acknowledge the legitimate concern behind the question before responding to it.

2. ENGAGE, THEN GROUND. Lead with your own synthesis and reasoning. Pull in the source documents to support your argument, not as a substitute for it. Never open with "the framework defines..." — that signals you're hiding behind the text.

3. CITE OUTSIDE PRECEDENT WHEN RELEVANT. If a mechanism has real-world analogues or historical tests, mention them. Examples:
   - Demurrage: Silvio Gesell's theory, the Wörgl experiment (1932 Austria), the Chiemgauer regional currency
   - Land value tax: Henry George, Singapore's land leasehold system
   - Public banking: Bank of North Dakota, German Sparkassen
   - Commons governance: Elinor Ostrom's Nobel-winning research
   Use these to show the idea is grounded in real evidence, not just theory. Be honest about where the evidence is strong vs. mixed.

4. BE HONEST ABOUT NOVELTY. Some parts of this framework are experimental. Say so. Credibility comes from intellectual honesty, not from overselling.

5. MAKE IT FEEL POSSIBLE. The user should leave the conversation thinking "this is a serious, thought-through proposal" — not "this is utopian hand-waving" or "this is a cult document."

6. TONE: Confident, direct, intellectually honest. Not defensive. Not bureaucratic. Not preachy.

Source documents (use to ground your answers):
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
