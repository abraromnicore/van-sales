import { Breadcrumbs } from '@components/common/Breadcrumbs.tsx';
import type { ReactElement, ReactNode } from 'react';
import { Button } from '@components/button/Button.tsx';

type PageLayoutProps = {
  children: ReactNode;
  icon?: ReactElement<any, any>;
  onClick?: () => void;
}

export const PageLayout = (props: PageLayoutProps) => {
  const { children, icon, onClick } = props;
  return (
    <>
      <div className={'flex justify-between gap-6 mb-6'}>
        <Breadcrumbs />
        <Button label={'Create Role'} icon={icon} onClick={onClick} />
      </div>
      {children}
    </>
  );
};