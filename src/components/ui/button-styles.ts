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
    'bg-[var(--color-accent-primary)] text-[var(--color-ink)] border border-[var(--color-accent-primary)] hover:brightness-110',
  secondary:
    'bg-transparent text-[var(--color-text-primary)] border border-[var(--color-line-strong)] hover:border-[var(--color-accent-primary)]',
  outline:
    'bg-transparent border border-[var(--color-accent-primary)] text-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary)] hover:text-[var(--color-ink)]',
  ghost: 'bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
  glow:
    'bg-[var(--color-accent-primary)] text-[var(--color-ink)] border border-[var(--color-accent-primary)]',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'min-h-11 px-4 text-sm',
  md: 'min-h-11 px-5 text-sm',
  lg: 'min-h-12 px-6 text-base',
};

export function buttonClass({ variant = 'primary', size = 'md', className = '' }: ButtonStyle = {}) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-[2px] font-medium cursor-pointer transition-colors focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--color-accent-primary)] disabled:opacity-50 disabled:cursor-not-allowed',
    variants[variant],
    sizes[size],
    className,
  );
}
