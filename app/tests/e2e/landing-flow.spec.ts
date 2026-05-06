import { expect, test } from '@playwright/test'

test.describe('landing flow', () => {
  test('first-time visitor can open the full reader and remains in the reader after reload', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')

    await expect(page.getByRole('button', { name: 'Open Full Reader' })).toBeVisible()
    await page.getByRole('button', { name: 'Open Full Reader' }).click()

    await expect(page.getByTestId('reader-main')).toBeVisible()
    await page.reload()
    await expect(page.getByTestId('reader-main')).toBeVisible()
  })

  test('choosing a landing reading path opens the first path document', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')

    await page.getByRole('button', { name: 'Choose a Reading Path' }).click()
    await page.getByRole('button', { name: /The Skeptic/ }).click()

    await expect(page.getByTestId('reader-title')).toHaveText('Public Readiness Guide')
    await expect(page.getByText("The Skeptic's Path", { exact: true }).first()).toBeVisible()
  })

  test('direct document hash links bypass the landing screen', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/#docs__constitution__Humane_Constitution_md--the-humane-constitution')

    await expect(page.getByTestId('reader-title')).toHaveText('The Humane Constitution')
  })
})
