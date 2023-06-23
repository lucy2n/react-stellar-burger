import { api } from "../../utils/constants";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export function getOrder(ingredientsId) {
    return function(dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        const settings = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "ingredients": ingredientsId })
        };
        fetch(`${api}/orders`, settings)
        .then( res => {
            console.log(res)
            if (res && res.ok ) {
                return res.json();
            } else {
                dispatch({
                    type: GET_ORDER_FAILED
                })
            }
        })
        .then( res => {
            console.log(res, 'fvdf')
            if( res && res.success ) {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    order: res.data.order
                })
            } else {
                dispatch({
                    type: GET_ORDER_FAILED
                })
            }
        })
        .catch ( err => {
            dispatch({
                type: GET_ORDER_FAILED
            })
        })
    }
}