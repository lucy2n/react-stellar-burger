import { GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS } from './action';

const orderInitialState = {
    order: {
        number: null
    },
    orderRequest: false,
    orderFailed: false,
};

export const getOrderState = (state) => state.order;

export const orderReducer = (state = orderInitialState, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state, 
                orderRequest: true,
            };
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state, 
                orderFailed: false, 
                order: action.order, 
                orderRequest: false,
            };
        }
        case GET_ORDER_FAILED: {
            return {
                ...state,
                orderFailed: true,
            };
        }
        default: {
            return state;
        }
    }
};