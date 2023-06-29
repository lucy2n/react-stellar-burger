import { OPEN_MODAL, CLOSE_MODAL } from "../actions/modal"

const initialState = {
    modalType: null,
    modalProps: {}
}

export const getModalState = (state) => state.modal;
  
export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                modalType: action.modalType,
                modalProps: action.modalProps
            }
        case CLOSE_MODAL:
            return initialState
        default:
            return state
    }
}