/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  mode: 'jit',

  content: [
    // Example content paths...
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#337ab7',
        'primary-dark-blue': '#3A4BA9',
      },
      boxShadow: {
        'lg-left':
          '-20px 0 25px -5px rgb(0 0 0 / 10%), -10px 0 10px -5px rgb(0 0 0 / 4%)',
      },
    },
  },
  plugins: [],
};

