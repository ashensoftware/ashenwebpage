
import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '@/components/ui/Typography';
import { Service } from '@/core/constants/ashenServices';

interface ServiceCardProps {
    service: Service;
    t: any;
    index: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, t, index }) => {
    return (
        <motion.div
            className="relative w-[280px] md:w-[420px] h-[380px] md:h-[520px] rounded-[32px] overflow-hidden group flex-shrink-0 bg-white/5 border border-white/10"
            whileHover={{ scale: 1.05, y: -10, zIndex: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
            {/* Background Image */}
            <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 group-hover:scale-110"
                draggable={false}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 transition-opacity duration-300" />

            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <span className="text-6xl font-black text-white/5 absolute top-6 right-6 pointer-events-none transition-opacity group-hover:opacity-100 opacity-0">
                        {String(index + 1).padStart(2, '0')}
                    </span>

                    <Typography variant="h4" className="text-white font-bold leading-tight mb-3 text-2xl md:text-3xl drop-shadow-lg">
                        {t(`service-${service.id}-title`, service.title)}
                    </Typography>

                    {/* Expandable Description */}
                    <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 overflow-hidden transition-all duration-500 delay-75">
                        <p className="text-gray-200 text-sm md:text-base mb-5 leading-relaxed drop-shadow-md">
                            {t(`service-${service.id}-description`, service.description)}
                        </p>

                        <div className="flex flex-wrap gap-2 pb-2">
                            {service.technologies.slice(0, 3).map((tech: string) => (
                                <span key={tech} className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/10 shadow-sm">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Indicator Bar */}
                    <div className="w-12 h-1 bg-white/30 rounded-full mt-4 group-hover:w-full group-hover:bg-brand-primary transition-all duration-500" />
                </div>
            </div>
        </motion.div>
    );
};
