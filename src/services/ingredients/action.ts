import { apiUrl } from '../../utils/constants';
import { request } from '../../utils/api';
import { IIngredientResponse, IOptions } from '../../types/api';
import { AppDispatch } from '../store';
import { ingredientsFailed, ingredientsRequest, ingredientsSuccess } from './slice';


export function loadIngredients() {
    return function(dispatch: AppDispatch) {
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
    };
}