/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'puzzles-pattern': `url("assets/images/pattern.png")`,
      },
    },
  },
  plugins: [],
};
