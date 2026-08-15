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
    <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)] via-[var(--bg-primary)]/85 to-[var(--bg-primary)]/35" />
    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)]/55" />
  </div>
);
