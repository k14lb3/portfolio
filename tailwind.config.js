const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      black: '#000000',
      white: '#ffffff',
      alto: '#dfdfdf',
      silver: '#c0c0c0',
      gray: '#808080',
      red: '#ff0000',
      maroon: '#800000',
      pink: '#ff7f7f',
      blue: '#000080',
      yellow: '#ffff7f',
      teal: '#008080',
    },
    cursor: {
      none: 'none',
      default: 'url(/static/images/cursor/default.png), default',
      pointer: 'url(/static/images/cursor/pointer.png), pointer',
      wait: 'url(/static/images/cursor/wait.png), wait',
      progress: 'url(/static/images/cursor/progress.png), progress',
      'ew-resize': 'url(/static/images/cursor/ew-resize.png), ew-resize',
      'ns-resize': 'url(/static/images/cursor/ns-resize.png), ns-resize',
      'nesw-resize': 'url(/static/images/cursor/nesw-resize.png), nesw-resize',
      'nwse-resize': 'url(/static/images/cursor/nwse-resize.png), nwse-resize',
    },
    extend: {
      fontFamily: {
        mss: ['Microsoft Sans Serif', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        blink: {
          '0%': { opacity: 0 },
        },
      },
      animation: {
        blink: 'blink 250ms linear infinite',
      },
    },
  },
  plugins: [],
};
