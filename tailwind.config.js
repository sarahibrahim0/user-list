/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    screens: {
      sm: "320px",
      /* For mobiles: */
      /* your CSS here */
      md: "481px",
      // => @media (min-width: 640px) { ... }
      lg: "769px",
      // => @media (min-width: 1024px) { ... }

      xl: "1025px",
      // => @media (min-width: 1280px) { ... }
      "2xl": "1201px",
    },
    extend: {
      colors: {
        "dark-purple": "#6d5b98",
        "light-purple": "#6F5CC3",
        "light-gray": "#F7F7F7",
      },
    },
  },
  plugins: [require("tw-elements/plugin.cjs")]
};
