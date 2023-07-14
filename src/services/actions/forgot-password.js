import { api } from "../../utils/constants";
import { checkReponse } from "../../utils/utils";

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FALIED = 'FORGOT_PASSWORD_FALIED';

const forgotPasswordRequest = () => ({
    type: FORGOT_PASSWORD_REQUEST
})

const forgotPasswordSuccess = () => ({
    type: FORGOT_PASSWORD_SUCCESS
})

const forgotPasswordFalied = () => ({
    type: FORGOT_PASSWORD_FALIED
})

export function forgotPassword(email, handleRedirect) {
    return function(dispatch) {
        dispatch(forgotPasswordRequest());
        const settings = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "email": email })
        };
        fetch(`${api}/password-reset`, settings)
        .then(res => checkReponse(res))
        .then(res => {
            if(res && res.success) {
                console.log("Message :", res.message)
                handleRedirect()
            } else {
                dispatch(forgotPasswordFalied())
            }
        })
        .catch (err => dispatch(forgotPasswordFalied()))
    }
} 