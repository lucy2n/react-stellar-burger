import { createAction } from '@reduxjs/toolkit';

export const connect = createAction('history/conenct');
export const disconnect = createAction('history/disconnect');
export const wsConnecting = createAction('history/wsConnecting');
export const wsOpen = createAction('history/wsOpen');
export const wsClose = createAction('history/wsClose');
export const wsMessage = createAction('history/wsMessage');
export const wsError = createAction('history/wsError');