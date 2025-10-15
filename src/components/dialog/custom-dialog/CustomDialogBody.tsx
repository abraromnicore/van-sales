import * as React from 'react';

type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

type CustomDialogBodyProps = {
  children: React.ReactNode;
  size?: DialogSize;
};

export const CustomDialogBody = ({ children, size = 'md' }: CustomDialogBodyProps) => {
  const heightClasses: Record<DialogSize, string> = {
    sm: 'max-h-[50vh]',
    md: 'max-h-[60vh]',
    lg: 'max-h-[70vh]',
    xl: 'max-h-[80vh]',
    full: 'flex-1 overflow-y-auto', // ✅ Fullscreen mode fills and scrolls
  };

  const baseClasses = size === 'full'
    ? 'p-6 overflow-y-auto flex-1'
    : 'p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent';

  return (
    <div className={`${baseClasses} ${heightClasses[size]}`}>
      {children}
    </div>
  );
};