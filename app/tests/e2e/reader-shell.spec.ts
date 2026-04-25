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

async function rowTitle(row: Locator): Promise<string> {
  const title = await row.locator('h3').textContent()

  if (!title) {
    throw new Error('Expected document row title to exist.')
  }

  return title.trim()
}

async function openConstitutionView(page: Page): Promise<void> {
  await page.goto('/')
  await expect(page.getByTestId('nav-constitution')).toBeVisible()
  await page.getByTestId('nav-constitution').click()
  await expect(page.getByTestId('reader-title')).toBeVisible()
}

test.describe('reader shell regression coverage', () => {
  test('overview shelf pane scrolls independently', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1024 })
    await page.goto('/')

    const shelfPane = page.getByTestId('shelf-pane')
    const mainPane = page.getByTestId('reader-main')

    await expect(shelfPane).toBeVisible()
    await expect.poll(() => paneScrollTop(shelfPane)).toBe(0)

    const mainBefore = await paneScrollTop(mainPane)
    await wheelInside(page, shelfPane, 1400)

    await expect.poll(() => paneScrollTop(shelfPane)).toBeGreaterThan(0)
    await expect.poll(() => paneScrollTop(mainPane)).toBe(mainBefore)
  })

  test('constitution shelf and reader panes scroll independently', async ({ page }) => {
    await page.setViewportSize({ width: 1660, height: 1100 })
    await openConstitutionView(page)

    const shelfPane = page.getByTestId('shelf-pane')
    const readerPane = page.getByTestId('reader-scroll-pane')

    await setPaneScrollTop(shelfPane, 0)
    await setPaneScrollTop(readerPane, 0)

    await wheelInside(page, shelfPane, 1400)
    await expect.poll(() => paneScrollTop(shelfPane)).toBeGreaterThan(0)
    await expect.poll(() => paneScrollTop(readerPane)).toBe(0)

    await setPaneScrollTop(shelfPane, 0)
    await setPaneScrollTop(readerPane, 0)

    await wheelInside(page, readerPane, 2200)
    await expect.poll(() => paneScrollTop(readerPane)).toBeGreaterThan(0)
    await expect.poll(() => paneScrollTop(shelfPane)).toBe(0)
  })

  test('constitution outline pane scrolls independently on wide screens', async ({ page }) => {
    await page.setViewportSize({ width: 1800, height: 1100 })
    await openConstitutionView(page)

    const readerPane = page.getByTestId('reader-scroll-pane')
    const outlinePane = page.getByTestId('outline-scroll-pane')

    await expect(outlinePane).toBeVisible()
    await setPaneScrollTop(readerPane, 0)
    await setPaneScrollTop(outlinePane, 0)

    await wheelInside(page, outlinePane, 1800)

    await expect.poll(() => paneScrollTop(outlinePane)).toBeGreaterThan(0)
    await expect.poll(() => paneScrollTop(readerPane)).toBe(0)
  })

  test('selecting a new constitution document resets the reader pane to the top', async ({ page }) => {
    await page.setViewportSize({ width: 1660, height: 1100 })
    await openConstitutionView(page)

    const readerPane = page.getByTestId('reader-scroll-pane')
    const rows = page.locator('[data-testid^="document-row-"]')

    await expect(rows.nth(1)).toBeVisible()

    const secondRow = rows.nth(1)
    const secondTitle = await rowTitle(secondRow)

    await setPaneScrollTop(readerPane, 2600)
    await expect.poll(() => paneScrollTop(readerPane)).toBeGreaterThan(1000)

    await secondRow.locator('button').first().click()
    await expect(page.getByTestId('reader-title')).toHaveText(secondTitle)
    await expect.poll(() => paneScrollTop(page.getByTestId('reader-scroll-pane'))).toBe(0)
  })

  test('last view, selected document, and reader position persist across reload', async ({ page }) => {
    await page.setViewportSize({ width: 1660, height: 1100 })
    await openConstitutionView(page)

    const readerPane = page.getByTestId('reader-scroll-pane')
    const rows = page.locator('[data-testid^="document-row-"]')
    const secondRow = rows.nth(1)
    const secondTitle = await rowTitle(secondRow)

    await secondRow.locator('button').first().click()
    await expect(page.getByTestId('reader-title')).toHaveText(secondTitle)

    await wheelInside(page, readerPane, 2200)
    await expect.poll(() => paneScrollTop(readerPane)).toBeGreaterThan(1000)

    await page.reload()

    await expect(page.getByTestId('reader-title')).toHaveText(secondTitle)
    await expect.poll(() => paneScrollTop(page.getByTestId('reader-scroll-pane'))).toBeGreaterThan(1000)
  })

  test('document search highlights matches and cycles through them', async ({ page }) => {
    await page.setViewportSize({ width: 1660, height: 1100 })
    await openConstitutionView(page)

    const searchInput = page.getByTestId('reader-search-input')
    const searchStatus = page.getByTestId('reader-search-status')
    const readerPane = page.getByTestId('reader-scroll-pane')

    await searchInput.fill('survival')
    await expect(searchStatus).toContainText('1 of')
    await expect(page.locator('mark[data-reader-search-hit="true"]')).toHaveCount(46)

    await readerPane.evaluate((node) => {
      node.scrollTop = 0
    })

    await page.getByRole('button', { name: 'Next' }).click()
    await expect(searchStatus).toContainText('2 of')
    await expect(page.locator('mark[data-active-hit="true"]')).toHaveCount(1)
    await expect.poll(() => paneScrollTop(readerPane)).toBeGreaterThan(0)
  })

  test('outline tracks the active heading as the reader scrolls', async ({ page }) => {
    await page.setViewportSize({ width: 1800, height: 1100 })
    await openConstitutionView(page)

    const readerPane = page.getByTestId('reader-scroll-pane')
    const activeOutlineHeading = page.locator('[data-active-heading="true"]')

    await expect(activeOutlineHeading).toHaveCount(1)
    await expect(activeOutlineHeading.first()).toContainText('Philosophical Preamble')

    await wheelInside(page, readerPane, 2600)

    await expect(activeOutlineHeading.first()).not.toContainText('Philosophical Preamble')
    await expect(activeOutlineHeading.first()).toContainText('0. Scope, Assumptions, and Design Invariants')
  })

  test('keyboard shortcuts focus search and navigate search matches', async ({ page }) => {
    await page.setViewportSize({ width: 1660, height: 1100 })
    await openConstitutionView(page)

    await page.keyboard.press('/')
    await expect(page.getByTestId('reader-search-input')).toBeFocused()

    await page.keyboard.type('survival')
    await expect(page.getByTestId('reader-search-status')).toContainText('1 of')

    await page.keyboard.press('Escape')
    await expect(page.getByTestId('reader-search-input')).not.toBeFocused()

    await page.keyboard.press('n')
    await expect(page.getByTestId('reader-search-status')).toContainText('2 of')

    await page.keyboard.press('Shift+N')
    await expect(page.getByTestId('reader-search-status')).toContainText('1 of')
  })

  test('keyboard shortcuts move documents and sections', async ({ page }) => {
    await page.setViewportSize({ width: 1660, height: 1100 })
    await openConstitutionView(page)

    const rows = page.locator('[data-testid^="document-row-"]')
    const firstTitle = await rowTitle(rows.nth(0))
    const secondTitle = await rowTitle(rows.nth(1))

    await expect(page.getByTestId('reader-title')).toHaveText(firstTitle)

    await page.keyboard.press('j')
    await expect(page.getByTestId('reader-title')).toHaveText(secondTitle)

    await page.keyboard.press('k')
    await expect(page.getByTestId('reader-title')).toHaveText(firstTitle)

    await page.keyboard.press(']')
    await expect(page.getByRole('heading', { name: 'Annex Corpus' })).toBeVisible()

    await page.keyboard.press('[')
    await expect(page.getByRole('heading', { name: 'Constitution & Founding Order' })).toBeVisible()
  })

  test('pinning the current document adds it to quick access and lets you jump back to it', async ({ page }) => {
    await page.setViewportSize({ width: 1660, height: 1100 })
    await openConstitutionView(page)

    const rows = page.locator('[data-testid^="document-row-"]')
    const firstRow = rows.nth(0)
    const secondRow = rows.nth(1)
    const firstTitle = await rowTitle(firstRow)
    const secondTitle = await rowTitle(secondRow)

    await page.getByRole('button', { name: 'Pin' }).click()
    const pinnedSection = page.getByTestId('quick-access-pinned')
    await expect(pinnedSection).toBeVisible()
    const pinnedButton = pinnedSection.locator('button').filter({ hasText: firstTitle }).first()
    await expect(pinnedButton).toBeVisible()

    await secondRow.locator('button').first().click()
    await expect(page.getByTestId('reader-title')).toHaveText(secondTitle)

    await pinnedButton.click()
    await expect(page.getByTestId('reader-title')).toHaveText(firstTitle)
  })

  test('recent documents keep the latest reading trail', async ({ page }) => {
    await page.setViewportSize({ width: 1660, height: 1100 })
    await openConstitutionView(page)

    const rows = page.locator('[data-testid^="document-row-"]')
    const secondRow = rows.nth(1)
    const thirdRow = rows.nth(2)
    const secondTitle = await rowTitle(secondRow)
    const thirdTitle = await rowTitle(thirdRow)

    await secondRow.locator('button').first().click()
    await expect(page.getByTestId('reader-title')).toHaveText(secondTitle)

    await thirdRow.locator('button').first().click()
    await expect(page.getByTestId('reader-title')).toHaveText(thirdTitle)

    const recentSection = page.getByTestId('quick-access-recent')
    await expect(recentSection).toBeVisible()

    const recentButtons = recentSection.locator('button')
    await expect(recentButtons.nth(0)).toContainText(thirdTitle)
    await expect(recentButtons.nth(1)).toContainText(secondTitle)
  })

  test('copy heading link updates the hash and deep-links to the selected section', async ({ page }) => {
    await page.setViewportSize({ width: 1660, height: 1100 })
    await openConstitutionView(page)

    const copyButton = page.getByTestId('copy-heading-link-0-scope-assumptions-and-design-invariants')
    await copyButton.click()
    await expect(copyButton).toContainText('Copied')
    await expect(page).toHaveURL(/#.+--0-scope-assumptions-and-design-invariants$/)

    await page.reload()

    await expect(page.getByTestId('reader-title')).toHaveText('The Humane Constitution')
    await expect.poll(() => page.evaluate(() => window.location.hash)).toBe(
      '#Humane_Constitution_md--0-scope-assumptions-and-design-invariants',
    )
  })

  test('reading mode hides navigation chrome while keeping document search available', async ({ page }) => {
    await page.setViewportSize({ width: 1800, height: 1100 })
    await openConstitutionView(page)

    const shelfPane = page.getByTestId('shelf-pane')
    const outlinePane = page.getByTestId('outline-scroll-pane')
    const readerPane = page.getByTestId('reader-scroll-pane')
    const searchInput = page.getByTestId('reader-search-input')

    await expect(shelfPane).toBeVisible()
    await expect(outlinePane).toBeVisible()

    await page.getByTestId('reading-mode-toggle').click()

    await expect(shelfPane).toBeHidden()
    await expect(outlinePane).toBeHidden()
    await expect(readerPane).toBeVisible()
    await expect(searchInput).toBeVisible()

    await page.reload()

    await expect(page.getByTestId('shelf-pane')).toBeHidden()
    await expect(page.getByTestId('outline-scroll-pane')).toBeHidden()
    await expect(page.getByTestId('reading-mode-toggle')).toHaveText('Exit Reading Mode')
  })
})
