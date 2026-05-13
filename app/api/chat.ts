import { createGroq } from '@ai-sdk/groq'
import { streamText } from 'ai'

export const config = { runtime: 'edge' }

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY })

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const { messages } = await req.json() as {
    messages: { role: 'system' | 'user' | 'assistant'; content: string }[]
  }

  const result = await streamText({
    model: groq('llama-3-8b-instruct'),
    messages,
    maxOutputTokens: 600,
  })

  return result.toTextStreamResponse()
}
