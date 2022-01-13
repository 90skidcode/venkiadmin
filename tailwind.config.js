const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {        
        primary:{
          100: "#d2d4d7",
          200: "#bbbec4",
          300: "#a5a9b0",
          400: "#8e949d",
          500: "#787e89",
          600: "#616975",
          700: "#4a5362",
          800: "#343e4e",
          900: "#1e293b",
        },secondary:  {
          50: "#e0f2f1",
          100: "#e7e7e9",
          200: "#cfd0d4",
          300: "#b7b9bf",
          400: "#9fa2a9",
          500: "#878b94",
          600: "#575c69",
          700: "#3e4554",
          800: "#262e3f",
          900: "#0f172a",         
        },
        
      },
      spacing: {
        7: "1.75rem",
        9: "2.25rem",
        28: "7rem",
        80: "20rem",
        96: "24rem",
      },
      height: {
        "1/2": "50%",
      },
      scale: {
        30: ".3",
      },
      boxShadow: {
        outline: "0 0 0 3px rgba(101, 31, 255, 0.4)",
      },
      backgroundColor: {
        primary:{
          100: "#d2d4d7",
          200: "#bbbec4",
          300: "#a5a9b0",
          400: "#8e949d",
          500: "#787e89",
          600: "#616975",
          700: "#4a5362",
          800: "#343e4e",
          900: "#1e293b",
        },secondary:  {
          50: "#e0f2f1",
          100: "#e7e7e9",
          200: "#cfd0d4",
          300: "#b7b9bf",
          400: "#9fa2a9",
          500: "#878b94",
          600: "#575c69",
          700: "#3e4554",
          800: "#262e3f",
          900: "#0f172a",         
        },
      },
    },
  },
  variants: {
    scale: ["responsive", "hover", "focus", "group-hover"],
    textColor: ["responsive", "hover", "focus", "group-hover"],
    opacity: ["responsive", "hover", "focus", "group-hover"],
    backgroundColor: ["responsive", "hover", "focus", "group-hover"],
  },
  plugins: [
    
  ],
};