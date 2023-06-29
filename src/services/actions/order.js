import { api } from "../../utils/constants";
import { checkReponse } from "../../utils/utils";
import { openOrderModal } from "./modal";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

const orderFailed = () => ({
    type: GET_ORDER_FAILED
})

const orderRequest = () => ({
    type: GET_ORDER_REQUEST
})

const orderSuccess = (order) => ({
    type: GET_ORDER_SUCCESS,
    order: order
})

export function getOrder(ingredientsId) {
    return function(dispatch) {
        dispatch(orderRequest());
        const settings = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "ingredients": ingredientsId })
        };
        fetch(`${api}/orders`, settings)
        .then(res => checkReponse(res))
        .then(res => {
            if(res && res.success) {
                dispatch(orderSuccess(res.order))
                dispatch(openOrderModal(res.order))
            } else {
                dispatch(orderFailed())
            }
        })
        .catch (err => dispatch(orderFailed()))
    }
}