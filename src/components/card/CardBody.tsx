import * as React from 'react';

type CardBodyProps = {
  children: React.ReactNode;
};

export const CardBody = (props: CardBodyProps) => {
  const { children } = props;
  return <div className="p-4">{children}</div>;
};
