/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryBlue: '#2563EB',
        lightBlue: '#E0F2FE',
        darkBlue: '#1E3A8A',
        grayText: '#6B7280'
      }
    }
  },
  plugins: []
};
