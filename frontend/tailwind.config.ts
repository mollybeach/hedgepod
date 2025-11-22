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
        // 🌿 Greens (Pod + Forest)
        green: {
          50: '#e6f5e6',
          100: '#c8ebc8',
          200: '#96d896',
          300: '#6ac66a',
          400: '#3db33d',
          500: '#299f29', // primary pea-pod green
          600: '#1f7f1f',
          700: '#166016',
          800: '#0e400e',
          900: '#082808',
        },
        // 🌸 Pinks (Blush + UI buttons)
        pink: {
          50: '#fdeef3',
          100: '#fbd9e7',
          200: '#f7b1cc',
          300: '#f28caf',
          400: '#ec6d96',
          500: '#e2547f', // key CTA color
          600: '#bf3e65',
          700: '#9a2f50',
          800: '#74213a',
          900: '#4d1627',
        },
        // 🪵 Browns (Hedgehog body)
        brown: {
          50: '#f3ece7',
          100: '#e8d9cf',
          200: '#d1b59f',
          300: '#ba9070',
          400: '#a06e49',
          500: '#815534', // hedgehog spikes
          600: '#664328',
          700: '#4d321f',
          800: '#342116',
          900: '#1f140d',
        },
        // ☁️ Cream Background
        cream: {
          DEFAULT: '#f3e8d8',
          50: '#fdf9f4',
          100: '#f9f3ea',
          200: '#f3e8d8',
          300: '#ead9c1',
          400: '#dfc49e',
        },
      },
      fontFamily: {
        display: ['Nunito', 'Quicksand', 'system-ui', 'sans-serif'],
        body: ['Inter', 'Nunito', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'ac': '4px 4px 0px 0px #815534', // Animal Crossing dialogue shadow
        'ac-sm': '2px 2px 0px 0px #815534',
        'ac-lg': '6px 6px 0px 0px #815534',
      },
      borderWidth: {
        '3': '3px',
      },
    },
  },
  plugins: [],
}
export default config
