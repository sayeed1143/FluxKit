/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Ethan-Barrett palette
        eb1: '#252626', // dark gray
        eb2: '#0D0D0C', // near-black
        eb3: '#A6A6A6', // gray
        eb4: '#F2F2F2', // light gray
        eb5: '#BFBFBF', // mid gray

        background: '#F2F2F2', // eb4
        foreground: '#0D0D0C', // eb2
        card: '#FFFFFF',
        border: '#BFBFBF', // eb5
        muted: '#A6A6A6', // eb3
        accent: {
          DEFAULT: '#252626', // eb1
          foreground: '#FFFFFF',
        },
        // Semantic aliases for easier refactoring
        brand: {
          background: '#F2F2F2', // eb4
          foreground: '#0D0D0C', // eb2
          card: '#FFFFFF',
          border: '#BFBFBF', // eb5
          muted: '#A6A6A6', // eb3
        }
      },
      keyframes: {
        'subtle-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(47, 69, 114, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(47, 69, 114, 0.4)' },
        },
        'slide-in': {
          'from': { transform: 'translateY(10px)', opacity: 0 },
          'to': { transform: 'translateY(0)', opacity: 1 },
        }
      },
      animation: {
        'subtle-glow': 'subtle-glow 4s ease-in-out infinite',
        'slide-in': 'slide-in 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
};
