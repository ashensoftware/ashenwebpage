import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocale, useT } from '@/hooks/useLocale';
import { Bot, Code, Database, Workflow } from 'lucide-react';
import { ASHEN_SERVICES } from '@/core/constants/ashenServices';
import { SERVICE_PILLARS } from '@/content/pillars';
import { pathFor, servicePath } from '@/config/routes';
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
  const rootRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const loop = [...ASHEN_SERVICES, ...ASHEN_SERVICES];
  const isPaused = paused || !inView;

  return (
    <div className="relative w-full py-20 md:py-28 overflow-hidden bg-bg-primary">
      <div className="absolute top-0 left-1/4 w-[420px] h-[420px] bg-brand-primary/10 blur-[110px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px] bg-[var(--color-accent-tertiary)]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 mb-12 text-center">
        <p className="eyebrow mb-4">{t('services.label')}</p>
        <h2 className="font-display text-4xl font-semibold text-[var(--color-text-primary)] md:text-6xl">
          {t('services.title')}
        </h2>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {SERVICE_PILLARS.map((pillar) => {
            const Icon = PILLAR_ICONS[pillar.icon];
            return (
              <Link
                key={pillar.id}
                to={pathFor(pillar.routeId, locale)}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--color-bg-secondary)] px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] hover:border-brand-primary hover:text-brand-primary transition-colors"
              >
                <Icon size={16} className="text-brand-primary" />
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
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-40 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-40 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-20 pointer-events-none" />

        <div className={`ashen-marquee px-6 ${isPaused ? 'is-paused' : ''}`}>
          {loop.map((service, index) => (
            <Link
              key={`${service.id}-${index}`}
              to={servicePath(service.id, locale)}
              className="block"
            >
              <ServiceCard
                service={service}
                index={index % ASHEN_SERVICES.length}
                eager={index < 3}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
