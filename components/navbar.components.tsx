"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSelect from "@/components/language-select.components";

interface NavItem {
  label: string;
  active?: boolean;
  href: string;
}

function NavbarComponents() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();
  const navItems: NavItem[] = [
    { label: t("nav.about"), active: true, href: "#about" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.projects"), href: "#portfolio" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <nav className="relative z-40 flex items-center justify-end border-b border-white/10 px-4 py-5 sm:px-8 lg:justify-between lg:gap-10 lg:px-16 lg:py-8">
      <ul className="hidden w-full items-center gap-5 lg:flex xl:gap-10">
        {navItems.map((item) => (
          <li key={item.label} className="min-w-0 flex-1">
            <a
              href={item.href}
              className={
                item.active
                  ? "block border-t-2 border-white pt-2 text-xs font-medium tracking-wide text-white xl:text-sm"
                  : "block border-t-2 border-white/40 pt-2 text-xs font-medium tracking-wide text-white/40 transition-colors hover:text-white xl:text-sm"
              }
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="hidden lg:block">
        <LanguageSelect />
      </div>

      <button
        type="button"
        aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen((open) => !open)}
        className="flex items-center gap-3 rounded-full border border-white/30 px-4 py-2.5 text-xs font-semibold tracking-wide text-white transition-colors hover:bg-white hover:text-black lg:hidden"
      >
        <span>{menuOpen ? t("nav.close") : t("nav.menu")}</span>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.7">
          {menuOpen ? (
            <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          )}
        </svg>
      </button>

      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-60 bg-black/70 transition-opacity duration-500 motion-reduce:transition-none ${menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      />

      <aside
        id="mobile-navigation"
        aria-label={t("nav.navigation")}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`fixed inset-y-0 right-0 z-70 flex w-[min(88vw,380px)] flex-col bg-white p-6 text-black shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-black/15 pb-6">
          <span className="text-sm font-bold tracking-wide">AZSOFT</span>
          <LanguageSelect tone="dark" />
        </div>

        <ul className="mt-8 flex flex-col">
          {navItems.map((item, index) => (
            <li key={item.label} className="border-b border-black/15">
              <a
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between gap-4 py-5 text-sm font-semibold tracking-wide transition-colors hover:text-black/50"
              >
                <span>{item.label}</span>
                <span className="text-xs text-black/40">0{index + 1}</span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-auto text-xs text-black/45">{t("nav.tagline")}</p>
      </aside>
    </nav>
  );
}

export default NavbarComponents;
