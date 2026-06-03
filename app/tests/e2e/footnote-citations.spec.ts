// Regression coverage for the footnote / citation hover-card feature added to the
// reader: inline [^id] markers render as superscript citations, hovering shows a
// reference card, clicking opens a Google fact-check search, and the Sources list
// renders cleanly (no raw markdown markers).

import { expect, test, type Page } from '@playwright/test'

async function openUsefulHistory(page: Page): Promise<void> {
  await page.setViewportSize({ width: 1024, height: 900 })
  await page.addInitScript(() => {
    window.localStorage.setItem('humane-reader:landing-visited', 'true')
  })
  await page.goto('/')
  await page.getByTestId('nav-hamburger').click()
  const input = page.locator('#nav-corpus-search')
  await input.fill('Useful History')
  const results = page.locator('#nav-search-results')
  await expect(results).toBeVisible()
  await results.getByRole('button', { name: /Useful History/i }).first().click()
  await expect(page.getByTestId('reader-title')).toBeVisible()
  // Close the nav drawer so its scrim stops intercepting pointer events. The scrim
  // stays in the DOM and toggles to pointer-events-none/opacity-0 when closed.
  const scrim = page.locator('div[aria-hidden="true"].fixed.inset-0.z-50').first()
  await scrim.dispatchEvent('click')
  await expect(scrim).toHaveClass(/pointer-events-none/)
}

test.describe('footnote citation system', () => {
  test('renders superscript citations instead of raw markers', async ({ page }) => {
    await openUsefulHistory(page)
    const refs = page.locator('sup.reader-footnote-ref button')
    await expect(refs.first()).toBeVisible()
    // First citation marker should display a number.
    await expect(refs.first()).toHaveText(/^\d+$/)
    // Raw markdown footnote markers must not leak into the rendered article text.
    const articleText = await page.locator('article.reader-prose').innerText()
    expect(articleText).not.toContain('[^c1-1]')
  })

  test('renders a Sources list', async ({ page }) => {
    await openUsefulHistory(page)
    const sources = page.locator('ol.reader-footnotes').first()
    await expect(sources).toBeVisible()
    await expect(sources.locator('li.reader-footnote-item').first()).toBeVisible()
  })

  test('hovering a citation shows a reference card', async ({ page }) => {
    await openUsefulHistory(page)
    const ref = page.locator('sup.reader-footnote-ref button').first()
    await ref.hover()
    const card = page.locator('[role="tooltip"]')
    await expect(card).toBeVisible()
    await expect(card).toContainText(/Click to fact-check on Google/i)
  })

  test('clicking a citation opens a Google fact-check search in a new tab', async ({ page }) => {
    await openUsefulHistory(page)
    // Stub window.open so we can assert the URL without opening a real tab.
    await page.evaluate(() => {
      ;(window as unknown as { __opened: string[] }).__opened = []
      window.open = (url?: string | URL) => {
        ;(window as unknown as { __opened: string[] }).__opened.push(String(url))
        return null
      }
    })
    await page.locator('sup.reader-footnote-ref button').first().click()
    const opened = await page.evaluate(() => (window as unknown as { __opened: string[] }).__opened)
    expect(opened.length).toBeGreaterThan(0)
    expect(opened[0]).toContain('google.com/search')
    expect(opened[0]).toContain('q=')
  })
})
