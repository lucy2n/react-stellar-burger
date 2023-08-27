import { apiUrl } from '../../utils/constants';
import { fetchWithRefresh } from '../../utils/api';
import { clearIngredients } from '../constructor/slice';
import { IOptions, ICustomHeaders, IOrderResponse } from '../../types/api';
import { orderFailed, orderRequest, orderSuccess } from './slice';
import { openModal, ORDER_MODAL } from '../modal/slice';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrder = createAsyncThunk(
    'order',
    async (ingredientsId: Array<string>, {dispatch}) => {
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
        .catch (() => dispatch(orderFailed()));
    }
);