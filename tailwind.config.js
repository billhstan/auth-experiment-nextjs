/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '10/80/10': '10% 80% 10%',
        '50/50': '50% 50%',
      },
    },
  },
  plugins: [require("daisyui")],
}
