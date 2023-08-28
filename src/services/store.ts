import { feedReducer } from './feed/reducer';
import { historyReducer } from './history/reducer';
import { combineReducers, configureStore, Action} from '@reduxjs/toolkit';
import { socketMiddleware } from './middleware/socket-middleware';
import { TFeed } from '../types/feed';
import { userSlice } from './user/slice';
import { orderSlice } from './order/slice';
import { modalSlice } from './modal/slice';
import { ingredientsSlice } from './ingredients/slice';
import { constructorSlice } from './constructor/slice';
import { 
    connect as feedConnect, 
    disconnect as feedDisconnect, 
    wsClose as feedWsClose, 
    wsConnecting as feedWsConnecting, 
    wsError as feedWsError, 
    wsMessage as feedWsMessage, 
    wsOpen as feedWsOpen
} from './feed/action';

import { 
    connect as orderConnect, 
    disconnect as orderDisconnect, 
    wsClose as orderWsClose, 
    wsConnecting as orderWsConnecting, 
    wsError as orderWsError, 
    wsMessage as orderWsMessage, 
    wsOpen as orderWsOpen
} from './history/action';
import { AppThunk, TAppActions } from '../hooks/hooks';

const reducer = combineReducers({
    burgerConstructor: constructorSlice.reducer,
    ingredients: ingredientsSlice.reducer,
    order: orderSlice.reducer,
    modal: modalSlice.reducer,
    user: userSlice.reducer,
    feed: feedReducer, 
    history: historyReducer
});

export interface IWSActions {
    wsConnect: Action,
    wsDisconnect: Action,
    wsConnecting: Action,
    onOpen: Action,
    onClose: Action,
    onError(error: string): Action,
    onMessage(message: TFeed): Action,
}

const feedMiddleware = socketMiddleware({
    wsConnect: feedConnect,
    wsDisconnect: feedDisconnect,
    wsConnecting: feedWsConnecting,
    onOpen: feedWsOpen,
    onClose: feedWsClose,
    onError: feedWsError,
    onMessage: feedWsMessage,
} as IWSActions );

const ordersMiddleware = socketMiddleware({
    wsConnect: orderConnect,
    wsDisconnect: orderDisconnect,
    wsConnecting: orderWsConnecting,
    onOpen: orderWsOpen,
    onClose: orderWsClose,
    onError: orderWsError,
    onMessage: orderWsMessage,
} as IWSActions);


export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(feedMiddleware, ordersMiddleware)
});

export type RootState = ReturnType<typeof reducer>
export type AppDispatch<TReturn = void> = ( action: TAppActions | AppThunk<TReturn> ) => TReturn;