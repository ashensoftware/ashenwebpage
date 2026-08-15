import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationES from './languages/es/translation.json';
import translationEN from './languages/en/translation.json';
import { DEFAULT_LOCALE, localeFromPathname } from './config/i18n';

const initialLng =
  typeof window === 'undefined' ? DEFAULT_LOCALE : localeFromPathname(window.location.pathname);

void i18n.use(initReactI18next).init({
  lng: initialLng,
  fallbackLng: DEFAULT_LOCALE,
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    es: { translation: translationES },
    en: { translation: translationEN },
  },
});

export default i18n;
