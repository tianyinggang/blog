import type { Metadata, Viewport } from "next";
import "../styles/globals.css"; // 导入全局 CSS
import RootLayoutClient from "./layout.client"; // 引入客户端组件

export const metadata: Metadata = {
  title: "Your Website Title",
  description: "Your website description",
  manifest: "/favicons/site.webmanifest",
  icons: {
    apple: "/favicons/apple-touch-icon.png",
    icon: [
      { url: "/favicons/favicon-32x32.png" },
      { url: "/favicons/favicon-16x16.png" },
      { url: "/favicons/favicon.ico" },
    ],
    shortcut: "/favicons/favicon.ico",
  },
  other: {
    "msapplication-TileColor": "#5bbad5",
    "mask-icon": "/favicons/safari-pinned-tab.svg",
    "mask-icon-color": "#5bbad5",
  },
};

// 移除 metadata 里的 viewport，改成单独导出
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// themeColor 也需要单独导出
export const themeColor = "#1d2a35";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bglight dark:bg-bgdark">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
