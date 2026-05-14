import { startTransition, useEffect, useRef, useState } from 'react'
import { Layout, type AppView } from './components/Layout'
import { Dashboard } from './components/Dashboard'
import { LandingPage } from './components/LandingPage'
import { ChatPanel } from './components/ChatPanel'
import { loadCorpus, type CorpusDoc, type CorpusPayload } from './generated/corpus'

const VIEW_STORAGE_KEY = 'humane-reader:last-view'
const LANDING_VISITED_KEY = 'humane-reader:landing-visited'
const ACTIVE_PATH_STORAGE_KEY = 'humane-reader:active-path'

interface PendingDocTarget {
  id: string
  headingSlug?: string
}

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
    value === 'settings' ||
    value === 'chat'
  ) {
    // Map legacy 'overview' and 'settings' → 'home'.
    return (value === 'overview' || value === 'settings') ? 'home' : value
  }

  return 'home'
}

export default function App() {
  const [showLanding, setShowLanding] = useState(() =>
    typeof window !== 'undefined'
      ? window.location.hash === '' && window.localStorage.getItem(LANDING_VISITED_KEY) !== 'true'
      : false
  )
  // true only when user clicks the logo from inside the reader, so the landing hero returns directly to reading.
  const [logoReturn, setLogoReturn] = useState(false)
  const [view, setView] = useState<AppView>(readStoredView)
  const [corpus, setCorpus] = useState<CorpusPayload | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [readingProgress, setReadingProgress] = useState(0)
  const [recentDocs, setRecentDocs] = useState<CorpusDoc[]>([])
  const [shelfDocs, setShelfDocs] = useState<CorpusDoc[]>([])
  const [shelfLabel, setShelfLabel] = useState('')
  const [corpusQuery, setCorpusQuery] = useState('')
  const [pendingDocTarget, setPendingDocTarget] = useState<PendingDocTarget | null>(null)
  const [pendingPathId, setPendingPathId] = useState<string | null>(null)

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

  function handleSelectNavDoc(doc: CorpusDoc, headingSlug?: string) {
    const nextView = viewForDocSection(doc.section)
    // Pre-write the target doc so Dashboard's view-change effect restores the
    // right one from localStorage (mirrors handleSelectQuickDoc inside Dashboard).
    window.localStorage.setItem(`humane-reader:selected-doc:${nextView}`, doc.id)
    handleViewChange(nextView)
    // Also set pendingDocTarget for the same-view case where the view effect won't fire.
    setPendingDocTarget({ id: doc.id, headingSlug })
  }

  // Internal view changes (Read Next, doc links) always start at the top.
  function handleViewChange(nextView: AppView) {
    setView(nextView)
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
    })
  }

  function handleEnterFromLanding(pathId?: string) {
    window.localStorage.setItem(LANDING_VISITED_KEY, 'true')
    if (pathId) {
      window.localStorage.setItem(ACTIVE_PATH_STORAGE_KEY, pathId)
      setPendingPathId(pathId)
      setView('constitution') // will be overridden by handleStartPath in Dashboard
    }
    setLogoReturn(false)
    setShowLanding(false)
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  }

  function handleLogoClick() {
    setLogoReturn(true)
    setShowLanding(true)
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  }

  if (showLanding) {
    return <LandingPage onEnter={handleEnterFromLanding} returningVisitor={logoReturn} />
  }

  return (
    <Layout
      activeNav={view}
      onNavChange={handleNavChange}
      onLogoClick={handleLogoClick}
      readingProgress={readingProgress}
      recentDocs={recentDocs}
      shelfDocs={shelfDocs}
      shelfLabel={shelfLabel}
      onSelectDoc={handleSelectNavDoc}
      allDocs={corpus?.docs ?? []}
    >
      {view === 'chat' ? (
        <ChatPanel />
      ) : (
        <Dashboard
          view={view}
          corpus={corpus}
          loadError={loadError}
          onViewChange={handleViewChange}
          onProgressChange={setReadingProgress}
          onNavDocsChange={handleNavDocsChange}
          corpusQuery={corpusQuery}
          onCorpusQueryChange={setCorpusQuery}
          pendingDocTarget={pendingDocTarget}
          onPendingDocTargetConsumed={() => setPendingDocTarget(null)}
          pendingPathId={pendingPathId}
          onPendingPathConsumed={() => setPendingPathId(null)}
        />
      )}
    </Layout>
  )
}
