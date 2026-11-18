import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/hooks/useLocale';

export function HtmlLang() {
  const locale = useLocale();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (!i18n.language.startsWith(locale)) {
      void i18n.changeLanguage(locale);
    }
    document.documentElement.lang = locale;
  }, [locale, i18n]);

  return null;
}
