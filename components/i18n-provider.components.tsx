"use client";

import { useEffect, type ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18n, { supportedLanguages } from "@/lib/i18n";

const LANGUAGE_STORAGE_KEY = "azsoft-language";

function I18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const syncDocumentLanguage = (language: string) => {
      document.documentElement.lang = language;
    };

    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage && supportedLanguages.includes(savedLanguage as (typeof supportedLanguages)[number])) {
      void i18n.changeLanguage(savedLanguage);
    }

    syncDocumentLanguage(i18n.resolvedLanguage ?? "uz");
    i18n.on("languageChanged", syncDocumentLanguage);

    return () => {
      i18n.off("languageChanged", syncDocumentLanguage);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

export default I18nProvider;
