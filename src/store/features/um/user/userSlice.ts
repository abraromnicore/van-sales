import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store.ts';
import { deleteRequest, getRequest, postRequest, putRequest } from '@utils/api/request-service.ts';
import { USER_API_URL } from '@utils/constant/api-url.constants.ts';
import type { UserType } from '@/types/um/users/user.type.ts';

type State = {
  items: UserType[];
  loading: boolean;
  error: string | null;
};

const initialState: State = { items: [], loading: false, error: null };

export const fetchUsers = createAsyncThunk<UserType[]>(
  'user/fetchAll',
  async () => {
    const res = await getRequest(USER_API_URL);
    return res.data as UserType[];
  },
);

export const createUser = createAsyncThunk<UserType, Omit<UserType, 'id'>>(
  'user/create',
  async (payload) => {
    const res = await postRequest(USER_API_URL, payload);
    return res.data as UserType;
  },
);

export const updateUser = createAsyncThunk<UserType, UserType>(
  'user/update',
  async (payload) => {
    const res = await putRequest(`${USER_API_URL}/${payload.id}`, payload);
    return res.data as UserType;
  },
);

export const deleteUser = createAsyncThunk<string, string>(
  'user/delete',
  async (id) => {
    await deleteRequest(`${USER_API_URL}/${id}`);
    return id;
  },
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchUsers.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(fetchUsers.fulfilled, (s, a: PayloadAction<UserType[]>) => {
      s.loading = false;
      s.items = a.payload;
    });
    b.addCase(fetchUsers.rejected, (s, a) => {
      s.loading = false;
      s.error = a.error.message ?? 'Failed to load';
    });

    b.addCase(createUser.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(createUser.fulfilled, (s, a: PayloadAction<UserType>) => {
      s.loading = false;
      s.items.push(a.payload);
    });
    b.addCase(createUser.rejected, (s, a) => {
      s.loading = false;
      s.error = a.error.message ?? 'Failed to create';
    });

    b.addCase(updateUser.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(updateUser.fulfilled, (s, a: PayloadAction<UserType>) => {
      s.loading = false;
      const i = s.items.findIndex((d) => d.id === a.payload.id);
      if (i !== -1) s.items[i] = a.payload;
    });
    b.addCase(updateUser.rejected, (s, a) => {
      s.loading = false;
      s.error = a.error.message ?? 'Failed to update';
    });

    b.addCase(deleteUser.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(deleteUser.fulfilled, (s, a: PayloadAction<string>) => {
      s.loading = false;
      s.items = s.items.filter((d) => d.id !== a.payload);
    });
    b.addCase(deleteUser.rejected, (s, a) => {
      s.loading = false;
      s.error = a.error.message ?? 'Failed to delete';
    });
  },
});

export default userSlice.reducer;

export const selectUsers = (s: RootState) => s.users.items;
export const selectUsersLoading = (s: RootState) => s.users.loading;
export const selectUsersError = (s: RootState) => s.users.error;