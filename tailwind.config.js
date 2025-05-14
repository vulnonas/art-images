/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#586552',
        secondary: '#e2d2bb',
        tertiary: '#898873',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Raleway', 'sans-serif'],
      },
    },
  },
  plugins: [],
};