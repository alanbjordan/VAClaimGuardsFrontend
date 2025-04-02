/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        primary: '#051246',
        secondary2: '#303a65',
        secondary: '#E6E7EC',
        danger: '#B00020'
      },
      fontFamily: {
        general: ['General Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}

