
import React from 'react';

interface SectionDividerProps {
    variant?: 'curve' | 'wave' | 'slant';
    className?: string;
    color?: string;
    position?: 'top' | 'bottom';
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
    variant = 'curve',
    className = '',
    color = 'var(--bg-primary)', // Default matching unified bg variable
    position = 'bottom'
}) => {

    // Smooth solid curve
    const renderCurve = () => (
        <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className={`relative block w-full h-[60px] md:h-[120px] ${position === 'top' ? 'rotate-180' : ''}`}
            style={{
                // Ensure no pixel gap issues
                transform: 'scale(1.01)',
                marginBottom: '-1px'
            }}
        >
            {/* 
                Simplified to a single solid path for a cleaner transition. 
                Transparency layers can look messy if backgrounds don't match perfectly.
            */}
            <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                fill={color}
            />
        </svg>
    );

    const renderWave = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className={`relative block w-full h-[80px] md:h-[150px] ${position === 'top' ? 'rotate-180' : ''}`}
            style={{ transform: 'scale(1.01)' }}
        >
            <path
                fill={color}
                fillOpacity="1"
                d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            />
        </svg>
    );

    return (
        <div className={`overflow-hidden w-full leading-[0] ${className}`}>
            {variant === 'curve' ? renderCurve() : renderWave()}
        </div>
    );
};
