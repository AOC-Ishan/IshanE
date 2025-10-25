/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3B82F6', // blue-500
        'primary-hover': '#2563EB', // blue-600
        'secondary': '#10B981', // emerald-500
        'secondary-hover': '#059669', // emerald-600
        'background': '#F3F4F6', // gray-100
        'surface': '#FFFFFF',
        'text-primary': '#1F2937', // gray-800
        'text-secondary': '#4B5563', // gray-600
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
