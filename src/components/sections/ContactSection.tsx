import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

import LinkButton from "@components/LinkButton";
import { useSection } from "@context/section";
import useOnScreen from "@hooks/useOnScreen";
import useScrollActive from "@hooks/useScrollActive";

const ContactSection: React.FC = () => {
  const { theme } = useTheme();
  // 添加 mounted 状态，确保只有在客户端挂载后再使用主题数据
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const sectionRef = useRef<HTMLDivElement>(null);
  const isSecOnScreen = useOnScreen(sectionRef);

  const elementRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useOnScreen(elementRef);

  // 设置激活的导航链接
  const contactSection = useScrollActive(sectionRef);
  const { onSectionChange } = useSection();
  useEffect(() => {
    if (contactSection) onSectionChange("contact");
  }, [contactSection, onSectionChange]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section min-h-[700px] text-center"
    >
      <div className="text-center">
        {mounted ? (
          <h2
            className="text-2xl inline-block my-6 font-medium"
            style={{
              borderBottom: `2px solid ${
                theme === "light" ? "rgb(0, 122, 122)" : "rgb(5 206 145)"
              }`,
            }}
          >
            Contact
          </h2>
        ) : (
          <h2 className="text-2xl inline-block my-6 font-medium">
            Contact
          </h2>
        )}
      </div>
      <div className="mt-8 mb-20">
        <h3 className="font-medium text-lg mb-2 md:text-3xl" ref={elementRef}>
          Let's be awesome together!
        </h3>
        <p className="mb-6 mx-auto max-w-lg md:mb-10 lg:leading-loose">
          As a dev, I am driven by my love for coding and my desire for new
          challenges. If you have opportunities for collaboration or want to
          build something amazing, don't hesitate to contact me!
        </p>
        <LinkButton href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>
          Get in touch!
        </LinkButton>
      </div>
    </section>
  );
};

export default ContactSection;
