import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#04040a',
          900: '#08081a',
          800: '#0d0d24',
          700: '#12122f',
        },
        plasma: {
          DEFAULT: '#7c3aed',
          glow: '#a855f7',
          hot: '#c026d3',
          dim: '#4c1d95',
        },
        neon: {
          cyan: '#22d3ee',
          lime: '#a3e635',
          amber: '#fbbf24',
          rose: '#fb7185',
        },
        glass: {
          border: 'rgba(255,255,255,0.08)',
          'border-strong': 'rgba(255,255,255,0.14)',
          fill: 'rgba(255,255,255,0.04)',
          'fill-hover': 'rgba(255,255,255,0.07)',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
        refract: '18px',
        'refract-deep': '28px',
      },
      backdropSaturate: {
        refract: '160%',
        'refract-hover': '200%',
      },
      animation: {
        'canvas-drift': 'canvasDrift 60s ease-in-out infinite alternate',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'border-shimmer': 'borderShimmer 3s linear infinite',
        'fade-in-up': 'fadeInUp 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards',
      },
      keyframes: {
        canvasDrift: {
          '0%': {
            backgroundPosition: '0% 0%, 100% 100%, 50% 50%, 20% 80%, 0% 0%',
          },
          '33%': {
            backgroundPosition: '40% 10%, 60% 90%, 80% 20%, 50% 50%, 0% 0%',
          },
          '66%': {
            backgroundPosition: '20% 60%, 80% 40%, 30% 70%, 70% 30%, 0% 0%',
          },
          '100%': {
            backgroundPosition: '80% 20%, 20% 80%, 70% 30%, 10% 60%, 0% 0%',
          },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        borderShimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px) translateZ(0)' },
          '100%': { opacity: '1', transform: 'translateY(0) translateZ(0)' },
        },
      },
      boxShadow: {
        glass:
          '0 4px 32px 0 rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)',
        'glass-hover':
          '0 8px 48px 0 rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.12)',
        'glass-active':
          '0 2px 16px 0 rgba(124,58,237,0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
        'plasma-glow': '0 0 40px rgba(168, 85, 247, 0.4)',
        'neon-cyan': '0 0 24px rgba(34, 211, 238, 0.35)',
      },
      backgroundImage: {
        'plasma-gradient':
          'linear-gradient(135deg, #7c3aed 0%, #c026d3 50%, #7c3aed 100%)',
        'glass-shimmer':
          'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config
