import { defineConfig } from '@playwright/test'

const localServerCommand = process.env.CI
  ? 'npm run build && npm run preview -- --host 127.0.0.1 --port 1420 --strictPort'
  : 'npm run dev -- --host 127.0.0.1 --port 1420 --strictPort'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  retries: 0,
  use: {
    baseURL: 'http://127.0.0.1:1420',
    trace: 'on-first-retry',
  },
  webServer: {
    command: localServerCommand,
    port: 1420,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
