import { useCallback, useEffect, useRef, useState } from 'react'
import AIWorker from '../workers/ai.worker.ts?worker'

export type AIStatus =
  | 'idle'
  | 'loading'
  | 'ready'
  | 'generating'
  | 'error'
  | 'unsupported'

export interface ChatMessage {
  role: 'user' | 'assistant'
  text: string
}

function isDesktop(): boolean {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) return false
  // Treat narrow viewports as mobile regardless of UA
  if (typeof window !== 'undefined' && window.innerWidth < 768) return false
  return true
}

// Module-level singleton — worker is created (and PREFETCH_MODEL sent) the
// instant this module is first imported, but only on desktop.
let sharedWorker: Worker | null = null
let prefetchSent = false

function getWorker(): Worker {
  if (!sharedWorker) {
    sharedWorker = new AIWorker() as Worker
  }
  return sharedWorker as Worker
}

const SYSTEM_PROMPT =
  'You are the authoritative expert on the Humane Constitution corpus — a collection of governance documents for ethical AI. ' +
  'Answer questions using only information in the corpus. ' +
  'Cite every factual claim as [Document Title](docId#heading-slug) using the exact IDs and slugs from the context provided. ' +
  'Use Markdown: ## headers for multi-part answers, **bold** for key terms. ' +
  'If the corpus does not contain the answer, say so — do not speculate.'

interface AIWorkerHook {
  status: AIStatus
  downloadProgress: number
  webgpuAvailable: boolean
  isDesktopBrowser: boolean
  messages: ChatMessage[]
  streamingOutput: string
  error: string | null
  generate: (query: string, context: string) => void
  abort: () => void
  clearHistory: () => void
}

export function useAIWorker(): AIWorkerHook {
  const desktop = isDesktop()
  const [status, setStatus] = useState<AIStatus>(desktop ? 'loading' : 'unsupported')
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [webgpuAvailable, setWebgpuAvailable] = useState(true)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [streamingOutput, setStreamingOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const outputRef = useRef('')
  const messagesRef = useRef<ChatMessage[]>([])
  const listenerRef = useRef<((e: MessageEvent) => void) | null>(null)

  useEffect(() => {
    // Skip everything on mobile/tablet
    if (!desktop) return

    if (typeof navigator !== 'undefined' && !('gpu' in navigator)) {
      setWebgpuAvailable(false)
    }

    const worker = getWorker()

    if (!prefetchSent) {
      prefetchSent = true
      worker.postMessage({ type: 'PREFETCH_MODEL' })
    }

    function handleMessage(event: MessageEvent) {
      const msg = event.data as
        | { type: 'progress'; progress: number }
        | { type: 'ready' }
        | { type: 'webgpu_fallback' }
        | { type: 'token'; token: string }
        | { type: 'done' }
        | { type: 'error'; message: string }

      switch (msg.type) {
        case 'progress':
          setStatus('loading')
          setDownloadProgress(msg.progress)
          break
        case 'webgpu_fallback':
          setWebgpuAvailable(false)
          break
        case 'ready':
          setStatus('ready')
          setDownloadProgress(100)
          break
        case 'token':
          outputRef.current += msg.token
          setStreamingOutput(outputRef.current)
          break
        case 'done': {
          const assistantMsg: ChatMessage = { role: 'assistant', text: outputRef.current }
          messagesRef.current = [...messagesRef.current, assistantMsg]
          setMessages(messagesRef.current)
          outputRef.current = ''
          setStreamingOutput('')
          setStatus('ready')
          break
        }
        case 'error':
          setStatus('error')
          setError(msg.message)
          break
      }
    }

    listenerRef.current = handleMessage
    worker.addEventListener('message', handleMessage)
    return () => worker.removeEventListener('message', handleMessage)
  }, [desktop])

  const abort = useCallback(() => {
    if (!sharedWorker || !listenerRef.current) return
    sharedWorker.removeEventListener('message', listenerRef.current)
    sharedWorker.terminate()
    sharedWorker = null
    prefetchSent = false
    outputRef.current = ''
    setStreamingOutput('')
    setError(null)
    setStatus('loading')
    // Recreate and reattach
    const newWorker = getWorker()
    newWorker.addEventListener('message', listenerRef.current)
    prefetchSent = true
    newWorker.postMessage({ type: 'PREFETCH_MODEL' })
  }, [])

  function generate(query: string, context: string) {
    if (!desktop) return

    // Add user turn to history synchronously via ref
    const userMsg: ChatMessage = { role: 'user', text: query }
    messagesRef.current = [...messagesRef.current, userMsg]
    setMessages(messagesRef.current)

    outputRef.current = ''
    setStreamingOutput('')
    setError(null)
    setStatus('generating')

    // Build pipeline messages: system + full history, context injected into latest user turn
    type PipelineMsg = { role: 'system' | 'user' | 'assistant'; content: string }
    const pipelineMessages: PipelineMsg[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messagesRef.current.map((m, i) => {
        if (m.role === 'user' && i === messagesRef.current.length - 1) {
          return {
            role: 'user' as const,
            content: `## Relevant corpus documents\n\n${context}\n\n## Question\n\n${m.text}`,
          }
        }
        return { role: m.role as 'user' | 'assistant', content: m.text }
      }),
    ]

    getWorker().postMessage({ type: 'generate', messages: pipelineMessages })
  }

  function clearHistory() {
    messagesRef.current = []
    setMessages([])
    outputRef.current = ''
    setStreamingOutput('')
    setError(null)
  }

  return {
    status, downloadProgress, webgpuAvailable, isDesktopBrowser: desktop,
    messages, streamingOutput, error, generate, abort, clearHistory,
  }
}
