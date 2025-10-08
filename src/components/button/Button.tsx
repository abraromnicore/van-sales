import { clsx } from 'clsx';
import type { ButtonHTMLAttributes, ReactElement } from 'react';

type ButtonProps = {
  icon?: ReactElement<any, any>;
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'outline' | 'ghost';
  className?: string;
  onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>; // so props like onClick, disabled, etc. still work

export const Button = (props: ButtonProps) => {
  const {
    icon,
    label,
    variant = 'primary',
    className = '',
    ...rest
  } = props;

  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-semibold py-2 px-4 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary:
      'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    success:
      'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    warning:
      'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400',
    outline:
      'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500',
    ghost:
      'bg-transparent text-blue-600 hover:bg-blue-100 focus:ring-blue-300',
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      {...rest}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      <span>{label}</span>
    </button>
  );
};