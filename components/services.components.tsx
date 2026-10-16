"use client";

import { useTranslation } from "react-i18next";

type Service = {
  title: string;
  description: string;
};

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        d="M7 17 17 7M7 7h10v10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ServicesComponents() {
  const { t } = useTranslation();
  const services = t("services.items", { returnObjects: true }) as Service[];

  return (
    <section id="services" className="scroll-mt-8 bg-black px-4 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
      <div className="border-t border-white/30 pt-4 mb-10 sm:mb-14">
        <span className="text-xs font-bold tracking-wide text-white">{t("services.label")}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {services.map((service) => (
          <div
            key={service.title}
            className="group relative min-h-[260px] overflow-hidden rounded-2xl border border-white/15 bg-black px-6 py-8 transition-colors duration-500 hover:border-black hover:bg-white sm:min-h-[290px] sm:px-10 sm:py-12"
          >
            <button
              type="button"
              aria-label={t("services.more", { title: service.title })}
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition-colors duration-500 group-hover:border-black group-hover:text-black"
            >
              <ArrowIcon />
            </button>

            <h3 className="absolute left-6 right-14 top-1/2 -translate-y-1/2 text-3xl font-extrabold uppercase leading-none tracking-tight text-white transition-all duration-500 ease-out group-hover:top-8 group-hover:translate-y-0 group-hover:text-black sm:left-10 sm:right-20 sm:text-5xl sm:group-hover:top-12">
              {service.title}
            </h3>

            {service.description && (
              <p className="absolute left-6 right-6 top-24 max-w-sm -translate-y-2 text-sm font-medium leading-relaxed text-black opacity-0 transition-all delay-150 duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 sm:left-10 sm:right-10 sm:top-32 sm:text-base">
                {service.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServicesComponents;
