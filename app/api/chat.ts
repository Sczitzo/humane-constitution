// app/api/chat.ts
import { google } from '@ai-sdk/google';
import { streamText, embed } from 'ai';
import { createClient } from '@supabase/supabase-js';

export const config = { runtime: 'edge' };

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const { messages } = await req.json();
  const userQuery: string = messages[messages.length - 1].content;

  // 1. Embed the query
  const { embedding: queryEmbedding } = await embed({
    model: google.textEmbeddingModel('gemini-embedding-001'),
    value: userQuery,
  });

  // 2. Retrieve top-5 relevant chunks
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
    return new Response(`Retrieval error: ${error.message}`, { status: 500 });
  }

  const context = docs?.length
    ? docs.map((d: { content: string; source: string }) =>
        `[${d.source}]\n${d.content}`
      ).join('\n\n---\n\n')
    : 'No relevant documents found.';

  // 3. Stream a grounded Gemini answer
  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: `You are a knowledgeable assistant for the Twelve Pillar Protocol — a governance framework for humane AI. Answer questions accurately and concisely using ONLY the context below. If the context does not contain enough information to answer, say so clearly rather than speculating.

Context:
${context}`,
    messages,
  });

  return result.toUIMessageStreamResponse();
}
