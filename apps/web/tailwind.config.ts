import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/ui/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#C41E24',
          'red-dark': '#9E1820',
          'red-light': '#E8353C',
          charcoal: '#2D2D2D',
          'gray-dark': '#3D3D3D',
          'gray-mid': '#6B6B6B',
          'gray-light': '#E5E5E5',
          cream: '#F5F3F0',
          white: '#FFFFFF',
          primary: '#2D5016',
          secondary: '#D4A574',
          accent: '#E8B047',
          light: '#F5EFE7',
          dark: '#1a1a1a',
          earth: '#8B7355',
          success: '#4CAF50',
          warning: '#FF9800',
          danger: '#F44336',
          info: '#2196F3',
        },
        accent: {
          gold: '#D4A843',
          green: '#2D7D46',
          blue: '#1E5FA0',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
