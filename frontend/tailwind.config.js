/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: { DEFAULT: 'rgb(var(--bg-primary) / <alpha-value>)', subtle: 'rgb(var(--bg-secondary) / <alpha-value>)', dark: 'rgb(var(--surface-elevated) / <alpha-value>)' },
        charcoal: { DEFAULT: 'rgb(var(--text-primary) / <alpha-value>)', pure: 'rgb(var(--bg-primary) / <alpha-value>)', muted: 'rgb(var(--surface-card) / <alpha-value>)', soft: 'rgb(var(--text-secondary) / <alpha-value>)' },
        terracotta: { DEFAULT: 'rgb(var(--accent-terracotta) / <alpha-value>)', light: 'rgb(var(--accent-terracotta) / .75)', dark: 'rgb(var(--accent-terracotta) / .85)' },
        ochre: { DEFAULT: 'rgb(var(--accent-amber) / <alpha-value>)', light: 'rgb(var(--accent-amber) / .75)' },
        sand: { DEFAULT: 'rgb(var(--border-subtle) / <alpha-value>)', light: 'rgb(var(--text-secondary) / .7)', dark: 'rgb(var(--text-tertiary) / <alpha-value>)' },
        moss: { DEFAULT: 'rgb(var(--feedback-success) / <alpha-value>)', light: 'rgb(var(--feedback-success) / .8)' },
        'accent-amber': 'rgb(var(--accent-amber) / <alpha-value>)',
        'accent-terracotta': 'rgb(var(--accent-terracotta) / <alpha-value>)',
      },
      fontFamily: { serif: ['"Cormorant Garamond"', 'Georgia', 'serif'], sans: ['Inter', 'system-ui', 'sans-serif'] },
      letterSpacing: { widest: '.2em', ultra: '.35em' },
    },
  },
  plugins: [],
};
