import React from 'react';

interface ServiceHeroBackdropProps {
  src: string;
}

export const ServiceHeroBackdrop: React.FC<ServiceHeroBackdropProps> = ({ src }) => (
  <div className="absolute inset-0" aria-hidden>
    <img
      src={src}
      alt=""
      width={1600}
      height={900}
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-[var(--bg-primary)]/88" />
  </div>
);
