import { configureStore } from '@reduxjs/toolkit';
import driverSlice from '@/store/features/driver/driverSlice.ts';

export const store = configureStore({
  reducer: {
    drivers: driverSlice,
  },
  // middleware and devTools are good by default; customize here if needed.
});

// Inferred types:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
