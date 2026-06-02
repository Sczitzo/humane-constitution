import { useEffect, useState } from 'react'
import { loadCorpus, type CorpusPayload } from '../../generated/corpus'
import { PreviewA } from './PreviewA'
import { PreviewB } from './PreviewB'
import { PreviewC } from './PreviewC'

export function PreviewRoot({ variant }: { variant: 'a' | 'b' | 'c' }) {
  const [corpus, setCorpus] = useState<CorpusPayload | null>(null)

  useEffect(() => {
    loadCorpus().then(setCorpus).catch(console.error)
  }, [])

  if (!corpus) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'Inter, sans-serif', color: '#888', fontSize: 14 }}>
        Loading corpus…
      </div>
    )
  }

  if (variant === 'a') return <PreviewA corpus={corpus} />
  if (variant === 'b') return <PreviewB corpus={corpus} />
  return <PreviewC corpus={corpus} />
}
