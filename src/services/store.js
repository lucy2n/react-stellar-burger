import { constructorReducer } from './constructor/reducer';
import { ingredientsReducer } from './ingredients/reducer';
import { orderReducer } from './order/reducer';
import { modalReducer } from './modal/reducer';
import { userReducer } from './user/reducer';
import thunk from 'redux-thunk';
import { configureStore, } from '@reduxjs/toolkit';

const reducer = {
    burgerConstructor: constructorReducer,
    ingredients: ingredientsReducer,
    order: orderReducer,
    modal: modalReducer,
    user: userReducer
};

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});