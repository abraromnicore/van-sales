import React from 'react';
import styled from 'styled-components';

const CardTitle = ({ title }: { title: string | undefined }) => {
  if (!title) return <></>;

  return (
    <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
      {title}
    </h3>
  );
};

const IconContainer = styled.span`
    width: 16px;
    height: 16px;
    display: block;
    
    svg {
        width: 16px;
        height: 16px;
    }
`;

type HeaderProps = {
  title?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const CardHeader = (props: HeaderProps) => {
  const { title, children, icon } = props;
  return (
    <div
      className="flex items-center justify-between gap-2 border-b border-neutral-200 p-4 dark:border-neutral-800">
      <div className="flex gap-2">
        {icon && <IconContainer>{icon}</IconContainer>}
        <CardTitle title={title} />
      </div>
      {children}
    </div>
  );
};