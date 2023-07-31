import { apiUrl } from '../../utils/constants';
import { request } from '../../utils/api';
import { createAction } from '@reduxjs/toolkit';

export const ingredientsRequest = createAction('ingredient/ingredientsRequest');
export const ingredientsSuccess = createAction('ingredient/ingredientsSuccess');
export const ingredientsFailed = createAction('ingredient/ingredientsFailed');

export function loadIngredients() {
    return function(dispatch) {
        dispatch(ingredientsRequest());
        request(`${apiUrl}/ingredients`)
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