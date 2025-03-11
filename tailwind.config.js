module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",   // 扫描 src 目录中的所有 JavaScript 和 TypeScript 文件
    "./contents/**/*.{md,mdx}",      // 扫描 contents 目录中的 Markdown 文件
    "./public/**/*.{webp,png,jpg,svg}"  // 扫描 public 目录中的图片文件，可以根据需要增加其他格式
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
     // 基础背景
     bglight: "#F6F6F6",    // 浅灰
     bgdark: "#000000",     // 纯黑
     
     // 品牌主色系
     marrslight: "#00739d", // 辅助蓝
     marrsgreen: "#006DAE",  // Monash主蓝
     marrsdark: "#3c3c3c",  // 深灰
     
     // 卡片系统
     cardlight: "#FFFFFF",  // 纯白
     carddark: "#505050",   // 中灰
     
     // 功能色
     carrilight: "#F6F6F6", // 浅灰
     carrigreen: "#00739d", // 辅助蓝
     carridark: "#3c3c3c",  // 深灰
     
     // 文字系统
     textlight: "#3c3c3c",  // 深灰
     textdark: "#F6F6F6"   // 浅灰
      },      
      
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};
