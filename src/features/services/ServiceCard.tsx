import React from 'react';
import { useT } from '@/hooks/useLocale';
import { ArrowUpRight } from 'lucide-react';
import type { Service } from '@/core/constants/ashenServices';

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
    <article className="relative w-[260px] md:w-[380px] h-[360px] md:h-[480px] rounded-[28px] overflow-hidden flex-shrink-0 border border-[var(--glass-border)] bg-[var(--color-bg-tertiary)] group transition-transform duration-500 ease-out hover:-translate-y-2">
      <img
        src={service.image}
        alt=""
        width={760}
        height={960}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />

      <div className="absolute top-5 right-5 flex items-center gap-2 text-white/70">
        <span className="text-xs font-black tracking-widest">{String(index + 1).padStart(2, '0')}</span>
        <ArrowUpRight size={16} className="opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
      </div>

      <div className="absolute inset-0 p-7 flex flex-col justify-end">
        <h3 className="text-white font-bold leading-tight mb-3 text-2xl md:text-3xl drop-shadow-lg">
          {title}
        </h3>
        <p className="text-white/80 text-sm leading-relaxed max-h-0 overflow-hidden opacity-0 group-hover:max-h-28 group-hover:opacity-100 transition-all duration-500">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mt-3 max-h-0 overflow-hidden opacity-0 group-hover:max-h-16 group-hover:opacity-100 transition-all duration-500">
          {service.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-white/15 backdrop-blur-md rounded-full text-white border border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="w-12 h-1 bg-white/30 rounded-full mt-4 group-hover:w-full group-hover:bg-[var(--color-accent-primary)] transition-all duration-500" />
      </div>
    </article>
  );
};
