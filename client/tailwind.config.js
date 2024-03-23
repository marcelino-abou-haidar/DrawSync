/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        '--step--2': 'clamp(0.7813rem, 0.7469rem + 0.1717vi, 0.88rem)',
        '--step--1': 'clamp(0.9375rem, 0.881rem + 0.2826vi, 1.1rem)',
        '--step-0': 'clamp(1.125rem, 1.038rem + 0.4348vi, 1.375rem)',
        '--step-1': 'clamp(1.35rem, 1.2217rem + 0.6413vi, 1.7188rem)',
        '--step-2': 'clamp(1.62rem, 1.4362rem + 0.919vi, 2.1484rem)',
        '--step-3': 'clamp(1.944rem, 1.6861rem + 1.2896vi, 2.6855rem)',
        '--step-4': 'clamp(2.3328rem, 1.9766rem + 1.7811vi, 3.3569rem)',
        '--step-5': 'clamp(2.7994rem, 2.3135rem + 2.4292vi, 4.1962rem)',
      },
      spacing: {
        '--space-3xs': 'clamp(0.3125rem, 0.2908rem + 0.1087vi, 0.375rem)',
        '--space-2xs': 'clamp(0.5625rem, 0.519rem + 0.2174vi, 0.6875rem)',
        '--space-xs': 'clamp(0.875rem, 0.8098rem + 0.3261vi, 1.0625rem)',
        '--space-s': 'clamp(1.125rem, 1.038rem + 0.4348vi, 1.375rem)',
        '--space-m': 'clamp(1.6875rem, 1.5571rem + 0.6522vi, 2.0625rem)',
        '--space-l': 'clamp(2.25rem, 2.0761rem + 0.8696vi, 2.75rem)',
        '--space-xl': 'clamp(3.375rem, 3.1141rem + 1.3043vi, 4.125rem)',
        '--space-2xl': 'clamp(4.5rem, 4.1522rem + 1.7391vi, 5.5rem)',
        '--space-3xl': 'clamp(6.75rem, 6.2283rem + 2.6087vi, 8.25rem)',
      },
      backgroundImage: {
        'puzzles-pattern': `url("assets/images/pattern.png")`,
      },
    },
  },
  plugins: [],
};
