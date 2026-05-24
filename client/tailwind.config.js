/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Literata', 'Georgia', 'serif'],
        sans:  ['Figtree', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

