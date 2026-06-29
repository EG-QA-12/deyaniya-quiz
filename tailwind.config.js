/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        night: '#0f0f23',
        gold: '#d4af37',
        'gold-light': '#e8c84a',
        purple: '#7c3aed',
        'purple-light': '#a855f7',
        pergament: '#f0e6d3',
        green: '#16a34a',
        red: '#dc2626',
      },
      fontFamily: {
        title: ['Cinzel Decorative', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
