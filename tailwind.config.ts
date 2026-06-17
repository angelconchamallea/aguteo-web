import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        aqua:      '#7DD9D4',
        sky:       '#5BA8E8',
        lavender:  '#A98BE0',
        tangerine: '#F5A623',
        rose:      '#F2568C',
        coral:     '#F08080',
        butter:    '#EFD75B',
        blush:     '#F8C8D4',
        cream:     '#FFFDF8',
        ink:       '#4A4A5C',

        'aqua-soft':      '#E3F7F5',
        'aqua-deep':      '#136B66',
        'lavender-soft':  '#EFE9FA',
        'lavender-deep':  '#5A3FA0',
        'tangerine-soft': '#FDF1DC',
        'tangerine-deep': '#8F5A06',
        'rose-soft':      '#FDEAF1',
        'rose-deep':      '#9C2C55',
        'sky-soft':       '#E7F0FB',
        'sky-deep':       '#1F548F',
        'butter-soft':    '#FBF5DB',
        'butter-deep':    '#755F05',
        'blush-soft':     '#FDECF2',

        muted: '#8B8498',
        line:  '#F0E8E0',
      },
      fontFamily: {
        display: ['var(--font-baloo)'],
        sans:    ['var(--font-nunito)'],
      },
      borderRadius: {
        card: '1rem',
        pill: '9999px',
      },
    },
  },
  plugins: [],
}

export default config
