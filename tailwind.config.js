/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4f95ff',
          dark: '#3a7ddb',
        },
        metro: {
          DEFAULT: '#00b09b',
        },
        bus: {
          DEFAULT: '#3498db',
        },
        dark: {
          bg: {
            primary: '#121212',
            secondary: '#1e1e1e',
            card: '#252525',
          },
          text: {
            primary: '#e0e0e0',
            secondary: '#a0a0a0',
            muted: '#6c6c6c',
          },
          border: '#333333',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'pulse-slow': 'pulse 3s infinite',
      },
    },
  },
  plugins: [],
} 