import { apiUrl } from '../../utils/constants';
import { checkReponse } from '../../utils/api';
import { createAction } from '@reduxjs/toolkit';

export const ingredientsRequest = createAction('ingredient/ingredientsRequest');
export const ingredientsSuccess = createAction('ingredient/ingredientsSuccess');
export const ingredientsFailed = createAction('ingredient/ingredientsFailed');

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