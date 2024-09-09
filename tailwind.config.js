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
        one: '#0a090c',
        two: '#f0edee',
        three: '#07393c',
        four: '#2c666e',
        five: '#90ddf0'
      }
    },
  },
  plugins: [],
}

