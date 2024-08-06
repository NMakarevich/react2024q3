import { combineReducers, configureStore } from '@reduxjs/toolkit';
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

const rootReducer = combineReducers({
  cards: cardsReducer,
  selectedItems: selectedItemsReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
