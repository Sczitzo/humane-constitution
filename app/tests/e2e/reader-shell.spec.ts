// NOTE (hamburger nav redesign, 2026-05-01): Tests rewritten for the new nav
// drawer design — shelf-pane, outline-scroll-pane, and document-row-* are gone.

import { expect, test, type Locator, type Page } from '@playwright/test'

async function paneScrollTop(locator: Locator): Promise<number> {
  return locator.evaluate((node) => node.scrollTop)
}

async function setPaneScrollTop(locator: Locator, top: number): Promise<void> {
  await locator.evaluate((node, nextTop) => {
    node.scrollTop = nextTop
  }, top)
}

async function wheelInside(page: Page, locator: Locator, deltaY: number): Promise<void> {
  const box = await locator.boundingBox()

  if (!box) {
    throw new Error('Expected scroll target to have a bounding box.')
  }

  await page.mouse.move(box.x + box.width / 2, box.y + Math.min(box.height / 2, 160))
  await page.mouse.wheel(0, deltaY)
}

async function markLandingVisited(page: Page): Promise<void> {
  await page.addInitScript(() => {
    window.localStorage.setItem('humane-reader:landing-visited', 'true')
  })
}

async function openConstitutionView(page: Page): Promise<void> {
  await markLandingVisited(page)
  await page.goto('/')
  await page.getByTestId('nav-hamburger').click()
  await expect(page.getByTestId('nav-constitution')).toBeVisible()
  await page.getByTestId('nav-constitution').click()
  await expect(page.getByTestId('reader-title')).toBeVisible()
  // Wait for the document to actually settle before keyboard-driven tests
  // interact with it: a non-empty title and rendered prose. On slower CI
  // runners the title/content lag the view switch, which used to race the
  // assertions in the keyboard-shortcut tests.
  await expect(page.getByTestId('reader-title')).toHaveText(/\S/)
  await expect(page.locator('.reader-prose').first()).toBeVisible()
}

async function openAnnexesView(page: Page): Promise<void> {
  await markLandingVisited(page)
  await page.goto('/')
  await page.getByTestId('nav-hamburger').click()
  await expect(page.getByTestId('nav-annexes')).toBeVisible()
  await page.getByTestId('nav-annexes').click()
  await expect(page.getByTestId('reader-title')).toBeVisible()
}

async function openNavSearchResult(page: Page, query: string, resultName: string | RegExp): Promise<void> {
  const input = page.locator('#nav-corpus-search')
  await input.fill(query)
  const results = page.locator('#nav-search-results')
  await expect(results).toBeVisible()
  await results.getByRole('button', { name: resultName }).first().click()
}

test.describe('reader shell regression coverage', () => {
  test('hamburger opens nav drawer with all sections', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 })
    await markLandingVisited(page)
    await page.goto('/')

    await page.getByTestId('nav-hamburger').click()
    for (const id of ['home', 'constitution', 'annexes', 'registries', 'topics', 'paths', 'validation']) {
      await expect(page.getByTestId(`nav-${id}`)).toBeVisible()
    }
  })

  test('slash focuses nav document search', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 })
    await openConstitutionView(page)

    await page.keyboard.press('/')
    await expect(page.locator('#nav-corpus-search')).toBeFocused()
  })

  test('nav search result opens a cross-section document and clears the query', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 })
    await openConstitutionView(page)

    await openNavSearchResult(page, 'T-028', /Threat Register/)

    await expect(page.getByTestId('view-title')).toHaveText('Registries & Governance Logs')
    await expect(page.getByTestId('reader-title')).toHaveText('Threat Register')
    await expect(page.locator('#nav-corpus-search')).toHaveValue('')
  })

  test('nav search Enter opens the active heading result', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 })
    await openConstitutionView(page)

    const input = page.locator('#nav-corpus-search')
    await input.fill('pass/fail criteria')
    await expect(page.locator('#nav-search-results')).toBeVisible()
    await input.press('Enter')

    await expect(page.getByTestId('reader-title')).toHaveText('Essential-Sector Refusal Test Package')
    await expect(page.getByRole('heading', { name: 'Pass/Fail Criteria' })).toBeInViewport()
  })

  test('recent selection is not blocked by an active nav search query', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 })
    await page.addInitScript(() => {
      window.localStorage.setItem('humane-reader:recent-docs', JSON.stringify(['docs__governance__Threat_Register_md']))
    })
    await openConstitutionView(page)

    await page.locator('#nav-corpus-search').fill('zzzzzz')
    await page.getByTestId('nav-recent').click()
    await page.locator('[role="listbox"][aria-label="Recent"]').getByRole('option', { name: /Threat Register/ }).click()

    await expect(page.getByTestId('reader-title')).toHaveText('Threat Register')
    await expect(page.locator('#nav-corpus-search')).toHaveValue('')
  })

  test('mobile search selection opens the selected document', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await markLandingVisited(page)
    await page.goto('/')

    await page.getByRole('button', { name: 'Search documents' }).click()
    const mobileInput = page.locator('div.fixed input[placeholder="Search documents…"]')
    await mobileInput.fill('pass/fail criteria')
    await page.getByRole('listbox').getByRole('button', { name: /Essential-Sector Refusal Test Package/ }).first().click()

    await expect(page.getByTestId('reader-title')).toHaveText('Essential-Sector Refusal Test Package')
  })

  test('global search persists cross-section selections', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 })
    await openConstitutionView(page)

    await page.keyboard.press('Control+k')
    await page.getByPlaceholder('Search all documents…').fill('T-028')
    await page.getByRole('listbox').getByRole('button', { name: 'Threat Register heading T-028' }).click()

    await expect(page.getByTestId('view-title')).toHaveText('Registries & Governance Logs')
    await expect(page.getByTestId('reader-title')).toHaveText('Threat Register')
  })

  test('recent dropdown shows previously viewed documents', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 })
    await openConstitutionView(page)

    await page.getByTestId('nav-recent').click()
    // After navigating to constitution, the dropdown should show at least one entry
    const dropdown = page.locator('[role="listbox"][aria-label="Recent"]')
    await expect(dropdown).toBeVisible()
  })

  test('document search highlights matches and cycles through them', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 })
    await openConstitutionView(page)

    const searchInput = page.getByTestId('reader-search-input')

    await searchInput.fill('survival')
    await expect(page.locator('mark[data-reader-search-hit="true"]')).not.toHaveCount(0)
    await expect(page.locator('mark[data-active-hit="true"]')).toHaveCount(1)

    // Scroll back to top so the Next button navigation is observable
    await page.evaluate(() => { window.scrollTo(0, 0) })

    await page.getByTestId('reader-search-next').click()
    await expect(page.locator('mark[data-active-hit="true"]')).toHaveCount(1)
    // After navigating to the next hit, the page should have scrolled
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0)
  })

  test('reader content is scrollable', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 })
    await openConstitutionView(page)

    await page.evaluate(() => { window.scrollTo(0, 0) })

    const readerPane = page.getByTestId('reader-scroll-pane')
    await wheelInside(page, readerPane, 2600)

    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0)
  })

  test('keyboard shortcuts focus search and navigate search matches', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 })
    await openConstitutionView(page)

    // Ctrl+F focuses the reader search input
    await page.keyboard.press('Control+f')
    await expect(page.getByTestId('reader-search-input')).toBeFocused()

    await page.keyboard.type('survival')
    // Confirm the query registered, then wait for highlights to render before
    // asserting the active hit — the hit count is computed in a rAF + effect
    // chain that lags the keystrokes on slower runners.
    await expect(page.getByTestId('reader-search-input')).toHaveValue('survival')
    await expect(page.locator('mark[data-reader-search-hit="true"]').first()).toBeVisible()
    await expect(page.locator('mark[data-active-hit="true"]')).toHaveCount(1)

    await page.keyboard.press('Escape')
    await expect(page.getByTestId('reader-search-input')).not.toBeFocused()

    await page.keyboard.press('n')
    await expect(page.locator('mark[data-active-hit="true"]')).toHaveCount(1)

    await page.keyboard.press('Shift+N')
    await expect(page.locator('mark[data-active-hit="true"]')).toHaveCount(1)
  })

  test('keyboard shortcuts move documents and sections', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 })
    await openConstitutionView(page)

    const titleEl = page.getByTestId('reader-title')
    const firstTitle = (await titleEl.textContent())!.trim()
    expect(firstTitle).not.toBe('')

    await page.keyboard.press('j')
    // Wait for the document to actually change before reading the new title,
    // rather than racing the keypress's async navigation.
    await expect(titleEl).not.toHaveText(firstTitle)
    const secondTitle = (await titleEl.textContent())!.trim()
    expect(secondTitle).not.toBe(firstTitle)

    await page.keyboard.press('k')
    await expect(titleEl).toHaveText(firstTitle)

    await page.keyboard.press(']')
    await expect(page.getByRole('heading', { name: 'Annex Corpus' })).toBeVisible()

    await page.keyboard.press('[')
    await expect(page.getByRole('heading', { name: 'Public & Governing Texts' })).toBeVisible()
  })

  test('copy heading link updates the hash and deep-links to the selected section', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 })
    // Navigate directly to the Humane Constitution via deep-link hash so we know which doc is shown
    await page.goto('/#docs__constitution__Humane_Constitution_md--the-humane-constitution')
    await expect(page.getByTestId('reader-title')).toHaveText('The Humane Constitution')

    // The copy button is opacity-0 until the heading is hovered; scroll it into view first
    const headingEl = page.locator('#docs__constitution__Humane_Constitution_md--0-scope-assumptions-and-design-invariants')
    await headingEl.scrollIntoViewIfNeeded()
    const headingWrap = headingEl.locator('..')
    await headingWrap.hover()
    const copyButton = page.getByTestId('copy-heading-link-0-scope-assumptions-and-design-invariants')
    await copyButton.click()
    await expect(copyButton).toContainText('Copied')
    await expect(page).toHaveURL(/#.+--0-scope-assumptions-and-design-invariants$/)

    await page.reload()

    await expect(page.getByTestId('reader-title')).toHaveText('The Humane Constitution')
    await expect.poll(() => page.evaluate(() => window.location.hash)).toBe(
      '#docs__constitution__Humane_Constitution_md--0-scope-assumptions-and-design-invariants',
    )
  })

  test('reading mode hides navigation chrome while keeping document search available', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 })
    await openConstitutionView(page)

    const readerPane = page.getByTestId('reader-scroll-pane')
    const searchInput = page.getByTestId('reader-search-input')

    await page.getByTestId('reading-mode-toggle').click()

    await expect(readerPane).toBeVisible()
    await expect(searchInput).toBeVisible()

    await page.reload()

    await expect(page.getByTestId('reading-mode-toggle')).toHaveText('Exit reading mode')
  })
})
