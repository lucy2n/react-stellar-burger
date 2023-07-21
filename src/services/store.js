import { combineReducers } from 'redux';
import { constructorReducer } from './constructor/reducer';
import { ingredientsReducer } from './ingredients/reducer';
import { orderReducer } from './order/reducer';
import { modalReducer } from './modal/reducer';
import { userReducer } from './user/reducer';

export const rootReducer = combineReducers({
    burgerConstructor: constructorReducer,
    ingredients: ingredientsReducer,
    order: orderReducer,
    modal: modalReducer,
    user: userReducer
});