/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        screens: {
          "2xl": "1024px",
        }
      },
      colors: {
        "custom-bg": "#282828"
      },
      fontSize: {
        16: "16px"
      }
    },
  },
  plugins: [],
}

