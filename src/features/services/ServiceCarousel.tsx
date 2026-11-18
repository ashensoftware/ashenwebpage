import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bot, Code, Database, Workflow } from 'lucide-react';
import { ASHEN_SERVICES } from '@/core/constants/ashenServices';
import { SERVICE_PILLARS } from '@/content/pillars';
import { pathFor, servicePath } from '@/config/routes';
import { useLocale, useT } from '@/hooks/useLocale';
import { ServiceCard } from './ServiceCard';
import './ServiceCarousel.css';

const PILLAR_ICONS = {
  bot: Bot,
  code: Code,
  database: Database,
  workflow: Workflow,
};

export const ServiceCarousel: React.FC = () => {
  const t = useT();
  const locale = useLocale();
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const isPaused = paused || !inView;

  return (
    <section id="catalog" className="relative w-full overflow-hidden border-b border-[var(--color-line)] bg-[var(--bg-primary)] py-20 md:py-28" aria-labelledby="catalog-title">
      <div className="pointer-events-none absolute left-1/4 top-0 h-[420px] w-[420px] rounded-full bg-[var(--color-accent-primary)]/10 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[420px] w-[420px] rounded-full bg-[var(--color-accent-tertiary)]/10 blur-[120px]" />

      <div className="relative z-10 mx-auto mb-12 w-full max-w-7xl px-6 text-center">
        <p className="eyebrow mb-4">{t('services.carouselLabel')}</p>
        <h2 id="catalog-title" className="font-display text-4xl font-semibold text-[var(--color-text-primary)] md:text-6xl">
          {t('services.carouselTitle')}
        </h2>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {SERVICE_PILLARS.map((pillar) => {
            const Icon = PILLAR_ICONS[pillar.icon];
            return (
              <Link
                key={pillar.id}
                to={pathFor(pillar.routeId, locale)}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--color-bg-secondary)] px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)]"
              >
                <Icon size={16} className="text-[var(--color-accent-primary)]" aria-hidden />
                {t(`pillars.${pillar.id}.title`)}
              </Link>
            );
          })}
        </div>
      </div>

      <div
        ref={rootRef}
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-20 w-16 bg-gradient-to-r from-[var(--bg-primary)] to-transparent md:w-40" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-20 w-16 bg-gradient-to-l from-[var(--bg-primary)] to-transparent md:w-40" />

        <div className={`ashen-marquee px-6 ${isPaused ? 'is-paused' : ''}`}>
          {ASHEN_SERVICES.map((service, index) => (
            <Link key={service.id} to={servicePath(service.id, locale)} className="block">
              <ServiceCard service={service} index={index} eager={index < 3} />
            </Link>
          ))}
          {ASHEN_SERVICES.map((service, index) => (
            <div
              key={`${service.id}-clone`}
              className="ashen-marquee-clone block cursor-pointer"
              aria-hidden="true"
              onClick={() => navigate(servicePath(service.id, locale))}
            >
              <ServiceCard service={service} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
