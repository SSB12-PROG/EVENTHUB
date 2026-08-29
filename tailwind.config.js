/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        verge: {
          pink: '#E20074',
          magenta: '#FA255E',
          purple: '#7928CA',
          neon: '#00F2FE',
          dark: '#121214',
          card: '#FFFFFF',
          border: '#E4E4E7',
          subtle: '#52525B',
          lightBg: '#F8F9FA',
          lightCard: '#FFFFFF',
          lightBorder: '#E4E4E7',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      boxShadow: {
        'verge': '0 4px 20px -2px rgba(226, 0, 116, 0.15)',
        'drawer': '-10px 0 30px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}
