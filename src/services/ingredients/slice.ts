import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngedient } from '../../types/ingredient';
import { RootState } from '../store';

export const getIngredientsState = (store: RootState) => store.ingredients;

type TInitialState = {
    ingredients: Array<TIngedient>;
    ingredientsRequest: boolean;
    ingredientsFailed: boolean;
}

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
} as TInitialState;

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        ingredientsRequest(state) {
            state.ingredientsRequest = true;
        },
        ingredientsSuccess(state, action: PayloadAction<Array<TIngedient>>) {
            state.ingredientsFailed = false,
            state.ingredients = action.payload,
            state.ingredientsRequest = false;
        },
        ingredientsFailed(state) {
            state.ingredientsFailed = true;
        }
    }
});

export type TIngredientActionsCreator = typeof ingredientsSlice.actions;
export type TIngredientActions = ReturnType<TIngredientActionsCreator[keyof TIngredientActionsCreator]>
export const { ingredientsFailed, ingredientsRequest, ingredientsSuccess } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
