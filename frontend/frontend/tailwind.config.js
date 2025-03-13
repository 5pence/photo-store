/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "400px",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeOut: {
          "0%": { opacity: 1, transform: "translateY(0)" },
          "100%": { opacity: 0, transform: "translateY(10px)" },
        },
        darkModeFadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "fade-in": "fadeIn 1.1s ease-in-out",
        "fade-out": "fadeOut 1s ease-in-out",
        "dark-mode-fade": "darkModeFadeIn 0.5s ease-in-out",
      },
      colors: {
        "black-bean": "#220B07",
        "rust": "#D64933", // Rusty Red
        "muted-blue": "#7E7F9A", // Muted Blue
        "dark": "#1C1C1C", // Deep Charcoal
        "light-gray": "#E5E5E5", // Soft Gray
        "warm-white": "#F8F6F2", // Warm Off-White
      },
      fontFamily: {
        proxima: ['proxima-nova', 'sans-serif'],
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
          "warning": "#D64933", // Rusty Red
          "error": "#9C0D38", // Deep Red

          /* Dark Mode */
          "[data-theme='dark'] &": {
            "primary": "#F8F6F2",
            "secondary": "#7E7F9A",
            "accent": "#1C1C1C",
            "neutral": "#E5E5E5",
            "base-100": "#220B07", // Dark background
            "info": "#7E7F9A",
            "success": "#95C623",
            "warning": "#D64933",
            "error": "#9C0D38",
          },
        },
      },
    ],
  },
};
