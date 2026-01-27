import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/core/utils/cn';

interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
    isOpen?: boolean;
    onToggle?: () => void;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, onToggle }) => {
    return (
        <div className={cn(
            "border border-black/5 dark:border-white/5 rounded-2xl mb-4 overflow-hidden transition-all duration-300",
            isOpen ? "bg-black/[0.02] dark:bg-white/[0.03] border-brand-primary/20 shadow-lg shadow-brand-primary/5" : "bg-black/[0.01] dark:bg-white/[0.01] hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
        )}>
            <button
                onClick={onToggle}
                className="flex justify-between items-center w-full py-6 px-8 text-left transition-all group"
            >
                <span className={cn(
                    "text-lg font-bold transition-colors pr-8",
                    isOpen ? "text-brand-primary" : "text-[var(--color-text-primary)] group-hover:text-brand-primary/80"
                )}>
                    {title}
                </span>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={cn(
                        "p-2 rounded-lg transition-colors",
                        isOpen ? "bg-brand-primary/10 text-brand-primary" : "bg-black/5 dark:bg-white/5 text-text-muted group-hover:text-[var(--color-text-primary)]"
                    )}
                >
                    <ChevronDown size={20} />
                </motion.span>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <div className="pb-8 px-8 text-text-secondary leading-relaxed text-[1.05rem]">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

interface AccordionProps {
    items: { title: string; content: React.ReactNode }[];
    className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, className }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className={cn("w-full max-w-3xl mx-auto", className)}>
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    isOpen={activeIndex === index}
                    onToggle={() => handleToggle(index)}
                >
                    {item.content}
                </AccordionItem>
            ))}
        </div>
    );
};
