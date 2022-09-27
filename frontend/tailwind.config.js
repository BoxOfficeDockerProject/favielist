/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'main': "url('./images/mainBg.png')",
        'login': "url('./images/loginBg.png')",
      }
    },
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '1': '1px',
      '1.5': '1.5px',
      '2': '2px',
      '2.5': '2.5px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
      '10': '10px',
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
