import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/core/utils/cn'; // We need to create this utility or use clsx directly. Let's assume we will create it.

// Check if cn util exists, if not I will use template string for now, but plan to create it.
// Actually better to create the utility first.
// I'll assume standard atomic design means I should have a util for class merging.

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    icon,
    ...props
}) => {

    const baseStyles = "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-gradient-primary text-white shadow-[0_4px_14px_0_rgba(139,92,246,0.39)] hover:shadow-[0_6px_20px_rgba(139,92,246,0.23)] hover:-translate-y-0.5 border border-transparent",
        secondary: "bg-black/5 dark:bg-white/10 text-[var(--color-text-primary)] dark:text-white backdrop-blur-md border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/20",
        outline: "bg-transparent border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/10",
        ghost: "bg-transparent text-text-secondary hover:text-[var(--color-text-primary)] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5",
        glow: "bg-black dark:bg-black text-white border border-brand-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:shadow-[0_0_25px_rgba(139,92,246,0.8)]"
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
            {icon && <span className="ml-1">{icon}</span>}
        </motion.button>
    );
};
