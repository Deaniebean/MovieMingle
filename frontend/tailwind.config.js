const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#171a2c',
        secondary: ' #8091be',
        tertiary: '#563d4f',

        text: '#ffffff',
        'text-dark': '#dddddd',
        'text-darker': '#bbbbbb',
        'text-inv': '#000000',
        'text-inv-light': '#1a1a1a',

        success: '#2bb32b',
        'success-light': '#a5f3a5',

        error: ' #e2665b',
        'error-light': '#db7d74',
      },
      fontFamily: {
        main: 'Montserrat',
        display: ['Kumar One', 'sans-serif'],
      },
    },
  },
  plugins: [],
});
