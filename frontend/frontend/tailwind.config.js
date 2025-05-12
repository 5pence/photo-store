/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
       backgroundImage: {
        'paper': "url('/media/paperTexture.jpg')",
      },
      screens: {
        xs: "400px",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
         shimmer: {
            '0%': { transform: 'translateX(-100%)', opacity: '0' },
            '50%': { opacity: '1' },
            '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
      },
      animation: {
        "fade-in": "fadeIn 1.1s ease-in-out",
        shimmerOnce: 'shimmer 1.5s ease-out 1',
      },
      animationFillMode: {
        'forwards': 'forwards',
        },
      colors: {
        "raisin-black": "#1B1D2A",
        "charcoal": "#27475C",
        "charcoal2": "#283B4D",
        "yinmn-blue": "#365578",
        "mauve": "#EDC1FC",
        "china-rose": "#B1647B",
        "vandyke": "#442F34",
        "eggplant": "#544651",
        "seasalt": "#F7F7F7",
        "warm-black": "#352329",
        "misty": "#B7BBC3",
        "moss": "#416259",
        "black-bean": "#220B07",
        "muted-blue": "#7E7F9A", // Muted Blue
        "dark": "#1C1C1C", // Deep Charcoal
        "light-gray": "#E5E5E5", // Soft Gray
        "warm-white": "#F8F6F2", // Warm Off-White
        "lavender": "#E6E1F4",  // Start of Archetype palette
        "gunmetal": "#2E3D3A",
        "hookers-green": "#6A7D76",
        "isabelline": "#F1EBE5",
        "nyanza": "#E3F1DC",
        "pale-dogwood": "#F5D9CE",
        "melon": "#F7BFB0",
        "mountbatten-pink": "#A18BA3",
      },
      fontFamily: {
        proxima: ['calluna-sans', 'sans-serif'],
        heading: ['"IvyOra Text Light"', 'serif'],
        loretta: ['"Loretta Light"', 'serif'],
        serif: ['cormorant-garamond', 'serif'], // for homepage
        cormorant: ['cormorant-garamond', 'serif'],
        poetic: ['"IvyOra Text Light"', 'serif'], // for archetype app
        body: ['calluna-sans', 'sans-serif'],
        sans: ['calluna-sans', 'ui-sans-serif', 'system-ui'],
        },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        spencerTheme: {
          "charcoal": "#27475C",    // Charcoal
          "charcoal2": "#283B4D",    // Charcoal 1
          "info": "#365578",         // YinMn Blue
          "accent": "#EDC1FC",       // Mauve
          "primary": "#B1647B",      // China Rose
          "vandyke": "#442F34",      // Van Dyke
          "secondary": "#544651",    // Eggplant
          "neutral2": "#352329",      // Raisin Black (red)
          "base-100": "#F7F7F7",     // Seasalt
          "neutral": "#1B1D2A",      // Raisin Black (blue)
          "misty": "#B7BBC3",        // Misty Silver
          "moss": "#416259",         // Moss Depth
          
          
          "success": "#6A7D76",      // Hooker's Green
          "warning": "#D64933",      // Rust
          "error": "#9C0D38",        // Deep Red
        },
      },
    ],
  },
};