/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'vanilla': '#E2E0B6',
        'old-gold': '#BFBD5F'
      },
    },
  },
  plugins: [],
};
