/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e2f6fe',
          100: '#b6e8fd',
          200: '#87d9fb',
          300: '#5bcaf9',
          400: '#3dbef8',
          500: '#2ab2f7',
          600: '#26a4e8',
          700: '#2190d4', // active
          800: '#1e7fc0', // hover
          900: '#175f9e', // base
        }
      },
      fontFamily: {
        outfit: ["sans-serif", "sans-serif"], // 👈 add custom font
      }
    },
  },
  plugins: [],
}