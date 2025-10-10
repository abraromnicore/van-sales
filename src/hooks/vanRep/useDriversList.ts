import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import {
  fetchDrivers,
  selectDrivers,
  selectDriversError,
  selectDriversLoading,
} from '@/store/features/driver/driverSlice.ts';

export function useDriversList(autoFetch = true) {
  const dispatch = useAppDispatch();
  const drivers = useAppSelector(selectDrivers);
  const loading = useAppSelector(selectDriversLoading);
  const error = useAppSelector(selectDriversError);

  const refresh = useCallback(() => dispatch(fetchDrivers()), [dispatch]);

  useEffect(() => {
    if (autoFetch) {
      dispatch(fetchDrivers());
    }
  }, [autoFetch, dispatch]);

  return { drivers, loading, error, refresh };
}
