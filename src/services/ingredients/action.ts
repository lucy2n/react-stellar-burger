import { apiUrl } from '../../utils/constants';
import { IIngredient, IOptions, request } from '../../utils/api';
import { createAction } from '@reduxjs/toolkit';
import { TIngedient } from '../../types/ingredient';
import { AppDispatch } from '../store';

export const ingredientsRequest = createAction('ingredient/ingredientsRequest');
export const ingredientsSuccess = createAction<Array<TIngedient>>('ingredient/ingredientsSuccess');
export const ingredientsFailed = createAction('ingredient/ingredientsFailed');

export function loadIngredients() {
    return function(dispatch: AppDispatch) {
        dispatch(ingredientsRequest());
        request<IIngredient, IOptions>(`${apiUrl}/ingredients`)
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