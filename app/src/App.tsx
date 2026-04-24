import { startTransition, useEffect, useState } from 'react'
import { Layout, type AppView } from './components/Layout'
import { Dashboard } from './components/Dashboard'
import { loadCorpus, type CorpusPayload } from './generated/corpus'

const VIEW_STORAGE_KEY = 'humane-reader:last-view'

function readStoredView(): AppView {
  if (typeof window === 'undefined') {
    return 'overview'
  }

  const value = window.localStorage.getItem(VIEW_STORAGE_KEY)
  if (
    value === 'overview' ||
    value === 'constitution' ||
    value === 'annexes' ||
    value === 'registries' ||
    value === 'validation' ||
    value === 'settings'
  ) {
    return value
  }

  return 'overview'
}

export default function App() {
  const [view, setView] = useState<AppView>(readStoredView)
  const [corpus, setCorpus] = useState<CorpusPayload | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(VIEW_STORAGE_KEY, view)
  }, [view])

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
      <Dashboard view={view} corpus={corpus} loadError={loadError} onViewChange={setView} />
    </Layout>
  )
}
