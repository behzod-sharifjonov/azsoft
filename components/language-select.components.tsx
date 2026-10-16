"use client";

import { useTranslation } from "react-i18next";
import i18n, { type SupportedLanguage } from "@/lib/i18n";

const languageCodes: Record<SupportedLanguage, string> = {
  uz: "UZB",
  ru: "РУС",
  en: "ENG",
};

function LanguageSelect({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { t } = useTranslation();
  const language = (i18n.resolvedLanguage ?? i18n.language) as SupportedLanguage;

  function handleLanguageChange(nextLanguage: string) {
    const supportedLanguage = nextLanguage as SupportedLanguage;
    window.localStorage.setItem("azsoft-language", supportedLanguage);
    void i18n.changeLanguage(supportedLanguage);
  }

  return (
    <label
      className={`flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold sm:px-4 sm:text-sm ${
        tone === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <span aria-hidden="true">🌐</span>
      <span className="sr-only">{t("nav.language")}</span>
      <select
        aria-label={t("nav.language")}
        value={language in languageCodes ? language : "uz"}
        onChange={(event) => handleLanguageChange(event.currentTarget.value)}
        className="cursor-pointer appearance-none bg-transparent outline-none"
      >
        <option value="uz">{languageCodes.uz}</option>
        <option value="ru">{languageCodes.ru}</option>
        <option value="en">{languageCodes.en}</option>
      </select>
    </label>
  );
}

export default LanguageSelect;
