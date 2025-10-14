import { Breadcrumbs } from '@components/common/Breadcrumbs.tsx';
import type { ReactNode } from 'react';
import { clsx } from 'clsx';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store.ts';

type PageLayoutProps = {
  children: ReactNode;
  headerActions?: ReactNode;
  className?: string;
}

export const PageLayout = (props: PageLayoutProps) => {
  const { children, className, headerActions } = props;
  const { breadcrumbs } = useSelector((state: RootState) => state.metadata);

  if (!breadcrumbs || (breadcrumbs && breadcrumbs.length === 0)) return children;

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