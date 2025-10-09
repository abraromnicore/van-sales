import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { fetchRoles, selectRoles, selectRolesError, selectRolesLoading } from '@/store/features/um/role/roleSlice.ts';

export function useRolesList(autoFetch = true) {
  const dispatch = useAppDispatch();
  const roles = useAppSelector(selectRoles);
  const loading = useAppSelector(selectRolesLoading);
  const error = useAppSelector(selectRolesError);

  const refresh = useCallback(() => dispatch(fetchRoles()), [dispatch]);

  useEffect(() => {
    if (autoFetch) {
      dispatch(fetchRoles());
    }
  }, [autoFetch, dispatch]);

  return { roles, loading, error, refresh };
}