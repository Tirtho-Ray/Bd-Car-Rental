/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
    theme: {
      extend: {
        colors: {
          'dark-6': '#333333', // Customize this color as needed
        },
      },
    },
  
  plugins: [],
}