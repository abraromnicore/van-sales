import { clsx } from 'clsx';
import type { ButtonHTMLAttributes, ReactElement } from 'react';
import { Link } from 'react-router';
import { DEFAULT_ROUTE } from '@utils/constant/app-route.constants.ts';

type ButtonProps = {
  icon?: ReactElement<any, any>;
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'outline' | 'ghost';
  className?: string;
  onClick?: (e: any) => void;
  to?: string;
  btnType?: 'link' | 'button' | 'submit' | 'reset';
} & ButtonHTMLAttributes<HTMLButtonElement>; // so props like onClick, disabled, etc. still work

export const Button = (props: ButtonProps) => {
  const {
    icon,
    label,
    variant = 'primary',
    className = '',
    to = DEFAULT_ROUTE,
    btnType = 'button',
    ...rest
  } = props;

  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-medium py-2 px-4 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary:
      'bg-primary-900 text-white hover:bg-primary-800 focus:ring-primary-500 disabled:bg-primary-400 disabled:hover:bg-primary-400',
    secondary:
      'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 disabled:bg-gray-400 disabled:hover:bg-gray-400',
    success:
      'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 disabled:bg-green-400 disabled:hover:bg-green-400',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-400 disabled:hover:bg-red-400',
    warning:
      'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400 disabled:bg-yellow-300 disabled:hover:bg-yellow-300',
    outline:
      'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500 disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-transparent',
    ghost:
      'bg-transparent text-blue-600 hover:bg-blue-100 focus:ring-blue-300 disabled:text-gray-400 disabled:hover:bg-transparent',
  };

  if (btnType === 'link') {
    return (
      <Link
        className={clsx(baseStyles, variants[variant], className)}
        to={to}
      >
        {icon && <span className="flex items-center">{icon}</span>}
          <span>{label}</span>
      </Link>
    );
  }

  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      type={btnType}
      {...rest}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      <span>{label}</span>
    </button>
  );
};