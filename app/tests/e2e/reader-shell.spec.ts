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
})
