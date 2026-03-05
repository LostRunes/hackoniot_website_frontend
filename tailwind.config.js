/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        arcade: {
          dark: '#2E1F5E',
          pink: '#FF2E88',
          blue: '#2CC6FF',
          yellow: '#FFD84D',
          cyan: '#00F0FF'
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        press: ['"Press Start 2P"', 'cursive']
      },
      animation: {
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 10px #00E5FF)' },
          '50%': { opacity: '.5', filter: 'drop-shadow(0 0 2px #00E5FF)' },
        }
      }
    },
  },
  plugins: [],
}
