/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '1440': '1440px',
      },
      borderRadius: {
        '50': '50%',
      },
    },
  },
  plugins: [],
}