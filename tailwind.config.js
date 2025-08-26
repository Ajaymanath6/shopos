/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'polaris-blue': '#0070c0',
        'polaris-green': '#008060',
        'polaris-yellow': '#ffc453',
        'polaris-red': '#d82c0d',
        'polaris-surface': '#ffffff',
        'polaris-surface-subdued': '#fafbfb',
        'polaris-text': '#202223',
        'polaris-text-subdued': '#6d7175',
        'polaris-border': '#dfe3e8',
        'polaris-interactive': '#2c6ecb',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'sans-serif'],
      },
      spacing: { 
        'tight': '4px', 
        'base': '16px', 
        'loose': '20px' 
      },
      boxShadow: {
        'polaris-card': '0 0 0 1px rgba(0,0,0,0.05), 0 2px 2px rgba(0,0,0,0.05)',
        'polaris-button-focus': '0 0 0 3px #cce5ff',
      },
      borderRadius: { 
        'polaris': '3px' 
      },
    },
  },
  plugins: [],
}

