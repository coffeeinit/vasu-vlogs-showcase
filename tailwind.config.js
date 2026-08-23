/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vibrant-orange': '#f4761e',
        'deep-navy': '#1a202c',
        'surface-warm': '#fff8f2',
        'accent-blue': '#4a90e2',
        'accent-yellow': '#ffd100'
      },
      fontFamily: {
        'sans': ['Plus Jakarta Sans', 'sans-serif'],
        'impact': ['Impact', 'Haettenschweiler', 'Arial Narrow Bold', 'sans-serif']
      }
    }
  },
  plugins: [],
}
