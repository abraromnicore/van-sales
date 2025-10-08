import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type BreadcrumbItem = {
  label: string;
  path?: string; // optional, last one usually has no path
}

type BreadcrumbState = {
  items: BreadcrumbItem[];
}

const initialState: BreadcrumbState = {
  items: [],
};

const breadcrumbSlice = createSlice({
  name: 'breadcrumb',
  initialState,
  reducers: {
    setBreadcrumbs: (state, action: PayloadAction<BreadcrumbItem[]>) => {
      state.items = action.payload;
    },
    clearBreadcrumbs: (state) => {
      state.items = [];
    },
  },
});

export const { setBreadcrumbs, clearBreadcrumbs } = breadcrumbSlice.actions;
export default breadcrumbSlice.reducer;