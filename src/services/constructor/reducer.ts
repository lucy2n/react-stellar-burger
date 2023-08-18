import { createReducer } from '@reduxjs/toolkit';
import { 
    addIngredient, 
    clearIngredients, 
    deleteIngredient, 
    swapIngedients
} from './action';
import type { TIngedient } from '../../types/ingredient';
import type { RootState } from '../store';

interface IConstructorState {
    ingredients: Array<TIngedient>;
    bun: TIngedient | null
}

const constructorInitialState = {
    ingredients: [],
    bun: null
} as IConstructorState;

export const getConstructorState = (store: RootState) => store.burgerConstructor;

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
        const arr = state.ingredients;
        const index = arr.indexOf(action.payload);
        if (index > -1) {
            arr.splice(index, 1);
        } 
        state.ingredients = [...arr];
    })
    .addCase(swapIngedients, (state, action) => {
        const ingredients = [...state.ingredients];
        ingredients.splice(action.payload.toIndex, 0, ingredients.splice(action.payload.fromIndex, 1)[0]);
        state.ingredients = [...ingredients];
    })
    .addCase(clearIngredients, () => constructorInitialState);
});