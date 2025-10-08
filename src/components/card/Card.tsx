import * as React from 'react';

type DialogOptions = {
  children?: React.ReactNode;
};

export const Card = (props: DialogOptions) => {
  const { children } = props;
  return (
    <div
      className="grid grid-rows-[auto_1fr_auto] w-full h-full rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      {children}
    </div>
  );
};
