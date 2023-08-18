import { createAction } from '@reduxjs/toolkit';

export const openModal = createAction<string>('modal/openModal');
export const closeModal = createAction('modal/closeModal');

export const ORDER_MODAL = 'ORDER_MODAL';