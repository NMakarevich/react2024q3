import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store.ts';
import { Result } from '../../interfaces.ts';

export interface CardsState {
  isLoading: boolean;
  page: number;
  items: Result[];
  totalCount: number;
  detailedCard: Result | undefined;
  searchTerm: string;
}

const initialState: CardsState = {
  isLoading: false,
  page: 1,
  items: [],
  totalCount: 0,
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
      state.items = [...action.payload.items];
      state.totalCount = action.payload.total_count;
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
const selectCards = (state: RootState) => state.cards.items;
export const selectTotalCount = (state: RootState) => state.cards.totalCount;
export const selectResponse = createSelector(
  selectCards,
  selectTotalCount,
  (cards, totalCount) => {
    return {
      items: [...cards],
      total_count: totalCount,
    };
  },
);
export const selectPage = (state: RootState) => state.cards.page;
export const selectDetailedCard = (state: RootState) =>
  state.cards.detailedCard;

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
