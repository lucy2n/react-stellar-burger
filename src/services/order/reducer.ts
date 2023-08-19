import { createReducer } from '@reduxjs/toolkit';
import { orderRequest, orderSuccess, orderFailed } from './action';
import { RootState } from '../store';
import { TOrder } from '../../types/order';

type TOrderInitialState = {
    order: TOrder;
    orderRequest: boolean;
    orderFailed: boolean;
}

const orderInitialState = {
    order: {},
    orderRequest: false,
    orderFailed: false,
} as TOrderInitialState;

export const getOrderState = (store: RootState) => store.order;

export const orderReducer = createReducer(orderInitialState, (builder) => {
    builder
    .addCase(orderRequest, (state) => {
        state.orderRequest = true;
    })
    .addCase(orderSuccess, (state, action) => {
        state.orderFailed = false,
        state.order = action.payload,
        state.orderRequest = false;
    })
    .addCase(orderFailed, (state) => {
        state.orderFailed = true;
    });
});
