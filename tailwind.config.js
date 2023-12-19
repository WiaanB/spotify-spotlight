/* eslint-env node */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#4ade80",

          "secondary": "#4b5563",

          "accent": "#f3f4f6",

          "neutral": "#1f2937",

          "base-100": "#1f2937",

          "info": "#ffffff",

          "success": "#4ade80",

          "warning": "#f87171",

          "error": "#fbbf24",
        },
      },
    ]
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")]
};