import { useCallback, useState } from 'react';
import { useAppDispatch } from '@/store/hooks.ts';
import { updateDriver } from '@/store/features/driver/driverSlice.ts';
import type { DriverType } from '@/types/users/driver.type.ts';

export function useUpdateDriver() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (payload: DriverType) => {
    setLoading(true);
    setError(null);
    try {
      return await dispatch(updateDriver(payload)).unwrap();
    } catch (e: any) {
      setError(e?.message ?? 'Failed to update');
      throw e;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  return { update, loading, error };
}
