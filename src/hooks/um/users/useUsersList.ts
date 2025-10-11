import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { fetchUsers, selectUsers, selectUsersError, selectUsersLoading } from '@/store/features/um/user/userSlice.ts';

export function useUsersList(autoFetch = true) {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const loading = useAppSelector(selectUsersLoading);
  const error = useAppSelector(selectUsersError);

  const refresh = useCallback(() => dispatch(fetchUsers()), [dispatch]);

  useEffect(() => {
    if (autoFetch) {
      dispatch(fetchUsers());
    }
  }, [autoFetch, dispatch]);

  return { users, loading, error, refresh };
}