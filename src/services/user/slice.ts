import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../../types/user';
import { RootState } from '../store';

export const getUserState = (store: RootState) => store.user;

type TInitialState = {
    user: TUser | null;
    isAuthChecked: boolean;
}

const initialState = {
    user: null,
    isAuthChecked: false,
} as TInitialState;


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<TUser | null> ) {
            state.user = action.payload;
        },
        setAuthChecked(state, action: PayloadAction<boolean>) {
            state.isAuthChecked = action.payload;
        }
    }
});

type TUserActionsCreator = typeof userSlice.actions;
export type TUserActions =  ReturnType<TUserActionsCreator[keyof TUserActionsCreator]>
export const { setUser, setAuthChecked } = userSlice.actions;
export default userSlice.reducer;