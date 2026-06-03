import { test } from '@playwright/test'
import { mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = resolve(__dirname, '../../../tmp/screenshots')

test.beforeAll(() => {
  mkdirSync(OUT_DIR, { recursive: true })
})

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 900, height: 1100 },
] as const

// Section views, by their nav testid. These match MOBILE_NAV_ITEMS (the
// hamburger drawer) so the tour can drive navigation on viewports below the
// `xl` breakpoint, where the section picker lives inside the slide-over sheet.
const navIds: Array<'home' | 'constitution' | 'annexes' | 'registries' | 'topics' | 'paths' | 'validation'> = [
  'home',
  'constitution',
  'annexes',
  'registries',
  'topics',
  'paths',
  'validation',
]

for (const vp of viewports) {
  test.describe(`tour @ ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } })

    test('capture each view', async ({ page }) => {
      await page.addInitScript(() => {
        window.localStorage.setItem('humane-reader:landing-visited', 'true')
      })
      await page.goto('/')
      await page.waitForSelector('[data-testid="reader-main"]')
      // Let the dot-matrix and corpus settle.
      await page.waitForTimeout(400)

      const hamburger = page.getByTestId('nav-hamburger')

      for (const id of navIds) {
        const button = page.getByTestId(`nav-${id}`)
        if (await hamburger.isVisible()) {
          // Below `xl`: the section buttons live in the slide-over sheet, which
          // is translated off-screen until opened. Open it, then select — which
          // navigates and closes the sheet again.
          await hamburger.click()
          await button.click()
          await page.waitForTimeout(300)
        } else if (await button.isVisible()) {
          await button.click()
          await page.waitForTimeout(250)
        }
        await page.screenshot({
          path: `${OUT_DIR}/${vp.name}-${id}.png`,
          fullPage: false,
        })
      }
    })
  })
}
