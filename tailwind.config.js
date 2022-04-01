const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mss: ["Microsoft Sans Serif", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
