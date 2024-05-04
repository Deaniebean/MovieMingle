const withMT = require('@material-tailwind/react/utils/withMT');
const colors = require('tailwindcss/colors')
 
module.exports = withMT({
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#171a2c',
        secondary: '#8091be',
        secondaryDark: '#32384F',
        tertiary: '#563d4f',
        light: '#F6F1FF',


        text: '#ffffff',
        textDark: '#dddddd',
        textDarker: '#bbbbbb',
        textInv: '#000000',
        textInvLight: '#1a1a1a',

        success: '#2bb32b',
        successLight: '#a5f3a5',

        error: ' #e2665b',
        errorLight: '#db7d74',

        // To use Tailwinds extended color palette
        ...colors 
      },
      fontFamily: {
        main: 'Montserrat',
        display: ['Kumar One', 'sans-serif'],
      },
      screens: {
        'betterhover': {'raw': '(hover: hover)'},
    }
    },
  },
  plugins: [],
});
