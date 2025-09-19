/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Replit Brand Colors
        'replit-orange': '#FF8500',
        'replit-dark': '#0E1525',
        'replit-gray': '#56687A',
        'replit-light-gray': '#F5F9FC',
        'replit-border': '#E5E7EB',
        
        // Semantic color mapping with Replit theme
        background: '#0E1525', // replit dark background
        foreground: '#FFFFFF', // white text
        card: '#1F2937', // dark card background
        border: '#374151', // subtle border
        muted: '#56687A', // muted text
        accent: {
          DEFAULT: '#FF8500', // replit orange
          foreground: '#FFFFFF',
        },
        primary: {
          DEFAULT: '#FF8500',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#56687A',
          foreground: '#FFFFFF',
        },
        // Semantic aliases for easier usage
        brand: {
          primary: '#FF8500',
          background: '#0E1525',
          foreground: '#FFFFFF',
          card: '#1F2937',
          border: '#374151',
          muted: '#56687A',
        }
      },
      keyframes: {
        'replit-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,133,0,0.3), 0 0 40px rgba(255,133,0,0.1)' },
          '50%': { boxShadow: '0 0 30px rgba(255,133,0,0.5), 0 0 60px rgba(255,133,0,0.2)' },
        },
        'shine-border': {
          '0%': { 
            transform: 'translateX(-100%)',
            background: 'linear-gradient(90deg, transparent, rgba(255,133,0,0.6), transparent)'
          },
          '100%': { 
            transform: 'translateX(100%)',
            background: 'linear-gradient(90deg, transparent, rgba(255,133,0,0.6), transparent)'
          }
        },
        'slide-in': {
          'from': { transform: 'translateY(12px)', opacity: 0 },
          'to': { transform: 'translateY(0)', opacity: 1 },
        },
        'card-float': {
          '0%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-6px) rotate(-0.25deg)' },
          '100%': { transform: 'translateY(0) rotate(0deg)' },
        },
        'fade-in-slow': {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'pulse-orange': {
          '0%, 100%': { backgroundColor: 'rgba(255,133,0,0.1)' },
          '50%': { backgroundColor: 'rgba(255,133,0,0.2)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      },
      animation: {
        'replit-glow': 'replit-glow 3s ease-in-out infinite',
        'shine-border': 'shine-border 2s linear infinite',
        'slide-in': 'slide-in 0.35s cubic-bezier(.22,.9,.3,1) forwards',
        'card-float': 'card-float 6s ease-in-out infinite',
        'fade-in-slow': 'fade-in-slow 0.6s ease-out both',
        'pulse-orange': 'pulse-orange 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
