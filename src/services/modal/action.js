import { createAction } from '@reduxjs/toolkit';

export const openModal = createAction('modal/openModal');
export const closeModal = createAction('modal/closeModal');

export const ORDER_MODAL = 'ORDER_MODAL';
export const INGREDIENT_MODAL = 'INGRDIENT_MODAL';