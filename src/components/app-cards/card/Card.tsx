import * as React from 'react';
import styled from 'styled-components';

type DialogOptions = {
  children?: React.ReactNode;
};

const CardContainer = styled.div`
    border: 1px solid #F0F0F0;
    box-shadow: 0 1px 8.4px 9px rgba(0, 0, 0, 0.02);
`;

export const Card = (props: DialogOptions) => {
  const { children } = props;
  return (
    <CardContainer
      className="grid grid-rows-[auto_1fr_auto] w-full h-full rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      {children}
    </CardContainer>
  );
};