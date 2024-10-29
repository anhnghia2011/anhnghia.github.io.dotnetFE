/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
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
        '1000': '1000px',
        '500': '500px',
      },
      borderRadius: {
        '50': '50%',
      },
      content: {
        'after': '""',
      },
    },
  },
  plugins: [
    daisyui,
  ],
}