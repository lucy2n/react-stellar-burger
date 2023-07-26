import { createReducer } from '@reduxjs/toolkit';
import { 
    addIngredient, 
    deleteIngredient, 
    swapIngedients
} from './action';

const constructorInitialState = {
    ingredients: [],
    bun: null
};

export const getConstructorState = (state) => state.burgerConstructor;

export const constructorReducer = createReducer(constructorInitialState, (builder) => {
    builder
    .addCase(addIngredient, (state, action) => {
        if (action.payload.ingredient.type === 'bun') {
            state.bun = action.payload.ingredient;
        } else {
            state.ingredients = [...state.ingredients, action.payload.ingredient];
        }
    })
    .addCase(deleteIngredient, (state, action) => {
        const arr = state.payload.ingredients;
            const index = arr.indexOf(action.payload.ingredient);
            if (index > -1) {
              arr.splice(index, 1);
            } 
            state.ingredients = [...arr];
    })
    .addCase(swapIngedients, (state, action) => {
        const ingredients = [...state.ingredients];
        ingredients.splice(action.payload.toIndex, 0, ingredients.splice(action.payload.fromIndex, 1)[0]);
        state.ingredients = [...ingredients];
    });
});