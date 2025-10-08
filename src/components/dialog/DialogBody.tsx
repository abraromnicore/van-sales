import * as React from 'react';

type CardBodyProps = {
  children: React.ReactNode;
};

export const DialogBody = (props: CardBodyProps) => {
  const { children } = props;

  return <div className="p-4">{children}</div>;
};
