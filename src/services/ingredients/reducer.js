import { createReducer } from '@reduxjs/toolkit';
import { ingredientsRequest, ingredientsFailed, ingredientsSuccess } from './action';

const ingrenientsInitialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
};

export const getIngredientsState = (state) => state.ingredients;

export const ingredientsReducer = createReducer(ingrenientsInitialState, (builder) => {
    builder
    .addCase(ingredientsRequest, (state) => {
        state.ingredientsRequest = true;
    })
    .addCase(ingredientsSuccess, (state, action) => {
        state.ingredientsFailed = false,
        state.ingredients = action.payload,
        state.ingredientsRequest = false;
    })
    .addCase(ingredientsFailed, (state) => {
        state.ingredientsFailed = true;
    });
});
