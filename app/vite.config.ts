import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Vite options tailored for Tauri development:
  // prevent vite from obscuring rust errors
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      // tell vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**'],
    },
  },
  // to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.app/v1/api/config/#buildconfig.beforedevcommand
  envPrefix: ['VITE_', 'TAURI_'],
  build: {
    // Tauri uses Chromium on Windows and WebKit on macOS and Linux.
    // For web (Vercel) builds, target modern browsers that support WebGPU / BigInt.
    target: process.env.TAURI_PLATFORM === 'windows'
      ? 'chrome105'
      : process.env.TAURI_PLATFORM
        ? 'safari16'
        : 'es2022',
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG,
    // Mermaid is already loaded behind a dynamic import in the reader. Its
    // lazy renderer chunk is large by design, so keep Vite warnings focused on
    // unexpected first-load regressions instead of the known diagram payload.
    chunkSizeWarningLimit: 700,
  },
  worker: {
    format: 'es',
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
}))
