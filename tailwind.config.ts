import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bb-indigo': '#4f7cff',
        'bb-indigo-dark': '#2752d6',
        'bb-cyan': '#2de2e6',
        'bb-cyan-dark': '#0aa9bf',
      },
      animation: {
        'pulse-ring': 'pulse-ring 2s infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'waveform': 'waveform 0.3s ease-in-out',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(79, 124, 255, 0.7)' },
          '70%': { boxShadow: '0 0 0 20px rgba(79, 124, 255, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(79, 124, 255, 0)' },
        },
        'glow-pulse': {
          '0%, 100%': { textShadow: '0 0 10px rgba(79, 124, 255, 0.5)' },
          '50%': { textShadow: '0 0 20px rgba(79, 124, 255, 1)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'slide-up': {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          'from': { opacity: '0', transform: 'translateY(-10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'waveform': {
          '0%, 100%': { height: '4px' },
          '50%': { height: '20px' },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};

export default config;
