import { createAction } from '@reduxjs/toolkit';

export const addIngredient = createAction('ADD_INGREDIENT');
export const deleteIngredient = createAction('DELETE_INGREDIENT');
export const swapIngedients = createAction('SWAP_INGREDIENT');