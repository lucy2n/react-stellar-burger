import { apiUrl } from '../../utils/constants';
import { checkReponse } from '../../utils/api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

const ingredientsRequest = () => ({
    type: GET_INGREDIENTS_REQUEST
});

const ingredientsFailed = () => ({
    type: GET_INGREDIENTS_FAILED
});

const ingredientsSuccess = (ingredients) => ({
    type: GET_INGREDIENTS_SUCCESS,
    ingredients: ingredients
});

export function loadIngredients() {
    return function(dispatch) {
        dispatch(ingredientsRequest());
        fetch(`${apiUrl}/ingredients`)
        .then(res => checkReponse(res))
        .then(res => {
            if (res && res.success ) {
                dispatch(ingredientsSuccess(res.data));
            } else {
                dispatch(ingredientsFailed());
            }
        })
        .catch ( err => {
            dispatch(ingredientsFailed());
        });
    };
}