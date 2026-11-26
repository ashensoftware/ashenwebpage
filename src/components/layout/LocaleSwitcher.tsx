import { useEffect, useId, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { FlagEN, FlagES, FlagJA } from '@/components/icons/BrandIcons';
import { LOCALES, type Locale } from '@/config/i18n';
import { locationWithPath, persistLocalePreference } from '@/config/locale-preference';
import { alternatePath } from '@/config/routes';
import { useLocale, useT } from '@/hooks/useLocale';

const OPTIONS: { locale: Locale; code: string; label: string; Flag: typeof FlagEN }[] = [
  { locale: 'en', code: 'EN', label: 'English', Flag: FlagEN },
  { locale: 'es', code: 'ES', label: 'Español', Flag: FlagES },
  { locale: 'ja', code: 'JA', label: '日本語', Flag: FlagJA },
];

export function LocaleSwitcher({ variant = 'desktop' }: { variant?: 'desktop' | 'mobile' }) {
  const t = useT();
  const locale = useLocale();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const current = OPTIONS.find((option) => option.locale === locale) ?? OPTIONS[0];

  const choose = (nextLocale: Locale) => {
    persistLocalePreference(nextLocale);
    setOpen(false);
    const path = alternatePath(location.pathname, nextLocale);
    const href = locationWithPath(path, location.search, location.hash);
    if (href !== `${location.pathname}${location.search}${location.hash}`) {
      navigate(href);
    }
    triggerRef.current?.focus();
  };

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open || variant !== 'desktop') return;
    rootRef.current?.querySelector<HTMLButtonElement>('[role="menuitemradio"]')?.focus();
  }, [open, variant]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        setOpen(false);
        triggerRef.current?.focus();
      }
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        const items = [...(rootRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]') ?? [])];
        if (!items.length) return;
        const currentIndex = items.indexOf(document.activeElement as HTMLButtonElement);
        const delta = event.key === 'ArrowDown' ? 1 : -1;
        const next = items[(currentIndex + delta + items.length) % items.length];
        next?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (variant === 'mobile') {
    return (
      <div role="group" aria-label={t('a11y.language')} className="flex flex-col gap-1">
        {OPTIONS.map((option) => (
          <button
            key={option.locale}
            type="button"
            lang={option.locale}
            aria-pressed={locale === option.locale}
            onClick={() => choose(option.locale)}
            className={`inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-left text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-primary)] ${
              locale === option.locale ? 'text-[var(--color-accent-primary)]' : 'text-[var(--color-text-primary)]'
            }`}
          >
            <option.Flag size={16} />
            {option.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={rootRef} className="relative" data-locale-open={open ? 'true' : 'false'}>
      <button
        ref={triggerRef}
        type="button"
        className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-[var(--glass-border)] bg-[var(--color-bg-secondary)] px-3 text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-primary)]"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${t('a11y.language')}: ${current.label}`}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            setOpen(true);
          }
        }}
      >
        <current.Flag size={14} />
        <span className="lg:hidden">{current.code}</span>
        <span className="hidden lg:inline" lang={current.locale}>
          {current.label}
        </span>
        <ChevronDown size={14} aria-hidden className={open ? 'rotate-180' : ''} />
      </button>
      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label={t('a11y.language')}
          className="absolute right-0 top-full z-[60] mt-2 w-44 rounded-xl border border-[var(--glass-border)] bg-[var(--color-bg-secondary)] p-1 shadow-2xl"
        >
          {LOCALES.map((code) => {
            const option = OPTIONS.find((item) => item.locale === code)!;
            const selected = locale === option.locale;
            return (
              <button
                key={option.locale}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                lang={option.locale}
                onClick={() => choose(option.locale)}
                className={`flex min-h-11 w-full cursor-pointer items-center gap-2 rounded-lg px-3 text-left text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-primary)] ${
                  selected ? 'text-[var(--color-accent-primary)]' : 'text-[var(--color-text-primary)]'
                }`}
              >
                <option.Flag size={16} />
                {option.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
