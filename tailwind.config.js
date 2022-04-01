const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mss: ["Microsoft Sans Serif", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "taskbar-base": "url(/static/images/taskbar/base.png)",
      },
    },
  },
  plugins: [],
};
