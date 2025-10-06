import * as React from "react";

// Button Component Props
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  loadingText?: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  loadingText = 'Loading...',
  className = '',
}) => {
  // Base styles
  const baseStyles = `
    inline-flex items-center justify-center
    font-semibold rounded-xl
    transition-all duration-200
    focus:outline-none focus:ring-4
    disabled:cursor-not-allowed
    cursor-pointer
  `;

  // Size variants
  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-sm',
    lg: 'px-6 py-4 text-base',
  };

  // Color variants
  const variantStyles = {
    primary: `
      bg-gradient-to-r from-blue-600 to-cyan-600
      hover:from-blue-700 hover:to-cyan-700
      disabled:from-gray-400 disabled:to-gray-500
      text-white
      focus:ring-blue-200
      shadow-lg hover:shadow-xl disabled:shadow-md
      transform hover:scale-[1.02] disabled:hover:scale-100
    `,
    secondary: `
      bg-gray-600 hover:bg-gray-700
      disabled:bg-gray-400
      text-white
      focus:ring-gray-200
      shadow-md hover:shadow-lg
    `,
    outline: `
      border-2 border-blue-600 hover:border-blue-700
      disabled:border-gray-400
      text-blue-600 hover:text-blue-700
      disabled:text-gray-400
      bg-transparent hover:bg-blue-50
      focus:ring-blue-200
    `,
    ghost: `
      bg-transparent hover:bg-gray-100
      disabled:bg-transparent disabled:hover:bg-transparent
      text-gray-600 hover:text-gray-800
      disabled:text-gray-400
      focus:ring-gray-200
    `,
    danger: `
      bg-gradient-to-r from-red-600 to-pink-600
      hover:from-red-700 hover:to-pink-700
      disabled:from-gray-400 disabled:to-gray-500
      text-white
      focus:ring-red-200
      shadow-lg hover:shadow-xl disabled:shadow-md
    `,
  };

  // Width styles
  const widthStyles = fullWidth ? 'w-full' : '';

  // Loading spinner
  const LoadingSpinner = () => (
    <svg 
      className="animate-spin -ml-1 mr-3 h-5 w-5" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  // Combine all styles
  const combinedStyles = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${widthStyles}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={combinedStyles}
    >
      {isLoading ? (
        <>
          <LoadingSpinner />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;


