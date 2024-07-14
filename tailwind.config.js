/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "color-1": "#0A5983",
        "color-2": "#60A9DD",
        "color-3": "#F3F4F6",
        "color-4": "#DDF4FF",
        "color-5": "#374150",
      },
    },
  },
  plugins: [],
});
