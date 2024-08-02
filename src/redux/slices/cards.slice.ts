import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store.ts';
import { Result } from '../../App.tsx';

export interface CardsState {
  isLoading: boolean;
  page: number;
  cards: Result[];
  detailedCard: Result | undefined;
  searchTerm: string;
}

const initialState: CardsState = {
  isLoading: false,
  page: 1,
  cards: [],
  detailedCard: undefined,
  searchTerm: '',
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
    addDetailedCard: (state, action) => {
      state.detailedCard = action.payload;
    },
    deleteDetailedCard: (state) => {
      state.detailedCard = undefined;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const selectLoading = (state: RootState) => state.cards.isLoading;
export const selectSearchTerm = (state: RootState) => state.cards.searchTerm;

export const {
  startLoading,
  finishLoading,
  updatePage,
  addCards,
  addDetailedCard,
  deleteDetailedCard,
  setSearchTerm,
} = cardsSlice.actions;

export default cardsSlice.reducer;
