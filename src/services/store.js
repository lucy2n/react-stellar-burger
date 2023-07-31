import { constructorReducer } from './constructor/reducer';
import { ingredientsReducer } from './ingredients/reducer';
import { orderReducer } from './order/reducer';
import { modalReducer } from './modal/reducer';
import { userReducer } from './user/reducer';
import { feedReducer } from './feed/reducer';
import { historyReducer } from './history/reducer';
import { configureStore, } from '@reduxjs/toolkit';
import { socketMiddleware } from './middleware/socket-middleware';
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

const reducer = {
    burgerConstructor: constructorReducer,
    ingredients: ingredientsReducer,
    order: orderReducer,
    modal: modalReducer,
    user: userReducer,
    feed: feedReducer, 
    history: historyReducer
};

const feedMiddleware = socketMiddleware({
    wsConnect: feedConnect,
    wsDisconnect: feedDisconnect,
    wsConnecting: feedWsConnecting,
    onOpen: feedWsOpen,
    onClose: feedWsClose,
    onError: feedWsError,
    onMessage: feedWsMessage,
});

const ordersMiddleware = socketMiddleware({
    wsConnect: orderConnect,
    wsDisconnect: orderDisconnect,
    wsConnecting: orderWsConnecting,
    onOpen: orderWsOpen,
    onClose: orderWsClose,
    onError: orderWsError,
    onMessage: orderWsMessage,
});


export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(feedMiddleware, ordersMiddleware)
});