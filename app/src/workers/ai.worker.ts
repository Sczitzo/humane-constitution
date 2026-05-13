import { pipeline, TextStreamer, env } from '@huggingface/transformers'
import type { ProgressInfo, TextGenerationPipeline } from '@huggingface/transformers'

// Force CDN fetch — never attempt local model lookup
env.allowLocalModels = false

const MODEL_ID = 'onnx-community/gemma-4-E2B-it-ONNX'
const DTYPE = 'q4f16'

let generator: TextGenerationPipeline | null = null
let loadPromise: Promise<void> | null = null

// Accumulate per-file byte counts so overall progress never jumps backwards
const fileProgress = new Map<string, { loaded: number; total: number }>()

function handleProgress(info: ProgressInfo) {
  if (info.status !== 'download' && info.status !== 'progress') return
  const p = info as { file?: string; loaded?: number; total?: number; progress?: number }
  if (p.file && typeof p.loaded === 'number' && typeof p.total === 'number' && p.total > 0) {
    fileProgress.set(p.file, { loaded: p.loaded, total: p.total })
    let totalLoaded = 0, totalSize = 0
    for (const f of fileProgress.values()) { totalLoaded += f.loaded; totalSize += f.total }
    self.postMessage({ type: 'progress', progress: Math.round((totalLoaded / totalSize) * 100) })
  } else if (typeof p.progress === 'number') {
    self.postMessage({ type: 'progress', progress: Math.round(p.progress) })
  }
}

async function loadModel(): Promise<void> {
  if (generator) return
  if (loadPromise) return loadPromise

  loadPromise = (async () => {
    self.postMessage({ type: 'progress', progress: 0 })
    generator = await pipeline('text-generation', MODEL_ID, {
      dtype: DTYPE as 'q4f16',
      device: 'webgpu',
      progress_callback: handleProgress,
    }) as TextGenerationPipeline
    self.postMessage({ type: 'ready' })
  })()

  return loadPromise
}

self.addEventListener('message', async (event: MessageEvent) => {
  const msg = event.data as
    | { type: 'PREFETCH_MODEL' }
    | { type: 'generate'; messages: { role: 'system' | 'user' | 'assistant'; content: string }[] }

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

    const { messages } = msg

    const makeStreamer = () => new TextStreamer(
      generator!.tokenizer,
      {
        skip_prompt: true,
        skip_special_tokens: true,
        callback_function: (token: string) => {
          self.postMessage({ type: 'token', token })
        },
      },
    )

    const runInference = () => generator!(messages, {
      max_new_tokens: 600,
      do_sample: false,
      streamer: makeStreamer(),
    })

    try {
      await runInference()
      self.postMessage({ type: 'done' })
    } catch (err) {
      const errMsg = String(err)
      // WebGPU device lost during inference — surface the error, no WASM retry
      self.postMessage({ type: 'error', message: errMsg })
    }
  }
})
