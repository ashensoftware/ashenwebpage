import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import languageDetector from "i18next-browser-languagedetector";
import translationES from './languages/es/translation.json';
import translationEN from './languages/en/translation.json';

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "es", // Idioma por defecto
    debug: true,
    interpolation: {
      escapeValue: false, // No escapamos las traducciones (ya que estamos usando React)
    },
    resources: {
      es: { translation: translationES },
      en: { translation: translationEN },
    },
  });

export default i18n;
