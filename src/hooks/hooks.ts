import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../services/store';
import { ThunkAction } from 'redux-thunk';
import { ActionCreator, Action } from 'redux';

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, Action>>; 

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;