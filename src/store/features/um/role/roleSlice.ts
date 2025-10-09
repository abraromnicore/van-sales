import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store.ts';
import { deleteRequest, getRequest, postRequest, putRequest } from '@utils/api/request-service.ts';
import { ROLE_API_URL } from '@utils/constant/api-url.constants.ts';
import type { RoleType } from '@/types/um/roles/role.type.ts';

type State = {
  items: RoleType[];
  loading: boolean;
  error: string | null;
};

const initialState: State = { items: [], loading: false, error: null };

// --- Thunks (minimal) ---
export const fetchRoles = createAsyncThunk<RoleType[]>(
  'role/fetchAll',
  async () => {
    const res = await getRequest(ROLE_API_URL);
    return res.data as RoleType[];
  },
);

export const createRole = createAsyncThunk<RoleType, Omit<RoleType, 'id'>>(
  'role/create',
  async (payload) => {
    const res = await postRequest(ROLE_API_URL, payload);
    return res.data as RoleType;
  },
);

export const updateRole = createAsyncThunk<RoleType, RoleType>(
  'role/update',
  async (payload) => {
    const res = await putRequest(`${ROLE_API_URL}/${payload.id}`, payload);
    return res.data as RoleType;
  },
);

export const deleteRole = createAsyncThunk<string, string>(
  'role/delete',
  async (id) => {
    await deleteRequest(`${ROLE_API_URL}/${id}`);
    return id; // return deleted id
  },
);

// --- Slice ---
const roleSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    // fetch
    b.addCase(fetchRoles.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(fetchRoles.fulfilled, (s, a: PayloadAction<RoleType[]>) => {
      s.loading = false;
      s.items = a.payload;
    });
    b.addCase(fetchRoles.rejected, (s, a) => {
      s.loading = false;
      s.error = a.error.message ?? 'Failed to load';
    });

    // create
    b.addCase(createRole.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(createRole.fulfilled, (s, a: PayloadAction<RoleType>) => {
      s.loading = false;
      s.items.push(a.payload);
    });
    b.addCase(createRole.rejected, (s, a) => {
      s.loading = false;
      s.error = a.error.message ?? 'Failed to create';
    });

    // update
    b.addCase(updateRole.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(updateRole.fulfilled, (s, a: PayloadAction<RoleType>) => {
      s.loading = false;
      const i = s.items.findIndex((d) => d.id === a.payload.id);
      if (i !== -1) s.items[i] = a.payload;
    });
    b.addCase(updateRole.rejected, (s, a) => {
      s.loading = false;
      s.error = a.error.message ?? 'Failed to update';
    });

    // delete
    b.addCase(deleteRole.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(deleteRole.fulfilled, (s, a: PayloadAction<string>) => {
      s.loading = false;
      s.items = s.items.filter((d) => d.id !== a.payload);
    });
    b.addCase(deleteRole.rejected, (s, a) => {
      s.loading = false;
      s.error = a.error.message ?? 'Failed to delete';
    });
  },
});

export default roleSlice.reducer;

// Selectors
export const selectRoles = (s: RootState) => s.roles.items;
export const selectRolesLoading = (s: RootState) => s.roles.loading;
export const selectRolesError = (s: RootState) => s.roles.error;