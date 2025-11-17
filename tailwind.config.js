/** @type {import('tailwindcss').Config} */
export default {

  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],

  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#eef8fb",
          100: "#d6eef5",
          200: "#b0dfee",
          300: "#7fcbe4",
          400: "#4eb6d9",
          500: "#1e9fcc",
          600: "#1682a7",
          700: "#126784",
          800: "#0f5168",
          900: "#0c4154",
        },
        mint: "#1dd4b0",
      },
    },
  },

  plugins: [],
};
