import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { type BreadcrumbItem, clearBreadcrumbs, setBreadcrumbs } from '@/store/features/common/breadcrumbSlice.ts';

/**
 * Simple hook to set breadcrumbs without manually dispatching.
 * Automatically clears on unmount.
 */
export const useBreadcrumbs = (items: BreadcrumbItem[]) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setBreadcrumbs(items));
    return () => {
      dispatch(clearBreadcrumbs());
    };
  }, [dispatch, items]);
};