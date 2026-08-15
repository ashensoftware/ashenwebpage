import { useT } from '@/hooks/useLocale';

export function SkipLink() {
  const t = useT();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-brand-primary focus:text-white"
    >
      {t('a11y.skip')}
    </a>
  );
}
