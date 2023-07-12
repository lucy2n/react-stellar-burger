import { api } from "../../utils/constants";
import { checkReponse } from "../../utils/utils";

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FALIED = 'REGISTER_FALIED';

const registerRequest = () => ({
    type: REGISTER_REQUEST
})

const registerSuccess = () => ({
    type: REGISTER_SUCCESS
})

const registerFalied = () => ({
    type: REGISTER_FALIED
})

export function registration(name, email, password) {
    return function(dispatch) {
        dispatch(registerRequest());
        const settings = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                 "password": password,
                 "name": name,
                 "email": email
                })
        };
        fetch(`${api}/auth/register`, settings)
        .then(res => checkReponse(res))
        .then(res => {
            if(res && res.success) {
                console.log("Register res", res)
            } else {
                dispatch(registerFalied())
            }
        })
        .catch (err => dispatch(registerFalied()))
    }
} 