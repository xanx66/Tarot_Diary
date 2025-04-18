module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mystic: {
          50: "#f5f3ff",
          100: "#ede9fe",
          500: "#8b5cf6",
          700: "#6d28d9",
          900: "#4c1d95",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
