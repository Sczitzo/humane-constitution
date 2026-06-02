import type { AppView } from '../components/Layout'

// ── Types ────────────────────────────────────────────────────────────────────

export type FontSizeOption = 'sm' | 'md' | 'lg' | 'xl'
export type ColumnWidthOption = 'narrow' | 'normal' | 'wide'
export type ThemeOption = 'light' | 'dark' | 'system'

export interface PaneScrollState {
  shelf: number
  reader: number
  outline: number
}

// ── Constants ─────────────────────────────────────────────────────────────────

export const EMPTY_PANE_SCROLL_STATE: PaneScrollState = {
  shelf: 0,
  reader: 0,
  outline: 0,
}

const FONT_SIZE_KEY    = 'humane-reader:font-size'
const COLUMN_WIDTH_KEY = 'humane-reader:column-width'
const THEME_KEY        = 'humane-reader:theme'

const FONT_SIZE_VALUES: Record<FontSizeOption, string> = {
  sm: '14px', md: '16px', lg: '18px', xl: '20px',
}
const COLUMN_WIDTH_VALUES: Record<ColumnWidthOption, string> = {
  narrow: '38rem', normal: '52rem', wide: '68rem',
}

// ── Appearance ────────────────────────────────────────────────────────────────

export function readFontSize(): FontSizeOption {
  const v = typeof window !== 'undefined' ? window.localStorage.getItem(FONT_SIZE_KEY) : null
  return (v === 'sm' || v === 'md' || v === 'lg' || v === 'xl') ? v : 'md'
}

export function readColumnWidth(): ColumnWidthOption {
  const v = typeof window !== 'undefined' ? window.localStorage.getItem(COLUMN_WIDTH_KEY) : null
  return (v === 'narrow' || v === 'normal' || v === 'wide') ? v : 'normal'
}

export function applyFontSize(size: FontSizeOption) {
  document.documentElement.style.setProperty('--reader-font-size', FONT_SIZE_VALUES[size])
  document.documentElement.style.setProperty('--panel-font-size', FONT_SIZE_VALUES[size])
}

export function applyColumnWidth(width: ColumnWidthOption) {
  document.documentElement.style.setProperty('--reader-column-width', COLUMN_WIDTH_VALUES[width])
}

export function readTheme(): ThemeOption {
  const v = typeof window !== 'undefined' ? window.localStorage.getItem(THEME_KEY) : null
  return (v === 'light' || v === 'dark' || v === 'system') ? v : 'system'
}

export function resolveTheme(pref: ThemeOption): 'light' | 'dark' {
  if (pref === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return pref
}

export function applyTheme(pref: ThemeOption) {
  const resolved = resolveTheme(pref)
  if (resolved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.removeAttribute('data-theme')
  }
}

// ── Storage keys ──────────────────────────────────────────────────────────────

export function selectedDocStorageKey(view: AppView): string {
  return `humane-reader:selected-doc:${view}`
}

export function paneScrollStorageKey(view: AppView): string {
  return `humane-reader:pane-scroll:${view}`
}

// ── Readers ───────────────────────────────────────────────────────────────────

export function readStoredSelectedDocId(view: AppView): string | null {
  if (typeof window === 'undefined') {
    return null
  }
  return window.localStorage.getItem(selectedDocStorageKey(view))
}

export function readStoredDocList(storageKey: string): string[] {
  if (typeof window === 'undefined') {
    return []
  }
  const raw = window.localStorage.getItem(storageKey)
  if (!raw) {
    return []
  }
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === 'string') : []
  } catch {
    return []
  }
}

export function readStoredBoolean(storageKey: string): boolean {
  if (typeof window === 'undefined') {
    return false
  }
  return window.localStorage.getItem(storageKey) === 'true'
}

export function readStoredPaneScroll(view: AppView): PaneScrollState {
  if (typeof window === 'undefined') {
    return EMPTY_PANE_SCROLL_STATE
  }
  const raw = window.localStorage.getItem(paneScrollStorageKey(view))
  if (!raw) {
    return EMPTY_PANE_SCROLL_STATE
  }
  try {
    const parsed = JSON.parse(raw) as Partial<PaneScrollState>
    return {
      shelf: typeof parsed.shelf === 'number' ? parsed.shelf : 0,
      reader: typeof parsed.reader === 'number' ? parsed.reader : 0,
      outline: typeof parsed.outline === 'number' ? parsed.outline : 0,
    }
  } catch {
    return EMPTY_PANE_SCROLL_STATE
  }
}
