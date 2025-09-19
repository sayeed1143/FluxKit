/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Updated site palette (requested)
        background: '#f3f3f3',
        foreground: '#0D0D0C',
        card: '#252626',
        border: '#252626',
        muted: '#BFBFBF',
        accent: {
          DEFAULT: '#252626',
          foreground: '#ffffff',
        },
        // Semantic aliases
        brand: {
          background: '#f3f3f3',
          foreground: '#0D0D0C',
          card: '#252626',
          border: '#252626',
          muted: '#BFBFBF',
        }
      },
      keyframes: {
        'subtle-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(37,38,38,0.06)' },
          '50%': { boxShadow: '0 0 30px rgba(37,38,38,0.09)' },
        },
        'slide-in': {
          'from': { transform: 'translateY(12px)', opacity: 0 },
          'to': { transform: 'translateY(0)', opacity: 1 },
        },
        'shine': {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(120%)' },
        },
        'card-float': {
          '0%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-6px) rotate(-0.25deg)' },
          '100%': { transform: 'translateY(0) rotate(0deg)' },
        },
        'fade-in-slow': {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        }
      },
      animation: {
        'subtle-glow': 'subtle-glow 4s ease-in-out infinite',
        'slide-in': 'slide-in 0.35s cubic-bezier(.22,.9,.3,1) forwards',
        'card-shine': 'shine 1s linear',
        'card-float': 'card-float 6s ease-in-out infinite',
        'fade-in-slow': 'fade-in-slow 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};
