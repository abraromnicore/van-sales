import { configureStore } from '@reduxjs/toolkit';
import driverSlice from '@/store/features/driver/driverSlice.ts';
import metadataSlice from '@/store/features/metadata/metadataSlice.ts';
import roleSlice from '@/store/features/um/role/roleSlice.ts';

export const store = configureStore({
  reducer: {
    drivers: driverSlice,
    roles: roleSlice,
    metadata: metadataSlice,
  },
  // middleware and devTools are good by default; customize here if needed.
});

// Inferred types:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
