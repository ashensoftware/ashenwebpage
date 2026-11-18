import { cn } from '@/core/utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonStyle {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-[image:var(--gradient-primary)] text-white border border-transparent shadow-[0_10px_30px_rgba(139,92,246,0.35)] hover:brightness-110',
  secondary:
    'bg-[var(--glass-bg)] text-[var(--color-text-primary)] border border-[var(--glass-border)] backdrop-blur-md hover:border-[var(--color-accent-primary)]',
  outline:
    'bg-transparent border border-[var(--color-accent-primary)] text-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary)] hover:text-white',
  ghost: 'bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
  glow:
    'bg-[image:var(--gradient-primary)] text-white border border-transparent shadow-[0_0_24px_var(--color-accent-glow)]',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'min-h-11 px-4 text-sm',
  md: 'min-h-11 px-5 text-sm',
  lg: 'min-h-12 px-6 text-base',
};

export function buttonClass({ variant = 'primary', size = 'md', className = '' }: ButtonStyle = {}) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-medium cursor-pointer transition-[filter,border-color,background-color] duration-200 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--color-accent-primary)] disabled:opacity-50 disabled:cursor-not-allowed',
    variants[variant],
    sizes[size],
    className,
  );
}
