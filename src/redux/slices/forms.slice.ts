import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormInterface } from '../../interfaces.ts';
import { RootState } from '../store.ts';

interface FormsState {
  uncontrolled: FormInterface[];
  controlled: FormInterface[];
}

const initialState: FormsState = {
  uncontrolled: [],
  controlled: [],
};

export const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addUncontrolledForm: (state, action: PayloadAction<FormInterface>) => {
      state.uncontrolled.push(action.payload);
    },
    addControlledForm: (state, action: PayloadAction<FormInterface>) => {
      state.controlled.push(action.payload);
    },
  },
});

export const selectUncontrolledForms = (state: RootState) =>
  state.forms.uncontrolled;

export const selectControlledForms = (state: RootState) =>
  state.forms.controlled;

export const { addUncontrolledForm, addControlledForm } = formsSlice.actions;

export default formsSlice.reducer;
