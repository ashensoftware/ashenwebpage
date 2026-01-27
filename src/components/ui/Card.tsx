import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/core/utils/cn';

interface CardProps extends HTMLMotionProps<"div"> {
    hoverEffect?: boolean;
    children: React.ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({
    children,
    hoverEffect = true,
    className,
    ...props
}) => {
    return (
        <motion.div
            className={cn(
                "glass-card rounded-2xl p-6 text-white relative overflow-hidden group",
                className
            )}
            whileHover={hoverEffect ? {
                y: -5,
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)',
            } : {}}
            transition={{ duration: 0.3 }}
            {...props}
        >
            <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};
