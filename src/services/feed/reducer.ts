import { createReducer } from '@reduxjs/toolkit';
import { WebsocketStatus } from '../../utils/orders';
import {
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage
} from './action';
import { TOrder } from '../../types/order';

type TInitialState = {
  status: string;
  orders: Array<TOrder>
  total: null | number;
  totalToday: null | number;
  connectingError: string;
}

const initialState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  total: null,
  totalToday: null,
  connectingError: ''
} as TInitialState;

export const feedReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, state => {
          state.status = WebsocketStatus.CONNECTING;
      })
    .addCase(wsOpen, state => {
        state.status = WebsocketStatus.ONLINE;
        state.connectingError = '';
    })
    .addCase(wsClose, state => {
        state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
        state.connectingError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
    });
});
