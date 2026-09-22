/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
      colors: {
        brand: {
          blue: "#011fbd",
          "blue-bg": "#011fbd33",
          dark: "#1c1c1c",
          "dark-muted": "#292929",
          gray: "#f7f7f7",
          "gray-light": "#f3f5fc",
          "gray-mid": "#f5f5f5",
          muted: "#333333",
          border: "#e7e7e7",
        },
      },
      borderRadius: {
        section: "40px",
        card: "20px",
        "card-sm": "16px",
        "card-xs": "12px",
      },
      spacing: {
        "section-x": "150px",
        "section-y": "100px",
        "18": "72px",
      },
    },
  },
  plugins: [],
};
