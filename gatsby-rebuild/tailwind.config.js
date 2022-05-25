module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        "accent-1": "#FAFAFA",
        "accent-2": "#EAEAEA",
        "accent-7": "#333",
        success: "#0070f3",
        cyan: "#79FFE1",
        gravGreen: "#8eb48c", //Logo and footer
        gravDkGray: "#273246", 
        gravDkGrayFade: "rgba(39,50,70,.05)", 
        gravRedBrown: "#984a2d",
        gravYellow: "#f8b238",
        gravTan: "#c8ad90",
        gravDkGreen: "#0E513F",
        gravRed: "#731527",
        gravBlack: "#2b2b2b",
      },
      spacing: {
        28: "7rem",
      },
      letterSpacing: {
        tighter: "-.04em",
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
      },
      boxShadow: {
        small: "0 5px 10px rgba(0, 0, 0, 0.12)",
        medium: "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
