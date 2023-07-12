import {
     RESET_PASSWORD_FALIED,
     RESET_PASSWORD_REQUEST,
     RESET_PASSWORD_SUCCESS

    } from "../actions/reset-password"

const resetPasswordInitialState = {
    password: '',
    token: '',
    resetPasswordRequest: false,
    resetPasswordFailed: false,
}

export const resetPasswordReducer = (state = resetPasswordInitialState, action) => {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST: {
            return {
                ...state, 
                resetPasswordRequest: true,
            }
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state, 
                resetPasswordFalied: false, 
                password: action.password, 
                resetPasswordRequest: false,
            }
        }
        case RESET_PASSWORD_FALIED: {
            return {
                ...state,
                resetPasswordFalied: true,
            }
        }
        default: {
            return state
        }
    }
}