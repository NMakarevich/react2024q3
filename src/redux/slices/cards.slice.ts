import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store.ts';

export interface CardsState {
  isLoading: boolean;
  page: number;
}

const initialState: CardsState = {
  isLoading: false,
  page: 1,
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    finishLoading: (state) => {
      state.isLoading = false;
    },
    updatePage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const selectLoading = (state: RootState) => state.cards.isLoading;

export const { startLoading, finishLoading, updatePage } = cardsSlice.actions;

export default cardsSlice.reducer;
