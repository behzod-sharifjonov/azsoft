"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";




// Headline split into words so each one can animate in individually.
// "AZSOFT" keeps its italic styling as its own word.
interface HeadlineWord {
  text: string;
  italic?: boolean;
}

const WORD_INTERVAL_MS = 140; // delay between each word appearing
const START_DELAY_MS = 200; // pause before the first word appears
const FLIP_DURATION_MS = 650;

function useWordReveal(totalWords: number, interval: number, startDelay = 0) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    const startId = setTimeout(() => {
      intervalId = setInterval(() => {
        setVisibleCount((prev) => {
          if (prev >= totalWords) {
            clearInterval(intervalId);
            return prev;
          }
          return prev + 1;
        });
      }, interval);
    }, startDelay);

    return () => {
      clearTimeout(startId);
      clearInterval(intervalId);
    };
  }, [totalWords, interval, startDelay]);

  return visibleCount;
}

function AnimatedHeadline({ words }: { words: HeadlineWord[] }) {
  const visibleCount = useWordReveal(
    words.length,
    WORD_INTERVAL_MS,
    START_DELAY_MS,
  );

  return (
    <h1 className="max-w-4xl text-[clamp(2rem,8vw,3rem)] font-bold leading-tight sm:text-5xl lg:text-6xl">
      {words.map((word, i) => {
        const isVisible = i < visibleCount;
        return (
          <span
            key={i}
            className="inline-block pb-[0.15em]"
            style={{ perspective: "600px" }}
          >
            <span
              className={"inline-block" + (word.italic ? " italic" : "")}
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "50% 100%",
                transform: isVisible
                  ? "rotateX(0deg) translateY(0)"
                  : "rotateX(-100deg) translateY(60%)",
                opacity: isVisible ? 1 : 0,
                transition: `transform ${FLIP_DURATION_MS}ms cubic-bezier(0.16, 1, 0.3, 1), opacity ${FLIP_DURATION_MS * 0.5}ms ease-out`,
              }}
            >
              {word.text}
            </span>
            {/* space between words, not affected by the transform */}
            {"\u00A0"}
          </span>
        );
      })}
    </h1>
  );
}

function HeroSection() {
  const { t, i18n } = useTranslation();
  const headlineWords = t("hero.words", { returnObjects: true }) as HeadlineWord[];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Background moon image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/hero_image.png')",
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col px-5 py-6 sm:px-8 sm:py-8 lg:px-16">

        {/* Logo */}
        <div className="mt-2 sm:mt-4">
          <span className="text-3xl font-black italic tracking-tight sm:text-4xl">
            AZSOFT
          </span>
        </div>

        {/* Headline + CTA row */}
        <div className="mt-12 flex flex-1 flex-col justify-between gap-12 sm:mt-16 sm:gap-16 lg:flex-row lg:items-start">
          <AnimatedHeadline key={i18n.resolvedLanguage} words={headlineWords} />

          <div className="flex max-w-xs flex-col gap-5 lg:mt-2">
            <p className="text-sm leading-relaxed text-[#D9DAE2]">
              {t("hero.description")}
            </p>
            <a href="#contact" className="w-fit rounded-md bg-[#D9DAE2] px-6 py-3 text-sm font-semibold tracking-wide text-[#000000] backdrop-blur-sm hover:bg-white/20 transition-colors">
              {t("hero.contact")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
