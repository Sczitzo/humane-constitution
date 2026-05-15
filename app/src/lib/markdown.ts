import type { CorpusDoc } from '../generated/corpus'

// ── Types ───────────────────────────────────────────────────────────────────

export interface MarkdownHeading {
  type: 'heading'
  level: number
  text: string
  slug: string
}

export interface MarkdownParagraph {
  type: 'paragraph'
  text: string
}

export interface MarkdownList {
  type: 'list'
  ordered: boolean
  items: string[]
}

export interface MarkdownCode {
  type: 'code'
  code: string
  language: string
}

export interface MarkdownMermaid {
  type: 'mermaid'
  code: string
}

export interface MarkdownStatechart {
  type: 'statechart'
  code: string
}

export interface MarkdownQuote {
  type: 'quote'
  text: string
}

export interface MarkdownRule {
  type: 'rule'
}

export interface MarkdownTable {
  type: 'table'
  lines: string[]
}

export type MarkdownBlock =
  | MarkdownHeading
  | MarkdownParagraph
  | MarkdownList
  | MarkdownCode
  | MarkdownMermaid
  | MarkdownStatechart
  | MarkdownQuote
  | MarkdownRule
  | MarkdownTable

// ── Block predicates ─────────────────────────────────────────────────────────

export function isHeadingLine(trimmed: string): boolean {
  return /^#{1,6}\s+/.test(trimmed)
}

export function isRuleLine(trimmed: string): boolean {
  return /^([-*_]\s*){3,}$/.test(trimmed)
}

export function isCodeFence(trimmed: string): boolean {
  return /^```/.test(trimmed)
}

export function isOrderedListLine(trimmed: string): boolean {
  return /^\d+\.\s+/.test(trimmed)
}

export function isUnorderedListLine(trimmed: string): boolean {
  return /^[-*]\s+/.test(trimmed)
}

export function isTableLine(trimmed: string): boolean {
  return trimmed.startsWith('|')
}

export function isQuoteLine(trimmed: string): boolean {
  return trimmed.startsWith('>')
}

// ── Parser ───────────────────────────────────────────────────────────────────

export function parseMarkdown(doc: CorpusDoc): MarkdownBlock[] {
  const rawLines = doc.content.split('\n')
  // Strip YAML frontmatter (--- ... ---) at the top of the file.
  let start = 0
  if (rawLines[0]?.trim() === '---') {
    const end = rawLines.findIndex((l, i) => i > 0 && l.trim() === '---')
    if (end !== -1) start = end + 1
  }
  const lines = rawLines.slice(start)
  const blocks: MarkdownBlock[] = []
  let index = 0
  let headingIndex = 0

  while (index < lines.length) {
    const rawLine = lines[index]
    const trimmed = rawLine.trim()

    if (!trimmed) {
      index += 1
      continue
    }

    if (isCodeFence(trimmed)) {
      const language = trimmed.replace(/^```/, '').trim()
      index += 1
      const codeLines: string[] = []
      while (index < lines.length && !isCodeFence(lines[index].trim())) {
        codeLines.push(lines[index])
        index += 1
      }
      if (index < lines.length) {
        index += 1
      }
      const code = codeLines.join('\n')
      if (language === 'mermaid') {
        blocks.push({ type: 'mermaid', code })
      } else if (language === 'statechart') {
        blocks.push({ type: 'statechart', code })
      } else {
        blocks.push({ type: 'code', code, language })
      }
      continue
    }

    if (isHeadingLine(trimmed)) {
      const level = trimmed.match(/^#{1,6}/)?.[0].length ?? 1
      const text = trimmed.replace(/^#{1,6}\s+/, '').trim()
      const heading = doc.headings[headingIndex]
      blocks.push({
        type: 'heading',
        level,
        text,
        slug: heading?.slug ?? `${doc.id}-heading-${headingIndex + 1}`,
      })
      headingIndex += 1
      index += 1
      continue
    }

    if (isRuleLine(trimmed)) {
      blocks.push({ type: 'rule' })
      index += 1
      continue
    }

    if (isTableLine(trimmed)) {
      const tableLines: string[] = []
      while (index < lines.length && isTableLine(lines[index].trim())) {
        tableLines.push(lines[index])
        index += 1
      }
      blocks.push({ type: 'table', lines: tableLines })
      continue
    }

    if (isQuoteLine(trimmed)) {
      const quoteLines: string[] = []
      while (index < lines.length && isQuoteLine(lines[index].trim())) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ''))
        index += 1
      }
      // Split quote contents into interleaved text-runs and embedded tables.
      // A line like "| **Purpose** | ... |" inside a blockquote is a table row.
      const segments: Array<{ kind: 'text'; lines: string[] } | { kind: 'table'; lines: string[] }> = []
      let seg: { kind: 'text'; lines: string[] } | { kind: 'table'; lines: string[] } = { kind: 'text', lines: [] }
      for (const ql of quoteLines) {
        const isTableRow = isTableLine(ql.trim())
        if (isTableRow && seg.kind !== 'table') {
          if (seg.lines.length) segments.push(seg)
          seg = { kind: 'table', lines: [] }
        } else if (!isTableRow && seg.kind !== 'text') {
          if (seg.lines.length) segments.push(seg)
          seg = { kind: 'text', lines: [] }
        }
        seg.lines.push(ql)
      }
      if (seg.lines.length) segments.push(seg)
      for (const s of segments) {
        if (s.kind === 'table') {
          blocks.push({ type: 'table', lines: s.lines })
        } else {
          blocks.push({ type: 'quote', text: s.lines.join(' ') })
        }
      }
      continue
    }

    if (isOrderedListLine(trimmed) || isUnorderedListLine(trimmed)) {
      const ordered = isOrderedListLine(trimmed)
      const items: string[] = []
      while (index < lines.length) {
        const current = lines[index].trim()
        if (!current) {
          index += 1
          break
        }
        if (ordered && !isOrderedListLine(current)) {
          break
        }
        if (!ordered && !isUnorderedListLine(current)) {
          break
        }
        items.push(current.replace(ordered ? /^\d+\.\s+/ : /^[-*]\s+/, '').trim())
        index += 1
      }
      blocks.push({ type: 'list', ordered, items })
      continue
    }

    const paragraphLines: string[] = []
    while (index < lines.length) {
      const current = lines[index]
      const currentTrimmed = current.trim()
      if (!currentTrimmed) {
        index += 1
        break
      }
      if (
        isHeadingLine(currentTrimmed) ||
        isRuleLine(currentTrimmed) ||
        isCodeFence(currentTrimmed) ||
        isTableLine(currentTrimmed) ||
        isQuoteLine(currentTrimmed) ||
        isOrderedListLine(currentTrimmed) ||
        isUnorderedListLine(currentTrimmed)
      ) {
        break
      }
      paragraphLines.push(currentTrimmed)
      index += 1
    }
    blocks.push({ type: 'paragraph', text: paragraphLines.join(' ') })
  }

  return blocks
}
