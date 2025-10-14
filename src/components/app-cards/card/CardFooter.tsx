import * as React from 'react';

type CardBodyProps = {
  children: React.ReactNode
}

export const CardFooter = (props: CardBodyProps) => {
  const { children } = props;

  return (
    <div
      className="flex items-center justify-between gap-2 border-t border-neutral-200 p-4 text-sm dark:border-neutral-800">
      {children}
    </div>
  );
};