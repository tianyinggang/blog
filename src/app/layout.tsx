'use client';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { ProvideFilter } from 'src/context/filter';
import { ProvideSection } from 'src/context/section';
import Script from 'next/script';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

import '../styles/globals.css'; // Import global styles

export const metadata: Metadata = {
  title: 'Your Website Title', // Replace with your actual title
  description: 'Your website description', // Replace with your actual description
  viewport: 'width=device-width, initial-scale=1',
  manifest: '/favicons/site.webmanifest', // ✅ 修正：从 `icons` 里移到 `metadata` 根级
  themeColor: '#1d2a35',
  icons: {
    apple: '/favicons/apple-touch-icon.png',
    icon: [
      { url: '/favicons/favicon-32x32.png' },
      { url: '/favicons/favicon-16x16.png' },
      { url: '/favicons/favicon.ico' },
    ],
    shortcut: '/favicons/favicon.ico',
  },
  other: {
    'msapplication-TileColor': '#5bbad5',
    'mask-icon': '/favicons/safari-pinned-tab.svg',
    'mask-icon-color': '#5bbad5',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        delay: 0,
      });
    };

    const hideCursor = () => gsap.to(cursorRef.current, { opacity: 0 });
    const showCursor = () => gsap.to(cursorRef.current, { opacity: 1 });

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", hideCursor);
    document.addEventListener("mousedown", hideCursor);
    document.addEventListener("mouseup", showCursor);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", hideCursor);
      document.removeEventListener("mousedown", hideCursor);
      document.removeEventListener("mouseup", showCursor);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        {/* ✅ 直接在 <head> 里添加 Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bglight dark:bg-bgdark">
        {/* 自定义鼠标光标 */}
        <div
          ref={cursorRef}
          className="hidden lg:block w-12 h-12 opacity-0 pointer-events-none rounded-full border-2 border-marrsgreen dark:border-carrigreen z-[9999] fixed -translate-x-1/2 -translate-y-1/2"
        />
        <ThemeProvider attribute="class">
          <ProvideFilter>
            <ProvideSection>
              {children}
            </ProvideSection>
          </ProvideFilter>
        </ThemeProvider>

        {/* ✅ Google Analytics 脚本 */}
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <Script id="google-analytics-script" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  );
}
