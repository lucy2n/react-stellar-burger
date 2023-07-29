import { apiUrl } from '../../utils/constants';
import { ORDER_MODAL, openModal } from '../modal/action';
import { fetchWithRefresh } from '../../utils/api';
import { createAction } from '@reduxjs/toolkit';

export const orderRequest = createAction('order/orderRequest');
export const orderSuccess = createAction('order/orderSuccess');
export const orderFailed = createAction('order/orderFailed');

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
                dispatch(openModal({modalType: ORDER_MODAL}));
            } else {
                dispatch(orderFailed());
            }
        })
        .catch (err => dispatch(orderFailed()));
    };
}