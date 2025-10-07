import { useMemo } from 'react';
import { useAppSelector } from '@/store/hooks.ts';
import { selectDrivers } from '@/store/features/driver/driverSlice.ts';

export function useDriver(id: string | undefined) {
  const drivers = useAppSelector(selectDrivers);
  return useMemo(() => drivers.find(d => d._id === id), [drivers, id]);
}
