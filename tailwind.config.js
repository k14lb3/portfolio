const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    cursor: {
      default: "url(/static/images/cursor/default.png), default",
      pointer: "url(/static/images/cursor/pointer.png), pointer",
      wait: "url(/static/images/cursor/wait.png), wait",
      progress: "url(/static/images/cursor/progress.png), progress",
      "ew-resize": "url(/static/images/cursor/ew-resize.png), ew-resize",
      "ns-resize": "url(/static/images/cursor/ns-resize.png), ns-resize",
      "nesw-resize": "url(/static/images/cursor/nesw-resize.png), nesw-resize",
      "nwse-resize": "url(/static/images/cursor/nwse-resize.png), nwse-resize",
    },
    extend: {
      fontFamily: {
        mss: ["Microsoft Sans Serif", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "start-default": "url(/static/images/start/default.png)",
        "start-clicked": "url(/static/images/start/clicked.png)",
      },
      keyframes: {
        blink: {
          "0%": { opacity: 0 },
        },
      },
      animation: {
        blink: "blink 250ms linear infinite",
      },
    },
  },
  plugins: [],
};
