/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkMode: {
          100: "#121212",
          200: "#1D1D1D",
          300: "#BB86FC",
          400: "#03DAC6",
          500: "#E1E1E1",
          600: "#E7E7E7",
          700: "#100B16",
          800: "#121212",
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
}
