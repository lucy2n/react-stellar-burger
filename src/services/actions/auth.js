import { api } from "../../utils/constants";
import { checkReponse, getCookie, setCookie } from "../../utils/utils";

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FALIED = 'AUTH_FALIED';

const authRequest = () => ({
    type: AUTH_REQUEST
})

const authSuccess = (user, accessToken, refreshToken) => ({
    type: AUTH_SUCCESS,
    accessToken: accessToken,
    refreshToken: refreshToken,
    user: user
})

const authFalied = () => ({
    type: AUTH_FALIED
})

export function signInUser(email, password, navigate) {
    return function(dispatch) {
        dispatch(authRequest());
        const settings = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                 "password": password,
                 "email": email
                })
        };
        fetch(`${api}/auth/login`, settings)
        .then(res => checkReponse(res))
        .then(res => {
            if(res && res.success) {
                setCookie('token', res.refreshToken)
                dispatch(authSuccess(res.user, res.accessToken, res.refreshToken))
                navigate()
            } else {
                dispatch(authFalied())
            }
        })
        .catch (err => dispatch(authFalied()))
    }
} 