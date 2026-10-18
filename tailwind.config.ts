import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          50: "var(--color-primary-50)",
          100: "var(--color-primary-100)",
          200: "var(--color-primary-200)",
          300: "var(--color-primary-300)",
          400: "var(--color-primary-400)",
          500: "var(--color-primary-500)",
          600: "var(--color-primary-600)",
          700: "var(--color-primary-700)",
          800: "var(--color-primary-800)",
          900: "var(--color-primary-900)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          soft: "var(--color-secondary-soft)",
        },
      },
      fontFamily: {
        arabic: ["var(--font-noto-kufi)", "sans-serif"], 
        english: ["var(--font-inter)", "sans-serif"],
        sans: ["var(--font-noto-kufi)", "var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;