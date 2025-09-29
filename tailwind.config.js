/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'compliance-red': '#dc2626',
        'compliance-yellow': '#fef3c7',
        'script-blue': '#dbeafe',
        'strategy-green': '#dcfce7',
        'interactive-blue': '#3b82f6',
        'progress-green': '#16a34a',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
