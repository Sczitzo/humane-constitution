import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: 'var(--ink)',
          strong: 'var(--ink-strong)',
          soft: 'var(--ink-soft)',
          faint: 'var(--ink-faint)',
        },
        paper: {
          DEFAULT: 'var(--page-bg)',
          strong: 'var(--paper-strong)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          soft: 'var(--accent-soft)',
          deep: 'var(--accent-deep)',
        },
        line: 'var(--line)',
        chrome: 'var(--chrome-line)',
        sage: {
          DEFAULT: 'var(--sage)',
          deep: 'var(--sage-deep)',
        },
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', '"SFMono-Regular"', 'Menlo', 'monospace'],
        sans: ['"Aptos"', '"Avenir Next"', '"Segoe UI"', 'sans-serif'],
        serif: ['"Iowan Old Style"', '"Palatino Linotype"', '"Book Antiqua"', '"Baskerville"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
