import i18n, { createInstance, type i18n as I18nInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationES from './languages/es/translation.json';
import translationEN from './languages/en/translation.json';
import translationJA from './languages/ja/translation.json';
import { DEFAULT_LOCALE, localeFromPathname, type Locale } from './config/i18n';

export const i18nResources = {
  es: { translation: translationES },
  en: { translation: translationEN },
  ja: { translation: translationJA },
};

const i18nOptions = {
  fallbackLng: {
    ja: [] as string[],
    default: ['en'],
  },
  supportedLngs: ['en', 'es', 'ja'],
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
  initImmediate: false,
  resources: i18nResources,
};

const initialLng =
  typeof window === 'undefined' ? DEFAULT_LOCALE : localeFromPathname(window.location.pathname);

void i18n.use(initReactI18next).init({
  ...i18nOptions,
  lng: initialLng,
});

/** Fresh instance per prerender so one route cannot leak its language into the next. */
export async function createI18n(lng: Locale): Promise<I18nInstance> {
  const instance = createInstance();
  await instance.use(initReactI18next).init({
    ...i18nOptions,
    lng,
  });
  return instance;
}

export default i18n;
