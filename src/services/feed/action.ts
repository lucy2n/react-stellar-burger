import { createAction } from '@reduxjs/toolkit';
import { TFeed } from '../../types/feed';

export const connect = createAction<string>('feed/conenct');
export const disconnect = createAction('feed/disconnect');
export const wsConnecting = createAction('feed/wsConnecting');
export const wsOpen = createAction('feed/wsOpen');
export const wsClose = createAction('feed/wsClose');
export const wsMessage = createAction<TFeed>('feed/wsMessage');
export const wsError = createAction<string>('feed/wsError');

export type TFeedActions = 
    | ReturnType<typeof connect>
    | ReturnType<typeof disconnect>
    | ReturnType<typeof wsConnecting>
    | ReturnType<typeof wsOpen>
    | ReturnType<typeof wsClose>
    | ReturnType<typeof wsMessage>
    | ReturnType<typeof wsError>;