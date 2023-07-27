import { createReducer } from '@reduxjs/toolkit';
import { 
  setAuthChecked, setUser
} from './action';

const initialState = {
    user: null,
    isAuthChecked: false,
};

export const getUserState = (state) => state.user;

export const userReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(setAuthChecked, (state, action) => {
    state.isAuthChecked = action.payload;
  })
  .addCase(setUser, (state, action) => {
    state.user = action.payload;
  });
});
