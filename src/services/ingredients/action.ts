import { apiUrl } from '../../utils/constants';
import { request } from '../../utils/api';
import { IIngredientResponse, IOptions } from '../../types/api';
import { ingredientsFailed, ingredientsRequest, ingredientsSuccess } from './slice';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const loadIngredients = createAsyncThunk(
    'ingredients/load',
    async (_, {dispatch}) => {
        dispatch(ingredientsRequest());
        request<IIngredientResponse, IOptions>(`${apiUrl}/ingredients`)
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
    });