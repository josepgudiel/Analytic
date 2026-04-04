import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy:           '#1e3a5f',
        'navy-dark':    '#152d4a',
        accent:         '#2563eb',
        'light-blue':   '#93c5fd',
        surface:        '#ffffff',
        'surface-warm': '#fdf9f5',
        'bg':           '#faf9f7',
        'bg-alt':       '#f5f2ee',
        'text-secondary': '#4a6280',
        'text-muted':     '#8a9db5',
      },
      fontFamily: {
        display: ['Cormorant', 'serif'],
        body:    ['Raleway', 'sans-serif'],
      },
      boxShadow: {
        'card':    '0 2px 8px rgba(30,58,95,0.08), 0 1px 3px rgba(30,58,95,0.05)',
        'card-md': '0 4px 20px rgba(30,58,95,0.10), 0 2px 8px rgba(30,58,95,0.06)',
        'card-lg': '0 12px 48px rgba(30,58,95,0.13), 0 4px 16px rgba(30,58,95,0.08)',
      },
      borderRadius: {
        'xl':  '14px',
        '2xl': '20px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
}

export default config
