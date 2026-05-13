import { useEffect, useRef, useState } from 'react'
import AIWorker from '../workers/ai.worker.ts?worker'

export type AIStatus =
  | 'idle'
  | 'loading'
  | 'ready'
  | 'generating'
  | 'error'
  | 'unsupported'

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

interface AIWorkerHook {
  status: AIStatus
  downloadProgress: number
  webgpuAvailable: boolean
  isDesktopBrowser: boolean
  output: string
  error: string | null
  generate: (query: string, context: string) => void
}

export function useAIWorker(): AIWorkerHook {
  const desktop = isDesktop()
  const [status, setStatus] = useState<AIStatus>(desktop ? 'loading' : 'unsupported')
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [webgpuAvailable, setWebgpuAvailable] = useState(true)
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const outputRef = useRef('')

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
          setOutput(outputRef.current)
          break
        case 'done':
          setStatus('ready')
          break
        case 'error':
          setStatus('error')
          setError(msg.message)
          break
      }
    }

    worker.addEventListener('message', handleMessage)
    return () => worker.removeEventListener('message', handleMessage)
  }, [desktop])

  function generate(query: string, context: string) {
    if (!desktop) return
    outputRef.current = ''
    setOutput('')
    setError(null)
    setStatus('generating')
    getWorker().postMessage({ type: 'generate', query, context })
  }

  return { status, downloadProgress, webgpuAvailable, isDesktopBrowser: desktop, output, error, generate }
}
