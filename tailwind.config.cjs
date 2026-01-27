const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'var(--bg-primary)', // Matches :root --bg-primary
          secondary: 'var(--color-bg-secondary)',
          tertiary: 'var(--color-bg-tertiary)',
        },
        brand: {
          primary: 'var(--color-accent-primary)',
          secondary: 'var(--color-accent-secondary)',
          accent: 'var(--color-accent-secondary)',
          dark: '#4c1d95', // Keep hardcoded or add var if needed
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
        'gradient-dark': 'linear-gradient(to bottom, #010014 0%, #0a0a1f 100%)',
        'gradient-glow': 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, rgba(1, 0, 20, 0) 70%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [
    typography,
    forms,
  ],
}
