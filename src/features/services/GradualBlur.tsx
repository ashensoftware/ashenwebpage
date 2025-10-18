import React from 'react';

interface GradualBlurProps {
  children: React.ReactNode;
  className?: string;
}

const GradualBlur: React.FC<GradualBlurProps> = ({ children, className = '' }) => {
  return (
    <div className={`gradual-blur ${className}`}>
      {children}
    </div>
  );
};

export default GradualBlur;
