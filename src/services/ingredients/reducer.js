import { 
    GET_INGREDIENTS_FAILED, 
    GET_INGREDIENTS_SUCCESS, 
    GET_INGREDIENTS_REQUEST 
} from './action';

const ingrenientsInitialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
};

export const getIngredientsState = (state) => state.ingredients;

export const ingredientsReducer = (state = ingrenientsInitialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state, 
                ingredientsRequest: true,
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state, 
                ingredientsFailed: false, 
                ingredients: action.ingredients, 
                ingredientsRequest: false,
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsFailed: true,
            };
        }
        default: {
            return state;
        }
    }
};