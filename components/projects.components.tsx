"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

const projects = [
  { name: "B2BSHOP", image: "/assets/b2b_landing.png", altKey: "projects.altB2b" },
  { name: "BAYKAL TERRA", image: "/assets/baykal_landing.png", altKey: "projects.altBaykal" },
  { name: "FIVE STONES", image: "/assets/fivestones_landing.png", altKey: "projects.altFiveStones" },
  { name: "OASIS TRAVEL", image: "/assets/oasis_landing.png", altKey: "projects.altOasis" },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.5">
      <path d="M7 17 17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProjectsComponents() {
  const { t } = useTranslation();

  return (
    <section id="portfolio" className="scroll-mt-8 rounded-t-[28px] bg-white px-4 py-10 text-black sm:px-8 sm:py-12 lg:px-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="mb-8 border-t border-black/40 pt-3 sm:mb-10">
          <span className="text-[11px] font-medium tracking-wide">{t("projects.label")}</span>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {projects.map((project) => (
            <article key={project.name} className="group min-w-0">
              <div className="relative aspect-[1.238/1] overflow-hidden rounded-t-xl bg-neutral-100 shadow-[0_0_12px_rgba(0,0,0,0.28)]">
                <Image
                  src={project.image}
                  alt={t(project.altKey)}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 600px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                />
              </div>
              <div className="flex items-center justify-between rounded-b-md bg-black px-3 py-2 text-white">
                <h3 className="text-xs font-semibold tracking-tight">{project.name}</h3>
                <a
                  href="#contact"
                  aria-label={t("projects.contact", { name: project.name })}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-white/40 transition-colors hover:bg-white hover:text-black"
                >
                  <ArrowIcon />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsComponents;