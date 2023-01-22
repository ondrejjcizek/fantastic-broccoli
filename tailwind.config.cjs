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
                arrowRightUp: "url('/images/arrow-right-up.svg')",
                arrowLeftUp: "url('/images/arrow-left-up.svg')",
                auth: "url('images/bg-auth.svg')",
                bg404: "url('/images/bg-error.svg')",
                chevronDown: "url('/images/chevron-down.svg')",
                circle: "url('/images/circle.svg')",
                thankYou: "url('/images/bg-thankYou.svg')"
            },
            backgroundPosition: {
                'right-center': '97% center'
            },
            borderWidth: {
                1: '1px'
            },
            boxShadow: {
                colored: '0px 7px 16px #7f5bdc01',
                coloredHovered: '0px 16px 25px #7f5bdc4d',
                invoice: '-4px 0px 44px rgba(0, 0, 0, 0.25)',
                slidePanel: '-4px 0px 44px rgba(0, 0, 0, 0.25)',
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
                clientTable: '100px 1fr 125px 125px 32px 32px',
                clientTableMobile: '1fr 150px',
                invoiceLineItem: '1fr 100px 100px 100px 65px',
                invoiceTable: '92px 100px 60px 1fr 116px 32px 32px',
                invoiceTableMobile: '1fr 150px'
            },
            zIndex: {
                toaster: 1000,
                modal: 999,
                modalOverlay: 998,
                slidePanel: 997,
                overlay: 996,
                navBarToggle: 91,
                navBar: 90,
                row: 5,
                rowActions: 1
            }
        }
    },
    plugins: []
};
