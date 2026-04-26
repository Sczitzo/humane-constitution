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

const navIds: Array<'overview' | 'constitution' | 'annexes' | 'registries' | 'validation' | 'settings'> = [
  'overview',
  'constitution',
  'annexes',
  'registries',
  'validation',
  'settings',
]

for (const vp of viewports) {
  test.describe(`tour @ ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } })

    test('capture each view', async ({ page }) => {
      await page.goto('/')
      await page.waitForSelector('[data-testid="reader-main"]')
      // Let the dot-matrix and corpus settle.
      await page.waitForTimeout(400)

      for (const id of navIds) {
        const button = page.getByTestId(`nav-${id}`)
        if (await button.isVisible()) {
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
