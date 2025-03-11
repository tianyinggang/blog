// ❌ 这里不要 `use client`，否则会报错
import type { Metadata } from "next";
import "../styles/globals.css"; // 依然可以导入全局 CSS
import RootLayoutClient from "./layout.client"; // 引入客户端组件

export const metadata: Metadata = {
  title: "Your Website Title",
  description: "Your website description",
  viewport: "width=device-width, initial-scale=1",
  manifest: "/favicons/site.webmanifest",
  themeColor: "#1d2a35",
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

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
}
