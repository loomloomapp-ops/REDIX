/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#EAEADE',
        graphite: '#222222',
        // ink kept as alias for legacy class names — brand-aligned to graphite (#222)
        ink: '#222222',
        sage: '#CDCDBF',
        green: { DEFAULT: '#116040', dark: '#0d4a31', glow: '#1a8a5c' },
        orange: '#FF6B43',
      },
      fontFamily: {
        display: ['"Unbounded"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Inter Tight"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        container: '1400px',
      },
    },
  },
  plugins: [],
}
