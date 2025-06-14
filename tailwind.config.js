/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "merienda": "Merienda",
      },
      colors: {
        "mybg": "#F2EDDF",
        "myPrimary": "#006fd3",
        "mySecondary": "#ff709c",
      },
      screens: {
        "4xl": "1921px",
        'max-992':{'max' : '992px'},
        'max-768':{'max' : '768px'},
        'max-576':{'max' : '576px'},
      },
      spacing: {
        "hero-lg": "calc(100vh - 80px)",
        "hero-md": "calc(100vh - 72px)",
        "hero-sm": "calc(100vh - 56px)",
        "45": "45%"
      }
    },
  },
  plugins: [],
}

