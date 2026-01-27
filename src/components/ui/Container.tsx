import React from 'react';
import { cn } from '@/core/utils/cn';

export const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    return (
        <div className={cn("container-width w-full", className)}>
            {children}
        </div>
    );
};
