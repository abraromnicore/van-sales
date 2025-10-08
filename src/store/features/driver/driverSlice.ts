// src/features/van-rep/driversSlice.ts
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store.ts';
import { deleteRequest, getRequest, postRequest, putRequest } from '@utils/api/request-service.ts';
import type { DriverType } from '@/types/users/driver.type.ts';
import { DRIVER_API_URL } from '@utils/constant/api-url.constants.ts';

type State = {
  items: DriverType[];
  loading: boolean;
  error: string | null;
};

const initialState: State = { items: [], loading: false, error: null };

// --- Thunks (minimal) ---
export const fetchDrivers = createAsyncThunk<DriverType[]>(
  'van-rep/fetchAll',
  async () => {
    const res = await getRequest(DRIVER_API_URL);
    return res.data.drivers as DriverType[];
  },
);

export const createDriver = createAsyncThunk<DriverType, Omit<DriverType, '_id'>>(
  'van-rep/create',
  async (payload) => {
    const res = await postRequest(DRIVER_API_URL, payload);
    return res.data as DriverType;
  },
);

export const updateDriver = createAsyncThunk<DriverType, DriverType>(
  'van-rep/update',
  async (payload) => {
    const res = await putRequest(`${DRIVER_API_URL}/${payload._id}`, payload);
    return res.data as DriverType;
  },
);

export const deleteDriver = createAsyncThunk<string, string>(
  'van-rep/delete',
  async (id) => {
    await deleteRequest(`${DRIVER_API_URL}/${id}`);
    return id; // return deleted id
  },
);

// --- Slice ---
const driversSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    // fetch
    b.addCase(fetchDrivers.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(fetchDrivers.fulfilled, (s, a: PayloadAction<DriverType[]>) => {
      s.loading = false;
      s.items = a.payload;
    });
    b.addCase(fetchDrivers.rejected, (s, a) => {
      s.loading = false;
      s.error = a.error.message ?? 'Failed to load';
    });

    // create
    b.addCase(createDriver.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(createDriver.fulfilled, (s, a: PayloadAction<DriverType>) => {
      s.loading = false;
      s.items.push(a.payload);
    });
    b.addCase(createDriver.rejected, (s, a) => {
      s.loading = false;
      s.error = a.error.message ?? 'Failed to create';
    });

    // update
    b.addCase(updateDriver.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(updateDriver.fulfilled, (s, a: PayloadAction<DriverType>) => {
      s.loading = false;
      const i = s.items.findIndex((d) => d._id === a.payload._id);
      if (i !== -1) s.items[i] = a.payload;
    });
    b.addCase(updateDriver.rejected, (s, a) => {
      s.loading = false;
      s.error = a.error.message ?? 'Failed to update';
    });

    // delete
    b.addCase(deleteDriver.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(deleteDriver.fulfilled, (s, a: PayloadAction<string>) => {
      s.loading = false;
      s.items = s.items.filter((d) => d._id !== a.payload);
    });
    b.addCase(deleteDriver.rejected, (s, a) => {
      s.loading = false;
      s.error = a.error.message ?? 'Failed to delete';
    });
  },
});

export default driversSlice.reducer;

// Selectors
export const selectDrivers = (s: RootState) => s.drivers.items;
export const selectDriversLoading = (s: RootState) => s.drivers.loading;
export const selectDriversError = (s: RootState) => s.drivers.error;
