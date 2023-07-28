import { createAction } from '@reduxjs/toolkit';

export const connect = createAction('feed/conenct');
export const disconnect = createAction('feed/disconnect');
export const wsConnecting = createAction('feed/wsConnecting');
export const wsOpen = createAction('feed/wsOpen');
export const wsClose = createAction('feed/wsClose');
export const wsMessage = createAction('feed/wsMessage');
export const wsError = createAction('feed/wsError');