import { createAction, nanoid } from '@reduxjs/toolkit';

export const addIngredient = createAction('constructor/addIngredient', ({ ingredient }) => {
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
export const deleteIngredient = createAction('constructor/deleteIngredient');
export const swapIngedients = createAction('constructor/swapIngedients');
export const clearIngredients = createAction('constructor/clearIngredients');