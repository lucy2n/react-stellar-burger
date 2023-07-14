import {
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_FALIED
} from "../actions/auth"

const authInitialState = {
    accessToken: null,
    refreshToken: null,
    user: {},
    authRequest: false,
    authFailed: false,
}

export const authReducer = (state = authInitialState, action) => {
    switch (action.type) {
        case AUTH_REQUEST:
            return {
                ...state,
                authRequest: true
            }
        case AUTH_SUCCESS:
            return {
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
                user: action.user,
                authRequest: false,
                authFailed: false
            }
        case AUTH_FALIED:
            return {
                ...state,
                authFailed: true
            }
        default:
            return state;
    }
}