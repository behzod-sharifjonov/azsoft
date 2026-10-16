"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

function SocialIcon({ type }: { type: "instagram" | "telegram" | "linkedin" }) {
  if (type === "instagram") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.6">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.7" cy="6.5" r=".8" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (type === "telegram") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <path d="m21 3-7.2 18-4.1-7.1L3 10.2 21 3Z" />
        <path d="m9.7 13.9 5-5" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.6">
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8 10v7M8 7.5v.1M12 17v-4a3 3 0 0 1 6 0v4M12 10v7" strokeLinecap="round" />
    </svg>
  );
}

function FooterComponents() {
  const [formNotice, setFormNotice] = useState("");
  const { t } = useTranslation();
  const footerLinks = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.projects"), href: "#portfolio" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <footer id="contact" className="scroll-mt-0 overflow-hidden bg-black px-4 pb-0 pt-10 text-white sm:px-8 sm:pt-12 lg:px-12 lg:pt-16">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="grid gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("footer.title")}</h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/75">
              {t("footer.description")}
            </p>
          </div>

          <form
            className="flex flex-col gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              setFormNotice(t("footer.backendNotice"));
            }}
          >
            <label className="sr-only" htmlFor="contact-name">{t("footer.name")}</label>
            <input id="contact-name" name="name" autoComplete="name" placeholder={t("footer.name")} required className="h-10 border-b border-white/50 bg-transparent text-sm text-white outline-none placeholder:text-white/75 focus:border-white" />
            <label className="sr-only" htmlFor="contact-phone">{t("footer.phone")}</label>
            <input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder={t("footer.phone")} required className="h-10 border-b border-white/50 bg-transparent text-sm text-white outline-none placeholder:text-white/75 focus:border-white" />
            <label className="sr-only" htmlFor="contact-message">{t("footer.message")}</label>
            <textarea id="contact-message" name="message" placeholder={t("footer.message")} rows={1} required className="min-h-10 resize-y border-b border-white/50 bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/75 focus:border-white" />
            <button type="submit" className="mt-1 h-11 rounded bg-[#d9dae2] text-xs font-semibold text-black transition-colors hover:bg-white">
              {t("footer.submit")}
            </button>
            <p aria-live="polite" className="min-h-4 text-xs text-white/60">{formNotice}</p>
          </form>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-4 sm:gap-5">
          {footerLinks.map((link) => (
            <a key={link.label} href={link.href} className="border-t border-white/50 pt-3 text-[11px] font-medium transition-colors hover:text-white/60">
              {link.label}
            </a>
          ))}
        </div>

        <div className="mt-7 flex justify-center gap-3">
          {(["instagram", "telegram", "linkedin"] as const).map((type) => (
            <span key={type} aria-label={type} className="text-white/90">
              <SocialIcon type={type} />
            </span>
          ))}
        </div>
        <p className="mt-5 text-center text-[10px] text-white/35">{t("footer.copyright")}</p>
      </div>

      <div aria-hidden="true" className="mt-7 select-none whitespace-nowrap text-center text-[clamp(4rem,18vw,16rem)] font-semibold leading-[0.78] tracking-[-0.075em] text-white/18">
        AZSOFT
      </div>
    </footer>
  );
}

export default FooterComponents;