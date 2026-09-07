/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          800: '#151D2E',
          850: '#101827',
          900: '#0B1220',
          950: '#070C16',
        },
        brand: {
          50: '#F0F5FF',
          100: '#E0EBFF',
          200: '#C7D9FE',
          300: '#A4C0FD',
          400: '#7B9FFB',
          500: '#4F78F5',
          600: '#315EF6', // Electric Indigo / Royal Blue
          700: '#254AD4',
          800: '#1D3BB2',
          900: '#193091',
          950: '#0B1220',
        },
        cyan: {
          400: '#4EA7FF', // Soft Cyan / Blue
          500: '#2C92FF',
          600: '#0284C7',
        },
        surface: {
          light: '#FFFFFF',
          muted: '#F4F7FB',
          subtle: '#EEF3FA',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(11, 18, 32, 0.05)',
        'card': '0 2px 8px -2px rgba(11, 18, 32, 0.06), 0 1px 4px -1px rgba(11, 18, 32, 0.04)',
        'card-hover': '0 12px 24px -6px rgba(11, 18, 32, 0.09), 0 4px 8px -2px rgba(11, 18, 32, 0.04)',
        'glow-sm': '0 0 15px -3px rgba(49, 94, 246, 0.3)',
        'glow': '0 0 30px -5px rgba(49, 94, 246, 0.4)',
        'glow-cyan': '0 0 25px -4px rgba(78, 167, 255, 0.35)',
        'modal': '0 20px 25px -5px rgba(11, 18, 32, 0.15), 0 8px 10px -6px rgba(11, 18, 32, 0.08)',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float-slow 5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

