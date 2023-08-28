import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const ORDER_MODAL = 'ORDER_MODAL';

export const getModalState = (store: RootState) => store.modal;

type TInitialState = {
    modalType: string | null
}

const initialState = {
    modalType: null
} as TInitialState;

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal(state, action: PayloadAction<string>) {
            state.modalType = action.payload;
        },
        closeModal() {
            return initialState;
        }
    }
});

export type TModalActionsCreator = typeof modalSlice.actions;
export type TModalActions = ReturnType<TModalActionsCreator[keyof TModalActionsCreator]>
export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;