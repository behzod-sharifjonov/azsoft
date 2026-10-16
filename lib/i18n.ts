import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/messages/en.json";
import ru from "@/messages/ru.json";
import uz from "@/messages/uz.json";

export const supportedLanguages = ["uz", "ru", "en"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources: {
      uz: { translation: uz },
      ru: { translation: ru },
      en: { translation: en },
    },
    lng: "uz",
    fallbackLng: "uz",
    supportedLngs: [...supportedLanguages],
    defaultNS: "translation",
    interpolation: { escapeValue: false },
    returnNull: false,
  });
}

export default i18n;
