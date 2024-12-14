/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#FBF6E9',
        creme: '#E3F0AF',
        lgreen: '#5DB996',
        dgreen: '#118B50'
      },
    },
  },
  plugins: [],
}

