/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'loader-grow': 'loadergrow 2s infinite ease backwards',
        'loader-spin': 'loaderspin 1.33333s infinite linear',
      },
      keyframes: {
        loadergrow: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.25)' },
        },
        loaderspin: {
          to: {
            transform: 'rotate(360deg)',
          }
        }
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
  fontFamily: {
    sans: [
      'ui-sans-serif',
      'sans-serif',
    ],
    serif: ['"Inter"','serif']
  }
}
 