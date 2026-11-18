import React from 'react';
import { cn } from '@/core/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div className={cn('panel p-6 text-[var(--color-text-primary)]', className)} {...props}>
      {children}
    </div>
  );
};
