import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primaryColor: 'var(--primary-color)',
        secondaryColor: 'var(--secondary-color)'
      },
      fontFamily: {
        CormorantGaramond: ['var(--font-cormorant-garamond)', 'serif'],
        Cinzel: ['var(--font-cinzel)', 'serif'],
        Poppins: ['var(--font-poppins)', 'sans-serif']
      },
      animation: {
        animate: 'animate 8s linear infinite'
      },
      keyframes: {
        animate: {
          '0%, 10%, 100%': { width: '0' },
          '70%, 90%': { width: '100%' }
        }
      },
      dropShadow: {
        gold: '0 0 20px #dab083'
      }
    }
  },
  plugins: []
} satisfies Config;
