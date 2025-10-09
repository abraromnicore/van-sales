import { Breadcrumbs } from '@components/common/Breadcrumbs.tsx';
import type { ReactElement, ReactNode } from 'react';
import { Button } from '@components/button/Button.tsx';
import { clsx } from 'clsx';

type PageLayoutProps = {
  children: ReactNode;
  headerActions?: ReactNode;
  className?: string;
}

export const PageLayout = (props: PageLayoutProps) => {
  const { children, className, headerActions } = props;
  return (
    <>
      <div className={clsx('flex justify-between gap-6 mb-6', className)}>
        <Breadcrumbs />
        {headerActions}
      </div>
      {children}
    </>
  );
};