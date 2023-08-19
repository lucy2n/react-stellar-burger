import { apiUrl } from '../../utils/constants';
import { ORDER_MODAL, openModal } from '../modal/action';
import { fetchWithRefresh } from '../../utils/api';
import { createAction } from '@reduxjs/toolkit';
import { clearIngredients } from '../constructor/action';
import { AppDispatch } from '../store';
import { TOrder } from '../../types/order';
import { IOptions, ICustomHeaders, IOrderResponse } from '../../types/api';

export const orderRequest = createAction('order/orderRequest');
export const orderSuccess = createAction<TOrder>('order/orderSuccess');
export const orderFailed = createAction('order/orderFailed');

export function getOrder(ingredientsId: Array<string>) {
    return function(dispatch: AppDispatch) {
        dispatch(orderRequest());
        const settings: IOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('accessToken')
            } as ICustomHeaders,
            body: JSON.stringify({ 'ingredients': ingredientsId })
        };
        
        fetchWithRefresh<IOrderResponse>(`${apiUrl}/orders`, settings)
        .then(res => {
            if(res && res.success) {
                dispatch(orderSuccess(res.order));
                dispatch(openModal(ORDER_MODAL));
                dispatch(clearIngredients());
            } else {
                dispatch(orderFailed());
            }
        })
        .catch (err => dispatch(orderFailed()));
    };
}