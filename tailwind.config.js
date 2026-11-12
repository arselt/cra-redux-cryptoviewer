import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    fontFamily: {
      Chivo: '"Chivo"'
    },
    extend: {
      // WCAG AA on the zinc-200 card (4.5:1 text, 3:1 icons): one source of truth for status colours
      colors: {
        positive: colors.emerald[800],
        negative: colors.rose[700],
        favorite: colors.amber[700],
        idle: colors.zinc[600]
      }
    }
  },
  plugins: []
};
