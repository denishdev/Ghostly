
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, rgba(190, 205, 212, 1) 0%, rgba(85, 208, 130, 1) 50%, rgba(235, 232, 221, 1) 100%)',
      },
    },
  },
  plugins: [],
}
export default config
