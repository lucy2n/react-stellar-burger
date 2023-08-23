import { createReducer } from '@reduxjs/toolkit';
import { 
  setAuthChecked, setUser
} from './action';
import { TUser } from '../../types/user';
import { RootState } from '../store';

type TInitialState = {
  user: TUser | null;
  isAuthChecked: boolean;
}

const initialState = {
    user: null,
    isAuthChecked: false,
} as TInitialState;

export const getUserState = (store: RootState) => store.user;

export const userReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(setAuthChecked, (state, action) => {
    state.isAuthChecked = action.payload;
  })
  .addCase(setUser, (state, action) => {
    state.user = action.payload;
  });
});
