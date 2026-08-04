/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#F6F5F2',
          100: '#ECEAE3',
          200: '#D8D4C8',
          300: '#B8B2A3',
          400: '#8C8576',
          500: '#6B6454',
          600: '#4A4438',
          700: '#332F27',
          800: '#1F1C17',
          900: '#12100D',
        },
        clay: {
          50: '#FBF6F0',
          100: '#F5E8D8',
          200: '#E8CDAE',
          300: '#D9AC7C',
          400: '#C78A4E',
          500: '#B06B2E',
          600: '#8E5320',
          700: '#6B3E18',
          800: '#472A12',
          900: '#2A190B',
        },
        ochre: {
          50: '#FBF8EE',
          100: '#F5ECC8',
          200: '#EAD94E',
          300: '#D4BC2A',
          400: '#A89820',
          500: '#7E7319',
        },
        moss: {
          50: '#F0F4ED',
          100: '#D8E3CC',
          200: '#A8C08C',
          300: '#7A9A5C',
          400: '#5A7A40',
          500: '#3D5A2A',
        },
        sky: {
          50: '#EFF6FB',
          100: '#D2E6F2',
          200: '#A6CCE4',
          300: '#6FAAD0',
          400: '#3F87B5',
          500: '#1F6A99',
        },
        rust: {
          500: '#B0392A',
          600: '#8C2D20',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 8vw, 6.5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      },
    },
  },
  plugins: [],
};
