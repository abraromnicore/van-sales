import { useEffect, useState } from 'react';
import { getRequest } from '@utils/api/request-service.ts';
import { ROLE_API_URL } from '@utils/constant/api-url.constants.ts';
import type { RoleType } from '@/types/um/roles/role.type.ts';
import type { AxiosResponse } from 'axios';

export const useGetSingleRole = (id?: string) => {
  const [role, setRole] = useState<RoleType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRole = async (id: any) => {
    setLoading(true);
    setError(null);
    try {
      const response: AxiosResponse = await getRequest(ROLE_API_URL + `/${id}`);
      setRole(response.data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to fetch role');
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchRole(id);
  }, [id]);

  return { role, loading, error };
};