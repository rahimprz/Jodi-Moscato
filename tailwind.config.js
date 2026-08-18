/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#22B8F0',
        'primary-hover': '#1798D1',
        secondary: '#FFC933',
        accent: '#6D28D9',
        coral: '#FF6B81',
        mint: '#22C3A6',
        grape: '#A78BFA',
        textDark: '#1e293b',
        textLight: '#64748b',
        bgLight: '#FFF7EA',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        fun: ['"Comic Neue"', 'cursive', 'sans-serif'],
      },
      animation: {
        'flt-y': 'fltY 5s ease-in-out infinite',
        'flt-d': 'fltD 6s ease-in-out infinite',
        'flt-b': 'fltB 5s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
        'marquee-slow': 'marquee 40s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fltY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fltD: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-14px) rotate(3deg)' },
          '50%': { transform: 'translateY(-6px) rotate(-2deg)' },
          '75%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        fltB: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      }
    },
  },
  plugins: [],
}
