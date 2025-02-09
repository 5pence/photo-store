/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "rust": "#D64933", // Rusty Red
        "muted-blue": "#7E7F9A", // Muted Blue
        "dark": "#1C1C1C", // Deep Charcoal
        "light-gray": "#E5E5E5", // Soft Gray
        "warm-white": "#F8F6F2" // Warm Off-White
      },
      fontFamily: {
        heading: ['Montserrat', 'ui-sans-serif', 'system-ui'],
        body: ['Montserrat', 'sans-serif'],
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        spencerTheme: {
          "primary": "#D64933", // Rusty Red
          "secondary": "#7E7F9A", // Muted Blue
          "accent": "#E5E5E5", // Soft Gray
          "neutral": "#1C1C1C", // Deep Charcoal
          "base-100": "#F8F6F2", // Warm Off-White
          "info": "#7E7F9A", // Muted Blue
          "success": "#95C623", // Olive Green
          "warning": "#D64933", // Rusty Red (as warning for contrast)
          "error": "#9C0D38", // Deep Red
        },
      },
    ],
  },
};

  
  