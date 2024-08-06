import { createSelector, createSlice } from '@reduxjs/toolkit';
import { Result } from '../../interfaces.ts';
import { RootState } from '../store.ts';

export interface SelectedItemsState {
  items: Result[];
}

export const initialState: SelectedItemsState = {
  items: [],
};

export const selectedItemsSlice = createSlice({
  name: 'selected-items',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    unselectAll: (state) => {
      state.items = [];
    },
  },
});

export const selectItemsAmount = (state: RootState) =>
  state.selectedItems.items.length;

export const selectItems = (state: RootState) => state.selectedItems.items;

export const selectItemsIds = createSelector([selectItems], (items) =>
  items.map((item) => item.id),
);

export const { addItem, removeItem, unselectAll } = selectedItemsSlice.actions;

export default selectedItemsSlice.reducer;
