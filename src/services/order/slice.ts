import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../types/order';
import { RootState } from '../store';

export const getOrderState = (store: RootState) => store.order;

type TOrderInitialState = {
    order: TOrder;
    orderRequest: boolean;
    orderFailed: boolean;
}

const initialState = {
    order: {},
    orderRequest: false,
    orderFailed: false,
} as TOrderInitialState;

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        orderRequest(state) {
            state.orderRequest = true;
        },
        orderSuccess(state, action: PayloadAction<TOrder>) {
            state.orderFailed = false,
            state.order = action.payload,
            state.orderRequest = false;
        },
        orderFailed(state) {
            state.orderFailed = true;
        }
    }
});

type TOrderActionsCreator = typeof orderSlice.actions;
export type TOrderActions =  ReturnType<TOrderActionsCreator[keyof TOrderActionsCreator]>
export const { orderRequest, orderSuccess, orderFailed } = orderSlice.actions;
export default orderSlice.reducer;