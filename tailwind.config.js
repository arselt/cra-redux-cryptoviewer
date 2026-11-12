/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    fontFamily: {
      Chivo: '"Chivo"'
    },
    extend: {
      // Values live in index.css (:root / .dark) so one theme switch recolours everything
      colors: Object.fromEntries(
        ["page", "card", "ink", "subtle", "line", "brand", "on-brand", "positive", "negative", "favorite", "idle", "danger-bg", "danger-ink"].map(
          (name) => [name, `rgb(var(--${name}) / <alpha-value>)`]
        )
      )
    }
  },
  plugins: []
};
