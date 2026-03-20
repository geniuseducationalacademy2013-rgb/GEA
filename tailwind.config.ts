import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3bc5f7',
          50: '#e6f8fe',
          100: '#cceffd',
          200: '#99dffb',
          300: '#66cff9',
          400: '#3bc5f7',
          500: '#0fb5ef',
          600: '#0c8bc7',
          700: '#096290',
          800: '#063a58',
          900: '#031320',
        },
      },
    },
  },
  plugins: [],
}
export default config
