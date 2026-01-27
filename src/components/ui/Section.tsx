import React from 'react';
import { cn } from '@/core/utils/cn';

interface SectionProps {
    id?: string;
    className?: string;
    children: React.ReactNode;
    centered?: boolean;
    fullWidth?: boolean;
}

export const Section: React.FC<SectionProps> = ({
    id,
    className,
    children,
    centered = false,
    fullWidth = false,
}) => {
    return (
        <section
            id={id}
            className={cn(
                "relative py-20 w-full flex flex-col",
                centered && "items-center",
                !fullWidth && "container-width",
                className
            )}
        >
            {children}
        </section>
    );
};
