/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      sansSerif: ['Source Sans Pro', 'sans-serif'],
      mono: ['Source Code Pro', 'monospace'],
      handwriting: ['Kalam', 'cursive']
    },
    extend: {
      backgroundImage: {
        circle: "url('/images/circle.svg')",
        arrowRightUp: "url('/images/arrow-right-up.svg')",
        arrowLeftUp: "url('/images/arrow-left-up.svg')"
      },
      borderWidth: {
        1: '1px'
      },
      boxShadow: {
        colored: '0px 7px 16px #7f5bdc01',
        coloredHovered: '0px 16px 25px #7f5bdc4d',
        tableRow: '0px 0px 6px #00000029'
      },
      colors: {
        blueGem: '#3813a0',
        caribbeanGreen: '#00ca9e',
        caribbeanGreen: '#1CC6A0',
        daisyBush: '#4714a5',
        darkBroccoli: '#314b24',
        fog: '#decaec',
        gallery: '#efeaf2',
        goldenFizz: '#feff40',
        lavenderIndigo: '#8657e1',
        monsoon: '#777878',
        pastelPurple: '#b2a1bb',
        purple: '#7209b7',
        prim: '#ede6ef',
        robinEggBlue: '#00e9c0',
        scarlet: '#f72f45',
        silver: '#c0c0c0',
        whisper: '#f9f4f9'
      },
      gridTemplateColumns: {
        invoiceTable: '100px 100px 60px 1fr 116px 32px 32px',
        invoiceTableMobile: '1fr 90px'
      },
      zIndex: {
        navBarToggle: 91,
        navBar: 90
      }
    }
  },
  plugins: []
};
