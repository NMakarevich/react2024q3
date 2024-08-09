import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './slices/cards.slice.ts';
import selectedItemsReducer from './slices/selected-items.slice.ts';
import { apiSlice } from './slices/api.slice.ts';

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    selectedItems: selectedItemsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
