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
        "taskbar-clock": "url(/static/images/taskbar/clock.png)",
        "start-default": "url(/static/images/taskbar/start/default.png)",
        "start-clicked": "url(/static/images/taskbar/start/clicked.png)",
      },
    },
  },
  plugins: [],
};
