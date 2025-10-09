import { Accordion } from 'primereact/accordion';
import * as React from 'react';
import styled from 'styled-components';

const AccordionContainer = styled(Accordion)`
    .p-accordion-tab {
        border: 1px solid #00000020;
        border-radius: 6px;
        margin-bottom: 12px;
    }
`;

type AccordionProps = {
  activeIndex: number[] | number;
  children: React.ReactNode;
  className?: string;
  multiple?: boolean;
}

export const CustomAccordion = (props: AccordionProps) => {
  const { activeIndex, children, className, multiple } = props;
  return (
    <AccordionContainer multiple={multiple} className={className} activeIndex={activeIndex}>
      {children}
    </AccordionContainer>
  );
};