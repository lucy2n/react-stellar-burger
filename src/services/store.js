import { constructorReducer } from './constructor/reducer';
import { ingredientsReducer } from './ingredients/reducer';
import { orderReducer } from './order/reducer';
import { modalReducer } from './modal/reducer';
import { userReducer } from './user/reducer';
import { feedReducer } from './feed/reducer';
import { configureStore, } from '@reduxjs/toolkit';
import { socketMiddleware } from './middleware/socket-middleware';
import { 
    connect, 
    disconnect, 
    wsClose, 
    wsConnecting, 
    wsError, 
    wsMessage, 
    wsOpen
} from './feed/action';

const reducer = {
    burgerConstructor: constructorReducer,
    ingredients: ingredientsReducer,
    order: orderReducer,
    modal: modalReducer,
    user: userReducer,
    feed: feedReducer
};

const ordersMiddleware = socketMiddleware({
    wsConnect: connect,
    wsDisconnect: disconnect,
    wsConnecting: wsConnecting,
    onOpen: wsOpen,
    onClose: wsClose,
    onError: wsError,
    onMessage: wsMessage,
});

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ordersMiddleware)
});