import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
// import { RoughNotation } from "react-rough-notation";

import { useSection } from "@context/section";
import useOnScreen from "@hooks/useOnScreen";
import useScrollActive from "@hooks/useScrollActive";
import { MdxMeta } from "src/app/blog/posts/[slug]";
import BlogImageCard from "@components/BlogImageCard";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Props = {
  posts: MdxMeta[];
};

const BlogSection: React.FC<Props> = ({ posts }) => {
  const { theme } = useTheme();
  // 添加 mounted 状态以确保仅在客户端渲染时使用主题数据
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const sectionRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useOnScreen(elementRef);

  // 设置 blog 区块为激活状态
  const blogSection = useScrollActive(sectionRef);
  const { onSectionChange } = useSection();
  useEffect(() => {
    blogSection && onSectionChange!("blog");
  }, [blogSection, onSectionChange]);

  return (
    <div className="bg-[#F5F5F5] dark:bg-[#1B2731]">
      <section ref={sectionRef} id="blog" className="section md:px-10">
        <div className="text-center">
          {mounted ? (
            <h2
              className="section-heading"
              style={{
                borderBottom: `2px solid ${
                  theme === "light" ? "rgb(0, 122, 122)" : "rgb(5 206 145)"
                }`,
                display: "inline-block",
              }}
            >
              Blog
            </h2>
          ) : (
            <h2 className="section-heading">Blog</h2>
          )}
        </div>
        <div className="text-center mb-8" ref={elementRef}>
          I write blog posts about what I've done and what I'm doing{" "}
          <br className="hidden sm:block" aria-hidden="true" />
          as a documenting practice. Here are some of my recent blog posts.
        </div>
        <div>
          <Swiper
            modules={[Navigation, Pagination]}
            pagination={{ dynamicBullets: true }}
            wrapperTag="ul"
            navigation
            className="swiper-padding-mobile xs:swiper-padding"
            breakpoints={{
              100: {
                slidesPerView: "auto",
                spaceBetween: 50,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
                centeredSlides: true,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
                centeredSlides: false,
              },
            }}
          >
            {posts.map((post, index) => (
              <SwiperSlide key={post.slug} tag="li">
                <BlogImageCard
                  post={post}
                  className={`${index > 3 ? "hidden lg:block" : ""}`}
                  fullWH
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="mt-4 text-center">
            <Link href="/blog" className="link">
              Read all blog posts{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogSection;
