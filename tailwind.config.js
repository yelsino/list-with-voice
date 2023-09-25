/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '35/65': '35% 65%',
        '7/88/5': '10% 80% 7%',
      },
      colors: {
        'primary-100': '#1c2a37',
        'primary-200': '#141e27',
        'secondary-100': '#0BE9FD',
        'secondary-200': '#2196f3',
        'text-100': '#ffffff',
        'text-200': '#d8d9d6',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        dosis: ['var(--font-dosis)']
      }
    },
   
  },
  plugins: [
  ],
}
