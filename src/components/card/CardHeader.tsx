import React from 'react';

const CardTitle = ({ title }: { title: string | undefined }) => {
  if (!title) return <></>;

  return (
    <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
      {title}
    </h3>
  );
};

type HeaderProps = {
  title?: string;
  children?: React.ReactNode;
}

export const CardHeader = (props: HeaderProps) => {
  const { title, children } = props;
  return (
    <div
      className="flex items-center justify-between gap-2 border-b border-neutral-200 p-4 dark:border-neutral-800">
      <CardTitle title={title} />
      {children}
    </div>
  );
};