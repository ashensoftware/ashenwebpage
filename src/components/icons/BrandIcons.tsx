import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

export const WhatsAppIcon: React.FC<IconProps> = ({ size = 18, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M17.47 14.38c-.28-.14-1.64-.81-1.9-.9-.25-.1-.44-.14-.62.14-.18.28-.71.9-.87 1.08-.16.18-.32.2-.6.07-.28-.14-1.17-.43-2.23-1.37-.82-.73-1.38-1.64-1.54-1.92-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.18-.28.28-.46.1-.18.05-.35-.02-.48-.07-.14-.62-1.5-.85-2.05-.22-.53-.45-.46-.62-.47h-.53c-.18 0-.48.07-.73.35-.25.28-.96.94-.96 2.3 0 1.36.99 2.67 1.13 2.86.14.18 1.95 2.98 4.73 4.18 1.76.76 2.12.61 2.5.57.38-.04 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.11-.25-.18-.53-.32ZM12.04 21.5h-.01a9.46 9.46 0 0 1-4.82-1.32l-.35-.2-3.58.94.96-3.5-.22-.36a9.47 9.47 0 0 1-1.45-5.05 9.5 9.5 0 0 1 9.48-9.5c2.53 0 4.91 1 6.7 2.79a9.42 9.42 0 0 1 2.78 6.7 9.5 9.5 0 0 1-9.49 9.5Zm8.17-17.67A11.13 11.13 0 0 0 12.03 0C5.45 0 .1 5.35.1 11.94c0 2.1.55 4.15 1.6 5.96L0 24l6.26-1.64a11.9 11.9 0 0 0 5.77 1.47h.01c6.58 0 11.93-5.35 11.93-11.94 0-3.19-1.24-6.18-3.5-8.43Z" />
  </svg>
);

export const FlagES: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg
    width={size}
    height={Math.round((size * 12) / 16)}
    viewBox="0 0 16 12"
    aria-hidden="true"
    className={className}
  >
    <rect width="16" height="12" rx="1.5" fill="#C60B1E" />
    <rect y="3.2" width="16" height="5.6" fill="#FFC400" />
  </svg>
);

export const FlagEN: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg
    width={size}
    height={Math.round((size * 12) / 16)}
    viewBox="0 0 16 12"
    aria-hidden="true"
    className={className}
  >
    <rect width="16" height="12" rx="1.5" fill="#012169" />
    <path d="M0 0h16v12H0z" fill="#012169" />
    <path d="M0 0l16 12M16 0L0 12" stroke="#fff" strokeWidth="2.4" />
    <path d="M0 0l16 12M16 0L0 12" stroke="#C8102E" strokeWidth="1.2" />
    <path d="M8 0v12M0 6h16" stroke="#fff" strokeWidth="4" />
    <path d="M8 0v12M0 6h16" stroke="#C8102E" strokeWidth="2.2" />
  </svg>
);
