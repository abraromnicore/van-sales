import { AccordionTab } from 'primereact/accordion';
import * as React from 'react';

type AccordionProps = {
  header: string;
  children: React.ReactNode;
}

export const CustomAccordionTab = (props: AccordionProps) => {
  const { header, children } = props;
  return (
    <AccordionTab header={header}>
      {children}
    </AccordionTab>
  );
};