import { useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store/store.ts';
import { clearToast } from '@/store/features/common/toastSlice.ts';

export const GlobalToast = () => {
  const toastRef = useRef<Toast>(null);
  const dispatch = useDispatch();
  const toastMessage = useSelector((state: RootState) => state.toast.message);

  useEffect(() => {
    if (toastMessage && toastRef.current) {
      toastRef.current.show({
        severity: toastMessage.severity,
        summary: toastMessage.summary,
        detail: toastMessage.detail,
        life: toastMessage.life || 5000,
      });
      dispatch(clearToast());
    }
  }, [toastMessage, dispatch]);

  return <Toast ref={toastRef} position="top-right" />;
};