/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        'primary-hover': '#2563EB',
        background: '#F9F9F9',
        surface: '#FFFFFF',
      },
    },
  },
  plugins: [],
}