import { createReducer } from '@reduxjs/toolkit';
import { openModal, closeModal } from './action';

const initialState = {
    modalType: null
};

export const getModalState = (state) => state.modal;

export const modalReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(openModal, (state, action) => {
        state.modalType = action.payload.modalType;
    })
    .addCase(closeModal, () => initialState);
});