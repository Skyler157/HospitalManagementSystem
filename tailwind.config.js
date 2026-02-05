/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#1E3A8A',
        secondary: '#FBBF24',
        accent: '#9333EA',
        neutral: '#374151',
        'base-100': '#FFFFFF',
        info: '#3ABFF8',
        success: '#36D399',
        warning: '#FBBD23',
        error: '#F87272',
      },
      // fontFamily: {
      //   sans: ['Avenir', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      // },
    },
  },
  plugins: [require("daisyui")],
}
