import { configureStore } from '@reduxjs/toolkit';
import driverSlice from '@/store/features/driver/driverSlice.ts';
import metadataSlice from '@/store/features/metadata/metadataSlice.ts';
import roleSlice from '@/store/features/um/role/roleSlice.ts';
import toastSlice from '@/store/features/common/toastSlice.ts';
import breadcrumbSlice from '@/store/features/common/breadcrumbSlice.ts';

export const store = configureStore({
  reducer: {
    drivers: driverSlice,
    roles: roleSlice,
    metadata: metadataSlice,
    toast: toastSlice,
    breadcrumb: breadcrumbSlice,
  },
  // middleware and devTools are good by default; customize here if needed.
});

// Inferred types:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;