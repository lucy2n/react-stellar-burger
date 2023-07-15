import { combineReducers } from 'redux';
import { constructorReducer } from './constructor';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { modalReducer } from './modal';
import { userReducer } from './user';

export const rootReducer = combineReducers({
    burgerConstructor: constructorReducer,
    ingredients: ingredientsReducer,
    order: orderReducer,
    modal: modalReducer,
    user: userReducer
});