import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        alabaster: '#FAF9F6',
        surface: '#F5F4F0',
        midnight: '#121212',
        'midnight-muted': '#5A5A55',
        champagne: '#C5A028',
        'champagne-glow': '#E2BC51',
        'border-light': 'rgba(0, 0, 0, 0.08)',
        obsidian: '#080808',
        'border-dark': '#1E1E1E',
        silk: '#F5F0E8',
        'silk-muted': '#8A8478',
        gold: '#C9A84C',
        'gold-glow': '#E8C96A',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
