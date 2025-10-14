import * as React from 'react';
import styled from 'styled-components';
import clsx from 'clsx';

type DialogOptions = {
  children?: React.ReactNode;
  styleClass?: string;
};

const CardContainer = styled.div`
    border: 1px solid #F0F0F0;
    box-shadow: 0 1px 8.4px 9px rgba(0, 0, 0, 0.02);
    border-radius: 16px;
`;

export const Card = (props: DialogOptions) => {
  const { children, styleClass } = props;
  return (
    <CardContainer
      className={clsx('grid grid-rows-[auto_1fr_auto] w-full bg-white ', styleClass)}>
      {children}
    </CardContainer>
  );
};