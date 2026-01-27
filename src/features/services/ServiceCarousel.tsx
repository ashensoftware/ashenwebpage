
import React, { useRef, useLayoutEffect, useState } from 'react';
import {
    motion,
    useMotionValue,
    useAnimationFrame,
    PanInfo
} from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ASHEN_SERVICES } from '@/core/constants/ashenServices';
import { Typography } from '@/components/ui/Typography';
import { ServiceCard } from './ServiceCard';

/**
 * ServiceCarousel Component
 * 
 * Displays an infinite scrolling carousel of service cards.
 * Features:
 * - Physics-based animation using `useAnimationFrame`
 * - Pause on hover
 * - Drag to scroll support
 * - Infinite looping via list duplication
 */
export const ServiceCarousel: React.FC = () => {
    const { t } = useTranslation();

    // Duplicate list 3x for seamless looping coverage
    const services = [...ASHEN_SERVICES, ...ASHEN_SERVICES, ...ASHEN_SERVICES];

    const containerRef = useRef<HTMLDivElement>(null);
    const [totalWidth, setTotalWidth] = useState(0);

    const x = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    // Animation Loop Logic
    useAnimationFrame((_, delta) => {
        if (!totalWidth) return;

        let moveBy = -0.5 * (delta / 16); // Base speed

        if (isHovered) {
            moveBy = 0;
        }

        let newX = x.get() + moveBy;
        const singleSetWidth = totalWidth / 3;

        // Reset position for infinite loop illusion
        if (newX <= -singleSetWidth) {
            newX = 0;
        } else if (newX > 0) {
            newX = -singleSetWidth;
        }

        x.set(newX);
    });

    useLayoutEffect(() => {
        if (containerRef.current) {
            const scrollW = containerRef.current.scrollWidth;
            setTotalWidth(scrollW);
        }
    }, [services.length]);

    const handleDrag = (_: any, info: PanInfo) => {
        const newX = x.get() + info.delta.x;
        x.set(newX);
    };

    return (
        // Changed bg to a rich radial gradient
        <div className="relative w-full py-20 md:py-32 overflow-hidden bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-[var(--bg-primary)] via-[#0d0b26] to-[#000000]">
            {/* Background Effects */}
            {/* A subtle noise or grid could be cool here too */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

            {/* Orbs */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 mb-16 text-center select-none">
                <Typography variant="small" className="uppercase tracking-[0.3em] text-brand-primary mb-4 font-bold">
                    {t('services.subtitle', 'OUR EXPERTISE')}
                </Typography>
                <Typography variant="h2" className="text-4xl md:text-6xl font-black text-white">
                    {t('services.title', 'Services')} <span className="text-brand-primary">.</span>
                </Typography>
            </div>

            {/* Carousel Track */}
            <div
                className="relative w-full overflow-hidden"
                ref={containerRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Horizon Fades */}
                <div className="absolute top-0 bottom-0 left-0 w-24 md:w-64 bg-gradient-to-r from-[#0a0a0a] to-transparent z-20 pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-24 md:w-64 bg-gradient-to-l from-[#0a0a0a] to-transparent z-20 pointer-events-none" />

                <motion.div
                    className="flex gap-8 px-8 w-max cursor-grab active:cursor-grabbing"
                    style={{ x }}
                    drag="x"
                    dragConstraints={{ left: -10000, right: 10000 }}
                    onDrag={handleDrag}
                    whileTap={{ cursor: "grabbing" }}
                >
                    {services.map((service, index) => (
                        <ServiceCard
                            key={`${service.id}-${index}`}
                            service={service}
                            t={t}
                            index={index % ASHEN_SERVICES.length}
                        />
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
