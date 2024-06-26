/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        'ds-white': {
          DEFAULT: 'var(--ds-white-50)',
          100: 'var(--ds-white-100)',
        },
        'ds-black': {
          DEFAULT: 'var(--ds-black-500)',
          500: 'var(--ds-black-500)',
          400: 'var(--primary-bg)',
          300: 'var(--ds-black-300)',
        },
        'ds-orange': {
          DEFAULT: 'var(--ds-orange-500)',
          500: 'var(--ds-orange-500)',
          400: 'var(--ds-orange-400)',
        },
        design: {
          primary: 'var(--ds-black-400)',
          variant: 'var(--ds-orange-500)',
        },
        error: {
          DEFAULT: 'var(--ds-red-500)',
        },
        success: {
          DEFAULT: 'var(--ds-green-500)',
        }
      },
    },
  },
  plugins: [],
}
