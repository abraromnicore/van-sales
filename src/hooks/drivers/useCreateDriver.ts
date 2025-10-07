import { useCallback, useState } from 'react';
import { useAppDispatch } from '@/store/hooks.ts';
import type { DriverType } from '@/types/users/driver.type.ts';
import { createDriver } from '@/store/features/driver/driverSlice.ts';

export function useCreateDriver() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (payload: Omit<DriverType, '_id'>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await dispatch(createDriver(payload)).unwrap();
      return result;
    } catch (e: any) {
      setError(e?.message ?? 'Failed to create');
      throw e;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  return { create, loading, error };
}
