import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store.ts';
import { Result } from '../../App.tsx';

export interface CardsState {
  isLoading: boolean;
  page: number;
  cards: Result[];
}

const initialState: CardsState = {
  isLoading: false,
  page: 1,
  cards: [],
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
    addCards: (state, action) => {
      state.cards = [...action.payload];
    },
  },
});

export const selectLoading = (state: RootState) => state.cards.isLoading;

export const { startLoading, finishLoading, updatePage, addCards } =
  cardsSlice.actions;

export default cardsSlice.reducer;
