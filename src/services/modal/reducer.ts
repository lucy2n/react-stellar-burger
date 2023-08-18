import { createReducer } from '@reduxjs/toolkit';
import { openModal, closeModal } from './action';
import { RootState } from '../store';

type TInitialState = {
    modalType: string | null
}

const initialState = {
    modalType: null
} as TInitialState;

export const getModalState = (store: RootState) => store.modal;

export const modalReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(openModal, (state, action) => {
        state.modalType = action.payload;
    })
    .addCase(closeModal, () => initialState);
});