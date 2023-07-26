import { createAction } from '@reduxjs/toolkit';

export const addIngredient = createAction('constructor/addIngredient');
export const deleteIngredient = createAction('constructor/deleteIngredient');
export const swapIngedients = createAction('constructor/swapIngedients');