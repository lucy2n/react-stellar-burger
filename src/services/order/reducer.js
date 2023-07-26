import { createReducer } from '@reduxjs/toolkit';
import { orderRequest, orderSuccess, orderFailed } from './action';

const orderInitialState = {
    order: {},
    orderRequest: false,
    orderFailed: false,
};

export const getOrderState = (state) => state.order;

export const orderReducer = createReducer(orderInitialState, (builder) => {
    builder
    .addCase(orderRequest, (state) => {
        state.orderRequest = true;
    })
    .addCase(orderSuccess, (state, action) => {
        console.log(action);
        state.orderFailed = false,
        state.order = action.payload,
        state.orderRequest = false;
    })
    .addCase(orderFailed, (state) => {
        state.orderFailed = true;
    });
});
