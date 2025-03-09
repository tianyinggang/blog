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
        bglight: "#F9FAFB",    // 浅色模式背景不变
        marrslight: "#0097D2", // 绿色 → Monash Light Blue（较亮的蓝）
        marrsgreen: "#00A499", // 绿色 → Monash Teal（适合作强调色）
        marrsdark: "#003B5C",  // 深绿 → Monash Dark Blue（用于暗色模式）
        cardlight: "#E6E7E8",  // 绿色背景 → Monash Light Grey
      
        bgdark: "#003B5C",     // 深色背景 → Monash Dark Blue
        carrilight: "#0097D2", // 绿色亮色 → Monash Light Blue
        carrigreen: "#00A499", // 绿色主色 → Monash Teal
        carridark: "#006DAE",  // 深绿色 → Monash Blue（主色）
        carddark: "#003B5C",   // 绿色卡片背景 → Monash Dark Blue
        textlight: "#F9FAFB",  // 维持亮色字体
      },      
      
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};
