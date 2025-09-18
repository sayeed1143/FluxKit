/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F2F2F2',
        foreground: '#0D0D0D',
        card: '#FFFFFF',
        border: '#E5E7EB',
        muted: '#64758C',
        accent: {
          DEFAULT: '#6366F1',
          foreground: '#FFFFFF',
        },
        // Semantic aliases for easier refactoring
        brand: {
          background: '#F2F2F2',
          foreground: '#0D0D0D',
          card: '#FFFFFF',
          border: '#E5E7EB',
          muted: '#64758C',
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
