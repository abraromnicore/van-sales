import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks.ts';
import type { MetadataType } from '@/types/metadata/metadata.type.ts';
import { resetMetadata, setMetadata } from '@/store/features/metadata/metadataSlice.ts';

export const useMetadata = (metadata: MetadataType) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMetadata(metadata));
    return () => {
      dispatch(resetMetadata());
    };
  }, [dispatch, metadata]);
};