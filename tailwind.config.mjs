/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1A1A1A',
          light: '#2D2D2D',
          dark: '#000000',
        },
        accent: {
          DEFAULT: '#FDE047',
          light: '#FEF08A',
          dark: '#FACC15',
        },
        stone: {
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
        },
        zen: {
          bg: '#fbfbfb',
          'bg-dark': '#010101',
          surface: '#f5f5f5',
          'surface-dark': '#111111',
          card: '#ffffff',
          'card-dark': '#0B0B0F',
          border: '#f0f0f0',
          'border-dark': '#1E293B',
          text: '#1a1a1a',
          'text-dark': '#ffffff',
          'text-secondary': '#777777',
          'text-secondary-dark': '#94A3B8',
          muted: '#a3a3a3',
          'muted-dark': '#64748b',
          accent: '#000000',
          'accent-dark': '#ffffff',
          'sidebar-bg': '#ffffff',
          'sidebar-bg-dark': '#0B0B0F',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
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
        'zen': '0 4px 20px rgba(0, 0, 0, 0.02)',
      },
    },
  },
  plugins: [],
}
