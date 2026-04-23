import { startTransition, useEffect, useState } from 'react'
import { Layout, type AppView } from './components/Layout'
import { Dashboard } from './components/Dashboard'
import { loadCorpus, type CorpusPayload } from './generated/corpus'

export default function App() {
  const [view, setView] = useState<AppView>('overview')
  const [corpus, setCorpus] = useState<CorpusPayload | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    void loadCorpus()
      .then((payload) => {
        if (cancelled) {
          return
        }
        startTransition(() => setCorpus(payload))
      })
      .catch((error) => {
        if (cancelled) {
          return
        }
        const message = error instanceof Error ? error.message : 'Unknown corpus load failure.'
        setLoadError(message)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <Layout activeNav={view} onNavChange={setView}>
      <Dashboard view={view} corpus={corpus} loadError={loadError} />
    </Layout>
  )
}
