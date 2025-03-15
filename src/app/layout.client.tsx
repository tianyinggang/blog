// src/app/layout.client.tsx
"use client";

import { ThemeProvider } from "next-themes";
import { ProvideFilter } from "@context/filter";
import { ProvideSection } from "@context/section";
import Script from "next/script";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 客户端挂载后设置 mounted 为 true
    setMounted(true);

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
    <>
      {/* 只有在客户端挂载后才显示光标 */}
      {mounted && (
        <div
          ref={cursorRef}
          className="hidden lg:block w-12 h-12 opacity-0 pointer-events-none rounded-full border-2 border-marrsgreen dark:border-carrigreen z-[9999] fixed -translate-x-1/2 -translate-y-1/2"
        />
      )}
      {/* 由 ThemeProvider 管理主题 */}
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
        <ProvideFilter>
          <ProvideSection>{children}</ProvideSection>
        </ProvideFilter>
      </ThemeProvider>
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
    </>
  );
}
