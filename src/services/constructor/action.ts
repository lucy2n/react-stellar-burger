import { createAction, nanoid } from '@reduxjs/toolkit';
import { TIngedient } from '../../types/ingredient';

export const addIngredient = createAction('constructor/addIngredient', (ingredient: TIngedient ) => {
    ingredient = {
        ...ingredient,
        uniqueId: nanoid()
    };
    return {
        payload: {
            ingredient
        }
    };
});
export const deleteIngredient = createAction<TIngedient>('constructor/deleteIngredient');
export const swapIngedients = createAction<{toIndex: number; fromIndex: number}>('constructor/swapIngedients');
export const clearIngredients = createAction('constructor/clearIngredients');
