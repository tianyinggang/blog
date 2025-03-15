"use client"; // 这个指令告诉 Next.js 这是一个客户端组件
// src/app/blog/page.tsx
import { useEffect, useState } from "react";
import AppHead from "@components/AppHead";
import BlogHeroSection from "@components/sections/BlogHeroSection";
import SkipToMain from "@components/SkipToMain";
import SocialLinks from "@components/SocialLinks";
import BlogHeader from "@components/blog/BlogHeader";
import BlogCard from "@components/BlogCard";
import Footer from "@components/Footer";
import { useFilter } from "@context/filter";
import Loader from "@components/Loader";

// 定义博客数据类型
type MdxMeta = {
  slug: string;
  title: string;
  excerpt: string;
  datetime: string;
  featured: boolean;
  language: string;
};

const Blog = () => {
  const [posts, setPosts] = useState<MdxMeta[]>([]); // 存储博客文章
  const [loading, setLoading] = useState(true); // 用于显示加载状态
  const { searchText, postLanguage } = useFilter();

  // 异步获取博客数据
  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts"); // 替换为你的 API 或文件获取路径
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data: MdxMeta[] = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <Loader>Felix&apos;s Blog</Loader>;
  }

  return (
    <>
      <AppHead title="Blog - Felix" />
      <div className="bg-bglight dark:bg-bgdark min-h-screen">
        <div className="selection:bg-marrsgreen selection:text-bglight dark:selection:bg-carrigreen dark:selection:text-bgdark">
          <SkipToMain />
          <BlogHeader />
          <SocialLinks />
          <main id="main" className="mb-20">
            <BlogHeroSection />
            {searchText === "" && postLanguage === "All" && (
              <>
                <div className="px-4 sm:px-8 md:px-20 max-w-4xl mx-auto">
                  <h2 className="text-2xl font-medium mb-2">Featured Posts</h2>
                  <ul>
                    {posts.map(
                      (post) =>
                        post.featured && (
                          <BlogCard post={post} key={post.slug} />
                        )
                    )}
                  </ul>
                </div>
                <hr
                  aria-hidden="true"
                  className="mx-4 sm:mx-20 md:mx-auto max-w-xl lg:max-w-2xl my-6"
                />
              </>
            )}
            <div className="px-4 sm:px-8 md:px-20 max-w-4xl mx-auto">
              <h2 className="text-2xl font-medium mb-2">
                {searchText === "" && postLanguage === "All" && "All Posts"}
                {searchText !== "" && <div>Search result(s)</div>}
                {postLanguage !== "All" &&
                  `Posts written in '${postLanguage}' language`}
              </h2>
              <ul>
                {posts
                  .filter(({ title }) =>
                    title.toLowerCase().includes(searchText.toLowerCase())
                  )
                  .filter(({ language }) => {
                    if (postLanguage === "All") return true;
                    return language === postLanguage;
                  })
                  .map((post) => (
                    <BlogCard post={post} key={post.slug} />
                  ))}
              </ul>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Blog;
