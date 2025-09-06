// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fbfc',
          100: '#d9f3f5',
          500: '#008994',
          600: '#006f76',
          700: '#005b60',
          900: '#00373a',
        }
      },
      fontFamily: {
        sans: ['Barlow', 'sans-serif'],
      },
    },
  },
  plugins: [],
}