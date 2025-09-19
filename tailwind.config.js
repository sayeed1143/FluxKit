/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Updated site palette
        background: '#f9f9f9',
        foreground: '#383b43',
        card: '#c9d5e3',
        border: '#c9d5e3',
        muted: '#383b43',
        accent: {
          DEFAULT: '#383b43',
          foreground: '#ffffff',
        },
        // Semantic aliases
        brand: {
          background: '#f9f9f9',
          foreground: '#383b43',
          card: '#c9d5e3',
          border: '#c9d5e3',
          muted: '#383b43',
        }
      },
      keyframes: {
        'subtle-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(56,59,67,0.08)' },
          '50%': { boxShadow: '0 0 30px rgba(56,59,67,0.12)' },
        },
        'slide-in': {
          'from': { transform: 'translateY(10px)', opacity: 0 },
          'to': { transform: 'translateY(0)', opacity: 1 },
        },
        'shine': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        'subtle-glow': 'subtle-glow 4s ease-in-out infinite',
        'slide-in': 'slide-in 0.3s ease-out forwards',
        'card-shine': 'shine 1s linear',
      },
    },
  },
  plugins: [],
};
