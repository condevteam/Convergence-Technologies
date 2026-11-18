import type { Config } from 'tailwindcss';

/**
 * Convergence Technology design tokens
 *  - Accent:        brand  (#F90808)
 *  - Dark surfaces: ink (#000000) and slate-900 / "slate-dark" (#0F172A)
 *  - Light surfaces: white, surface (#F8FAFC); body-muted text: muted (#64748B)
 *
 * Tailwind's built-in slate-50 / slate-500 / slate-900 already equal
 * #F8FAFC / #64748B / #0F172A, so the aliases below are purely semantic.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: '#F90808', // Convergence Red
          50: '#FFF1F1',
          100: '#FFE0E0',
          200: '#FFC2C2',
          300: '#FF9494',
          400: '#FF5757',
          500: '#F90808',
          600: '#E00606',
          700: '#C80000', // AA-safe red for small text on white
          800: '#A30000',
          900: '#7A0000',
        },
        ink: '#000000',
        'slate-dark': '#0F172A',
        surface: '#F8FAFC',
        muted: '#64748B',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: [
          'var(--font-display)',
          'var(--font-sans)',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(249,8,8,0.4), 0 10px 40px -10px rgba(249,8,8,0.55)',
        card: '0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -12px rgba(15,23,42,0.12)',
        'card-hover':
          '0 1px 2px rgba(15,23,42,0.06), 0 20px 40px -16px rgba(15,23,42,0.25)',
      },
      backgroundImage: {
        // Subtle NOC-style grid for dark sections
        'grid-dark':
          'linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)',
        'grid-light':
          'linear-gradient(to right, rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.8)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
