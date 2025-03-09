module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./sections/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    fontFamily: {
      sans: ['"Jost"', "sans-serif"],
    },
    extend: {
      colors: {
        bglight: "#F9FAFB",
        marrslight: "#0097D2",  // Monash Light Blue
        marrsgreen: "#00A499",  // Monash Teal
        marrsdark: "#003B5C",   // Monash Dark Blue
        cardlight: "#E6E7E8",   // Monash Light Grey
      
        bgdark: "#003B5C",      // Monash Dark Blue
        carrilight: "#8DC63F",  // Monash Green
        carrigreen: "#00A499",  // Monash Teal
        carridark: "#006DAE",   // Monash Blue
        carddark: "#003B5C",    // Monash Dark Blue
        textlight: "#F9FAFB",   // 维持原有亮色文字
      },
      
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};
