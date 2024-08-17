/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "green": "#3cb815",
        "orange": "#f65005",
        "gray" : "#717171",
        "primary": "#fff",
        "grayFont": "#999999",
        "dark": "#111",
        "bg": "#f7f8fc",
        "red": "red"
      },
      fontFamily: {
        sans: ['Open sans'],
        lora: ['Lora']
      }
    },
    backgroundImage: {
      first: "url('/background1.jpg')",
      second: "url('/features.png')"
    },
    height: {
      "screen-100": "100vh",
      "screen-120": "120vh",
      "screen-130": "130vh",
    },
    fontSize: {
      "xl": "19px",
      "2xl": "36px",
      "3xl": "48px",
      "4xl": "60px",
      "5xl": "72px",
      "b": "16px",
      "f": "24px"
    }
  },
  plugins: [require('daisyui'),],
}

