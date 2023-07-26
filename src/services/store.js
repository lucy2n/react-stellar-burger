import { constructorReducer } from './constructor/reducer';
import { ingredientsReducer } from './ingredients/reducer';
import { orderReducer } from './order/reducer';
import { modalReducer } from './modal/reducer';
import { userReducer } from './user/reducer';
import { configureStore, } from '@reduxjs/toolkit';
import { socketMiddleware } from './middleware/socket-middleware';

const reducer = {
    burgerConstructor: constructorReducer,
    ingredients: ingredientsReducer,
    order: orderReducer,
    modal: modalReducer,
    user: userReducer
};


export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});