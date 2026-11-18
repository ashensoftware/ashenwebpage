import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/core/utils/cn';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  panelId: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, onToggle, panelId }) => {
  return (
    <div className={cn('border-b border-[var(--color-line)]', isOpen && 'bg-[var(--color-bg-secondary)]')}>
      <h3>
        <button
          type="button"
          onClick={onToggle}
          className="flex min-h-11 w-full items-center justify-between gap-6 px-1 py-4 text-left"
          aria-expanded={isOpen}
          aria-controls={panelId}
        >
          <span className="font-display text-lg text-[var(--color-text-primary)]">{title}</span>
          <ChevronDown size={18} className={cn('shrink-0 transition-transform', isOpen && 'rotate-180')} aria-hidden />
        </button>
      </h3>
      <div id={panelId} role="region" hidden={!isOpen} className="px-1 pb-5 text-[var(--color-text-secondary)] leading-relaxed">
        {children}
      </div>
    </div>
  );
};

interface AccordionProps {
  items: { title: string; content: React.ReactNode }[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, className }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className={cn('w-full border-t border-[var(--color-line)]', className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={item.title}
          title={item.title}
          panelId={`faq-panel-${index}`}
          isOpen={activeIndex === index}
          onToggle={() => setActiveIndex(activeIndex === index ? null : index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};
