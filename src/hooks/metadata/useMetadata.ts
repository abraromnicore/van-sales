import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import type { MetadataType } from '@/types/metadata/metadata.type.ts';
import { resetMetadata, setMetadata } from '@/store/features/metadata/metadataSlice.ts';

export const useMetadata = () => {
  const dispatch = useAppDispatch();
  const metadata = useAppSelector(state => state.metadata);

  const updateMetadata = useCallback((data: MetadataType) => {
    dispatch(setMetadata(data));
  }, [dispatch]);

  const clearMetadata = useCallback(() => {
    dispatch(resetMetadata());
  }, [dispatch]);

  return {
    metadata,
    setMetadata: updateMetadata,
    resetMetadata: clearMetadata,
  };
};
