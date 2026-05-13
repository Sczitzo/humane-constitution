import { pipeline, TextStreamer, env } from '@huggingface/transformers'
import type { ProgressInfo, TextGenerationPipeline } from '@huggingface/transformers'

// Force CDN fetch — never attempt local model lookup
env.allowLocalModels = false

const MODEL_ID = 'onnx-community/gemma-4-E2B-it-ONNX'
const DTYPE = 'q4f16'

let generator: TextGenerationPipeline | null = null
let loadPromise: Promise<void> | null = null

function handleProgress(info: ProgressInfo) {
  if (info.status === 'download' || info.status === 'progress') {
    const p = (info as { progress?: number }).progress
    if (typeof p === 'number') {
      self.postMessage({ type: 'progress', progress: Math.round(p) })
    }
  }
}

async function loadModel(): Promise<void> {
  if (generator) return
  if (loadPromise) return loadPromise

  loadPromise = (async () => {
    self.postMessage({ type: 'progress', progress: 0 })

    const opts = {
      dtype: DTYPE as 'q4f16',
      progress_callback: handleProgress,
    }

    try {
      generator = await pipeline('text-generation', MODEL_ID, {
        ...opts,
        device: 'webgpu',
      }) as TextGenerationPipeline
    } catch {
      // WebGPU unavailable — fall back to single-threaded WASM
      self.postMessage({ type: 'webgpu_fallback' })
      generator = await pipeline('text-generation', MODEL_ID, {
        ...opts,
        device: 'wasm',
      }) as TextGenerationPipeline
    }

    self.postMessage({ type: 'ready' })
  })()

  return loadPromise
}

self.addEventListener('message', async (event: MessageEvent) => {
  const msg = event.data as
    | { type: 'PREFETCH_MODEL' }
    | { type: 'generate'; query: string; context: string }

  if (msg.type === 'PREFETCH_MODEL') {
    try {
      await loadModel()
    } catch (err) {
      self.postMessage({ type: 'error', message: String(err) })
    }
    return
  }

  if (msg.type === 'generate') {
    try {
      await loadModel()
    } catch (err) {
      self.postMessage({ type: 'error', message: String(err) })
      return
    }

    const { query, context } = msg

    const messages = [
      {
        role: 'system' as const,
        content:
          'You are the authoritative expert on the Humane Constitution corpus — a collection of governance documents for ethical AI. ' +
          'Answer questions using only information in the corpus. ' +
          'Cite every factual claim as [Document Title](docId#heading-slug) using the exact IDs and slugs from the context provided. ' +
          'Use Markdown: ## headers for multi-part answers, **bold** for key terms. ' +
          'If the corpus does not contain the answer, say so — do not speculate.',
      },
      {
        role: 'user' as const,
        content: `## Relevant corpus documents\n\n${context}\n\n## Question\n\n${query}`,
      },
    ]

    try {
      const streamer = new TextStreamer(
        generator!.tokenizer,
        {
          skip_prompt: true,
          skip_special_tokens: true,
          callback_function: (token: string) => {
            self.postMessage({ type: 'token', token })
          },
        },
      )

      await generator!(messages, {
        max_new_tokens: 600,
        do_sample: false,
        streamer,
      })

      self.postMessage({ type: 'done' })
    } catch (err) {
      self.postMessage({ type: 'error', message: String(err) })
    }
  }
})
