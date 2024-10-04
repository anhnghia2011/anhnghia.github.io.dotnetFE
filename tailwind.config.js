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
        '500': '500px',
      },
      height: {
        '300': '300px',
      },
      borderRadius: {
        '50': '50%',
      },
    },
  },
  plugins: [],
}