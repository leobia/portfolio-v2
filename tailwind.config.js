/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0F1B2C',
        light: '#F1FAEE',
        red: '#E63946',
        'red-400': '#BB4430',
        'light-blue': '#E0F2F3',
        cerulean: '#C6DAE6'
      }
    },
  },
  plugins: [],
}

