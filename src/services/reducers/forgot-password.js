import { 
    FORGOT_PASSWORD_FALIED, 
    FORGOT_PASSWORD_SUCCESS, 
    FORGOT_PASSWORD_REQUEST 
} from "../actions/forgot-password";

const forgotPasswordInitialState = {
    email: '',
    forgotPasswordRequest: false,
    forgotPasswordFailed: false,
}

export const forgotPasswordReducer = (state = forgotPasswordInitialState, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...state, 
                forgotPasswordRequest: true,
            }
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state, 
                forgotPasswordFalied: false, 
                email: action.email, 
                forgotPasswordRequest: false,
            }
        }
        case FORGOT_PASSWORD_FALIED: {
            return {
                ...state,
                forgotPasswordFalied: true,
            }
        }
        default: {
            return state
        }
    }
}