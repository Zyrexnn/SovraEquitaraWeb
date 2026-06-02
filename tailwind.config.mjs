/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        zen: {
          bg: 'var(--canvas-bg)',
          'bg-dark': 'var(--canvas-bg)',
          surface: 'var(--canvas-surface)',
          'surface-dark': 'var(--canvas-surface)',
          card: 'var(--canvas-surface)',
          'card-dark': 'var(--canvas-surface)',
          text: 'var(--text-ink)',
          'text-dark': 'var(--text-ink)',
          muted: 'var(--text-muted)',
          'muted-dark': 'var(--text-muted)',
          border: 'var(--hairline)',
          'border-dark': 'var(--hairline)',
          yellow: '#eab308',
          green: '#22c55e',
          'text-secondary': 'var(--text-muted)',
          'text-secondary-dark': 'var(--text-muted)',
        },
        canvas: {
          bg: 'var(--canvas-bg)',
          surface: 'var(--canvas-surface)',
        },
        ink: {
          DEFAULT: 'var(--text-ink)',
          muted: 'var(--text-muted)',
          tertiary: 'var(--text-tertiary)',
        },
        aloe: {
          DEFAULT: 'var(--accent-aloe)',
          pistachio: 'var(--accent-pistachio)',
        },
        hairline: 'var(--hairline)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.06)',
        'large': '0 8px 32px rgba(0, 0, 0, 0.08)',
        'stacked': '0 8px 8px rgba(0,0,0,0.015), 0 4px 4px rgba(0,0,0,0.015), 0 2px 2px rgba(0,0,0,0.015), 0 0 0 1px rgba(0,0,0,0.03)',
        'stacked-dark': '0 8px 8px rgba(0,0,0,0.2), 0 4px 4px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.05)',
      },
    },
  },
  plugins: [],
}
