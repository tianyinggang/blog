'use client'

import type { NextPage } from "next";

import AppHead from "@components/AppHead";
import Loader from "@components/Loader";
import SkipToMain from "@components/SkipToMain";
import Header from "@components/Header";
import SocialLinks from "@components/SocialLinks";
import HeroSection from "@components/sections/HeroSection";
import AboutSection from "@components/sections/AboutSection";
import ProjectSection from "@components/sections/ProjectSection";
import BlogSection from "@components/sections/BlogSection";
import ContactSection from "@components/sections/ContactSection";
import Footer from "@components/Footer";

import { MdxMeta } from "./blog/posts/[slug]";

type Props = {
  blogPosts: MdxMeta[];
};

export const meta = {
  description:
    "Felix is a AI developer based in Mlebourne, Austraila. He is passionate about writing codes and developing web applications to solve real-life challenges.",
  author: "Felix",
  type: "website",
  ogImage: `${process.env.NEXT_PUBLIC_URL}/satnaing-dev-og-new.png`,
  siteName: "Felix",
  imageAlt: "Felix portfolio website",
};

const HomePage: NextPage<Props> = ({ blogPosts }) => {
  return (
    <>
      <AppHead
        title="Felix - A AI Developer"
        url={`${process.env.NEXT_PUBLIC_URL}`}
        meta={meta}
      />
      <Loader>SatNaing.dev</Loader>
      <div className="bg-bglight dark:bg-bgdark overflow-hidden">
        <div className="selection:bg-marrsgreen selection:text-bglight dark:selection:bg-carrigreen dark:selection:text-bgdark">
          <SkipToMain />
          <Header />
          <main id="main">
            <HeroSection />
            <AboutSection />
            <ProjectSection />
            <BlogSection posts={blogPosts} /> {/*  假设 BlogSection 组件接收名为 `posts` 的 prop */}
            <ContactSection />
          </main>
          <SocialLinks page="index" />
          <Footer />
        </div>
      </div>
    </>
  );
};


export default HomePage;