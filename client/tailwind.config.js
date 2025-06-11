/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eaeffb',
          100: '#c7d3f1',
          200: '#a3b7e7',
          300: '#7f9bdd',
          400: '#5b7fd3',
          500: '#3763c9',
          600: '#2c4fa1',
          700: '#1E3A8A', // Primary Navy
          800: '#15296d',
          900: '#0c1536',
        },
        teal: {
          50: '#eafaf8',
          100: '#c7f0ea',
          200: '#a3e6dc',
          300: '#7fdcce',
          400: '#5bd2c0',
          500: '#37c8b2',
          600: '#14B8A6', // Accent Teal
          700: '#0e8a7d',
          800: '#095c54',
          900: '#042e2a',
        },
      },
      fontFamily: {
        sans: ['Open Sans', 'ui-sans-serif', 'system-ui'],
        heading: ['Lato', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'medium': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
};