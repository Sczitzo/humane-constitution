import type { AppView } from '../components/Layout'

// ── Types ────────────────────────────────────────────────────────────────────

export type FontSizeOption = 'sm' | 'md' | 'lg' | 'xl'
export type ColumnWidthOption = 'narrow' | 'normal' | 'wide'
export type ThemeOption = 'light' | 'dark' | 'system'
export type FigureSizeOption = 'linked' | FontSizeOption
export type LineSpacingOption = 'compact' | 'normal' | 'relaxed'
export type ParagraphSpacingOption = 'compact' | 'normal' | 'relaxed'
export type ContrastOption = 'normal' | 'high'
export type MotionOption = 'system' | 'reduced' | 'full'
export type FigureWidthOption = 'column' | 'wide' | 'full'
export type TableViewOption = 'auto' | 'table' | 'cards'

export interface ReaderPreferences {
  fontSize: FontSizeOption
  columnWidth: ColumnWidthOption
  theme: ThemeOption
  figureSize: FigureSizeOption
  lineSpacing: LineSpacingOption
  paragraphSpacing: ParagraphSpacingOption
  contrast: ContrastOption
  motion: MotionOption
  figureWidth: FigureWidthOption
  tableView: TableViewOption
}

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
const FIGURE_SIZE_KEY  = 'humane-reader:figure-size'
const LINE_SPACING_KEY = 'humane-reader:line-spacing'
const PARAGRAPH_SPACING_KEY = 'humane-reader:paragraph-spacing'
const CONTRAST_KEY     = 'humane-reader:contrast'
const MOTION_KEY       = 'humane-reader:motion'
const FIGURE_WIDTH_KEY = 'humane-reader:figure-width'
const TABLE_VIEW_KEY   = 'humane-reader:table-view'

const FONT_SIZE_VALUES: Record<FontSizeOption, string> = {
  sm: '14px', md: '16px', lg: '18px', xl: '20px',
}
const COLUMN_WIDTH_VALUES: Record<ColumnWidthOption, string> = {
  narrow: '38rem', normal: '52rem', wide: '68rem',
}
const LINE_HEIGHT_VALUES: Record<LineSpacingOption, string> = {
  compact: '1.55', normal: '1.72', relaxed: '1.88',
}
const PARAGRAPH_GAP_VALUES: Record<ParagraphSpacingOption, string> = {
  compact: '0.85rem', normal: '1.35rem', relaxed: '1.75rem',
}
const TERM_GAP_VALUES: Record<ParagraphSpacingOption, string> = {
  compact: '1.6rem', normal: '2.4rem', relaxed: '3rem',
}
const FIGURE_MIN_WIDTH_VALUES: Record<FontSizeOption, string> = {
  sm: '0px', md: '0px', lg: '760px', xl: '880px',
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

export function readFigureSize(): FigureSizeOption {
  const v = typeof window !== 'undefined' ? window.localStorage.getItem(FIGURE_SIZE_KEY) : null
  return (v === 'linked' || v === 'sm' || v === 'md' || v === 'lg' || v === 'xl') ? v : 'linked'
}

export function readLineSpacing(): LineSpacingOption {
  const v = typeof window !== 'undefined' ? window.localStorage.getItem(LINE_SPACING_KEY) : null
  return (v === 'compact' || v === 'normal' || v === 'relaxed') ? v : 'normal'
}

export function readParagraphSpacing(): ParagraphSpacingOption {
  const v = typeof window !== 'undefined' ? window.localStorage.getItem(PARAGRAPH_SPACING_KEY) : null
  return (v === 'compact' || v === 'normal' || v === 'relaxed') ? v : 'normal'
}

export function readContrast(): ContrastOption {
  const v = typeof window !== 'undefined' ? window.localStorage.getItem(CONTRAST_KEY) : null
  return v === 'high' ? 'high' : 'normal'
}

export function readMotion(): MotionOption {
  const v = typeof window !== 'undefined' ? window.localStorage.getItem(MOTION_KEY) : null
  return (v === 'system' || v === 'reduced' || v === 'full') ? v : 'system'
}

export function readFigureWidth(): FigureWidthOption {
  const v = typeof window !== 'undefined' ? window.localStorage.getItem(FIGURE_WIDTH_KEY) : null
  return (v === 'column' || v === 'wide' || v === 'full') ? v : 'column'
}

export function readTableView(): TableViewOption {
  const v = typeof window !== 'undefined' ? window.localStorage.getItem(TABLE_VIEW_KEY) : null
  return (v === 'auto' || v === 'table' || v === 'cards') ? v : 'auto'
}

export function readReaderPreferences(): ReaderPreferences {
  return {
    fontSize: readFontSize(),
    columnWidth: readColumnWidth(),
    theme: readTheme(),
    figureSize: readFigureSize(),
    lineSpacing: readLineSpacing(),
    paragraphSpacing: readParagraphSpacing(),
    contrast: readContrast(),
    motion: readMotion(),
    figureWidth: readFigureWidth(),
    tableView: readTableView(),
  }
}

export function applyFontSize(size: FontSizeOption) {
  document.documentElement.style.setProperty('--reader-font-size', FONT_SIZE_VALUES[size])
}

export function applyColumnWidth(width: ColumnWidthOption) {
  document.documentElement.style.setProperty('--reader-column-width', COLUMN_WIDTH_VALUES[width])
}

export function applyLineSpacing(spacing: LineSpacingOption) {
  document.documentElement.style.setProperty('--reader-line-height', LINE_HEIGHT_VALUES[spacing])
}

export function applyParagraphSpacing(spacing: ParagraphSpacingOption) {
  document.documentElement.style.setProperty('--reader-paragraph-gap', PARAGRAPH_GAP_VALUES[spacing])
  document.documentElement.style.setProperty('--reader-term-gap', TERM_GAP_VALUES[spacing])
}

export function applyFigureSize(size: FigureSizeOption, fontSize: FontSizeOption = readFontSize()) {
  const effectiveSize = size === 'linked' ? fontSize : size
  document.documentElement.style.setProperty('--reader-figure-min-width', FIGURE_MIN_WIDTH_VALUES[effectiveSize])
}

export function applyContrast(contrast: ContrastOption) {
  document.documentElement.setAttribute('data-contrast', contrast)
}

export function resolveMotion(pref: MotionOption): 'reduced' | 'full' {
  if (pref === 'system') {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduced' : 'full'
  }
  return pref
}

export function applyMotion(pref: MotionOption) {
  document.documentElement.setAttribute('data-motion-preference', pref)
  document.documentElement.setAttribute('data-motion', resolveMotion(pref))
}

export function applyFigureWidth(width: FigureWidthOption) {
  document.documentElement.setAttribute('data-figure-width', width)
}

export function applyTableView(view: TableViewOption) {
  document.documentElement.setAttribute('data-table-view', view)
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

export function applyReaderPreferences(preferences: ReaderPreferences) {
  applyFontSize(preferences.fontSize)
  applyColumnWidth(preferences.columnWidth)
  applyTheme(preferences.theme)
  applyFigureSize(preferences.figureSize, preferences.fontSize)
  applyLineSpacing(preferences.lineSpacing)
  applyParagraphSpacing(preferences.paragraphSpacing)
  applyContrast(preferences.contrast)
  applyMotion(preferences.motion)
  applyFigureWidth(preferences.figureWidth)
  applyTableView(preferences.tableView)
}

export function storeFontSize(size: FontSizeOption) {
  window.localStorage.setItem(FONT_SIZE_KEY, size)
  applyFontSize(size)
  applyFigureSize(readFigureSize(), size)
}

export function storeColumnWidth(width: ColumnWidthOption) {
  window.localStorage.setItem(COLUMN_WIDTH_KEY, width)
  applyColumnWidth(width)
}

export function storeTheme(theme: ThemeOption) {
  window.localStorage.setItem(THEME_KEY, theme)
  applyTheme(theme)
}

export function storeFigureSize(size: FigureSizeOption) {
  window.localStorage.setItem(FIGURE_SIZE_KEY, size)
  applyFigureSize(size, readFontSize())
}

export function storeLineSpacing(spacing: LineSpacingOption) {
  window.localStorage.setItem(LINE_SPACING_KEY, spacing)
  applyLineSpacing(spacing)
}

export function storeParagraphSpacing(spacing: ParagraphSpacingOption) {
  window.localStorage.setItem(PARAGRAPH_SPACING_KEY, spacing)
  applyParagraphSpacing(spacing)
}

export function storeContrast(contrast: ContrastOption) {
  window.localStorage.setItem(CONTRAST_KEY, contrast)
  applyContrast(contrast)
}

export function storeMotion(motion: MotionOption) {
  window.localStorage.setItem(MOTION_KEY, motion)
  applyMotion(motion)
}

export function storeFigureWidth(width: FigureWidthOption) {
  window.localStorage.setItem(FIGURE_WIDTH_KEY, width)
  applyFigureWidth(width)
}

export function storeTableView(view: TableViewOption) {
  window.localStorage.setItem(TABLE_VIEW_KEY, view)
  applyTableView(view)
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
