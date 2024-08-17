import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from './slices/countries.slice.ts';
import formsReducer from './slices/forms.slice.ts';

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    forms: formsReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
