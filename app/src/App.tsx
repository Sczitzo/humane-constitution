import { startTransition, useEffect, useRef, useState } from 'react'
import { Layout, type AppView } from './components/Layout'
import { Dashboard } from './components/Dashboard'
import { loadCorpus, type CorpusDoc, type CorpusPayload } from './generated/corpus'

const VIEW_STORAGE_KEY = 'humane-reader:last-view'

function viewForDocSection(section: string): AppView {
  if (section === 'constitution' || section === 'founding_order') return 'constitution'
  if (section === 'annex') return 'annexes'
  if (section === 'registry') return 'registries'
  return 'home'
}

function readStoredView(): AppView {
  if (typeof window === 'undefined') {
    return 'home'
  }

  const value = window.localStorage.getItem(VIEW_STORAGE_KEY)
  if (
    value === 'home' ||
    value === 'overview' ||
    value === 'constitution' ||
    value === 'annexes' ||
    value === 'registries' ||
    value === 'topics' ||
    value === 'paths' ||
    value === 'validation' ||
    value === 'settings'
  ) {
    // Map legacy 'overview' and 'settings' → 'home'.
    return (value === 'overview' || value === 'settings') ? 'home' : value
  }

  return 'home'
}

export default function App() {
  const [view, setView] = useState<AppView>(readStoredView)
  const [corpus, setCorpus] = useState<CorpusPayload | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [readingProgress, setReadingProgress] = useState(0)
  const [recentDocs, setRecentDocs] = useState<CorpusDoc[]>([])
  const [shelfDocs, setShelfDocs] = useState<CorpusDoc[]>([])
  const [shelfLabel, setShelfLabel] = useState('')
  const [corpusQuery, setCorpusQuery] = useState('')
  const [pendingDocId, setPendingDocId] = useState<string | null>(null)

  // Remembers window scroll position for each view so the nav bar can restore it.
  const scrollPositions = useRef<Map<AppView, number>>(new Map())

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

  // Nav-bar click: save the current position, switch, then restore or jump to top.
  function handleNavChange(nextView: AppView) {
    scrollPositions.current.set(view, window.scrollY)
    setReadingProgress(0)
    setView(nextView)
    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollPositions.current.get(nextView) ?? 0, behavior: 'instant' })
    })
  }

  function handleNavDocsChange(recent: CorpusDoc[], shelf: CorpusDoc[], label: string) {
    setRecentDocs(recent)
    setShelfDocs(shelf)
    setShelfLabel(label)
  }

  function handleSelectNavDoc(doc: CorpusDoc) {
    const nextView = viewForDocSection(doc.section)
    handleViewChange(nextView)
    setPendingDocId(doc.id)
  }

  // Internal view changes (Read Next, doc links) always start at the top.
  function handleViewChange(nextView: AppView) {
    setView(nextView)
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
    })
  }

  return (
    <Layout
      activeNav={view}
      onNavChange={handleNavChange}
      readingProgress={readingProgress}
      recentDocs={recentDocs}
      shelfDocs={shelfDocs}
      shelfLabel={shelfLabel}
      onSelectDoc={handleSelectNavDoc}
      corpusQuery={corpusQuery}
      onCorpusQueryChange={setCorpusQuery}
    >
      <Dashboard
        view={view}
        corpus={corpus}
        loadError={loadError}
        onViewChange={handleViewChange}
        onProgressChange={setReadingProgress}
        onNavDocsChange={handleNavDocsChange}
        corpusQuery={corpusQuery}
        onCorpusQueryChange={setCorpusQuery}
        pendingDocId={pendingDocId}
        onPendingDocIdConsumed={() => setPendingDocId(null)}
      />
    </Layout>
  )
}
