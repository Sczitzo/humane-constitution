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
  if (typeof window !== 'undefined' && window.innerWidth < 768) return false
  return true
}

function hasWebGPU(): boolean {
  return typeof navigator !== 'undefined' && 'gpu' in navigator
}

// Module-level singleton — only used on the WebGPU path
let sharedWorker: Worker | null = null
let prefetchSent = false

function getWorker(): Worker {
  if (!sharedWorker) sharedWorker = new AIWorker() as Worker
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
  isCloudFallback: boolean
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
  const webgpu = hasWebGPU()

  const [status, setStatus] = useState<AIStatus>(() => {
    if (!desktop) return 'unsupported'
    if (!webgpu) return 'ready'   // cloud path — ready immediately, no download
    return 'loading'
  })
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [streamingOutput, setStreamingOutput] = useState('')
  const [error, setError] = useState<string | null>(null)

  const outputRef = useRef('')
  const messagesRef = useRef<ChatMessage[]>([])
  const listenerRef = useRef<((e: MessageEvent) => void) | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  // ── WebGPU worker path ────────────────────────────────────────────────────

  useEffect(() => {
    if (!desktop || !webgpu) return

    const worker = getWorker()

    if (!prefetchSent) {
      prefetchSent = true
      worker.postMessage({ type: 'PREFETCH_MODEL' })
    }

    function handleMessage(event: MessageEvent) {
      const msg = event.data as
        | { type: 'progress'; progress: number }
        | { type: 'ready' }
        | { type: 'token'; token: string }
        | { type: 'done' }
        | { type: 'error'; message: string }

      switch (msg.type) {
        case 'progress':
          setStatus('loading')
          setDownloadProgress(msg.progress)
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
        case 'error': {
          const isDeviceLost = /ERROR_CODE:\s*1|device.?lost|MapAsync|external Instance/i.test(msg.message)
          if (isDeviceLost) {
            // GPU device lost — worker is unrecoverable; terminate and reload silently
            if (sharedWorker && listenerRef.current) {
              sharedWorker.removeEventListener('message', listenerRef.current)
              sharedWorker.terminate()
              sharedWorker = null
              prefetchSent = false
            }
            outputRef.current = ''
            setStreamingOutput('')
            setError('WebGPU device lost — reloading model, please try again in a moment.')
            setStatus('loading')
            const newWorker = getWorker()
            if (listenerRef.current) newWorker.addEventListener('message', listenerRef.current)
            prefetchSent = true
            newWorker.postMessage({ type: 'PREFETCH_MODEL' })
          } else {
            setStatus('error')
            setError(msg.message)
          }
          break
        }
      }
    }

    listenerRef.current = handleMessage
    worker.addEventListener('message', handleMessage)
    return () => worker.removeEventListener('message', handleMessage)
  }, [desktop, webgpu])

  // ── Abort ─────────────────────────────────────────────────────────────────

  const abort = useCallback(() => {
    if (webgpu) {
      if (!sharedWorker || !listenerRef.current) return
      sharedWorker.removeEventListener('message', listenerRef.current)
      sharedWorker.terminate()
      sharedWorker = null
      prefetchSent = false
      outputRef.current = ''
      setStreamingOutput('')
      setError(null)
      setStatus('loading')
      const newWorker = getWorker()
      newWorker.addEventListener('message', listenerRef.current)
      prefetchSent = true
      newWorker.postMessage({ type: 'PREFETCH_MODEL' })
    } else {
      abortControllerRef.current?.abort()
      abortControllerRef.current = null
      outputRef.current = ''
      setStreamingOutput('')
      setStatus('ready')
    }
  }, [webgpu])

  // ── Shared pipeline message builder ───────────────────────────────────────

  function buildPipelineMessages(_query: string, context: string) {
    type PipelineMsg = { role: 'system' | 'user' | 'assistant'; content: string }
    return [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...messagesRef.current.map((m, i): PipelineMsg => {
        if (m.role === 'user' && i === messagesRef.current.length - 1) {
          return {
            role: 'user',
            content: `## Relevant corpus documents\n\n${context}\n\n## Question\n\n${m.text}`,
          }
        }
        return { role: m.role, content: m.text }
      }),
    ]
  }

  // ── Generate ──────────────────────────────────────────────────────────────

  function generate(query: string, context: string) {
    if (!desktop) return

    const userMsg: ChatMessage = { role: 'user', text: query }
    messagesRef.current = [...messagesRef.current, userMsg]
    setMessages(messagesRef.current)
    outputRef.current = ''
    setStreamingOutput('')
    setError(null)
    setStatus('generating')

    const pipelineMessages = buildPipelineMessages(query, context)

    if (webgpu) {
      getWorker().postMessage({ type: 'generate', messages: pipelineMessages })
    } else {
      generateCloud(pipelineMessages)
    }
  }

  async function generateCloud(
    pipelineMessages: { role: 'system' | 'user' | 'assistant'; content: string }[],
  ) {
    const controller = new AbortController()
    abortControllerRef.current = controller

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: pipelineMessages }),
        signal: controller.signal,
      })

      if (!response.ok) throw new Error(`API error ${response.status}`)

      const reader = response.body!.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        outputRef.current += chunk
        setStreamingOutput(outputRef.current)
      }

      const assistantMsg: ChatMessage = { role: 'assistant', text: outputRef.current }
      messagesRef.current = [...messagesRef.current, assistantMsg]
      setMessages(messagesRef.current)
      outputRef.current = ''
      setStreamingOutput('')
      setStatus('ready')
    } catch (err) {
      if ((err as Error).name === 'AbortError') return
      setStatus('error')
      setError(String(err))
    } finally {
      abortControllerRef.current = null
    }
  }

  function clearHistory() {
    messagesRef.current = []
    setMessages([])
    outputRef.current = ''
    setStreamingOutput('')
    setError(null)
  }

  return {
    status,
    downloadProgress,
    webgpuAvailable: webgpu,
    isCloudFallback: desktop && !webgpu,
    isDesktopBrowser: desktop,
    messages,
    streamingOutput,
    error,
    generate,
    abort,
    clearHistory,
  }
}
