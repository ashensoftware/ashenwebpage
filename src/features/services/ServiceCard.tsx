import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Service } from '@/core/constants/ashenServices';
import { useT } from '@/hooks/useLocale';

interface ServiceCardProps {
  service: Service;
  index: number;
  eager?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, eager = false }) => {
  const t = useT();
  const title = t(`services_data.${service.id}.title`);
  const description = t(`services_data.${service.id}.description`);

  return (
    <article className="group relative flex h-[360px] w-[260px] flex-shrink-0 flex-col overflow-hidden rounded-[28px] border border-[var(--glass-border)] bg-[var(--color-bg-tertiary)] transition-transform duration-500 ease-out hover:-translate-y-2 md:h-[480px] md:w-[380px]">
      <img
        src={service.image}
        alt=""
        width={760}
        height={960}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover opacity-70 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />

      <div className="absolute right-5 top-5 flex items-center gap-2 text-white/70">
        <span className="text-xs font-black tracking-widest">{String(index + 1).padStart(2, '0')}</span>
        <ArrowUpRight size={16} className="translate-y-1 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-7">
        <h3 className="mb-3 line-clamp-3 text-2xl font-bold leading-snug text-white drop-shadow-lg md:text-3xl">{title}</h3>
        <p className="max-h-0 overflow-hidden text-sm leading-relaxed text-white/80 opacity-0 transition-all duration-500 group-hover:max-h-28 group-hover:opacity-100">
          {description}
        </p>
        <div className="mt-3 flex max-h-0 flex-wrap gap-2 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-16 group-hover:opacity-100">
          {service.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-4 h-1 w-12 rounded-full bg-white/30 transition-all duration-500 group-hover:w-full group-hover:bg-[var(--color-accent-primary)]" />
      </div>
    </article>
  );
};
