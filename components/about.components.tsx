"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLParagraphElement>();

  return (
    <p
      ref={ref}
      className="text-3xl sm:text-4xl font-bold leading-tight text-black"
      style={{
        opacity: inView ? 1 : 0,
        filter: inView ? "blur(0px)" : "blur(8px)",
        transition: `opacity 900ms ease-out ${delay}ms, filter 900ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </p>
  );
}

function AboutComponents() {
  const { t } = useTranslation();

  return (
    <section id="about" className="scroll-mt-8 bg-white rounded-2xl">
      <div className="rounded-[28px] px-6 py-12 sm:px-12 sm:py-16">
        <div className="border-t border-black/80 pt-4 mb-10 sm:mb-14">
          <span className="text-xs font-bold tracking-wide text-black">{t("about.label")}</span>
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-8 sm:space-y-10">
          <Reveal delay={0}>
            {t("about.first")}
          </Reveal>

          <Reveal delay={150}>
            {t("about.second")}
          </Reveal>

          <Reveal delay={300}>
            {t("about.third")}
          </Reveal>
        </div>

        <div className="flex justify-center mt-10 sm:mt-14">
          <a href="#portfolio" className="inline-flex bg-black text-white text-xs font-bold tracking-wide px-6 py-4 rounded-xl hover:bg-neutral-800 transition-colors">
            {t("about.projects")}
          </a>
        </div>
      </div>
    </section>
  );
}

export default AboutComponents;
