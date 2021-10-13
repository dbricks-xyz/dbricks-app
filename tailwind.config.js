module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    letterSpacing: {
      normal: '0',
      wide: '.1em',
      wider: '.2em',
      widest: '3em',
    },
    extend: {
      minHeight: {
        onefifty: '150px',
        twoh: '200px',
      },
      minWidth: {
        onefifty: '150px',
        twoh: '200px',
      },
      height: {
        onefifty: '150px',
        twoh: '200px',
      },
      width: {
        onefifty: '150px',
        twoh: '200px',
      },
      screens: {
        threeh: '321px',
        fourh: '400px',
        fiveh: '500px',
        sixh: '600px',
      },
      colors: {
        db: {
          cyan: '#0EECDD',
          yellow: '#FFF339',
          pink: '#FF68E7',
          purple: '#C400FF',
          gray: '#434951',

          lightcyan: '#bafff9',
          lightyellow: '#fffbd1',
          lightpink: '#ffccf6',
          lightpurple: '#eeb7ff',
          lightgray: '#8b929b',

          superlightgray: '#c6c9ce',
          darkcyan: '#2f605c',
          darkyellow: '#4f4c25',
          darkpink: '#472341',
          darkpurple: '#381f3f',
          darkgray: '#23272d',

          mango: '#F98505',
          serum: '#3FDBF0',
          saber: '#3F00FF',
          solend: '#F8622D',
          raydium: '#4154DB',
          wormhole: '#F79DFF',
          sunny: '#F79DFF',
          orca: '#F79DFF',
          solfarm: '#F79DFF',
          parrot: '#F79DFF',
          marinade: '#F79DFF',
          mercurial: '#F79DFF',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
