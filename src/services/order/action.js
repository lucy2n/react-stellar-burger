import { apiUrl } from '../../utils/constants';
import { openOrderModal } from '../modal/action';
import { fetchWithRefresh } from '../../utils/api';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

const orderFailed = () => ({
    type: GET_ORDER_FAILED
});

const orderRequest = () => ({
    type: GET_ORDER_REQUEST
});

const orderSuccess = (order) => ({
    type: GET_ORDER_SUCCESS,
    order: order
});

export function getOrder(ingredientsId) {
    return function(dispatch) {
        dispatch(orderRequest());
        const settings = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('accessToken')
            },
            body: JSON.stringify({ 'ingredients': ingredientsId })
        };
        
        fetchWithRefresh(`${apiUrl}/orders`, settings)
        .then(res => {
            if(res && res.success) {
                dispatch(orderSuccess(res.order));
                dispatch(openOrderModal(res.order));
            } else {
                dispatch(orderFailed());
            }
        })
        .catch (err => dispatch(orderFailed()));
    };
}