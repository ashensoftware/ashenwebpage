import React from 'react';
import { buttonClass, type ButtonSize, type ButtonVariant } from './button-styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  type = 'button',
  ...props
}) => {
  return (
    <button type={type} className={buttonClass({ variant, size, className })} {...props}>
      {children}
      {icon ? <span>{icon}</span> : null}
    </button>
  );
};
