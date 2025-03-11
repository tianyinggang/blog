"use client";

import { ThemeProvider } from "next-themes";
import { ProvideFilter } from "@context/filter";
import { ProvideSection } from "@context/section";
import Script from "next/script";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function RootLayoutClient({
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
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bglight dark:bg-bgdark">
        <div
          ref={cursorRef}
          className="hidden lg:block w-12 h-12 opacity-0 pointer-events-none rounded-full border-2 border-marrsgreen dark:border-carrigreen z-[9999] fixed -translate-x-1/2 -translate-y-1/2"
        />
        <ThemeProvider attribute="class">
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
      </body>
    </html>
  );
}
