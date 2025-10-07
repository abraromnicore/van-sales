import { useCallback, useState } from 'react';
import { useAppDispatch } from '@/store/hooks.ts';
import { deleteDriver } from '@/store/features/driver/driverSlice.ts';

export function useDeleteDriver() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await dispatch(deleteDriver(id)).unwrap();
    } catch (e: any) {
      setError(e?.message ?? 'Failed to delete');
      throw e;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  return { remove, loading, error };
}
