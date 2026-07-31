/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chinese: {
          bgTop: '#C9081C',
          bgMiddle: '#EF2F2A',
          bgBottom: '#FF5A37',
          primary: '#EF3B32',
          deepRed: '#D92329',
          orange: '#FF8A28',
          yellow: '#FFB52E',
          blue: '#2E7CE6',
          green: '#38B950',
          purple: '#A73CEB',
          pink: '#E04AE9',
          darkText: '#242424',
          subText: '#666666',
        }
      },
      borderRadius: {
        'shell': '26px',
        'card': '16px',
        'feature': '14px',
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(0, 0, 0, 0.08)',
        'shell': '0 25px 60px -15px rgba(180, 20, 20, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'card-glow': '0 4px 20px rgba(239, 59, 50, 0.15)',
        'inner-glow': 'inset 0 1px 1px rgba(255, 255, 255, 0.4)',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
