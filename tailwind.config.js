/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'narvik': '#E7E7E2',
        'eagle': '#B4B4A6',
        'erie': '#1E1E1D',
        'fire': '#FF8843',
        'jaffa': '#FF7647',
        'sorbus': '#FF6347',
      },
      fontFamily: {
        sans: ['"Uber Move"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'uber': '0 2px 4px rgba(0,0,0,0.08)',
        'uber-hover': '0 8px 16px rgba(0,0,0,0.08)',
      },
      maxWidth: {
        'uber': '1440px',
      },
      spacing: {
        'uber': '1.5rem',
      },
    },
  },
  plugins: [],
};