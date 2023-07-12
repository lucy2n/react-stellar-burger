import { api } from "../../utils/constants";
import { checkReponse } from "../../utils/utils";

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FALIED = 'RESET_PASSWORD_FALIED';

const resetPasswordRequest = () => ({
    type: RESET_PASSWORD_REQUEST
})

const resetPasswordSuccess = () => ({
    type: RESET_PASSWORD_SUCCESS
})

const resetPasswordFalied = () => ({
    type: RESET_PASSWORD_FALIED
})

export function resetPassword(password, token) {
    return function(dispatch) {
        dispatch(resetPasswordRequest());
        const settings = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                "password": password,
                "token": token
            })
        };
        fetch(`${api}/password-reset/reset`, settings)
        .then(res => checkReponse(res))
        .then(res => {
            if(res && res.success) {
                console.log("Message :", res.message)
            } else {
                dispatch(resetPasswordFalied())
            }
        })
        .catch (err => dispatch(resetPasswordFalied()))
    }
} 