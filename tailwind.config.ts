import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4ff',
          100: '#e0eaff',
          200: '#c7d7fe',
          300: '#a5bcfc',
          400: '#8196f8',
          500: '#6270f1',
          600: '#4e52e5',
          700: '#4040ca',
          800: '#3535a3',
          900: '#302f81',
          950: '#1e1d50',
        },
        teal: {
          brand: '#0d9488',
          light: '#14b8a6',
          dark: '#0f766e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
