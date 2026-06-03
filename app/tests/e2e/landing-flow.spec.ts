import { expect, test } from '@playwright/test'

test.describe('landing flow', () => {
  test('first-time visitor can open the full reader and remains in the reader after reload', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')

    await expect(page.getByRole('button', { name: 'Browse the full library' })).toBeVisible()
    await page.getByRole('button', { name: 'Browse the full library' }).click()

    await expect(page.getByTestId('reader-main')).toBeVisible()
    await page.reload()
    await expect(page.getByTestId('reader-main')).toBeVisible()
  })

  test('choosing a landing reading path opens the first path document', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')

    await page.getByRole('button', { name: 'Start with Objections' }).click()

    await expect(page.getByTestId('reader-title')).toHaveText('Evidence Ladder')
    await expect(page.getByText("The Skeptic's Path", { exact: true }).first()).toBeVisible()
  })

  test('direct document hash links bypass the landing screen', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/#docs__constitution__Humane_Constitution_md--the-humane-constitution')

    await expect(page.getByTestId('reader-title')).toHaveText('The Humane Constitution')
  })
})
