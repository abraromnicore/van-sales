import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MetadataType } from '@/types/metadata/metadata.type.ts';

const initialState: MetadataType = {
  pageTitle: '',
  breadcrumbs: [],
};

const metadataSlice = createSlice({
  name: 'metadata',
  initialState,
  reducers: {
    setMetadata(state, action: PayloadAction<MetadataType>) {
      state.pageTitle = action.payload.pageTitle;
      state.breadcrumbs = action.payload.breadcrumbs;
    },
    resetMetadata(state) {
      state.pageTitle = '';
      state.breadcrumbs = [];
    },
  },
});

export const { setMetadata, resetMetadata } = metadataSlice.actions;
export default metadataSlice.reducer;
