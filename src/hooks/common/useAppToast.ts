import { useCallback } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { showToast } from '@/store/features/common/toastSlice.ts';

export const useAppToast = () => {
  const dispatch = useAppDispatch();

  const show = useCallback(
    (severity: 'success' | 'info' | 'warn' | 'error', summary: string, detail?: string, life = 3000) => {
      dispatch(
        showToast({
          severity,
          summary,
          detail,
          life,
        }),
      );
    },
    [dispatch],
  );

  return {
    showSuccess: (summary: string, detail?: string, life = 3000) =>
      show('success', summary, detail, life),
    showError: (summary: string, detail?: string, life = 3000) =>
      show('error', summary, detail, life),
    showInfo: (summary: string, detail?: string, life = 3000) =>
      show('info', summary, detail, life),
    showWarn: (summary: string, detail?: string, life = 3000) =>
      show('warn', summary, detail, life),
  };
};