/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}", // If using Pages Router (less likely now)
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // Your UI components
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // Your App Router pages/layouts
  ],
  theme: {
    extend: {
      // Your theme extensions (colors, etc.)
    },
  },
  plugins: [],
}