import { describe, it, expect } from 'vitest'
import { parseMarkdown } from './markdown'
import type { CorpusDoc } from '../generated/corpus'

function makeDoc(content: string, headings: { level: number; text: string; slug: string }[] = []): CorpusDoc {
  return {
    id: 'test',
    path: 'test.md',
    section: 'annex',
    title: 'Test',
    status: '',
    statusBucket: 'reference',
    summary: '',
    content,
    headings,
    wordCount: 0,
    headingCount: 0,
  }
}

describe('parseMarkdown', () => {
  it('parses h1 heading', () => {
    const blocks = parseMarkdown(makeDoc('# Hello', [{ level: 1, text: 'Hello', slug: 'hello' }]))
    expect(blocks).toMatchObject([{ type: 'heading', level: 1, text: 'Hello', slug: 'hello' }])
  })

  it('parses h3 heading', () => {
    const blocks = parseMarkdown(makeDoc('### Sub', [{ level: 3, text: 'Sub', slug: 'sub' }]))
    expect(blocks).toMatchObject([{ type: 'heading', level: 3, text: 'Sub', slug: 'sub' }])
  })

  it('parses ordered list', () => {
    const blocks = parseMarkdown(makeDoc('1. Alpha\n2. Beta'))
    expect(blocks).toMatchObject([{ type: 'list', ordered: true, items: ['Alpha', 'Beta'] }])
  })

  it('parses unordered list', () => {
    const blocks = parseMarkdown(makeDoc('- Foo\n- Bar'))
    expect(blocks).toMatchObject([{ type: 'list', ordered: false, items: ['Foo', 'Bar'] }])
  })

  it('parses code fence with language', () => {
    const blocks = parseMarkdown(makeDoc('```ts\nconst x = 1\n```'))
    expect(blocks).toMatchObject([{ type: 'code', language: 'ts', code: 'const x = 1' }])
  })

  it('parses mermaid block', () => {
    const blocks = parseMarkdown(makeDoc('```mermaid\ngraph TD\n```'))
    expect(blocks).toMatchObject([{ type: 'mermaid', code: 'graph TD' }])
  })

  it('parses blockquote with interleaved table', () => {
    const content = [
      '> **At a glance**',
      '> | | |',
      '> |---|---|',
      '> | **Purpose** | Does stuff |',
    ].join('\n')
    const blocks = parseMarkdown(makeDoc(content))
    // Should produce a quote block for the text line and table blocks for the table rows
    const types = blocks.map(b => b.type)
    expect(types).toContain('quote')
    expect(types).toContain('table')
  })

  it('parses plain paragraph', () => {
    const blocks = parseMarkdown(makeDoc('Hello world'))
    expect(blocks).toMatchObject([{ type: 'paragraph', text: 'Hello world' }])
  })

  it('strips YAML frontmatter', () => {
    const content = '---\ntitle: Test\n---\n# After frontmatter'
    const blocks = parseMarkdown(makeDoc(content, [{ level: 1, text: 'After frontmatter', slug: 'after-frontmatter' }]))
    expect(blocks[0]).toMatchObject({ type: 'heading', text: 'After frontmatter' })
  })
})
