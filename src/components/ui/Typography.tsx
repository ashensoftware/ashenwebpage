import React from 'react';
import { cn } from '@/core/utils/cn';

interface TypographyProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'small' | 'lead';
    gradient?: boolean;
    as?: any;
}

export const Typography: React.FC<TypographyProps> = ({
    children,
    className,
    variant = 'body',
    gradient = false,
    as,
    ...props
}) => {
    const Component = as || (variant.startsWith('h') ? variant : 'p');

    const variants = {
        h1: "text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight font-display text-[var(--color-text-primary)]",
        h2: "text-3xl md:text-5xl font-bold tracking-tight font-display text-[var(--color-text-primary)]",
        h3: "text-2xl md:text-3xl font-bold font-display text-[var(--color-text-primary)]",
        h4: "text-xl md:text-2xl font-semibold font-display text-[var(--color-text-primary)]",
        lead: "text-xl md:text-2xl text-text-secondary font-light",
        body: "text-base text-text-secondary leading-relaxed",
        small: "text-sm text-text-muted",
    };

    return (
        <Component
            className={cn(
                variants[variant],
                gradient && "text-gradient bg-clip-text text-transparent bg-gradient-brand",
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
};
